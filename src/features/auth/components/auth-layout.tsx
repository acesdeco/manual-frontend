import { Link } from "@tanstack/react-router"
import type { ComponentType, FC } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export type AuthLayoutProps = {
  StudentComponent: ComponentType
  InstructorComponent: ComponentType
  imgSrc: string
  title: string
  description?: string
  route: "login" | "signup"
}

export const AuthLayout: FC<AuthLayoutProps> = ({
  imgSrc,
  title,
  description,
  InstructorComponent,
  StudentComponent,
  route,
}) => {
  return (
    <div className="flex min-h-[calc(100vh-120px)] items-center justify-center gap-8 lg:gap-16">
      {/* Form Section */}
      <div className="w-full max-w-md">
        <Card className="border-0 shadow-none sm:border sm:shadow-sm">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="student" className="w-full">
              <TabsList className="mb-6 grid w-full grid-cols-2">
                <TabsTrigger value="student">Student</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
              </TabsList>
              <TabsContent value="student" className="space-y-4">
                <StudentComponent />
              </TabsContent>
              <TabsContent value="instructor" className="space-y-4">
                <InstructorComponent />
              </TabsContent>
            </Tabs>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              {route === "login"
                ? "Don't have an account?"
                : "Already have an account?"}{" "}
              <Link
                to={route === "login" ? "/signup" : "/login"}
                className="font-medium text-primary hover:underline"
              >
                {route === "login" ? "Sign Up" : "Log In"}
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Illustration Section - Desktop Only */}
      <div className="hidden w-full max-w-md items-center justify-center lg:flex">
        <img
          src={imgSrc}
          alt="Authentication illustration"
          className="w-4/5 object-contain"
        />
      </div>
    </div>
  )
}

export default AuthLayout
