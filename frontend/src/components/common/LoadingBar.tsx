const Loading = ({ className = "" }: { className?: string }) => {
  return (
    <div
      className={`${className} w-full h-[4px] bg-[#bbfcb8] bg-no-repeat bg-loading-pos bg-loading-img animate-loading rounded-xl`}
    />
  );
};

export default Loading;
