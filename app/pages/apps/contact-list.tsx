import { useState } from "react";
import Layout from "~/components/Layout";
import {
  Search,
  Plus,
  Star,
  Grid,
  List as ListIcon,
  Trash2,
  Edit2,
  Archive,
  ChevronDown,
} from "lucide-react";
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
import { Checkbox } from "~/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useSelector } from "react-redux";
import type { RootState } from "~/store/store";
import { cn } from "~/lib/utils";

const contacts = [
  {
    id: 1,
    name: "Morgan Freeman",
    email: "morgan@jampack.com",
    phone: "+145 52 5689",
    tags: ["Promotion", "Collaborator"],
    label: "Design",
    date: "13 Jan, 2020",
    avatar: "https://i.pravatar.cc/150?u=11",
    starred: true,
    status: "online",
  },
  {
    id: 2,
    name: "Huma Therman",
    email: "huma@clariesup.au",
    phone: "+234 48 2365",
    tags: ["Collaborator", "Angular Developer"],
    label: "Developer",
    date: "13 Jan, 2020",
    avatar: "https://i.pravatar.cc/150?u=22",
    starred: true,
    status: "offline",
  },
  {
    id: 3,
    name: "Charlie Chaplin",
    email: "charlie@leernoca.com",
    phone: "+741 56 7896",
    tags: ["Collaborator"],
    label: "Inventory",
    date: "13 Jan, 2019",
    avatar: "https://i.pravatar.cc/150?u=33",
    starred: false,
    status: "busy",
  },
  {
    id: 4,
    name: "Winston Churchill",
    email: "winston@worthniz.com",
    phone: "+145 52 5463",
    tags: ["Promotion", "Advertisement"],
    label: "Human Resource",
    date: "13 Jan, 2020",
    avatar: "https://i.pravatar.cc/150?u=44",
    starred: true,
    status: "online",
  },
  {
    id: 5,
    name: "Jaquiline Joker",
    email: "jaquijoker@jampa.com",
    phone: "+145 53 4715",
    tags: ["Promotion", "Collaborator"],
    label: "Design",
    date: "3 July, 2020",
    avatar: "https://i.pravatar.cc/150?u=55",
    starred: false,
    status: "offline",
  },
  {
    id: 6,
    name: "Tom Cruz",
    email: "tomcz@jampack.com",
    phone: "+456 52 4862",
    tags: ["Collaborator", "Angular Developer"],
    label: "Inventory",
    date: "24 Jun, 2019",
    avatar: "https://i.pravatar.cc/150?u=66",
    starred: true,
    status: "online",
  },
  {
    id: 7,
    name: "Danial Craig",
    email: "danialc@jampack.com",
    phone: "+145 52 5689",
    tags: ["Collaborator"],
    label: "Developer",
    date: "24 Jun, 2019",
    avatar: "https://i.pravatar.cc/150?u=77",
    starred: false,
    status: "busy",
  },
];

export default function ContactList() {
  const isDark = useSelector((state: RootState) => state.dark.isDark);
  const [view, setView] = useState<"list" | "grid">("list");

  return (
    <Layout isFullscreen>
      <div
        className={cn(
          "flex w-full flex-col h-full animate-in fade-in duration-[300ms]",
          isDark ? "bg-slate-950 text-white" : "bg-white text-slate-900",
        )}
      >
        {/* Header Section */}
        <div
          className={`flex flex-col md:flex-row md:items-center justify-between gap-4 px-4 py-6 border-b duration-[300ms] transition-all ${isDark ? "border-slate-800/50" : "border-slate-100"}`}
        >
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Contacts</h1>
            <Badge
              variant="secondary"
              className="rounded-full bg-transparent border border-orange-600 text-orange-400"
            >
              {contacts.length} Total
            </Badge>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center bg-slate-500/5 p-1 rounded-xl border border-slate-500/10 gap-1">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-8 px-4 rounded-lg font-black text-[10px] uppercase tracking-wider transition-all duration-300",
                  view === "list"
                    ? "bg-orange-500 shadow-lg shadow-orange-500/20 !text-white hover:bg-orange-600 hover:!text-white"
                    : "text-slate-500 hover:bg-orange-500 hover:!text-white",
                )}
                onClick={() => setView("list")}
              >
                List
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-8 px-4 rounded-lg font-black text-[10px] uppercase tracking-wider transition-all duration-300",
                  view === "grid"
                    ? "bg-orange-500 shadow-lg shadow-orange-500/20 !text-white hover:bg-orange-600 hover:!text-white"
                    : "text-slate-500 hover:bg-orange-500 hover:!text-white",
                )}
                onClick={() => setView("grid")}
              >
                Grid
              </Button>
            </div>

            <Button className="bg-orange-600 hover:bg-orange-700 text-white h-9 gap-2 shadow-lg shadow-orange-500/20">
              <Plus className="h-4 w-4" />
              Create New
            </Button>
          </div>
        </div>

        {/* Toolbar Section */}
        <div
          className={`flex flex-wrap items-center justify-between gap-4 px-4 py-3 border-b ${isDark ? "border-slate-800/50" : "border-slate-100"}`}
        >
          <div className="flex flex-wrap items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "h-9 gap-2 transition-all duration-300",
                    isDark
                      ? "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white"
                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50",
                  )}
                >
                  Bulk actions <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Delete Selected</DropdownMenuItem>
                <DropdownMenuItem>Add Tags</DropdownMenuItem>
                <DropdownMenuItem>Export Selected</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="secondary"
              size="sm"
              className={cn(
                "h-9 transition-all duration-300",
                isDark
                  ? "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border-slate-700"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200",
              )}
            >
              Apply
            </Button>

            <div className="h-6 w-px bg-slate-50 dark:bg-slate-800/50 mx-1 hidden md:block" />

            <span className="text-sm text-slate-500 font-medium">Sort by:</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "h-9 gap-2 font-medium transition-all duration-300",
                    isDark
                      ? "text-slate-300 hover:bg-slate-800 hover:text-white"
                      : "text-slate-600 hover:bg-slate-100",
                  )}
                >
                  Date Created <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Name</DropdownMenuItem>
                <DropdownMenuItem>Date Created</DropdownMenuItem>
                <DropdownMenuItem>Email</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              placeholder="Search contacts..."
              className={cn(
                "w-full pl-10 h-9 text-sm rounded-md border focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all",
                isDark
                  ? "bg-slate-800 border-slate-800/50 text-white"
                  : "bg-white text-slate-900",
              )}
            />
          </div>
        </div>

        {/* Main Table Section */}
        <div className="flex-1 overflow-auto">
          <Table>
            <TableHeader
              className={cn(
                "sticky top-0 z-10 transition-colors",
                isDark
                  ? "bg-slate-900 border-slate-800/50"
                  : "bg-white border-slate-100",
              )}
            >
              <TableRow className="hover:bg-transparent border-none">
                <TableHead className="w-12 pl-4">
                  <Checkbox />
                </TableHead>
                <TableHead className="w-10"></TableHead>
                <TableHead className="text-xs font-bold text-slate-400 uppercase tracking-wider py-4">
                  Name
                </TableHead>
                <TableHead className="text-xs font-bold text-slate-400 uppercase tracking-wider py-4">
                  Email
                </TableHead>
                <TableHead className="text-xs font-bold text-slate-400 uppercase tracking-wider py-4">
                  Phone
                </TableHead>
                <TableHead className="text-xs font-bold text-slate-400 uppercase tracking-wider py-4">
                  Tags
                </TableHead>
                <TableHead className="text-xs font-bold text-slate-400 uppercase tracking-wider py-4">
                  Labels
                </TableHead>
                <TableHead className="text-xs font-bold text-slate-400 uppercase tracking-wider py-4">
                  Created
                </TableHead>
                <TableHead className="text-right pr-4 text-xs font-bold text-slate-400 uppercase tracking-wider py-4">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow
                  key={contact.id}
                  className={cn(
                    "group border-b last:border-none",
                    isDark
                      ? "border-slate-800/50 hover:bg-white/[0.02]"
                      : "hover:bg-slate-50/50",
                  )}
                >
                  <TableCell className="pl-4">
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <Star
                      className={cn(
                        "h-4 w-4 cursor-pointer transition-all",
                        contact.starred
                          ? "fill-orange-500 text-orange-500"
                          : "text-slate-300 dark:text-slate-700",
                      )}
                    />
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="h-10 w-10 rounded-full overflow-hidden">
                          <img
                            src={contact.avatar}
                            alt={contact.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div
                          className={cn(
                            "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white dark:border-slate-900",
                            contact.status === "online"
                              ? "bg-emerald-500"
                              : contact.status === "busy"
                                ? "bg-amber-500"
                                : "bg-slate-400",
                          )}
                        />
                      </div>
                      <span className="font-bold text-sm whitespace-nowrap">
                        {contact.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-500 text-sm">
                    {contact.email}
                  </TableCell>
                  <TableCell className="text-slate-500 text-sm whitespace-nowrap">
                    {contact.phone}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {contact.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className={cn(
                            "text-[10px] px-2 py-0 bg-transparent font-bold",
                            tag === "Promotion"
                              ? "border-purple-700 border text-purple-700 dark:text-purple-400"
                              : tag === "Collaborator"
                                ? "border-red-700 border text-red-700 dark:text-red-400"
                                : "border-emerald-700 border text-emerald-700 dark:text-emerald-400",
                          )}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs font-medium text-slate-500">
                      {contact.label}
                    </span>
                  </TableCell>
                  <TableCell className="text-slate-500 text-xs whitespace-nowrap">
                    {contact.date}
                  </TableCell>
                  <TableCell className="text-right pr-4">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-white"
                      >
                        <Archive className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-white"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-white"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Footer */}
        <div
          className={cn(
            "flex items-center justify-between px-4 py-4 border-t",
            isDark
              ? "bg-slate-900 border-slate-800/50"
              : "bg-white border-slate-100",
          )}
        >
          <div className="text-sm text-slate-500">
            Showing 1-7 of 48 contacts
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled
              className="h-8 dark:border-slate-700 font-bold opacity-50"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 dark:border-slate-700 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
