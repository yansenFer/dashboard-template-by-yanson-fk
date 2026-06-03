// oxlint-disable no-empty-pattern
import Layout from "~/components/Layout";
import type { Route } from "../../+types/root";
import {
  Activity,
  Bot,
  CheckCircle2,
  Clock,
  Cpu,
  Database,
  MoreHorizontal,
  MoreVertical,
  Network,
  Rocket,
  Search,
  Server,
  Settings2,
  SlidersHorizontal,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Pie,
  PieChart,
  Cell,
  Label,
} from "recharts";
import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "~/store/store";
import {
  aiStatisticsData,
  aiTokenUsageData,
  aiModelList,
  aiTaskLogs,
  systemHealth,
} from "~/data/dataAI";
import { cn } from "~/lib/utils";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "AI Command Center - Ferforge UI" },
    {
      name: "description",
      content: "Custom AI analytics dashboard with unique theme",
    },
  ];
}

// --- Custom Theme Chart Configs ---
// Orange, Pink, Violet palette to match Ferforge UI brand
const aiChartConfig = {
  queries: {
    label: "API Queries",
    color: "#f97316", // Orange 500
  },
  tokens: {
    label: "Tokens (x10)",
    color: "#ec4899", // Pink 500
  },
} satisfies ChartConfig;

const aiTokenChartConfig = {
  "GPT-4o": { label: "GPT-4o", color: "#f97316" },
  "Claude 3.5": { label: "Claude 3.5", color: "#ec4899" },
  "Gemini Pro": { label: "Gemini Pro", color: "#8b5cf6" },
} satisfies ChartConfig;

type Period = "7D" | "30D" | "YTD";

export default function AI() {
  const [activePeriod, setActivePeriod] = useState<Period>("30D");
  const [searchQuery, setSearchQuery] = useState("");
  const isDark = useSelector((state: RootState) => state.dark.isDark);

  // Filter logs by search
  const filteredLogs = useMemo(() => {
    if (!searchQuery.trim()) return aiTaskLogs;
    const q = searchQuery.toLowerCase();
    return aiTaskLogs.filter(
      (t) =>
        t.id.toLowerCase().includes(q) ||
        t.model.toLowerCase().includes(q) ||
        t.app.toLowerCase().includes(q) ||
        t.status.toLowerCase().includes(q),
    );
  }, [searchQuery]);

  // Format large numbers
  const formatValue = (val: number) => {
    if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `${(val / 1000).toFixed(0)}K`;
    return val.toString();
  };

  return (
    <Layout>
      <div className="flex w-full flex-col gap-6">
        {/* ============ HEADER ============ */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
          <div>
            <h1
              className={`text-3xl font-extrabold ${isDark ? "text-white" : "text-black"} tracking-tight`}
            >
              AI Command Center
            </h1>
            <p
              className={cn(
                "text-sm mt-1",
                isDark ? "text-gray-400" : "text-gray-500",
              )}
            >
              Monitor neural network performance, token economics, and endpoint
              health in real-time.
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className={cn(
                "gap-2 transition-all",
                isDark
                  ? "text-white border-slate-700 hover:bg-slate-800 hover:text-white"
                  : "text-slate-600 border-gray-200",
              )}
            >
              <Settings2 className="w-4 h-4" />
              <span className="hidden sm:inline">Configure</span>
            </Button>
            <Button className="gap-2 bg-orange-600 hover:bg-orange-700 text-white border-0">
              <Rocket className="w-4 h-4" />
              <span className="hidden sm:inline">Upgrade Capacity</span>
            </Button>
          </div>
        </div>

        {/* ============ ROW 1: Charts ============ */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* --- Area Chart: API Queries vs Tokens --- */}
          <Card className="lg:col-span-2 pt-0 border-0 shadow-sm overflow-hidden relative">
            {/* Custom glowing accent line at the top */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500" />

            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-6">
              <div className="grid flex-1 gap-1">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Activity className="w-5 h-5 text-orange-500" />
                  Network Throughput
                </CardTitle>
                <CardDescription>
                  API queries vs token consumption over time.
                </CardDescription>
              </div>

              {/* Custom Period Toggle */}
              <div
                className={cn(
                  "flex rounded-lg p-1",
                  isDark ? "bg-slate-900" : "bg-gray-100",
                )}
              >
                {(["7D", "30D", "YTD"] as Period[]).map((period) => (
                  <button
                    key={period}
                    type="button"
                    onClick={() => setActivePeriod(period)}
                    className={cn(
                      "px-4 py-1.5 text-xs font-bold transition-all rounded-md cursor-pointer",
                      activePeriod === period
                        ? isDark
                          ? "bg-slate-800 text-orange-400 shadow-lg"
                          : "bg-white text-orange-600 shadow-sm"
                        : isDark
                          ? "text-gray-400 hover:text-gray-200"
                          : "text-gray-500 hover:text-gray-900",
                    )}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6">
              <ChartContainer
                config={aiChartConfig}
                className="aspect-auto h-[280px] w-full"
              >
                <AreaChart data={aiStatisticsData}>
                  <defs>
                    <linearGradient
                      id="fillQueries"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                      <stop
                        offset="95%"
                        stopColor="#f97316"
                        stopOpacity={0.0}
                      />
                    </linearGradient>
                    <linearGradient id="fillTokens" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3} />
                      <stop
                        offset="95%"
                        stopColor="#ec4899"
                        stopOpacity={0.0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    vertical={false}
                    strokeDasharray="4 4"
                    stroke={isDark ? "#1e293b" : "#f1f5f9"}
                  />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={12}
                    tick={{
                      fill: isDark ? "#64748b" : "#94a3b8",
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={12}
                    tickFormatter={(v) => formatValue(v)}
                    tick={{
                      fill: isDark ? "#64748b" : "#94a3b8",
                      fontSize: 12,
                    }}
                    width={45}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={
                      (
                        <ChartTooltipContent
                          labelFormatter={(value: any) => value}
                          indicator="dot"
                        />
                      ) as any
                    }
                  />
                  <Area
                    dataKey="tokens"
                    type="monotone"
                    fill="url(#fillTokens)"
                    stroke="#ec4899"
                    strokeWidth={3}
                  />
                  <Area
                    dataKey="queries"
                    type="monotone"
                    fill="url(#fillQueries)"
                    stroke="#f97316"
                    strokeWidth={3}
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* --- Donut Chart: Model Distribution --- */}
          <Card className="lg:col-span-1 pt-0 border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pt-6">
              <div className="grid gap-1">
                <CardTitle className="text-xl">Model Distribution</CardTitle>
                <CardDescription>Token usage by AI model</CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Deep Analytics</DropdownMenuItem>
                  <DropdownMenuItem>Manage Endpoints</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={aiTokenChartConfig}
                className="mx-auto aspect-square max-h-[180px] w-full mb-6"
              >
                <PieChart>
                  <Pie
                    data={aiTokenUsageData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={55}
                    outerRadius={80}
                    strokeWidth={5}
                    stroke={isDark ? "#020617" : "#ffffff"}
                    paddingAngle={3}
                  >
                    {aiTokenUsageData.map((entry) => (
                      <Cell key={entry.name} fill={entry.fill} />
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
                                y={(viewBox.cy || 0) - 4}
                                className={cn(
                                  "text-2xl font-black transition-all",
                                  isDark ? "fill-white" : "fill-slate-900",
                                )}
                              >
                                13.5M
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 16}
                                className={cn(
                                  "text-xs font-semibold uppercase tracking-widest transition-all",
                                  isDark ? "fill-slate-400" : "fill-slate-500",
                                )}
                              >
                                Tokens
                              </tspan>
                            </text>
                          );
                        }
                      }}
                    />
                  </Pie>
                  <ChartTooltip
                    content={
                      (
                        <ChartTooltipContent
                          hideLabel
                          formatter={(value: any, name: any) => (
                            <div className="flex items-center gap-2">
                              <span className="font-medium">
                                {name as string}
                              </span>
                              <span className="font-mono font-bold text-orange-500">
                                {formatValue(value as number)}
                              </span>
                            </div>
                          )}
                        />
                      ) as any
                    }
                  />
                </PieChart>
              </ChartContainer>

              {/* Model List with Custom Badges */}
              <div className="space-y-3">
                {aiModelList.map((model) => (
                  <div
                    key={model.name}
                    className="flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: model.color }}
                      />
                      <p className="text-sm font-semibold">{model.name}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full border",
                          model.status === "Online"
                            ? "border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10"
                            : "border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-500/10",
                        )}
                      >
                        {model.status}
                      </span>
                      <span className="text-sm font-mono font-bold text-right w-12">
                        {model.creditUsed}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ============ ROW 2: Custom Metric Cards ============ */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* Highlight Card */}
          <Card
            className={cn(
              "relative overflow-hidden transition-all duration-300 shadow-lg border-0",
              isDark
                ? "bg-slate-950"
                : "bg-gradient-to-br from-orange-500 to-rose-500",
            )}
          >
            {/* Background pattern for dark mode highlight card */}
            {isDark && (
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-500 via-transparent to-transparent" />
            )}
            <CardContent className={cn("p-6 relative z-10 text-white")}>
              <div className="flex justify-between items-start mb-4">
                <p
                  className={cn(
                    "text-sm font-semibold opacity-90",
                    isDark ? "text-orange-400" : "text-white/90",
                  )}
                >
                  Total Computation
                </p>
                <Cpu
                  className={cn(
                    "w-5 h-5 opacity-80",
                    isDark && "text-orange-500",
                  )}
                />
              </div>
              <h3 className="text-3xl font-black mb-1">90.3 TB</h3>
              <p
                className={cn(
                  "text-xs font-medium opacity-80 flex items-center gap-1",
                  isDark && "text-gray-400",
                )}
              >
                <Sparkles className="w-3 h-3" /> +14.8% from last cycle
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <p className="text-sm font-semibold text-muted-foreground">
                  Avg Response Time
                </p>
                <div className="p-2 bg-pink-500/10 rounded-lg">
                  <Zap className="w-4 h-4 text-pink-500" />
                </div>
              </div>
              <h3 className="text-3xl font-black mb-1">
                124{" "}
                <span className="text-lg font-bold text-muted-foreground">
                  ms
                </span>
              </h3>
              <p className="text-xs font-medium text-emerald-500 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Optimal latency
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <p className="text-sm font-semibold text-muted-foreground">
                  Active Neural Nodes
                </p>
                <div className="p-2 bg-violet-500/10 rounded-lg">
                  <Network className="w-4 h-4 text-violet-500" />
                </div>
              </div>
              <h3 className="text-3xl font-black mb-1">1,402</h3>
              <p className="text-xs font-medium text-emerald-500 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> 99.9% Uptime
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <p className="text-sm font-semibold text-muted-foreground">
                  Overall Efficiency
                </p>
                <div className="p-2 bg-sky-500/10 rounded-lg">
                  <Bot className="w-4 h-4 text-sky-500" />
                </div>
              </div>
              <h3 className="text-3xl font-black mb-1">
                98.2{" "}
                <span className="text-lg font-bold text-muted-foreground">
                  %
                </span>
              </h3>
              <p className="text-xs font-medium text-sky-500 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Peak performance
              </p>
            </CardContent>
          </Card>
        </div>

        {/* ============ ROW 3: Table + System Health ============ */}
        <div className="grid lg:grid-cols-3 gap-6 pb-10">
          {/* --- API Task Logs Table --- */}
          <Card className="lg:col-span-2 pt-0 border-0 shadow-sm overflow-hidden relative">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 pb-4 border-b border-black/[0.03] dark:border-white/[0.03]">
              <div className="grid gap-1">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-indigo-500" />
                  API Query Logs
                </CardTitle>
                <CardDescription>
                  Real-time stream of AI generations
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search ID, Model..."
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
                  <SlidersHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-b border-black/[0.03] dark:border-white/[0.03]">
                    <TableHead
                      className={`px-6 h-11 text-xs font-bold uppercase tracking-wider ${
                        isDark ? "text-white" : "text-black"
                      }`}
                    >
                      Req ID
                    </TableHead>
                    <TableHead
                      className={`h-11 text-xs font-bold uppercase tracking-wider ${
                        isDark ? "text-white" : "text-black"
                      }`}
                    >
                      Model
                    </TableHead>
                    <TableHead
                      className={`h-11 text-xs font-bold uppercase tracking-wider ${
                        isDark ? "text-white" : "text-black"
                      }`}
                    >
                      Application
                    </TableHead>
                    <TableHead
                      className={`h-11 text-xs font-bold uppercase tracking-wider ${
                        isDark ? "text-white" : "text-black"
                      }`}
                    >
                      Tokens
                    </TableHead>
                    <TableHead
                      className={`h-11 text-xs font-bold uppercase tracking-wider ${
                        isDark ? "text-white" : "text-black"
                      }`}
                    >
                      Time
                    </TableHead>
                    <TableHead
                      className={`px-6 h-11 text-left text-xs font-bold uppercase tracking-wider ${
                        isDark ? "text-white" : "text-black"
                      }`}
                    >
                      Status
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.length > 0 ? (
                    filteredLogs.map((log) => (
                      <TableRow
                        key={log.id}
                        className="group border-b border-black/[0.02] dark:border-white/[0.02] hover:bg-orange-500/[0.02] dark:hover:bg-white/[0.02] transition-colors"
                      >
                        <TableCell className="px-6 py-4">
                          <span
                            className={cn(
                              "font-mono text-[10px] font-bold px-2 py-0.5 rounded border transition-colors",
                              isDark
                                ? "bg-slate-900/50 border-slate-800 text-slate-500"
                                : "bg-slate-50 border-slate-100 text-slate-400",
                            )}
                          >
                            {log.id}
                          </span>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={cn(
                                "w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black",
                                log.model.includes("GPT")
                                  ? "bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400"
                                  : log.model.includes("Claude")
                                    ? "bg-pink-100 text-pink-600 dark:bg-pink-500/20 dark:text-pink-400"
                                    : "bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400",
                              )}
                            >
                              {log.model.split(" ")[0][0]}
                              {log.model.split(" ").length > 1
                                ? log.model.split(" ")[1][0]
                                : ""}
                            </div>
                            <span className="font-bold text-sm">
                              {log.model}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                            {log.app}
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="flex flex-col">
                            <span className="font-mono font-black text-sm">
                              {log.tokens}
                            </span>
                            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">
                              Units
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="flex items-center gap-1.5 font-semibold text-sm">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            {log.duration}
                          </div>
                        </TableCell>
                        <TableCell className="px-6 py-4 text-left">
                          <span
                            className={cn(
                              "inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-xs",
                              log.status === "Success"
                                ? "text-emerald-600 bg-emerald-50 border-emerald-100 dark:text-emerald-400 dark:bg-emerald-500/10 dark:border-emerald-500/20"
                                : log.status === "Processing"
                                  ? "text-blue-600 bg-blue-50 border-blue-100 dark:text-blue-400 dark:bg-blue-500/10 dark:border-blue-500/20"
                                  : "text-rose-600 bg-rose-50 border-rose-100 dark:text-rose-400 dark:bg-rose-500/10 dark:border-rose-500/20",
                            )}
                          >
                            {log.status === "Processing" && (
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping mr-2" />
                            )}
                            {log.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="h-24 text-center text-muted-foreground"
                      >
                        No logs matching your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              <div className="p-4 flex justify-center">
                <Button
                  variant="ghost"
                  className="text-sm font-semibold text-orange-500 hover:text-orange-600"
                >
                  Load More Logs
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* --- System Health Widget --- */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <Card className="border-0 shadow-sm pt-0">
              <CardHeader className="pt-6 pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Server className="w-5 h-5 text-slate-500" />
                  System Health
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-4">
                {systemHealth.map((health) => (
                  <div key={health.name} className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-semibold">{health.name}</span>
                      <span className="font-mono font-bold">
                        {health.value}
                      </span>
                    </div>
                    {/* Custom Progress Bar */}
                    <div className={cn(
                      "h-2 w-full rounded-full overflow-hidden transition-colors",
                      isDark ? "bg-slate-800" : "bg-slate-100"
                    )}>
                      <div
                        className={cn("h-full rounded-full transition-all duration-500", health.color)}
                        style={{ width: `${health.percentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                      <span>Status</span>
                      <span
                        className={cn(
                          health.status === "Excellent"
                            ? "text-emerald-500"
                            : health.status === "Normal"
                              ? "text-orange-500"
                              : "text-pink-500",
                        )}
                      >
                        {health.status}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Storage / DB Mini Card */}
            <Card
              className={cn(
                "relative overflow-hidden transition-all duration-300",
                isDark
                  ? "bg-slate-950 border-0 shadow-sm"
                  : "bg-white border-gray-100 shadow-sm",
              )}
            >
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p
                    className={cn(
                      "text-sm font-medium mb-1",
                      isDark ? "text-slate-400" : "text-slate-500",
                    )}
                  >
                    Vector DB Storage
                  </p>
                  <h4
                    className={cn(
                      "text-2xl font-black",
                      isDark ? "text-white" : "text-slate-900",
                    )}
                  >
                    45.8{" "}
                    <span
                      className={cn(
                        "text-sm font-medium",
                        isDark ? "text-slate-500" : "text-slate-400",
                      )}
                    >
                      / 100 GB
                    </span>
                  </h4>
                </div>
                <div
                  className={cn(
                    "w-12 h-12 rounded-full border-4 flex items-center justify-center border-t-orange-500 rotate-45 transition-colors",
                    isDark ? "border-slate-800" : "border-gray-100",
                  )}
                >
                  <Database className="w-5 h-5 text-orange-500 -rotate-45" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
