import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Calendar as CalendarIcon,
  Search,
  MoreVertical,
  Clock,
  MapPin,
  X,
  Trash2,
  Edit2,
  Share2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addDays,
  eachDayOfInterval,
} from "date-fns";
import Layout from "~/components/Layout";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "~/components/ui/dialog";
import type { RootState } from "~/store/store";
import { cn } from "~/lib/utils";

// --- Types ---
interface Event {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  location: string;
  category: "Meeting" | "Design" | "Development" | "Personal";
  description: string;
  attendees: string[];
}

const CATEGORIES = [
  {
    id: "Meeting",
    label: "Meetings",
    color: "bg-orange-500",
    text: "text-orange-500",
  },
  {
    id: "Design",
    label: "Design",
    color: "bg-cyan-500",
    text: "text-cyan-500",
  },
  {
    id: "Development",
    label: "Development",
    color: "bg-purple-500",
    text: "text-purple-500",
  },
  {
    id: "Personal",
    label: "Personal",
    color: "bg-emerald-500",
    text: "text-emerald-500",
  },
];

const MOCK_EVENTS: Event[] = [
  {
    id: "1",
    title: "Project Kickoff",
    date: new Date(),
    startTime: "10:00 AM",
    endTime: "11:30 AM",
    location: "Zoom",
    category: "Meeting",
    description: "Launch of the new premium dashboard.",
    attendees: [
      "https://i.pravatar.cc/150?u=1",
      "https://i.pravatar.cc/150?u=2",
    ],
  },
  {
    id: "2",
    title: "Portfolio Design Review",
    date: addDays(new Date(), 2),
    startTime: "02:00 PM",
    endTime: "03:30 PM",
    location: "Design Studio",
    category: "Design",
    description: "Reviewing the current state of the design system.",
    attendees: ["https://i.pravatar.cc/150?u=3"],
  },
];

export default function Calendar() {
  const isDark = useSelector((state: RootState) => state.dark.isDark);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeView, setActiveView] = useState("Month");
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeCategories, setActiveCategories] = useState<string[]>(
    CATEGORIES.map((c) => c.id),
  );

  const [newEvent, setNewEvent] = useState({
    title: "",
    date: format(new Date(), "yyyy-MM-dd"),
    startTime: "10:00",
    endTime: "11:00",
    location: "",
    category: "Meeting",
    description: "",
  });

  const selectedEvent = useMemo(
    () => MOCK_EVENTS.find((e) => e.id === selectedEventId),
    [selectedEventId],
  );

  const selectedCategory = useMemo(
    () => CATEGORIES.find((c) => c.id === selectedEvent?.category),
    [selectedEvent],
  );

  const textPrimary = isDark ? "text-white" : "text-slate-900";
  const textMuted = isDark ? "text-slate-400" : "text-slate-500";
  const borderMuted = isDark ? "border-slate-800" : "border-slate-200";

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const toggleCategory = (id: string) => {
    setActiveCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c != id) : [...prev, id],
    );
  };

  const miniCalendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentDate);
    const startDate = startOfWeek(monthStart);
    const endDate = addDays(startDate, 34); // Show 5 weeks

    return eachDayOfInterval({ start: startDate, end: endDate }).map((day) => {
      const isCurMonth = isSameMonth(day, monthStart);
      const isSelected = isSameDay(day, selectedDate);
      const isToday = isSameDay(day, new Date());

      return (
        <button
          key={day.toString()}
          onClick={() => setSelectedDate(day)}
          className={cn(
            "aspect-square rounded-lg flex items-center justify-center text-[10px] font-bold transition-all",
            isSelected
              ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30 scale-110 z-10"
              : isToday
                ? "bg-orange-500/10 text-orange-500"
                : isCurMonth
                  ? textPrimary
                  : "text-slate-500 opacity-30",
            !isSelected && "hover:bg-slate-500/10",
          )}
        >
          {format(day, "d")}
        </button>
      );
    });
  }, [currentDate, selectedDate, textPrimary]);

  const gridDays = useMemo(() => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    return eachDayOfInterval({ start: startDate, end: endDate }).map(
      (day, i) => {
        const isCurrentMonth = isSameMonth(day, monthStart);
        const isToday = isSameDay(day, new Date());
        const isSelected = isSameDay(day, selectedDate);
        const dayEvents = MOCK_EVENTS.filter(
          (e) =>
            isSameDay(e.date, day) && activeCategories.includes(e.category),
        );

        return (
          <div
            key={day.toString()}
            onClick={() => setSelectedDate(day)}
            className={cn(
              "min-h-[120px] p-2 border-r border-b transition-all duration-300 relative group cursor-pointer",
              borderMuted,
              !isCurrentMonth &&
                (isDark ? "bg-slate-950/40" : "bg-slate-50/50"),
              isCurrentMonth &&
                (isDark ? "hover:bg-slate-900/50" : "hover:bg-slate-50/50"),
            )}
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className={cn(
                  "w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black transition-all",
                  isToday
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                    : !isCurrentMonth
                      ? "opacity-20"
                      : textPrimary,
                  isSelected && !isToday && "ring-2 ring-orange-500/50",
                )}
              >
                {format(day, "d")}
              </span>
            </div>

            <div className="space-y-1">
              {dayEvents.map((event) => (
                <div
                  key={event.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedEventId(event.id);
                  }}
                  className={cn(
                    "text-[10px] px-2 py-1 rounded-md font-bold transition-all flex items-center gap-1.5 min-w-0",
                    isDark
                      ? "bg-slate-800 text-slate-300 border border-slate-700 hover:border-orange-500/50"
                      : "bg-white text-slate-700 border border-slate-100 shadow-sm hover:shadow-md",
                  )}
                >
                  <div
                    className={cn(
                      "w-1.5 h-1.5 rounded-full shrink-0",
                      CATEGORIES.find((c) => c.id === event.category)?.color,
                    )}
                  />
                  <span className="truncate">{event.title}</span>
                </div>
              ))}
            </div>

            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              className="absolute bottom-2 right-2 w-6 h-6 rounded-lg bg-orange-500 text-white items-center justify-center opacity-0 group-hover:opacity-100 transition-all flex shadow-lg shadow-orange-500/20"
            >
              <Plus className="w-3 h-3" />
            </motion.button>
          </div>
        );
      },
    );
  }, [
    currentDate,
    selectedDate,
    isDark,
    textPrimary,
    textMuted,
    borderMuted,
    activeCategories,
  ]);

  return (
    <Layout isFullscreen>
      <div
        className={cn(
          "flex h-full w-full overflow-hidden transition-all duration-300",
          isDark ? "bg-slate-950" : "bg-white",
        )}
      >
        {/* --- Left Sidebar --- */}
        <aside
          className={cn(
            "w-80 flex flex-col border-r h-full transition-all duration-300 relative z-20 shadow-2xl shadow-black/5 backdrop-blur-xl",
            borderMuted,
            isDark ? "bg-slate-950/60" : "bg-white/80",
          )}
        >
          <div className="p-6 flex flex-col gap-6 overflow-y-auto premium-scrollbar">
            {/* Create Button */}
            <div className="mb-2">
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-black text-sm shadow-lg shadow-orange-500/20 gap-2 transition-all active:scale-95"
              >
                <Plus className="w-5 h-5" />
                Create New Event
              </Button>
            </div>

            {/* Mini Calendar Holder - Simplified for now */}
            <div className="p-4 rounded-3xl bg-slate-500/5 border border-dashed border-slate-500/20">
              <div className="flex items-center justify-between mb-4 px-1">
                <h3
                  className={cn(
                    "text-xs font-black uppercase tracking-widest",
                    textPrimary,
                  )}
                >
                  {format(currentDate, "MMMM yyyy")}
                </h3>
                <div className="flex gap-1">
                  <button
                    onClick={prevMonth}
                    className="p-1.5 hover:bg-orange-500/10 rounded-lg text-orange-500 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextMonth}
                    className="p-1.5 hover:bg-orange-500/10 rounded-lg text-orange-500 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center">
                {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
                  <span
                    key={d}
                    className="text-[10px] font-bold text-slate-500 pb-1"
                  >
                    {d}
                  </span>
                ))}
                {miniCalendarDays}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="mt-2">
              <div className="flex items-center justify-between mb-4">
                <h3
                  className={cn(
                    "text-xs font-black uppercase tracking-widest",
                    textPrimary,
                  )}
                >
                  Upcoming Events
                </h3>
                <button className="text-[10px] font-bold text-orange-500 hover:underline">
                  View All
                </button>
              </div>
              <div className="space-y-3">
                {MOCK_EVENTS.map((event) => (
                  <motion.div
                    key={event.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedEventId(event.id)}
                    className={cn(
                      "p-4 rounded-2xl border transition-all duration-300 cursor-pointer group",
                      isDark
                        ? "bg-slate-900 border-slate-800 hover:border-orange-500/50"
                        : "bg-white border-slate-100 hover:shadow-xl hover:shadow-black/5",
                    )}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={cn(
                          "w-2 h-2 rounded-full",
                          CATEGORIES.find((c) => c.id === event.category)
                            ?.color,
                        )}
                      />
                      <span
                        className={cn(
                          "text-[10px] font-bold uppercase tracking-widest opacity-60",
                          textMuted,
                        )}
                      >
                        {event.startTime} - {event.endTime}
                      </span>
                    </div>
                    <h4
                      className={cn(
                        "text-sm font-black mb-1 group-hover:text-orange-500 transition-colors",
                        textPrimary,
                      )}
                    >
                      {event.title}
                    </h4>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1.5 opacity-60">
                        <MapPin className={cn("w-3 h-3", textMuted)} />
                        <span
                          className={cn("text-[11px] font-medium", textMuted)}
                        >
                          {event.location}
                        </span>
                      </div>
                      <div className="flex -space-x-1.5">
                        {event.attendees.map((avatar, idx) => (
                          <img
                            key={idx}
                            src={avatar}
                            className="w-5 h-5 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover"
                            alt="attendee"
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="mt-4 pb-10">
              <h3
                className={cn(
                  "text-xs font-black uppercase tracking-widest mb-4",
                  textPrimary,
                )}
              >
                Categories
              </h3>
              <div className="space-y-4">
                {CATEGORIES.map((cat) => (
                  <label
                    key={cat.id}
                    className="flex items-center justify-between cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn("w-2 h-2 rounded-full", cat.color)} />
                      <span
                        className={cn(
                          "text-xs font-bold transition-colors group-hover:text-orange-500",
                          textMuted,
                        )}
                      >
                        {cat.label}
                      </span>
                    </div>
                    <Checkbox
                      id={cat.id}
                      checked={activeCategories.includes(cat.id)}
                      onCheckedChange={() => toggleCategory(cat.id)}
                      className={cn(
                        "transition-all duration-300 rounded-md border-2",
                        activeCategories.includes(cat.id)
                          ? "bg-orange-500 border-orange-500 text-white"
                          : "border-slate-300 dark:border-slate-800",
                      )}
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* --- Main Content --- */}
        <main className="flex-1 flex flex-col h-full overflow-hidden">
          {/* Header */}
          <header
            className={cn(
              "p-6 flex items-center justify-between border-b transition-all duration-300 sticky top-0 z-10 backdrop-blur-md",
              borderMuted,
              isDark ? "bg-slate-950/40" : "bg-white/60",
            )}
          >
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
                  <CalendarIcon className="w-5 h-5" />
                </div>
                <div>
                  <h2
                    className={cn(
                      "text-xl font-black tracking-tight",
                      textPrimary,
                    )}
                  >
                    {format(currentDate, "MMMM yyyy")}
                  </h2>
                  <p
                    className={cn(
                      "text-[10px] font-bold uppercase tracking-widest opacity-60",
                      textMuted,
                    )}
                  >
                    Personal Dashboard
                  </p>
                </div>
              </div>

              <div className="flex items-center bg-slate-500/5 p-1 rounded-xl border border-slate-500/10">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentDate(new Date())}
                  className={cn(
                    "h-8 px-4 rounded-lg font-bold text-xs transition-all",
                    textPrimary,
                  )}
                >
                  Today
                </Button>
                <div className="w-px h-4 bg-slate-500/20 mx-1" />
                <button
                  onClick={prevMonth}
                  className="p-1.5 hover:bg-orange-500/10 rounded-lg text-orange-500 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextMonth}
                  className="p-1.5 hover:bg-orange-500/10 rounded-lg text-orange-500 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center bg-slate-500/5 p-1 rounded-xl border border-slate-500/10 gap-2">
                {["Month", "Week", "Day", "List"].map((view) => (
                  <Button
                    key={view}
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveView(view)}
                    className={cn(
                      "h-8 px-4 rounded-lg font-black text-[10px] uppercase tracking-wider transition-all duration-300",
                      view === activeView
                        ? "bg-orange-500 shadow-lg shadow-orange-500/20 !text-white"
                        : cn(textMuted, "hover:bg-orange-500 hover:text-white focus:text-white"),
                    )}
                  >
                    {view}
                  </Button>
                ))}
              </div>
              <div className="w-px h-6 bg-slate-500/20 mx-2" />
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl text-slate-400 hover:bg-orange-500 hover:text-white transition-all duration-300"
              >
                <Search className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl text-slate-400 hover:bg-orange-500 hover:text-white transition-all duration-300"
              >
                <MoreVertical className="w-5 h-5" />
              </Button>
            </div>
          </header>

          {/* Calendar Grid */}
          <div className="flex-1 overflow-auto premium-scrollbar bg-transparent">
            <div className="min-w-[800px] h-full flex flex-col">
              {/* Day Headers */}
              <div
                className={cn(
                  "grid grid-cols-7 border-b transition-colors",
                  borderMuted,
                )}
              >
                {[
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ].map((day) => (
                  <div
                    key={day}
                    className={cn(
                      "py-3 text-center text-[10px] font-black uppercase tracking-[0.2em]",
                      textMuted,
                    )}
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Grid Cells */}
              <div className="flex-1 grid grid-cols-7 auto-rows-fr">
                {gridDays}
              </div>
            </div>
          </div>
        </main>

        {/* --- Event Detail Modal/Overlay --- */}
        <AnimatePresence>
          {selectedEventId && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                onClick={() => setSelectedEventId(null)}
                className="fixed inset-0 bg-slate-950/20 backdrop-blur-sm z-[100]"
              />

              {/* Sidebar Modal */}
              <motion.aside
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ duration: 0.1, ease: "linear" }}
                className={cn(
                  "fixed inset-y-0 right-0 w-96 flex flex-col transition-all duration-300 z-[101] shadow-[-20px_0_50px_rgba(0,0,0,0.1)] backdrop-blur-2xl border-l",
                  borderMuted,
                  isDark ? "bg-slate-900/90" : "bg-white/95",
                )}
              >
                {selectedEvent && (
                  <div className="flex flex-col h-full overflow-y-auto premium-scrollbar p-8">
                    {/* Header Actions */}
                    <div className="flex items-center justify-between mb-8">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedEventId(null)}
                        className="rounded-xl text-slate-400 hover:bg-orange-500 hover:text-white transition-all"
                      >
                        <X className="w-5 h-5" />
                      </Button>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-xl text-slate-400 hover:bg-orange-500 hover:text-white transition-all"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-xl text-slate-400 hover:bg-red-500 hover:text-white transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-xl text-slate-400 hover:bg-orange-500 hover:text-white transition-all"
                        >
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-6">
                      <div>
                        <Badge
                          className={cn(
                            "mb-4 px-3 py-1 rounded-lg font-black text-[10px] uppercase tracking-widest border-0 text-white",
                            selectedCategory?.color,
                          )}
                        >
                          {selectedEvent.category}
                        </Badge>
                        <h2
                          className={cn(
                            "text-3xl font-black leading-tight",
                            textPrimary,
                          )}
                        >
                          {selectedEvent.title}
                        </h2>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-4 group">
                          <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all">
                            <Clock className="w-5 h-5" />
                          </div>
                          <div>
                            <p className={cn("text-sm font-bold", textPrimary)}>
                              {format(selectedEvent.date, "EEEE, MMMM d")}
                            </p>
                            <p
                              className={cn(
                                "text-[11px] font-bold opacity-50",
                                textMuted,
                              )}
                            >
                              {selectedEvent.startTime} -{" "}
                              {selectedEvent.endTime}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 group">
                          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-500 group-hover:bg-cyan-500 group-hover:text-white transition-all">
                            <MapPin className="w-5 h-5" />
                          </div>
                          <div>
                            <p className={cn("text-sm font-bold", textPrimary)}>
                              {selectedEvent.location}
                            </p>
                            <p
                              className={cn(
                                "text-[11px] font-bold opacity-50",
                                textMuted,
                              )}
                            >
                              Remote / Physical Studio
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-slate-500/10">
                        <h3
                          className={cn(
                            "text-xs font-black uppercase tracking-widest mb-4",
                            textPrimary,
                          )}
                        >
                          Description
                        </h3>
                        <p
                          className={cn(
                            "text-sm font-medium leading-relaxed opacity-70",
                            textMuted,
                          )}
                        >
                          {selectedEvent.description}
                        </p>
                      </div>

                      <div className="pt-6 border-t border-slate-500/10">
                        <div className="flex items-center justify-between mb-4">
                          <h3
                            className={cn(
                              "text-xs font-black uppercase tracking-widest",
                              textPrimary,
                            )}
                          >
                            Attendees
                          </h3>
                          <Badge
                            variant="outline"
                            className={cn(
                              "text-[10px] font-bold border-slate-500/10",
                              textMuted,
                            )}
                          >
                            {selectedEvent.attendees.length} Members
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {selectedEvent.attendees.map((avatar, idx) => (
                            <motion.img
                              key={idx}
                              whileHover={{ scale: 1.2, zIndex: 10 }}
                              src={avatar}
                              className="w-10 h-10 rounded-2xl object-cover cursor-pointer shadow-md"
                              alt="attendee"
                            />
                          ))}
                          <button className="w-10 h-10 rounded-2xl bg-slate-500/5 border-2 border-dashed border-slate-500/20 flex items-center justify-center text-slate-400 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all">
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-auto pt-8">
                      <Button className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-black text-sm gap-2 shadow-lg shadow-orange-500/20 transition-all active:scale-95">
                        View Activity Logs
                      </Button>
                    </div>
                  </div>
                )}
              </motion.aside>
            </>
          )}
        </AnimatePresence>
        {/* --- Create Event Modal --- */}
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogContent
            className={cn(
              "sm:max-w-[500px] border-none shadow-2xl backdrop-blur-2xl p-0 overflow-hidden rounded-[2rem]",
              isDark ? "bg-slate-900/90" : "bg-white/95",
            )}
          >
            <DialogHeader className="p-8 pb-0">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
                  <Plus className="w-6 h-6" />
                </div>
                <div>
                  <DialogTitle
                    className={cn(
                      "text-2xl font-black tracking-tight",
                      textPrimary,
                    )}
                  >
                    Create New Event
                  </DialogTitle>
                  <p
                    className={cn(
                      "text-[10px] font-bold uppercase tracking-widest opacity-60",
                      textMuted,
                    )}
                  >
                    Schedule a new activity
                  </p>
                </div>
              </div>
            </DialogHeader>

            <div className="pt-8 px-8 space-y-6">
              <div className="space-y-2">
                <Label
                  className={cn(
                    "text-[10px] font-black uppercase tracking-widest ml-1",
                    textMuted,
                  )}
                >
                  Event Title
                </Label>
                <Input
                  placeholder="e.g. Weekly Sync"
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                  className="rounded-xl h-12 bg-slate-500/5 focus:bg-transparent transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    className={cn(
                      "text-[10px] font-black uppercase tracking-widest ml-1",
                      textMuted,
                    )}
                  >
                    Date
                  </Label>
                  <Input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, date: e.target.value })
                    }
                    className={cn(
                      "rounded-xl h-12 bg-slate-500/5 focus:bg-transparent transition-all",
                      isDark ? "[color-scheme:dark]" : ""
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    className={cn(
                      "text-[10px] font-black uppercase tracking-widest ml-1",
                      textMuted,
                    )}
                  >
                    Category
                  </Label>
                  <Select
                    value={newEvent.category}
                    onValueChange={(val) =>
                      setNewEvent({ ...newEvent, category: val as any })
                    }
                  >
                    <SelectTrigger className="!h-12 w-full rounded-xl bg-slate-500/5 transition-all focus:bg-transparent">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          <div className="flex items-center gap-2">
                            <div
                              className={cn("w-2 h-2 rounded-full", cat.color)}
                            />
                            {cat.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    className={cn(
                      "text-[10px] font-black uppercase tracking-widest ml-1",
                      textMuted,
                    )}
                  >
                    Start Time
                  </Label>
                  <Input
                    type="time"
                    value={newEvent.startTime}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, startTime: e.target.value })
                    }
                    className={cn(
                      "rounded-xl h-12 bg-slate-500/5 focus:bg-transparent transition-all",
                      isDark ? "[color-scheme:dark]" : ""
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    className={cn(
                      "text-[10px] font-black uppercase tracking-widest ml-1",
                      textMuted,
                    )}
                  >
                    End Time
                  </Label>
                  <Input
                    type="time"
                    value={newEvent.endTime}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, endTime: e.target.value })
                    }
                    className={cn(
                      "rounded-xl h-12 bg-slate-500/5 focus:bg-transparent transition-all",
                      isDark ? "[color-scheme:dark]" : ""
                    )}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  className={cn(
                    "text-[10px] font-black uppercase tracking-widest ml-1",
                    textMuted,
                  )}
                >
                  Location
                </Label>
                <Input
                  placeholder="Where will it take place?"
                  value={newEvent.location}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, location: e.target.value })
                  }
                  className="rounded-xl h-12 bg-slate-500/5 focus:bg-transparent transition-all"
                />
              </div>

              <div className="space-y-2">
                <Label
                  className={cn(
                    "text-[10px] font-black uppercase tracking-widest ml-1",
                    textMuted,
                  )}
                >
                  Description
                </Label>
                <Textarea
                  placeholder="Tell us more about the event..."
                  value={newEvent.description}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, description: e.target.value })
                  }
                  className="rounded-xl min-h-24 bg-slate-500/5 focus:bg-transparent transition-all resize-none"
                />
              </div>
            </div>

            <DialogFooter className="p-8 bg-slate-500/5">
              <Button
                variant="ghost"
                onClick={() => setIsCreateModalOpen(false)}
                className={cn(
                  "rounded-xl font-bold transition-all",
                  isDark ? "text-slate-400 hover:text-white hover:bg-slate-800" : "text-slate-600 hover:text-slate-900"
                )}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  console.log("Saving Event:", newEvent);
                  setIsCreateModalOpen(false);
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-8 font-black shadow-lg shadow-orange-500/20 transition-all active:scale-95"
              >
                Create Event
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
