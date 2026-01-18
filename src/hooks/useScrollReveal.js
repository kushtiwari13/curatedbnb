import { useEffect } from 'react'

const useScrollReveal = (deps = []) => {
  useEffect(() => {
    if (typeof window === 'undefined') return
    const targets = Array.from(document.querySelectorAll('[data-reveal]'))
    if (!targets.length) return

    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 },
    )

    targets.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, deps)
}

export default useScrollReveal
