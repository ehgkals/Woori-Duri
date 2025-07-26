import React from "react";

const Header = ({ onReadyClick }) => {
  return (
    <header
      className="w-full py-4 px-8 flex items-center justify-between shadow"
      style={{
        background: "#fff",
        borderBottom: "6px solid #2482c5",
        fontFamily:
          "'Pretendard', 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif",
      }}
    >
      <div className="flex items-end gap-4">
        <img
          src="/wooriduri-icon.png"
          alt="WOORI DURI 아이콘"
          className="h-[54px] w-[54px] object-contain block"
        />
        <img
          src="/wooriduri-logo.png"
          alt="WOORI DURI 로고"
          className="h-13 object-contain block"
        />
      </div>

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
        type="button"
        onClick={onReadyClick}
      >
        우리 함께
      </button>
    </header>
  );
};

export default Header;
