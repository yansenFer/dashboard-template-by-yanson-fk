export const aiStatisticsData = [
  { month: "Jan", queries: 12000, tokens: 42000, efficiency: 85 },
  { month: "Feb", queries: 14500, tokens: 48000, efficiency: 88 },
  { month: "Mar", queries: 11000, tokens: 38000, efficiency: 82 },
  { month: "Apr", queries: 18000, tokens: 55000, efficiency: 90 },
  { month: "May", queries: 23000, tokens: 72000, efficiency: 92 },
  { month: "Jun", queries: 21000, tokens: 68000, efficiency: 89 },
  { month: "Jul", queries: 25000, tokens: 81000, efficiency: 94 },
  { month: "Aug", queries: 28000, tokens: 95000, efficiency: 95 },
  { month: "Sep", queries: 26000, tokens: 88000, efficiency: 91 },
  { month: "Oct", queries: 32000, tokens: 105000, efficiency: 96 },
  { month: "Nov", queries: 29000, tokens: 98000, efficiency: 93 },
  { month: "Dec", queries: 35000, tokens: 115000, efficiency: 98 },
];

export const aiTokenUsageData = [
  { name: "GPT-4o", value: 7000000, fill: "#f97316" }, // Orange
  { name: "Claude 3.5", value: 4200000, fill: "#ec4899" }, // Pink
  { name: "Gemini Pro", value: 2300000, fill: "#8b5cf6" }, // Violet
];

export const aiModelList = [
  {
    name: "GPT-4o Vision",
    status: "Online",
    creditUsed: "7.0M",
    color: "#f97316", // Orange
  },
  {
    name: "Claude 3.5 Sonnet",
    status: "Online",
    creditUsed: "4.2M",
    color: "#ec4899", // Pink
  },
  {
    name: "Gemini 1.5 Pro",
    status: "Throttled",
    creditUsed: "2.3M",
    color: "#8b5cf6", // Violet
  },
];

export const aiTaskLogs = [
  { id: "REQ-8901", model: "GPT-4o Vision", app: "Mobile App v2", tokens: "4,250", duration: "1.2s", status: "Success" },
  { id: "REQ-8902", model: "Claude 3.5 Sonnet", app: "Web Dashboard", tokens: "840", duration: "0.8s", status: "Success" },
  { id: "REQ-8903", model: "Gemini 1.5 Pro", app: "Data Pipeline", tokens: "12,400", duration: "4.5s", status: "Processing" },
  { id: "REQ-8904", model: "GPT-4o Vision", app: "Mobile App v2", tokens: "150", duration: "0.3s", status: "Failed" },
  { id: "REQ-8905", model: "Claude 3.5 Sonnet", app: "Support Bot", tokens: "3,120", duration: "2.1s", status: "Success" },
  { id: "REQ-8906", model: "Claude 3.5 Sonnet", app: "Support Bot", tokens: "2,890", duration: "1.9s", status: "Success" },
  { id: "REQ-8907", model: "GPT-4o Vision", app: "Marketing Automation", tokens: "8,450", duration: "3.2s", status: "Success" },
];

export const systemHealth = [
  { name: "Global API Latency", value: "84ms", percentage: 15, status: "Excellent", color: "bg-emerald-500" },
  { name: "CPU Cluster Load", value: "62%", percentage: 62, status: "Normal", color: "bg-orange-500" },
  { name: "Memory Allocation", value: "88%", percentage: 88, status: "High", color: "bg-pink-500" },
];
