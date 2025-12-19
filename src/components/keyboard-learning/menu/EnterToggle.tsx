"use client"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

interface EnterToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
}

export function EnterToggle({ checked, onChange }: EnterToggleProps) {
  return (
    <div className="flex items-center justify-between bg-slate-100 rounded-lg sm:rounded-xl p-3 sm:p-4">
      <Label
        htmlFor="requireEnter"
        className="text-sm sm:text-lg md:text-xl font-bold text-slate-700"
      >
        Press Enter to submit answer
      </Label>
      <Switch
        id="requireEnter"
        checked={checked}
        onCheckedChange={onChange}
        className="data-[state=checked]:bg-green-500"
      />
    </div>
  )
}
