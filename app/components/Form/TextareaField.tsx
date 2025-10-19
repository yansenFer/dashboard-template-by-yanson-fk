import type { ChangeEventHandler, ComponentProps } from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'

export type DefaultInputProps = {
  labelName: string
  onChange: ChangeEventHandler<HTMLInputElement>
  error?: string
  isSuccess?: boolean
} & ComponentProps<'textarea'>
export default function TextareaField({
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
      <Textarea
        disabled={disabled}
        className={`mt-3 relative bg-white ${disabled && 'bg-gray-200 border-gray-300'} ${error && 'border-red-600'} ${isSuccess && 'border-green-600'} ${className}`}
        {...props}
      />
      {error && <span className="text-red-600 text-sm">{error}</span>}
    </div>
  )
}
