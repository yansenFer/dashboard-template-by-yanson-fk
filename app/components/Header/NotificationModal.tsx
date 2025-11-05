import { notifications } from '~/data/dataNotification'
import { Button } from '../ui/button'
import { X } from 'lucide-react'
import { motion } from 'framer-motion'
import type { RootState } from '~/store/store'
import { useSelector } from 'react-redux'

type NotificationModalProps = {
  onClose: () => void
}

export default function NotificationModal({ onClose }: NotificationModalProps) {
  const isDark = useSelector((state: RootState) => state.dark.isDark)
  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
    >
      <div
        className={` ${isDark ? 'bg-dark' : 'bg-white'} animate-fade-in-up shadow-lg absolute top-14 z-50 w-[360px] right-0 rounded-lg px-3 py-2`}
      >
        <div
          className={`flex pb-2 border-b justify-between ${isDark && 'border-dark'}`}
        >
          <span
            className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-700'}`}
          >
            Notification
          </span>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer mr-2"
          >
            <X className="w-5 h-5" color="black" />
          </button>
        </div>
        <div className="flex flex-col w-full max-h-[400px] mt-3 overflow-y-auto">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className="flex border-b py-2 px-3 flex-row gap-5"
            >
              <img
                className="w-12 h-12 mt-1 rounded-full"
                src="https://picsum.photos/300/200"
                alt="Random Image"
              />
              <div className="flex flex-col text-start">
                <p
                  className={`${isDark ? 'text-white' : 'text-gray-700'} font-bold text-sm`}
                >
                  {notif.title}
                </p>
                <p
                  className={`${isDark ? 'text-white' : 'text-gray-700'} whitespace-normal text-sm`}
                >
                  {notif.content}
                </p>
                <p
                  className={`${isDark ? 'text-white' : 'text-gray-700'} text-sm`}
                >
                  {notif.footer}
                </p>
              </div>
            </div>
          ))}
        </div>
        <Button
          className={`mt-2 flex w-full bg-transparent ${isDark ? 'text-white border-dark hover:bg-slate-900' : 'text-black border-gray-300 hover:bg-gray-100'}  border  py-5 `}
        >
          View All Notification
        </Button>
      </div>
    </motion.div>
  )
}
