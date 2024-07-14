import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

const toMaskNumbers = (value: string | undefined) =>
  value
    ? value
        .split('')
        .filter((el: string) => el !== '-')
        .map((num: string, index: number) => (index !== 0 && index % 2 === 0 ? `-${num}` : num))
        .join('')
    : ''

export { cn, toMaskNumbers }
