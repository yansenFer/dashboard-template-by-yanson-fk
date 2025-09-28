import { Bell, Grid, Settings, Sun, User } from 'lucide-react'
import { Button } from '../ui/button'
import SearchBar from './SearchBar'

export default function Header() {
  return (
    <header className=" bg-white sticky z-10 top-0 border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 ml-5">
          <SearchBar />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Grid name="grid" />
          </Button>
          <Button variant="ghost" size="icon">
            <Sun name="sun" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings name="settings" />
          </Button>
          <Button variant="ghost" size="icon">
            <Bell name="bell" />
          </Button>
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <User name="user" size={16} className="text-primary-foreground" />
          </div>
        </div>
      </div>
    </header>
  )
}
