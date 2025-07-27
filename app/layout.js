import "./globals.css";
import { SocketProvider } from "@/context/SocketContext";

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
        <SocketProvider>{children}</SocketProvider>
      </body>
    </html>
  );
}
