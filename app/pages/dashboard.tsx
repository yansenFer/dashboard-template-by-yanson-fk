import Layout from '~/components/Layout'
import type { Route } from '../+types/root'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { Badge } from '~/components/ui/badge'
import {
  Rocket,
  TrendingDown,
  TrendingUp,
  User,
  UserCheck,
  Users,
} from 'lucide-react'
import CardStyle1 from '~/components/Dashboard/Card/CardStyle1'
import ChartStyle from '~/components/Dashboard/Chart/ChartStyle'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Dashboard' },
    { name: 'Dashboard', content: 'Welcome to my dashboard!' },
  ]
}

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col gap-5">
        <div className="grid gap-5 lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
          {/* card section */}
          <CardStyle1
            descriptionCard="Last Website Views"
            footerCard="Card Visitors for the last 6 months"
            iconBadge={TrendingUp}
            iconCard={User}
            titleCard="Website Views"
            valueBadge="+12.5%"
            valueCard="1M Views"
          />
          <CardStyle1
            descriptionCard="Down 20% this period"
            footerCard="Acquisition needs attention"
            iconBadge={TrendingDown}
            iconCard={Users}
            titleCard="New Customers"
            valueBadge="20%"
            valueCard="1,234"
          />
          <CardStyle1
            descriptionCard="Strong user retention"
            footerCard="Engagement exceed targets"
            iconBadge={TrendingUp}
            iconCard={UserCheck}
            titleCard="Active Accounts"
            valueBadge="+12.5%"
            valueCard="45,678"
          />
          <CardStyle1
            descriptionCard="Steady performance increase"
            footerCard="Meets growth projections"
            iconBadge={TrendingUp}
            iconCard={Rocket}
            titleCard="Growth Rate"
            valueBadge="+4.5%"
            valueCard="4.5%"
          />
        </div>
        {/* chart section */}
        <ChartStyle />
      </div>
    </Layout>
  )
}
