import { useState, useEffect } from 'react'

export default function VisitorCounter() {
  const [views, setViews] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const hasVisited = sessionStorage.getItem('jp_portfolio_visited')
        const endpoint = hasVisited
          ? 'https://api.counterapi.dev/v1/joyson-pinto-portfolio/views'
          : 'https://api.counterapi.dev/v1/joyson-pinto-portfolio/views/up'

        const res = await fetch(endpoint)
        if (res.ok) {
          const data = await res.json()
          if (data && typeof data.count === 'number') {
            setViews(data.count)
            sessionStorage.setItem('jp_portfolio_visited', 'true')
          }
        }
      } catch {
        // Graceful fallback for offline / adblocker
        setViews(null)
      } finally {
        setLoading(false)
      }
    }

    fetchViews()
  }, [])

  return (
    <div className="visitor-counter mono" title="Real-time Unique Visitor Tracking">
      <span className="dot pulse" />
      <span className="visitor-label">LIVE VISITS:</span>
      <span className="visitor-num">
        {loading ? '...' : views !== null ? views.toLocaleString() : 'LIVE'}
      </span>
    </div>
  )
}
