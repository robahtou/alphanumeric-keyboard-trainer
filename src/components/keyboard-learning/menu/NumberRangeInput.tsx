"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface NumberRangeInputProps {
  min: number
  max: number
  onMinChange: (value: number) => void
  onMaxChange: (value: number) => void
}

export function NumberRangeInput({
  min,
  max,
  onMinChange,
  onMaxChange,
}: NumberRangeInputProps) {
  return (
    <div>
      <Label className="text-lg sm:text-xl md:text-2xl font-bold text-slate-700 mb-2 sm:mb-3 block">
        Number Range
      </Label>
      <div className="flex items-center gap-2 sm:gap-4">
        <Input
          type="number"
          value={min}
          onChange={(e) => onMinChange(Number.parseInt(e.target.value) || 0)}
          className="text-lg sm:text-xl md:text-2xl font-bold h-10 sm:h-12 md:h-14 text-center"
        />
        <span className="text-lg sm:text-xl md:text-2xl font-bold text-slate-600 shrink-0">
          to
        </span>
        <Input
          type="number"
          value={max}
          onChange={(e) => onMaxChange(Number.parseInt(e.target.value) || 10)}
          className="text-lg sm:text-xl md:text-2xl font-bold h-10 sm:h-12 md:h-14 text-center"
        />
      </div>
    </div>
  )
}
