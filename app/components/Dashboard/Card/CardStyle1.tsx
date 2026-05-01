import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import BadgeDashboard from '../BadgeDashboard'
import type { LucideIcon } from 'lucide-react'
import { cn } from '~/lib/utils'

type CardStyle1Props = {
  titleCard: string
  descriptionCard: string
  valueBadge: string
  iconBadge: LucideIcon
  footerCard: string
  valueCard: string
  iconCard: LucideIcon
  isPositive?: boolean
}

export default function CardStyle1({
  titleCard,
  descriptionCard,
  valueBadge,
  iconBadge,
  footerCard,
  valueCard,
  iconCard: IconCard,
  isPositive = true,
}: CardStyle1Props) {
  return (
    <Card>
      <CardHeader className="flex xl:flex-row lg:flex-col md:flex-col sm:flex-col flex-col justify-between">
        <div className="flex flex-col gap-1">
          <CardTitle>{titleCard}</CardTitle>
          <CardDescription className="text-sm">
            {descriptionCard}
          </CardDescription>
        </div>
        <div className={cn(isPositive ? "[&_div]:bg-emerald-500/10 [&_div]:text-emerald-500" : "[&_div]:bg-destructive/10 [&_div]:text-destructive")}>
           <BadgeDashboard icon={iconBadge} value={valueBadge} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <p className="font-extrabold text-xl text-primary">{valueCard}</p>
          <IconCard className="text-primary" width={30} height={30} />
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">{footerCard}</p>
      </CardFooter>
    </Card>
  )
}
