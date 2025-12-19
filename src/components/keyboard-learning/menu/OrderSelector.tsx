"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup } from "@/components/ui/radio-group"
import { OptionButton } from "./OptionButton"
import type { Mode } from "../types"

interface OrderSelectorProps {
  value: Mode
  onChange: (value: Mode) => void
}

export function OrderSelector({ value, onChange }: OrderSelectorProps) {
  return (
    <div>
      <Label className="text-lg sm:text-xl md:text-2xl font-bold text-slate-700 mb-2 sm:mb-3 block">
        Order
      </Label>
      <RadioGroup
        value={value}
        onValueChange={(v) => onChange(v as Mode)}
        className="flex gap-2 sm:gap-4"
      >
        <OptionButton
          value="random"
          id="random"
          label="Random"
          colorClass="bg-green-400 text-white"
        />
        <OptionButton
          value="sequence"
          id="sequence"
          label="In Order"
          colorClass="bg-cyan-400 text-white"
        />
      </RadioGroup>
    </div>
  )
}
