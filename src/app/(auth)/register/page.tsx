import { RegisterForm } from "@/components/auth/RegisterForm"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Register - Voyage",
  description: "Create a new Voyage account",
}

export default function RegisterPage() {
  return (
    <div className="w-full flex justify-center">
      <RegisterForm />
    </div>
  )
}
