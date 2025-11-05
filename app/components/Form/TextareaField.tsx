import type { ChangeEventHandler, ComponentProps } from 'react'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import type { LucideIcon } from 'lucide-react'
import { useSelector } from 'react-redux'
import type { RootState } from '~/store/store'

export type DefaultInputProps = {
  labelName: string
  onChange: ChangeEventHandler<HTMLInputElement>
  error?: string
  isSuccess?: boolean
  Icon?: LucideIcon
  variant?: 'standart' | 'float-label-1' | 'float-label-2'
} & ComponentProps<'textarea'>
export default function TextareaField({
  labelName,
  error,
  isSuccess = false,
  className,
  placeholder,
  Icon,
  variant = 'standart',
  onChange,
  disabled = false,
  ...props
}: DefaultInputProps) {
  const isDark = useSelector((state: RootState) => state.dark.isDark)
  const contentTextAreaFieldView = () => {
    if (variant === 'standart')
      return (
        <div className="flex  flex-col">
          <Label
            className={`${error && 'text-red-500'} ${isSuccess && 'text-green-600'} `}
          >
            {labelName}
          </Label>
          <Textarea
            disabled={disabled}
            className={`mt-3 relative focus:ring-orange-500 ${error && 'border-red-500'} ${isSuccess && 'border-green-600'} ${className}`}
            {...props}
          />
          {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>
      )
    if (variant === 'float-label-1')
      return (
        <div className="flex flex-col w-full relative">
          <Textarea
            disabled={disabled}
            placeholder={placeholder || ''}
            className={` ${error ? 'border-red-500' : 'border-gray-300'} ${isSuccess && 'border-green-600'} ${className} focus:ring-orange-500 peer w-full border rounded-md pb-2 pt-6 h-12 focus:border-orange-500 hover:border-orange-500`}
            {...props}
          />
          <label
            className={`${error && 'text-red-500'} ${isSuccess && 'text-green-600'} ${isDark ? 'bg-dark' : 'bg-white'} select-none pointer-events-none absolute flex items-center gap-1 left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm transition-all duration-200 peer-hover:top-3 peer-hover:text-xs peer-hover:text-orange-500 peer-focus:top-3 peer-focus:text-xs peer-focus:text-orange-500 peer-[&:not(:placeholder-shown)]:top-3 peer-[&:not(:placeholder-shown)]:text-xs`}
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
          <Textarea
            disabled={disabled}
            placeholder={placeholder || ''}
            className={`${error ? 'border-red-500' : 'border-gray-300'}  ${isSuccess && 'border-green-600'} ${className} focus:ring-orange-500 peer w-full border  rounded-md pb-2 pt-2 h-12 focus:border-orange-500 hover:border-orange-500`}
            {...props}
          />
          <label
            className={`${error && 'text-red-500'} ${isSuccess && 'text-green-600'} ${isDark ? 'bg-dark' : 'bg-white'} rounded-full select-none  pointer-events-none absolute flex items-center gap-1 left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm transition-all duration-200 peer-hover:top-0 peer-hover:text-xs peer-hover:text-orange-500 peer-focus:top-0 peer-focus:text-xs peer-focus:text-orange-500 peer-[&:not(:placeholder-shown)]:top-0 peer-hover:px-1 peer-focus:px-1 peer-[&:not(:placeholder-shown)]:text-xs`}
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
  }

  return contentTextAreaFieldView()
}
