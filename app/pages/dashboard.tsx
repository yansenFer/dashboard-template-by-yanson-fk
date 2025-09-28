// oxlint-disable no-empty-pattern
import Layout from '~/components/Layout'
import type { Route } from '../+types/root'
import {
  ArrowUpDown,
  MoreHorizontal,
  Rocket,
  TrendingDown,
  TrendingUp,
  User,
  UserCheck,
  Users,
} from 'lucide-react'
import CardStyle1 from '~/components/Dashboard/Card/CardStyle1'
import ChartStyle from '~/components/Dashboard/Chart/ChartStyle'
import type { ColumnDef } from '@tanstack/react-table'
import { useState } from 'react'
import type { Views } from '~/components/Dashboard/Table/TableStyle1'
import type { ChartConfig } from '~/components/ui/chart'
import { chartData } from '~/data/dataVisitors'
import { Button } from '~/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Dashboard' },
    { name: 'Dashboard', content: 'Welcome to my dashboard!' },
  ]
}

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  desktop: {
    label: 'Desktop',
    color: 'var(--chart-1)',
  },
  mobile: {
    label: 'Mobile',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig

export default function Dashboard() {
  //for selected value
  const [timeRange, setTimeRange] = useState('90d')

  //this is for list dropdown
  const dropdownData = [
    { value: '90d', label: 'Last 3 months' },
    { value: '30d', label: 'Last 30 days' },
    { value: '7d', label: 'Last 7 days' },
  ]

  //for filter data
  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date('2024-06-30')
    let daysToSubtract = 90
    if (timeRange === '30d') {
      daysToSubtract = 30
    } else if (timeRange === '7d') {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  //columns for table desktop
  const columnsDesktop: ColumnDef<Views>[] = [
    {
      id: 'select',
      header: () => <span>No.</span>,
      cell: ({ row }) => row.index + 1,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'date',
      header: 'Date',
      cell: ({ row }) => <div className="capitalize">{row.original.date}</div>,
    },
    {
      accessorKey: 'desktop',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Desktop
            <ArrowUpDown />
          </Button>
        )
      },
      filterFn: (row, columnId, filterValue) => {
        const value = row.getValue<number>(columnId)
        return String(value).includes(String(filterValue))
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue('desktop')}</div>
      ),
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => {}}>
                Copy Views ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  //columns for table mobile
  const columnsMobile: ColumnDef<Views>[] = [
    {
      id: 'select',
      header: () => <span>No.</span>,
      cell: ({ row }) => row.index + 1,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'date',
      header: 'Date',
      cell: ({ row }) => <div className="capitalize">{row.original.date}</div>,
    },
    {
      accessorKey: 'mobile',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Mobile
            <ArrowUpDown />
          </Button>
        )
      },
      filterFn: (row, columnId, filterValue) => {
        const value = row.getValue<number>(columnId)
        return String(value).includes(String(filterValue))
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue('mobile')}</div>
      ),
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => {}}>
                Copy Views ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  return (
    <Layout>
      <div className="flex flex-col gap-5">
        <div className="grid gap-5 lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
          {/* card section */}
          <CardStyle1
            descriptionCard="Last Website Visitors"
            footerCard="Card Visitors for the last 6 months"
            iconBadge={TrendingUp}
            iconCard={User}
            titleCard="Website Visitors"
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
        {/* chart section with table data */}
        <ChartStyle
          chartConfig={chartConfig}
          columnsDesktop={columnsDesktop}
          columnsMobile={columnsMobile}
          dropdownData={dropdownData}
          filteredData={filteredData}
          setTimeRange={setTimeRange}
          timeRange={timeRange}
        />
      </div>
    </Layout>
  )
}
