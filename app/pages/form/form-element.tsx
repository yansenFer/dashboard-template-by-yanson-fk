import { CalendarPicker } from '~/components/Form/DatePciker'
import DefaultInput from '~/components/Form/DefaultInput'
import Layout from '~/components/Layout'
import { Card, CardContent, CardHeader } from '~/components/ui/card'

export default function FormElement() {
  return (
    <Layout>
      <div className="grid gap-5 lg:grid-cols-2 grid-cols-1 w-full">
        <Card>
          <CardHeader>
            <span className="font-bold">Default Input</span>
          </CardHeader>

          {/* start default input */}
          <CardContent className="gap-5 flex flex-col">
            {/* standart input  */}
            <DefaultInput labelName="Input" onChange={() => {}} />
            {/* input with placeholder */}
            <DefaultInput
              labelName="Input with placeholder"
              placeholder="Input with placeholder"
              onChange={() => {}}
            />
            {/* password input */}
            <DefaultInput
              labelName="Password input"
              type="password"
              placeholder="Input your password"
              onChange={() => {}}
            />
            {/* date picker input */}
            <CalendarPicker labelTitle="Date Picker" />
            {/* error input */}
            <DefaultInput
              labelName="Input error"
              error="This input is required"
              onChange={() => {}}
            />
            {/* success input */}
            <DefaultInput
              labelName="Input success"
              isSuccess
              onChange={() => {}}
            />
            {/* disabled input */}
            <DefaultInput
              labelName="Input disabled"
              disabled
              onChange={() => {}}
            />
          </CardContent>
        </Card>
        {/* end default input */}
      </div>
    </Layout>
  )
}
