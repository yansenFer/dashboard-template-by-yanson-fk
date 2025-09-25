import { Badge } from '../ui/badge'
import type { LucideIcon } from 'lucide-react'

type BadgeDashboardProps = {
  value: string
  icon: LucideIcon
}

export default function BadgeDashboard({
  value,
  icon: Icon,
}: BadgeDashboardProps) {
  return (
    <Badge variant={'destructive'}>
      <span className="font-bold text-xs flex flex-row gap-1 items-center justify-center">
        <Icon width={14} height={14} />
        {value}
      </span>
    </Badge>
  )
}
