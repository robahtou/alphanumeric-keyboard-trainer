// Category types for what to learn
export type Category = "letters" | "numbers" | "both"

// Mode for character presentation
export type Mode = "random" | "sequence"

// Language selection
export type Language = "english" | "spanish"

// Letter case options
export type LetterCase = "uppercase" | "lowercase" | "both"

// Learning mode - how keyboard input is interpreted
export type LearningMode = "just-starting" | "keyboard-lessons"

// Screen state
export type Screen = "menu" | "lesson"

// Feedback state for answers
export type Feedback = "correct" | "incorrect" | null

// Settings interface for all configuration options
export interface Settings {
  category: Category
  mode: Mode
  language: Language
  letterCase: LetterCase
  learningMode: LearningMode
  numberMin: number
  numberMax: number
  requireEnter: boolean
}

// Star animation position
export interface StarPosition {
  x: number
  y: number
  id: number
}

// Props for the virtual keyboard
export interface VirtualKeyboardProps {
  onKeyPress: (key: string) => void
  onShiftPress?: () => void
  isShiftActive?: boolean
  targetChar?: string
  learningMode: LearningMode
}

// Props for menu screen
export interface MenuScreenProps {
  settings: Settings
  onSettingsChange: (settings: Settings) => void
  onStartLesson: () => void
}

// Props for lesson screen
export interface LessonScreenProps {
  currentChar: string
  userInput: string
  feedback: Feedback
  settings: Settings
  stars: StarPosition[]
  autoSubmitDelay: number
  onKeyInput: (key: string, shiftKey?: boolean) => void
  onExit: () => void
}

// Default settings
export const DEFAULT_SETTINGS: Settings = {
  category: "letters",
  mode: "random",
  language: "english",
  letterCase: "uppercase",
  learningMode: "just-starting",
  numberMin: 1,
  numberMax: 10,
  requireEnter: false,
}
