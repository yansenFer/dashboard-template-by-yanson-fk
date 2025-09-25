import { Search } from 'lucide-react'
import { Input } from '../ui/input'

export default function () {
  return (
    <div className="relative flex-1 max-w-md">
      <Search
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
        size={16}
      />
      <Input
        placeholder="Search..."
        className="pl-10 bg-muted/50 border-0 focus-visible:ring-1"
      />
    </div>
  )
}
