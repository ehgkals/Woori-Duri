import Game from "@/components/game/Game";
import LeaderBoard from "@/components/game/LeaderBoard";
import { SocketProvider } from "@/context/SocketContext";

export default function GamePage() {
  return (
    <SocketProvider>
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
      </header>

      <main className="flex w-full h-[calc(100vh-80px)] text-sm">
        {/* 게임 영역 */}
        <div className="flex-1 p-2 overflow-hidden flex items-center justify-center">
          <Game />
        </div>

        {/* 순위판 영역 */}
        <div className="w-[400px] border-l border-gray-300 p-3 bg-gray-50 h-full overflow-y-scroll scrollbar-hide">
          <LeaderBoard />
        </div>
      </main>
    </SocketProvider>
  );
}
