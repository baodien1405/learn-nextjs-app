import { LoginForm } from '@/app/(auth)/login/_components'

export default function LoginPage() {
  return (
    <div className="w-full">
      <h1 className="text-center text-2xl font-semibold mb-5">Login</h1>

      <div className="flex justify-center">
        <LoginForm />
      </div>
    </div>
  )
}
