import React from "react";

const Header = () => {
  return (
    <header className="w-full bg-blue-100 text-blue-900 py-4 px-6 shadow-md flex items-center justify-between border-b-4 border-blue-400">
      <div className="flex items-baseline gap-3">
        <h1 className="text-5xl font-bold tracking-wide select-none">
          Woori-Duri
        </h1>
        <span className="text-sm font-medium text-blue-600 select-none">
          우리 함께
        </span>
      </div>
    </header>
  );
};

export default Header;
