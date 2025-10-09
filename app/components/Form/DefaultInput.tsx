import type { ChangeEventHandler, ComponentProps } from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

export type DefaultInputProps = {
  labelName: string
  onChange: ChangeEventHandler<HTMLInputElement>
  error?: string
  isSuccess?: boolean
} & ComponentProps<'input'>
export default function DefaultInput({
  labelName,
  error,
  isSuccess = false,
  className,
  disabled = false,
  ...props
}: DefaultInputProps) {
  return (
    <div className="flex  flex-col">
      <Label
        className={`${error && 'text-red-600'} ${isSuccess && 'text-green-600'} `}
      >
        {labelName}
      </Label>
      <Input
        disabled={disabled}
        className={`outline-none mt-3 relative bg-white ring-0 ${disabled && 'bg-gray-200 border-gray-300'} ${error && 'border-red-600'} ${isSuccess && 'border-green-600'} focus:outline-none focus:ring-0 focus:ring-transparent focus:outline-transparent ${className}`}
        {...props}
      />
      {error && <span className="text-red-600 ml-3 text-sm">{error}</span>}
    </div>
  )
}
