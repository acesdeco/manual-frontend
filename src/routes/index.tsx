// FIXME THE LOADER MAKES THIS PAGE USELESS

import { redirectGuest, redirectUser } from "@/loaders";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
  beforeLoad: async () => {
    await redirectGuest();
    await redirectUser();
  },
  head: () => ({
    meta: [
      { title: "CPE Lab" },
      {
        name: "description",
        content: "Welcome to Computer Engineering UNIUYO",
      },
    ],
  }),
});

function Home() {
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center md:px-16 px-4 py-8">
      <header>
        <h1 className="text-4xl text-center font-bold mb-4">CPE Lab</h1>
        <p className="text-lg text-center text-gray-600">
          Welcome to Computer Engineering UNIUYO
        </p>
      </header>
      <div className="flex items-center justify-center mt-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    </main>
  );
}
