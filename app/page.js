"use client";

import Header from "@/components/Header";
import SeatingChart from "@/components/seating-chart/SeatingChart";
import { useRef } from "react";

export default function Home() {
  const readyTriggerRef = useRef(null);

  const handleReadyClick = () => {
    if (readyTriggerRef.current) readyTriggerRef.current();
  };

  return (
    <div>
      <Header onReadyClick={handleReadyClick} />
      <SeatingChart readyTriggerRef={readyTriggerRef} />
    </div>
  );
}
