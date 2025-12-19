# 🎹 Toddler Alphabet Trainer

> **Keyboard Fun!** - An interactive web app for teaching toddlers letters, numbers, and basic keyboard skills.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

---

## ✨ Features

- 🔤 **Letter Recognition** - English & Spanish alphabets (including Ñ)
- 🔢 **Number Learning** - Customizable number ranges
- 📱 **Fully Responsive** - Works on mobile, tablet, and desktop
- ⌨️ **Virtual Keyboard** - Touch-friendly on-screen keyboard for mobile devices
- 🎯 **Two Learning Modes**:
  - **Just Starting**: Match keyboard key labels (beginner-friendly)
  - **Keyboard Lessons**: Learn proper typing conventions
- ✨ **Engaging Feedback** - Colorful animations and encouraging messages
- 🌍 **Bilingual Support** - Switch between English and Spanish
- 🎨 **Kid-Friendly UI** - Large buttons, playful colors, and clear typography

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- pnpm (recommended)

### Installation & Development

```bash
# Clone the repository
git clone <repository-url>
cd toddler-alphabet-trainer

# Install dependencies
pnpm install

# Start development server
pnpm start
```

Visit [http://localhost:3000](http://localhost:3000) to see the app in action! 🎉

---

## 🎮 How It Works

1. **Configure Settings** - Choose what to learn (letters, numbers, or both)
2. **Select Learning Mode** - Pick between beginner or advanced keyboard lessons
3. **Start Learning** - Type the displayed character on your keyboard
4. **Get Instant Feedback** - See celebration stars for correct answers!

### Learning Modes Explained

| Mode | Description | Best For |
|------|-------------|----------|
| **Just Starting** | Match what's printed on keys (uppercase without Shift) | Toddlers learning letter recognition |
| **Keyboard Lessons** | Standard typing (lowercase default, Shift for uppercase) | Children learning to type properly |

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript 5.9](https://www.typescriptlang.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Package Manager**: [pnpm](https://pnpm.io/)

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js pages & layouts
├── components/
│   ├── keyboard-learning/  # Main app components (modular)
│   │   ├── menu/          # Settings UI
│   │   ├── lesson/        # Learning interface
│   │   └── hooks/         # Custom React hooks
│   └── ui/                # Reusable UI components
├── lib/                   # Utilities
└── hooks/                 # Global hooks
```

> 📖 **For detailed documentation**, see [CONTEXT.md](./src/CONTEXT.md)

---

## 🧑‍💻 Development

### Available Scripts

```bash
# Development server with Turbopack
pnpm start

# Build for production
pnpm build

# Start production server
pnpm build:start

# Clean install (removes node_modules & lock files)
pnpm repack
```

### Key Configuration Files

- `tsconfig.json` - TypeScript configuration with path aliases (`@/*` → `src/*`)
- `components.json` - shadcn/ui component configuration
- `next.config.mjs` - Next.js configuration
- `src/app/globals.css` - Tailwind CSS v4 configuration

---

## 📱 Responsive Design

The app is fully responsive and adapts to all screen sizes:

- **Mobile** (< 640px): Single column layout with virtual keyboard
- **Tablet** (640px - 1024px): Adaptive sizing with touch support
- **Desktop** (> 1024px): Side-by-side cards with physical keyboard

---

## 🎨 Customization

### Changing Timing
Edit `AUTO_SUBMIT_DELAY` in `src/components/keyboard-learning/constants.ts`:
```typescript
export const AUTO_SUBMIT_DELAY = 1000 // milliseconds
```

### Adding Languages
1. Add alphabet to `constants.ts`
2. Add language option to `types.ts`
3. Update `LanguageSelector.tsx`

### Modifying Keyboard Layout
Edit `KEYBOARD_ROWS` in `constants.ts` to change virtual keyboard layout.

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Code Style**: Follow existing TypeScript patterns
2. **Responsive Design**: Test on mobile, tablet, and desktop
3. **Accessibility**: Use semantic HTML and ARIA labels
4. **Documentation**: Update CONTEXT.md if adding major features

---

## 📝 License

This project is created for educational purposes. Feel free to use and modify for your own learning projects.

---

## 🙏 Acknowledgments

Built with amazing open-source technologies:
- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful component library
- [Radix UI](https://www.radix-ui.com/) - Accessible primitives

---

## 📧 Questions?

For detailed architecture and development guidelines, see [CONTEXT.md](./src/CONTEXT.md).

---

**Made with ❤️ for little learners** 🎓✨
