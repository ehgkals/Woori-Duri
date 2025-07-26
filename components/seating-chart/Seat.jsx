const Seat = ({ id, userData }) => {
  const seat = userData.find((seat) => seat.id === id);
  const status = seat ? seat.status : "offline";

  return (
    <div
      className={`w-full h-full min-w-[96px] min-h-[64px] rounded-xl border border-blue-300 shadow-md flex items-center justify-center text-blue-800 font-semibold`}
      style={{
        backgroundColor: status === "online" ? "#ADD8E6" : "#D3D3D3",
      }}
    >
      {status === "online" ? "online" : "offline"}
    </div>
  );
};

export default Seat;
