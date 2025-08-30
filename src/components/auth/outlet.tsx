import type { RequireOnly } from "@/types";
import { Outlet } from "@tanstack/react-router";
import type { ComponentProps, FC } from "react";

type AuthOutletProps = {
  img: RequireOnly<ComponentProps<"input">, "src" | "alt">;
};

const AuthOutlet: FC<AuthOutletProps> = ({ img }) => {
  return (
    <>
      <section className="h-full flex items-center justify-center">
        <section className="md:w-1/2 w-full">
          <Outlet />
        </section>
        <section className="w-1/2 hidden md:flex flex-col justify-center items-center">
          <img {...img} className="w-3/5" />
        </section>
      </section>
    </>
  );
};

export default AuthOutlet;
