"use client";

import Header from "@/components/Header";
import SeatingChart from "@/components/seating-chart/SeatingChart";
import { SocketProvider } from "@/context/SocketContext";

export default function Home() {
  return (
    <SocketProvider>
      <Header />
      <SeatingChart />
    </SocketProvider>
  );
}
