const Seat = ({ children }) => {
  return (
    <div className="w-full h-full min-w-[96px] min-h-[64px] bg-blue-100 rounded-xl border border-blue-300 shadow-md flex items-center justify-center text-blue-800 font-semibold">
      { children || 'Seat'}
    </div>
  )
}

export default Seat