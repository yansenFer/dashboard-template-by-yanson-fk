import {
  Building2,
  Calendar,
  Check,
  ChevronRight,
  Clock,
  Download,
  Eye,
  FileText,
  Mail,
  Pen,
  Phone,
  Plus,
  Printer,
  Save,
  Search,
  Upload,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Layout from "~/components/Layout";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { cn } from "~/lib/utils";
import type { RootState } from "~/store/store";

// --- Types ---
type InvoiceStatus = "Paid" | "Unpaid" | "Draft" | "Overdue";

interface InvoiceItem {
  type: string;
  description: string;
  qty: number;
  unitPrice: number;
}

interface Invoice {
  id: string;
  invoiceNo: string;
  date: string;
  recipient: string;
  email: string;
  status: InvoiceStatus;
  amount: number;
  projectId: string;
  issueDate: string;
  dueDate: string;
  billedTo: {
    name: string;
    address: string;
    tel: string;
    email: string;
  };
  items: InvoiceItem[];
  notes: string;
  taxRate: number;
}

// --- Mock Data ---
const companyInfo = {
  name: "Yanson Dashboard, Inc.",
  address: "201 Something St., Something Town, YT 242, Country 6546",
  tel: "Tel No: +62 813 8400 4840",
  email: "Email: yansenferdinand6@gmail.com",
};

const invoices: Invoice[] = [
  {
    id: "1",
    invoiceNo: "INV-002300",
    date: "Oct 25",
    recipient: "Alex Johnson",
    email: "alex@techcorp.com",
    status: "Paid",
    amount: 4750,
    projectId: "921021",
    issueDate: "November 21, 2024",
    dueDate: "November 30, 2024",
    billedTo: {
      name: "Alex Johnson",
      address: "4033 Patterson Road, Staten Island, NY 10301",
      tel: "Tel No: 324 445-4544",
      email: "Email: alex@techcorp.com",
    },
    items: [
      {
        type: "Website Design",
        description:
          "Full UI/UX design for the company's main website including wireframes and prototypes.",
        qty: 2,
        unitPrice: 150,
      },
      {
        type: "Firebase Plugin",
        description:
          "Backend authentication and real-time database integration with Firebase.",
        qty: 1,
        unitPrice: 1200,
      },
      {
        type: "iPhone App",
        description:
          "Native iOS application development with clean architecture and smooth UX.",
        qty: 2,
        unitPrice: 850,
      },
    ],
    notes:
      "Thank you for your business. Payment is due within 30 days. Late payments may be subject to a 1.5% monthly fee.",
    taxRate: 5.4,
  },
  {
    id: "2",
    invoiceNo: "INV-002299",
    date: "Oct 25",
    recipient: "Huma Therman",
    email: "huma@clariesup.au",
    status: "Unpaid",
    amount: 780,
    projectId: "435423",
    issueDate: "October 15, 2024",
    dueDate: "October 25, 2024",
    billedTo: {
      name: "Huma Therman",
      address: "5210 Claries Avenue, Melbourne, AU 3001",
      tel: "Tel No: 613 9000-1234",
      email: "Email: huma@clariesup.au",
    },
    items: [
      {
        type: "Branding Package",
        description:
          "Logo design, color palette, typography system and brand guidelines.",
        qty: 1,
        unitPrice: 780,
      },
    ],
    notes:
      "Payment is overdue. Please settle the balance immediately to avoid service interruption.",
    taxRate: 0,
  },
  {
    id: "3",
    invoiceNo: "INV-002298",
    date: "Oct 25",
    recipient: "Charlie Chaplin",
    email: "charlie@leernoca.monster",
    status: "Paid",
    amount: 567,
    projectId: "785412",
    issueDate: "September 10, 2024",
    dueDate: "September 20, 2024",
    billedTo: {
      name: "Charlie Chaplin",
      address: "100 Comedy Lane, Hollywood, CA 90028",
      tel: "Tel No: 213 555-0100",
      email: "Email: charlie@leernoca.monster",
    },
    items: [
      {
        type: "SEO Optimization",
        description:
          "Technical SEO audit, on-page optimization, and performance improvements.",
        qty: 3,
        unitPrice: 189,
      },
    ],
    notes: "Thank you for your business.",
    taxRate: 0,
  },
  {
    id: "4",
    invoiceNo: "INV-002297",
    date: "Oct 25",
    recipient: "Winston Churchill",
    email: "winston@worthniza.ga",
    status: "Overdue",
    amount: 1500,
    projectId: "369258",
    issueDate: "August 01, 2024",
    dueDate: "September 12, 2024",
    billedTo: {
      name: "Winston Churchill",
      address: "10 Downing Street, London, UK SW1A 2AA",
      tel: "Tel No: 44 20-7925-0918",
      email: "Email: winston@worthniza.ga",
    },
    items: [
      {
        type: "Android App",
        description:
          "Full-featured Android application with offline support and push notifications.",
        qty: 1,
        unitPrice: 1500,
      },
    ],
    notes:
      "This invoice is overdue. Please contact us immediately to arrange payment.",
    taxRate: 0,
  },
  {
    id: "5",
    invoiceNo: "INV-002296",
    date: "Jun 24",
    recipient: "Danial Craig",
    email: "danialc@jampack.com",
    status: "Paid",
    amount: 2300,
    projectId: "147852",
    issueDate: "June 24, 2024",
    dueDate: "July 4, 2024",
    billedTo: {
      name: "Danial Craig",
      address: "007 Bond Street, London, UK EC2A 4NE",
      tel: "Tel No: 44 20-7946-0007",
      email: "Email: danialc@jampack.com",
    },
    items: [
      {
        type: "Web Application",
        description:
          "Full-stack web application with React frontend and Node.js backend.",
        qty: 1,
        unitPrice: 2300,
      },
    ],
    notes: "Thank you for your continued partnership.",
    taxRate: 5.4,
  },
  {
    id: "6",
    invoiceNo: "INV-002295",
    date: "Jun 24",
    recipient: "Katharine Jones",
    email: "joneskath@jampack.com",
    status: "Draft",
    amount: 7650,
    projectId: "258963",
    issueDate: "June 18, 2024",
    dueDate: "July 18, 2024",
    billedTo: {
      name: "Katharine Jones",
      address: "88 Fashion Ave, New York, NY 10018",
      tel: "Tel No: 212 555-9999",
      email: "Email: joneskath@jampack.com",
    },
    items: [
      {
        type: "E-Commerce Platform",
        description:
          "Complete e-commerce solution with payment gateway, inventory management, and admin panel.",
        qty: 1,
        unitPrice: 4500,
      },
      {
        type: "Mobile App (iOS + Android)",
        description: "Cross-platform mobile app using React Native.",
        qty: 3,
        unitPrice: 1050,
      },
    ],
    notes: "Draft — not yet sent to client.",
    taxRate: 0,
  },
];

// --- Helper ---
const statusConfig: Record<
  InvoiceStatus,
  { label: string; className: string; icon: typeof Check }
> = {
  Paid: {
    label: "Paid",
    className:
      "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:bg-emerald-500/15 dark:text-emerald-400 dark:border-emerald-500/25",
    icon: Check,
  },
  Unpaid: {
    label: "Unpaid",
    className:
      "bg-rose-500/10 text-rose-600 border-rose-500/20 dark:bg-rose-500/15 dark:text-rose-400 dark:border-rose-500/25",
    icon: Clock,
  },
  Draft: {
    label: "Draft",
    className:
      "bg-slate-500/10 text-slate-600 border-slate-500/20 dark:bg-slate-400/15 dark:text-slate-300 dark:border-slate-400/25",
    icon: FileText,
  },
  Overdue: {
    label: "Overdue",
    className:
      "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:bg-amber-500/15 dark:text-amber-400 dark:border-amber-500/25",
    icon: X,
  },
};

function formatCurrency(amount: number) {
  return `$${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

// --- Sub-components ---
function StatusBadge({ status }: { status: InvoiceStatus }) {
  const config = statusConfig[status];
  const Icon = config.icon;
  return (
    <Badge
      className={cn(
        "gap-1 border text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full",
        config.className,
      )}
    >
      <Icon className="w-3 h-3" />
      {config.label}
    </Badge>
  );
}

// --- Create Invoice Form Types ---
interface CreateLineItem {
  id: string;
  item: string;
  description: string;
  qty: number;
  price: number;
  discount: number;
  discountType: "%" | "flat";
}

interface TermRow {
  id: string;
  text: string;
}

const emptyLineItem = (): CreateLineItem => ({
  id: crypto.randomUUID(),
  item: "",
  description: "",
  qty: 1,
  price: 0,
  discount: 0,
  discountType: "%",
});

const emptyTerm = (): TermRow => ({
  id: crypto.randomUUID(),
  text: "",
});

export default function Invoice() {
  const isDark = useSelector((state: RootState) => state.dark.isDark);
  const [selectedId, setSelectedId] = useState<string>("1");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  // --- Create form state ---
  const [formInvoiceNo, setFormInvoiceNo] = useState("INV-002301");
  const [formInvoiceDate, setFormInvoiceDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [formDueDate, setFormDueDate] = useState("receipt");
  const [formCustomerNo, setFormCustomerNo] = useState("");
  const [formBilledTo, setFormBilledTo] = useState("");
  const [formShipTo, setFormShipTo] = useState("");
  const [formCurrency, setFormCurrency] = useState("USD");
  const [formTaxRate, setFormTaxRate] = useState(0);
  const [lineItems, setLineItems] = useState<CreateLineItem[]>([
    emptyLineItem(),
  ]);
  const [formNotes, setFormNotes] = useState("");
  const [formTerms, setFormTerms] = useState<TermRow[]>([
    {
      id: crypto.randomUUID(),
      text: "Payment is due within 15 days from the date of invoice.",
    },
  ]);
  const [formMemo, setFormMemo] = useState("");

  // --- Helpers ---
  const addLineItem = () => setLineItems((prev) => [...prev, emptyLineItem()]);
  const removeLineItem = (id: string) =>
    setLineItems((prev) => prev.filter((li) => li.id !== id));
  const updateLineItem = (
    id: string,
    field: keyof CreateLineItem,
    value: string | number,
  ) =>
    setLineItems((prev) =>
      prev.map((li) => (li.id === id ? { ...li, [field]: value } : li)),
    );
  const addTermRow = () => setFormTerms((prev) => [...prev, emptyTerm()]);
  const removeTermRow = (id: string) =>
    setFormTerms((prev) => prev.filter((t) => t.id !== id));
  const updateTermRow = (id: string, text: string) =>
    setFormTerms((prev) => prev.map((t) => (t.id === id ? { ...t, text } : t)));

  const calcLineAmount = (li: CreateLineItem) => {
    const base = li.qty * li.price;
    if (li.discountType === "%") return base - base * (li.discount / 100);
    return base - li.discount;
  };

  const formSubtotal = lineItems.reduce(
    (acc, li) => acc + calcLineAmount(li),
    0,
  );
  const formTaxAmount = formSubtotal * (formTaxRate / 100);
  const formTotal = formSubtotal + formTaxAmount;

  const selected = invoices.find((inv) => inv.id === selectedId) ?? invoices[0];
  const filtered = invoices.filter(
    (inv) =>
      inv.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.recipient.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const subtotal = selected.items.reduce(
    (acc, item) => acc + item.qty * item.unitPrice,
    0,
  );
  const taxAmount = subtotal * (selected.taxRate / 100);
  const total = subtotal + taxAmount;

  const textPrimary = isDark ? "text-white" : "text-slate-900";
  const textMuted = isDark ? "text-slate-400" : "text-slate-500";
  const dividerColor = isDark ? "border-slate-800" : "border-slate-100";
  const hoverRow = isDark ? "hover:bg-slate-700/60" : "hover:bg-slate-50";

  return (
    <Layout>
      <div className="flex flex-col gap-6 pb-10 w-full min-w-0">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1
              className={`text-2xl font-extrabold tracking-tight ${textPrimary}`}
            >
              Invoices
            </h1>
            <p className={`text-sm ${textMuted}`}>
              Manage and track all your invoices in one place.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className={`gap-2 rounded-xl ${isDark ? "text-white border-slate-600" : ""}`}
            >
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
            <Button
              size="sm"
              className="gap-2 rounded-xl shadow-lg shadow-orange-500/20"
              onClick={() => setIsCreating(true)}
            >
              <Plus className="w-4 h-4" />
              New Invoice
            </Button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col lg:flex-row gap-6 min-h-[700px] w-full min-w-0">
          {/* ── Left Panel: Invoice List ── */}
          <Card className="w-full lg:w-[320px] flex-shrink-0 flex flex-col border-none shadow-sm overflow-hidden p-0! h-fit max-h-200">
            {/* Search */}
            <div className={`px-4 py-3 border-b ${dividerColor}`}>
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  size={16}
                  color={isDark ? "white" : "black"}
                />
                <Input
                  type="text"
                  placeholder="Search invoices..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* List label */}
            <div className={`px-4 pt-4 pb-2`}>
              <p
                className={`text-[10px] uppercase tracking-widest font-black ${textMuted}`}
              >
                My Invoices ({filtered.length})
              </p>
            </div>

            {/* Invoice items */}
            <div className="flex-1 overflow-y-auto">
              {filtered.map((inv) => (
                <button
                  key={inv.id}
                  onClick={() => {
                    setSelectedId(inv.id);
                    setIsCreating(false);
                  }}
                  className={`w-full text-left px-4 py-3.5 border-b transition-all cursor-pointer ${dividerColor} ${hoverRow} ${
                    selectedId === inv.id && !isCreating
                      ? `border-l-[3px] !border-l-orange-500 ${
                          isDark ? "bg-orange-500/5" : "bg-orange-50/60"
                        }`
                      : "border-l-[3px] border-l-transparent"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-xl flex-shrink-0 ${
                          isDark ? "bg-slate-700" : "bg-slate-100"
                        }`}
                      >
                        <FileText
                          className={`w-4 h-4 ${
                            selectedId === inv.id
                              ? "text-orange-500"
                              : textMuted
                          }`}
                        />
                      </div>
                      <div>
                        <p
                          className={`text-sm font-bold leading-tight ${
                            selectedId === inv.id
                              ? "text-orange-500"
                              : textPrimary
                          }`}
                        >
                          {inv.invoiceNo}
                        </p>
                        <p className={`text-xs mt-0.5 ${textMuted}`}>
                          {inv.recipient}
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-black text-orange-500">
                        {formatCurrency(inv.amount)}
                      </p>
                      <p className={`text-[10px] mt-0.5 ${textMuted}`}>
                        {inv.date}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 ml-11">
                    <StatusBadge status={inv.status} />
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {/* ── Right Panel ── */}
          <div className="flex-1 flex flex-col gap-4 min-w-0 w-full">
            {isCreating ? (
              /* ═══════════════ CREATE INVOICE FORM ═══════════════ */
              <>
                {/* Action Bar */}
                <Card className="border-none shadow-sm overflow-hidden p-0!">
                  <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-5 py-3.5 gap-4 border-none">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-xl ${
                          isDark ? "bg-slate-800" : "bg-orange-50"
                        }`}
                      >
                        <Plus className="w-5 h-5 text-orange-500" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <div className="w-1 h-6 bg-orange-500 rounded-full" />
                          <p className={`font-black text-base ${textPrimary}`}>
                            Create New Invoice
                          </p>
                        </div>
                        <p className={`text-xs mt-0.5 ${textMuted}`}>
                          Fill in the details to generate a new invoice
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className={`gap-2 rounded-xl ${isDark ? "text-white border-slate-600" : ""}`}
                        onClick={() => setIsCreating(false)}
                      >
                        <X className="w-4 h-4" /> Cancel
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className={`gap-2 rounded-xl ${isDark ? "text-white border-slate-600" : ""}`}
                      >
                        <Eye className="w-4 h-4" /> Preview
                      </Button>
                      <Button
                        size="sm"
                        className="gap-2 rounded-xl shadow-lg shadow-orange-500/20"
                      >
                        <Save className="w-4 h-4" /> Save Invoice
                      </Button>
                    </div>
                  </CardHeader>
                </Card>

                {/* Form Body */}
                <Card className="flex-1 border-none shadow-sm overflow-hidden p-0!">
                  <div className="flex flex-col h-full overflow-y-auto">
                    {/* Company Header + Upload */}
                    <div
                      className={`px-4 sm:px-8 py-6 border-b ${dividerColor} flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-4`}
                    >
                      <div
                        className={`w-40 h-28 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${
                          isDark
                            ? "border-slate-700 hover:border-orange-500/50 text-slate-500"
                            : "border-slate-200 hover:border-orange-500/50 text-slate-400"
                        }`}
                      >
                        <Upload className="w-5 h-5" />
                        <span className="text-xs font-medium">Upload Logo</span>
                      </div>
                      <div className="w-full sm:w-auto text-left sm:text-right">
                        <p
                          className={`text-3xl sm:text-5xl font-black tracking-tighter ${
                            isDark ? "text-white/20" : "text-slate-200"
                          }`}
                        >
                          INVOICE
                        </p>
                      </div>
                    </div>

                    {/* Business Info + Invoice Meta */}
                    <div
                      className={`px-8 py-6 grid grid-cols-2 gap-8 border-b ${dividerColor}`}
                    >
                      {/* Left: Your business info */}
                      <div className="flex flex-col gap-3">
                        <header className="flex items-center gap-3 mb-1">
                          <div className="w-1 h-6 bg-orange-500 rounded-full" />
                          <CardTitle
                            className={`text-lg flex items-center gap-2 ${isDark ? "text-white" : "text-black"}`}
                          >
                            <Building2
                              className={`w-5 h-5 ${isDark ? "text-slate-400" : "text-slate-600"}`}
                              strokeWidth={2.5}
                            />
                            Your Business
                          </CardTitle>
                        </header>
                        <p className={`font-bold text-sm ${textPrimary}`}>
                          {companyInfo.name}
                        </p>
                        <p className={`text-xs ${textMuted}`}>
                          {companyInfo.address}
                        </p>
                        <p className={`text-xs ${textMuted}`}>
                          {companyInfo.tel}
                        </p>
                        <p className={`text-xs ${textMuted}`}>
                          {companyInfo.email}
                        </p>
                        <button className="flex items-center gap-1.5 text-xs font-semibold text-orange-500 mt-1 hover:text-orange-600 transition-colors w-fit cursor-pointer">
                          <Pen className="w-3 h-3" /> Edit Info
                        </button>
                      </div>

                      {/* Right: Invoice metadata */}
                      <div className="flex flex-col gap-3">
                        <header className="flex items-center gap-3 mb-1">
                          <div className="w-1 h-6 bg-orange-500 rounded-full" />
                          <CardTitle
                            className={`text-lg flex items-center gap-2 ${isDark ? "text-white" : "text-black"}`}
                          >
                            <FileText
                              className={`w-5 h-5 ${isDark ? "text-slate-400" : "text-slate-600"}`}
                              strokeWidth={2.5}
                            />
                            Invoice Details
                          </CardTitle>
                        </header>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="flex flex-col gap-1.5">
                            <Label className={`text-xs ${textMuted}`}>
                              Invoice No *
                            </Label>
                            <Input
                              value={formInvoiceNo}
                              onChange={(e) => setFormInvoiceNo(e.target.value)}
                            />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <Label className={`text-xs ${textMuted}`}>
                              Invoice Date *
                            </Label>
                            <Input
                              type="date"
                              value={formInvoiceDate}
                              onChange={(e) =>
                                setFormInvoiceDate(e.target.value)
                              }
                            />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <Label className={`text-xs ${textMuted}`}>
                              Due Date *
                            </Label>
                            <Select
                              value={formDueDate}
                              onValueChange={setFormDueDate}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="receipt">
                                  Due on Receipt
                                </SelectItem>
                                <SelectItem value="15">Net 15</SelectItem>
                                <SelectItem value="30">Net 30</SelectItem>
                                <SelectItem value="60">Net 60</SelectItem>
                                <SelectItem value="90">Net 90</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <Label className={`text-xs ${textMuted}`}>
                              Customer No
                            </Label>
                            <Input
                              value={formCustomerNo}
                              onChange={(e) =>
                                setFormCustomerNo(e.target.value)
                              }
                              placeholder="e.g. 32321"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Billed To / Ship To */}
                    <div
                      className={`px-8 py-6 grid grid-cols-2 gap-8 border-b ${dividerColor}`}
                    >
                      <div className="flex flex-col gap-3">
                        <header className="flex items-center gap-3 mb-1">
                          <div className="w-1 h-6 bg-orange-500 rounded-full" />
                          <CardTitle
                            className={`text-lg flex items-center gap-2 ${isDark ? "text-white" : "text-black"}`}
                          >
                            <User
                              className={`w-5 h-5 ${isDark ? "text-slate-400" : "text-slate-600"}`}
                              strokeWidth={2.5}
                            />
                            Billed To
                          </CardTitle>
                        </header>
                        <Select
                          value={formBilledTo}
                          onValueChange={setFormBilledTo}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a client" />
                          </SelectTrigger>
                          <SelectContent>
                            {invoices.map((inv) => (
                              <SelectItem
                                key={inv.id}
                                value={inv.billedTo.name}
                              >
                                {inv.billedTo.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <button className="flex items-center gap-1.5 text-xs font-semibold text-orange-500 hover:text-orange-600 transition-colors w-fit cursor-pointer">
                          <Plus className="w-3 h-3" /> Add new client
                        </button>
                        {formBilledTo && (
                          <div
                            className={`mt-1 p-3 rounded-xl border ${dividerColor}`}
                          >
                            <p className={`font-bold text-sm ${textPrimary}`}>
                              {formBilledTo}
                            </p>
                            <p className={`text-xs mt-1 ${textMuted}`}>
                              {
                                invoices.find(
                                  (i) => i.billedTo.name === formBilledTo,
                                )?.billedTo.address
                              }
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-3">
                        <header className="flex items-center gap-3 mb-1">
                          <div className="w-1 h-6 bg-orange-500 rounded-full" />
                          <CardTitle
                            className={`text-lg flex items-center gap-2 ${isDark ? "text-white" : "text-black"}`}
                          >
                            <Building2
                              className={`w-5 h-5 ${isDark ? "text-slate-400" : "text-slate-600"}`}
                              strokeWidth={2.5}
                            />
                            Ship To
                          </CardTitle>
                        </header>
                        <Input
                          value={formShipTo}
                          onChange={(e) => setFormShipTo(e.target.value)}
                          placeholder="Enter shipping address"
                        />
                        <button className="flex items-center gap-1.5 text-xs font-semibold text-orange-500 hover:text-orange-600 transition-colors w-fit cursor-pointer">
                          <Plus className="w-3 h-3" /> Add shipping address
                        </button>
                      </div>
                    </div>

                    {/* Filters Row */}
                    <div
                      className={`px-8 py-4 border-b ${dividerColor} flex items-center gap-4`}
                    >
                      <span
                        className={`text-xs font-black uppercase tracking-widest ${textMuted}`}
                      >
                        Filters
                      </span>
                      <Select
                        value={formCurrency}
                        onValueChange={setFormCurrency}
                      >
                        <SelectTrigger className="w-fit">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">US Dollar ($ USD)</SelectItem>
                          <SelectItem value="EUR">Euro (€ EUR)</SelectItem>
                          <SelectItem value="GBP">
                            British Pound (£ GBP)
                          </SelectItem>
                          <SelectItem value="IDR">
                            Indonesian Rupiah (Rp IDR)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Line Items Table */}
                    <div className="px-4 sm:px-8 py-6 overflow-x-auto">
                      {/* Table Header */}
                      <div className="grid grid-cols-12 gap-3 pb-3 text-[10px] uppercase tracking-widest font-black min-w-[800px]">
                        <div
                          className={`col-span-4 px-3 py-2 rounded-l-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white`}
                        >
                          Item
                        </div>
                        <div className="col-span-1 px-2 py-2 bg-gradient-to-r from-orange-600 to-orange-600 text-white text-center">
                          Qty
                        </div>
                        <div className="col-span-2 px-2 py-2 bg-orange-600 text-white text-center">
                          Price
                        </div>
                        <div className="col-span-2 px-2 py-2 bg-orange-600 text-white text-center">
                          Discount
                        </div>
                        <div className="col-span-2 px-2 py-2 bg-gradient-to-r from-orange-600 to-orange-500 text-white text-right">
                          Amount
                        </div>
                        <div className="col-span-1 rounded-r-lg bg-orange-500 py-2" />
                      </div>

                      {/* Rows */}
                      <div className="flex flex-col gap-3 mt-3 min-w-[800px]">
                        {lineItems.map((li, idx) => {
                          const amount = calcLineAmount(li);
                          return (
                            <div
                              key={li.id}
                              className={`rounded-xl border p-4 ${dividerColor}`}
                            >
                              <div className="grid grid-cols-12 gap-3 items-center">
                                <div className="col-span-4">
                                  <Input
                                    value={li.item}
                                    onChange={(e) =>
                                      updateLineItem(
                                        li.id,
                                        "item",
                                        e.target.value,
                                      )
                                    }
                                    placeholder="Item name"
                                  />
                                </div>
                                <div className="col-span-1">
                                  <Input
                                    type="number"
                                    value={li.qty}
                                    onChange={(e) =>
                                      updateLineItem(
                                        li.id,
                                        "qty",
                                        Number(e.target.value),
                                      )
                                    }
                                    className="text-center"
                                    min={1}
                                  />
                                </div>
                                <div className="col-span-2">
                                  <Input
                                    type="number"
                                    value={li.price}
                                    onChange={(e) =>
                                      updateLineItem(
                                        li.id,
                                        "price",
                                        Number(e.target.value),
                                      )
                                    }
                                    min={0}
                                  />
                                </div>
                                <div className="col-span-2 flex items-center gap-1">
                                  <Input
                                    type="number"
                                    value={li.discount}
                                    onChange={(e) =>
                                      updateLineItem(
                                        li.id,
                                        "discount",
                                        Number(e.target.value),
                                      )
                                    }
                                    className="flex-1"
                                    min={0}
                                  />
                                  <Select
                                    value={li.discountType}
                                    onValueChange={(v) =>
                                      updateLineItem(li.id, "discountType", v)
                                    }
                                  >
                                    <SelectTrigger className="w-16">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="%">%</SelectItem>
                                      <SelectItem value="flat">$</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div
                                  className={`col-span-2 text-right text-sm font-black text-orange-500`}
                                >
                                  {formatCurrency(amount)}
                                </div>
                                <div className="col-span-1 flex justify-center">
                                  {lineItems.length > 1 && (
                                    <button
                                      onClick={() => removeLineItem(li.id)}
                                      className="p-1.5 rounded-lg text-red-400 hover:text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                                    >
                                      <X className="w-4 h-4" />
                                    </button>
                                  )}
                                </div>
                              </div>
                              {/* Description row */}
                              <div className="mt-3 col-span-12">
                                <Input
                                  value={li.description}
                                  onChange={(e) =>
                                    updateLineItem(
                                      li.id,
                                      "description",
                                      e.target.value,
                                    )
                                  }
                                  placeholder="Description (optional)"
                                  className="text-xs"
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Add new item */}
                      <button
                        onClick={addLineItem}
                        className="flex items-center gap-1.5 text-xs font-semibold text-orange-500 hover:text-orange-600 transition-colors mt-4 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add new item
                      </button>
                    </div>

                    {/* Summary & Totals */}
                    <div className="px-8 pb-6">
                      <div
                        className={`rounded-2xl overflow-hidden ${dividerColor} ml-auto max-w-sm`}
                      >
                        <div className="flex flex-col divide-y divide-border">
                          <div
                            className={`flex items-center justify-between px-5 py-3 ${isDark ? "bg-slate-800/40" : "bg-slate-50"}`}
                          >
                            <span
                              className={`text-xs font-semibold ${textMuted}`}
                            >
                              Subtotal
                            </span>
                            <span
                              className={`text-sm font-black text-orange-500`}
                            >
                              {formatCurrency(formSubtotal)}
                            </span>
                          </div>
                          <div
                            className={`flex items-center justify-between px-5 py-3 gap-3 ${isDark ? "bg-slate-800/40" : "bg-slate-50"}`}
                          >
                            <span
                              className={`text-xs font-semibold ${textMuted}`}
                            >
                              Tax
                            </span>
                            <div className="flex items-center gap-2">
                              <Input
                                type="number"
                                value={formTaxRate}
                                onChange={(e) =>
                                  setFormTaxRate(Number(e.target.value))
                                }
                                className="w-16 text-center text-xs h-7"
                                min={0}
                              />
                              <span className={`text-xs ${textMuted}`}>%</span>
                              <span
                                className={`text-sm font-semibold ${textPrimary}`}
                              >
                                {formatCurrency(formTaxAmount)}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between px-5 py-3 bg-gradient-to-r from-orange-500 to-orange-600">
                            <span className="text-xs font-black text-orange-100 uppercase tracking-widest">
                              Total
                            </span>
                            <span className="text-lg font-black text-white">
                              {formatCurrency(formTotal)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Notes */}
                    <div className={`px-8 py-6 border-t ${dividerColor}`}>
                      <header className="flex items-center gap-3 mb-3">
                        <div className="w-1 h-6 bg-orange-500 rounded-full" />
                        <CardTitle
                          className={`text-lg flex items-center gap-2 ${isDark ? "text-white" : "text-black"}`}
                        >
                          <FileText
                            className={`w-5 h-5 ${isDark ? "text-slate-400" : "text-slate-600"}`}
                            strokeWidth={2.5}
                          />
                          Note to Client
                        </CardTitle>
                      </header>
                      <Textarea
                        value={formNotes}
                        onChange={(e) => setFormNotes(e.target.value)}
                        placeholder="Write an internal note..."
                        rows={3}
                      />
                    </div>

                    {/* Terms & Conditions */}
                    <div className={`px-8 py-6 border-t ${dividerColor}`}>
                      <header className="flex items-center gap-3 mb-3">
                        <div className="w-1 h-6 bg-orange-500 rounded-full" />
                        <CardTitle
                          className={`text-lg flex items-center gap-2 ${isDark ? "text-white" : "text-black"}`}
                        >
                          <Check
                            className={`w-5 h-5 ${isDark ? "text-slate-400" : "text-slate-600"}`}
                            strokeWidth={2.5}
                          />
                          Terms & Conditions
                        </CardTitle>
                      </header>
                      <div className="flex flex-col gap-3">
                        {formTerms.map((term, idx) => (
                          <div
                            key={term.id}
                            className="flex items-center gap-3"
                          >
                            <span
                              className={`text-xs font-bold w-5 text-right flex-shrink-0 ${textMuted}`}
                            >
                              {idx + 1}.
                            </span>
                            <Input
                              value={term.text}
                              onChange={(e) =>
                                updateTermRow(term.id, e.target.value)
                              }
                              placeholder="Enter a term or condition..."
                              className="flex-1"
                            />
                            {formTerms.length > 1 && (
                              <button
                                onClick={() => removeTermRow(term.id)}
                                className="p-1.5 rounded-lg text-red-400 hover:text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          onClick={addTermRow}
                          className="flex items-center gap-1.5 text-xs font-semibold text-orange-500 hover:text-orange-600 transition-colors w-fit cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add New Term Row
                        </button>
                      </div>
                    </div>

                    {/* Personal Memo */}
                    <div className={`px-8 py-6 border-t ${dividerColor}`}>
                      <header className="flex items-center gap-3 mb-3">
                        <div className="w-1 h-6 bg-orange-500 rounded-full" />
                        <CardTitle
                          className={`text-lg flex items-center gap-2 ${isDark ? "text-white" : "text-black"}`}
                        >
                          <Pen
                            className={`w-5 h-5 ${isDark ? "text-slate-400" : "text-slate-600"}`}
                            strokeWidth={2.5}
                          />
                          Personal Memo
                        </CardTitle>
                        <span className={`text-xs ${textMuted} ml-auto`}>
                          {1400 - formMemo.length}
                        </span>
                      </header>
                      <Textarea
                        value={formMemo}
                        onChange={(e) =>
                          setFormMemo(e.target.value.slice(0, 1400))
                        }
                        placeholder="Write an internal note..."
                        rows={4}
                        maxLength={1400}
                      />
                    </div>
                  </div>
                </Card>
              </>
            ) : (
              /* ═══════════════ INVOICE DETAIL VIEW ═══════════════ */
              <>
                {/* Action Bar */}
                <Card className="border-none shadow-sm overflow-hidden p-0!">
                  <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-5 py-3.5 gap-4 border-none">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-xl ${
                          isDark ? "bg-slate-800" : "bg-orange-50"
                        }`}
                      >
                        <FileText className="w-5 h-5 text-orange-500" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <div className="w-1 h-6 bg-orange-500 rounded-full" />
                          <p className={`font-black text-base ${textPrimary}`}>
                            {selected.invoiceNo}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <p className={`text-xs ${textMuted}`}>
                            Project #{selected.projectId}
                          </p>
                          <span className={`text-xs ${textMuted}`}>·</span>
                          <StatusBadge status={selected.status} />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className={`gap-2 rounded-xl ${isDark ? "text-white border-slate-600" : ""}`}
                      >
                        <Printer className="w-4 h-4" /> Print
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className={`gap-2 rounded-xl ${isDark ? "text-white border-slate-600" : ""}`}
                      >
                        <Download className="w-4 h-4" /> Export PDF
                      </Button>
                      <Button
                        size="sm"
                        className="gap-2 rounded-xl shadow-lg shadow-orange-500/20"
                      >
                        <Check className="w-4 h-4" /> Mark as Paid
                      </Button>
                    </div>
                  </CardHeader>
                </Card>

                {/* Invoice Card */}
                <Card className="flex-1 border-none shadow-sm overflow-hidden p-0!">
                  <div className="flex flex-col h-full">
                    {/* Company Header */}
                    <div
                      className={`px-4 sm:px-8 py-6 border-b ${dividerColor} flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-4`}
                    >
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-sm shadow-orange-500/30">
                            <Building2 className="w-4 h-4 text-white" />
                          </div>
                          <span
                            className={`text-lg font-extrabold tracking-tight ${textPrimary}`}
                          >
                            {companyInfo.name}
                          </span>
                        </div>
                        <p className={`text-xs ${textMuted}`}>
                          {companyInfo.address}
                        </p>
                        <p className={`text-xs ${textMuted}`}>
                          {companyInfo.tel}
                        </p>
                        <p className={`text-xs ${textMuted}`}>
                          {companyInfo.email}
                        </p>
                      </div>
                      <div className="w-full sm:w-auto text-left sm:text-right">
                        <p
                          className={`text-3xl sm:text-5xl font-black tracking-tighter ${
                            isDark ? "text-white/20" : "text-slate-200"
                          }`}
                        >
                          INVOICE
                        </p>
                      </div>
                    </div>

                    {/* Billed To + Invoice Info */}
                    <div
                      className={`px-4 sm:px-8 py-6 grid grid-cols-1 md:grid-cols-2 gap-8 border-b ${dividerColor}`}
                    >
                      {/* Billed To */}
                      <div className="flex flex-col gap-2">
                        <header className="flex items-center gap-3 mb-1">
                          <div className="w-1 h-6 bg-orange-500 rounded-full" />
                          <CardTitle
                            className={`text-lg flex items-center gap-2 ${isDark ? "text-white" : "text-black"}`}
                          >
                            <User
                              className={`w-5 h-5 ${isDark ? "text-slate-400" : "text-slate-600"}`}
                              strokeWidth={2.5}
                            />
                            Billed To
                          </CardTitle>
                        </header>
                        <p className={`font-bold text-sm ${textPrimary}`}>
                          {selected.billedTo.name}
                        </p>
                        <p className={`text-xs ${textMuted}`}>
                          {selected.billedTo.address}
                        </p>
                        <div
                          className={`flex items-center gap-2 text-xs ${textMuted}`}
                        >
                          <Phone className="w-3 h-3 text-orange-500 flex-shrink-0" />
                          {selected.billedTo.tel}
                        </div>
                        <div
                          className={`flex items-center gap-2 text-xs ${textMuted}`}
                        >
                          <Mail className="w-3 h-3 text-orange-500 flex-shrink-0" />
                          {selected.billedTo.email}
                        </div>
                      </div>

                      {/* Invoice Info */}
                      <div className="flex flex-col gap-2">
                        <header className="flex items-center gap-3 mb-1">
                          <div className="w-1 h-6 bg-orange-500 rounded-full" />
                          <CardTitle
                            className={`text-lg flex items-center gap-2 ${isDark ? "text-white" : "text-black"}`}
                          >
                            <FileText
                              className={`w-5 h-5 ${isDark ? "text-slate-400" : "text-slate-600"}`}
                              strokeWidth={2.5}
                            />
                            Invoice Information
                          </CardTitle>
                        </header>
                        <div
                          className={`flex items-center justify-between text-xs border-b pb-2 ${dividerColor}`}
                        >
                          <span className={textMuted}>Invoice No</span>
                          <span className={`font-semibold ${textPrimary}`}>
                            {selected.invoiceNo}
                          </span>
                        </div>
                        <div
                          className={`flex items-center justify-between text-xs border-b pb-2 ${dividerColor}`}
                        >
                          <span className={textMuted}>Project ID</span>
                          <span className={`font-semibold ${textPrimary}`}>
                            {selected.projectId}
                          </span>
                        </div>
                        <div
                          className={`flex items-center justify-between text-xs border-b pb-2 ${dividerColor}`}
                        >
                          <span className={textMuted}>Issue Date</span>
                          <span className={`font-semibold ${textPrimary}`}>
                            {selected.issueDate}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className={textMuted}>Due Date</span>
                          <span className={`font-semibold ${textPrimary}`}>
                            {selected.dueDate}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Invoice Items Table */}
                    <div className="px-4 sm:px-8 py-6 overflow-x-auto">
                      {/* Header */}
                      <div
                        className={`grid grid-cols-12 gap-4 pb-3 border-b text-[10px] uppercase tracking-widest font-black min-w-[600px] ${dividerColor} ${textMuted}`}
                      >
                        <div className="col-span-2">Type</div>
                        <div className="col-span-5">Description</div>
                        <div className="col-span-1 text-right">Qty</div>
                        <div className="col-span-2 text-right">Unit Price</div>
                        <div className="col-span-2 text-right">Amount</div>
                      </div>

                      {/* Rows */}
                      <div className="flex flex-col divide-y divide-dashed divide-border min-w-[600px]">
                        {selected.items.map((item, i) => (
                          <div key={i} className="grid grid-cols-12 gap-4 py-4">
                            <div className="col-span-2">
                              <p className={`text-sm font-bold ${textPrimary}`}>
                                {item.type}
                              </p>
                            </div>
                            <div className="col-span-5">
                              <p
                                className={`text-xs leading-relaxed ${textMuted}`}
                              >
                                {item.description}
                              </p>
                            </div>
                            <div
                              className={`col-span-1 text-right text-sm font-semibold ${textPrimary}`}
                            >
                              {item.qty}
                            </div>
                            <div
                              className={`col-span-2 text-right text-sm font-semibold ${textPrimary}`}
                            >
                              {formatCurrency(item.unitPrice)}
                            </div>
                            <div className="col-span-2 text-right text-sm font-black text-orange-500">
                              {formatCurrency(item.qty * item.unitPrice)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Summary & Totals */}
                    <div
                      className={`mx-4 sm:mx-8 mb-6 rounded-2xl overflow-hidden border ${dividerColor}`}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border">
                        {/* Subtotal */}
                        <div
                          className={`p-5 ${isDark ? "bg-slate-800/40" : "bg-slate-50"}`}
                        >
                          <p
                            className={`text-[10px] uppercase tracking-widest font-black mb-1 ${textMuted}`}
                          >
                            Subtotal
                          </p>
                          <p className={`text-2xl font-black ${textPrimary}`}>
                            {formatCurrency(subtotal)}
                          </p>
                        </div>

                        {/* Tax */}
                        <div
                          className={`p-5 ${isDark ? "bg-slate-800/40" : "bg-slate-50"}`}
                        >
                          <p
                            className={`text-[10px] uppercase tracking-widest font-black mb-1 ${textMuted}`}
                          >
                            Tax ({selected.taxRate}%)
                          </p>
                          <p className={`text-2xl font-black ${textMuted}`}>
                            {formatCurrency(taxAmount)}
                          </p>
                        </div>

                        {/* Total */}
                        <div className="p-5 bg-gradient-to-br from-orange-500 to-orange-600">
                          <p className="text-[10px] uppercase tracking-widest font-black mb-1 text-orange-100">
                            Total
                          </p>
                          <p className="text-2xl font-black text-white">
                            {formatCurrency(total)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Notes */}
                    {selected.notes && (
                      <div
                        className={`mx-8 mb-6 px-5 py-4 rounded-xl border border-dashed ${dividerColor} flex items-start gap-3`}
                      >
                        <FileText
                          className={`w-4 h-4 mt-0.5 flex-shrink-0 ${textMuted}`}
                        />
                        <p className={`text-xs leading-relaxed ${textMuted}`}>
                          {selected.notes}
                        </p>
                      </div>
                    )}

                    {/* Footer */}
                    <div
                      className={`px-8 py-5 border-t ${dividerColor} flex items-center justify-between`}
                    >
                      <div className="flex items-center gap-6">
                        <div
                          className={`flex items-center gap-2 text-xs ${textMuted}`}
                        >
                          <Building2 className="w-3.5 h-3.5 text-orange-500" />
                          Yanson Dashboard
                        </div>
                        <div
                          className={`flex items-center gap-2 text-xs ${textMuted}`}
                        >
                          <Phone className="w-3.5 h-3.5 text-orange-500" />
                          +62 813 8400 4840
                        </div>
                        <div
                          className={`flex items-center gap-2 text-xs ${textMuted}`}
                        >
                          <Mail className="w-3.5 h-3.5 text-orange-500" />
                          yansenferdinand6@gmail.com
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className={`w-3.5 h-3.5 ${textMuted}`} />
                        <p className={`text-xs font-bold ${textMuted}`}>
                          Due: {selected.dueDate}
                        </p>
                        <ChevronRight className={`w-3 h-3 ${textMuted}`} />
                      </div>
                    </div>
                  </div>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
