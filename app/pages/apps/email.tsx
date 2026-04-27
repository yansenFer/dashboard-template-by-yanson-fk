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
  Menu,
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
  { id: "inbox", label: "Inbox", icon: <Inbox />, count: 12 },
  { id: "starred", label: "Starred", icon: <Star />, count: 5 },
  { id: "sent", label: "Sent", icon: <Send />, count: 0 },
  { id: "drafts", label: "Drafts", icon: <FileText />, count: 2 },
  { id: "archive", label: "Archive", icon: <Archive />, count: 0 },
  { id: "spam", label: "Spam", icon: <AlertCircle />, count: 1 },
  { id: "trash", label: "Trash", icon: <Trash2 />, count: 0 },
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
  const textMuted = isDark ? "text-slate-400" : "text-slate-500";
  const borderMuted = isDark ? "border-slate-800" : "border-slate-100";
  const bgPane = isDark ? "bg-slate-950" : "bg-white";

  return (
    <Layout isFullscreen>
      <div className={cn("flex h-full w-full overflow-hidden", bgPane)}>
        {/* --- Left Sidebar: Navigation --- */}
        <aside
          className={cn(
            "w-72 hidden lg:flex flex-col border-r transition-all duration-300 relative z-20 backdrop-blur-3xl shadow-2xl shadow-black/5",
            borderMuted,
            isDark ? "bg-slate-950/60" : "bg-white/80",
          )}
        >
          <div className="p-8">
            <Button
              onClick={() => setIsComposeOpen(true)}
              className="w-full h-14 bg-orange-500 hover:bg-orange-600 text-white rounded-[1.25rem] font-black text-sm shadow-xl shadow-orange-500/20 gap-3 transition-all active:scale-95 group overflow-hidden"
            >
              <div className="absolute inset-x-0 bottom-0 top-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <Plus className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Compose Message</span>
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto premium-scrollbar px-4 space-y-8">
            {/* Folders Section */}
            <div>
              <h3
                className={cn(
                  "px-4 mb-4 text-[10px] font-black uppercase tracking-[0.2em] opacity-40",
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
                      "w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 group",
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
                          "w-5 h-5 transition-transform duration-300 group-hover:scale-110",
                        )}
                      >
                        {folder.icon}
                      </span>
                      <span className="text-sm">{folder.label}</span>
                    </div>
                    {folder.count > 0 && (
                      <span
                        className={cn(
                          "px-2 py-0.5 rounded-lg text-[10px] font-bold",
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
                  "px-4 mb-4 text-[10px] font-black uppercase tracking-[0.2em] opacity-40",
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
                      "w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 group hover:bg-slate-500/10 text-slate-400",
                      isDark ? "hover:text-white" : "hover:text-slate-900",
                    )}
                  >
                    <div
                      className={cn(
                        "w-2 h-2 rounded-full ring-4 ring-transparent transition-all group-hover:ring-orange-500/20",
                        label.color,
                      )}
                    />
                    <span className="text-sm font-medium">{label.id}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* --- Middle: Email List --- --- */}
        <section
          className={cn(
            "w-full lg:w-[450px] flex flex-col border-r h-full transition-all duration-300 relative z-10",
            borderMuted,
            !isMobileListVisible && "hidden lg:flex",
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
                className={cn(
                  "text-2xl font-black tracking-tight",
                  textPrimary,
                )}
              >
                Inbox
              </h2>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-xl text-slate-400 transition-all hover:bg-orange-500 hover:text-white"
                >
                  <Filter className="w-5 h-5" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-xl text-slate-400 transition-all hover:bg-orange-500 hover:text-white"
                    >
                      <MoreVertical className="w-5 h-5" />
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
                className="pl-11 h-12 rounded-2xl bg-slate-500/5 border-none focus:ring-2 focus:ring-orange-500/50 transition-all"
              />
            </div>
          </div>

          {/* List Content */}
          <div className="flex-1 overflow-y-auto premium-scrollbar bg-transparent">
            {filteredEmails.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center opacity-30 select-none">
                <Inbox className="w-16 h-16 mb-4" />
                <p className="font-bold">No emails found</p>
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
                      "p-6 cursor-pointer transition-all duration-300 relative group overflow-hidden",
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
                            className="w-12 h-12 rounded-2xl object-cover shadow-lg"
                            alt=""
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 font-black">
                            {email.sender.name.charAt(0)}
                          </div>
                        )}
                        {email.isUnread && (
                          <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-orange-500 shadow-sm" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4
                            className={cn(
                              "text-sm font-black truncate",
                              email.isUnread ? textPrimary : textMuted,
                            )}
                          >
                            {email.sender.name}
                          </h4>
                          <span
                            className={cn(
                              "text-[10px] font-bold opacity-50 shrink-0",
                              textMuted,
                            )}
                          >
                            {format(email.timestamp, "h:mm a")}
                          </span>
                        </div>
                        <h5
                          className={cn(
                            "text-xs font-bold leading-snug mb-1 truncate",
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
                                "px-2 py-0 h-5 text-[9px] font-black border-slate-500/20 bg-slate-500/5",
                                isDark ? "text-slate-300" : "text-slate-600",
                              )}
                            >
                              {l}
                            </Badge>
                          ))}
                          {email.attachments && (
                            <Paperclip className="w-3 h-3 text-slate-400 ml-1" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Quick Hover Actions (Visual Mock) */}
                    <div className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="group w-8 h-8 rounded-lg hover:bg-orange-500 transition-all"
                      >
                        <Star
                          className={cn(
                            "w-3.5 h-3.5 transition-all",
                            email.isStarred
                              ? "fill-orange-500 text-orange-500 group-hover:fill-white group-hover:text-white"
                              : "text-slate-400 group-hover:text-white",
                          )}
                        />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8 rounded-lg hover:bg-red-500 hover:text-white"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
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
            "flex-1 flex flex-col h-full transition-all duration-300 relative z-0",
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
                <div className="w-32 h-32 rounded-[2.5rem] bg-slate-500/5 flex items-center justify-center mb-8 border border-dashed border-slate-500/20">
                  <Inbox className="w-12 h-12" />
                </div>
                <h3 className={cn("text-xl font-black mb-2", textPrimary)}>
                  Select an email to read
                </h3>
                <p className="text-sm font-medium">
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
                    "px-4 sm:px-8 h-20 flex items-center justify-between border-b shrink-0",
                    borderMuted,
                  )}
                >
                  <div className="flex-1 flex items-center gap-2 sm:gap-4 min-w-0 overflow-x-auto no-scrollbar">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsMobileListVisible(true)}
                      className="lg:hidden rounded-xl text-slate-400 shrink-0"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-xl text-slate-400 transition-all hover:bg-orange-500 hover:text-white"
                      >
                        <Reply className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-xl text-slate-400 transition-all hover:bg-orange-500 hover:text-white"
                      >
                        <Forward className="w-4 h-4" />
                      </Button>
                      <div className="w-px h-6 bg-slate-500/10 mx-2" />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="group rounded-xl text-slate-400 transition-all hover:bg-orange-500 hover:text-white"
                      >
                        <Star
                          className={cn(
                            "w-4 h-4 transition-all",
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
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-xl text-slate-400 transition-all hover:bg-orange-500 hover:text-white"
                      >
                        <Archive className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-xl text-slate-400 hidden sm:flex"
                    >
                      <Printer className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-xl text-slate-400 hidden sm:flex"
                    >
                      <Flag className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 overflow-y-auto premium-scrollbar p-2 sm:p-4 lg:p-6">
                  <div className="w-full space-y-6">
                    {/* Email Header */}
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <h1
                          className={cn(
                            "text-2xl sm:text-4xl font-black tracking-tight leading-tight",
                            textPrimary,
                          )}
                        >
                          {selectedEmail.subject}
                        </h1>
                        <div className="flex items-center gap-2 shrink-0 flex-wrap">
                          {selectedEmail.labels.map((l) => (
                            <Badge
                              key={l}
                              className="bg-orange-500/10 text-orange-500 border-none font-black text-[10px] uppercase tracking-widest"
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
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                              <div className="flex items-center gap-4 flex-1 min-w-0">
                                <div className="relative shrink-0">
                                  {msg.sender.avatar ? (
                                    <img
                                      src={msg.sender.avatar}
                                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl object-cover shadow-lg"
                                      alt=""
                                    />
                                  ) : (
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 font-black">
                                      {msg.sender.name.charAt(0)}
                                    </div>
                                  )}
                                  <div className="absolute -bottom-1 -right-1 h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-950 shadow-sm" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <h4
                                    className={cn(
                                      "text-base sm:text-lg font-black truncate",
                                      textPrimary,
                                    )}
                                  >
                                    {msg.sender.name}
                                  </h4>
                                  <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold opacity-60">
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
                                    "text-[10px] sm:text-xs font-black uppercase tracking-widest",
                                    textPrimary,
                                  )}
                                >
                                  {format(msg.timestamp, "MMM d, yyyy")}
                                </p>
                                <p
                                  className={cn(
                                    "text-[10px] font-bold uppercase tracking-widest opacity-60",
                                    textMuted,
                                  )}
                                >
                                  {format(msg.timestamp, "hh:mm a")}
                                </p>
                              </div>
                            </div>

                            <article
                              className={cn(
                                "text-base leading-[1.8] font-medium opacity-80 whitespace-pre-wrap",
                                textPrimary,
                              )}
                            >
                              {msg.body}
                            </article>

                            {/* Internal Attachments */}
                            {msg.attachments && (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                                {msg.attachments.map((att) => (
                                  <div
                                    key={att.name}
                                    className="p-4 rounded-2xl bg-slate-500/5 border border-dashed border-slate-500/20 group/att hover:border-orange-500/50 transition-all cursor-pointer flex items-center justify-between"
                                  >
                                    <div className="flex items-center gap-3 overflow-hidden">
                                      <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 shrink-0">
                                        <FileText className="w-5 h-5" />
                                      </div>
                                      <div className="overflow-hidden">
                                        <p
                                          className={cn(
                                            "text-xs font-black truncate",
                                            textPrimary,
                                          )}
                                        >
                                          {att.name}
                                        </p>
                                        <p
                                          className={cn(
                                            "text-[10px] font-bold uppercase tracking-widest",
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
                                      <Plus className="w-4 h-4 rotate-45" />
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
                          className="w-full bg-transparent border-none outline-none resize-none text-sm font-medium opacity-70 p-4 min-h-[120px] premium-scrollbar h-fit placeholder:text-slate-500"
                        />
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="rounded-xl text-slate-400 transition-all hover:bg-orange-500 hover:text-white"
                            >
                              <Plus className="w-5 h-5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="rounded-xl text-slate-400 transition-all hover:bg-orange-500 hover:text-white"
                            >
                              <User className="w-5 h-5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="rounded-xl text-slate-400 transition-all hover:bg-orange-500 hover:text-white"
                            >
                              <Tag className="w-5 h-5" />
                            </Button>
                          </div>
                          <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-2xl px-8 font-black shadow-lg shadow-orange-500/20 gap-2 h-12 transition-all active:scale-95">
                            Send Reply
                            <Send className="w-4 h-4" />
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

        {/* --- Compose Modal --- --- */}
        <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
          <DialogContent
            showCloseButton={false}
            className={cn(
              "sm:max-w-[700px] border-none shadow-[0_50px_100px_rgba(0,0,0,0.3)] backdrop-blur-3xl p-0 overflow-hidden rounded-2xl",
              isDark ? "bg-slate-900/90" : "bg-white/95",
            )}
          >
            <DialogHeader className="p-10 pb-0 flex flex-row items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center text-white shadow-xl shadow-orange-500/20">
                  <Plus className="w-7 h-7" />
                </div>
                <div>
                  <DialogTitle
                    className={cn(
                      "text-3xl font-black tracking-tight",
                      textPrimary,
                    )}
                  >
                    Compose
                  </DialogTitle>
                  <p
                    className={cn(
                      "text-[10px] font-black uppercase tracking-[0.2em] opacity-40",
                      textMuted,
                    )}
                  >
                    New message
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsComposeOpen(false)}
                  className="rounded-xl text-slate-400 hover:bg-slate-500/10"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </DialogHeader>

            <div className="p-10 space-y-8">
              <div className="space-y-6">
                <div className="relative group">
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 text-[10px] font-black uppercase tracking-widest text-orange-500">
                    To
                  </span>
                  <Input
                    placeholder="recipient@example.com"
                    className="pl-10 border-0 border-b border-slate-500/10 rounded-none bg-transparent h-14 focus:ring-0 focus:border-orange-500/50 transition-all font-bold"
                  />
                  <button className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-orange-500">
                    Cc/Bcc
                  </button>
                </div>
                <div className="relative group">
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 text-[10px] font-black uppercase tracking-widest text-orange-500">
                    Subject
                  </span>
                  <Input
                    placeholder="Briefly describe the topic"
                    className="pl-20 border-0 border-b border-slate-500/10 rounded-none bg-transparent h-14 focus:ring-0 focus:border-orange-500/80 transition-all font-black"
                  />
                </div>
                <div className="pt-4">
                  <textarea
                    placeholder="Write your brilliant thoughts here..."
                    className="w-full bg-transparent border-none outline-none resize-none min-h-[300px] premium-scrollbar text-lg leading-relaxed placeholder:opacity-30 placeholder:font-black transition-all"
                  />
                </div>
              </div>

              {/* Toolbar mockup */}
              <div className="flex items-center justify-between pt-8 border-t border-slate-500/10">
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-xl text-slate-400 transition-all hover:bg-orange-500 hover:text-white"
                  >
                    <Plus className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-xl text-slate-400 transition-all hover:bg-orange-500 hover:text-white"
                  >
                    <Tag className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-xl text-slate-400 transition-all hover:bg-orange-500 hover:text-white"
                  >
                    <AlertCircle className="w-5 h-5" />
                  </Button>
                </div>
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    onClick={() => setIsComposeOpen(false)}
                    className="rounded-2xl font-black text-xs uppercase tracking-widest text-slate-400 hover:text-slate-900 dark:hover:text-white px-6"
                  >
                    Discard
                  </Button>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-black shadow-2xl shadow-orange-500/30 gap-3 transition-all active:scale-95 text-sm uppercase tracking-widest">
                    Send Email
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
