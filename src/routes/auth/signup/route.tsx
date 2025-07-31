import illustrationImg from "@/assets/images/Illustration.png";
import AuthOutlet from "@/components/auth/outlet";
import { createFileRoute } from "@tanstack/react-router";

// TODO add meta data for title here
export const Route = createFileRoute("/auth/signup")({
  component: () => (
    <AuthOutlet img={{ alt: "Studious students", src: illustrationImg }} />
  ),
});
