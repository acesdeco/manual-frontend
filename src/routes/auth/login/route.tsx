import amicoImg from "@/assets/images/amico.png";
import AuthOutlet from "@/components/auth/outlet";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/login")({
  component: () => (
    <AuthOutlet img={{ alt: "Studious Students", src: amicoImg }} />
  ),
});
