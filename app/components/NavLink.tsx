import { NavLink } from "@remix-run/react";

interface NavLinkTsProps {
  item: string;
  location: string;
}

export const NavLinkTs = ({ item, location }: NavLinkTsProps) => {
  return (
    <NavLink
      className={({ isActive, isPending }) =>
        isActive
          ? "flex items-center text-white bg-blue-600 h-[50px] w-full  p-4 rounded-xl"
          : isPending
          ? "flex items-center hover:bg-blue-200 text-gray-900 h-[50px] p-4 w-full rounded-xl"
          : "flex items-center hover:bg-blue-200 text-gray-900 h-[50px] p-4 w-full rounded-xl"
      }
      to={location}
    >
      {item}
    </NavLink>
  );
};
