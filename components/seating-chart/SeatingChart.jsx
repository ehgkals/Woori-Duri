"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSocket } from "@/context/SocketContext";
import Seat from "./Seat";
import UserModal from "../modal/UserModal";
import ReadyModal from "../modal/ReadyModal";

const SeatingChart = () => {
  const socket = useSocket();
  const [userData, setUserData] = useState([]);
  const [userIP, setUserIP] = useState("");
  const [userName, setUserName] = useState("");
  const [showUserModal, setShowUserModal] = useState(false);
  const [showReadyModal, setShowReadyModal] = useState(false);
  const [nextScreen, setNextScreen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!socket) return;

    // 서버로부터 받은 좌석 상태로 업데이트
    socket.on("userStatus", (data) => {
      if (!data || !Array.isArray(data.list)) return;

      setUserData(data.list);

      if (data.me) {
        setUserIP(data.me);
        const meInfo = data.list.find((user) => user.ip === data.me);
        setUserName(meInfo?.name || "");
        setShowUserModal(!meInfo?.name);
      }
    });

    // 준비 완료 모달
    socket.on("showReadyModal", () => setShowReadyModal(true));

    // 다음 화면으로 이동
    socket.on("moveToNextScreen", () => {
      setShowReadyModal(false);
      setNextScreen(true);
    });

    return () => {
      socket.off("userStatus");
      socket.off("showReadyModal");
      socket.off("moveToNextScreen");
    };
  }, [socket]);

  useEffect(() => {
    if (nextScreen) {
      router.push("/game");
      setNextScreen(false);
    }
  }, [nextScreen, router]);

  const handleUserNameSubmit = (name) => {
    if (!name || !socket) return;

    socket.emit("setUserName", name);
  };

  const handleReady = () => {
    if (socket && userIP) {
      socket.emit("readyResponse", { ip: userIP });
    }
  };

  const totalOnline = Array.isArray(userData) // 총 온라인 사용자
    ? userData.filter((u) => u.status === "online").length
    : 0;

  const readyCount = Array.isArray(userData) // 준비완료 사용자
    ? userData.filter((u) => u.status === "online" && u.ready).length
    : 0;

  return (
    <>
      {showUserModal && <UserModal onSubmit={handleUserNameSubmit} />}
      {showReadyModal && (
        <ReadyModal
          onReady={handleReady}
          totalOnline={totalOnline}
          readyCount={readyCount}
        />
      )}
      <div className="w-full min-w-[1040px] aspect-[1040/500] bg-white shadow-lg p-6 flex items-center justify-center overflow-auto">
        <div className="grid grid-cols-9 grid-rows-6 gap-4 w-full h-full">
          {/* 1행 (중앙 좌석만 배치) */}
          {[...Array(4)].map((_, i) => (
            <div key={`r0c${i}`} />
          ))}
          <div className="aspect-[3/2] w-full h-full">
            <Seat id={1} userData={userData} />
          </div>
          {[...Array(4)].map((_, i) => (
            <div key={`r0c${i + 5}`} />
          ))}

          {/* 2~5행 (왼쪽 4칸 + 오른쪽 4칸) */}
          {[...Array(4)].map((_, row) =>
            [...Array(9)].map((_, col) => {
              const isLeft = col >= 0 && col < 4;
              const isRight = col >= 5 && col <= 8;
              return (
                <div
                  key={`r${row + 1}c${col}`}
                  className="aspect-[3/2] w-full h-full"
                >
                  {isLeft || isRight ? (
                    <Seat id={row * 9 + col + 2} userData={userData} />
                  ) : null}
                </div>
              );
            })
          )}

          {/* 6행 (하단 좌석 4개만 배치) */}
          {[...Array(9)].map((_, col) => {
            // 왼쪽 하단 2칸
            if (col === 0 || col === 1) {
              return (
                <div key={`r5c${col}`} className="aspect-[3/2] w-full h-full">
                  <Seat id={5 * 9 + col} userData={userData} />
                </div>
              );
            }

            // 오른쪽 하단 2칸
            if (col === 7 || col === 8) {
              return (
                <div key={`r5c${col}`} className="aspect-[3/2] w-full h-full">
                  <Seat id={5 * 9 + col} userData={userData} />
                </div>
              );
            }
            return <div key={`r5c${col}`} />;
          })}
        </div>
      </div>
    </>
  );
};

export default SeatingChart;
