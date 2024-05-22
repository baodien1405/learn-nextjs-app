import { RegisterForm } from '@/app/(auth)/register/_components'

export default function RegisterPage() {
  return (
    <div className="w-full">
      <h1 className="text-center text-2xl font-semibold mb-5">Register</h1>

      <div className="flex justify-center">
        <RegisterForm />
      </div>
    </div>
  )
}
