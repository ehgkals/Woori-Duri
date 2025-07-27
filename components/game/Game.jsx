"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useSocket } from "@/context/SocketContext";

const WORD_COUNT = 20;
const WORD_API_URL = `https://random-word-api.herokuapp.com/word?number=${WORD_COUNT}`;

const Game = () => {
  const socket = useSocket();
  const [words, setWords] = useState([]);
  const [currentWord, setCurrentWord] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState(false);
  const [finishTime, setFinishTime] = useState(null);
  const [userIP, setUserIP] = useState("");
  const startTimeRef = useRef(null);
  const router = useRouter();

  // 잘못된 접근 redirect
  useEffect(() => {
    const canAccess = sessionStorage.getItem("accessGame") === "1";
    if (!canAccess) router.replace("/");
  }, [router]);

  useEffect(() => {
    fetch(WORD_API_URL)
      .then((res) => res.json())
      .then((data) => setWords(data));
  }, []);

  useEffect(() => {
    setInputValue("");
    setInputError(false);
  }, [currentWord, words]);

  // 내 아이피 설정
  useEffect(() => {
    if (!socket) return;

    const myStatus = (data) => {
      if (data.me) setUserIP(data.me);
    };

    socket.on("userStatus", myStatus);

    return () => socket.off("userStatus", myStatus);
  }, [socket]);

  // 시작 시간
  useEffect(() => {
    if (words.length > 0) {
      startTimeRef.current = Date.now();
    }
  }, [words]);

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

  return (
    <div className="flex flex-col items-center justify-center min-h-[700px] w-full">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-3xl px-24 py-16 flex flex-col items-center">
        <div className="text-[#2482c5] text-5xl font-extrabold mb-6 tracking-wider">
          영어 단어 빨리 치기
        </div>
        <div className="mb-10 text-3xl text-gray-500">
          아래 단어를 <span className="font-bold text-[#2482c5]">빠르게</span>{" "}
          입력하세요!
        </div>
        <div className="w-full flex items-center justify-center mb-12 h-28">
          <span className="text-6xl font-black text-[#1e88e5] tracking-wide drop-shadow">
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
            onKeyDown={handleEnter}
            className={
              "w-full border-2 px-12 py-7 rounded-full mb-7 text-4xl text-center transition-all duration-200 outline-none " +
              (inputError
                ? "border-red-500 bg-red-100 animate-shake"
                : "border-[#90caf9] focus:border-[#2482c5]")
            }
            placeholder="정답을 입력하세요!"
            autoFocus
          />
        )}
        <div className="w-full flex items-center justify-between text-3xl mt-8">
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
