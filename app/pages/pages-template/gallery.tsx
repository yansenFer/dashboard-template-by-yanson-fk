import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  Eye,
  Film,
  FolderOpen,
  Image as ImageIcon,
  Info,
  LayoutGrid,
  Music,
  Search,
  Share2,
  Star,
  Tag,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Layout from "~/components/Layout";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import type { RootState } from "~/store/store";

// --- Types ---
type MediaCategory = "all" | "images" | "videos" | "audio";

interface MediaItem {
  id: string;
  src: string;
  title: string;
  category: "image" | "video" | "audio";
  date: string;
  group: string;
  size: string;
  dimensions: string;
  isFavorite: boolean;
  tags: string[];
}

// --- Mock Data ---
const mediaItems: MediaItem[] = [
  {
    id: "1",
    src: "https://picsum.photos/seed/dash-1/600/400",
    title: "Mountain Sunset Vista",
    category: "image",
    date: "Dec 15, 2024",
    group: "Recently Added",
    size: "2.4 MB",
    dimensions: "1920 × 1280",
    isFavorite: true,
    tags: ["Nature", "Landscape"],
  },
  {
    id: "2",
    src: "https://picsum.photos/seed/dash-2/600/800",
    title: "Urban Architecture",
    category: "image",
    date: "Dec 15, 2024",
    group: "Recently Added",
    size: "3.1 MB",
    dimensions: "1200 × 1600",
    isFavorite: false,
    tags: ["Architecture", "City"],
  },
  {
    id: "3",
    src: "https://picsum.photos/seed/dash-3/600/400",
    title: "Design Workspace",
    category: "image",
    date: "Dec 15, 2024",
    group: "Recently Added",
    size: "1.8 MB",
    dimensions: "1920 × 1280",
    isFavorite: false,
    tags: ["Workspace", "Tech"],
  },
  {
    id: "4",
    src: "https://picsum.photos/seed/dash-4/600/600",
    title: "Abstract Gradients",
    category: "image",
    date: "Dec 15, 2024",
    group: "Recently Added",
    size: "4.2 MB",
    dimensions: "1080 × 1080",
    isFavorite: true,
    tags: ["Abstract", "Art"],
  },
  {
    id: "5",
    src: "https://picsum.photos/seed/dash-5/600/400",
    title: "Product Showcase",
    category: "image",
    date: "Dec 15, 2024",
    group: "Recently Added",
    size: "2.7 MB",
    dimensions: "1920 × 1280",
    isFavorite: false,
    tags: ["Product", "Marketing"],
  },
  {
    id: "6",
    src: "https://picsum.photos/seed/dash-6/600/900",
    title: "Brand Campaign",
    category: "video",
    date: "Dec 15, 2024",
    group: "Recently Added",
    size: "18.4 MB",
    dimensions: "1080 × 1920",
    isFavorite: false,
    tags: ["Video", "Brand"],
  },
  {
    id: "7",
    src: "https://picsum.photos/seed/dash-7/600/400",
    title: "Team Photo Session",
    category: "image",
    date: "Nov 28, 2024",
    group: "November 2024",
    size: "3.5 MB",
    dimensions: "1920 × 1280",
    isFavorite: true,
    tags: ["Team", "People"],
  },
  {
    id: "8",
    src: "https://picsum.photos/seed/dash-8/600/600",
    title: "Logo Variations",
    category: "image",
    date: "Nov 28, 2024",
    group: "November 2024",
    size: "1.2 MB",
    dimensions: "1080 × 1080",
    isFavorite: false,
    tags: ["Logo", "Branding"],
  },
  {
    id: "9",
    src: "https://picsum.photos/seed/dash-9/600/400",
    title: "Social Media Banner",
    category: "image",
    date: "Nov 28, 2024",
    group: "November 2024",
    size: "2.1 MB",
    dimensions: "1920 × 1280",
    isFavorite: false,
    tags: ["Social", "Design"],
  },
  {
    id: "10",
    src: "https://picsum.photos/seed/dash-10/600/800",
    title: "Coffee Table Book",
    category: "image",
    date: "Nov 28, 2024",
    group: "November 2024",
    size: "5.0 MB",
    dimensions: "1200 × 1600",
    isFavorite: true,
    tags: ["Photography", "Editorial"],
  },
  {
    id: "11",
    src: "https://picsum.photos/seed/dash-11/600/400",
    title: "Background Ambience",
    category: "audio",
    date: "Nov 28, 2024",
    group: "November 2024",
    size: "8.3 MB",
    dimensions: "—",
    isFavorite: false,
    tags: ["Audio", "Ambient"],
  },
  {
    id: "12",
    src: "https://picsum.photos/seed/dash-12/600/400",
    title: "Aerial City View",
    category: "image",
    date: "Nov 28, 2024",
    group: "November 2024",
    size: "6.1 MB",
    dimensions: "1920 × 1280",
    isFavorite: false,
    tags: ["Aerial", "City"],
  },
  {
    id: "13",
    src: "https://picsum.photos/seed/dash-13/600/600",
    title: "Texture Collection",
    category: "image",
    date: "Oct 10, 2024",
    group: "October 2024",
    size: "3.8 MB",
    dimensions: "1080 × 1080",
    isFavorite: false,
    tags: ["Texture", "Pattern"],
  },
  {
    id: "14",
    src: "https://picsum.photos/seed/dash-14/600/400",
    title: "Nature Macro Shot",
    category: "image",
    date: "Oct 10, 2024",
    group: "October 2024",
    size: "4.5 MB",
    dimensions: "1920 × 1280",
    isFavorite: true,
    tags: ["Nature", "Macro"],
  },
  {
    id: "15",
    src: "https://picsum.photos/seed/dash-15/600/800",
    title: "Portrait Study",
    category: "image",
    date: "Oct 10, 2024",
    group: "October 2024",
    size: "2.9 MB",
    dimensions: "1200 × 1600",
    isFavorite: false,
    tags: ["Portrait", "People"],
  },
  {
    id: "16",
    src: "https://picsum.photos/seed/dash-16/600/400",
    title: "Event Highlight Reel",
    category: "video",
    date: "Oct 10, 2024",
    group: "October 2024",
    size: "24.7 MB",
    dimensions: "1920 × 1080",
    isFavorite: false,
    tags: ["Video", "Event"],
  },
];

// --- Category icon map ---
const categoryIcons: Record<MediaCategory, React.ReactNode> = {
  all: <LayoutGrid className="w-4 h-4" />,
  images: <ImageIcon className="w-4 h-4" />,
  videos: <Film className="w-4 h-4" />,
  audio: <Music className="w-4 h-4" />,
};

const categoryMap: Record<MediaCategory, string> = {
  all: "all",
  images: "image",
  videos: "video",
  audio: "audio",
};

export default function Gallery() {
  const isDark = useSelector((state: RootState) => state.dark.isDark);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<MediaCategory>("all");
  const [favorites, setFavorites] = useState<Set<string>>(
    new Set(mediaItems.filter((m) => m.isFavorite).map((m) => m.id)),
  );
  const [lightboxId, setLightboxId] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState(false);

  // -- Derived --
  const filtered = mediaItems.filter((item) => {
    const matchesCat =
      activeCategory === "all" || item.category === categoryMap[activeCategory];
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) =>
        t.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    return matchesCat && matchesSearch;
  });

  const groups = [...new Set(filtered.map((m) => m.group))];

  const toggleFavorite = (id: string) =>
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  // -- Lightbox helpers --
  const lightboxItem = lightboxId
    ? mediaItems.find((m) => m.id === lightboxId)
    : null;
  const lightboxIndex = lightboxId
    ? filtered.findIndex((m) => m.id === lightboxId)
    : -1;

  const goLightbox = useCallback(
    (dir: -1 | 1) => {
      if (lightboxIndex < 0) return;
      const next = lightboxIndex + dir;
      if (next >= 0 && next < filtered.length) {
        setLightboxId(filtered[next].id);
      }
    },
    [lightboxIndex, filtered],
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!lightboxId) return;
      if (e.key === "Escape") setLightboxId(null);
      if (e.key === "ArrowLeft") goLightbox(-1);
      if (e.key === "ArrowRight") goLightbox(1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxId, goLightbox]);

  // -- Theme helpers --
  const textPrimary = isDark ? "text-white" : "text-slate-900";
  const textMuted = isDark ? "text-slate-400" : "text-slate-500";
  const dividerColor = isDark ? "border-slate-800" : "border-slate-100";

  const totalCount = mediaItems.length;
  const imgCount = mediaItems.filter((m) => m.category === "image").length;
  const vidCount = mediaItems.filter((m) => m.category === "video").length;
  const audioCount = mediaItems.filter((m) => m.category === "audio").length;

  const categoryCounts: Record<MediaCategory, number> = {
    all: totalCount,
    images: imgCount,
    videos: vidCount,
    audio: audioCount,
  };

  return (
    <Layout>
      <div className="flex flex-col gap-6 pb-10">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h1
              className={`text-2xl font-extrabold tracking-tight ${textPrimary}`}
            >
              Media Gallery
            </h1>
            <p className={`text-sm ${textMuted}`}>
              Organize, preview and manage all your media assets.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className={`gap-2 rounded-xl ${isDark ? "text-white border-slate-600" : ""}`}
            >
              <Download className="w-4 h-4" />
              Download All
            </Button>
            <Button
              size="sm"
              className="gap-2 rounded-xl shadow-lg shadow-orange-500/20 cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              Upload Files
            </Button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-4 gap-4">
          {(
            [
              {
                label: "Total Files",
                count: totalCount,
                icon: FolderOpen,
                gradient: "from-orange-500 to-amber-500",
              },
              {
                label: "Images",
                count: imgCount,
                icon: ImageIcon,
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                label: "Videos",
                count: vidCount,
                icon: Film,
                gradient: "from-purple-500 to-pink-500",
              },
              {
                label: "Audio",
                count: audioCount,
                icon: Music,
                gradient: "from-emerald-500 to-teal-500",
              },
            ] as const
          ).map((stat) => (
            <Card
              key={stat.label}
              className="border-none shadow-sm p-0! overflow-hidden"
            >
              <div className="flex items-center gap-4 px-5 py-4">
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-md`}
                >
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className={`text-2xl font-black ${textPrimary}`}>
                    {stat.count}
                  </p>
                  <p className={`text-xs ${textMuted}`}>{stat.label}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Toolbar: Search + Category Tabs */}
        <Card className="border-none shadow-sm p-0! overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3">
            {/* Category pills */}
            <div className="flex items-center gap-1">
              {(Object.keys(categoryIcons) as MediaCategory[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeCategory === cat
                      ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md shadow-orange-500/20"
                      : isDark
                        ? "text-slate-400 hover:text-white hover:bg-slate-800"
                        : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {categoryIcons[cat]}
                  <span className="capitalize">{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                      activeCategory === cat
                        ? "bg-white/20 text-white"
                        : isDark
                          ? "bg-slate-800 text-slate-500"
                          : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {categoryCounts[cat]}
                  </span>
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-64">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2"
                size={16}
                color={isDark ? "white" : "black"}
              />
              <Input
                type="text"
                placeholder="Search media..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </Card>

        {/* Gallery Groups */}
        {groups.length === 0 ? (
          <Card className="border-none shadow-sm p-0! overflow-hidden">
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center ${isDark ? "bg-slate-800" : "bg-slate-100"}`}
              >
                <Search className={`w-8 h-8 ${textMuted}`} />
              </div>
              <p className={`text-lg font-bold ${textPrimary}`}>
                No media found
              </p>
              <p className={`text-sm ${textMuted}`}>
                Try adjusting your search or filter criteria.
              </p>
            </div>
          </Card>
        ) : (
          groups.map((group) => {
            const groupItems = filtered.filter((m) => m.group === group);
            return (
              <div key={group} className="flex flex-col gap-4">
                {/* Group Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-6 bg-orange-500 rounded-full" />
                    <h2
                      className={`text-sm font-black uppercase tracking-widest ${textPrimary}`}
                    >
                      {group}
                    </h2>
                    <Badge className="bg-orange-500/10 text-orange-500 border-orange-200 text-[10px]">
                      {groupItems.length} items
                    </Badge>
                  </div>
                </div>

                {/* Masonry-ish Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {groupItems.map((item) => {
                    const isFav = favorites.has(item.id);
                    return (
                      <Card
                        key={item.id}
                        className="group border-none shadow-sm p-0! overflow-hidden cursor-pointer"
                      >
                        {/* Image container */}
                        <div
                          className="relative overflow-hidden"
                          onClick={() => setLightboxId(item.id)}
                        >
                          <img
                            src={item.src}
                            alt={item.title}
                            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                            loading="lazy"
                          />
                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          {/* Quick actions */}
                          <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(item.id);
                              }}
                              className={`p-1.5 rounded-lg backdrop-blur-md transition-colors cursor-pointer ${
                                isFav
                                  ? "bg-orange-500 text-white"
                                  : "bg-black/40 text-white hover:bg-orange-500"
                              }`}
                            >
                              <Star
                                className="w-3.5 h-3.5"
                                fill={isFav ? "currentColor" : "none"}
                              />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              className="p-1.5 rounded-lg bg-black/40 text-white backdrop-blur-md hover:bg-orange-500 transition-colors cursor-pointer"
                            >
                              <Download className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          {/* Permanent fav star */}
                          {isFav && (
                            <div className="absolute top-3 left-3 group-hover:opacity-0 transition-opacity">
                              <Star
                                className="w-4 h-4 text-orange-400 drop-shadow-lg"
                                fill="currentColor"
                              />
                            </div>
                          )}
                          {/* Video/Audio badge */}
                          {item.category === "video" && (
                            <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-black/50 backdrop-blur-md text-[10px] font-bold text-white flex items-center gap-1">
                              <Film className="w-3 h-3" /> Video
                            </div>
                          )}
                          {item.category === "audio" && (
                            <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-black/50 backdrop-blur-md text-[10px] font-bold text-white flex items-center gap-1">
                              <Music className="w-3 h-3" /> Audio
                            </div>
                          )}
                          {/* View overlay */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                              <Eye className="w-5 h-5 text-white" />
                            </div>
                          </div>
                        </div>
                        {/* Info */}
                        <div className="px-4 py-3">
                          <p
                            className={`text-sm font-bold truncate ${textPrimary}`}
                          >
                            {item.title}
                          </p>
                          <div className="flex items-center justify-between mt-1.5">
                            <div
                              className={`flex items-center gap-1.5 text-[10px] ${textMuted}`}
                            >
                              <Clock className="w-3 h-3" />
                              {item.date}
                            </div>
                            <p
                              className={`text-[10px] font-semibold ${textMuted}`}
                            >
                              {item.size}
                            </p>
                          </div>
                          {/* Tags */}
                          <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className={`text-[9px] font-bold px-2 py-0.5 rounded-md ${
                                  isDark
                                    ? "bg-slate-800 text-slate-400"
                                    : "bg-slate-100 text-slate-500"
                                }`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}

        {/* Upload Drop Zone */}
        <div
          className={`border-2 border-dashed rounded-2xl py-12 flex flex-col items-center justify-center gap-3 transition-colors cursor-pointer ${
            isDark
              ? "border-slate-700 hover:border-orange-500/50 text-slate-500"
              : "border-slate-200 hover:border-orange-500/50 text-slate-400"
          }`}
        >
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
              isDark ? "bg-slate-800" : "bg-slate-100"
            }`}
          >
            <Upload className="w-6 h-6 text-orange-500" />
          </div>
          <p className={`text-sm font-bold ${textPrimary}`}>
            Drop files here or click to upload
          </p>
          <p className={`text-xs ${textMuted}`}>
            Supports JPG, PNG, GIF, MP4, MP3 — up to 50MB each
          </p>
        </div>
      </div>

      {/* ═══════ LIGHTBOX ═══════ */}
      {lightboxItem && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop — click closes lightbox */}
          <div
            className={`absolute inset-0 ${isDark ? "bg-slate-950/95" : "bg-black/90"} backdrop-blur-sm`}
            onClick={() => setLightboxId(null)}
          />

          {/* Image Viewing Area (takes remaining space beside info panel) */}
          <div className="flex-1 relative z-10 flex flex-col">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-6 py-4">
              <p className="text-white/70 text-sm font-bold">
                {lightboxIndex + 1} / {filtered.length}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleFavorite(lightboxItem.id)}
                  className="p-2 rounded-xl hover:bg-white/10 text-white/70 hover:text-orange-400 transition-colors cursor-pointer"
                >
                  <Star
                    className="w-5 h-5"
                    fill={
                      favorites.has(lightboxItem.id) ? "currentColor" : "none"
                    }
                  />
                </button>
                <button className="p-2 rounded-xl hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-xl hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer">
                  <Download className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setShowInfo((s) => !s)}
                  className={`p-2 rounded-xl hover:bg-white/10 transition-colors cursor-pointer ${showInfo ? "text-orange-400" : "text-white/70 hover:text-white"}`}
                >
                  <Info className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setLightboxId(null)}
                  className="p-2 rounded-xl hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Image + Arrows */}
            <div className="flex-1 flex items-center justify-center relative px-16">
              {/* Prev Arrow */}
              {lightboxIndex > 0 && (
                <button
                  onClick={() => goLightbox(-1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-orange-500/80 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {/* Image */}
              <img
                src={lightboxItem.src}
                alt={lightboxItem.title}
                className="max-h-[80vh] max-w-full object-contain rounded-xl shadow-2xl"
              />

              {/* Next Arrow */}
              {lightboxIndex < filtered.length - 1 && (
                <button
                  onClick={() => goLightbox(1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-orange-500/80 transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}
            </div>
          </div>

          {/* Info Panel */}
          {showInfo && (
            <div
              className={`w-80 flex-shrink-0 z-10 overflow-y-auto ${isDark ? "bg-slate-900/95" : "bg-white/95"} backdrop-blur-md border-l ${dividerColor}`}
            >
              <div className="p-6 flex flex-col gap-5">
                <h3 className={`text-lg font-black ${textPrimary}`}>
                  {lightboxItem.title}
                </h3>

                {/* File Details */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-5 bg-orange-500 rounded-full" />
                    <p
                      className={`text-xs font-black uppercase tracking-widest ${textMuted}`}
                    >
                      File Details
                    </p>
                  </div>
                  {[
                    { label: "Type", value: lightboxItem.category },
                    { label: "Size", value: lightboxItem.size },
                    { label: "Dimensions", value: lightboxItem.dimensions },
                    { label: "Added", value: lightboxItem.date },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className={`flex items-center justify-between text-xs border-b pb-2 ${dividerColor}`}
                    >
                      <span className={textMuted}>{row.label}</span>
                      <span
                        className={`font-semibold capitalize ${textPrimary}`}
                      >
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-5 bg-orange-500 rounded-full" />
                    <p
                      className={`text-xs font-black uppercase tracking-widest ${textMuted}`}
                    >
                      Tags
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {lightboxItem.tags.map((tag) => (
                      <Badge
                        key={tag}
                        className={`text-[10px] border ${
                          isDark
                            ? "bg-slate-800 text-slate-300 border-slate-700"
                            : "bg-slate-100 text-slate-600 border-slate-200"
                        }`}
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 mt-2">
                  <Button
                    size="sm"
                    className="gap-2 rounded-xl shadow-lg shadow-orange-500/20 w-full cursor-pointer"
                  >
                    <Download className="w-4 h-4" /> Download
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`gap-2 rounded-xl w-full cursor-pointer ${isDark ? "text-white border-slate-600" : ""}`}
                  >
                    <Share2 className="w-4 h-4" /> Share
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 rounded-xl w-full text-red-500 border-red-200 hover:bg-red-500/10 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
}
