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
      <Game />
      <LeaderBoard />
    </SocketProvider>
  );
}
