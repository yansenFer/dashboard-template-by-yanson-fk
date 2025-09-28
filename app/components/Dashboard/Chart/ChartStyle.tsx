import {
  Area,
  AreaChart,
  CartesianGrid,
  LabelList,
  Line,
  XAxis,
} from 'recharts'
import SelectField from '~/components/SelectField'
import {
  CardHeader,
  CardTitle,
  CardDescription,
  Card,
  CardContent,
} from '~/components/ui/card'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '~/components/ui/chart'
import TableStyle, { type Views } from '../Table/TableStyle1'
import type { ColumnDef } from '@tanstack/react-table'

type ChartStyleProps = {
  dropdownData: any[]
  setTimeRange: (value: string) => void
  timeRange: string
  chartConfig: ChartConfig
  filteredData: any[]
  columnsMobile: ColumnDef<Views>[]
  columnsDesktop: ColumnDef<Views>[]
}

export default function ChartStyle({
  chartConfig,
  columnsDesktop,
  columnsMobile,
  dropdownData,
  filteredData,
  setTimeRange,
  timeRange,
}: ChartStyleProps) {
  return (
    <Card className="pt-0">
      {/* chart section */}
      <CardHeader className="flex items-center gap-2 space-y-0  pt-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Data Visitors</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        <SelectField
          dataDropdown={dropdownData}
          onChange={setTimeRange}
          selectedTrigger={dropdownData[0].label}
          value={timeRange}
        />
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="20%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="80%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={true} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Line
              dataKey="desktop"
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={{
                fill: 'var(--color-desktop)',
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
            <Area
              dataKey="mobile"
              type="linear"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="linear"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>

      {/* table section */}
      <CardHeader className="flex items-center gap-2 space-y-0 pt-5 sm:flex-row">
        <div className="grid gap-1">
          <CardTitle>Table Data Visitors</CardTitle>
          <CardDescription>
            Showing total desktop and mobile visitors for the last 3 months
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className=" grid lg:grid-cols-2 gap-10 md:grid-cols-1 grid-cols-1 px-2 sm:px-6">
        <TableStyle
          searchKey="desktop"
          data={filteredData
            .filter((filter) => filter.desktop)
            .map((data) => ({
              date: data.date,
              desktop: data.desktop,
            }))}
          columns={columnsDesktop}
          title="Desktop Views"
        />
        <TableStyle
          searchKey="mobile"
          data={filteredData
            .filter((filter) => filter.mobile)
            .map((data) => ({
              date: data.date,
              mobile: data.mobile,
            }))}
          columns={columnsMobile}
          title="Mobile Views"
        />
      </CardContent>
    </Card>
  )
}
