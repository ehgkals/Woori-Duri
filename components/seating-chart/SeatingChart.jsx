import React from 'react'
import Seat from './Seat'

const SeatingChart = () => {
  return (
    <div className="w-full min-w-[1040px] aspect-[1040/432] bg-white shadow-lg p-6 flex justify-center items-center overflow-auto">
      <div className="flex justify-center gap-24 h-full w-full">
        <div className="flex flex-col gap-4 justify-between w-full h-full">
          {[...Array(4)].map((_, i) => (
            <div key={`L-${i}`} className="grid grid-cols-4 gap-4 w-full h-full">
              {[...Array(4)].map((_, j) => (
                <div key={j} className="aspect-[3/2] w-full h-full">
                  <Seat />
                </div>
              ))}
            </div>
          ))}

          <div className="grid grid-cols-4 gap-4 w-full h-full">
            <div className="aspect-[3/2] w-full h-full"><Seat /></div>
            <div className="aspect-[3/2] w-full h-full"><Seat /></div>
            <div></div>
            <div></div>
          </div>
        </div>

        <div className="flex flex-col gap-4 justify-between w-full h-full">
          {[...Array(4)].map((_, i) => (
            <div key={`R-${i}`} className="grid grid-cols-4 gap-4 w-full h-full">
              {[...Array(4)].map((_, j) => (
                <div key={j} className="aspect-[3/2] w-full h-full">
                  <Seat />
                </div>
              ))}
            </div>
          ))}

          <div className="grid grid-cols-4 gap-4  w-full h-full">
            <div></div>
            <div></div>
            <div className="aspect-[3/2] w-full h-full"><Seat /></div>
            <div className="aspect-[3/2] w-full h-full"><Seat /></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SeatingChart
