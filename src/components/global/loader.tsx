import clsx from "clsx";

export const Loader = () => {
  return (
    <div className="w-2.5 aspect-square rounded-[50%] [animation:l5_1s_infinite_linear_alternate]" />
  );
};

export function Overloader({ isLoading }: { isLoading: boolean }) {
  return (
    <div
      className={clsx(
        "fixed h-screen w-screen top-0 z-30 backdrop-blur bg-black/20 left-0 flex justify-center items-center",
        !isLoading ? "opacity-0 pointer-events-none" : "opacity-100",
      )}
    >
      <Loader />
    </div>
  );
}
