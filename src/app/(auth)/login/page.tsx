import { LoginForm } from "@/components/auth/LoginForm"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login - Voyage",
  description: "Log in to your Voyage account",
}

export default function LoginPage() {
  return (
    <div className="w-full flex justify-center">
      <LoginForm />
    </div>
  )
}
