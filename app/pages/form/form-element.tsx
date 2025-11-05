import { CalendarPicker } from '~/components/Form/DatePciker'
import InputField from '~/components/Form/InputField'
import { SelectField } from '~/components/Form/SelectField'
import TextareaField from '~/components/Form/TextareaField'
import Layout from '~/components/Layout'
import { Card, CardContent, CardHeader } from '~/components/ui/card'
import { frameworks } from '~/data/dataFrameworks'
import { useState } from 'react'
import { ALargeSmall } from 'lucide-react'

export default function FormElement() {
  const [select1, setSelect1] = useState<string | undefined>('')
  const [select2, setSelect2] = useState<string | undefined>('')
  return (
    <Layout>
      <div className="grid gap-5 lg:grid-cols-2 grid-cols-1 w-full">
        <div className="flex flex-col gap-5">
          {/* start default input */}
          <Card>
            <CardHeader className="border-b">
              <span className="font-bold text-xl">Default Input</span>
            </CardHeader>
            <CardContent className="gap-5 flex flex-col">
              {/* standart input  */}
              <InputField
                labelName="Input"
                className="focus:ring-orange-500"
                onChange={() => {}}
              />
              {/* input with placeholder */}
              <InputField
                labelName="Input with placeholder"
                placeholder="Input with placeholder"
                className="focus:ring-orange-500"
                onChange={() => {}}
              />
              {/* password input */}
              <InputField
                labelName="Password input"
                type="password"
                className="focus:ring-orange-500"
                placeholder="Input your password"
                onChange={() => {}}
              />
              {/* date picker input */}
              <CalendarPicker
                className="focus:ring-orange-500"
                labelTitle="Date Picker"
              />
              {/* disabled input */}
              <InputField
                labelName="Input disabled"
                disabled
                onChange={() => {}}
              />
            </CardContent>
          </Card>
          {/* end default input */}

          {/* start select input */}
          <Card>
            <CardHeader className="border-b">
              <span className="font-bold text-xl">Select Input</span>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              {/* default select */}
              <SelectField
                labelName="Select input"
                dataDropdown={frameworks}
                value={select1}
                onChange={(e) => setSelect1(e)}
              />
              {/* select with search */}
              <SelectField
                isShowSearch
                labelName="Select input with search"
                dataDropdown={frameworks}
                value={select2}
                onChange={(e) => setSelect2(e)}
              />
            </CardContent>
          </Card>
          {/* end select input */}

          {/* start input error */}
          <Card>
            <CardHeader className="border-b">
              <span className="font-bold text-xl">Error Input</span>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <InputField
                labelName="Input Default"
                error="*Input default is required"
                onChange={() => {}}
              />
              <TextareaField
                labelName="Text area input"
                error="*Text area is required"
                onChange={() => {}}
              />
              <SelectField
                labelName="Select input"
                dataDropdown={frameworks}
                error="*Select input is required"
                value={select1}
                onChange={(e) => setSelect1(e)}
              />
              <SelectField
                labelName="Select input with search"
                dataDropdown={frameworks}
                isShowSearch
                error="*Select input with search is required"
                value={select1}
                onChange={(e) => setSelect1(e)}
              />
              <InputField
                labelName="Input group float label 1"
                variant="float-label-1"
                error="*Input group float label 1 is required"
                onChange={() => {}}
              />
              <InputField
                labelName="Input group float label 2"
                variant="float-label-2"
                error="*Input group float label 2 is required"
                onChange={() => {}}
              />
            </CardContent>
          </Card>
          {/* end input error */}
        </div>
        <div className="flex flex-col gap-5">
          {/* start textarea input */}
          <Card>
            <CardHeader className="border-b">
              <span className="font-bold text-xl">Textarea Input</span>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              {/* text area normal */}
              <TextareaField
                placeholder="Input a description"
                className="focus:ring-orange-500 h-32"
                labelName="Description"
                onChange={() => {}}
              />
              {/* text area disabled */}
              <TextareaField
                disabled
                placeholder="Input a description"
                className="focus:ring-orange-500 h-32"
                labelName="Description"
                onChange={() => {}}
              />
            </CardContent>
          </Card>
          {/* end textarea input */}

          {/* start input group */}
          <Card>
            <CardHeader className="border-b">
              <span className="font-bold text-xl">Input Group</span>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              {/* input group variant float label 1 */}
              <InputField
                labelName="Variant float label 1 with icon"
                Icon={ALargeSmall}
                variant="float-label-1"
                onChange={() => {}}
              />
              {/* input variant float label 2 with icon */}
              <InputField
                labelName="Variant float label 2 with icon"
                Icon={ALargeSmall}
                variant="float-label-2"
                onChange={() => {}}
              />
              {/* input variant prefix label */}
              <InputField
                labelName="Url"
                Icon={ALargeSmall}
                prefixLabelName="https://"
                placeholder="Input your url"
                variant="prefix-label"
                onChange={() => {}}
              />
              <InputField
                labelName="Phone Number"
                Icon={ALargeSmall}
                prefixLabelName="+62"
                placeholder="812xxxxxxxxx"
                variant="prefix-label"
                onChange={() => {}}
              />
            </CardContent>
          </Card>
          {/* end input group */}

          {/* start success input */}
          <Card>
            <CardHeader className="border-b">
              <span className="font-bold text-xl">Success Input</span>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <InputField
                labelName="Input Default"
                isSuccess
                onChange={() => {}}
              />
              <TextareaField
                labelName="Text area input"
                isSuccess
                onChange={() => {}}
              />
              <SelectField
                labelName="Select input"
                dataDropdown={frameworks}
                isSuccess
                value={select1}
                onChange={(e) => setSelect1(e)}
              />
              <SelectField
                labelName="Select input with search"
                dataDropdown={frameworks}
                isShowSearch
                isSuccess
                value={select1}
                onChange={(e) => setSelect1(e)}
              />
              <InputField
                labelName="Input group float label 1"
                variant="float-label-1"
                isSuccess
                onChange={() => {}}
              />
              <InputField
                labelName="Input group float label 2"
                variant="float-label-2"
                isSuccess
                onChange={() => {}}
              />
            </CardContent>
          </Card>
          {/* end succes input */}
        </div>
      </div>
    </Layout>
  )
}
