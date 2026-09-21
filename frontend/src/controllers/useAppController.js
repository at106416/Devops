import { useState } from 'react'

export function useAppController() {
  const [view, setView] = useState('landing')

  return {
    view,
    navigateTo: setView,
    isAuthView: view === 'login' || view === 'register',
  }
}
