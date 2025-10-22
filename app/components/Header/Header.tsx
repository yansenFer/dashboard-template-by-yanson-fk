import { Bell, Grid, Settings, Sun, User } from 'lucide-react'
import { Button } from '../ui/button'
import SearchBar from './SearchBar'
import { useState } from 'react'
import NotificationModal from './NotificationModal'

export default function Header() {
  const [isHaveNotif, setIsHaveNotif] = useState(true)
  const [isShowNotif, setIsShowNotif] = useState(false)

  console.log(isShowNotif, '<<')
  return (
    <header className="bg-white sticky z-10 top-0 border-b border-border px-6 py-4">
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
          <div className="relative">
            <Button
              className="bg-transparent relative border rounded-full hover:border-orange-600 hover:bg-transparent"
              size="icon"
              type="button"
              onClick={() => {
                setIsHaveNotif(false)
                setIsShowNotif((e) => !e)
              }}
            >
              {isHaveNotif && (
                <div className="absolute top-0 right-0">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex size-2 rounded-full bg-orange-500"></span>
                  </span>
                </div>
              )}
              <Bell name="bell" color="black" />
            </Button>
            {isShowNotif && (
              <NotificationModal onClose={() => setIsShowNotif(false)} />
            )}
          </div>

          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <User name="user" size={16} className="text-primary-foreground" />
          </div>
        </div>
      </div>
    </header>
  )
}
