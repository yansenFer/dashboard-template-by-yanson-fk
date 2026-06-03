import { useState } from "react";
import Layout from "~/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { useSelector } from "react-redux";
import type { RootState } from "~/store/store";
import InputField from "~/components/Form/InputField";
import TextareaField from "~/components/Form/TextareaField";
import { SelectField } from "~/components/Form/SelectField";
import {
  Camera,
  Save,
  User,
  Shield,
  Bell,
  MapPin,
  LockKeyhole,
} from "lucide-react";

export default function EditProfile() {
  const isDark = useSelector((state: RootState) => state.dark.isDark);
  const [activeTab, setActiveTab] = useState("my-profile");

  const [formData, setFormData] = useState({
    firstName: "Yanson",
    lastName: "Ferdinand Kurniadi",
    email: "yansenferdinand6@gmail.com",
    phone: "(+62) 123-4567-890",
    bio: "Passionate frontend developer with 3 years of experience in building dynamic web interfaces. Recently transitioned into a full-stack developer role, specializing in the Laravel framework to deliver end-to-end solutions.",
    country: "Indonesia",
    city: "Jakarta, Indonesia",
    postalCode: "123456",
    taxId: "123456789",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const tabs = [
    { id: "my-profile", label: "My Profile", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  return (
    <Layout>
      <div className="flex flex-col gap-8 pb-10 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1
            className={`text-2xl font-bold tracking-tight ${isDark ? "text-white" : "text-black"}`}
          >
            Account Settings
          </h1>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg flex items-center gap-2 px-6 shadow-md shadow-orange-500/20">
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Sidebar Navigation */}
          <Card className="lg:col-span-3 p-0! h-fit lg:sticky lg:top-[100px] overflow-hidden">
            <div className="flex flex-col">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center cursor-pointer text-sm gap-3 w-full text-left px-5 py-3.5 transition-all font-semibold ${
                    activeTab === tab.id
                      ? `${isDark ? "bg-orange-500/10 text-orange-500" : "bg-orange-50 text-orange-600"}`
                      : `${isDark ? "text-gray-400 hover:bg-gray-800 hover:text-white" : "text-gray-900 hover:bg-gray-100"}`
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </div>
          </Card>

          {/* Form Content */}
          <div className="lg:col-span-9 flex flex-col gap-6">
            {activeTab === "my-profile" && (
              <div className="flex flex-col gap-4 animate-in fade-in duration-500">
                {/* Profile Header */}
                <Card className={`w-full border-none shadow-sm`}>
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                      <div className="relative group w-28 h-28 rounded-full overflow-hidden border border-gray-200 shadow-sm">
                        <img
                          src="https://testingbot.com/free-online-tools/random-avatar/300"
                          alt="Profile"
                          className="w-full h-full object-cover transition-transform group-hover:scale-110"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 cursor-pointer backdrop-blur-sm">
                          <Camera className="w-6 h-6 text-white mb-1" />
                          <span className="text-[10px] text-white font-bold uppercase tracking-wider">
                            Upload
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 text-center sm:text-left">
                        <h2
                          className={`text-xl font-bold ${isDark ? "text-white" : "text-black"}`}
                        >
                          {formData.firstName} {formData.lastName}
                        </h2>
                        <p
                          className={`text-sm mt-2 leading-relaxed ${isDark ? "text-gray-400" : "text-gray-500"}`}
                        >
                          JPG, PNG or GIF • Max size 2MB
                          <br />
                          Recommended 200 x 200 px
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Personal Information */}
                <Card className={`w-full border-none shadow-sm group overflow-hidden`}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-6 bg-orange-500 rounded-full" />
                      <CardTitle
                        className={`text-lg flex items-center gap-2 ${isDark ? "text-white" : "text-black"}`}
                      >
                        <User
                          className={`w-5 h-5 ${isDark ? "text-slate-400" : "text-slate-600"}`}
                          strokeWidth={2.5}
                        />
                        Personal Information
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputField
                        labelName="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        variant="float-label-2"
                      />
                      <InputField
                        labelName="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        variant="float-label-2"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative">
                        <InputField
                          labelName="Email Address"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          variant="float-label-2"
                        />
                      </div>
                      <div className="relative">
                        <InputField
                          labelName="Phone Number"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          variant="float-label-2"
                        />
                      </div>
                    </div>
                    <div>
                      <TextareaField
                        labelName="Bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange as any}
                        variant="float-label-2"
                        className="h-32 pt-6 resize-none"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Address */}
                <Card className={`w-full border-none shadow-sm overflow-hidden`}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-6 bg-orange-500 rounded-full" />
                      <CardTitle
                        className={`text-lg flex items-center gap-2 ${isDark ? "text-white" : "text-black"}`}
                      >
                        <MapPin
                          className={`w-5 h-5 ${isDark ? "text-slate-400" : "text-slate-600"}`}
                          strokeWidth={2.5}
                        />
                        Address Information
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <SelectField
                          value={formData.country}
                          onChange={(val) =>
                            setFormData({ ...formData, country: val })
                          }
                          labelName="Country"
                          placeholderSearch="Search country..."
                          dataDropdown={[
                            { label: "United States of America", value: "us" },
                            { label: "Indonesia", value: "id" },
                            { label: "Bangladesh", value: "bd" },
                          ]}
                        />
                      </div>
                      <InputField
                        labelName="City / State"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        variant="standart"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputField
                        labelName="Postal Code"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        variant="standart"
                      />
                      <InputField
                        labelName="TAX ID"
                        name="taxId"
                        value={formData.taxId}
                        onChange={handleChange}
                        variant="standart"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "security" && (
              <div className="flex flex-col gap-4 animate-in fade-in duration-500 w-full">
                <Card className={`w-full border-none shadow-sm overflow-hidden`}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-6 bg-orange-500 rounded-full" />
                      <CardTitle
                        className={`text-lg flex items-center gap-2 ${isDark ? "text-white" : "text-black"}`}
                      >
                        <LockKeyhole
                          className={`w-5 h-5 ${isDark ? "text-slate-400" : "text-slate-600"}`}
                          strokeWidth={2.5}
                        />
                        Security Settings
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-6">
                    <InputField
                      labelName="Old Password"
                      type="password"
                      name="oldPassword"
                      value="****************"
                      onChange={() => {}}
                      variant="float-label-2"
                    />
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent my-4" />
                    <InputField
                      labelName="New Password"
                      type="password"
                      name="newPassword"
                      value=""
                      onChange={() => {}}
                      variant="float-label-2"
                    />
                    <InputField
                      labelName="Repeat New Password"
                      type="password"
                      name="confirmPassword"
                      value=""
                      onChange={() => {}}
                      variant="float-label-2"
                    />
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="flex flex-col gap-4 animate-in fade-in duration-500 w-full">
                <Card className={`w-full border-none shadow-sm overflow-hidden`}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-6 bg-orange-500 rounded-full" />
                      <CardTitle
                        className={`text-lg flex items-center gap-2 ${isDark ? "text-white" : "text-black"}`}
                      >
                        <Bell
                          className={`w-5 h-5 ${isDark ? "text-slate-400" : "text-slate-600"}`}
                          strokeWidth={2.5}
                        />
                        Notifications
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center justify-center py-10 gap-4 text-center">
                      <div
                        className={`p-4 rounded-full ${isDark ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-600"}`}
                      >
                        <Bell className="w-8 h-8" strokeWidth={2.5} />
                      </div>
                      <div>
                        <h3
                          className={`font-bold mb-2 ${isDark ? "text-white" : "text-black"}`}
                        >
                          Manage Notifications
                        </h3>
                        <p
                          className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
                        >
                          Push notifications, email alerts and marketing
                          preferences will be available here soon.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
