const Seat = ({ id, userData }) => {
  const seat = userData.find((seat) => seat.id === id);
  const status = seat ? seat.status : "offline";
  const isOnline = status === "online";

  return (
    <div
      className={`w-full h-full min-w-[96px] min-h-[64px] rounded-xl flex items-center justify-center font-semibold transition-all duration-150`}
      style={{
        backgroundColor: isOnline ? "#e3f0fb" : "#fff",
        border: `2.5px solid ${isOnline ? "#90c3ee" : "#e5eaf0"}`,
        color: isOnline ? "#2482c5" : "#a6b3c6",
        boxShadow: isOnline ? "0 2px 8px #b6d8f233" : "0 1.5px 5px #dde4eb2e",
      }}
    >
      {isOnline ? "온라인" : "오프라인"}
    </div>
  );
};

export default Seat;
