import {
  Hourglass,
  Key,
  Mail,
  MapPin,
  Phone,
  User,
  FileText,
  Columns,
  LayoutTemplate,
  Layers,
  FileBox,
  UserCheck,
} from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "~/store/store";
import InputField from "~/components/Form/InputField";
import { SelectField } from "~/components/Form/SelectField";
import TextareaField from "~/components/Form/TextareaField";
import Layout from "~/components/Layout";
import { Button } from "~/components/ui/button";
import { country } from "~/data/dataCountry";
import { region } from "~/data/dataRegion";
import { cn } from "~/lib/utils";

interface FormSectionProps {
  title: string;
  description: string;
  icon: any;
  children: React.ReactNode;
}

const FormSection = ({
  title,
  description,
  icon: Icon,
  children,
}: FormSectionProps) => {
  const isDark = useSelector((state: RootState) => state.dark.isDark);
  return (
    <div
      className={cn(
        "grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 rounded-3xl transition-all duration-300 mb-8",
        isDark ? "bg-slate-950" : "bg-white border border-slate-100 shadow-sm",
      )}
    >
      {/* Left Column: Description */}
      <div className="lg:col-span-4 space-y-4">
        <div
          className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-colors",
            isDark
              ? "bg-orange-500/10 text-orange-500"
              : "bg-orange-500 text-white",
          )}
        >
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h3
            className={cn(
              "text-xl font-black tracking-tight mb-2",
              isDark ? "text-white" : "text-slate-900",
            )}
          >
            {title}
          </h3>
          <p
            className={cn(
              "text-sm font-medium leading-relaxed opacity-60",
              isDark ? "text-slate-400" : "text-slate-500",
            )}
          >
            {description}
          </p>
        </div>
      </div>

      {/* Right Column: Form Fields */}
      <div className="lg:col-span-8">
        <div
          className={cn(
            "grid grid-cols-1 gap-6 p-6 sm:p-8 rounded-[2rem] transition-all",
            isDark
              ? "bg-slate-950/40 border border-slate-800"
              : "bg-slate-50/50 border border-slate-200/50",
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default function FormLayout() {
  const isDark = useSelector((state: RootState) => state.dark.isDark);
  return (
    <Layout>
      <div className="flex flex-col w-full max-w-6xl mx-auto py-10">
        <div className="mb-10 px-4 sm:px-0">
          <h1
            className={cn(
              "text-4xl font-black tracking-tight mb-3",
              isDark ? "text-white" : "text-slate-900",
            )}
          >
            Form Layouts
          </h1>
          <p
            className={cn(
              "text-base font-medium opacity-60",
              isDark ? "text-slate-400" : "text-slate-500",
            )}
          >
            Modern and responsive form structures designed for complex data
            entry and high-value applications.
          </p>
        </div>

        {/* Basic Form Section */}
        <FormSection
          title="Basic Information"
          description="A straightforward layout for gathering essential user details like name, contact info, and basic demographics."
          icon={FileText}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InputField labelName="First Name" onChange={() => {}} />
            <InputField labelName="Last Name" onChange={() => {}} />
          </div>
          <InputField
            labelName="Email Address"
            type="email"
            onChange={() => {}}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InputField labelName="Age" type="number" onChange={() => {}} />
            <InputField labelName="Phone Number" onChange={() => {}} />
          </div>
          <Button className="bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl shadow-lg shadow-orange-600/20">
            Save Information
          </Button>
        </FormSection>

        {/* Floating Label Layout */}
        <FormSection
          title="Floating Labels"
          description="A compact and modern layout using floating label inputs to maximize space and provide a sleek interaction."
          icon={LayoutTemplate}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InputField
              variant="float-label-2"
              labelName="First Name"
              onChange={() => {}}
            />
            <InputField
              variant="float-label-2"
              labelName="Last Name"
              onChange={() => {}}
            />
          </div>
          <InputField
            variant="float-label-2"
            labelName="Email"
            type="email"
            onChange={() => {}}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InputField
              variant="float-label-2"
              labelName="Password"
              type="password"
              onChange={() => {}}
            />
            <InputField
              variant="float-label-2"
              labelName="Phone Number"
              onChange={() => {}}
            />
          </div>
          <Button className="bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl shadow-lg shadow-orange-600/20">
            Update Profile
          </Button>
        </FormSection>

        {/* Address & Detailed Form */}
        <FormSection
          title="Shipping Address"
          description="Detailed form layout combining various input types including selects and textareas for complex data entry."
          icon={MapPin}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectField
              isShowSearch
              onChange={() => {}}
              className="min-h-12"
              placeholder="Select Country"
              dataDropdown={country}
              value=""
            />
            <SelectField
              isShowSearch
              onChange={() => {}}
              className="min-h-12"
              placeholder="Select Region"
              dataDropdown={region}
              value=""
            />
          </div>
          <TextareaField
            labelName="Primary Address"
            onChange={() => {}}
            variant="float-label-2"
          />
          <TextareaField
            labelName="Apartment / Suite (Optional)"
            onChange={() => {}}
            variant="float-label-2"
          />
          <div className="flex justify-end pt-4">
            <Button variant="ghost" className="mr-4 font-bold">
              Cancel
            </Button>
            <Button className="bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl shadow-lg shadow-orange-600/20 px-8">
              Confirm Order
            </Button>
          </div>
        </FormSection>

        {/* Iconic Input Layout */}
        <FormSection
          title="Secure Verification"
          description="Enhanced security form layout using icons within inputs to provide clear visual cues for sensitive data."
          icon={UserCheck}
        >
          <InputField
            Icon={User}
            variant="float-label-2"
            labelName="Full Legal Name"
            onChange={() => {}}
          />
          <InputField
            Icon={Mail}
            variant="float-label-2"
            labelName="Verified Email"
            type="email"
            onChange={() => {}}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InputField
              Icon={Key}
              variant="float-label-2"
              labelName="New Password"
              type="password"
              onChange={() => {}}
            />
            <InputField
              Icon={Phone}
              variant="float-label-2"
              labelName="Verification Phone"
              onChange={() => {}}
            />
          </div>
          <Button className="bg-[#2d7d8a] hover:bg-[#24636d] text-white font-bold rounded-xl shadow-lg shadow-teal-600/20 w-full mt-4">
            Verify Account
          </Button>
        </FormSection>
      </div>
    </Layout>
  );
}
