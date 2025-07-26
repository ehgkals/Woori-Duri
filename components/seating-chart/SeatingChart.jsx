import React from 'react'
import Seat from './Seat'

const SeatingChart = () => {
  return (
    <div className="w-full min-w-[1040px] aspect-[1040/500] bg-white shadow-lg p-6 flex items-center justify-center overflow-auto">
      <div className="grid grid-cols-9 grid-rows-6 gap-4 w-full h-full">
        {/* 1행 (중앙 좌석만 배치) */}
        {[...Array(4)].map((_, i) => <div key={`r0c${i}`} />)}
        <div className="aspect-[3/2] w-full h-full"><Seat></Seat></div>
        {[...Array(4)].map((_, i) => <div key={`r0c${i + 5}`} />)}

        {/* 2~5행 (왼쪽 4칸 + 오른쪽 4칸) */}
        {[...Array(4)].map((_, row) =>
          [...Array(9)].map((_, col) => {
            const isLeft = col >= 0 && col < 4;
            const isRight = col >= 5 && col <= 8;
            return (
              <div key={`r${row + 1}c${col}`} className="aspect-[3/2] w-full h-full">
                {(isLeft || isRight) ? <Seat /> : null}
              </div>
            );
          })
        )}

        {/* 6행 (하단 좌석 4개만 배치) */}
        {[...Array(9)].map((_, col) => {
          // 왼쪽 하단 2칸
          if (col === 0 || col === 1) {
            return (
              <div key={`r5c${col}`} className="aspect-[3/2] w-full h-full">
                <Seat />
              </div>
            );
          }

          // 오른쪽 하단 2칸
          if (col === 7 || col === 8) {
            return (
              <div key={`r5c${col}`} className="aspect-[3/2] w-full h-full">
                <Seat />
              </div>
            );
          }

          return <div key={`r5c${col}`} />;
        })}
      </div>
    </div>
  );
};

export default SeatingChart;
