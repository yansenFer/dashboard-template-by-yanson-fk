import { notifications } from '~/data/dataNotification'
import { Button } from '../ui/button'
import { X } from 'lucide-react'

type NotificationModalProps = {
  onClose: () => void
}

export default function NotificationModal({ onClose }: NotificationModalProps) {
  return (
    <div className="bg-white shadow-lg absolute top-14 z-50 w-[360px] right-0 rounded-lg px-3 py-2">
      <div className="flex pb-2 border-b justify-between">
        <span className="font-semibold text-lg text-gray-700">
          Notification
        </span>
        <button type="button" onClick={onClose} className="cursor-pointer mr-2">
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
              <p className="text-gray-700 font-bold text-sm">{notif.title}</p>
              <p className="text-gray-700 whitespace-normal text-sm">
                {notif.content}
              </p>
              <p className="text-gray-700 text-sm">{notif.footer}</p>
            </div>
          </div>
        ))}
      </div>
      <Button className="mt-2 flex w-full bg-transparent text-black border border-gray-300 py-5 hover:bg-gray-100">
        View All Notification
      </Button>
    </div>
  )
}
