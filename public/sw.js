const CACHE_NAME = 'jp-portfolio-v3'
const STATIC_ASSETS = [
  '/',
  '/favicon.svg',
  '/icons.svg',
  '/joy.png',
  '/projects/proj1.jpg',
  '/projects/proj2.jpg',
  '/projects/proj3.jpg',
  '/projects/proj4.jpg',
  '/projects/proj5.jpg',
  '/projects/proj6.jpg',
]

// Install: Pre-cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('Some assets could not be pre-cached:', err)
      })
    })
  )
  self.skipWaiting()
})

// Activate: Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key)
          }
        })
      )
    })
  )
  self.clients.claim()
})

// Fetch strategy:
// 1. Navigation requests (HTML): Network-First (so new deploys load instantly), fallback to cache when offline
// 2. Static Assets (CSS, JS, Images, Fonts): Cache-First / Stale-While-Revalidate
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return
  if (!event.request.url.startsWith('http')) return

  // HTML Page Navigation -> Network-First
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const copy = response.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy))
          }
          return response
        })
        .catch(() => caches.match('/') || caches.match('/index.html'))
    )
    return
  }

  // PDF / Download assets -> Direct native browser download (no service worker caching)
  if (event.request.url.toLowerCase().endsWith('.pdf') || event.request.url.includes('.pdf')) {
    return
  }

  // API Requests (Counter API / external) -> Direct Network fetch
  if (event.request.url.includes('api.counterapi.dev') || event.request.url.includes('api.web3forms.com')) {
    event.respondWith(fetch(event.request))
    return
  }

  // Static Assets -> Stale-While-Revalidate
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone()
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone)
            })
          }
          return networkResponse
        })
        .catch(() => cachedResponse)

      return cachedResponse || fetchPromise
    })
  )
})
