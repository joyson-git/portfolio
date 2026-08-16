const CACHE_NAME = 'jp-portfolio-v1'
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/favicon.svg',
  '/icons.svg',
  '/joy.png',
  '/Joyson_Pinto_Resume.pdf',
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

// Fetch: Stale-While-Revalidate with full offline fallback
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return

  // Skip browser extensions or foreign protocols
  if (!event.request.url.startsWith('http')) return

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return cached response immediately if available, while updating cache in background
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
        .catch(() => {
          // If offline and request is HTML navigation, fallback to cached index.html
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html')
          }
          return cachedResponse
        })

      return cachedResponse || fetchPromise
    })
  )
})
