"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup } from "@/components/ui/radio-group"
import { OptionButton } from "./OptionButton"
import type { Category } from "../types"

interface CategorySelectorProps {
  value: Category
  onChange: (value: Category) => void
}

export function CategorySelector({ value, onChange }: CategorySelectorProps) {
  return (
    <div>
      <Label className="text-lg sm:text-xl md:text-2xl font-bold text-slate-700 mb-2 sm:mb-3 block">
        What to learn?
      </Label>
      <RadioGroup
        value={value}
        onValueChange={(v) => onChange(v as Category)}
        className="flex flex-wrap sm:flex-nowrap gap-2 sm:gap-4"
      >
        <OptionButton
          value="letters"
          id="letters"
          label="ABC"
          colorClass="bg-orange-400 text-white"
        />
        <OptionButton
          value="numbers"
          id="numbers"
          label="123"
          colorClass="bg-pink-400 text-white"
        />
        <OptionButton
          value="both"
          id="both"
          label="Both"
          colorClass="bg-sky-400 text-white"
        />
      </RadioGroup>
    </div>
  )
}
