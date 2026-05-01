import { CalendarPicker } from "~/components/Form/DatePciker";
import InputField from "~/components/Form/InputField";
import { SelectField } from "~/components/Form/SelectField";
import TextareaField from "~/components/Form/TextareaField";
import Layout from "~/components/Layout";
import { frameworks } from "~/data/dataFrameworks";
import { useState } from "react";
import {
  ALargeSmall,
  Type,
  ListFilter,
  AlertCircle,
  AlignLeft,
  LayoutGrid,
  CheckCheck,
} from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "~/store/store";
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
        "grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 rounded-3xl transition-all duration-300",
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

export default function FormElement() {
  const isDark = useSelector((state: RootState) => state.dark.isDark);
  const [select1, setSelect1] = useState<string | undefined>("");
  const [select2, setSelect2] = useState<string | undefined>("");

  return (
    <Layout>
      <div className="flex flex-col gap-10 w-full max-w-6xl mx-auto py-10">
        <div className="mb-4">
          <h1
            className={cn(
              "text-4xl font-black tracking-tight mb-3",
              isDark ? "text-white" : "text-slate-900",
            )}
          >
            Form Elements
          </h1>
          <p
            className={cn(
              "text-base font-medium opacity-60",
              isDark ? "text-slate-400" : "text-slate-500",
            )}
          >
            A comprehensive collection of input components designed for premium
            user experiences.
          </p>
        </div>

        {/* Default Input Section */}
        <FormSection
          title="Default Input"
          description="Standard text input fields for various data types including text, email, password and date pickers."
          icon={Type}
        >
          <InputField labelName="Input" onChange={() => {}} />
          <InputField
            labelName="Input with placeholder"
            placeholder="Enter your information here..."
            onChange={() => {}}
          />
          <InputField
            labelName="Password input"
            type="password"
            placeholder="••••••••"
            onChange={() => {}}
          />
          <CalendarPicker labelTitle="Date Picker" />
          <InputField
            labelName="Input disabled"
            disabled
            placeholder="You cannot edit this field"
            onChange={() => {}}
          />
        </FormSection>

        {/* Select Input Section */}
        <FormSection
          title="Select Input"
          description="Custom select components with support for searching, filtering, and single/multiple selection modes."
          icon={ListFilter}
        >
          <SelectField
            labelName="Default Select"
            dataDropdown={frameworks}
            value={select1}
            onChange={(e) => setSelect1(e)}
          />
          <SelectField
            isShowSearch
            labelName="Select with Search"
            dataDropdown={frameworks}
            value={select2}
            onChange={(e) => setSelect2(e)}
          />
        </FormSection>

        {/* Textarea Section */}
        <FormSection
          title="Textarea Input"
          description="Multi-line input fields for longer content like descriptions, notes, or detailed feedback."
          icon={AlignLeft}
        >
          <TextareaField
            placeholder="Start typing your description..."
            className="focus:ring-orange-500 h-32"
            labelName="Project Description"
            onChange={() => {}}
          />
          <TextareaField
            variant="float-label-1"
            labelName="Floating Label Style 1"
            className="focus:ring-orange-500 h-32"
            onChange={() => {}}
          />
          <TextareaField
            variant="float-label-2"
            labelName="Floating Label Style 2"
            className="focus:ring-orange-500 h-32"
            onChange={() => {}}
          />
          <TextareaField
            disabled
            placeholder="This field is currently read-only"
            className="focus:ring-orange-500 h-32"
            labelName="Read-only Content"
            onChange={() => {}}
          />
        </FormSection>

        {/* Input Group Section */}
        <FormSection
          title="Input Groups"
          description="Advanced input fields featuring floating labels, prefixes, and icons for enhanced visual hierarchy."
          icon={LayoutGrid}
        >
          <InputField
            labelName="Floating Label Style 1"
            Icon={ALargeSmall}
            variant="float-label-1"
            onChange={() => {}}
          />
          <InputField
            labelName="Floating Label Style 2"
            Icon={ALargeSmall}
            variant="float-label-2"
            onChange={() => {}}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              labelName="Website URL"
              prefixLabelName="https://"
              placeholder="example.com"
              variant="prefix-label"
              onChange={() => {}}
            />
            <InputField
              labelName="Phone Number"
              prefixLabelName="+62"
              placeholder="812-000-0000"
              variant="prefix-label"
              onChange={() => {}}
            />
          </div>
        </FormSection>

        {/* Validation States Section */}
        <FormSection
          title="Validation States"
          description="Visual feedback indicators for error and success states to guide users through form completion."
          icon={AlertCircle}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h4
                className={cn(
                  "text-xs font-black uppercase tracking-widest text-red-500",
                )}
              >
                Error States
              </h4>
              <InputField
                labelName="Required Field"
                error="* This field is mandatory"
                onChange={() => {}}
              />
              <TextareaField
                labelName="Message"
                error="* Please enter at least 20 characters"
                onChange={() => {}}
              />
            </div>
            <div className="space-y-6">
              <h4
                className={cn(
                  "text-xs font-black uppercase tracking-widest text-emerald-500",
                )}
              >
                Success States
              </h4>
              <InputField
                labelName="Username Available"
                isSuccess
                onChange={() => {}}
              />
              <SelectField
                labelName="Country Verified"
                dataDropdown={frameworks}
                isSuccess
                value={select1}
                onChange={(e) => setSelect1(e)}
              />
            </div>
          </div>
        </FormSection>
      </div>
    </Layout>
  );
}
