import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import {
  Inbox,
  Send,
  FileText,
  Star,
  Trash2,
  AlertCircle,
  Archive,
  Search,
  MoreVertical,
  Paperclip,
  Share2,
  Reply,
  Forward,
  Plus,
  ChevronLeft,
  ChevronRight,
  Filter,
  Check,
  Tag,
  Flag,
  User,
  Clock,
  Printer,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import Layout from "~/components/Layout";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Input } from "~/components/ui/input";
import { Checkbox } from "~/components/ui/checkbox";
import { Tooltip } from "~/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "~/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import type { RootState } from "~/store/store";
import { cn } from "~/lib/utils";

// --- Types ---
interface ThreadMessage {
  id: string;
  sender: {
    name: string;
    email: string;
    avatar?: string;
    isMe: boolean;
  };
  body: string;
  timestamp: Date;
  attachments?: { name: string; size: string; type: string }[];
}

interface EmailMessage {
  id: string;
  sender: {
    name: string;
    email: string;
    avatar?: string;
  };
  subject: string;
  snippet: string;
  body: string;
  timestamp: Date;
  isUnread: boolean;
  isStarred: boolean;
  isFlagged: boolean;
  folder:
    | "inbox"
    | "sent"
    | "drafts"
    | "starred"
    | "trash"
    | "spam"
    | "archive";
  labels: string[];
  attachments?: { name: string; size: string; type: string }[];
  thread?: ThreadMessage[];
}

// --- Mock Data ---
const MOCK_EMAILS: EmailMessage[] = [
  {
    id: "1",
    sender: {
      name: "Morgan Freeman",
      email: "morgan@freeman.com",
      avatar: "https://i.pravatar.cc/150?u=morgan",
    },
    subject: "Creation Timelines For Our Forthcoming App",
    snippet:
      "I have reviewed the creation timelines for the forthcoming application and I have some thoughts on it.",
    body: `Hello team,\n\nI have reviewed the proposal and the timelines look a bit optimistic. We should consider adding some buffers for the UI/UX revision phase. As you know, perfection takes time.\n\nBest regards,\nMorgan`,
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    isUnread: true,
    isStarred: true,
    isFlagged: false,
    folder: "inbox",
    labels: ["Project", "Work"],
    attachments: [{ name: "Timeline_V2.pdf", size: "1.2 MB", type: "pdf" }],
    thread: [
      {
        id: "m1",
        sender: {
          name: "Morgan Freeman",
          email: "morgan@freeman.com",
          avatar: "https://i.pravatar.cc/150?u=morgan",
          isMe: false,
        },
        body: `Hello team,\n\nI have reviewed the proposal and the timelines look a bit optimistic. We should consider adding some buffers for the UI/UX revision phase. As you know, perfection takes time.\n\n"The best way to guarantee a loss is to quit." - let's stay focused and deliver something legendary.\n\nBest regards,\nMorgan`,
        timestamp: new Date(Date.now() - 7200000),
        attachments: [{ name: "Timeline_V2.pdf", size: "1.2 MB", type: "pdf" }],
      },
      {
        id: "m2",
        sender: {
          name: "Me",
          email: "me@natamas.com",
          isMe: true,
        },
        body: `Hi Morgan,\n\nThanks for the feedback. I agree with adding a buffer for the UI/UX phase. How much extra time do you think we should allocate? 2 weeks?\n\nBest,\nUser`,
        timestamp: new Date(Date.now() - 5400000),
      },
      {
        id: "m3",
        sender: {
          name: "Morgan Freeman",
          email: "morgan@freeman.com",
          avatar: "https://i.pravatar.cc/150?u=morgan",
          isMe: false,
        },
        body: `Two weeks sounds reasonable. It’s better to have it and not need it than to need it and not have it. Let's update the Gantt chart and share it with the stakeholders.\n\nMorgan`,
        timestamp: new Date(Date.now() - 4800000),
      },
      {
        id: "m4",
        sender: {
          name: "Me",
          email: "me@natamas.com",
          isMe: true,
        },
        body: `Great. I've updated the chart. I've attached the new version for your final approval before I send it off.`,
        timestamp: new Date(Date.now() - 4200000),
        attachments: [
          { name: "Revised_Timeline.pdf", size: "1.5 MB", type: "pdf" },
        ],
      },
      {
        id: "m5",
        sender: {
          name: "Morgan Freeman",
          email: "morgan@freeman.com",
          avatar: "https://i.pravatar.cc/150?u=morgan",
          isMe: false,
        },
        body: `I have reviewed the Revised_Timeline.pdf and I have some thoughts on it. The buffer looks good, but can we check the resource allocation for the dev team in week 6? It looks a bit tight.\n\nWarm regards,\nMorgan`,
        timestamp: new Date(Date.now() - 3600000),
      },
    ],
  },
  {
    id: "2",
    sender: {
      name: "Huma Therman",
      email: "huma@therman.com",
      avatar: "https://i.pravatar.cc/150?u=huma",
    },
    subject: "Refining the User Onboarding Flow",
    snippet:
      "I've been looking at the analytics and it seems we're losing users at the email verification step.",
    body: "Hi team,\n\nUsers are dropping off during verification. We need to simplify the process. Maybe magic links?\n\n- Huma",
    timestamp: new Date(Date.now() - 7200000),
    isUnread: false,
    isStarred: false,
    isFlagged: true,
    folder: "inbox",
    labels: ["UX", "Critical"],
  },
  {
    id: "3",
    sender: {
      name: "Jane Doe",
      email: "jane.doe@company.com",
    },
    subject: "Weekend Trip Planning",
    snippet:
      "Are we still on for the weekend hike? I've checked the weather and it looks great.",
    body: "Hey there,\n\nJust checking in about the hike. Weather forecast says sunny 25 degrees. Let me know!\n\nCheers,\nJane",
    timestamp: new Date(Date.now() - 86400000), // Yesterday
    isUnread: false,
    isStarred: true,
    isFlagged: false,
    folder: "starred",
    labels: ["Personal"],
  },
  {
    id: "4",
    sender: {
      name: "Stripe",
      email: "billing@stripe.com",
      avatar: "https://i.pravatar.cc/150?u=stripe",
    },
    subject: "Subscription Payment Successful - NATAMAS DASHBOARD",
    snippet:
      "Thank you for your payment. Your receipt #2394-2394 is now available.",
    body: "Your payment of $29.00 for the premium subscription has been processed successfully.",
    timestamp: new Date(Date.now() - 172800000),
    isUnread: false,
    isStarred: false,
    isFlagged: false,
    folder: "inbox",
    labels: ["Billing"],
  },
];

const FOLDERS = [
  { id: "inbox", label: "Inbox", icon: <Inbox size={16} />, count: 12 },
  { id: "starred", label: "Starred", icon: <Star size={16} />, count: 5 },
  { id: "sent", label: "Sent", icon: <Send size={16} />, count: 0 },
  { id: "drafts", label: "Drafts", icon: <FileText size={16} />, count: 2 },
  { id: "archive", label: "Archive", icon: <Archive size={16} />, count: 0 },
  { id: "spam", label: "Spam", icon: <AlertCircle size={16} />, count: 1 },
  { id: "trash", label: "Trash", icon: <Trash2 size={16} />, count: 0 },
];

const LABELS = [
  { id: "Work", color: "bg-blue-500" },
  { id: "Project", color: "bg-purple-500" },
  { id: "UX", color: "bg-cyan-500" },
  { id: "Personal", color: "bg-orange-500" },
  { id: "Critical", color: "bg-red-500" },
  { id: "Billing", color: "bg-emerald-500" },
];

export default function Email() {
  const isDark = useSelector((state: RootState) => state.dark.isDark);
  const [activeFolder, setActiveFolder] = useState("inbox");
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(
    MOCK_EMAILS[0].id,
  );
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileListVisible, setIsMobileListVisible] = useState(true);

  // --- Derived State ---
  const filteredEmails = useMemo(() => {
    return MOCK_EMAILS.filter((email) => {
      const matchesFolder =
        activeFolder === "starred"
          ? email.isStarred
          : email.folder === activeFolder;
      const matchesSearch =
        email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.sender.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFolder && matchesSearch;
    });
  }, [activeFolder, searchQuery]);

  const selectedEmail = useMemo(
    () => MOCK_EMAILS.find((e) => e.id === selectedEmailId) || null,
    [selectedEmailId],
  );

  // --- Theme Classes ---
  const textPrimary = isDark ? "text-white" : "text-slate-900";
  const textMuted = isDark ? "text-slate-400" : "text-slate-500 ";
  const borderMuted = isDark ? "border-slate-800" : "border-slate-100";
  const bgPane = isDark ? "bg-slate-950" : "bg-white";

  return (
    <Layout isFullscreen>
      <div className={cn("flex h-full w-full overflow-hidden", bgPane)}>
        {/* --- Left Sidebar: Navigation --- */}
        <aside
          className={cn(
            "sidebar-scroll-container w-64 xl:w-72 hidden lg:flex flex-col border-r transition-all duration-300 relative z-20 backdrop-blur-3xl shadow-2xl shadow-black/5",
            borderMuted,
            isDark ? "bg-slate-950/60" : "bg-white/80",
          )}
        >
          <div className="p-8">
            <Button
              onClick={() => setIsComposeOpen(true)}
              className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white rounded-[1.25rem] font-black text-[13px] shadow-xl shadow-orange-500/20 gap-2 transition-all active:scale-95 group overflow-hidden"
            >
              <div className="absolute inset-x-0 bottom-0 top-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <Plus className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Compose Message</span>
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 space-y-8 premium-scrollbar">
            {/* Folders Section */}
            <div>
              <h3
                className={cn(
                  "px-4 mb-3 text-[9px] font-black uppercase tracking-[0.2em] opacity-40",
                  textPrimary,
                )}
              >
                Mailboxes
              </h3>
              <nav className="space-y-1">
                {FOLDERS.map((folder) => (
                  <button
                    key={folder.id}
                    onClick={() => setActiveFolder(folder.id)}
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all duration-300 group",
                      activeFolder === folder.id
                        ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20 font-bold"
                        : cn(
                            "text-slate-400 hover:bg-slate-500/5",
                            isDark
                              ? "hover:text-white"
                              : "hover:text-slate-900",
                          ),
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={cn(
                          "w-4 h-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-110",
                        )}
                      >
                        {folder.icon}
                      </span>
                      <span className="text-[13px]">{folder.label}</span>
                    </div>
                    {folder.count > 0 && (
                      <span
                        className={cn(
                          "px-1.5 py-0.5 rounded-md text-[9px] font-bold",
                          activeFolder === folder.id
                            ? "bg-white/20 text-white"
                            : "bg-slate-500/10 text-slate-500",
                        )}
                      >
                        {folder.count}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>

            {/* Labels Section */}
            <div className="pb-10">
              <h3
                className={cn(
                  "px-4 mb-3 text-[9px] font-black uppercase tracking-[0.2em] opacity-40",
                  textPrimary,
                )}
              >
                Labels
              </h3>
              <div className="space-y-1">
                {LABELS.map((label) => (
                  <button
                    key={label.id}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 group hover:bg-slate-500/10 text-slate-400",
                      isDark ? "hover:text-white" : "hover:text-slate-900",
                    )}
                  >
                    <div
                      className={cn(
                        "w-1.5 h-1.5 rounded-full ring-4 ring-transparent transition-all group-hover:ring-orange-500/20",
                        label.color,
                      )}
                    />
                    <span className="text-[13px] font-medium">{label.id}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* --- Middle: Email List --- --- */}
        <section
          className={cn(
            "w-full lg:w-80 xl:w-112.5 flex flex-col border-r h-full transition-all duration-300 relative z-10",
            borderMuted,
            // On mobile: hide when email is selected (detail view takes over)
            // On lg+: always show as a column
            selectedEmailId ? "hidden lg:flex" : "flex",
          )}
        >
          {/* List Header */}
          <div
            className={cn(
              "p-6 border-b space-y-6 bg-transparent sticky top-0 z-10",
              borderMuted,
            )}
          >
            <div className="flex items-center justify-between">
              <h2
                className={cn("text-xl font-black tracking-tight", textPrimary)}
              >
                Inbox
              </h2>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-xl text-slate-400 transition-all hover:bg-orange-500 hover:text-white"
                >
                  <Filter className="w-4 h-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-xl text-slate-400 transition-all hover:bg-orange-500 hover:text-white"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Mark all as read</DropdownMenuItem>
                    <DropdownMenuItem>Archive all</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-500">
                      Delete all
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
              <Input
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 text-[13px] rounded-xl bg-slate-500/5 border-none focus:ring-2 focus:ring-orange-500/50 transition-all"
              />
            </div>
          </div>

          {/* List Content */}
          <div className="flex-1 overflow-y-auto premium-scrollbar bg-transparent">
            {filteredEmails.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center opacity-30 select-none">
                <Inbox className="w-12 h-12 mb-3" />
                <p className="font-bold text-[13px]">No emails found</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-500/5">
                {filteredEmails.map((email) => (
                  <motion.div
                    key={email.id}
                    layoutId={`email-${email.id}`}
                    onClick={() => {
                      setSelectedEmailId(email.id);
                      setIsMobileListVisible(false);
                    }}
                    className={cn(
                      "p-4 cursor-pointer transition-all duration-300 relative group overflow-hidden",
                      selectedEmailId === email.id
                        ? "bg-slate-500/5 ring-1 ring-inset ring-orange-500/10"
                        : "hover:bg-slate-500/5",
                    )}
                  >
                    {/* Active State Indication */}
                    {selectedEmailId === email.id && (
                      <motion.div
                        layoutId="activeEmail"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500 shadow-[2px_0_10px_rgba(249,115,22,0.5)]"
                      />
                    )}

                    <div className="flex items-start gap-4">
                      <div className="relative shrink-0">
                        {email.sender.avatar ? (
                          <img
                            src={email.sender.avatar}
                            className="w-10 h-10 rounded-xl object-cover shadow-lg"
                            alt=""
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 font-black text-sm">
                            {email.sender.name.charAt(0)}
                          </div>
                        )}
                        {email.isUnread && (
                          <div className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-orange-500 shadow-sm" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4
                            className={cn(
                              "text-[13px] font-black truncate",
                              email.isUnread ? textPrimary : textMuted,
                            )}
                          >
                            {email.sender.name}
                          </h4>
                          <span
                            className={cn(
                              "text-[9px] font-bold opacity-50 shrink-0",
                              textMuted,
                            )}
                          >
                            {format(email.timestamp, "h:mm a")}
                          </span>
                        </div>
                        <h5
                          className={cn(
                            "text-[12px] font-bold leading-snug mb-1 truncate",
                            textPrimary,
                          )}
                        >
                          {email.subject}
                        </h5>
                        <p
                          className={cn(
                            "text-[11px] font-medium leading-relaxed line-clamp-2",
                            textMuted,
                          )}
                        >
                          {email.snippet}
                        </p>

                        <div className="flex items-center gap-2 mt-3 overflow-x-auto no-scrollbar">
                          {email.labels.map((l) => (
                            <Badge
                              key={l}
                              variant="outline"
                              className={cn(
                                "px-1.5 py-0 h-4 text-[8px] font-black border-slate-500/20 bg-slate-500/5",
                                isDark ? "text-slate-300" : "text-slate-600",
                              )}
                            >
                              {l}
                            </Badge>
                          ))}
                          {email.attachments && (
                            <Paperclip className="w-2.5 h-2.5 text-slate-400 ml-1" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Quick Hover Actions (Visual Mock) */}
                    <div className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="group w-7 h-7 rounded-lg hover:bg-orange-500 transition-all"
                      >
                        <Star
                          className={cn(
                            "w-3 h-3 transition-all",
                            email.isStarred
                              ? "fill-orange-500 text-orange-500 group-hover:fill-white group-hover:text-white"
                              : "text-slate-400 group-hover:text-white",
                          )}
                        />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-7 h-7 rounded-lg hover:bg-red-500 hover:text-white"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* --- Right: Detail View --- --- */}
        <main
          className={cn(
            "flex-1 min-w-0 flex flex-col h-full transition-all duration-300 relative z-0",
            selectedEmailId ? "flex" : "hidden lg:flex",
          )}
        >
          <AnimatePresence mode="wait">
            {!selectedEmail ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center text-center opacity-20 select-none"
              >
                <div className="w-24 h-24 rounded-[2rem] bg-slate-500/5 flex items-center justify-center mb-6 border border-dashed border-slate-500/20">
                  <Inbox className="w-10 h-10" />
                </div>
                <h3 className={cn("text-lg font-black mb-2", textPrimary)}>
                  Select an email to read
                </h3>
                <p className="text-[13px] font-medium">
                  Nothing is selected at the moment.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={selectedEmail.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col h-full bg-transparent overflow-hidden"
              >
                {/* View Toolbar */}
                <div
                  className={cn(
                    "px-4 sm:px-6 h-14 flex items-center justify-between border-b shrink-0",
                    borderMuted,
                  )}
                >
                  <div className="flex-1 flex items-center gap-2 sm:gap-4 min-w-0 overflow-x-auto no-scrollbar">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => { setSelectedEmailId(null); }}
                      className="lg:hidden rounded-xl text-slate-400 shrink-0"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-xl text-slate-400 transition-all hover:bg-orange-500 hover:text-white"
                      >
                        <Reply className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-xl text-slate-400 transition-all hover:bg-orange-500 hover:text-white"
                      >
                        <Forward className="w-3.5 h-3.5" />
                      </Button>
                      <div className="w-px h-6 bg-slate-500/10 mx-2" />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="group rounded-xl text-slate-400 transition-all hover:bg-orange-500 hover:text-white"
                      >
                        <Star
                          className={cn(
                            "w-3.5 h-3.5 transition-all",
                            selectedEmail.isStarred
                              ? "fill-orange-500 text-orange-500 group-hover:fill-white group-hover:text-white"
                              : "text-slate-400 group-hover:text-white",
                          )}
                        />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-xl text-slate-400 transition-all hover:bg-red-500 hover:text-white"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-xl text-slate-400 transition-all hover:bg-orange-500 hover:text-white"
                      >
                        <Archive className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-xl text-slate-400 hidden sm:flex"
                    >
                      <Printer className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-xl text-slate-400 hidden sm:flex"
                    >
                      <Flag className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 overflow-y-auto premium-scrollbar p-2 sm:p-4 lg:p-6">
                  <div className="w-full space-y-6">
                    {/* Email Header */}
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <h1
                          className={cn(
                            "text-xl sm:text-2xl font-black tracking-tight leading-tight min-w-0",
                            textPrimary,
                          )}
                        >
                          {selectedEmail.subject}
                        </h1>
                        <div className="flex items-center gap-2 shrink-0 flex-wrap">
                          {selectedEmail.labels.map((l) => (
                            <Badge
                              key={l}
                              className="bg-orange-500/10 text-orange-500 border-none font-black text-[9px] uppercase tracking-widest"
                            >
                              {l}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Conversation Thread */}
                    <div className="space-y-0 relative">
                      {/* Vertical line connector */}
                      <div className="absolute left-[13px] top-10 bottom-10 w-px bg-slate-500/10 hidden sm:block" />

                      {(
                        selectedEmail.thread || [
                          {
                            id: selectedEmail.id,
                            sender: { ...selectedEmail.sender, isMe: false },
                            body: selectedEmail.body,
                            timestamp: selectedEmail.timestamp,
                            attachments: selectedEmail.attachments,
                          },
                        ]
                      ).map((msg, idx) => (
                        <div
                          key={msg.id}
                          className={cn(
                            "relative group transition-all",
                            msg.sender.isMe ? "pl-2 sm:pl-16" : "pl-0 sm:pl-8",
                            idx !== 0 && "pt-6",
                          )}
                        >
                          <div
                            className={cn(
                              "p-4 rounded-3xl transition-all",
                              msg.sender.isMe
                                ? "bg-slate-500/5 ring-1 ring-inset ring-slate-500/10"
                                : "bg-transparent",
                            )}
                          >
                            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                              <div className="flex items-center gap-4 flex-1 min-w-52">
                                <div className="relative shrink-0">
                                  {msg.sender.avatar ? (
                                    <img
                                      src={msg.sender.avatar}
                                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl object-cover shadow-lg"
                                      alt=""
                                    />
                                  ) : (
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 font-black">
                                      {msg.sender.name.charAt(0)}
                                    </div>
                                  )}
                                  <div className="absolute -bottom-1 -right-1 h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-950 shadow-sm" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <h4
                                    className={cn(
                                      "text-[13px] sm:text-sm font-black truncate",
                                      textPrimary,
                                    )}
                                  >
                                    {msg.sender.name}
                                  </h4>
                                  <div className="flex items-center gap-2 text-[9px] sm:text-[10px] font-bold opacity-60">
                                    <span
                                      className={cn(
                                        textMuted,
                                        "truncate max-w-[120px] sm:max-w-[200px]",
                                      )}
                                    >
                                      {msg.sender.email}
                                    </span>
                                    <span className="w-1 h-1 rounded-full bg-slate-500/30 shrink-0" />
                                    <span className={cn(textMuted, "truncate")}>
                                      {msg.sender.isMe ? "to Morgan" : "to me"}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 sm:gap-1 text-left sm:text-right shrink-0">
                                <p
                                  className={cn(
                                    "text-[9px] sm:text-[10px] font-black uppercase tracking-widest",
                                    textPrimary,
                                  )}
                                >
                                  {format(msg.timestamp, "MMM d, yyyy")}
                                </p>
                                <p
                                  className={cn(
                                    "text-[9px] font-bold uppercase tracking-widest opacity-60",
                                    textMuted,
                                  )}
                                >
                                  {format(msg.timestamp, "hh:mm a")}
                                </p>
                              </div>
                            </div>

                            <article
                              className={cn(
                                "text-[13px] leading-relaxed font-medium opacity-80 whitespace-pre-wrap",
                                textPrimary,
                              )}
                            >
                              {msg.body}
                            </article>

                            {/* Internal Attachments */}
                            {msg.attachments && (
                              <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4 mt-8">
                                {msg.attachments.map((att) => (
                                  <div
                                    key={att.name}
                                    className="p-4 rounded-2xl bg-slate-500/5 border border-dashed border-slate-500/20 group/att hover:border-orange-500/50 transition-all cursor-pointer flex items-center justify-between"
                                  >
                                    <div className="flex items-center gap-3 overflow-hidden">
                                      <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500 shrink-0">
                                        <FileText className="w-4 h-4" />
                                      </div>
                                      <div className="overflow-hidden">
                                        <p
                                          className={cn(
                                            "text-[11px] font-black truncate",
                                            textPrimary,
                                          )}
                                        >
                                          {att.name}
                                        </p>
                                        <p
                                          className={cn(
                                            "text-[9px] font-bold uppercase tracking-widest",
                                            isDark
                                              ? "text-slate-500"
                                              : "text-slate-400",
                                          )}
                                        >
                                          {att.size}
                                        </p>
                                      </div>
                                    </div>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="rounded-xl text-slate-400 group-hover/att:text-orange-500 group-hover/att:bg-orange-500/10"
                                    >
                                      <Plus className="w-3.5 h-3.5 rotate-45" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Quick Reply Area */}
                    <div className="pt-12 pb-20">
                      <div
                        className={cn(
                          "p-6 rounded-2xl bg-slate-500/5 border border-slate-500/10 focus-within:border-orange-500/50 focus-within:ring-2 focus-within:ring-orange-500/30 transition-all",
                        )}
                      >
                        <textarea
                          placeholder="Click here to reply..."
                          className="w-full bg-transparent border-none outline-none resize-none text-[13px] font-medium opacity-70 p-4 min-h-[80px] premium-scrollbar h-fit placeholder:text-slate-500"
                        />
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="rounded-xl text-slate-400 transition-all hover:bg-orange-500 hover:text-white"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="rounded-xl text-slate-400 transition-all hover:bg-orange-500 hover:text-white"
                            >
                              <User className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="rounded-xl text-slate-400 transition-all hover:bg-orange-500 hover:text-white"
                            >
                              <Tag className="w-4 h-4" />
                            </Button>
                          </div>
                          <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-6 text-[13px] font-black shadow-lg shadow-orange-500/20 gap-2 h-10 transition-all active:scale-95">
                            Send Reply
                            <Send className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* --- Floating Compose Modal --- */}
        <AnimatePresence>
          {isComposeOpen && (
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              className={cn(
                "fixed bottom-0 right-8 w-[500px] sm:w-[600px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-t-2xl overflow-hidden z-[100] border-x border-t transition-colors duration-300",
                isDark ? "bg-[#1a1a1a] border-slate-800" : "bg-white border-slate-200"
              )}
            >
              {/* Header */}
              <div className="bg-[#2a2a2a] text-white p-4 flex items-center justify-between">
                <span className="text-sm font-bold tracking-tight">Compose Email</span>
                <div className="flex items-center gap-2">
                  <button className="p-1 hover:bg-white/10 rounded-md transition-colors">
                    <X className="w-3.5 h-3.5 rotate-45" /> {/* Mimic minimize */}
                  </button>
                  <button className="p-1 hover:bg-white/10 rounded-md transition-colors">
                    <ChevronRight className="w-3.5 h-3.5 -rotate-45" /> {/* Mimic maximize */}
                  </button>
                  <button 
                    onClick={() => setIsComposeOpen(false)}
                    className="p-1 hover:bg-red-500 rounded-md transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-4 space-y-4">
                {/* Recipients Chips */}
                <div className="flex items-center gap-3 flex-wrap py-2 border-b border-slate-500/10">
                  <div className="flex items-center gap-2 px-2 py-1 bg-orange-500/10 rounded-lg border border-orange-500/20 group">
                    <img src="https://i.pravatar.cc/150?u=morgan" className="w-5 h-5 rounded-full object-cover" />
                    <span className="text-xs font-bold text-orange-600">Morgan</span>
                    <X className="w-3 h-3 text-orange-400 hover:text-orange-600 cursor-pointer" />
                  </div>
                  <div className={cn(
                    "flex items-center gap-2 px-2 py-1 rounded-lg border group transition-colors",
                    isDark ? "bg-slate-800/50 border-slate-700" : "bg-slate-100 border-slate-200"
                  )}>
                    <img src="https://i.pravatar.cc/150?u=huma" className="w-5 h-5 rounded-full object-cover" />
                    <span className={cn("text-xs font-bold", isDark ? "text-slate-300" : "text-slate-600")}>Charlie</span>
                    <X className="w-3 h-3 text-slate-400 hover:text-slate-600 cursor-pointer" />
                  </div>
                  <div className={cn(
                    "flex items-center gap-2 px-2 py-1 rounded-lg border group transition-colors",
                    isDark ? "bg-slate-800/50 border-slate-700" : "bg-slate-100 border-slate-200"
                  )}>
                    <img src="https://i.pravatar.cc/150?u=jane" className="w-5 h-5 rounded-full object-cover" />
                    <span className={cn("text-xs font-bold", isDark ? "text-slate-300" : "text-slate-600")}>Winston</span>
                    <X className="w-3 h-3 text-slate-400 hover:text-slate-600 cursor-pointer" />
                  </div>
                  <Input 
                    placeholder="Add recipients..." 
                    className="flex-1 min-w-[120px] border-none shadow-none focus-visible:ring-0 text-xs h-8 bg-transparent" 
                  />
                </div>

                {/* Subject */}
                <div className="border-b border-slate-500/10">
                  <Input 
                    placeholder="Subject" 
                    className="border-none shadow-none focus-visible:ring-0 text-sm font-bold h-10 px-0 bg-transparent" 
                  />
                </div>

                {/* Message Body */}
                <div className="relative">
                  <textarea
                    placeholder="Write your message here..."
                    className={cn(
                      "w-full min-h-[250px] bg-transparent border-none outline-none resize-none text-[13px] leading-relaxed p-0 premium-scrollbar",
                      isDark ? "text-slate-300" : "text-slate-600"
                    )}
                  />
                </div>

                {/* Footer Toolbar */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-500/10">
                  <div className="flex items-center gap-1">
                    <Button 
                      className="bg-[#2d7d8a] hover:bg-[#24636d] text-white rounded-lg h-9 px-6 font-bold text-xs"
                    >
                      Send
                    </Button>
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-orange-500 hover:bg-orange-500/10 rounded-lg h-9 w-9">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-orange-500 hover:bg-orange-500/10 rounded-lg h-9 w-9">
                      <FileText className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg h-9 w-9">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}
