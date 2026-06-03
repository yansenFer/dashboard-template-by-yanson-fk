import Layout from "~/components/Layout";
import type { Route } from "../+types/root";
import {
  Activity,
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  Download,
  Filter,
  MoreHorizontal,
  Package,
  Plus,
  Search,
  TrendingUp,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "~/store/store";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
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
  Cell,
  Label,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";
import { Input } from "~/components/ui/input";

// Mock Data for the new design
const salesData = [
  { month: "Jan", revenue: 1200, orders: 400 },
  { month: "Feb", revenue: 1900, orders: 550 },
  { month: "Mar", revenue: 1500, orders: 480 },
  { month: "Apr", revenue: 2400, orders: 700 },
  { month: "May", revenue: 2100, orders: 620 },
  { month: "Jun", revenue: 3200, orders: 890 },
  { month: "Jul", revenue: 2800, orders: 780 },
  { month: "Aug", revenue: 3800, orders: 950 },
  { month: "Sep", revenue: 4200, orders: 1100 },
];

const categoryData = [
  { name: "Affiliate", value: 450, fill: "url(#colorOrange)" },
  { name: "Direct", value: 300, fill: "url(#colorPink)" },
  { name: "Adsense", value: 250, fill: "url(#colorViolet)" },
];

const recentOrders = [
  {
    id: "ORD-7281",
    customer: "John Doe",
    email: "johndoe@gmail.com",
    product: "Software License",
    value: "$1,250",
    date: "2024-06-15",
    status: "Complete",
  },
  {
    id: "ORD-7282",
    customer: "Kierra Franci",
    email: "kierra@gmail.com",
    product: "Cloud Hosting",
    value: "$850",
    date: "2024-06-15",
    status: "Complete",
  },
  {
    id: "ORD-7283",
    customer: "Emerson Workman",
    email: "emerson@gmail.com",
    product: "Consultation",
    value: "$3,200",
    date: "2024-06-14",
    status: "Pending",
  },
  {
    id: "ORD-7284",
    customer: "Chance Philips",
    email: "chance@gmail.com",
    product: "Software License",
    value: "$1,250",
    date: "2024-06-14",
    status: "Complete",
  },
  {
    id: "ORD-7285",
    customer: "Terry Geidt",
    email: "terry@gmail.com",
    product: "Support Plan",
    value: "$500",
    date: "2024-06-13",
    status: "Failed",
  },
];

const schedules = [
  {
    id: 1,
    time: "09:20 AM",
    date: "Wed, 11 Jan",
    title: "Business Analytics Press",
    desc: "Exploring the Future of Data-Driven",
  },
  {
    id: 2,
    time: "10:35 AM",
    date: "Fri, 15 Feb",
    title: "Business Sprint",
    desc: "Techniques from Business Sprint +2 more",
  },
  {
    id: 3,
    time: "01:15 PM",
    date: "Thu, 18 Mar",
    title: "Customer Review Meeting",
    desc: "Insights from the Customer Review",
  },
];

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Ferforge UI - Template Dashboard" },
    { name: "Dashboard", content: "Executive Business Overview" },
  ];
}

export default function Dashboard() {
  const isDark = useSelector((state: RootState) => state.dark.isDark);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrders = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return recentOrders.filter(
      (o) =>
        o.id.toLowerCase().includes(q) ||
        o.customer.toLowerCase().includes(q) ||
        o.product.toLowerCase().includes(q),
    );
  }, [searchQuery]);

  return (
    <Layout>
      <div className="flex w-full flex-col gap-6">
        {/* ============ HEADER ============ */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
          <div>
            <h1
              className={cn(
                "text-3xl font-extrabold tracking-tight",
                isDark ? "text-white" : "text-slate-900",
              )}
            >
              Overview Dashboard
            </h1>
            <p
              className={cn(
                "text-sm mt-1",
                isDark ? "text-slate-400" : "text-slate-500",
              )}
            >
              Comprehensive overview of your business performance and revenue
              growth.
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className={cn(
                "gap-2",
                isDark
                  ? "bg-slate-900 border-slate-800 text-slate-300"
                  : "bg-white border-slate-200",
              )}
            >
              <Download className="w-4 h-4" />
              <span>Export Report</span>
            </Button>
            <Button className="gap-2 bg-orange-600 hover:bg-orange-700 text-white border-0 shadow-lg shadow-orange-500/20">
              <Plus className="w-4 h-4" />
              <span>New Entry</span>
            </Button>
          </div>
        </div>

        {/* ============ ROW 1: STATS ============ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Total Revenue",
              value: "$234,210",
              change: "+12.5%",
              icon: CreditCard,
              color: "orange",
            },
            {
              title: "Active Deals",
              value: "874",
              change: "+8.2%",
              icon: Activity,
              color: "pink",
            },
            {
              title: "Customers",
              value: "1,234",
              change: "-2.4%",
              icon: Users,
              color: "violet",
            },
            {
              title: "Growth Rate",
              value: "18.5%",
              change: "+4.1%",
              icon: TrendingUp,
              color: "orange",
            },
          ].map((stat, i) => (
            <Card
              key={i}
              className="border-0 shadow-sm overflow-hidden relative group transition-all hover:shadow-md"
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p
                      className={cn(
                        "text-sm font-medium mb-1",
                        isDark ? "text-slate-400" : "text-slate-500",
                      )}
                    >
                      {stat.title}
                    </p>
                    <h3
                      className={cn(
                        "text-2xl font-black",
                        isDark ? "text-white" : "text-slate-900",
                      )}
                    >
                      {stat.value}
                    </h3>
                    <div className="flex items-center gap-1 mt-2">
                      <span
                        className={cn(
                          "text-xs font-bold px-1.5 py-0.5 rounded-sm",
                          stat.change.startsWith("+")
                            ? "bg-emerald-500/10 text-emerald-500"
                            : "bg-rose-500/10 text-rose-500",
                        )}
                      >
                        {stat.change}
                      </span>
                      <span
                        className={cn(
                          "text-[10px] font-medium uppercase tracking-tighter",
                          isDark ? "text-slate-600" : "text-slate-400",
                        )}
                      >
                        from last month
                      </span>
                    </div>
                  </div>
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110",
                      stat.color === "orange"
                        ? "bg-orange-500/10 text-orange-500"
                        : stat.color === "pink"
                          ? "bg-pink-500/10 text-pink-500"
                          : "bg-violet-500/10 text-violet-500",
                    )}
                  >
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ============ ROW 2: CHART + GOAL ============ */}
        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 border-0 shadow-sm overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-black/[0.03] dark:border-white/[0.03]">
              <div className="grid gap-1">
                <CardTitle className="text-xl flex items-center gap-2 italic">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                  Business Statistics
                </CardTitle>
                <CardDescription>
                  Performance tracking for the current year
                </CardDescription>
              </div>
              <div
                className={cn(
                  "flex p-1 rounded-xl border transition-colors",
                  isDark
                    ? "bg-slate-900/50 border-white/[0.03]"
                    : "bg-slate-100 border-black/[0.03]",
                )}
              >
                {["Monthly", "Quarterly"].map((v) => (
                  <button
                    key={v}
                    className={cn(
                      "px-4 py-1.5 text-[10px] font-black uppercase rounded-lg transition-all",
                      v === "Monthly"
                        ? isDark
                          ? "bg-slate-800 text-orange-500 shadow-sm border border-white/[0.05]"
                          : "bg-white text-orange-500 shadow-sm border border-black/[0.03]"
                        : isDark
                          ? "text-slate-500 hover:text-slate-300"
                          : "text-slate-400 hover:text-slate-600",
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </CardHeader>
            <CardContent className="pt-6 pb-4">
              <div className="h-[320px] w-full">
                <ChartContainer config={{}}>
                  <AreaChart
                    data={salesData}
                    margin={{ top: 10, right: 10, left: -10, bottom: 50 }}
                  >
                    <defs>
                      <linearGradient
                        id="colorRevenue"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
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
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke={isDark ? "#1e293b" : "#f1f5f9"}
                    />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fill: isDark ? "#64748b" : "#94a3b8",
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fill: isDark ? "#64748b" : "#94a3b8",
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#f97316"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                    />
                  </AreaChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          <Card
            className={cn(
              "border-0 shadow-sm overflow-hidden flex flex-col",
              isDark ? "bg-slate-950" : "bg-white",
            )}
          >
            <CardHeader className="pb-2 border-b border-black/[0.03] dark:border-white/[0.03]">
              <CardTitle
                className={cn(
                  "text-xl italic flex items-center gap-2",
                  isDark ? "text-white" : "text-slate-950",
                )}
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                Goal Achievement
              </CardTitle>
              <CardDescription>Progress towards $500k target</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center items-center pt-6">
              <div className="h-[220px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <defs>
                      <linearGradient
                        id="colorOrange"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="0%" stopColor="#f97316" />
                        <stop offset="100%" stopColor="#fb923c" />
                      </linearGradient>
                    </defs>
                    <Pie
                      data={[{ value: 75 }, { value: 25 }]}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={90}
                      startAngle={180}
                      endAngle={0}
                      paddingAngle={0}
                      dataKey="value"
                    >
                      <Cell fill="url(#colorOrange)" stroke="none" />
                      <Cell
                        fill={isDark ? "#1e293b" : "#f1f5f9"}
                        stroke="none"
                      />
                      <Label
                        content={({ viewBox }) => {
                          if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                            return (
                              <text
                                x={viewBox.cx}
                                y={viewBox.cy}
                                textAnchor="middle"
                                dominantBaseline="middle"
                              >
                                <tspan
                                  x={viewBox.cx}
                                  y={(viewBox.cy || 0) - 10}
                                  className={cn(
                                    "text-3xl font-black",
                                    isDark ? "fill-white" : "fill-slate-900",
                                  )}
                                >
                                  75%
                                </tspan>
                                <tspan
                                  x={viewBox.cx}
                                  y={(viewBox.cy || 0) + 15}
                                  className={cn(
                                    "text-[10px] font-bold uppercase tracking-widest",
                                    isDark
                                      ? "fill-slate-500"
                                      : "fill-slate-400",
                                  )}
                                >
                                  Reached
                                </tspan>
                              </text>
                            );
                          }
                        }}
                      />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full space-y-4 mt-2">
                {[
                  {
                    label: "Direct Sales",
                    value: "85%",
                    color: "bg-orange-500",
                  },
                  { label: "Marketing", value: "55%", color: "bg-pink-500" },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-xs font-bold uppercase tracking-tight">
                      <span
                        className={isDark ? "text-slate-400" : "text-slate-500"}
                      >
                        {item.label}
                      </span>
                      <span
                        className={isDark ? "text-white" : "text-slate-900"}
                      >
                        {item.value}
                      </span>
                    </div>
                    <div
                      className={cn(
                        "h-1.5 w-full rounded-full overflow-hidden transition-colors",
                        isDark ? "bg-slate-800" : "bg-slate-100",
                      )}
                    >
                      <div
                        className={cn(
                          "h-full rounded-full transition-all duration-500",
                          item.color,
                        )}
                        style={{ width: item.value }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ============ ROW 3: CATEGORY + SCHEDULE ============ */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-sm overflow-hidden">
            <CardHeader className="border-b border-black/[0.03] dark:border-white/[0.03]">
              <CardTitle className="text-xl flex items-center gap-2">
                <Package className="w-5 h-5 text-pink-500" />
                Sales Category
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row items-center justify-around py-8">
              <div className="h-[200px] w-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <defs>
                      <linearGradient
                        id="colorPink"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="0%" stopColor="#ec4899" />
                        <stop offset="100%" stopColor="#f472b6" />
                      </linearGradient>
                      <linearGradient
                        id="colorViolet"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#a78bfa" />
                      </linearGradient>
                    </defs>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={85}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            entry.name === "Affiliate"
                              ? "url(#colorOrange)"
                              : entry.name === "Direct"
                                ? "url(#colorPink)"
                                : "url(#colorViolet)"
                          }
                          stroke="none"
                        />
                      ))}
                      <Label
                        content={({ viewBox }) => {
                          if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                            return (
                              <text
                                x={viewBox.cx}
                                y={viewBox.cy}
                                textAnchor="middle"
                                dominantBaseline="middle"
                              >
                                <tspan
                                  x={viewBox.cx}
                                  y={(viewBox.cy || 0) + 5}
                                  className={cn(
                                    "text-2xl font-black",
                                    isDark ? "fill-white" : "fill-slate-900",
                                  )}
                                >
                                  2,450
                                </tspan>
                              </text>
                            );
                          }
                        }}
                      />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4">
                {categoryData.map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div
                      className={cn(
                        "w-3 h-3 rounded-full",
                        item.name === "Affiliate"
                          ? "bg-orange-500"
                          : item.name === "Direct"
                            ? "bg-pink-500"
                            : "bg-violet-500",
                      )}
                    />
                    <div className="grid">
                      <span
                        className={cn(
                          "text-sm font-bold",
                          isDark ? "text-white" : "text-slate-900",
                        )}
                      >
                        {item.name} Program
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        48% • {item.value} Products
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between border-b border-black/[0.03] dark:border-white/[0.03]">
              <CardTitle className="text-xl flex items-center gap-2">
                <Calendar className="w-5 h-5 text-violet-500" />
                Upcoming Schedule
              </CardTitle>
              <Button variant="ghost" size="icon" className="text-slate-400">
                <MoreHorizontal className="w-5 h-5" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-black/[0.03] dark:divide-white/[0.03]">
                {schedules.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 flex items-start gap-4 hover:bg-orange-500/[0.02] dark:hover:bg-white/[0.02] transition-colors"
                  >
                    <div
                      className={cn(
                        "w-14 h-14 rounded-xl flex flex-col items-center justify-center border shrink-0 shadow-xs",
                        isDark
                          ? "bg-slate-900 border-slate-800"
                          : "bg-white border-slate-100",
                      )}
                    >
                      <span className="text-[10px] font-black uppercase text-orange-500">
                        {item.date.split(",")[0]}
                      </span>
                      <span
                        className={cn(
                          "text-lg font-black",
                          isDark ? "text-white" : "text-slate-900",
                        )}
                      >
                        {item.date.split(" ")[1]}
                      </span>
                    </div>
                    <div className="grid gap-0.5">
                      <h4
                        className={cn(
                          "text-sm font-bold",
                          isDark ? "text-white" : "text-slate-900",
                        )}
                      >
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium line-clamp-1">
                        {item.desc}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span className="text-[10px] font-bold text-slate-400">
                          {item.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ============ ROW 4: RECENT ORDERS ============ */}
        <Card className="border-0 shadow-sm overflow-hidden mb-10">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/[0.03] dark:border-white/[0.03]">
            <div className="grid gap-1">
              <CardTitle className="text-xl flex items-center gap-2 italic">
                <Package className="w-5 h-5 text-orange-500" />
                Recent Orders
              </CardTitle>
              <CardDescription>
                Overview of the latest transactions
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search order ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={cn(
                    "pl-9 w-[200px] h-9 text-xs transition-all focus-visible:ring-orange-500/30",
                    isDark
                      ? "bg-slate-900 border-slate-800 text-white"
                      : "bg-white border-slate-200 text-slate-900",
                  )}
                />
              </div>
              <Button variant="outline" size="sm" className="h-9 gap-2">
                <Filter className="w-3.5 h-3.5" />
                <span>Filter</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-b border-black/[0.03] dark:border-white/[0.03]">
                  {[
                    "Order ID",
                    "Customer",
                    "Product",
                    "Value",
                    "Date",
                    "Status",
                  ].map((h) => (
                    <TableHead
                      key={h}
                      className={cn(
                        "px-6 h-12 text-[10px] font-black uppercase tracking-widest",
                        isDark ? "text-slate-500" : "text-slate-400",
                      )}
                    >
                      {h}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow
                    key={order.id}
                    className="group border-b border-black/[0.02] dark:border-white/[0.02] hover:bg-orange-500/[0.02] dark:hover:bg-white/[0.02] transition-colors"
                  >
                    <TableCell className="px-6 py-4">
                      <span
                        className={cn(
                          "font-mono text-[10px] font-bold px-2 py-0.5 rounded border transition-colors",
                          isDark
                            ? "bg-slate-800 border-slate-700 text-slate-400"
                            : "bg-slate-50 border-slate-100 text-slate-500",
                        )}
                      >
                        {order.id}
                      </span>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black border transition-colors",
                            isDark
                              ? "bg-slate-800 text-orange-500 border-white/[0.05]"
                              : "bg-orange-50 text-orange-600 border-orange-100",
                          )}
                        >
                          {order.customer
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div className="grid">
                          <span
                            className={cn(
                              "text-sm font-bold",
                              isDark ? "text-white" : "text-slate-900",
                            )}
                          >
                            {order.customer}
                          </span>
                          <span className="text-[10px] text-slate-500 font-medium">
                            {order.email}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        {order.product}
                      </span>
                    </TableCell>
                    <TableCell className="py-4">
                      <span
                        className={cn(
                          "text-sm font-black",
                          isDark ? "text-white" : "text-slate-900",
                        )}
                      >
                        {order.value}
                      </span>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className="text-xs font-semibold text-slate-500">
                        {order.date}
                      </span>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <span
                        className={cn(
                          "inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-xs",
                          order.status === "Complete"
                            ? "text-emerald-600 bg-emerald-50 border-emerald-100 dark:text-emerald-400 dark:bg-emerald-500/10 dark:border-emerald-500/20"
                            : order.status === "Pending"
                              ? "text-orange-600 bg-orange-50 border-orange-100 dark:text-orange-400 dark:bg-orange-500/10 dark:border-orange-500/20"
                              : "text-rose-600 bg-rose-50 border-rose-100 dark:text-rose-400 dark:bg-rose-500/10 dark:border-rose-500/20",
                        )}
                      >
                        {order.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
