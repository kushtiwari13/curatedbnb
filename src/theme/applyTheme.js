import { tokens } from './tokens'

export const applyTheme = () => {
  const root = document.documentElement

  Object.entries(tokens.colors).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value)
  })

  Object.entries(tokens.spacing).forEach(([key, value]) => {
    root.style.setProperty(`--space-${key}`, value)
  })

  Object.entries(tokens.radii).forEach(([key, value]) => {
    root.style.setProperty(`--radius-${key}`, value)
  })

  Object.entries(tokens.shadows).forEach(([key, value]) => {
    root.style.setProperty(`--shadow-${key}`, value)
  })

  Object.entries(tokens.transitions).forEach(([key, value]) => {
    root.style.setProperty(`--transition-${key}`, value)
  })

  root.style.setProperty('--font-heading', tokens.typography.heading)
  root.style.setProperty('--font-body', tokens.typography.body)
  root.style.setProperty('--text-line-height', tokens.typography.lineHeight)
  root.style.setProperty('--text-letter-spacing', tokens.typography.letterSpacing)
  root.style.setProperty('--layout-max-width', tokens.layout.contentMaxWidth)
  root.style.setProperty('--layout-grid-gap', tokens.layout.gridGap)
}
