"use client"

interface ExitHintProps {
  onExit: () => void
  isMobile: boolean
}

export function ExitHint({ onExit, isMobile }: ExitHintProps) {
  if (isMobile) {
    return (
      <button
        onClick={onExit}
        className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-slate-700 hover:bg-white/90 active:scale-95 transition-all"
      >
        ✕ Exit
      </button>
    )
  }

  return (
    <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-slate-700">
      Press{" "}
      <kbd className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-slate-200 rounded text-xs sm:text-sm">
        Ctrl + Esc
      </kbd>{" "}
      to exit
    </div>
  )
}
