// components/NicknameModal.jsx
"use client";

import React, { useState } from "react";

const NicknameModal = ({ onSubmit }) => {
  const [input, setInput] = useState("");

  const handleEnter = (e) => {
    if (e.key === "Enter" && input.trim().length > 1) submit();
  };
  const submit = () => {
    if (input.trim().length > 1) onSubmit(input.trim());
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl px-8 py-7 min-w-[320px] w-full max-w-xs flex flex-col items-center">
        <h2 className="text-2xl font-bold text-[#2482c5] mb-3 tracking-tight">
          이름을 입력해주세요
        </h2>
        <input
          className="w-full border border-blue-200 rounded-lg px-4 py-2 mb-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          type="text"
          maxLength={16}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleEnter}
          placeholder="이름 (2글자 이상)"
          autoFocus
        />
        <button
          className="font-semibold text-lg select-none rounded-full px-7 py-2 transition duration-200 hover:opacity-95"
          style={{
            background: "linear-gradient(90deg, #1e88e5, #42a5f5)",
            color: "#ffffff",
            border: "1.5px solid #42a5f5",
            boxShadow: "0 3px 10px rgba(66, 165, 245, 0.35)",
            fontFamily: "'Pretendard', 'Malgun Gothic', sans-serif",
            letterSpacing: "1px",
          }}
          disabled={input.trim().length < 2}
          onClick={submit}
        >
          입장
        </button>
      </div>
    </div>
  );
};

export default NicknameModal;
