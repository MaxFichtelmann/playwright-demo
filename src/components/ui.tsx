import { useState } from 'react'
import { clsx } from 'clsx'

export function Button({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none h-9 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90',
        className,
      )}
      {...props}
    />
  )
}

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx('rounded-lg border bg-card text-card-foreground shadow-sm p-4', className)} {...props} />
}

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={clsx(
        'flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className,
      )}
      {...props}
    />
  )
}

export function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  if (!open) return null
  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 grid place-items-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-[90vw] max-w-md rounded-lg border bg-background p-4 shadow-lg">
        {children}
        <div className="mt-4 text-right">
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  )
}

export function useTheme() {
  const [theme, setThemeState] = useState(() => localStorage.getItem('theme') || 'light')
  // apply on mount
  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('dark', (localStorage.getItem('theme') || 'light') === 'dark')
  }
  const setTheme = (t: 'light' | 'dark') => {
    setThemeState(t)
    localStorage.setItem('theme', t)
    document.documentElement.classList.toggle('dark', t === 'dark')
  }
  return { theme: theme as 'light' | 'dark', setTheme }
}
