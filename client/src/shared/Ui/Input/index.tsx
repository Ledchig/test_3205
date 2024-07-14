import React from 'react'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'
import { cn } from '@/src/shared/lib'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  placeholder: string
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, placeholder, value, error, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          id={props.id}
          className={cn(
            `peer h-[56px] w-full rounded-xl border py-4 pe-[12px] ps-[14px] text-black placeholder:text-neutral-400`,
            `easy-in-out transition-all hover:border-green-500 hover:pb-0 hover:pt-5 focus:pb-0 focus:pt-5`,
            ` ${value && 'pb-0 pt-5'} ${error && 'border-red-400'}`,
            className
          )}
          value={value}
          ref={ref}
          onMouseEnter={(e) => e.currentTarget.setAttribute('placeholder', placeholder)}
          onMouseLeave={(e) => e.currentTarget.setAttribute('placeholder', '')}
          onFocus={(e) => e.currentTarget.setAttribute('placeholder', placeholder)}
          onBlur={(e) => e.currentTarget.setAttribute('placeholder', '')}
          placeholder={''}
          {...props}
        />
        <label
          htmlFor={props.id}
          className={cn(
            `easy-in-out absolute left-[14px] top-[18px] font-semibold text-neutral-400`,
            `transition-all peer-hover:top-1.5 peer-hover:text-xs peer-hover:font-normal peer-focus:top-1.5 peer-focus:text-xs peer-focus:font-semibold`,
            `${value && 'top-[6px] text-xs font-semibold'}`
          )}
        >
          {label}
        </label>
        {error && (
          <p className="mt-2 flex w-full flex-wrap text-wrap text-red-400">{`${error.message}`}</p>
        )}
      </div>
    )
  }
)

export default Input
