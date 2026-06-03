import Layout from "~/components/Layout";
import type { Route } from "../../+types/root";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Calendar,
  ChevronDown,
  Download,
  Globe,
  MousePointer2,
  Share2,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Line,
  LineChart,
} from "recharts";
import { useSelector } from "react-redux";
import type { RootState } from "~/store/store";
import {
  analyticSummaryData,
  visitorOverviewData,
  topChannelsData,
  topPagesData,
  realtimePulseData,
} from "~/data/dataAnalytic";
import { cn } from "~/lib/utils";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Analytic Command Center - Ferforge UI" },
    {
      name: "description",
      content: "Premium visitor analytics dashboard for developers",
    },
  ];
}

export default function Analytic() {
  const isDark = useSelector((state: RootState) => state.dark.isDark);

  return (
    <Layout>
      <div className="flex w-full flex-col gap-6">
        {/* ============ HEADER ============ */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
          <div>
            <h1
              className={cn(
                "text-3xl font-extrabold tracking-tight transition-colors",
                isDark ? "text-white" : "text-slate-900",
              )}
            >
              Analytics Intelligence
            </h1>
            <p className="text-sm mt-1 text-slate-500">
              Deep-dive into visitor behavior and traffic performance metrics.
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className={cn(
                "gap-2 border-slate-200 dark:border-slate-800",
                isDark ? "text-slate-300" : "text-slate-600",
              )}
            >
              <Calendar className="w-4 h-4" />
              <span>Jan 01 - Jan 30</span>
              <ChevronDown className="w-3 h-3 opacity-50" />
            </Button>
            <Button className="gap-2 bg-orange-600 hover:bg-orange-700 text-white border-0 shadow-lg shadow-orange-600/20">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export CSV</span>
            </Button>
          </div>
        </div>

        {/* ============ ROW 1: SUMMARY CARDS ============ */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {analyticSummaryData.map((stat, i) => (
            <Card key={i} className="border-0 shadow-sm overflow-hidden group">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                    {stat.title}
                  </p>
                  <div
                    className={cn(
                      "flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full",
                      stat.isUp
                        ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400"
                        : "text-rose-600 bg-rose-50 dark:bg-rose-500/10 dark:text-rose-400",
                    )}
                  >
                    {stat.isUp ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <h3
                    className={cn(
                      "text-2xl font-black transition-colors",
                      isDark ? "text-white" : "text-slate-900",
                    )}
                  >
                    {stat.value}
                  </h3>
                  <div className="h-[40px] w-[80px] opacity-60 group-hover:opacity-100 transition-opacity">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={stat.data.map((v, i) => ({ v, i }))}>
                        <Line
                          type="monotone"
                          dataKey="v"
                          stroke={stat.color}
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ============ ROW 2: MAIN CHART & REALTIME ============ */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Audience Overview */}
          <Card className="xl:col-span-2 border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="grid gap-1">
                <CardTitle className="text-xl flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                  Audience Overview
                </CardTitle>
                <CardDescription>
                  Daily unique visitors vs pageviews
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="text-slate-400">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="h-[350px] w-full">
                <ChartContainer
                  config={{
                    visitors: { label: "Visitors", color: "#f97316" },
                    views: { label: "Pageviews", color: "#ec4899" },
                  }}
                  className="h-full w-full"
                >
                  <AreaChart
                    data={visitorOverviewData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorVis" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#f97316"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#f97316"
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient
                        id="colorViews"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#ec4899"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#ec4899"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke={isDark ? "#1e293b" : "#f1f5f9"}
                    />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 600 }}
                      tickMargin={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#94a3b8", fontSize: 12 }}
                      tickMargin={10}
                    />
                    <ChartTooltip
                      content={<ChartTooltipContent indicator="dot" />}
                    />
                    <Area
                      type="monotone"
                      dataKey="visitors"
                      stroke="#f97316"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorVis)"
                    />
                    <Area
                      type="monotone"
                      dataKey="views"
                      stroke="#ec4899"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorViews)"
                    />
                  </AreaChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          {/* Real-time Pulse */}
          <Card className={cn(
            "border-0 shadow-sm relative overflow-hidden transition-all duration-300",
            isDark ? "bg-slate-950" : "bg-white"
          )}>
            <div className={cn(
              "absolute inset-0 opacity-50",
              isDark 
                ? "bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent"
                : "bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-orange-500/5 via-transparent to-transparent"
            )} />
            <CardHeader className="relative z-10">
              <div className="flex items-center justify-between">
                <CardTitle className={cn(
                  "text-lg flex items-center gap-2",
                  isDark ? "text-white" : "text-slate-900"
                )}>
                  <Activity className="w-5 h-5 text-orange-500" />
                  Live Activity
                </CardTitle>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                    Real-time
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative z-10 pt-4">
              <div className="flex flex-col items-center justify-center py-6">
                <h2 className={cn(
                  "text-6xl font-black mb-2 tracking-tighter",
                  isDark ? "text-white" : "text-slate-900"
                )}>
                  423
                </h2>
                <p className="text-slate-500 text-sm font-semibold uppercase tracking-widest">
                  Active Users Now
                </p>
              </div>
              <div className="mt-8 space-y-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Pageviews per Minute
                </p>
                <div className="h-[100px] w-full flex items-end gap-1.5">
                  {realtimePulseData.map((d, i) => (
                    <div
                      key={i}
                      className={cn(
                        "flex-1 transition-all rounded-t-sm",
                        isDark ? "bg-orange-500/20 hover:bg-orange-500" : "bg-orange-500/10 hover:bg-orange-500"
                      )}
                      style={{ height: `${(d.active / 250) * 100}%` }}
                    />
                  ))}
                </div>
              </div>
              <Button className={cn(
                "w-full mt-8 text-[10px] font-black uppercase tracking-widest py-6 border transition-all",
                isDark 
                  ? "bg-white/5 hover:bg-white/10 text-white border-white/10" 
                  : "bg-slate-50 hover:bg-slate-100 text-slate-900 border-slate-200"
              )}>
                Open Real-time Hub
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* ============ ROW 3: CHANNELS & PAGES ============ */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-10">
          {/* Top Traffic Channels */}
          <Card className="border-0 shadow-sm overflow-hidden">
            <CardHeader className="border-b border-black/[0.03] dark:border-white/[0.03]">
              <CardTitle className="text-lg flex items-center gap-2">
                <Globe className="w-5 h-5 text-sky-500" />
                Traffic Sources
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-6 space-y-6">
                {topChannelsData.map((channel, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span
                        className={cn(
                          "font-bold",
                          isDark ? "text-white" : "text-slate-900",
                        )}
                      >
                        {channel.name}
                      </span>
                      <span className="font-mono text-xs font-bold text-slate-500">
                        {channel.value.toLocaleString()} visitors
                      </span>
                    </div>
                    <div className={cn(
                      "h-2 w-full rounded-full overflow-hidden transition-colors",
                      isDark ? "bg-slate-900" : "bg-slate-100"
                    )}>
                      <div
                        className={cn(
                          "h-full rounded-full transition-all duration-1000",
                          i === 0
                            ? "bg-orange-500"
                            : i === 1
                              ? "bg-pink-500"
                              : i === 2
                                ? "bg-violet-500"
                                : "bg-sky-500",
                        )}
                        style={{ width: `${channel.rate}%` }}
                      />
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                      <span className="text-slate-400">Contribution</span>
                      <span
                        className={cn(
                          channel.trend === "up"
                            ? "text-emerald-500"
                            : "text-rose-500",
                        )}
                      >
                        {channel.rate}% total
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Content Pages */}
          <Card className="border-0 shadow-sm overflow-hidden">
            <CardHeader className="border-b border-black/[0.03] dark:border-white/[0.03]">
              <CardTitle className="text-lg flex items-center gap-2">
                <MousePointer2 className="w-5 h-5 text-pink-500" />
                Most Visited Pages
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-0">
                    <TableHead className="px-6 h-12 text-[10px] font-black uppercase tracking-widest">
                      Page Path
                    </TableHead>
                    <TableHead className="h-12 text-[10px] font-black uppercase tracking-widest">
                      Views
                    </TableHead>
                    <TableHead className="h-12 text-[10px] font-black uppercase tracking-widest text-right px-6">
                      Bounce
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topPagesData.map((page, i) => (
                    <TableRow
                      key={i}
                      className="border-b border-black/[0.02] dark:border-white/[0.02] hover:bg-orange-500/[0.02] dark:hover:bg-white/[0.02] transition-colors"
                    >
                      <TableCell className="px-6 py-4">
                        <span
                          className={cn(
                            "text-sm font-bold",
                            isDark ? "text-white" : "text-slate-900",
                          )}
                        >
                          {page.path}
                        </span>
                      </TableCell>
                      <TableCell className="py-4">
                        <span className="font-mono text-xs font-bold text-orange-500">
                          {page.views}
                        </span>
                      </TableCell>
                      <TableCell className="px-6 py-4 text-right">
                        <span className="text-xs font-semibold text-slate-500">
                          {page.bounce}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              </div>
              <div className="p-4 flex justify-center">
                <Button
                  variant="ghost"
                  className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-orange-500"
                >
                  View All Content Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
