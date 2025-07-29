import clsx from "clsx";
import type { FC } from "react";

type ToggleProps = {
  isToggled: boolean;
  toggle: () => void;
};

const Toggle: FC<ToggleProps> = ({ isToggled, toggle }) => {
  return (
    <div className="flex items-center">
      <button
        onClick={toggle}
        className={clsx(
          "w-12 h-6 flex items-center rounded-full p-1 transition-all duration-300",
          isToggled ? "bg-green-500" : "bg-gray-300",
        )}
      >
        <div
          className={clsx(
            "w-4 h-4 bg-white rounded-full shadow-md transform transition-transform",
            isToggled ? "translate-x-6" : "translate-x-0",
          )}
        />
      </button>
    </div>
  );
};

export default Toggle;
