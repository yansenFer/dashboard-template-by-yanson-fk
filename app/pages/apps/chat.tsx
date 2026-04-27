import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Search,
  MoreVertical,
  Phone,
  Video,
  Info,
  Send,
  Paperclip,
  Smile,
  Image as ImageIcon,
  Check,
  CheckCheck,
  Circle,
  Hash,
  Star,
  Plus,
  ArrowLeft,
  Settings,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "~/components/Layout";
import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Badge } from "~/components/ui/badge";
import type { RootState } from "~/store/store";
import { cn } from "~/lib/utils";

// --- Types ---
type Status = "online" | "offline" | "away" | "busy";

interface Member {
  id: string;
  name: string;
  avatar: string;
  status: Status;
  role: string;
  lastSeen?: string;
}

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  status: "sent" | "delivered" | "read";
  type: "text" | "image";
  imageUrl?: string;
}

interface Chat {
  id: string;
  contact: Member;
  messages: Message[];
  unreadCount: number;
}

// --- Mock Data ---
const CONTACTS: Member[] = [
  {
    id: "1",
    name: "Huma Therman",
    avatar: "https://i.pravatar.cc/150?u=huma",
    status: "online",
    role: "UI Designer",
    lastSeen: "Active now",
  },
  {
    id: "2",
    name: "Morgan Freeman",
    avatar: "https://i.pravatar.cc/150?u=morgan",
    status: "offline",
    role: "Content Manager",
    lastSeen: "2 hours ago",
  },
  {
    id: "3",
    name: "Charlie Chaplin",
    avatar: "https://i.pravatar.cc/150?u=charlie",
    status: "online",
    role: "React Developer",
    lastSeen: "Active now",
  },
  {
    id: "4",
    name: "Winston Churchill",
    avatar: "https://i.pravatar.cc/150?u=winston",
    status: "away",
    role: "Project Lead",
    lastSeen: "10 mins ago",
  },
  {
    id: "5",
    name: "Boss Baby",
    avatar: "https://i.pravatar.cc/150?u=boss",
    status: "busy",
    role: "Founding Partner",
    lastSeen: "Active now",
  },
  {
    id: "6",
    name: "Hencework",
    avatar: "https://i.pravatar.cc/150?u=hence",
    status: "online",
    role: "Creative Director",
    lastSeen: "Active now",
  },
];

const INITIAL_CHATS: Chat[] = [
  {
    id: "c1",
    contact: CONTACTS[0],
    unreadCount: 2,
    messages: [
      {
        id: "m1",
        senderId: "1",
        content: "Hey! How's the project going?",
        timestamp: "10:00 AM",
        status: "read",
        type: "text",
      },
      {
        id: "m2",
        senderId: "me",
        content: "It's going great, just finished the designs.",
        timestamp: "10:05 AM",
        status: "read",
        type: "text",
      },
      {
        id: "m3",
        senderId: "1",
        content: "That's awesome! Can you share a preview?",
        timestamp: "10:10 AM",
        status: "read",
        type: "text",
      },
      {
        id: "m4",
        senderId: "me",
        content: "Sure, here's a sneak peek of the dashboard.",
        timestamp: "10:12 AM",
        status: "read",
        type: "text",
      },
      {
        id: "m5",
        senderId: "me",
        content: "Sneak peek",
        timestamp: "10:12 AM",
        status: "read",
        type: "image",
        imageUrl: "https://picsum.photos/800/600",
      },
      {
        id: "m6",
        senderId: "1",
        content: "Looks stunning! The premium feel is real.",
        timestamp: "10:15 AM",
        status: "read",
        type: "text",
      },
    ],
  },
  {
    id: "c2",
    contact: CONTACTS[1],
    unreadCount: 0,
    messages: [
      {
        id: "m1",
        senderId: "2",
        content: "Check the documents I sent.",
        timestamp: "Yesterday",
        status: "read",
        type: "text",
      },
    ],
  },
];

export default function Chat() {
  const isDark = useSelector((state: RootState) => state.dark.isDark);
  const [selectedChatId, setSelectedChatId] = useState(INITIAL_CHATS[0].id);
  const [showDetail, setShowDetail] = useState(true);
  const [inputText, setInputText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeChat =
    INITIAL_CHATS.find((c) => c.id === selectedChatId) || INITIAL_CHATS[0];
  const textPrimary = isDark ? "text-white" : "text-slate-900";
  const textMuted = isDark ? "text-slate-400" : "text-slate-500";
  const borderMuted = isDark ? "border-slate-800" : "border-slate-200";

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [selectedChatId]);

  return (
    <Layout isFullscreen>
      <div
        className={cn(
          "flex h-full w-full overflow-hidden transition-all duration-300",
          isDark ? "bg-slate-950/20 shadow-black/40" : "bg-white",
        )}
      >
        {/* --- Left Sidebar: Contacts --- */}
        <div
          className={cn(
            "w-80 flex flex-col border-r h-full overflow-hidden transition-all duration-300",
            borderMuted,
            isDark ? "bg-slate-950/80" : "bg-white",
          )}
        >
          {/* Sidebar Header */}
          <div className="p-6 pb-2">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <h1
                  className={cn(
                    "text-2xl font-black tracking-tight",
                    textPrimary,
                  )}
                >
                  Chat
                </h1>
                <Badge
                  variant="secondary"
                  className="bg-orange-500/10 text-orange-500 border-none px-2 py-0 text-[10px]"
                >
                  12
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300 group"
              >
                <Settings className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
              </Button>
            </div>
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
              <Input
                placeholder="Search conversations..."
                className={cn(
                  "pl-10 h-11 border transition-all duration-300 shadow-sm focus-visible:ring-1 focus-visible:ring-orange-500/50 rounded-xl",
                  isDark
                    ? "bg-slate-900 border-slate-800"
                    : "bg-white border-slate-200 focus:bg-white",
                )}
              />
            </div>
          </div>

          {/* Frequent Contacts */}
          <div className="px-6 py-4">
            <h2
              className={cn(
                "text-[10px] font-black uppercase tracking-widest mb-4",
                textMuted,
              )}
            >
              Frequent Contacts
            </h2>
            <div className="flex items-center gap-4 overflow-x-auto py-2 premium-scrollbar">
              <button
                className={cn(
                  "flex-shrink-0 w-11 h-11 rounded-full border-2 border-dashed flex items-center justify-center transition-all duration-300 hover:border-orange-500 hover:text-orange-500",
                  isDark
                    ? "border-slate-800 text-slate-600"
                    : "border-slate-300 text-slate-400",
                )}
              >
                <Plus className="w-5 h-5" />
              </button>
              {CONTACTS.map((c) => (
                <div
                  key={c.id}
                  className="relative flex-shrink-0 cursor-pointer hover:scale-105 transition-transform"
                >
                  <img
                    src={c.avatar}
                    alt={c.name}
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-transparent hover:ring-orange-500 p-0.5"
                  />
                  <span
                    className={cn(
                      "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 ring-1 ring-black/5",
                      isDark ? "border-slate-950" : "border-white",
                      c.status === "online"
                        ? "bg-emerald-500"
                        : c.status === "away"
                          ? "bg-amber-500"
                          : "bg-slate-400",
                    )}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto px-3 space-y-1 py-4 premium-scrollbar">
            {INITIAL_CHATS.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChatId(chat.id)}
                className={cn(
                  "w-full p-3 rounded-2xl cursor-pointer flex items-center gap-4 transition-all duration-300 group relative",
                  selectedChatId === chat.id
                    ? "bg-orange-500 shadow-lg shadow-orange-500/20"
                    : isDark
                      ? "hover:bg-slate-900"
                      : "hover:bg-white hover:shadow-md",
                )}
              >
                <div className="relative">
                  <img
                    src={chat.contact.avatar}
                    alt={chat.contact.name}
                    className="w-12 h-12 rounded-full object-cover shadow-sm"
                  />
                  <span
                    className={cn(
                      "absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2",
                      selectedChatId === chat.id
                        ? "border-orange-500 bg-white"
                        : isDark
                          ? "border-slate-900 bg-emerald-500"
                          : "border-white bg-emerald-500",
                    )}
                  />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <h3
                      className={cn(
                        "text-sm font-bold truncate",
                        selectedChatId === chat.id ? "text-white" : textPrimary,
                      )}
                    >
                      {chat.contact.name}
                    </h3>
                    <span
                      className={cn(
                        "text-[10px] font-medium",
                        selectedChatId === chat.id
                          ? "text-orange-100"
                          : textMuted,
                      )}
                    >
                      {chat.messages[chat.messages.length - 1].timestamp}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <p
                      className={cn(
                        "text-xs truncate",
                        selectedChatId === chat.id
                          ? "text-orange-50/80"
                          : textMuted,
                      )}
                    >
                      {chat.messages[chat.messages.length - 1].content}
                    </p>
                    {chat.unreadCount > 0 && selectedChatId !== chat.id && (
                      <span className="flex-shrink-0 bg-orange-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* --- Middle: Chat Window --- */}
        <div className="flex-1 flex flex-col h-full bg-transparent overflow-hidden">
          {/* Chat Header */}
          <div
            className={cn(
              "p-6 flex items-center justify-between border-b transition-all duration-300",
              borderMuted,
            )}
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={activeChat.contact.avatar}
                  alt={activeChat.contact.name}
                  className="w-11 h-11 rounded-full object-cover shadow-md"
                />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-950" />
              </div>
              <div>
                <h2
                  className={cn(
                    "text-base font-bold tracking-tight",
                    textPrimary,
                  )}
                >
                  {activeChat.contact.name}
                </h2>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-semibold text-emerald-500 animate-pulse uppercase tracking-wider">
                    Online
                  </span>
                  <span className={cn("w-1 h-1 rounded-full", textMuted)} />
                  <p className={cn("text-[11px] font-medium", textMuted)}>
                    Typing...
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl text-orange-500 hover:bg-orange-500/10 hover:text-white border-transparent hover:border-transparent ring-0 outline-none"
              >
                <Phone className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl text-orange-500 hover:bg-orange-500/10 hover:text-white border-transparent hover:border-transparent ring-0 outline-none"
              >
                <Video className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowDetail(!showDetail)}
                className={cn(
                  "rounded-xl transition-all border-transparent hover:border-transparent ring-0 outline-none",
                  showDetail
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                    : "hover:bg-orange-500/10 hover:text-white text-orange-500",
                )}
              >
                <Info className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl text-orange-500 hover:bg-orange-500/10 hover:text-white border-transparent hover:border-transparent ring-0 outline-none"
              >
                <MoreVertical className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Messages Area */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col premium-scrollbar"
          >
            <div className="flex justify-center my-4">
              <span
                className={cn(
                  "px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest",
                  isDark
                    ? "bg-slate-900 text-slate-500"
                    : "bg-slate-100 text-slate-400",
                )}
              >
                Today, Oct 17
              </span>
            </div>

            <AnimatePresence>
              {activeChat.messages.map((m) => {
                const isMe = m.senderId === "me";
                return (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={cn(
                      "flex items-end gap-3 max-w-[80%]",
                      isMe ? "self-end flex-row-reverse" : "self-start",
                    )}
                  >
                    {!isMe && (
                      <img
                        src={activeChat.contact.avatar}
                        className="w-8 h-8 rounded-full object-cover mb-1"
                      />
                    )}
                    <div
                      className={cn(
                        "flex flex-col gap-1.5 shadow-md transition-all duration-300",
                        m.type === "image"
                          ? "p-0 rounded-[22px] rounded-br-[4px] overflow-hidden"
                          : "px-4 py-3",
                        m.type !== "image" && isMe
                          ? "bg-orange-500 text-white rounded-[22px] rounded-br-[4px] shadow-orange-500/10"
                          : m.type !== "image" && !isMe
                            ? isDark
                              ? "bg-slate-900 text-slate-200 rounded-[22px] rounded-bl-[4px] border border-slate-800"
                              : "bg-white text-slate-700 rounded-[22px] rounded-bl-[4px] border border-slate-100 shadow-slate-100"
                            : "",
                      )}
                    >
                      {m.type === "image" ? (
                        <div className="relative group w-full h-full">
                          <img
                            src={m.imageUrl}
                            className="max-w-xs object-cover hover:scale-105 transition-transform duration-500 block"
                          />
                          <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent flex justify-between items-end">
                            <span className="text-[10px] text-white/80 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                              shared_design_v2.png (2.4 MB)
                            </span>
                            <div className="flex items-center gap-1 text-white/90">
                              <span className="text-[9px] font-bold">
                                {m.timestamp}
                              </span>
                              {isMe &&
                                (m.status === "read" ? (
                                  <CheckCheck className="w-3.5 h-3.5 text-white" />
                                ) : (
                                  <Check className="w-3.5 h-3.5" />
                                ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="text-sm font-medium leading-relaxed">
                            {m.content}
                          </p>
                          <div
                            className={cn(
                              "flex items-center gap-1 self-end mt-0.5",
                              isMe ? "text-orange-100/60" : "text-slate-500",
                            )}
                          >
                            <span className="text-[9px] font-bold">
                              {m.timestamp}
                            </span>
                            {isMe &&
                              (m.status === "read" ? (
                                <CheckCheck className="w-3.5 h-3.5 text-white" />
                              ) : (
                                <Check className="w-3.5 h-3.5" />
                              ))}
                          </div>
                        </>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Chat Input Area */}
          <div className={cn("p-6 border-t transition-colors", borderMuted)}>
            <div
              className={cn(
                "p-2 rounded-[28px] border transition-all duration-300 flex items-center gap-2",
                isDark
                  ? "bg-slate-900 border-slate-800 focus-within:border-orange-500/50"
                  : "bg-slate-50 border-slate-100 focus-within:border-orange-500/30 focus-within:bg-white focus-within:shadow-xl",
              )}
            >
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "rounded-full hover:bg-orange-500 hover:text-white border-transparent hover:border-transparent ring-0 outline-none",
                  isDark ? "text-slate-400" : "text-slate-500",
                )}
              >
                <Plus className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "rounded-full hover:bg-orange-500 hover:text-white border-transparent hover:border-transparent ring-0 outline-none",
                  isDark ? "text-slate-400" : "text-slate-500",
                )}
              >
                <Paperclip className="w-5 h-5" />
              </Button>
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message here..."
                className={cn(
                  "flex-1 border-none bg-transparent shadow-none focus-visible:ring-0 h-11 text-sm font-medium placeholder:font-normal placeholder:opacity-70",
                  isDark
                    ? "text-slate-400 placeholder:text-slate-400"
                    : "text-slate-500 placeholder:text-slate-500",
                )}
              />
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "rounded-full hover:bg-orange-500 hover:text-white border-transparent hover:border-transparent ring-0 outline-none",
                  isDark ? "text-slate-400" : "text-slate-500",
                )}
              >
                <Smile className="w-5 h-5" />
              </Button>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full h-11 px-6 font-bold shadow-lg shadow-orange-500/20 flex items-center gap-2">
                  <span className="hidden sm:inline">Send</span>
                  <Send className="w-4 h-4" />
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* --- Right: Detail Panel --- */}
        <AnimatePresence>
          {showDetail && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 340, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={cn(
                "border-l h-full overflow-hidden flex flex-col",
                borderMuted,
                isDark ? "bg-slate-950/80" : "bg-white",
              )}
            >
              <div className="flex-1 overflow-y-auto premium-scrollbar">
                {/* Profile Header */}
                <div className="flex flex-col items-center p-8 text-center border-b border-dashed border-slate-800/20">
                  <div className="relative mb-6">
                    <img
                      src={activeChat.contact.avatar}
                      className="w-28 h-28 rounded-[40px] object-cover ring-4 ring-orange-500/20 shadow-2xl"
                    />
                    <span className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full border-4 border-white dark:border-slate-950 flex items-center justify-center">
                      <Circle className="w-3 h-3 text-white fill-white" />
                    </span>
                  </div>
                  <h2
                    className={cn(
                      "text-xl font-black tracking-tight",
                      textPrimary,
                    )}
                  >
                    {activeChat.contact.name}
                  </h2>
                  <p
                    className={cn(
                      "text-xs font-bold mt-1 uppercase tracking-widest",
                      textMuted,
                    )}
                  >
                    {activeChat.contact.role}
                  </p>

                  <div className="flex items-center gap-3 mt-6 w-full px-6">
                    <Button className="rounded-xl flex-1 h-11 bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20 border-none transition-all active:scale-95 font-bold">
                      Message
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className={cn(
                        "rounded-xl h-11 w-11 transition-all active:scale-95",
                        isDark
                          ? "border-slate-700 text-slate-300 hover:bg-orange-500/10 hover:text-orange-500 hover:border-orange-500"
                          : "border-slate-200 text-slate-600 hover:bg-orange-50 hover:text-orange-500 hover:border-orange-500",
                      )}
                    >
                      <Star className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                {/* About & Contact Info */}
                <div className="p-8 space-y-8">
                  <div>
                    <h3
                      className={cn(
                        "text-[10px] font-black uppercase tracking-widest mb-4",
                        textMuted,
                      )}
                    >
                      About
                    </h3>
                    <p
                      className={cn(
                        "text-xs leading-relaxed font-medium",
                        textMuted,
                      )}
                    >
                      Always busy with phone calls. A creative mind focused on
                      building premium experiences for global brands.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3
                      className={cn(
                        "text-[10px] font-black uppercase tracking-widest mb-2",
                        textMuted,
                      )}
                    >
                      Contact Details
                    </h3>
                    <div
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-2xl shadow-sm border transition-all duration-300 hover:scale-[1.02] cursor-pointer",
                        isDark
                          ? "bg-slate-900/50 border-slate-800"
                          : "bg-white border-slate-100",
                      )}
                    >
                      <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <p
                          className={cn(
                            "text-[10px] font-bold uppercase opacity-50",
                            textMuted,
                          )}
                        >
                          Phone
                        </p>
                        <p className={cn("text-xs font-black", textPrimary)}>
                          +62 812 3456 7890
                        </p>
                      </div>
                    </div>
                    <div
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-2xl shadow-sm border transition-all duration-300 hover:scale-[1.02] cursor-pointer",
                        isDark
                          ? "bg-slate-900/50 border-slate-800"
                          : "bg-white border-slate-100",
                      )}
                    >
                      <div className="w-8 h-8 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                        <Hash className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <p
                          className={cn(
                            "text-[10px] font-bold uppercase opacity-50",
                            textMuted,
                          )}
                        >
                          Email
                        </p>
                        <p className={cn("text-xs font-black", textPrimary)}>
                          huma.therman@example.com
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Shared Media Gallery */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3
                        className={cn(
                          "text-[10px] font-black uppercase tracking-widest",
                          textMuted,
                        )}
                      >
                        Shared Media
                      </h3>
                      <button className="text-[10px] font-bold text-orange-500 hover:underline">
                        View All
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div
                          key={i}
                          className="aspect-square rounded-xl bg-slate-200 dark:bg-slate-800 overflow-hidden cursor-pointer hover:opacity-80 transition-all duration-300"
                        >
                          <img
                            src={`https://picsum.photos/200?random=${i}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
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
