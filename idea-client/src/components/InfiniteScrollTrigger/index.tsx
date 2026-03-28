// components/InfiniteScrollTrigger.tsx
import type { ReactNode } from 'react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

interface InfiniteScrollTriggerProps {
  onLoadMore: () => void
  isLoading: boolean
  hasNextPage: boolean
  loader?: ReactNode
  endMessage?: ReactNode
  rootMargin?: string
}

export function InfiniteScrollTrigger({
  onLoadMore,
  isLoading,
  hasNextPage,
  loader = <div className="loader">Loading...</div>,
  endMessage = <div className="end-message">✨ You've seen everything ✨</div>,
  rootMargin = '200px',
}: InfiniteScrollTriggerProps) {
  const { targetRef } = useIntersectionObserver({
    onIntersect: onLoadMore,
    enabled: !isLoading && hasNextPage,
    rootMargin,
  })

  if (isLoading) {
    return <>{loader}</>
  }

  if (!hasNextPage) {
    return <>{endMessage}</>
  }

  return <div ref={targetRef} style={{ height: '20px' }} />
}
