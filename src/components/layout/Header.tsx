// src/components/layout/Header.tsx
import type { ReactNode } from 'react'

type HeaderProps = {
  title?: string
  children?: ReactNode
}

export function Header({ title = 'PREIshare', children }: HeaderProps) {
  return (
    <header className="app-header" role="banner">
      <div className="header-left">{title}</div>
      <div className="header-right">{children}</div>
    </header>
  )
}