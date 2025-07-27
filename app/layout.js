import "./globals.css";
import { SocketProvider } from "@/context/SocketContext";
import { GameAccessProvider } from "@/context/GameAccessContext";

export const metadata = {
  title: "WOORI DURI",
  icons: {
    icon: "/wooriduri-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen bg-blue-300">
        <SocketProvider>
          <GameAccessProvider>{children}</GameAccessProvider>
        </SocketProvider>
      </body>
    </html>
  );
}
