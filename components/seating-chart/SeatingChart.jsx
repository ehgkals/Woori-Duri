"use client";

import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Seat from "./Seat";
import UserModal from "../modal/UserModal";

const SeatingChart = () => {
  const [userData, setUserData] = useState([]);
  const [userIP, setUserIP] = useState("");
  const [userName, setUserName] = useState("");
  const [showUserModal, setShowUserModal] = useState(false);
  const socketRef = React.useRef(null); // socket 값을 유지하기 위해

  useEffect(() => {
    const socket = io("http://192.168.219.104:4000");
    socketRef.current = socket;

    // 서버로부터 받은 좌석 상태로 업데이트
    socket.on("userStatus", (data) => {
      console.log("Received userStatus: ", data);
      setUserData(data);

      // UserIP로 사용자 정보 찾기
      const userInfo = data.find(
        (user) => user && user.status === "online" && user.name === ""
      );

      if (userInfo) {
        setUserIP(userInfo.ip);
        setShowUserModal(true);
      } else {
        const identifiedUser = data.find(
          (user) => user && user.status === "online"
        );
        if (identifiedUser) setUserName(identifiedUser.name);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleUserNameSubmit = (name) => {
    if (!name || !socketRef.current) return;

    socketRef.current.emit("setUserName", name);
    setUserName(name);
    setShowUserModal(false);
  };

  return (
    <>
      {showUserModal && <UserModal onSubmit={handleUserNameSubmit} />}
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
