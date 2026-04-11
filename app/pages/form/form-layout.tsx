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
import { CardTitle } from "~/components/ui/card";
import InputField from "~/components/Form/InputField";
import { SelectField } from "~/components/Form/SelectField";
import TextareaField from "~/components/Form/TextareaField";
import Layout from "~/components/Layout";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { country } from "~/data/dataCountry";
import { region } from "~/data/dataRegion";

export default function FormLayout() {
  const isDark = useSelector((state: RootState) => state.dark.isDark);
  return (
    <Layout>
      <div className="grid lg:grid-cols-2 grid-cols-1 w-full gap-5">
        <div className="flex flex-col gap-5">
          {/* start basic form */}
          <Card className="overflow-hidden shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-1 h-6 bg-orange-500 rounded-full" />
                <CardTitle
                  className={`text-lg flex items-center gap-2 ${isDark ? "text-white" : "text-black"}`}
                >
                  <FileText
                    className={`w-5 h-5 ${isDark ? "text-slate-400" : "text-slate-600"}`}
                    strokeWidth={2.5}
                  />
                  Basic Form
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="gap-5 grid grid-cols-2">
              <InputField labelName="First Name" onChange={() => {}} />
              <InputField labelName="Last Name" onChange={() => {}} />
              <div className="col-span-2">
                <InputField
                  labelName="Email"
                  type="email"
                  onChange={() => {}}
                />
              </div>
              <div className="col-span-2">
                <InputField
                  labelName="Password"
                  type="password"
                  onChange={() => {}}
                />
              </div>
              <div className="col-span-2">
                <InputField labelName="Age" type="number" onChange={() => {}} />
              </div>
              <InputField labelName="Phone Number" onChange={() => {}} />
              <InputField labelName="Fax" onChange={() => {}} />
              <div className="col-span-2">
                <Button className="w-full">Submit</Button>
              </div>
            </CardContent>
          </Card>
          {/* end basic form */}

          {/* start form input group 1 */}
          <Card className="overflow-hidden shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-1 h-6 bg-orange-500 rounded-full" />
                <CardTitle
                  className={`text-lg flex items-center gap-2 ${isDark ? "text-white" : "text-black"}`}
                >
                  <Columns
                    className={`w-5 h-5 ${isDark ? "text-slate-400" : "text-slate-600"}`}
                    strokeWidth={2.5}
                  />
                  Form Input Group 1
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="gap-5 grid grid-cols-2">
              <InputField
                variant="float-label-1"
                labelName="First Name"
                onChange={() => {}}
              />
              <InputField
                variant="float-label-1"
                labelName="Last Name"
                onChange={() => {}}
              />
              <div className="col-span-2">
                <InputField
                  variant="float-label-1"
                  labelName="Email"
                  type="email"
                  onChange={() => {}}
                />
              </div>
              <div className="col-span-2">
                <InputField
                  variant="float-label-1"
                  labelName="Password"
                  type="password"
                  onChange={() => {}}
                />
              </div>
              <div className="col-span-2">
                <InputField
                  variant="float-label-1"
                  labelName="Age"
                  type="number"
                  onChange={() => {}}
                />
              </div>
              <InputField
                variant="float-label-1"
                labelName="Phone Number"
                onChange={() => {}}
              />
              <InputField
                variant="float-label-1"
                labelName="Fax"
                onChange={() => {}}
              />
              <div className="col-span-2">
                <Button className="w-full">Submit</Button>
              </div>
            </CardContent>
          </Card>
          {/* end form input group 1 */}

          {/* start form input group 2 */}
          <Card className="overflow-hidden shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-1 h-6 bg-orange-500 rounded-full" />
                <CardTitle
                  className={`text-lg flex items-center gap-2 ${isDark ? "text-white" : "text-black"}`}
                >
                  <LayoutTemplate
                    className={`w-5 h-5 ${isDark ? "text-slate-400" : "text-slate-600"}`}
                    strokeWidth={2.5}
                  />
                  Form Input Group 2
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="gap-5 grid grid-cols-2">
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
              <div className="col-span-2">
                <InputField
                  variant="float-label-2"
                  labelName="Email"
                  type="email"
                  onChange={() => {}}
                />
              </div>
              <div className="col-span-2">
                <InputField
                  variant="float-label-2"
                  labelName="Password"
                  type="password"
                  onChange={() => {}}
                />
              </div>
              <div className="col-span-2">
                <InputField
                  variant="float-label-2"
                  labelName="Age"
                  type="number"
                  onChange={() => {}}
                />
              </div>
              <InputField
                variant="float-label-2"
                labelName="Phone Number"
                onChange={() => {}}
              />
              <InputField
                variant="float-label-2"
                labelName="Fax"
                onChange={() => {}}
              />
              <div className="col-span-2">
                <Button className="w-full">Submit</Button>
              </div>
            </CardContent>
          </Card>
          {/* end form input group 2 */}

          {/* start combine form input */}
          <Card className="overflow-hidden shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-1 h-6 bg-orange-500 rounded-full" />
                <CardTitle
                  className={`text-lg flex items-center gap-2 ${isDark ? "text-white" : "text-black"}`}
                >
                  <Layers
                    className={`w-5 h-5 ${isDark ? "text-slate-400" : "text-slate-600"}`}
                    strokeWidth={2.5}
                  />
                  Combine Form Input Group
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="gap-5 grid grid-cols-2">
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
              <div className="col-span-2">
                <InputField
                  variant="float-label-2"
                  labelName="Email"
                  type="email"
                  onChange={() => {}}
                />
              </div>
              <div className="col-span-2">
                <InputField
                  variant="float-label-2"
                  labelName="Password"
                  type="password"
                  onChange={() => {}}
                />
              </div>
              <div className="col-span-2">
                <InputField
                  variant="float-label-2"
                  labelName="Age"
                  type="number"
                  onChange={() => {}}
                />
              </div>
              <div className="col-span-2">
                <InputField
                  variant="float-label-2"
                  labelName="Phone Number"
                  onChange={() => {}}
                />
              </div>
              <div className="col-span-2">
                <InputField
                  variant="float-label-2"
                  labelName="Fax"
                  onChange={() => {}}
                />
              </div>
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
              <div className="col-span-2">
                <TextareaField
                  labelName="Address 1"
                  onChange={() => {}}
                  variant="float-label-2"
                />
              </div>
              <div className="col-span-2">
                <TextareaField
                  labelName="Address 2"
                  onChange={() => {}}
                  variant="float-label-2"
                />
              </div>
              <div className="col-span-2">
                <Button className="w-full">Submit</Button>
              </div>
            </CardContent>
          </Card>
          {/* end combine form input */}
        </div>
        <div className="flex flex-col gap-5">
          {/* start combine form input */}
          <Card className="overflow-hidden shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-1 h-6 bg-orange-500 rounded-full" />
                <CardTitle
                  className={`text-lg flex items-center gap-2 ${isDark ? "text-white" : "text-black"}`}
                >
                  <FileBox
                    className={`w-5 h-5 ${isDark ? "text-slate-400" : "text-slate-600"}`}
                    strokeWidth={2.5}
                  />
                  Combine Basic Form
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="gap-5 grid grid-cols-2">
              <InputField labelName="First Name" onChange={() => {}} />
              <InputField labelName="Last Name" onChange={() => {}} />
              <div className="col-span-2">
                <InputField
                  labelName="Email"
                  type="email"
                  onChange={() => {}}
                />
              </div>
              <div className="col-span-2">
                <InputField
                  labelName="Password"
                  type="password"
                  onChange={() => {}}
                />
              </div>
              <div className="col-span-2">
                <InputField labelName="Age" type="number" onChange={() => {}} />
              </div>
              <div className="col-span-2">
                <InputField labelName="Phone Number" onChange={() => {}} />
              </div>
              <div className="col-span-2">
                <InputField labelName="Fax" onChange={() => {}} />
              </div>
              <SelectField
                isShowSearch
                onChange={() => {}}
                labelName="Country"
                placeholder="Select Country"
                dataDropdown={country}
                value=""
              />
              <SelectField
                isShowSearch
                onChange={() => {}}
                labelName="Region"
                placeholder="Select Region"
                dataDropdown={region}
                value=""
              />
              <div className="col-span-2">
                <TextareaField labelName="Address 1" onChange={() => {}} />
              </div>
              <div className="col-span-2">
                <TextareaField labelName="Address 2" onChange={() => {}} />
              </div>
              <div className="col-span-2">
                <Button className="w-full">Submit</Button>
              </div>
            </CardContent>
          </Card>
          {/* end combine form input */}

          {/* start combine form input with icon*/}
          <Card className="overflow-hidden shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-1 h-6 bg-orange-500 rounded-full" />
                <CardTitle
                  className={`text-lg flex items-center gap-2 ${isDark ? "text-white" : "text-black"}`}
                >
                  <UserCheck
                    className={`w-5 h-5 ${isDark ? "text-slate-400" : "text-slate-600"}`}
                    strokeWidth={2.5}
                  />
                  Combine Form Input Group With Icon
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="gap-5 grid grid-cols-2">
              <InputField
                Icon={User}
                variant="float-label-2"
                labelName="First Name"
                onChange={() => {}}
              />
              <InputField
                Icon={User}
                variant="float-label-2"
                labelName="Last Name"
                onChange={() => {}}
              />
              <div className="col-span-2">
                <InputField
                  Icon={Mail}
                  variant="float-label-2"
                  labelName="Email"
                  type="email"
                  onChange={() => {}}
                />
              </div>
              <div className="col-span-2">
                <InputField
                  Icon={Key}
                  variant="float-label-2"
                  labelName="Password"
                  type="password"
                  onChange={() => {}}
                />
              </div>
              <div className="col-span-2">
                <InputField
                  Icon={Hourglass}
                  variant="float-label-2"
                  labelName="Age"
                  type="number"
                  onChange={() => {}}
                />
              </div>
              <div className="col-span-2">
                <InputField
                  Icon={Phone}
                  variant="float-label-2"
                  labelName="Phone Number"
                  onChange={() => {}}
                />
              </div>
              <div className="col-span-2">
                <InputField
                  Icon={Phone}
                  variant="float-label-2"
                  labelName="Fax"
                  onChange={() => {}}
                />
              </div>
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
              <div className="col-span-2">
                <TextareaField
                  Icon={MapPin}
                  labelName="Address 1"
                  onChange={() => {}}
                  variant="float-label-2"
                />
              </div>
              <div className="col-span-2">
                <TextareaField
                  Icon={MapPin}
                  labelName="Address 2"
                  onChange={() => {}}
                  variant="float-label-2"
                />
              </div>
              <div className="col-span-2">
                <Button className="w-full">Submit</Button>
              </div>
            </CardContent>
          </Card>
          {/* end combine form input with icon */}
        </div>
      </div>
    </Layout>
  );
}
