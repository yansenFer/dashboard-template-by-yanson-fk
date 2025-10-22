import { LockKeyhole, Mail, User } from 'lucide-react'
import { useNavigate } from 'react-router'
import InputField from '~/components/Form/InputField'
import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import { Input } from '~/components/ui/input'

export default function SimpleSignUp() {
  const navigate = useNavigate()
  return (
    <main className="flex w-full h-screen justify-center items-center bg-gradient-to-r from-orange-300 via-orange-100 to-orange-300">
      <Card className="px-16 w-xl flex flex-col gap-0 justify-center items-center shadow-none border-none">
        <span className="text-4xl self-start font-bold text-gray-800 mt-10">
          Sign Up
        </span>
        <span className="text-gray-500 mt-2 self-start">
          Sign up to continue
        </span>
        <form className="flex flex-col gap-10 w-full mt-10">
          <InputField
            labelName="Name"
            onChange={() => {}}
            type="text"
            Icon={User}
            variant="float-label-2"
          />
          <InputField
            labelName="Email"
            onChange={() => {}}
            type="email"
            Icon={Mail}
            variant="float-label-2"
          />
          <InputField
            labelName="Password"
            onChange={() => {}}
            type="password"
            Icon={LockKeyhole}
            variant="float-label-2"
          />
          <Button
            type="button"
            onClick={() => navigate('/', { replace: true })}
            className="hover:shadow-lg"
          >
            Login
          </Button>
          <div className="flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500 text-sm">Or Login With</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <Button className="bg-white border text-black border-orange-600 hover:shadow-lg hover:bg-white">
            <img src="/google.png" width={24} height={24} /> Login With Google
          </Button>
          <div className="flex gap-1">
            <p>Already have an account?</p>
            <button
              type="button"
              onClick={() => navigate('/account/simple-sign-in')}
              className="text-blue-600 cursor-pointer"
            >
              Sign In
            </button>
          </div>
        </form>
      </Card>
    </main>
  )
}
