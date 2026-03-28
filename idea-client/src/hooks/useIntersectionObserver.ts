// hooks/useIntersectionObserver.ts
import { useEffect, useRef } from 'react'

interface UseIntersectionObserverProps {
  onIntersect: () => void
  enabled?: boolean
  rootMargin?: string
  threshold?: number
}

export function useIntersectionObserver({
  onIntersect,
  enabled = true,
  rootMargin = '100px',
  threshold = 0.1,
}: UseIntersectionObserverProps) {
  const targetRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!enabled || !targetRef.current) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onIntersect()
        }
      },
      { rootMargin, threshold }
    )

    observer.observe(targetRef.current)

    return () => observer.disconnect()
  }, [enabled, onIntersect, rootMargin, threshold])

  return { targetRef }
}
