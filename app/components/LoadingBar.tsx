import IcGenerating from "./icons/IcGenerating";

export default function LoadingBar() {
  return (
    <div className="flex h-32 gap-4 p-5 fade-in-25 md:gap-6">
      <div className="w-16 h-16 animate-spin-slow"><IcGenerating/></div>

      <div className="flex w-full max-w-3xl flex-col gap-4 rounded-lg pt-2">
        <div className="h-5 w-10/12 origin-left animate-loading bg-[length:200%] rounded-lg bg-gradient-to-r from-blue-300/70 from-30% via-green-600/60 to-blue-300/70 bg-2x opacity-0"></div>
        <div className="h-5 w-full origin-left animate-loading bg-[length:200%] rounded-lg bg-gradient-to-r from-green-500/60 via-blue-300/70 via-30% to-green-500/60 to-60% bg-2x opacity-0 "></div>
        <div className="duration-600 h-5 w-3/5 origin-left animate-loading bg-[length:200%] rounded-lg bg-gradient-to-r from-blue-300/70 from-40% via-green-500/60 to-blue-300/70 to-70% bg-2x opacity-0 "></div>
      </div>
    </div>
  );
}
