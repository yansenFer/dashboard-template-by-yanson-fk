import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Check,
  X,
  Rocket,
  Zap,
  Crown,
  CircleCheck,
  Star,
  ShieldCheck,
  Globe,
  HeadphonesIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "~/components/Layout";
import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import type { RootState } from "~/store/store";
import { cn } from "~/lib/utils";

// --- Types ---
type BillingCycle = "monthly" | "yearly";

interface PricingTier {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  notIncluded?: string[];
  icon: typeof Rocket;
  buttonText: string;
  isPopular?: boolean;
}

// --- Mock Data ---
const PRICING_TIERS: PricingTier[] = [
  {
    id: "basic",
    name: "Starter",
    description:
      "Perfect for freelancers and individual designers starting their journey.",
    monthlyPrice: 29,
    yearlyPrice: 23,
    features: [
      "Access to all basic templates",
      "5 project exports per month",
      "Community support",
      "Standard documentation",
      "Lighweight dashboard",
    ],
    notIncluded: [
      "Custom branding",
      "Premium support",
      "Commercial usage license",
    ],
    icon: Rocket,
    buttonText: "Start Learning",
  },
  {
    id: "pro",
    name: "Professional",
    description:
      "Everything you need for serious small and medium-sized projects.",
    monthlyPrice: 59,
    yearlyPrice: 47,
    features: [
      "Access to all templates & UI kits",
      "Unlimited project exports",
      "Priority email support",
      "Full source code access",
      "Customizable components",
      "Commercial usage license",
    ],
    icon: Zap,
    buttonText: "Join Pro Trial",
    isPopular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description:
      "Built for agencies and large teams requiring massive scale and security.",
    monthlyPrice: 199,
    yearlyPrice: 159,
    features: [
      "Everything in Pro",
      "Unlimited team members",
      "Dedicated account manager",
      "24/7 Phone & Email support",
      "SSO & Custom authentication",
      "White-label options",
      "Custom contract & SLA",
    ],
    icon: Crown,
    buttonText: "Contact Enterprise",
  },
];

export default function Pricing() {
  const isDark = useSelector((state: RootState) => state.dark.isDark);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");

  const textPrimary = isDark ? "text-white" : "text-slate-900";
  const textMuted = isDark ? "text-slate-400" : "text-slate-500";

  return (
    <Layout>
      <div className="flex flex-col gap-10 pb-20 max-w-6xl mx-auto w-full">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center gap-6 mt-12">
          <Badge className="bg-orange-500/10 text-orange-500 border-orange-500/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
            Flexible Pricing
          </Badge>
          <div className="flex flex-col gap-3">
            <h1
              className={cn(
                "text-4xl md:text-6xl font-black tracking-tight",
                textPrimary,
              )}
            >
              Ready to scale your business?
            </h1>
            <p className={cn("text-lg max-w-2xl mx-auto px-4", textMuted)}>
              Choose the perfect plan that fits your needs. Start building your
              dream project today with our premium dashboard template.
            </p>
          </div>

          <div
            className={cn(
              "flex items-center gap-1 mt-6 p-1.5 rounded-2xl relative shadow-inner transition-colors",
              isDark
                ? "bg-slate-900 border border-slate-800"
                : "bg-slate-200/60",
            )}
          >
            <button
              onClick={() => setBillingCycle("monthly")}
              className={cn(
                "flex-1 relative cursor-pointer h-11 flex items-center justify-center px-8 rounded-xl text-sm font-bold transition-colors duration-300",
                billingCycle === "monthly"
                  ? "text-white"
                  : isDark
                    ? "text-slate-500 hover:text-slate-300"
                    : "text-slate-500 hover:text-slate-900",
              )}
            >
              <span className="relative z-10">Monthly</span>
              {billingCycle === "monthly" && (
                <motion.div
                  layoutId="pricing-active-pill"
                  className="absolute inset-0 bg-orange-500 rounded-xl shadow-lg shadow-orange-500/30"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={cn(
                "flex-1 relative cursor-pointer h-11 flex items-center justify-center px-8 rounded-xl text-sm font-bold transition-colors duration-300",
                billingCycle === "yearly"
                  ? "text-white"
                  : isDark
                    ? "text-slate-500 hover:text-slate-300"
                    : "text-slate-500 hover:text-slate-900",
              )}
            >
              <span className="relative z-10">Yearly</span>
              {billingCycle === "yearly" && (
                <motion.div
                  layoutId="pricing-active-pill"
                  className="absolute inset-0 bg-orange-500 rounded-xl shadow-lg shadow-orange-500/30"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
            {/* Discount Badge & Arrow (Curved Upwards) */}
            <div className="absolute left-[calc(100%+0.5rem)] -top-10.5 hidden lg:flex items-start gap-0.5 whitespace-nowrap">
              <svg
                width="42"
                height="42"
                viewBox="0 0 42 42"
                fill="none"
                className="text-orange-500 mt-2 drop-shadow-sm -ml-2"
              >
                <path
                  d="M 2 36 C 12 20 22 14 36 14"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="4 6"
                />
                <path
                  d="M 30 6 L 38 14 L 28 22"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <Badge className="bg-orange-500 text-white border-none px-4 py-1.5 shadow-xl shadow-orange-500/20 text-[11px] font-black uppercase tracking-wider animate-pulse self-start mt-2.5">
                Save 20%
              </Badge>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 mt-6">
          {PRICING_TIERS.map((tier, idx) => {
            const price =
              billingCycle === "monthly" ? tier.monthlyPrice : tier.yearlyPrice;
            const Icon = tier.icon;

            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="flex"
              >
                <Card
                  active={tier.isPopular}
                  className={cn(
                    "flex flex-col w-full relative transition-all duration-500 hover:scale-[1.02] p-0! overflow-hidden border-none shadow-2xl",
                    tier.isPopular
                      ? "ring-2 ring-orange-500/50 shadow-orange-500/10"
                      : "hover:border-slate-800",
                    isDark ? "bg-slate-950/50" : "bg-white",
                  )}
                >
                  {tier.isPopular && (
                    <div className="absolute top-0 right-0">
                      <div className="bg-orange-500 text-white text-[10px] font-black uppercase tracking-tighter px-8 py-2 rotate-45 translate-x-[28px] translate-y-[15px] shadow-lg">
                        Best Seller
                      </div>
                    </div>
                  )}

                  <div className="p-8 flex flex-col h-full">
                    {/* Tier Header */}
                    <div className="flex flex-col gap-4 mb-8">
                      <div
                        className={cn(
                          "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:rotate-12",
                          tier.isPopular
                            ? "bg-orange-500 text-white shadow-xl shadow-orange-500/30"
                            : isDark
                              ? "bg-slate-900 border border-slate-800 text-orange-500"
                              : "bg-orange-50 text-orange-600",
                        )}
                      >
                        <Icon className="w-7 h-7" />
                      </div>
                      <div>
                        <h2
                          className={cn(
                            "text-2xl font-black tracking-tight",
                            textPrimary,
                          )}
                        >
                          {tier.name}
                        </h2>
                        <p
                          className={cn(
                            "text-xs font-semibold mt-1",
                            textMuted,
                          )}
                        >
                          {tier.description}
                        </p>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="mb-8 flex items-baseline gap-1">
                      <span
                        className={cn(
                          "text-sm font-bold align-top mt-1",
                          textMuted,
                        )}
                      >
                        $
                      </span>
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={price}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className={cn(
                            "text-5xl font-black tracking-tighter",
                            textPrimary,
                          )}
                        >
                          {price}
                        </motion.span>
                      </AnimatePresence>
                      <span className={cn("text-sm font-bold", textMuted)}>
                        /{billingCycle === "monthly" ? "mo" : "yr"}
                      </span>
                    </div>

                    {/* Features List */}
                    <div className="flex flex-col gap-4 flex-grow mb-10">
                      {tier.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center">
                            <Check className="w-3 h-3 text-emerald-500" />
                          </div>
                          <span
                            className={cn(
                              "text-sm font-medium",
                              isDark ? "text-slate-300" : "text-slate-600",
                            )}
                          >
                            {feature}
                          </span>
                        </div>
                      ))}
                      {tier.notIncluded?.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center gap-3 opacity-50"
                        >
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-500/10 flex items-center justify-center">
                            <X className="w-3 h-3 text-slate-500" />
                          </div>
                          <span
                            className={cn(
                              "text-sm font-medium line-through",
                              isDark ? "text-slate-500" : "text-slate-400",
                            )}
                          >
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <Button
                      variant={tier.isPopular ? "default" : "ghost"}
                      className={cn(
                        "w-full h-14 rounded-2xl font-bold text-base transition-all active:scale-95 shadow-lg outline-none ring-0",
                        tier.isPopular
                          ? "bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/20 border-none"
                          : isDark
                            ? "bg-slate-800 hover:bg-orange-500 text-white border-transparent hover:text-white"
                            : "bg-white hover:bg-orange-500 text-slate-900 hover:text-white border-transparent",
                      )}
                    >
                      {tier.buttonText}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Comparison Highlights Section */}
        <div className="mt-20 px-4">
          <div className="text-center mb-12">
            <h2
              className={cn("text-3xl font-black tracking-tight", textPrimary)}
            >
              Why choose our platform?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: "Security Fast",
                desc: "Enterprise-grade security protocols protecting your sensitive data.",
              },
              {
                icon: Globe,
                title: "Global Reach",
                desc: "Experience zero latency with our global CDN infrastructure across 20+ regions.",
              },
              {
                icon: HeadphonesIcon,
                title: "Expert Support",
                desc: "A dedicated team of experts ready to help you solve technical challenges.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center gap-4 group"
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center transition-all group-hover:bg-orange-500 group-hover:text-white group-hover:scale-110",
                    isDark
                      ? "bg-slate-900 text-slate-400"
                      : "bg-slate-100 text-slate-500",
                  )}
                >
                  <feature.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className={cn("text-lg font-bold", textPrimary)}>
                    {feature.title}
                  </h3>
                  <p className={cn("text-sm mt-2", textMuted)}>
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
