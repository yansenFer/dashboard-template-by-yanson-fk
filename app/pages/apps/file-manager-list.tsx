import * as React from "react";
import Layout from "~/components/Layout";
import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
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
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Search,
  Upload,
  Folder,
  FileText,
  Star,
  Trash2,
  Share2,
  MoreVertical,
  ChevronDown,
  Info,
  UserPlus,
  LayoutGrid,
  List,
  FileImage,
  FileArchive,
  File,
  HardDrive,
  Clock,
  FileSpreadsheet,
  Plus,
  MoreHorizontal,
  Settings,
} from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "~/store/store";
import { cn } from "~/lib/utils";

interface SharingUser {
  type: string;
  value: string;
  color?: string;
}

interface FileData {
  id: number;
  name: string;
  type: string;
  sharing: SharingUser[];
  modified: string;
  size: string;
  starred: boolean;
}

const mockFiles: FileData[] = [
  {
    id: 1,
    name: "Website_content.xlsx",
    type: "excel",
    sharing: [
      { type: "avatar", value: "https://i.pravatar.cc/150?u=1" },
      { type: "avatar", value: "https://i.pravatar.cc/150?u=2" },
    ],
    modified: "Today 11:02 AM",
    size: "2,637 KB",
    starred: true,
  },
  {
    id: 2,
    name: "branding-guidelines.pdf",
    type: "pdf",
    sharing: [
      {
        type: "initials",
        value: "B",
        color: "bg-emerald-100 text-emerald-700",
      },
    ],
    modified: "Yesterday, 2:40 PM",
    size: "4,178 KB",
    starred: false,
  },
  {
    id: 3,
    name: "Project Assets",
    type: "folder",
    sharing: [{ type: "avatar", value: "https://i.pravatar.cc/150?u=3" }],
    modified: "13 Jul, 1:46 PM",
    size: "501 KB",
    starred: false,
  },
  {
    id: 4,
    name: "backup-2024.zip",
    type: "zip",
    sharing: [{ type: "avatar", value: "https://i.pravatar.cc/150?u=4" }],
    modified: "10 Jun, 8:00 AM",
    size: "2.45 GB",
    starred: false,
  },
  {
    id: 5,
    name: "Marketing Campaign",
    type: "folder",
    sharing: [],
    modified: "24 Jun, 6:55 PM",
    size: "1.6 GB",
    starred: true,
  },
  {
    id: 6,
    name: "meeting_minutes.docx",
    type: "document",
    sharing: [{ type: "avatar", value: "https://i.pravatar.cc/150?u=5" }],
    modified: "18 Feb, 12:25 PM",
    size: "20 KB",
    starred: false,
  },
  {
    id: 7,
    name: "product-demo.mp4",
    type: "video",
    sharing: [],
    modified: "05 Jan, 09:15 AM",
    size: "128 MB",
    starred: false,
  },
];

const FileIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "folder":
      return (
        <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-amber-100/50 dark:bg-amber-500/10">
          <Folder className="w-5 h-5 text-amber-500 fill-amber-500/20" />
        </div>
      );
    case "image":
      return (
        <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-blue-100/50 dark:bg-blue-500/10">
          <FileImage className="w-5 h-5 text-blue-500" />
        </div>
      );
    case "excel":
      return (
        <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-emerald-100/50 dark:bg-emerald-500/10">
          <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
        </div>
      );
    case "zip":
      return (
        <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-purple-100/50 dark:bg-purple-500/10">
          <FileArchive className="w-5 h-5 text-purple-500" />
        </div>
      );
    case "document":
    case "pdf":
      return (
        <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-rose-100/50 dark:bg-rose-500/10">
          <FileText className="w-5 h-5 text-rose-500" />
        </div>
      );
    default:
      return (
        <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-100/50 dark:bg-slate-500/10">
          <File className="w-5 h-5 text-slate-500" />
        </div>
      );
  }
};

const SidebarNavItem = ({
  icon: Icon,
  label,
  active = false,
  badge,
}: {
  icon: any;
  label: string;
  active?: boolean;
  badge?: string;
}) => {
  const isDark = useSelector((state: RootState) => state.dark.isDark);
  return (
    <div
      className={cn(
        "flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 group",
        active
          ? isDark
            ? "bg-orange-500/15 text-orange-500"
            : "bg-orange-50 text-orange-600 shadow-sm"
          : isDark
            ? "text-slate-400 hover:bg-slate-900 hover:text-white"
            : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
      )}
    >
      <div className="flex items-center gap-3">
        <Icon
          className={cn(
            "w-4 h-4 transition-colors",
            active
              ? "text-orange-500"
              : isDark
                ? "text-slate-500 group-hover:text-white"
                : "group-hover:text-foreground",
          )}
        />
        <span
          className={cn(
            "text-[13px] font-medium transition-colors",
            active ? "" : isDark ? "text-slate-300 group-hover:text-white" : "",
          )}
        >
          {label}
        </span>
      </div>
      {badge && (
        <span
          className={cn(
            "text-[10px] font-semibold px-1.5 py-0.5 rounded-full transition-colors",
            isDark
              ? "bg-slate-800 text-slate-400 group-hover:bg-slate-700"
              : "bg-muted text-muted-foreground group-hover:bg-background",
          )}
        >
          {badge}
        </span>
      )}
    </div>
  );
};

export default function FileManagerList() {
  const isDark = useSelector((state: RootState) => state.dark.isDark);
  const [selectedTab, setSelectedTab] = React.useState("cloud");

  const textPrimary = isDark ? "text-white" : "text-slate-900";
  const textMuted = isDark ? "text-slate-400" : "text-slate-500";
  const borderMuted = isDark ? "border-slate-800" : "border-slate-200";

  return (
    <Layout isFullscreen>
      <div
        className={cn(
          "flex w-full h-full overflow-hidden transition-colors duration-300",
          isDark ? "bg-slate-950/20" : "bg-background",
        )}
      >
        {/* Left Sidebar - hidden on mobile */}
        <div
          className={cn(
            "hidden md:flex w-64 flex-col border-r shrink-0 transition-all duration-300",
            isDark
              ? "bg-slate-950/80 border-slate-800"
              : "bg-slate-50/30 border-slate-200",
          )}
        >
          <div className="p-6">
            <Button className="w-full justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20 rounded-xl h-11 transition-all hover:scale-[1.02] active:scale-[0.98]">
              <Upload className="w-4 h-4" />
              <span className="font-semibold">Upload File</span>
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto premium-scrollbar px-4 space-y-6">
            <div>
              <p
                className={cn(
                  "px-3 mb-2 text-[11px] font-bold uppercase tracking-wider",
                  isDark ? "text-slate-500" : "text-muted-foreground/60",
                )}
              >
                Main Menu
              </p>
              <div className="space-y-1">
                <SidebarNavItem icon={HardDrive} label="My Space" active />
                <SidebarNavItem icon={File} label="All Files" />
                <SidebarNavItem icon={Folder} label="Folders" />
                <SidebarNavItem icon={Share2} label="Shared" />
                <SidebarNavItem icon={Star} label="Starred" />
                <SidebarNavItem icon={Trash2} label="Trash" />
              </div>
            </div>

            <div>
              <p
                className={cn(
                  "px-3 mb-2 text-[11px] font-bold uppercase tracking-wider",
                  isDark ? "text-slate-500" : "text-muted-foreground/60",
                )}
              >
                Categories
              </p>
              <div className="space-y-1">
                <SidebarNavItem icon={FileImage} label="Images" badge="128" />
                <SidebarNavItem icon={FileText} label="Documents" badge="45" />
                <SidebarNavItem
                  icon={FileArchive}
                  label="Archives"
                  badge="12"
                />
                <SidebarNavItem icon={Clock} label="Recent" />
              </div>
            </div>
          </div>

          <div
            className={cn(
              "p-6 mt-auto border-t",
              isDark ? "border-slate-800" : "border-border/50",
            )}
          >
            <div
              className={cn(
                "rounded-xl p-4 border transition-colors",
                isDark
                  ? "bg-slate-900/50 border-slate-800"
                  : "bg-orange-500/5 border-orange-500/10",
              )}
            >
              <div className="flex justify-between items-center mb-2">
                <span
                  className={cn(
                    "text-xs font-semibold",
                    isDark ? "text-slate-300" : "text-foreground/80",
                  )}
                >
                  Storage Usage
                </span>
                <span className="text-[10px] font-bold text-orange-500">
                  85% full
                </span>
              </div>
              <div className="w-full h-1.5 bg-orange-200/30 dark:bg-orange-900/20 rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-orange-500 rounded-full"
                  style={{ width: "85%" }}
                />
              </div>
              <p
                className={cn(
                  "text-[10px] leading-relaxed",
                  isDark ? "text-slate-500" : "text-muted-foreground",
                )}
              >
                78.5 GB of 1 TB used. You can buy more space.
              </p>
              <Button
                variant="link"
                className="h-auto p-0 mt-2 text-[11px] font-bold text-orange-500 hover:text-orange-600 no-underline hover:underline"
              >
                Upgrade Storage
              </Button>
            </div>

            <div className="mt-4 flex items-center justify-between px-2">
              <Settings
                className={cn(
                  "w-4 h-4 cursor-pointer transition-colors",
                  isDark
                    ? "text-slate-500 hover:text-white"
                    : "text-muted-foreground hover:text-foreground",
                )}
              />
              <Info
                className={cn(
                  "w-4 h-4 cursor-pointer transition-colors",
                  isDark
                    ? "text-slate-500 hover:text-white"
                    : "text-muted-foreground hover:text-foreground",
                )}
              />
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Header */}
          <header
            className={cn(
              "h-16 border-b flex items-center justify-between px-6 gap-4 shrink-0 backdrop-blur-sm z-10 transition-colors",
              isDark ? "bg-slate-950/50 border-slate-800" : "bg-background/50",
            )}
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="flex items-center gap-1.5 text-sm font-medium">
                <span
                  className={cn(
                    "cursor-pointer transition-colors",
                    isDark
                      ? "text-slate-400 hover:text-white"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  Files
                </span>
                <span
                  className={
                    isDark ? "text-slate-700" : "text-muted-foreground/40"
                  }
                >
                  /
                </span>
                <div className="flex items-center gap-1 cursor-pointer group">
                  <span className={isDark ? "text-slate-200" : ""}>
                    My Space
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-3.5 h-3.5 transition-colors",
                      isDark
                        ? "text-slate-500 group-hover:text-white"
                        : "text-muted-foreground group-hover:text-foreground",
                    )}
                  />
                </div>
              </div>

              <div className="relative max-w-md w-full ml-4 group">
                <Search
                  className={cn(
                    "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors",
                    isDark
                      ? "text-slate-500 group-focus-within:text-orange-500"
                      : "text-muted-foreground group-focus-within:text-orange-500",
                  )}
                />
                <Input
                  placeholder="Search files and folders..."
                  className={cn(
                    "pl-10 h-10 transition-all rounded-xl border-transparent focus:ring-orange-500/20",
                    isDark
                      ? "bg-slate-900 text-slate-200 focus:bg-slate-950"
                      : "bg-muted/30 focus:bg-background",
                  )}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "rounded-lg",
                  isDark
                    ? "text-slate-400 hover:text-white hover:bg-slate-900"
                    : "text-muted-foreground",
                )}
              >
                <UserPlus className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "rounded-lg",
                  isDark
                    ? "text-slate-400 hover:text-white hover:bg-slate-900"
                    : "text-muted-foreground",
                )}
              >
                <Info className="w-4 h-4" />
              </Button>
              <div
                className={cn(
                  "w-px h-6 mx-1",
                  isDark ? "bg-slate-800" : "bg-border",
                )}
              />
              <div
                className={cn(
                  "flex items-center p-1 gap-1 rounded-lg border transition-colors",
                  isDark ? "bg-slate-900/50 border-slate-800" : "bg-muted/40",
                )}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-7 w-7 rounded-md shadow-sm transition-all",
                    isDark
                      ? "bg-orange-500 text-white! hover:bg-orange-600 hover:text-white!"
                      : "bg-orange-500 text-white! hover:bg-orange-600 hover:text-white!",
                  )}
                >
                  <List className="w-3.5 h-3.5 text-white!" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-7 w-7 rounded-md transition-all",
                    isDark
                      ? "text-slate-500 hover:text-slate-300"
                      : "text-muted-foreground",
                  )}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </Button>
              </div>
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "rounded-lg border transition-colors",
                  isDark
                    ? "bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-white"
                    : "",
                )}
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </header>

          {/* Sub Header / Tabs */}
          <div
            className={cn(
              "px-6 border-b backdrop-blur-sm shrink-0 transition-colors",
              isDark ? "bg-slate-950/30 border-slate-800" : "bg-background/30",
            )}
          >
            <div className="flex items-center gap-8 h-12">
              <button
                onClick={() => setSelectedTab("cloud")}
                className={cn(
                  "h-full px-1 text-[13px] font-semibold transition-all relative",
                  selectedTab === "cloud"
                    ? "text-orange-500"
                    : isDark
                      ? "text-slate-500 hover:text-slate-200"
                      : "text-muted-foreground hover:text-foreground",
                )}
              >
                Cloud Documents
                {selectedTab === "cloud" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full" />
                )}
              </button>
              <button
                onClick={() => setSelectedTab("shared")}
                className={cn(
                  "h-full px-1 text-[13px] font-semibold transition-all relative",
                  selectedTab === "shared"
                    ? "text-orange-500"
                    : isDark
                      ? "text-slate-500 hover:text-slate-200"
                      : "text-muted-foreground hover:text-foreground",
                )}
              >
                Shared with me
                {selectedTab === "shared" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full" />
                )}
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="flex-1 overflow-auto">
            <Table>
              <TableHeader
                className={cn(
                  "sticky top-0 backdrop-blur-sm z-10 border-b transition-colors",
                  isDark
                    ? "bg-slate-950/95 border-slate-800"
                    : "bg-background/95",
                )}
              >
                <TableRow className="hover:bg-transparent border-none">
                  <TableHead className="w-12 text-center">
                    <Checkbox
                      className={cn(
                        "rounded-md data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 transition-colors",
                        isDark
                          ? "border-slate-700"
                          : "border-muted-foreground/30",
                      )}
                    />
                  </TableHead>
                  <TableHead
                    className={cn(
                      "font-bold uppercase tracking-tight text-[11px]",
                      isDark ? "text-slate-500" : "text-muted-foreground/70",
                    )}
                  >
                    Name
                  </TableHead>
                  <TableHead
                    className={cn(
                      "font-bold uppercase tracking-tight text-[11px]",
                      isDark ? "text-slate-500" : "text-muted-foreground/70",
                    )}
                  >
                    Sharing
                  </TableHead>
                  <TableHead
                    className={cn(
                      "font-bold uppercase tracking-tight text-[11px]",
                      isDark ? "text-slate-500" : "text-muted-foreground/70",
                    )}
                  >
                    Modified
                  </TableHead>
                  <TableHead
                    className={cn(
                      "font-bold uppercase tracking-tight text-[11px]",
                      isDark ? "text-slate-500" : "text-muted-foreground/70",
                    )}
                  >
                    Size
                  </TableHead>
                  <TableHead
                    className={cn(
                      "w-20 text-right font-bold uppercase tracking-tight text-[11px] pr-6",
                      isDark ? "text-slate-500" : "text-muted-foreground/70",
                    )}
                  >
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockFiles.map((file) => (
                  <TableRow
                    key={file.id}
                    className={cn(
                      "group transition-colors border-border/40",
                      isDark
                        ? "border-slate-800 hover:bg-orange-500/5"
                        : "hover:bg-orange-500/2",
                    )}
                  >
                    <TableCell className="text-center">
                      <Checkbox
                        className={cn(
                          "rounded-md data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 transition-colors",
                          isDark
                            ? "border-slate-700"
                            : "border-muted-foreground/30",
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-4 py-1">
                        <div className="relative group/star">
                          <FileIcon type={file.type} />
                          <div
                            className={cn(
                              "absolute -top-1 -right-1 p-0.5 rounded-full border shadow-sm transition-all",
                              isDark
                                ? "bg-slate-900 border-slate-700"
                                : "bg-background border shadow-sm",
                              file.starred
                                ? "opacity-100"
                                : "opacity-0 group-hover/star:opacity-100",
                            )}
                          >
                            <Star
                              className={cn(
                                "w-2.5 h-2.5 transition-colors",
                                file.starred
                                  ? "fill-orange-500 text-orange-500"
                                  : isDark
                                    ? "text-slate-600"
                                    : "text-muted-foreground",
                              )}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span
                            className={cn(
                              "font-semibold text-[13.5px] truncate max-w-50 transition-colors",
                              isDark ? "text-slate-200" : "",
                            )}
                          >
                            {file.name}
                          </span>
                          <span
                            className={cn(
                              "text-[11px] uppercase font-medium transition-colors",
                              isDark
                                ? "text-slate-500"
                                : "text-muted-foreground",
                            )}
                          >
                            {file.type}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex -space-x-2">
                        {file.sharing.map((share, i) => (
                          <div
                            key={i}
                            className={cn(
                              "w-7 h-7 rounded-full border-2 overflow-hidden flex items-center justify-center text-[10px] font-bold shadow-sm transition-all",
                              isDark ? "border-slate-950" : "border-background",
                              share.type === "avatar"
                                ? isDark
                                  ? "bg-slate-800"
                                  : "bg-muted"
                                : share.color,
                            )}
                          >
                            {share.type === "avatar" ? (
                              <img
                                src={share.value}
                                alt="User"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              share.value
                            )}
                          </div>
                        ))}
                        {file.sharing.length === 0 && (
                          <span
                            className={
                              isDark
                                ? "text-slate-800"
                                : "text-muted-foreground/40"
                            }
                          >
                            —
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell
                      className={cn(
                        "text-[13px] font-medium transition-colors",
                        isDark ? "text-slate-400" : "text-muted-foreground",
                      )}
                    >
                      {file.modified}
                    </TableCell>
                    <TableCell
                      className={cn(
                        "text-[13px] font-semibold transition-colors",
                        isDark ? "text-slate-400" : "text-muted-foreground",
                      )}
                    >
                      {file.size}
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className={cn(
                              "h-8 w-8 rounded-lg opacity-0 group-hover:opacity-100 transition-all",
                              isDark ? "hover:bg-slate-900" : "",
                            )}
                          >
                            <MoreHorizontal
                              className={cn(
                                "w-4 h-4 transition-colors",
                                isDark
                                  ? "text-slate-500 group-hover:text-slate-300"
                                  : "text-muted-foreground",
                              )}
                            />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className={cn(
                            "w-40 rounded-xl transition-all",
                            isDark
                              ? "bg-slate-950 border-slate-800 text-slate-200"
                              : "",
                          )}
                        >
                          <DropdownMenuItem
                            className={cn(
                              "gap-2 text-[13px] rounded-lg",
                              isDark
                                ? "focus:bg-slate-900 focus:text-white"
                                : "",
                            )}
                          >
                            <Share2 className="w-3.5 h-3.5" /> Share
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className={cn(
                              "gap-2 text-[13px] rounded-lg",
                              isDark
                                ? "focus:bg-slate-900 focus:text-white"
                                : "",
                            )}
                          >
                            <Star className="w-3.5 h-3.5" /> Favorite
                          </DropdownMenuItem>
                          <div
                            className={cn(
                              "h-px my-1",
                              isDark ? "bg-slate-800" : "bg-border",
                            )}
                          />
                          <DropdownMenuItem className="gap-2 text-[13px] text-rose-500 focus:text-rose-500 rounded-lg">
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
