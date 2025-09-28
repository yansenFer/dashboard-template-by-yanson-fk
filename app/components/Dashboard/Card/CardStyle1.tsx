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

type CardStyle1Props = {
  titleCard: string
  descriptionCard: string
  valueBadge: string
  iconBadge: LucideIcon
  footerCard: string
  valueCard: string
  iconCard: LucideIcon
}

export default function CardStyle1({
  titleCard,
  descriptionCard,
  valueBadge,
  iconBadge,
  footerCard,
  valueCard,
  iconCard: IconCard,
}: CardStyle1Props) {
  return (
    <Card className="rounded-md">
      <CardHeader className="flex xl:flex-row lg:flex-col md:flex-col sm:flex-col flex-col justify-between">
        <div className="flex flex-col gap-1">
          <CardTitle>{titleCard}</CardTitle>
          <CardDescription className="text-sm">
            {descriptionCard}
          </CardDescription>
        </div>
        <BadgeDashboard icon={iconBadge} value={valueBadge} />
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <p className="font-extrabold text-xl text-orange-600">{valueCard}</p>
          <IconCard className="text-orange-600" width={30} height={30} />
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs">{footerCard}</p>
      </CardFooter>
    </Card>
  )
}
