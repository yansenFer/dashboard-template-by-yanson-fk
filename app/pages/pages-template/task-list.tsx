import { useState } from "react";
import Layout from "~/components/Layout";
import { Badge } from "~/components/ui/badge";
import { Checkbox } from "~/components/ui/checkbox";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import {
  MoreVertical,
  Calendar,
  CheckCircle2,
  Clock,
  MessageSquare,
  Link2,
  Star,
  X,
  Plus,
  ChevronDown,
  Filter,
  Search,
  Paperclip,
  Activity,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import type { RootState } from "~/store/store";
import { cn } from "~/lib/utils";
const MotionCard = motion.create(Card);

// --- Types ---
type Priority = "High" | "Medium" | "Low";
type Status = "In Progress" | "Completed" | "To Do" | "On Hold";

interface Assignee {
  name: string;
  avatar: string;
}

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  dueDate: string;
  assignees: Assignee[];
  category: string;
  checklist: ChecklistItem[];
  progress: number;
  isPrivate: boolean;
  isFavorite: boolean;
  group: string;
}

// --- Mock Data ---
const MOCK_TASKS: Task[] = [
  {
    id: "1",
    title: "Video conference with Canada Team",
    description: "Instant rebuilding of assets during development",
    priority: "High",
    status: "In Progress",
    dueDate: "Tomorrow",
    assignees: [
      {
        name: "John Doe",
        avatar: "https://testingbot.com/free-online-tools/random-avatar/300?1",
      },
      {
        name: "Jane Smith",
        avatar: "https://testingbot.com/free-online-tools/random-avatar/300?2",
      },
    ],
    category: "Calls",
    checklist: [
      { id: "c1", text: "Prepare presentation", completed: true },
      { id: "c2", text: "Send meeting link", completed: false },
    ],
    progress: 75,
    isPrivate: false,
    isFavorite: true,
    group: "Recently Assigned",
  },
  {
    id: "2",
    title: "Client objective meeting",
    description: "Discuss project milestones and deliverables",
    priority: "High",
    status: "To Do",
    dueDate: "Yesterday",
    assignees: [
      {
        name: "Alice Brown",
        avatar: "https://testingbot.com/free-online-tools/random-avatar/300?3",
      },
    ],
    category: "Conferences",
    checklist: [],
    progress: 0,
    isPrivate: true,
    isFavorite: false,
    group: "Recently Assigned",
  },
  {
    id: "3",
    title: "Target market trend analysis on the go",
    description: "Analyze the current market trends for the next quarter",
    priority: "Medium",
    status: "In Progress",
    dueDate: "Today",
    assignees: [
      {
        name: "Bob Wilson",
        avatar: "https://testingbot.com/free-online-tools/random-avatar/300?4",
      },
    ],
    category: "Meetings",
    checklist: [],
    progress: 45,
    isPrivate: false,
    isFavorite: false,
    group: "Recently Assigned",
  },
  {
    id: "4",
    title: "Send revised proposal to Mr. Dow Jones",
    description: "Review and send the final version of the proposal",
    priority: "Low",
    status: "To Do",
    dueDate: "Saturday",
    assignees: [
      {
        name: "Charlie Day",
        avatar: "https://testingbot.com/free-online-tools/random-avatar/300?5",
      },
    ],
    category: "Project",
    checklist: [],
    progress: 10,
    isPrivate: false,
    isFavorite: true,
    group: "Recently Assigned",
  },
  {
    id: "5",
    title: "Fix tooltip word wrap/break rules",
    description: "Frontend bugs related to long text in tooltips",
    priority: "High",
    status: "In Progress",
    dueDate: "4 Days ago",
    assignees: [
      {
        name: "David Kim",
        avatar: "https://testingbot.com/free-online-tools/random-avatar/300?6",
      },
    ],
    category: "Project",
    checklist: [],
    progress: 90,
    isPrivate: false,
    isFavorite: false,
    group: "Yesterday",
  },
];

const GROUPS = ["Recently Assigned", "Yesterday"];

// --- Helper Components ---
const PriorityBadge = ({ priority }: { priority: Priority }) => {
  const styles = {
    High: "bg-red-500/10 text-red-500 border-red-500/20",
    Medium: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    Low: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  };
  return (
    <Badge
      variant="outline"
      className={cn(
        "px-2 py-0.5 text-[10px] font-bold uppercase",
        styles[priority],
      )}
    >
      <div
        className={cn(
          "w-1 h-1 rounded-full mr-1",
          priority === "High"
            ? "bg-red-500"
            : priority === "Medium"
              ? "bg-orange-500"
              : "bg-emerald-500",
        )}
      />
      {priority}
    </Badge>
  );
};

const CategoryBadge = ({ category }: { category: string }) => {
  const colors: Record<string, string> = {
    Calls: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
    Meetings: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    Conferences: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
    Project: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  };
  return (
    <Badge
      className={cn(
        "rounded-md border-none px-3 py-1 font-semibold text-xs transition-all hover:opacity-80",
        colors[category] || "bg-gray-100 text-gray-600",
      )}
    >
      {category}
    </Badge>
  );
};

// --- Main Component ---
export default function TaskList() {
  const isDark = useSelector((state: RootState) => state.dark.isDark);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>("1");
  const [activeTab, setActiveTab] = useState("checklist");

  const selectedTask =
    MOCK_TASKS.find((t) => t.id === selectedTaskId) || MOCK_TASKS[0];

  return (
    <Layout>
      <div className="flex flex-col gap-6 h-full min-h-[calc(100vh-120px)] pb-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1
              className={cn(
                "text-2xl font-bold tracking-tight",
                isDark ? "text-white" : "text-slate-900",
              )}
            >
              All Tasks
              <ChevronDown className="inline-block ml-2 w-5 h-5 text-slate-400" />
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 transition-colors group-focus-within:text-orange-500" />
              <input
                type="text"
                placeholder="Search tasks..."
                className={cn(
                  "pl-9 pr-4 py-2 text-sm rounded-lg border w-full sm:w-64 transition-all focus:outline-none focus:ring-2 focus:ring-orange-500/20",
                  isDark
                    ? "bg-slate-900/50 border-slate-800 text-white placeholder:text-slate-500"
                    : "bg-white border-slate-200 text-slate-900 placeholder:text-slate-400",
                )}
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className={isDark ? "border-slate-800 bg-slate-900/50" : ""}
            >
              <Filter className="w-4 h-4 text-slate-500" />
            </Button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "gap-2 cursor-pointer transition-all",
                isDark
                  ? "bg-slate-900/50 border-slate-800 text-white"
                  : "bg-white border-slate-200 text-slate-900",
              )}
            >
              Bulk actions{" "}
              <ChevronDown
                className={cn(
                  "w-4 h-4",
                  isDark ? "text-slate-300" : "text-slate-500",
                )}
              />
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20 cursor-pointer">
              Apply
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "gap-2 cursor-pointer transition-all",
                isDark
                  ? "text-white hover:bg-white/10"
                  : "text-slate-900 hover:bg-slate-100",
              )}
            >
              Sort by date{" "}
              <ChevronDown
                className={cn(
                  "w-4 h-4",
                  isDark ? "text-slate-300" : "text-slate-500",
                )}
              />
            </Button>
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span>1 - 10 of 30</span>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ChevronRight className="w-4 h-4 rotate-180" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row items-start relative max-w-full">
          {/* Task List Column */}
          <div className="flex-1 w-full min-w-0 flex flex-col gap-8">
            {GROUPS.map((group) => (
              <div key={group} className="flex flex-col gap-4">
                <div className="flex items-center justify-between py-1 border-b border-orange-500/10">
                  <h3
                    className={cn(
                      "text-lg font-bold flex items-center gap-2",
                      isDark ? "text-slate-300" : "text-slate-700",
                    )}
                  >
                    {group}
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  </h3>
                </div>

                <div className="flex flex-col gap-3">
                  {MOCK_TASKS.filter((t) => t.group === group).map((task) => (
                    <MotionCard
                      key={task.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.002, x: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 450,
                        damping: 25,
                      }}
                      onClick={() => setSelectedTaskId(task.id)}
                      active={selectedTaskId === task.id}
                      className={cn(
                        "group p-4 transition-all cursor-pointer flex-row items-center gap-4 pt-4 pb-4 shadow-xl shadow-black/20",
                        !isDark && "hover:border-orange-200 shadow-sm",
                      )}
                    >
                      <Checkbox
                        className={cn(
                          "size-4 cursor-pointer",
                          selectedTaskId === task.id &&
                            "bg-orange-500 border-orange-500",
                        )}
                      />

                      <div className="flex items-center gap-2 cursor-pointer">
                        <Star
                          className={cn(
                            "size-4 cursor-pointer",
                            task.isFavorite
                              ? "fill-orange-400 text-orange-400"
                              : "text-slate-300",
                          )}
                        />
                        <div
                          className={cn(
                            "size-3 rounded-full",
                            task.priority === "High"
                              ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                              : task.priority === "Medium"
                                ? "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]"
                                : "bg-emerald-500",
                          )}
                        />
                      </div>

                      <div className="flex-1">
                        <h4
                          className={cn(
                            "font-semibold text-sm",
                            isDark ? "text-white" : "text-slate-900",
                          )}
                        >
                          {task.title}
                        </h4>
                      </div>

                      <div className="flex items-center gap-4">
                        <PriorityBadge priority={task.priority} />
                        <span
                          className={cn(
                            "text-xs font-medium w-24 text-right",
                            task.dueDate.includes("ago") ||
                              task.dueDate === "Yesterday"
                              ? "text-red-500"
                              : "text-cyan-500",
                          )}
                        >
                          {task.dueDate}
                        </span>

                        <div className="flex -space-x-2">
                          {task.assignees.map((a, i) => (
                            <div
                              key={i}
                              className="size-7 rounded-full border-2 border-background overflow-hidden shadow-sm"
                            >
                              <img
                                src={a.avatar}
                                alt={a.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>

                        <CategoryBadge category={task.category} />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-400 hover:text-white hover:bg-orange-500 cursor-pointer transition-all duration-200"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </MotionCard>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Task Detail Panel Wrapper */}
          <div
            className={cn(
              "w-full xl:w-auto shrink-0 transition-[max-width,max-height,opacity,margin] duration-300 ease-out overflow-visible",
              selectedTaskId
                ? "max-h-[3000px] xl:max-w-[424px] opacity-100 mt-6 xl:mt-0 xl:ml-6"
                : "max-h-0 xl:max-h-[3000px] xl:max-w-0 opacity-0 mt-0 xl:ml-0",
            )}
          >
            <div className="w-full xl:w-[400px] sticky top-[100px] h-fit z-30">
              <AnimatePresence>
                {selectedTaskId && (
                  <motion.div
                    key="detail-panel"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                  >
                    <Card
                      className={cn(
                        "border-none overflow-hidden backdrop-blur-xl shadow-2xl relative",
                        isDark
                          ? "bg-slate-950/80 ring-1 ring-white/10"
                          : "bg-white/95 ring-1 ring-black/5 shadow-orange-500/10",
                      )}
                    >
                      {/* Glassmorphism gradient effect */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2" />

                      <CardContent className="p-0">
                        {/* Panel Header */}
                        <div className="p-6 relative">
                          <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                              <div className="relative size-12 flex items-center justify-center">
                                <svg className="size-full" viewBox="0 0 36 36">
                                  <path
                                    className="text-slate-200 dark:text-slate-800"
                                    strokeDasharray="100, 100"
                                    strokeWidth="3"
                                    fill="none"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                  />
                                  <path
                                    className="text-orange-500 transition-all duration-1000 ease-out"
                                    strokeDasharray={`${selectedTask.progress}, 100`}
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    fill="none"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                  />
                                </svg>
                                <span className="absolute text-[10px] font-bold text-orange-500">
                                  {selectedTask.progress}/100
                                </span>
                              </div>
                              <div className="flex flex-col">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 px-2 text-xs font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 gap-1"
                                >
                                  <CheckCircle2 className="w-3 h-3" /> Mark as
                                  completed
                                </Button>
                              </div>
                            </div>
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <Link2 className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <Star
                                  className={cn(
                                    "w-4 h-4",
                                    selectedTask.isFavorite &&
                                      "fill-orange-400 text-orange-400",
                                  )}
                                />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => setSelectedTaskId(null)}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>

                          {selectedTask.isPrivate && (
                            <div className="mb-4 p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-md flex items-center gap-2">
                              <div className="size-2 bg-emerald-500 rounded-full animate-pulse" />
                              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                                This task is private for Jampack Team
                              </span>
                            </div>
                          )}

                          <h2
                            className={cn(
                              "text-2xl font-black mb-1",
                              isDark ? "text-white" : "text-slate-900",
                            )}
                          >
                            {selectedTask.title}
                          </h2>
                          <p className="text-sm text-slate-500 mb-6 font-medium">
                            {selectedTask.description}
                          </p>

                          <div className="flex items-center gap-2 mb-8">
                            <div className="flex -space-x-3">
                              {selectedTask.assignees.map((a, i) => (
                                <div
                                  key={i}
                                  className="size-9 rounded-full border-4 border-background overflow-hidden relative group"
                                >
                                  <img
                                    src={a.avatar}
                                    alt={a.name}
                                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                                  />
                                </div>
                              ))}
                              <button className="size-9 rounded-full border-4 border-background bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-orange-100 dark:hover:bg-orange-500/20 transition-colors">
                                <Plus className="w-4 h-4 text-slate-500" />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">
                                Due Date
                              </span>
                              <div
                                className={cn(
                                  "flex items-center gap-2 p-2 rounded-lg border",
                                  isDark
                                    ? "bg-slate-800 border-slate-700"
                                    : "bg-slate-50 border-slate-200",
                                )}
                              >
                                <Calendar className="w-3 h-3 text-orange-500" />
                                <span className="text-xs font-bold">
                                  {selectedTask.dueDate}
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-col gap-1.5">
                              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">
                                Status
                              </span>
                              <div
                                className={cn(
                                  "flex items-center justify-between p-2 rounded-lg border",
                                  isDark
                                    ? "bg-slate-800 border-slate-700"
                                    : "bg-slate-50 border-slate-200",
                                )}
                              >
                                <span className="text-xs font-bold text-orange-500 uppercase">
                                  {selectedTask.status}
                                </span>
                                <ChevronDown className="w-3 h-3 text-slate-400" />
                              </div>
                            </div>
                          </div>
                          {/* Premium Gradient Separator */}
                          <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent opacity-60" />
                        </div>

                        {/* Tabs */}
                        <div
                          className={cn(
                            "flex gap-2 p-1 mx-6 mt-6 rounded-xl border transition-all",
                            isDark
                              ? "bg-slate-800/50 border-slate-700/50 mt-8"
                              : "bg-slate-100/80 border-slate-200/60 shadow-inner mt-8",
                          )}
                        >
                          {[
                            {
                              id: "checklist",
                              label: "Checklist",
                              icon: CheckCircle2,
                            },
                            {
                              id: "comments",
                              label: "Comments",
                              icon: MessageSquare,
                            },
                            { id: "files", label: "Files", icon: Paperclip },
                            {
                              id: "activity",
                              label: "Activity",
                              icon: Activity,
                            },
                          ].map((tab) => (
                            <button
                              key={tab.id}
                              onClick={() => setActiveTab(tab.id)}
                              className={cn(
                                "flex-1 flex cursor-pointer items-center justify-center gap-1.5 py-2 px-1 rounded-lg text-xs font-bold transition-all duration-300 relative",
                                activeTab === tab.id
                                  ? isDark
                                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/40 translate-y-[-1px]"
                                    : "bg-white text-orange-600 shadow-md shadow-orange-500/10 ring-1 ring-black/5 translate-y-[-1px]"
                                  : isDark
                                    ? "text-slate-500 hover:text-slate-300 hover:bg-slate-700/30"
                                    : "text-slate-500 hover:text-slate-900 hover:bg-white/50",
                              )}
                            >
                              <tab.icon
                                className={cn(
                                  "w-3.5 h-3.5",
                                  activeTab === tab.id
                                    ? "text-current"
                                    : "text-slate-400",
                                )}
                              />
                              <span className="hidden sm:inline">
                                {tab.label}
                              </span>
                              {activeTab === tab.id && (
                                <motion.div
                                  layoutId="activeTab"
                                  className="absolute inset-x-0 -bottom-8 h-1 bg-orange-500 rounded-full blur-[2px] opacity-20 hidden"
                                />
                              )}
                            </button>
                          ))}
                        </div>

                        {/* Content Section */}
                        <div className="p-6">
                          {activeTab === "checklist" && (
                            <div className="flex flex-col gap-4">
                              {selectedTask.checklist.length > 0 ? (
                                selectedTask.checklist.map((item) => (
                                  <div
                                    key={item.id}
                                    className="flex items-center gap-3 group cursor-pointer"
                                  >
                                    <Checkbox
                                      checked={item.completed}
                                      className="size-4 rounded-md cursor-pointer"
                                    />
                                    <span
                                      className={cn(
                                        "text-sm font-medium transition-all cursor-pointer",
                                        item.completed &&
                                          "text-slate-400 line-through decoration-orange-500/50",
                                      )}
                                    >
                                      {item.text}
                                    </span>
                                  </div>
                                ))
                              ) : (
                                <div className="flex flex-col items-center justify-center py-8 text-center gap-3">
                                  <div className="p-3 bg-orange-100/50 dark:bg-orange-500/10 rounded-full">
                                    <Plus className="w-6 h-6 text-orange-500" />
                                  </div>
                                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                    No checklist items yet
                                  </p>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-orange-500 font-black h-7 cursor-pointer"
                                  >
                                    Add New Item
                                  </Button>
                                </div>
                              )}
                              <button className="flex items-center gap-2 text-xs font-bold text-orange-500 hover:text-orange-600 pl-8 transition-colors cursor-pointer">
                                <Plus className="w-3 h-3" /> New Item
                              </button>
                            </div>
                          )}

                          {activeTab !== "checklist" && (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                              <Clock className="w-8 h-8 text-slate-300 mb-3 animate-pulse" />
                              <p className="text-sm font-bold text-slate-400 capitalize">
                                No data available for {activeTab}
                              </p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
