import { createFileRoute, Link } from "@tanstack/react-router";
import badgeOfHonourImg from "@/assets/images/badge-of-honour.png";
import scheduleImg from "@/assets/images/schedule.png";

export const Route = createFileRoute("/_app/dashboard/home")({
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: "Courses" },
      { name: "description", content: "View Courses" },
    ],
  }),
});

function RouteComponent() {
  return (
    <>
      <header className="mb-10 flex flex-row items-center justify-between">
        <h1 className="text-black text-2xl font-semibold">Courses</h1>
        <Link to="/dashboard/courses/new" className="w-fit">
          <button className="bg-[#001633] text-white px-4 py-2 rounded-md">
            Create Course
          </button>
        </Link>
      </header>
      <main>
        <section className="flex flex-row justify-between items-center rounded-md bg-[#E3EFFC] py-6 border-[#1671D9] border px-6">
          <article className="w-4/6">
            <p className="text-[#001633]">
              Your efforts truly matter. With every step, you uplift lives and
              bring more light to the world. Thank you for being amazing.
            </p>
            <Link to="/dashboard/courses/new" className="w-fit">
              <button className="bg-[#001633] text-white px-4 py-2 rounded-md mt-2">
                Create Course
              </button>
            </Link>
          </article>
          <figure className="w-2/6 flex flex-row justify-center">
            <img alt="Badge" src={badgeOfHonourImg} />
          </figure>
        </section>
        <section className="flex flex-col justify-between mt-5">
          <header>
            <h2 className="text-black text-2xl font-semibold">Your schedule</h2>
          </header>
          <figure className="w-full flex flex-row justify-center">
            <img alt="Schedule" src={scheduleImg} />
          </figure>
        </section>
      </main>
    </>
  );
}
