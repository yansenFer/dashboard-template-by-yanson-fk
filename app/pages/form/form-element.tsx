import { CalendarPicker } from '~/components/Form/DatePciker'
import InputField from '~/components/Form/InputField'
import { SelectField } from '~/components/Form/SelectField'
import TextareaField from '~/components/Form/TextareaField'
import Layout from '~/components/Layout'
import SelectFieldDefault from '~/components/Dashboard/SelectFieldDashboard'
import { Card, CardContent, CardHeader } from '~/components/ui/card'
import { frameworks } from '~/data/dataFrameworks'
import { useState } from 'react'

export default function FormElement() {
  const [select1, setSelect1] = useState<string | undefined>('')
  const [select2, setSelect2] = useState<string | undefined>('')
  return (
    <Layout>
      <div className="grid gap-5 lg:grid-cols-2 grid-cols-1 w-full">
        {/* start default input */}
        <Card>
          <CardHeader>
            <span className="font-bold">Default Input</span>
          </CardHeader>
          <CardContent className="gap-5 flex flex-col">
            {/* standart input  */}
            <InputField
              labelName="Input"
              data-border="orange-500"
              className="focus:ring-orange-500"
              onChange={() => {}}
            />
            {/* input with placeholder */}
            <InputField
              labelName="Input with placeholder"
              placeholder="Input with placeholder"
              data-border="orange-500"
              className="focus:ring-orange-500"
              onChange={() => {}}
            />
            {/* password input */}
            <InputField
              labelName="Password input"
              type="password"
              className="focus:ring-orange-500"
              data-border="orange-500"
              placeholder="Input your password"
              onChange={() => {}}
            />
            {/* date picker input */}
            <CalendarPicker
              className="focus:ring-orange-500"
              labelTitle="Date Picker"
            />
            {/* error input */}
            <InputField
              labelName="Input error"
              error="This input is required"
              className="focus:ring-orange-500"
              onChange={() => {}}
            />
            {/* success input */}
            <InputField
              labelName="Input success"
              className="focus:ring-orange-500"
              isSuccess
              onChange={() => {}}
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

        {/* start textarea input */}
        <Card>
          <CardHeader>
            <span className="font-bold">Textarea Input</span>
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

            {/* text area error */}
            <TextareaField
              placeholder="Input a description"
              error="Description is required"
              className="focus:ring-orange-500 h-32"
              labelName="Description"
              onChange={() => {}}
            />
          </CardContent>
        </Card>
        {/* end textarea input */}

        {/* start select input */}
        <Card>
          <CardHeader>
            <span className="font-bold">Select Input</span>
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
              labelName="Select input"
              dataDropdown={frameworks}
              value=""
              onChange={() => {}}
            />
          </CardContent>
        </Card>
        {/* end select input */}
        <Card>
          <CardHeader>
            <span className="font-bold">Input Group</span>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </div>
    </Layout>
  )
}
