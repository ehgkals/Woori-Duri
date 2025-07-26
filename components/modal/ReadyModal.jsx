import React from "react";

const ReadyModal = ({ onReady, totalOnline, readyCount }) => (
  <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
    <div className="bg-white rounded-2xl shadow-xl px-8 py-7 min-w-[320px] w-full max-w-xs flex flex-col items-center">
      <div className="text-2xl font-bold text-[#2482c5] mb-1">
        모두가 준비 중입니다
      </div>
      <div className="text-base text-[#42a5f5] font-medium mb-5">
        {readyCount} / {totalOnline} 명 준비 완료
      </div>
      <button
        className="w-full rounded-full bg-gradient-to-r from-[#1e88e5] to-[#42a5f5] text-white font-semibold py-2 text-lg shadow hover:from-[#90caf9] hover:to-[#bbdefb] hover:scale-105 transition"
        onClick={onReady}
      >
        준비 완료
      </button>
    </div>
  </div>
);

export default ReadyModal;
