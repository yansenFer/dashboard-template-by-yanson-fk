import { useState } from "react";
import { useSelector } from "react-redux";
import { 
  Search, 
  Plus, 
  Minus, 
  HelpCircle, 
  Rocket, 
  ShieldCheck, 
  CreditCard, 
  MessageCircle,
  ChevronRight,
  ChevronDown,
  Mail,
  Zap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "~/components/Layout";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import type { RootState } from "~/store/store";
import { cn } from "~/lib/utils";

// --- Types ---
type Category = "All" | "General" | "Technical" | "Billing" | "Privacy";

interface FAQItem {
  id: string;
  category: Category;
  question: string;
  answer: string;
}

// --- Mock Data ---
const FAQ_DATA: FAQItem[] = [
  {
    id: "1",
    category: "General",
    question: "How do I get started with the dashboard template?",
    answer: "You can get started by installing the dependencies using `npm install` and then running the development server with `npm run dev`. Our template comes with a comprehensive setup guide in the README file to help you customize everything quickly.",
  },
  {
    id: "2",
    category: "Technical",
    question: "Can I use this template with other frameworks like Next.js?",
    answer: "Yes! While this version is built for React Router / Vite, the components are modular and written in Tailwind CSS, making it easy to port to Next.js or any other React-based framework with minimal effort.",
  },
  {
    id: "3",
    category: "General",
    question: "Is the design fully responsive?",
    answer: "Absolutely. Every page and component in this template has been meticulously designed and tested to look great on mobile, tablet, and desktop devices. We use Tailwind CSS's responsive utilities to ensure a perfect fit.",
  },
  {
    id: "4",
    category: "Billing",
    question: "What kind of license comes with this template?",
    answer: "The template comes with a standard commercial license which allows you to use it for personal or business projects. For multi-client use or resale as part of a larger product, please check our extended license options.",
  },
  {
    id: "5",
    category: "Technical",
    question: "How do I customize the theme colors?",
    answer: "All theme colors are handled via CSS variables in the `app.css` file. You can easily change the primary, secondary, and accent colors to match your brand by updating those variables.",
  },
  {
    id: "6",
    category: "Privacy",
    question: "Is my data secure with this template?",
    answer: "The template is a pure frontend layout and does not store any personal data. You are in full control of where and how you connect your backend and handle user data security.",
  },
  {
    id: "7",
    category: "Billing",
    question: "Are there any recurring costs?",
    answer: "No, this is a one-time purchase. Once you buy the template, you get lifetime access to current and future updates for that version without any additional fees.",
  },
];

const CATEGORIES: { name: Category; icon: typeof Rocket }[] = [
  { name: "All", icon: HelpCircle },
  { name: "General", icon: Rocket },
  { name: "Technical", icon: Zap },
  { name: "Billing", icon: CreditCard },
  { name: "Privacy", icon: ShieldCheck },
];

export default function Faq() {
  const isDark = useSelector((state: RootState) => state.dark.isDark);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [openItems, setOpenItems] = useState<Set<string>>(new Set(["1"]));

  const toggleItem = (id: string) => {
    const next = new Set(openItems);
    next.has(id) ? next.delete(id) : next.add(id);
    setOpenItems(next);
  };

  const filteredFaqs = FAQ_DATA.filter((faq) => {
    const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const textPrimary = isDark ? "text-white" : "text-slate-900";
  const textMuted = isDark ? "text-slate-400" : "text-slate-500";

  return (
    <Layout>
      <div className="flex flex-col gap-10 pb-20 max-w-5xl mx-auto w-full">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center gap-4 mt-8">
          <Badge className="bg-orange-500/10 text-orange-500 border-orange-500/20 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            Support Center
          </Badge>
          <h1 className={cn("text-4xl md:text-5xl font-black tracking-tight", textPrimary)}>
            How can we help you?
          </h1>
          <p className={cn("text-base max-w-xl", textMuted)}>
            Find answers to common questions about our template. Can't find what you're looking for? Reach out to our support team.
          </p>
          
          {/* Search Bar */}
          <div className="relative w-full max-w-2xl mt-4 group">
            <div className="absolute inset-0 bg-orange-500/10 blur-2xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity" />
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Search for questions, keywords, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(
                  "pl-12 pr-4 py-7 text-base rounded-2xl border-2 transition-all shadow-xl shadow-black/5",
                  isDark ? "bg-slate-900/50 border-slate-800 focus:border-orange-500/50" : "bg-white border-slate-100 focus:border-orange-500/50"
                )}
              />
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all cursor-pointer border-2",
                activeCategory === cat.name
                  ? "bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/30 -translate-y-1"
                  : isDark
                    ? "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white"
                    : "bg-white border-slate-100 text-slate-500 hover:border-orange-200 hover:text-orange-500"
              )}
            >
              <cat.icon className="w-4 h-4" />
              {cat.name}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="grid gap-4">
          <AnimatePresence mode="popLayout">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => {
                const isOpen = openItems.has(faq.id);
                return (
                  <motion.div
                    key={faq.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card
                      active={isOpen}
                      onClick={() => toggleItem(faq.id)}
                      className={cn(
                        "transition-all duration-300 cursor-pointer p-0! overflow-hidden border-none shadow-sm",
                        isOpen ? "shadow-xl ring-1 ring-orange-500/20" : "hover:scale-[1.01]"
                      )}
                    >
                      <div className="p-6 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors",
                            isOpen ? "bg-orange-500 text-white" : isDark ? "bg-slate-800 text-slate-400" : "bg-slate-100 text-slate-500"
                          )}>
                            <HelpCircle className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className={cn("text-lg font-bold", textPrimary)}>
                              {faq.question}
                            </h3>
                            {!isOpen && (
                              <p className={cn("text-xs font-semibold mt-1 uppercase tracking-widest", textMuted)}>
                                {faq.category}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center transition-all",
                          isOpen ? "bg-orange-500 text-white rotate-180 shadow-lg" : isDark ? "bg-slate-800 text-slate-500" : "bg-slate-100 text-slate-400"
                        )}>
                          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </div>
                      </div>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            <div className={cn("px-8 pb-8 pt-2", textMuted)}>
                              <div className={cn("border-l-2 border-orange-500/30 pl-6 py-2 leading-relaxed text-base italic whitespace-pre-line")}>
                                {faq.answer}
                              </div>
                              <div className="mt-6 flex items-center gap-3">
                                <span className="text-xs font-bold uppercase tracking-widest">Was this helpful?</span>
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm" className="h-8 rounded-lg px-4 hover:bg-orange-500 hover:text-white transition-all">Yes</Button>
                                  <Button variant="outline" size="sm" className="h-8 rounded-lg px-4 hover:bg-orange-500 hover:text-white transition-all">No</Button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card>
                  </motion.div>
                );
              })
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 gap-4"
              >
                <div className={cn("w-20 h-20 rounded-3xl flex items-center justify-center", isDark ? "bg-slate-900 border border-slate-800" : "bg-slate-50 border border-slate-100")}>
                  <Search className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className={cn("text-xl font-bold", textPrimary)}>No results found</h3>
                <p className={cn("text-sm max-w-xs text-center", textMuted)}>
                  We couldn't find any questions matching your search for "{searchQuery}". Try using different keywords.
                </p>
                <Button 
                  variant="link" 
                  className="text-orange-500 font-bold"
                  onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                >
                  Clear all filters
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Support Section */}
        <div className={cn(
          "relative mt-10 rounded-[2.5rem] overflow-hidden p-8 md:p-12",
          isDark ? "bg-slate-900 border border-slate-800" : "bg-slate-50 border border-slate-100"
        )}>
          {/* Background decoration */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-500/10 blur-[80px] rounded-full" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col gap-3 text-center md:text-left">
              <h2 className={cn("text-2xl md:text-3xl font-black tracking-tight", textPrimary)}>
                Still have questions?
              </h2>
              <p className={cn("text-sm max-w-sm", textMuted)}>
                Our dedicated support team is here to help you solve any issues and answer your questions.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button className="h-14 px-8 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white shadow-xl shadow-orange-500/20 gap-2 font-bold text-base transition-all hover:scale-105 active:scale-95">
                <MessageCircle className="w-5 h-5" />
                Live Chat Support
              </Button>
              <Button variant="outline" className={cn(
                "h-14 px-8 rounded-2xl gap-2 font-bold text-base transition-all border-2 hover:scale-105 active:scale-95",
                "hover:bg-orange-500 hover:text-white hover:border-orange-500",
                isDark ? "text-white border-slate-700" : "text-slate-900 border-slate-200"
              )}>
                <Mail className="w-5 h-5" />
                Email Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
