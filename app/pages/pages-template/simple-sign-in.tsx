import { LockKeyhole, Mail } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import InputField from '~/components/Form/InputField'
import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import type { RootState } from '~/store/store'

export default function SimpleSignIn() {
  const isDark = useSelector((state: RootState) => state.dark.isDark)
  const navigate = useNavigate()
  return (
    <main className="flex w-full h-screen justify-center items-center bg-gradient-to-r from-orange-300 via-orange-100 to-orange-300">
      <Card className="px-16 w-xl flex flex-col gap-0 justify-center items-center shadow-none border-none">
        <span
          className={`text-2xl font-bold text-black ${isDark && 'text-white'}`}
        >
          YFK Template
        </span>
        <span
          className={`text-4xl font-semibold text-black mt-5 ${isDark && 'text-white'}`}
        >
          Welcome Back!
        </span>
        <span className={`text-gray-500 mt-2 ${isDark && 'text-white'}`}>
          Sign in to your account to continue
        </span>
        <form className="flex flex-col gap-10 w-full mt-10">
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
            <span
              className={`mx-4 text-gray-500 text-sm ${isDark && 'text-white'}`}
            >
              Or Login With
            </span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <Button
            className={` border border-orange-600 hover:shadow-lg  ${isDark ? 'bg-dark text-white' : 'hover:bg-white bg-white text-black'}`}
          >
            <img src="/google.png" width={24} height={24} /> Login With Google
          </Button>
          <div className="flex gap-1">
            <p>Don't have an account?</p>
            <button
              type="button"
              onClick={() => navigate('/account/simple-sign-up')}
              className="text-blue-600 cursor-pointer"
            >
              Sign Up
            </button>
          </div>
        </form>
      </Card>
    </main>
  )
}
