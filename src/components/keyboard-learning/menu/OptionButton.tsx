"use client"

import { RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface OptionButtonProps {
  value: string
  id: string
  label: string
  colorClass: string
  disabled?: boolean
}

export function OptionButton({
  value,
  id,
  label,
  colorClass,
  disabled = false,
}: OptionButtonProps) {
  return (
    <div className="flex items-center space-x-1 sm:space-x-2 flex-1 min-w-0">
      <RadioGroupItem
        value={value}
        id={id}
        className="w-5 h-5 sm:w-6 sm:h-6 shrink-0"
        disabled={disabled}
      />
      <Label
        htmlFor={id}
        className={`text-sm sm:text-lg md:text-xl font-bold cursor-pointer px-2 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl flex-1 text-center truncate ${
          disabled
            ? "bg-slate-300 text-slate-500 cursor-not-allowed"
            : colorClass
        }`}
      >
        {label}
      </Label>
    </div>
  )
}
