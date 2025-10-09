import { LockKeyhole, Mail } from 'lucide-react'
import { Card } from '~/components/ui/card'
import { Input } from '~/components/ui/input'

export default function SimpleSignIn() {
  return (
    <main className="flex w-full h-screen justify-center items-center bg-gradient-to-r from-orange-300 via-orange-100 to-orange-200">
      <Card className="px-16 w-3xl flex flex-col gap-0 justify-center items-center shadow-none border-none">
        <span className="text-4xl font-bold text-black">YFK Template</span>
        <span className="text-2xl font-semibold text-gray-600 mt-10">
          Welcome Back!
        </span>
        <span className="text-gray-500 mt-2">
          Sign in to your account to continue
        </span>
        <div className="flex flex-col gap-10 w-full  mt-10">
          <div className="flex w-full relative">
            <Input
              type="text"
              id="email"
              placeholder=" " // penting supaya :placeholder-shown bisa dipakai
              className="peer w-full border border-gray-300 rounded-md pb-2 pt-6 h-12 focus:border-orange-500 hover:border-orange-500"
            />
            <label
              htmlFor="email"
              className="absolute flex items-center gap-1 left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm transition-all duration-200 peer-hover:top-3 peer-hover:text-xs peer-hover:text-orange-500 peer-focus:top-3 peer-focus:text-xs peer-focus:text-orange-500 peer-[&:not(:placeholder-shown)]:top-3 peer-[&:not(:placeholder-shown)]:text-xs"
            >
              <Mail className="w-4 h-4" />
              Email
            </label>
          </div>
          <div className="flex w-full relative">
            <Input
              type="text"
              id="email"
              placeholder=" " // penting supaya :placeholder-shown bisa dipakai
              className="peer w-full border border-gray-300 rounded-md pb-2 pt-6 h-12 focus:border-orange-500 hover:border-orange-500"
            />
            <label
              htmlFor="email"
              className="absolute flex items-center gap-1 left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm transition-all duration-200 peer-hover:top-3 peer-hover:text-xs peer-hover:text-orange-500 peer-focus:top-3 peer-focus:text-xs peer-focus:text-orange-500 peer-[&:not(:placeholder-shown)]:top-3 peer-[&:not(:placeholder-shown)]:text-xs"
            >
              <LockKeyhole className="w-4 h-4" />
              Password
            </label>
          </div>
        </div>
      </Card>
    </main>
  )
}
