import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

type SelectFieldProps<T = { value: string; label: string }> = {
  value: string
  onChange: (e: string) => void
  dataDropdown: T[]
  placeholder?: string
}

export default function SelectFieldDashboard({
  value,
  onChange,
  dataDropdown,
  placeholder,
}: SelectFieldProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
        aria-label="Select a value"
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="rounded-xl">
        {dataDropdown.length > 0 ? (
          dataDropdown.map((data) => (
            <SelectItem
              key={data.value}
              value={data.value}
              className="rounded-lg"
            >
              {data.label}
            </SelectItem>
          ))
        ) : (
          <SelectItem value="90d" className="rounded-lg">
            No Data
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  )
}
