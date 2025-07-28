"use client";

import { useEffect, useState } from "react";
import { useSocket } from "@/context/SocketContext";

const WORD_COUNT = 20;

const LeaderBoard = () => {
  const socket = useSocket();
  const [userData, setUserData] = useState([]);
  const [myIP, setMyIP] = useState("");

  useEffect(() => {
    if (!socket) return;

    const handleUserStatus = (data) => {
      setUserData(data.list);
      if (data.me) setMyIP(data.me);
    };

    socket.on("userStatus", handleUserStatus);

    return () => {
      socket.off("userStatus", handleUserStatus);
    };
  }, [socket]);

  const participants = userData.filter((user) => user.name);

  const sorted = [...participants].sort((a, b) => {
    if (a.finishTime !== null && b.finishTime !== null)
      return a.finishTime - b.finishTime;

    if (a.finishTime !== null) return -1;
    if (b.finishTime !== null) return 1;

    return b.currentWord - a.currentWord;
  });

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mt-8 w-full max-w-3xl mx-auto">
      <div className="text-2xl font-bold mb-4 text-[#1e88e5]">
        🏆 실시간 리더보드
      </div>
      {sorted.length === 0 ? (
        <div className="text-lg text-gray-500">아직 참여자가 없습니다.</div>
      ) : (
        <table className="w-full text-center text-xl">
          <thead>
            <tr className="border-b">
              <th>순위</th>
              <th>이름</th>
              <th>진행</th>
              <th>기록(초)</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((user, idx) => (
              <tr
                key={user.ip}
                className={
                  "h-12" +
                  (user.ip === myIP
                    ? " bg-gradient-to-r from-[#e3f2fd] to-[#bbdefb] font-bold"
                    : "")
                }
              >
                <td>{idx + 1}</td>
                <td>{user.name}</td>
                <td>
                  {user.finishTime !== null
                    ? `${WORD_COUNT} / ${WORD_COUNT}`
                    : `${user.currentWord - 1 || 0} / ${WORD_COUNT}`}
                </td>
                <td>
                  {user.finishTime !== null
                    ? (user.finishTime / 1000).toFixed(2)
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LeaderBoard;
