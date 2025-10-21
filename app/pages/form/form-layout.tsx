import InputField from '~/components/Form/InputField'
import Layout from '~/components/Layout'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader } from '~/components/ui/card'

export default function FormLayout() {
  return (
    <Layout>
      <div className="grid lg:grid-cols-2 grid-cols-1 w-full">
        <div className="flex flex-col gap-5">
          <Card>
            <CardHeader>
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
        </div>
      </div>
    </Layout>
  )
}
