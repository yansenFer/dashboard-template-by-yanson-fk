import { notifications, type NotificationType } from '~/data/dataNotification'
import { Button } from '../ui/button'
import { Settings, MessageSquare, AlertCircle, Server, AtSign, CheckCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import type { RootState } from '~/store/store'
import { useSelector } from 'react-redux'
import { cn } from '~/lib/utils'

type NotificationModalProps = {
  onClose: () => void
}

const getIconFormat = (type: NotificationType) => {
  switch (type) {
    case 'message':
      return { icon: MessageSquare, bg: 'bg-blue-500/10', text: 'text-blue-500' }
    case 'alert':
      return { icon: AlertCircle, bg: 'bg-red-500/10', text: 'text-red-500' }
    case 'system':
      return { icon: Server, bg: 'bg-slate-500/10', text: 'text-slate-500 dark:text-slate-400' }
    case 'mention':
      return { icon: AtSign, bg: 'bg-emerald-500/10', text: 'text-emerald-500' }
    default:
      return { icon: MessageSquare, bg: 'bg-slate-500/10', text: 'text-slate-500' }
  }
}

export default function NotificationModal({ onClose }: NotificationModalProps) {
  const isDark = useSelector((state: RootState) => state.dark.isDark)
  
  const textPrimary = isDark ? 'text-white' : 'text-slate-900'
  const textMuted = isDark ? 'text-slate-400' : 'text-slate-500'
  const borderMuted = isDark ? 'border-slate-800' : 'border-slate-100'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className="absolute top-14 right-0 z-50 pt-2"
    >
      <div
        className={cn(
          "w-[380px] rounded-2xl shadow-2xl overflow-hidden border",
          isDark ? "bg-slate-900 border-slate-800 shadow-black/50" : "bg-white border-slate-200 shadow-slate-200/50"
        )}
      >
        {/* Header */}
        <div className={cn("flex items-center justify-between px-5 py-4 border-b", borderMuted)}>
          <div className="flex items-center gap-2">
            <h3 className={cn("font-bold text-base", textPrimary)}>
              Notifications
            </h3>
            <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              2 new
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              className={cn("text-xs font-semibold hover:underline transition-colors flex items-center gap-1", textMuted, isDark ? "hover:text-white" : "hover:text-slate-900")}
            >
              <CheckCheck className="w-3.5 h-3.5" />
              Mark all read
            </button>
            <div className={cn("w-px h-4 mx-1", isDark ? "bg-slate-700" : "bg-slate-300")} />
            <button 
              className={cn("p-1 rounded-full transition-colors", isDark ? "hover:bg-slate-800 text-slate-400" : "hover:bg-slate-100 text-slate-500")}
              onClick={onClose}
              title="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notification List */}
        <div className="flex flex-col max-h-[420px] overflow-y-auto">
          {notifications.map((notif) => {
            const { icon: Icon, bg, text } = getIconFormat(notif.type)
            
            return (
              <div
                key={notif.id}
                className={cn(
                  "flex items-start gap-4 p-4 border-b last:border-b-0 cursor-pointer transition-colors group",
                  borderMuted,
                  notif.isUnread 
                    ? isDark ? "bg-slate-800/50" : "bg-slate-50/50" 
                    : isDark ? "hover:bg-slate-800/30" : "hover:bg-slate-50"
                )}
              >
                {/* Avatar / Icon Indicator */}
                <div className="relative flex-shrink-0 mt-1">
                  {notif.avatar ? (
                    <img
                      src={notif.avatar}
                      alt="Avatar"
                      className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                    />
                  ) : (
                    <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", bg, text)}>
                      <Icon className="w-4 h-4" />
                    </div>
                  )}
                  {notif.isUnread && (
                    <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-orange-500 border-2 border-white dark:border-slate-900 rounded-full" />
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className={cn("font-bold text-sm truncate", textPrimary)}>
                      {notif.title}
                    </p>
                    <span className={cn("text-[11px] font-medium whitespace-nowrap", textMuted)}>
                      {notif.time}
                    </span>
                  </div>
                  <p className={cn("text-xs leading-relaxed line-clamp-2", textMuted)}>
                    {notif.content}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div className={cn("p-2 border-t", borderMuted)}>
          <Button
            variant="ghost"
            className={cn(
              "w-full h-10 rounded-xl text-sm font-bold transition-all duration-200",
              isDark 
                ? "text-orange-500 hover:text-white hover:bg-orange-500 shadow-none" 
                : "text-orange-600 hover:text-white hover:bg-orange-500 shadow-none"
            )}
            onClick={onClose}
          >
            View all notifications
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
