'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { cn } from '~/lib/utils'
import { Button } from '../ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command'
import { Label } from '../ui/label'
import { useRef } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

type SelectFieldProps<T = { value: string; label: string }> = {
  isShowSearch?: boolean
  onChange: (e: string) => void
  dataDropdown: T[]
  placeholder?: string
  value: string | undefined
  labelName: string
  className?: string
  isSuccess?: boolean
  error?: string
}

export function SelectField({
  isShowSearch = false,
  dataDropdown,
  isSuccess = false,
  labelName,
  value,
  onChange,
  error,
  className,
  placeholder = 'Select',
}: SelectFieldProps) {
  const [open, setOpen] = React.useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [triggerWidth, setTriggerWidth] = React.useState<number | undefined>()

  React.useEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth)
    }
  }, [triggerRef.current])

  return (
    <div className="flex flex-col">
      <Label
        className={`${error && 'text-red-500'} ${isSuccess && 'text-green-600'}`}
      >
        {labelName}
      </Label>
      {isShowSearch ? (
        <>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                ref={triggerRef}
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className={`w-full mt-3 ${error && 'border-red-500'} ${isSuccess && 'border-green-600'} justify-between ${className}`}
              >
                {value
                  ? dataDropdown.find((data) => data.value === value)?.label
                  : placeholder}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent style={{ width: triggerWidth }} className="p-0">
              <Command>
                <CommandInput
                  placeholder="Search framework..."
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandGroup>
                    {dataDropdown.map((data) => (
                      <CommandItem
                        key={data.value}
                        value={data.value}
                        onSelect={(currentValue) => {
                          onChange(currentValue === value ? '' : currentValue)
                          setOpen(false)
                        }}
                      >
                        {data.label}
                        <Check
                          className={cn(
                            'ml-auto',
                            value === data.value ? 'opacity-100' : 'opacity-0'
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {error && <span className="text-red-500 text-sm">{error}</span>}
        </>
      ) : (
        <>
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger
              className={`hidden hover:ring-orange-500 hover:ring-2 mt-3 cursor-pointer hover:border-none bg-white w-full rounded-lg sm:ml-auto sm:flex ${error && 'border-red-500'} ${isSuccess && 'border-green-600'}`}
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
          {error && <span className="text-red-500 text-sm">{error}</span>}
        </>
      )}
    </div>
  )
}
