import { Hourglass, Key, Mail, MapPin, Phone, User } from 'lucide-react'
import InputField from '~/components/Form/InputField'
import { SelectField } from '~/components/Form/SelectField'
import TextareaField from '~/components/Form/TextareaField'
import Layout from '~/components/Layout'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader } from '~/components/ui/card'
import { country } from '~/data/dataCountry'
import { region } from '~/data/dataRegion'

export default function FormLayout() {
  return (
    <Layout>
      <div className="grid lg:grid-cols-2 grid-cols-1 w-full gap-5">
        <div className="flex flex-col gap-5">
          {/* start basic form */}
          <Card>
            <CardHeader className="border-b">
              <span className="font-bold text-xl">Basic Form</span>
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
          <Card>
            <CardHeader className="border-b">
              <span className="font-bold text-xl">Form Input Group 1</span>
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
          <Card>
            <CardHeader className="border-b">
              <span className="font-bold text-xl">Form Input Group 2</span>
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
          <Card>
            <CardHeader className="border-b">
              <span className="font-bold text-xl">
                Combine Form Input Group
              </span>
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
          <Card>
            <CardHeader className="border-b">
              <span className="font-bold text-xl">Combine Basic Form</span>
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
          <Card>
            <CardHeader className="border-b">
              <span className="font-bold text-xl">
                Combine Form Input Group With Icon
              </span>
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
  )
}
