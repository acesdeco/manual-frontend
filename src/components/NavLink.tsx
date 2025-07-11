import { Link, type LinkProps } from "@tanstack/react-router";

interface NavLinkProps extends LinkProps {
  label: string;
}

export const NavLink = ({ label, ...props }: NavLinkProps) => {
  return (
    <Link
      {...props}
      className="flex items-center hover:bg-blue-200 text-gray-900 h-[50px] p-4 w-full rounded-xl"
      activeProps={{
        className:
          "flex items-center text-white bg-blue-600 h-[50px] w-full  p-4 rounded-xl",
      }}
    >
      {label}
    </Link>
  );
};
