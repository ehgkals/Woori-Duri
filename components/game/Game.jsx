"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useSocket } from "@/context/SocketContext";

const WORD_COUNT = 20;
const WORD_API_URL = `https://random-word-api.herokuapp.com/word?number=${WORD_COUNT}`;

const Game = () => {
  const socket = useSocket();
  const [words, setWords] = useState([]); // 단어 요청 상태

  const [userIP, setUserIP] = useState("");
  const [userName, setUserName] = useState("");
  console.log(userName);

  const [countdown, setCountdown] = useState(null);
  const [showGame, setShowGame] = useState(false); // 로딩 완료 시

  const [currentWord, setCurrentWord] = useState(0); // 현재 보여주는 단어
  const [inputValue, setInputValue] = useState(""); // 사용자 입력값
  const [inputError, setInputError] = useState(false); // 입력값 오답 시
  const [finishTime, setFinishTime] = useState(null); // 끝나는 시간

  const startTimeRef = useRef(null);
  const router = useRouter();

  // 잘못된 접근 redirect
  useEffect(() => {
    const canAccess = sessionStorage.getItem("accessGame") === "1";
    if (!canAccess) router.replace("/");
  }, [router]);

  // 단어 요청
  useEffect(() => {
    fetch(WORD_API_URL)
      .then((res) => res.json())
      .then((data) => setWords(data));
  }, []);

  useEffect(() => {
    setInputValue("");
    setInputError(false);
  }, [currentWord, words]);

  // IP에 사용자 이름 저장
  useEffect(() => {
    if (!socket) return;
    console.log("Setting");

    const myStatus = (data) => {
      console.log("[userStatus 수신]", JSON.stringify(data, null, 2));
      if (data.me) setUserIP(data.me);
      const me = data.list.find((u) => u.ip === data.me);
      console.log("내 ip:", data.me, "me 객체:", me);
      console.log(me);
      if (me && me.name) {
        console.log("내 이름 세팅:", me.name);
        setUserName(me.name);
      }
    };

    socket.on("userStatus", myStatus);

    socket.emit("getUserStatus");

    return () => socket.off("userStatus", myStatus);
  }, [socket]);

  // 모든 준비 완료 시
  useEffect(() => {
    console.log("하...", words.length);
    console.log("username", userName);
    if (words.length && userName && socket) {
      console.log("들어와");
      socket.emit("readyToStart");
    }
  }, [words, userName, socket]);

  // 카운트 다운
  useEffect(() => {
    if (!socket) return;

    const handleGameStart = () => {
      setShowGame(false);
      setCountdown(3);
      let left = 3;
      const timer = setInterval(() => {
        left -= 1;
        setCountdown(left);
        if (left <= 0) {
          clearInterval(timer);
          setShowGame(true);
          setCountdown(null); // 카운트다운 숨김
          startTimeRef.current = Date.now();
        }
      }, 1000);
    };

    socket.on("startCountdown", handleGameStart);
    return () => socket.off("startCountdown", handleGameStart);
  }, [socket]);

  // 진행상황 전달
  useEffect(() => {
    if (!socket || !userIP) return;
    if (showGame && currentWord < words.length) {
      socket.emit("playingGame", {
        ip: userIP,
        currentWord: currentWord + 1,
      });
    }
  }, [currentWord, showGame, words.length, socket, userIP]);

  const handleEnter = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      if (!inputValue.trim()) return;

      if (inputValue.trim() === words[currentWord]) {
        if (currentWord + 1 === words.length) {
          const now = Date.now();
          const duration = now - startTimeRef.current;
          setFinishTime(duration);

          // 서버로 시간 전송
          if (socket && userIP) {
            socket.emit("finishGame", { ip: userIP, finishTime: duration });
          }
        }

        setCurrentWord((current) => current + 1);
        setInputError(false);
        setInputValue("");
      } else {
        setInputError(true);
        setTimeout(() => setInputError(false), 500);
      }
    }
  };

  if (!words.length || !userName) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[700px] w-full font-pretendard">
        <div className="w-full max-w-2xl min-w-[320px] bg-white rounded-3xl shadow-2xl px-10 py-16 flex flex-col items-center border-b-4 border-[#2482c5]">
          <img
            src="/wooriduri-icon.png"
            className="h-16 mb-4"
            alt="wooriduri icon"
          />
          <div className="text-[#2482c5] text-4xl font-extrabold mb-4 tracking-wider">
            영어 단어 빨리 치기
          </div>
          <div className="mb-10 text-2xl text-gray-600 text-center font-bold">
            게임 정보를 불러오는 중...
          </div>
        </div>
      </div>
    );
  }

  if (countdown !== null && !showGame) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[700px] w-full font-pretendard">
        <div
          className="w-full max-w-2xl min-w-[320px] bg-white rounded-3xl shadow-2xl px-10 py-16 flex flex-col items-center border-b-4 border-[#2482c5]"
          style={{
            fontFamily:
              "'Pretendard', 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif",
          }}
        >
          <img
            src="/wooriduri-icon.png"
            className="h-16 mb-4"
            alt="wooriduri icon"
          />
          <div className="text-[#2482c5] text-4xl font-extrabold mb-4 tracking-wider">
            영어 단어 빨리 치기
          </div>
          <div className="mb-10 text-2xl text-gray-600 text-center font-bold">
            <span className="text-[#1e88e5]">{userName || "..."}</span> 님
            <br />곧 게임이 시작됩니다!
          </div>
          <div className="mb-2 text-4xl font-black text-[#1e88e5] drop-shadow tracking-wider flex gap-2 items-center">
            <span className="animate-pulse">
              {countdown > 0 ? countdown : "시작!"}
            </span>
            <span className="text-xl font-normal text-gray-500">
              {countdown > 0 ? "초 후 시작" : ""}
            </span>
          </div>
          <div className="mt-8 w-full flex justify-center">
            <div className="h-2 w-64 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-[#42a5f5] to-[#2482c5] transition-all duration-500"
                style={{ width: `${(countdown / 3) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[700px] w-full font-pretendard">
      <div
        className="w-full max-w-3xl bg-white shadow-2xl rounded-3xl px-8 md:px-24 py-14 flex flex-col items-center border-b-4 border-[#2482c5]"
        style={{
          fontFamily:
            "'Pretendard', 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif",
        }}
      >
        <div className="flex items-center gap-3 mb-6">
          <img
            src="/wooriduri-icon.png"
            className="h-10"
            alt="wooriduri icon"
          />
          <div className="text-[#2482c5] text-3xl md:text-4xl font-extrabold tracking-wider">
            영어 단어 빨리 치기
          </div>
        </div>
        <div className="mb-8 text-2xl text-gray-500 font-bold text-center">
          <span className="text-[#2482c5]">제시된 단어</span>를{" "}
          <span className="text-[#1e88e5]">빠르게</span> 입력하세요!
        </div>
        <div className="w-full flex items-center justify-center mb-8 h-24 md:h-28">
          <span className="text-5xl md:text-6xl font-black text-[#1e88e5] tracking-wide drop-shadow">
            {currentWord < words.length ? words[currentWord] : "🎉 게임 끝! 🎉"}
          </span>
        </div>
        {currentWord < words.length && (
          <input
            value={inputValue}
            onChange={(e) => {
              const onlyLower = e.target.value.replace(/[^a-z]/g, "");
              setInputValue(onlyLower);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                if (!inputValue.trim()) return;

                if (inputValue.trim() === words[currentWord]) {
                  if (currentWord + 1 === words.length) {
                    const now = Date.now();
                    const duration = now - startTimeRef.current;
                    setFinishTime(duration);

                    if (socket && userIP) {
                      socket.emit("finishGame", {
                        ip: userIP,
                        finishTime: duration,
                      });
                    }
                  }
                  setCurrentWord((c) => c + 1);
                  setInputError(false);
                  setInputValue("");
                } else {
                  setInputError(true);
                  setTimeout(() => setInputError(false), 500);
                }
              }
            }}
            className={
              "w-full border-2 px-10 py-6 rounded-full mb-6 text-3xl md:text-4xl text-center transition-all duration-200 outline-none " +
              (inputError
                ? "border-red-500 bg-red-100 animate-shake"
                : "border-[#90caf9] focus:border-[#2482c5]")
            }
            placeholder="정답을 입력하세요!"
            autoFocus
            style={{ letterSpacing: "2px" }}
          />
        )}
        <div className="w-full flex items-center justify-between text-2xl md:text-3xl mt-8">
          <span className="text-gray-600">
            남은 단어:{" "}
            <span className="font-bold">{words.length - currentWord}</span>
          </span>
          <span className="text-[#2482c5] font-bold">
            {finishTime
              ? `기록: ${(finishTime / 1000).toFixed(2)}초`
              : `진행: ${currentWord} / ${words.length}`}
          </span>
        </div>
        {currentWord >= words.length && (
          <button
            onClick={() => {
              sessionStorage.removeItem("accessGame");
              router.replace("/");
            }}
            className="mt-12 bg-gradient-to-r from-[#1e88e5] to-[#42a5f5] text-white font-bold px-16 py-6 rounded-full shadow-lg hover:scale-105 transition-all text-3xl"
          >
            나가기
          </button>
        )}
      </div>
    </div>
  );
};

export default Game;
