import unionImg from "@/assets/images/Union.png";
import { useHeaderActive } from "@/hooks/header-active";
import { Link } from "@tanstack/react-router";
import { BiMenuAltRight } from "react-icons/bi";
import { IoIosArrowDown, IoIosClose } from "react-icons/io";
import { IoNotificationsOutline, IoPersonCircleOutline } from "react-icons/io5";

export const HeaderComp = () => {
  const { menuOpen: isMenuOpen, toggleMenu } = useHeaderActive();
  return (
    <header className="w-[100%] bg-white h-fit md:h-[10%] flex flex-row items-center py-5 justify-between bg-transparent px-10">
      <div id="left">
        <Link className="w-3" to="/dashboard/courses">
          <img alt="Union" src={unionImg} draggable={false} />
        </Link>
      </div>
      <div className="flex flex-row items-center">
        <div className="md:flex hidden flex-row items-center mx-10 border border-gray-200 rounded-lg ">
          <input
            className="text-black bg-transparent focus:outline-none focus:border-gray-500 px-3 p-1 rounded-l-md"
            type="text"
            placeholder="Search for a course"
          />
          <button
            type="submit"
            className="w-full h-full rounded-r-md bg-blue-600 p-1 px-4 border border-blue-600"
          >
            Search
          </button>
        </div>
        <div className="w-6 mx-4">
          <IoNotificationsOutline size={30} color="#1671d9" />
        </div>
        <div className="flex items-center gap-1 flex-row justify-center">
          <div className="w-6 ">
            <IoPersonCircleOutline size={30} color="#1671d9" />
          </div>
          <div className="md:flex hidden gap-3 justify-center items-center">
            <button>
              <IoIosArrowDown size={20} color="#1671d9" />
            </button>
          </div>
          <button
            onClick={() => toggleMenu()}
            className="cursor-pointer md:hidden"
          >
            {isMenuOpen ? (
              <IoIosClose size={30} color="#1671d9" />
            ) : (
              <BiMenuAltRight size={30} color="#1671d9" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
