import { Search } from 'lucide-react'
import { Input } from '../ui/input'
import { useSelector } from 'react-redux'
import type { RootState } from '~/store/store'

export default function () {
  const isDark = useSelector((state: RootState) => state.dark.isDark)

  return (
    <div className="relative flex-1 max-w-md">
      <Search
        className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDark && 'text-dark'}`}
        size={16}
        color={isDark ? 'white' : 'black'}
      />
      <Input placeholder="Search..." className="pl-10 " />
    </div>
  )
}
