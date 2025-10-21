import type { ChangeEvent, ChangeEventHandler, ComponentProps } from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { ALargeSmall, type LucideIcon } from 'lucide-react'
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupText,
} from '../ui/input-group'

export type DefaultInputProps = {
  labelName: string
  onChange: ChangeEventHandler<HTMLInputElement | HTMLInputElement>
  error?: string
  isSuccess?: boolean
  prefixLabelName?: string
  Icon?: LucideIcon
  variant?: 'standart' | 'float-label-1' | 'float-label-2' | 'prefix-label'
} & ComponentProps<'input'>
export default function InputField({
  labelName,
  error,
  isSuccess = false,
  className,
  prefixLabelName,
  Icon,
  disabled = false,
  placeholder,
  variant = 'standart',
  ...props
}: DefaultInputProps) {
  function contentFieldView() {
    if (variant === 'standart')
      return (
        <div className="flex flex-col">
          <Label
            className={`${error && 'text-red-500'} ${isSuccess && 'text-green-600'}`}
          >
            {labelName}
          </Label>
          <Input
            disabled={disabled}
            className={`mt-3 relative focus:ring-orange-500 bg-white ${disabled && 'bg-gray-200 border-gray-300'} ${error && 'border-red-500'} ${isSuccess && 'border-green-600'} ${className}`}
            {...props}
          />
          {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>
      )
    if (variant === 'float-label-1')
      return (
        <div className="flex flex-col w-full relative">
          <Input
            data-border="orange-500"
            {...props}
            disabled={disabled}
            placeholder={placeholder || ''}
            className={` ${error ? 'border-red-500' : 'border-gray-300'}  ${isSuccess && 'border-green-600'}  ${className} focus:ring-orange-500 peer w-full border rounded-md pb-2 pt-6 h-12 focus:border-orange-500 hover:border-orange-500`}
          />
          <label
            className={`${error && 'text-red-500'} ${isSuccess && 'text-green-600'} select-none pointer-events-none absolute flex items-center gap-1 left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm transition-all duration-200 peer-hover:top-3 peer-hover:text-xs peer-hover:text-orange-500 peer-focus:top-3 peer-focus:text-xs peer-focus:text-orange-500 peer-[&:not(:placeholder-shown)]:top-3 peer-[&:not(:placeholder-shown)]:text-xs`}
          >
            {Icon && <Icon className="w-4 h-4" />}
            {labelName}
          </label>
          {error && (
            <span className="text-red-500 text-sm absolute -translate-y-1/2 top-1/2 right-3 select-none pointer-events-none">
              {error}
            </span>
          )}
        </div>
      )
    if (variant === 'float-label-2')
      return (
        <div className="flex flex-col w-full relative">
          <Input
            data-border="orange-500"
            {...props}
            disabled={disabled}
            placeholder={placeholder || ''}
            className={`${error ? 'border-red-500' : 'border-gray-300'}  ${isSuccess && 'border-green-600'}  ${className} focus:ring-orange-500 peer w-full border  rounded-md pb-2 pt-2 h-12 focus:border-orange-500 hover:border-orange-500`}
          />
          <label
            className={`${error && 'text-red-500'} ${isSuccess && 'text-green-600'} rounded-full select-none bg-white pointer-events-none absolute flex items-center gap-1 left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm transition-all duration-200 peer-hover:top-0 peer-hover:text-xs peer-hover:text-orange-500 peer-focus:top-0 peer-focus:text-xs peer-focus:text-orange-500 peer-[&:not(:placeholder-shown)]:top-0 peer-hover:px-1 peer-focus:px-1 peer-[&:not(:placeholder-shown)]:text-xs`}
          >
            {Icon && <Icon className="w-4 h-4" />}
            {labelName}
          </label>
          {error && (
            <span className="text-red-500 text-sm absolute -translate-y-1/2 top-1/2 right-3 select-none pointer-events-none">
              {error}
            </span>
          )}
        </div>
      )

    if (variant === 'prefix-label')
      return (
        <div className="flex flex-col">
          <Label
            className={`${error && 'text-red-500'} ${isSuccess && 'text-green-600'}`}
          >
            {labelName}
          </Label>
          <InputGroup
            className={`mt-3 relative bg-white ${disabled && 'bg-gray-200 border-gray-300'} ${error && 'border-red-500'} ${isSuccess && 'border-green-600'} ${className}`}
          >
            <InputGroupInput
              {...props}
              disabled={disabled}
              placeholder={placeholder}
              className="!pl-1 ring-orange-500"
            />
            <InputGroupAddon className="border-r pr-3 transition-all duration-300 group-has-[[data-slot=input-group-control]:focus-visible]/input-group:border-orange-500">
              <InputGroupText>{prefixLabelName}</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
          {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>
      )
  }

  return contentFieldView()
}
