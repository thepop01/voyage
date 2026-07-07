import { PasswordResetForm } from "@/components/auth/PasswordResetForm"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Reset Password - Voyage",
  description: "Reset your Voyage account password",
}

export default function ResetPasswordPage() {
  return (
    <div className="w-full flex justify-center">
      <PasswordResetForm />
    </div>
  )
}
