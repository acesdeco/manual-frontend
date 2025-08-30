import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "@tanstack/react-router";
import type { ComponentType, FC } from "react";

type AuthLayoutProps = {
  StudentComponent: ComponentType;
  InstructorComponent: ComponentType;
  imgSrc: string;
  title: string;
  route: "login" | "signup";
};

const AuthLayout: FC<AuthLayoutProps> = ({
  imgSrc,
  title,
  InstructorComponent,
  StudentComponent,
  route,
}) => {
  return (
    <>
      <section className="md:w-1/2 w-full">
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
        <Tabs defaultValue="student" className="w-full">
          <TabsList className="grid grid-cols-2 w-full h-auto min-h-9 mb-4">
            <TabsTrigger className="text-base" value="student">
              Student
            </TabsTrigger>
            <TabsTrigger className="text-base" value="instructor">
              Instructor
            </TabsTrigger>
          </TabsList>
          <TabsContent value="student">
            <StudentComponent />
          </TabsContent>
          <TabsContent value="instructor">
            <InstructorComponent />
          </TabsContent>
          <p className="mt-2 text-center text-sm text-gray-600">
            {route === "login"
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <Link
              to={route === "login" ? "/signup" : "/login"}
              from={route !== "login" ? "/signup" : "/login"}
              className="font-medium text-primary hover:text-primary/90"
            >
              {route === "login" ? "Sign Up" : "Log In"}
            </Link>
          </p>
        </Tabs>
      </section>
      <section className="w-1/2 hidden md:flex flex-col justify-center items-center">
        <img src={imgSrc} alt="Studious Students" className="w-3/5" />
      </section>
    </>
  );
};

export default AuthLayout;
