import illustrationImg from '@/assets/images/Illustration.png'
import AuthOutlet from '@/components/auth/outlet'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/signup')({
  component: () => (
    <AuthOutlet imgAlt="Studious students" imgSrc={illustrationImg} />
  ),
})
