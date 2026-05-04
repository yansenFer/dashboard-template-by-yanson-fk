import { useState } from "react";
import Layout from "~/components/Layout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Badge } from "~/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  Package,
  Truck,
  Clock,
  TrendingUp,
  Search,
  MapPin,
  ChevronRight,
  MoreVertical,
  Activity,
  ShieldCheck,
  Navigation,
  Calendar,
  ArrowUpRight,
  Filter,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import type { RootState } from "~/store/store";
import { cn } from "~/lib/utils";

// --- Mock Data ---

const STATS_DATA = [
  {
    title: "Total Shipments",
    value: "12,840",
    change: "+12.5%",
    icon: Package,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    title: "Active Deliveries",
    value: "842",
    change: "+5.2%",
    icon: Truck,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "On-Time Rate",
    value: "98.2%",
    change: "+0.4%",
    icon: ShieldCheck,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    title: "Avg. Transit Time",
    value: "2.4 Days",
    change: "-10%",
    icon: Clock,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
];

const PERFORMANCE_DATA = [
  { month: "Jan", shipments: 4000, deliveries: 2400 },
  { month: "Feb", shipments: 3000, deliveries: 1398 },
  { month: "Mar", shipments: 2000, deliveries: 9800 },
  { month: "Apr", shipments: 2780, deliveries: 3908 },
  { month: "May", shipments: 1890, deliveries: 4800 },
  { month: "Jun", shipments: 2390, deliveries: 3800 },
  { month: "Jul", shipments: 3490, deliveries: 4300 },
];

const RECENT_SHIPMENTS = [
  {
    id: "LGS-8291",
    category: "Electronics",
    company: "TechFlow Inc.",
    arrivalTime: "10:30 AM",
    route: "NY → LA",
    price: "$1,200",
    status: "In Transit",
  },
  {
    id: "LGS-8292",
    category: "Apparel",
    company: "Urban Wear",
    arrivalTime: "11:45 AM",
    route: "CHI → HOU",
    price: "$850",
    status: "Delivered",
  },
  {
    id: "LGS-8293",
    category: "Furniture",
    company: "Home Decor",
    arrivalTime: "01:15 PM",
    route: "SEA → PHX",
    price: "$2,400",
    status: "Pending",
  },
  {
    id: "LGS-8294",
    category: "Medical",
    company: "BioHealth",
    arrivalTime: "02:50 PM",
    route: "BOS → MIA",
    price: "$4,100",
    status: "Processing",
  },
  {
    id: "LGS-8295",
    category: "Food",
    company: "FreshGo",
    arrivalTime: "04:20 PM",
    route: "SFO → DEN",
    price: "$600",
    status: "In Transit",
  },
];

const TRACKING_HISTORY = [
  {
    time: "09:00 AM",
    status: "Picked up",
    location: "Warehouse A, New York",
    active: false,
  },
  {
    time: "11:30 AM",
    status: "In Transit",
    location: "Sorting Facility, New Jersey",
    active: false,
  },
  {
    time: "02:15 PM",
    status: "Departed",
    location: "Distribution Center, Pennsylvania",
    active: true,
  },
  {
    time: "Estimated",
    status: "Out for Delivery",
    location: "Local Hub, Los Angeles",
    active: false,
  },
];

const FLEET_STATUS = [
  {
    id: "VH-101",
    type: "Heavy Truck",
    load: 85,
    status: "On Route",
    driver: "John Doe",
  },
  {
    id: "VH-204",
    type: "Light Van",
    load: 40,
    status: "Maintenance",
    driver: "Jane Smith",
  },
  {
    id: "VH-305",
    type: "Container",
    load: 92,
    status: "Loading",
    driver: "Mike Ross",
  },
];

// --- Components ---

const StatusBadge = ({ status }: { status: string }) => {
  const variants: Record<string, string> = {
    "In Transit":
      "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400",
    Delivered:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400",
    Pending:
      "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400",
    Processing:
      "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400",
    "On Route":
      "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400",
    Maintenance:
      "bg-amber-50 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-400",
    Loading:
      "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400",
  };
  return (
    <Badge className={`border-none ${variants[status] || ""}`}>{status}</Badge>
  );
};

export default function Logistics() {
  const isDark = useSelector((state: RootState) => state.dark.isDark);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Layout>
      <div className="flex flex-col gap-6 w-full max-w-[1600px] py-6 px-4 md:px-8">
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Logistics Overview
            </h1>
            <p className={isDark ? "text-slate-400" : "text-slate-500"}>
              Manage your fleet, track shipments, and monitor delivery
              performance.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <Calendar className="mr-2 h-4 w-4" />
              Jan 2024 - Dec 2024
            </Button>
            <Button size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>

        {/* --- Stats Cards --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS_DATA.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-all duration-300 border-none">
                <CardContent className="pt-2">
                  <div className="flex items-center justify-between">
                    <div
                      className={`p-2 rounded-lg transition-colors duration-300 ${stat.bg}`}
                    >
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <Badge
                      variant="outline"
                      className="border-emerald-500/50 text-emerald-500 bg-emerald-500/5"
                    >
                      {stat.change}
                    </Badge>
                  </div>
                  <div className="mt-4">
                    <h3
                      className={`text-sm font-medium transition-colors duration-300 ${isDark ? "text-slate-400" : "text-slate-500"}`}
                    >
                      {stat.title}
                    </h3>
                    <p className="text-2xl font-bold mt-1 transition-colors duration-300">
                      {stat.value}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* --- Main Content Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left & Middle Column (Charts and Tables) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Delivery Performance Chart */}
            <Card className="border-none shadow-sm overflow-hidden transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Delivery Performance</CardTitle>
                  <CardDescription>
                    Shipments vs Deliveries volume trends
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-orange-500" />
                    <span className="text-xs text-muted-foreground">
                      Shipments
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                    <span className="text-xs text-muted-foreground">
                      Deliveries
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="h-[350px] w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={PERFORMANCE_DATA}>
                    <defs>
                      <linearGradient
                        id="colorShip"
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
                      <linearGradient
                        id="colorDeliv"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#3b82f6"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#3b82f6"
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
                        fill: isDark ? "#94a3b8" : "#64748b",
                        fontSize: 12,
                      }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fill: isDark ? "#94a3b8" : "#64748b",
                        fontSize: 12,
                      }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDark ? "#0f172a" : "#ffffff",
                        border: "none",
                        borderRadius: "8px",
                        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                      }}
                      itemStyle={{ color: isDark ? "#f8fafc" : "#0f172a" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="shipments"
                      stroke="#f97316"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorShip)"
                    />
                    <Area
                      type="monotone"
                      dataKey="deliveries"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorDeliv)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Recent Shipments Table */}
            <Card className="pt-0 border-0 shadow-sm overflow-hidden relative transition-all duration-300">
              <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 pb-4 border-b border-black/[0.03] dark:border-white/[0.03] transition-colors duration-300">
                <div className="grid gap-1">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Package className="w-5 h-5 text-orange-500" />
                    Recent Delivery Activities
                  </CardTitle>
                  <CardDescription>
                    Track your latest logistics events across all regions
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search order, company..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={cn(
                        "pl-9 w-[220px] h-9 text-sm transition-all focus-visible:ring-orange-500/30",
                        isDark
                          ? "bg-slate-900 border-slate-800 text-white"
                          : "bg-white border-gray-200 text-slate-900",
                      )}
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className={cn(
                      "h-9 w-9 transition-all",
                      isDark
                        ? "bg-slate-900 border-slate-800 hover:bg-slate-800"
                        : "bg-white border-gray-200 hover:bg-gray-50 text-slate-600",
                    )}
                  >
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="px-3 pb-3">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-b border-black/[0.03] dark:border-white/[0.03]">
                      {[
                        "Order ID",
                        "Category",
                        "Company",
                        "Arrival",
                        "Route",
                        "Price",
                        "Status",
                      ].map((h) => (
                        <TableHead
                          key={h}
                          className={cn(
                            "px-6 h-11 text-xs font-bold uppercase tracking-wider",
                            isDark ? "text-white" : "text-black",
                          )}
                        >
                          {h}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {RECENT_SHIPMENTS.filter((s) => {
                      if (!searchQuery.trim()) return true;
                      const q = searchQuery.toLowerCase();
                      return (
                        s.id.toLowerCase().includes(q) ||
                        s.company.toLowerCase().includes(q) ||
                        s.category.toLowerCase().includes(q) ||
                        s.status.toLowerCase().includes(q)
                      );
                    }).map((row) => (
                      <TableRow
                        key={row.id}
                        className="group border-b border-black/[0.02] dark:border-white/[0.02] hover:bg-orange-500/[0.02] dark:hover:bg-white/[0.02] transition-colors"
                      >
                        <TableCell className="px-6 py-4">
                          <span
                            className={cn(
                              "text-xs font-bold px-2 py-0.5 rounded border transition-colors",
                              isDark
                                ? "bg-slate-900/50 border-slate-800 text-slate-400"
                                : "bg-slate-50 border-slate-100 text-slate-500",
                            )}
                          >
                            {row.id}
                          </span>
                        </TableCell>
                        <TableCell className="px-6 py-4">
                          <span className="text-sm ">{row.category}</span>
                        </TableCell>
                        <TableCell className="px-6 py-4">
                          <span className="text-sm">{row.company}</span>
                        </TableCell>
                        <TableCell className="px-6 py-4">
                          <span className="text-sm">{row.arrivalTime}</span>
                        </TableCell>
                        <TableCell className="px-6 py-4">
                          <span className="text-sm ">{row.route}</span>
                        </TableCell>
                        <TableCell className="px-6 py-4">
                          <span className="font-semibold text-sm">
                            {row.price}
                          </span>
                        </TableCell>
                        <TableCell className="px-6 py-4">
                          <StatusBadge status={row.status} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Right Column (Tracking and Fleet) */}
          <div className="flex flex-col gap-6">
            {/* Quick Tracking */}
            <Card className="border-none shadow-sm transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg">Quick Tracking</CardTitle>
                <CardDescription>
                  Enter Tracking ID to see status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative mb-8">
                  <Input
                    placeholder="Enter Tracking ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="space-y-6">
                  {TRACKING_HISTORY.map((step, idx) => (
                    <div key={idx} className="relative flex gap-4">
                      {idx !== TRACKING_HISTORY.length - 1 && (
                        <div
                          className={cn(
                            "absolute left-[9px] top-7 w-[2px] h-[calc(100%+8px)]",
                            isDark ? "bg-slate-800" : "bg-slate-200",
                          )}
                        />
                      )}

                      <div className="relative z-10 flex flex-col items-center pt-1">
                        <div
                          className={cn(
                            "h-5 w-5 rounded-full border-[3px] transition-all",
                            step.active
                              ? isDark
                                ? "bg-orange-500 border-orange-900/50 shadow-[0_0_12px_rgba(249,115,22,0.4)]"
                                : "bg-orange-500 border-orange-100 shadow-[0_0_12px_rgba(249,115,22,0.3)]"
                              : isDark
                                ? "bg-slate-900 border-slate-700"
                                : "bg-white border-slate-300",
                          )}
                        />
                      </div>

                      <div className="flex-1 pb-2">
                        <div className="flex items-start justify-between">
                          <h4
                            className={cn(
                              "text-sm font-bold",
                              step.active
                                ? isDark
                                  ? "text-orange-400"
                                  : "text-orange-600"
                                : isDark
                                  ? "text-slate-200"
                                  : "text-slate-800",
                            )}
                          >
                            {step.status}
                          </h4>
                          <span
                            className={cn(
                              "text-[11px] font-mono font-bold px-2 py-0.5 rounded-md",
                              step.active
                                ? isDark
                                  ? "bg-orange-500/10 text-orange-400"
                                  : "bg-orange-50 text-orange-600"
                                : isDark
                                  ? "bg-slate-800 text-slate-400"
                                  : "bg-slate-100 text-slate-500",
                            )}
                          >
                            {step.time}
                          </span>
                        </div>
                        <p
                          className={cn(
                            "text-xs mt-1.5 flex items-center font-medium",
                            step.active
                              ? isDark
                                ? "text-slate-300"
                                : "text-slate-600"
                              : isDark
                                ? "text-slate-400"
                                : "text-slate-500",
                          )}
                        >
                          <MapPin className="h-3 w-3 mr-1.5 opacity-70" />
                          {step.location}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  className={cn(
                    "w-full mt-6 transition-all font-bold h-11",
                    isDark
                      ? "bg-slate-800 text-slate-100 hover:bg-slate-700 border-none"
                      : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 shadow-sm",
                  )}
                >
                  View Full History
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Fleet Status */}
            <Card className="border-none shadow-sm transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Fleet Management</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="text-[10px] uppercase font-bold py-0 h-5 border-emerald-500/30 text-emerald-600 bg-emerald-50"
                    >
                      Live
                    </Badge>
                    <MoreVertical className="h-4 w-4 text-muted-foreground cursor-pointer" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {FLEET_STATUS.map((vehicle, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "p-4 rounded-2xl border flex items-center justify-between transition-all group cursor-pointer",
                      isDark
                        ? "bg-slate-900/60 border-slate-800 hover:bg-slate-800"
                        : "bg-slate-50 border-slate-200 hover:border-orange-300 hover:shadow-sm",
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          "h-12 w-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105",
                          isDark
                            ? "bg-slate-800 text-orange-400"
                            : "bg-orange-100 text-orange-600",
                        )}
                      >
                        <Truck className="h-5 w-5" />
                      </div>
                      <div>
                        <h5 className="text-sm font-black">{vehicle.id}</h5>
                        <p
                          className={cn(
                            "text-xs font-semibold",
                            isDark ? "text-slate-400" : "text-slate-600",
                          )}
                        >
                          {vehicle.type} • {vehicle.driver}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <StatusBadge status={vehicle.status} />
                      <div
                        className={cn(
                          "w-20 h-1.5 rounded-full overflow-hidden",
                          isDark ? "bg-slate-700" : "bg-slate-200",
                        )}
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${vehicle.load}%` }}
                          className={`h-full rounded-full ${vehicle.load > 90 ? "bg-orange-500" : "bg-emerald-500"}`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardAction className="px-6 pb-6">
                <div className="grid grid-cols-3 gap-3">
                  <div
                    className={cn(
                      "flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-colors cursor-pointer",
                      isDark
                        ? "bg-emerald-500/10 border-emerald-500/30 hover:bg-emerald-500/20"
                        : "bg-emerald-50 border-emerald-200 hover:bg-emerald-100",
                    )}
                  >
                    <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                      24
                    </span>
                    <span
                      className={cn(
                        "text-[10px] font-extrabold uppercase tracking-wider",
                        isDark ? "text-emerald-400" : "text-emerald-700",
                      )}
                    >
                      In Use
                    </span>
                  </div>
                  <div
                    className={cn(
                      "flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-colors cursor-pointer",
                      isDark
                        ? "bg-orange-500/10 border-orange-500/30 hover:bg-orange-500/20"
                        : "bg-orange-50 border-orange-200 hover:bg-orange-100",
                    )}
                  >
                    <span className="text-2xl font-black text-orange-600 dark:text-orange-400">
                      12
                    </span>
                    <span
                      className={cn(
                        "text-[10px] font-extrabold uppercase tracking-wider",
                        isDark ? "text-orange-400" : "text-orange-700",
                      )}
                    >
                      Idle
                    </span>
                  </div>
                  <div
                    className={cn(
                      "flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-colors cursor-pointer",
                      isDark
                        ? "bg-slate-500/10 border-slate-500/30 hover:bg-slate-500/20"
                        : "bg-slate-100 border-slate-300 hover:bg-slate-200",
                    )}
                  >
                    <span className="text-2xl font-black text-slate-700 dark:text-slate-400">
                      5
                    </span>
                    <span
                      className={cn(
                        "text-[10px] font-extrabold uppercase tracking-wider",
                        isDark ? "text-slate-400" : "text-slate-700",
                      )}
                    >
                      Offline
                    </span>
                  </div>
                </div>
              </CardAction>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
