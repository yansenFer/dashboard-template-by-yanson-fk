import { LockKeyhole, Mail, User, ArrowLeft, Github } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import InputField from "~/components/Form/InputField";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import type { RootState } from "~/store/store";
import { cn } from "~/lib/utils";

export default function SimpleSignUp() {
  const isDark = useSelector((state: RootState) => state.dark.isDark);
  const navigate = useNavigate();

  const textPrimary = isDark ? "text-white" : "text-slate-900";
  const textMuted = isDark ? "text-slate-400" : "text-slate-500";

  return (
    <main
      className={cn(
        "flex w-full min-h-screen transition-colors duration-500",
        isDark ? "bg-[#0b1120]" : "bg-white",
      )}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
        {/* Left Side: Registration Form */}
        <div className="flex flex-col justify-center items-center p-8 lg:p-24 relative order-2 lg:order-1">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2 mb-12 absolute top-8 left-8">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-600 text-white font-black text-lg">
              Gv
            </div>
            <span
              className={cn("font-bold text-xl tracking-tight", textPrimary)}
            >
              Gvixer
            </span>
          </div>

          <div className="w-full max-w-[420px] flex flex-col">
            <div className="mb-10 text-center lg:text-left">
              <h2
                className={cn(
                  "text-4xl font-black tracking-tight mb-3",
                  textPrimary,
                )}
              >
                Create Account
              </h2>
              <p className={cn("text-base font-medium", textMuted)}>
                Join us today and start building amazing things
              </p>
            </div>

            <form
              className="flex flex-col gap-5 w-full"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="space-y-1">
                <InputField
                  labelName="Full Name"
                  onChange={() => {}}
                  type="text"
                  Icon={User}
                  variant="float-label-2"
                  className="h-12"
                />
              </div>
              <div className="space-y-1">
                <InputField
                  labelName="Email Address"
                  onChange={() => {}}
                  type="email"
                  Icon={Mail}
                  variant="float-label-2"
                  className="h-12"
                />
              </div>
              <div className="space-y-1">
                <InputField
                  labelName="Password"
                  onChange={() => {}}
                  type="password"
                  Icon={LockKeyhole}
                  variant="float-label-2"
                  className="h-12"
                />
              </div>

              <div className="flex items-start space-x-2 my-2">
                <Checkbox
                  id="terms"
                  className="mt-1 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                />
                <label
                  htmlFor="terms"
                  className={cn(
                    "text-xs font-semibold leading-relaxed cursor-pointer",
                    textMuted,
                  )}
                >
                  By creating an account, you agree to our{" "}
                  <span className="text-orange-500 hover:underline">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="text-orange-500 hover:underline">
                    Privacy Policy
                  </span>
                  .
                </label>
              </div>

              <Button
                type="submit"
                onClick={() => navigate("/", { replace: true })}
                className="bg-orange-600 hover:bg-orange-700 text-white h-12 rounded-xl font-bold text-base shadow-lg shadow-orange-600/20 active:scale-[0.98] transition-all mt-2"
              >
                Get Started Now
              </Button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div
                    className={cn(
                      "w-full border-t",
                      isDark ? "border-slate-800" : "border-slate-200",
                    )}
                  ></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span
                    className={cn(
                      "px-4 font-bold tracking-widest",
                      isDark
                        ? "bg-[#0b1120] text-slate-500"
                        : "bg-white text-slate-400",
                    )}
                  >
                    Or sign up with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className={cn(
                    "h-12 rounded-xl font-bold border-2 transition-all active:scale-[0.98] flex items-center gap-2",
                    isDark
                      ? "bg-slate-900/50 border-slate-800 hover:bg-slate-800 text-white"
                      : "bg-white border-slate-100 hover:bg-slate-50 text-slate-900",
                  )}
                >
                  <img src="/google.png" width={20} height={20} alt="Google" />
                  <span className="hidden sm:inline">Google</span>
                </Button>
                <Button
                  variant="outline"
                  className={cn(
                    "h-12 rounded-xl font-bold border-2 transition-all active:scale-[0.98] flex items-center gap-2",
                    isDark
                      ? "bg-slate-900/50 border-slate-800 hover:bg-slate-800 text-white"
                      : "bg-white border-slate-100 hover:bg-slate-50 text-slate-900",
                  )}
                >
                  <Github className="w-5 h-5" />
                  <span className="hidden sm:inline">GitHub</span>
                </Button>
              </div>

              <div className="mt-8 text-center">
                <p className={cn("text-sm font-medium", textMuted)}>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/pages-template/simple-sign-in")}
                    className="text-orange-500 font-bold hover:underline transition-all"
                  >
                    Login here
                  </button>
                </p>
              </div>
            </form>
          </div>

          <div className="mt-auto pt-10 lg:hidden text-center text-slate-400 text-[10px] font-bold tracking-widest uppercase">
            © 2026 Gvixer Dashboard
          </div>
        </div>

        {/* Right Side: Branding & Illustration */}
        <div
          className={cn(
            "hidden lg:flex flex-col justify-between p-12 relative overflow-hidden transition-all duration-700 order-1 lg:order-2",
            isDark
              ? "bg-gradient-to-br from-slate-900 via-slate-950 to-orange-600/20"
              : "bg-gradient-to-br from-orange-50/50 via-white to-orange-50/30 border-l border-slate-100",
          )}
        >
          {/* Decorative shapes - Softer for Light Mode */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
            <div
              className={cn(
                "absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-3xl animate-pulse",
                isDark ? "bg-white/10" : "bg-orange-200/40",
              )}
            />
            <div
              className={cn(
                "absolute top-[-5%] left-[-5%] w-[30%] h-[30%] rounded-full blur-3xl animate-bounce duration-[10s]",
                isDark ? "bg-orange-400/20" : "bg-orange-100/60",
              )}
            />
          </div>

          <div className="relative z-10 text-right">
            <div className="flex items-center gap-2 mb-12 justify-end">
              <span
                className={cn(
                  "font-extrabold text-2xl tracking-tight transition-colors",
                  isDark ? "text-white" : "text-slate-900",
                )}
              >
                Gvixer
              </span>
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-xl font-black text-xl shadow-xl transition-colors",
                  isDark
                    ? "bg-white text-orange-600"
                    : "bg-orange-600 text-white",
                )}
              >
                Gv
              </div>
            </div>

            <div className="ml-auto max-w-md">
              <h1
                className={cn(
                  "text-5xl font-black leading-[1.1] mb-6 tracking-tight transition-colors",
                  isDark ? "text-white" : "text-slate-900",
                )}
              >
                Unlock your{" "}
                <span className="text-orange-500">Creative Potential.</span>
              </h1>
              <p
                className={cn(
                  "text-lg font-medium leading-relaxed mb-8 transition-colors",
                  isDark ? "text-orange-50/80" : "text-slate-500",
                )}
              >
                Experience the most comprehensive dashboard kit ever created.
                Built with precision, focused on performance.
              </p>

              <Button
                onClick={() =>
                  navigate("/pages-template/simple-sign-in", { replace: true })
                }
                variant="outline"
                className={cn(
                  "rounded-full border-2 px-8 h-12 font-bold group transition-all",
                  isDark
                    ? "bg-white/10 border-white/20 text-white hover:bg-white hover:text-orange-600"
                    : "bg-white border-orange-500/20 text-orange-600 hover:bg-orange-500 hover:text-white hover:border-orange-500 shadow-sm",
                )}
              >
                <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />{" "}
                Back to Home
              </Button>
            </div>
          </div>

          <div
            className={cn(
              "relative z-10 flex items-center justify-between text-xs font-bold tracking-widest uppercase transition-colors",
              isDark ? "text-white/60" : "text-slate-400",
            )}
          >
            <div className="flex gap-6">
              <span className="hover:text-orange-500 cursor-pointer transition-colors">
                Support
              </span>
              <span className="hover:text-orange-500 cursor-pointer transition-colors">
                FAQ
              </span>
            </div>
            <span>© 2026 Gvixer Dashboard</span>
          </div>
        </div>
      </div>
    </main>
  );
}
