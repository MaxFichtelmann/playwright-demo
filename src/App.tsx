import { useMemo, useState } from 'react'
import './App.css'
import { Button, Card, Input, Modal, useTheme } from './components/ui'

function App() {
  const [count, setCount] = useState(0)
  const [todos, setTodos] = useState<{ id: number; title: string; done: boolean }[]>([])
  const [title, setTitle] = useState('')
  const [open, setOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const remaining = useMemo(() => todos.filter(t => !t.done).length, [todos])

  function addTodo() {
    if (!title.trim()) return
    setTodos((prev) => [...prev, { id: Date.now(), title: title.trim(), done: false }])
    setTitle('')
  }

  function toggleTodo(id: number) {
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, done: !t.done } : t)))
  }
  function deleteTodo(id: number) {
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Playwright Demo</h1>
        <div className="flex items-center gap-2">
          <span aria-live="polite" className="text-sm">Theme: {theme}</span>
          <Button aria-label="Toggle theme" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            Toggle Theme
          </Button>
        </div>
      </header>

      <Card>
        <h2 className="text-lg font-semibold mb-2">Counter</h2>
        <p className="mb-2">A basic increment button.</p>
        <Button onClick={() => setCount((c) => c + 1)} aria-label="increment">
          Count is <span data-testid="count" className="ml-1">{count}</span>
        </Button>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold mb-2">Todos</h2>
        <div className="flex gap-2 mb-3">
          <label className="sr-only" htmlFor="todo-input">New todo</label>
          <Input
            id="todo-input"
            placeholder="Add a task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          />
          <Button onClick={addTodo} aria-label="Add todo">Add</Button>
        </div>
        <ul className="space-y-2">
          {todos.map(t => (
            <li key={t.id} className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" aria-label={`toggle ${t.title}`} checked={t.done} onChange={() => toggleTodo(t.id)} />
                <span className={t.done ? 'line-through text-muted-foreground' : ''}>{t.title}</span>
              </label>
              <Button aria-label={`delete ${t.title}`} onClick={() => deleteTodo(t.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</Button>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm" aria-live="polite">Remaining: <span data-testid="remaining">{remaining}</span></p>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold mb-2">Modal</h2>
        <Button onClick={() => setOpen(true)} aria-label="Open modal">Open Modal</Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <h3 className="text-lg font-semibold">Hello from Modal</h3>
          <p className="mt-2">This demonstrates dialog interactions.</p>
        </Modal>
      </Card>
    </div>
  )
}

export default App
