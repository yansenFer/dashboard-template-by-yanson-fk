import {
  Briefcase,
  Calendar,
  ChevronRight,
  Download,
  ExternalLink,
  FileText,
  Github,
  Globe,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  MessageSquare,
  MoreVertical,
  Phone,
  Plus,
  Search,
  Share2,
  Twitter,
} from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Layout from "~/components/Layout";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import type { RootState } from "~/store/store";

// --- Mock Data ---

const profileData = {
  name: "Yanson Ferdinand Kurniadi",
  role: "Frontend Developer / Fullstack Developer",
  bio: "Passionate frontend developer with 3 years of experience in building dynamic web interfaces. Recently transitioned into a full-stack developer role, specializing in the Laravel framework to deliver end-to-end solutions.",
  location: "Jakarta, Indonesia",
  email: "yansenferdinand6@gmail.com",
  phone: "(+62) 813-8400-4840",
  social: [
    { icon: Github, url: "github.com/mintrona" },
    { icon: Twitter, url: "twitter.com/mintrona" },
    { icon: Linkedin, url: "linkedin.com/in/mintrona" },
    { icon: Globe, url: "mintrona.design" },
  ],
};

const stats = [
  {
    label: "Project View",
    value: "2.4K",
    change: "+12.5%",
    icon: Globe,
    color: "text-blue-500",
  },
  {
    label: "Followers",
    value: "1,280",
    change: "+5.2%",
    icon: Plus,
    color: "text-orange-500",
  },
  {
    label: "Following",
    value: "342",
    change: "0%",
    icon: ChevronRight,
    color: "text-green-500",
  },
  {
    label: "Total Contribution",
    value: "456",
    change: "+2.4%",
    icon: Github,
    color: "text-purple-500",
  },
];

const chartData = [
  { name: "Mon", views: 400 },
  { name: "Tue", views: 300 },
  { name: "Wed", views: 500 },
  { name: "Thu", views: 280 },
  { name: "Fri", views: 590 },
  { name: "Sat", views: 320 },
  { name: "Sun", views: 480 },
];

const timeline = [
  {
    type: "work",
    role: "Senior UI/UX Designer",
    company: "Whatsapp Inc.",
    period: "2019 - Present",
    description: "Leading the design system team for mobile and web platforms.",
    icon: Briefcase,
  },
  {
    type: "edu",
    degree: "Masters in Interaction Design",
    school: "Buffer University",
    period: "2016 - 2018",
    description: "Thesis on conversational UI and user behavior.",
    icon: GraduationCap,
  },
  {
    type: "work",
    role: "Product Designer",
    company: "Spruko Inc.",
    period: "2015 - 2019",
    description: "Designed core features for their analytics dashboard.",
    icon: Briefcase,
  },
];

const projects = [
  {
    title: "Sample Project",
    category: "SaaS",
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Sample Project 1",
    category: "Mobile",
    status: "In Progress",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=300&auto=format&fit=crop",
  },
  {
    title: "Sample Project 2",
    category: "Branding",
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=300&auto=format&fit=crop",
  },
];

const documents = [
  { name: "Latest_Resume.pdf", size: "1.2 MB", type: "PDF" },
  { name: "Portfolio_2024.zip", size: "45 MB", type: "Archive" },
  { name: "Certifications.pdf", size: "3.4 MB", type: "PDF" },
];

const skills = [
  { name: "Product Design", level: 90 },
  { name: "Figma / Adobe Suite", level: 95 },
  { name: "Frontend (React/Tailwind)", level: 75 },
  { name: "Motion Design", level: 80 },
];

// --- Sub-components ---

function SectionHeader({
  title,
  icon: Icon,
  isDark,
}: {
  title: string;
  icon: any;
  isDark: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2 mb-6 ${isDark ? "text-white" : "text-black"}`}
    >
      <div className="w-1 h-6 bg-orange-500 rounded-full" />
      <Icon
        className={`w-5 h-5 ${isDark ? "text-gray-400" : "text-gray-500"}`}
      />
      <h3 className="font-bold text-lg">{title}</h3>
    </div>
  );
}

function Progress({
  value,
  className,
  isDark,
}: {
  value: number;
  className?: string;
  isDark: boolean;
}) {
  return (
    <div
      className={`w-full ${isDark ? "bg-gray-800" : "bg-gray-200"} rounded-full h-2 ${className}`}
    >
      <div
        className="bg-orange-500 h-2 rounded-full transition-all duration-500"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export default function Profile() {
  const isDark = useSelector((state: RootState) => state.dark.isDark);
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <Layout>
      <div className="flex flex-col gap-8 pb-10">
        {/* --- Header Section --- */}
        <div className="relative group">
          <div className="h-48 w-full rounded-2xl bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 overflow-hidden relative shadow-lg">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
            <div className="absolute top-4 right-4 flex gap-2">
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md border-transparent text-white"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="px-8 -mt-16 relative z-10 flex flex-col md:flex-row items-end gap-6">
            <div className="relative">
              <div
                className={`w-32 h-32 rounded-2xl border-4 ${isDark ? "border-slate-900" : "border-white"} overflow-hidden shadow-2xl bg-white`}
              >
                <img
                  src="https://testingbot.com/free-online-tools/random-avatar/300"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className={`absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 ${isDark ? "border-slate-900" : "border-white"} rounded-full`}
                title="Online"
              />
            </div>

            <div className="flex-1 pb-2 translate-y-[10px]">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h1
                    className={`text-3xl font-bold ${isDark ? "text-white" : "text-black"}`}
                  >
                    {profileData.name}
                  </h1>
                  <p
                    className={`font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}
                  >
                    {profileData.role}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    className={`rounded-full ${isDark ? "border-gray-700 text-gray-300" : "border-gray-300"}`}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" /> Message
                  </Button>
                  <Button className="rounded-full !px-5 shadow-lg shadow-orange-500/20">
                    <Plus className="w-4 h-4" /> Connect
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Content Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-2">
          {/* --- Left Sidebar (4 cols) --- */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <Card key={i} className={`border-none shadow-sm pt-5`}>
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <div
                        className={`${stat.color} p-2 rounded-xl bg-current/10`}
                      >
                        <stat.icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold text-green-500">
                        {stat.change}
                      </span>
                    </div>
                    <p
                      className={`text-2xl font-black ${isDark ? "text-white" : "text-black"}`}
                    >
                      {stat.value}
                    </p>
                    <p
                      className={`text-[10px] uppercase tracking-wider font-bold ${isDark ? "text-gray-400" : "text-gray-500"}`}
                    >
                      {stat.label}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Information Card */}
            <Card className={`border-none shadow-sm overflow-hidden`}>
              <CardHeader>
                <CardTitle
                  className={`text-base ${isDark ? "text-white" : "text-black"}`}
                >
                  About Me
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-6">
                <p
                  className={`text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}
                >
                  {profileData.bio}
                </p>

                <div
                  className={`flex flex-col gap-4 pt-4 border-t ${isDark ? "border-gray-800" : "border-gray-100"}`}
                >
                  <div
                    className={`flex items-center gap-3 text-sm ${isDark ? "text-gray-300" : "text-black"}`}
                  >
                    <MapPin className="w-4 h-4 text-orange-500" />
                    <span>{profileData.location}</span>
                  </div>
                  <div
                    className={`flex items-center gap-3 text-sm ${isDark ? "text-gray-300" : "text-black"}`}
                  >
                    <Mail className="w-4 h-4 text-orange-500" />
                    <span>{profileData.email}</span>
                  </div>
                  <div
                    className={`flex items-center gap-3 text-sm ${isDark ? "text-gray-300" : "text-black"}`}
                  >
                    <Phone className="w-4 h-4 text-orange-500" />
                    <span>{profileData.phone}</span>
                  </div>
                </div>

                <div
                  className={`pt-4 border-t ${isDark ? "border-gray-800" : "border-gray-100"}`}
                >
                  <p
                    className={`text-xs font-bold uppercase tracking-widest mb-4 ${isDark ? "text-gray-400" : "text-gray-500"}`}
                  >
                    Skills & Mastery
                  </p>
                  <div className="flex flex-col gap-4">
                    {skills.map((skill, i) => (
                      <div key={i} className="flex flex-col gap-1.5">
                        <div
                          className={`flex justify-between text-xs font-bold ${isDark ? "text-white" : "text-black"}`}
                        >
                          <span>{skill.name}</span>
                          <span className="text-orange-500">
                            {skill.level}%
                          </span>
                        </div>
                        <Progress value={skill.level} isDark={isDark} />
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className={`pt-4 border-t ${isDark ? "border-gray-800" : "border-gray-100"}`}
                >
                  <p
                    className={`text-xs font-bold uppercase tracking-widest mb-4 ${isDark ? "text-gray-400" : "text-gray-500"}`}
                  >
                    Channels
                  </p>
                  <div className="flex gap-2">
                    {profileData.social.map((social, i) => (
                      <Button
                        key={i}
                        size="icon"
                        variant="ghost"
                        onClick={() =>
                          window.open(`https://${social.url}`, "_blank")
                        }
                        className={`rounded-xl hover:bg-orange-500/10 hover:text-orange-500 ${isDark ? "text-gray-400" : "text-gray-500"}`}
                      >
                        <social.icon className="w-5 h-5" />
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* --- Main Content (8 cols) --- */}
          <div className="lg:col-span-8">
            <div className="flex flex-col gap-8">
              {/* Tabs */}
              <div
                className={`flex items-center gap-1 ${
                  activeTab === "overview"
                    ? `${isDark ? "bg-dark" : "bg-gray-100"} `
                    : `${isDark ? "bg-dark" : "bg-gray-100"}`
                } p-1 rounded-2xl w-fit`}
              >
                {["overview", "journey", "projects", "documents"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-2.5 rounded-xl cursor-pointer text-sm font-bold capitalize transition-all ${
                      activeTab === tab
                        ? ` ${isDark ? "bg-orange-600 text-white" : "bg-white text-orange-600"} shadow-sm `
                        : `${isDark ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-800"}`
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="min-h-[500px]">
                {activeTab === "overview" && (
                  <div className="flex flex-col gap-8 animate-in fade-in duration-500">
                    {/* Analytics Chart */}
                    <Card className={`border-none shadow-sm overflow-hidden`}>
                      <CardHeader className="flex flex-row items-center justify-between pb-8">
                        <div>
                          <CardTitle
                            className={`text-base flex items-center gap-2 ${isDark ? "text-white" : "text-black"}`}
                          >
                            <Plus className="w-4 h-4 text-orange-500" /> Profile
                            Visibility
                          </CardTitle>
                          <p
                            className={`text-xs mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}
                          >
                            Daily viewers for the past week
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </CardHeader>
                      <CardContent className="px-0">
                        <div className="h-[250px] w-full px-2">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                              <defs>
                                <linearGradient
                                  id="colorViews"
                                  x1="0"
                                  y1="0"
                                  x2="0"
                                  y2="1"
                                >
                                  <stop
                                    offset="5%"
                                    stopColor="#f97316"
                                    stopOpacity={0.3}
                                  />
                                  <stop
                                    offset="95%"
                                    stopColor="#f97316"
                                    stopOpacity={0}
                                  />
                                </linearGradient>
                              </defs>
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: isDark ? "#0f172a" : "#fff",
                                  border: "none",
                                  borderRadius: "12px",
                                  boxShadow:
                                    "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                                }}
                              />
                              <Area
                                type="monotone"
                                dataKey="views"
                                stroke="#f97316"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorViews)"
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Heatmap Section */}
                    <Card className={`border-none shadow-sm`}>
                      <CardHeader className="">
                        <CardTitle
                          className={`text-base flex items-center gap-2 ${isDark ? "text-white" : "text-black"}`}
                        >
                          <Calendar className="w-4 h-4 text-orange-500" />{" "}
                          Annual Contributions
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col gap-2">
                          <div className="grid grid-cols-12 gap-1 md:grid-cols-[repeat(26,minmax(0,1fr))]">
                            {[...Array(156)].map((_, i) => (
                              <div
                                key={i}
                                className={`aspect-square rounded-[2px] transition-all hover:scale-125 hover:z-10 cursor-pointer ${
                                  i % 7 === 0
                                    ? "bg-orange-500/80"
                                    : i % 8 === 0
                                      ? "bg-orange-500/40"
                                      : i % 13 === 0
                                        ? "bg-orange-500/20"
                                        : `${isDark ? "bg-gray-800" : "bg-gray-100"}`
                                }`}
                                title={`Contribution on day ${i}`}
                              />
                            ))}
                          </div>
                          <div
                            className={`flex justify-between items-center mt-4 text-[10px] font-bold uppercase tracking-tighter ${isDark ? "text-gray-400" : "text-gray-500"}`}
                          >
                            <span>Less Activity</span>
                            <div className="flex gap-1 items-center">
                              <div
                                className={`w-2 h-2 rounded-sm ${isDark ? "bg-gray-800" : "bg-gray-100"}`}
                              />
                              <div className="w-2 h-2 rounded-sm bg-orange-500/20" />
                              <div className="w-2 h-2 rounded-sm bg-orange-500/40" />
                              <div className="w-2 h-2 rounded-sm bg-orange-500/80" />
                            </div>
                            <span>More Activity</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {activeTab === "journey" && (
                  <Card className="p-5">
                    <div className="flex flex-col gap-8 animate-in slide-in-from-bottom-4 duration-500">
                      <SectionHeader
                        title="Professional Timeline"
                        icon={Briefcase}
                        isDark={isDark}
                      />
                      <div
                        className={`relative pl-8 border-l-2 ml-4 flex flex-col gap-12 ${isDark ? "border-gray-800" : "border-gray-100"}`}
                      >
                        {timeline.map((item, i) => (
                          <div key={i} className="relative">
                            <div
                              className={`absolute -left-[50px] p-3 rounded-2xl border-4 shadow-sm ${
                                isDark ? "border-slate-950" : "border-white"
                              } ${
                                item.type === "work"
                                  ? "bg-orange-100 text-orange-600"
                                  : "bg-blue-100 text-blue-600"
                              }`}
                            >
                              <item.icon className="w-5 h-5" />
                            </div>
                            <div className="flex ml-[20px] flex-col gap-2">
                              <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">
                                {item.period}
                              </span>
                              <h4
                                className={`text-xl font-bold ${isDark ? "text-white" : "text-black"}`}
                              >
                                {item.type === "work" ? item.role : item.degree}
                              </h4>
                              <p
                                className={`font-medium flex items-center gap-2 ${isDark ? "text-gray-300" : "text-black"}`}
                              >
                                {item.type === "work"
                                  ? item.company
                                  : item.school}
                                <Badge
                                  variant="secondary"
                                  className={`text-[10px] px-2 py-0 ${isDark ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600"}`}
                                >
                                  Verified
                                </Badge>
                              </p>
                              <p
                                className={`text-sm mt-2 max-w-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}
                              >
                                {item.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                )}

                {activeTab === "projects" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in zoom-in-95 duration-500">
                    {projects.map((project, i) => (
                      <Card
                        key={i}
                        className={`border-none shadow-sm overflow-hidden group cursor-pointer`}
                      >
                        <div className="h-40 overflow-hidden relative">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                            <Button
                              size="sm"
                              className="rounded-full bg-white text-black hover:bg-white/90"
                            >
                              <ExternalLink className="w-4 h-4 mr-2" /> View
                              Details
                            </Button>
                          </div>
                          <Badge className="absolute top-3 right-3 bg-white/20 backdrop-blur-md border-transparent text-white">
                            {project.category}
                          </Badge>
                        </div>
                        <CardContent>
                          <div className="flex justify-between items-start">
                            <div>
                              <h4
                                className={`font-bold ${isDark ? "text-white" : "text-black"}`}
                              >
                                {project.title}
                              </h4>
                              <p
                                className={`text-xs mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}
                              >
                                {project.status}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="rounded-xl"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    <div
                      className={`border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-2 transition-all cursor-pointer min-h-[220px] ${isDark ? "border-gray-800 text-gray-500 hover:border-orange-500/50 hover:text-orange-500" : "border-gray-200 text-gray-400 hover:border-orange-500/50 hover:text-orange-500"}`}
                    >
                      <div
                        className={`p-3 rounded-2xl ${isDark ? "bg-slate-800" : "bg-gray-50"}`}
                      >
                        <Plus className="w-6 h-6" />
                      </div>
                      <span className="text-sm font-bold">Add New Project</span>
                    </div>
                  </div>
                )}

                {activeTab === "documents" && (
                  <div className="flex flex-col gap-4 animate-in fade-in duration-500">
                    <SectionHeader
                      title="Attachments"
                      icon={FileText}
                      isDark={isDark}
                    />
                    {documents.map((doc, i) => (
                      <Card
                        key={i}
                        className={`border-none shadow-sm hover:border-l-4 hover:border-orange-500 transition-all group`}
                      >
                        <CardContent className="p-4 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div
                              className={`p-3 text-orange-600 rounded-xl ${isDark ? "bg-orange-500/10" : "bg-orange-100"}`}
                            >
                              <FileText className="w-5 h-5" />
                            </div>
                            <div>
                              <h5
                                className={`font-bold text-sm tracking-tight ${isDark ? "text-white" : "text-black"}`}
                              >
                                {doc.name}
                              </h5>
                              <p
                                className={`text-[10px] uppercase font-black ${isDark ? "text-gray-400" : "text-gray-500"}`}
                              >
                                {doc.type} • {doc.size}
                              </p>
                            </div>
                          </div>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="rounded-full group-hover:text-orange-500"
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
