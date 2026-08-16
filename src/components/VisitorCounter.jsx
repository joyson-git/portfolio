import { useState, useEffect } from 'react'

export default function VisitorCounter() {
  const [views, setViews] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const DEVICE_KEY = 'jp_device_tracked_v1'
        const hasTracked = localStorage.getItem(DEVICE_KEY)
        const endpoint = hasTracked
          ? 'https://api.counterapi.dev/v1/joyson-pinto-portfolio-unique/views'
          : 'https://api.counterapi.dev/v1/joyson-pinto-portfolio-unique/views/up'

        const res = await fetch(endpoint)
        if (res.ok) {
          const data = await res.json()
          if (data && typeof data.count === 'number') {
            setViews(data.count)
            localStorage.setItem(DEVICE_KEY, 'true')
          }
        }
      } catch {
        setViews(null)
      } finally {
        setLoading(false)
      }
    }

    fetchViews()
  }, [])

  return (
    <div className="visitor-counter mono" title="Unique Device Count (1 count per physical device)">
      <span className="visitor-pulse-dot" />
      <span className="visitor-label">UNIQUE VISITORS:</span>
      <span className="visitor-num">
        {loading ? '...' : views !== null ? views.toLocaleString() : '1'}
      </span>
    </div>
  )
}
