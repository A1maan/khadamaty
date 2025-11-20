/* this provider holds the mock data store so every page can pretend to hit real apis */
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { serviceProviders } from '../data/customerData'
import {
  myServices as providerServicesSeed,
  pendingRequests as providerPendingSeed,
  activeRequests as providerActiveSeed,
  pastRequests as providerPastSeed,
  providerReviews as providerReviewsSeed,
} from '../data/providerData'
import {
  providerUsers as adminProviderSeed,
  customerUsers as adminCustomerSeed,
  adminUsers as adminAdminsSeed,
} from '../data/adminData'

const MockDataContext = createContext(null)
const STORAGE_KEY = 'khadamatyState'
const STORAGE_VERSION = 1

const formatWindow = (date, time) => {
  if (!date) return 'Schedule TBD'
  try {
    const normalizedTime = time || '09:00'
    const dt = new Date(`${date}T${normalizedTime}`)
    return new Intl.DateTimeFormat('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(dt)
  } catch (error) {
    return `${date} • ${time ?? 'TBD'}`
  }
}

const uid = (prefix) => `${prefix}-${Math.random().toString(36).slice(2, 8)}`

const cloneArray = (arr) => arr.map((item) => ({ ...item }))

const initialCustomerActive = [
  {
    id: 'req-101',
    providerId: 'svc-001',
    status: 'Awaiting confirmation',
    date: '2025-02-14',
    time: '17:00',
    notes: 'Kitchen sink leak needs urgent fix.',
  },
  {
    id: 'req-102',
    providerId: 'svc-002',
    status: 'Scheduled',
    date: '2025-02-15',
    time: '09:00',
    notes: 'Deep clean before hosting family.',
  },
]

const initialCustomerPast = [
  {
    id: 'past-01',
    providerId: 'svc-003',
    completedOn: '2025-02-12',
    rating: 5,
    feedback: 'Car looked brand new afterwards.',
    status: 'Completed',
  },
  {
    id: 'past-02',
    providerId: 'svc-004',
    completedOn: '2025-02-04',
    rating: 4,
    feedback: 'Great photography set, quick delivery.',
    status: 'Completed',
  },
]

const initialSavedProviders = [
  { providerId: 'svc-001', addedAt: '2025-02-10' },
  { providerId: 'svc-005', addedAt: '2025-02-11' },
]

const initialProviderState = {
  services: cloneArray(providerServicesSeed),
  pendingRequests: cloneArray(providerPendingSeed),
  activeRequests: cloneArray(providerActiveSeed),
  pastRequests: cloneArray(providerPastSeed),
  reviews: providerReviewsSeed.map((review) => ({ ...review, response: review.response ?? '' })),
}

const initialAdminState = {
  providerUsers: cloneArray(adminProviderSeed),
  customerUsers: cloneArray(adminCustomerSeed),
  adminUsers: cloneArray(adminAdminsSeed),
}

const deriveAvailabilityTag = (availability = '') => {
  const value = availability.toLowerCase()
  if (value.includes('weekend')) return 'weekend'
  if (value.includes('week')) return 'week'
  return '24h'
}

const mapServiceToPublic = (service, fallback = {}) => {
  const base = { ...fallback, ...service }
  return {
    id: base.id,
    name: base.name ?? fallback.name ?? 'new service',
    category: base.category ?? fallback.category ?? 'home',
    description: base.description ?? fallback.description ?? 'details coming soon.',
    pricing: base.pricing ?? fallback.pricing ?? 'contact for quote',
    priceRange: base.priceRange ?? fallback.priceRange ?? '100-200',
    demand: base.demand ?? fallback.demand ?? 'Medium',
    rating: base.rating ?? fallback.rating ?? 4.8,
    reviews: base.reviews ?? fallback.reviews ?? 0,
    availability: base.availability ?? fallback.availability ?? 'Within 24 hours',
    availabilityTag:
      base.availabilityTag ?? fallback.availabilityTag ?? deriveAvailabilityTag(base.availability ?? ''),
    status: base.status ?? fallback.status ?? 'Active',
  }
}

const getPersistedState = () => {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (parsed.version !== STORAGE_VERSION) return null
    return parsed
  } catch (error) {
    console.warn('Failed to parse persisted state', error)
    return null
  }
}

export const MockDataProvider = ({ children }) => {
  const persisted = getPersistedState()
  const deriveInitialCustomerState = () => {
    const base = persisted?.customerRequests ?? {
      activeRequests: initialCustomerActive,
      pastRequests: initialCustomerPast,
      savedProviders: initialSavedProviders,
    }

    return {
      ...base,
      activeRequests: base.activeRequests.map((request) => ({
        ...request,
        window: request.window ?? formatWindow(request.date, request.time),
      })),
    }
  }

  const [customerRequests, setCustomerRequests] = useState(deriveInitialCustomerState)
  const [publicServices, setPublicServices] = useState(() =>
    (persisted?.publicServices ?? serviceProviders).map((service) => mapServiceToPublic(service))
  )
  const [providerData, setProviderData] = useState(() => persisted?.providerData ?? initialProviderState)
  const [adminData, setAdminData] = useState(() => persisted?.adminData ?? initialAdminState)
  const [flashMessage, setFlashMessage] = useState(null)
  const toastTimerRef = useRef(null)

  const providerMap = useMemo(
    () =>
      publicServices.reduce((acc, provider) => {
        acc[provider.id] = provider
        return acc
      }, {}),
    [publicServices]
  )

  const pushToast = useCallback((message) => {
    if (!message) return
    setFlashMessage(message)
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current)
    }
    toastTimerRef.current = setTimeout(() => {
      setFlashMessage(null)
      toastTimerRef.current = null
    }, 3500)
  }, [])

  const clearToast = useCallback(() => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current)
      toastTimerRef.current = null
    }
    setFlashMessage(null)
  }, [])

  useEffect(() => {
    // keep the latest snapshot in localstorage so a refresh keeps the demo state alive
    if (typeof window === 'undefined') return
    const payload = {
      version: STORAGE_VERSION,
      customerRequests,
      publicServices,
      providerData,
      adminData,
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    } catch (error) {
      console.warn('Failed to persist state', error)
    }
  }, [customerRequests, publicServices, providerData, adminData])

  const upsertPublicService = useCallback(
    (servicePayload) => {
      setPublicServices((prev) => {
        const existing = prev.find((entry) => entry.id === servicePayload.id)
        if (existing) {
          return prev.map((entry) =>
            entry.id === servicePayload.id ? mapServiceToPublic(servicePayload, entry) : entry
          )
        }
        return [mapServiceToPublic(servicePayload), ...prev]
      })
    },
    [setPublicServices]
  )

  const addCustomerRequest = useCallback(
    ({ providerId, date, time, notes }) => {
      const newRequest = {
        id: uid('req'),
        providerId,
        status: 'Awaiting confirmation',
        date,
        time,
        notes,
        window: formatWindow(date, time),
      }
      setCustomerRequests((prev) => ({
        ...prev,
        activeRequests: [newRequest, ...prev.activeRequests],
      }))
      const providerName = providerMap[providerId]?.name ?? 'provider'
      pushToast(`Request sent to ${providerName}`)
      return newRequest.id
    },
    [providerMap, pushToast]
  )

  const saveProviderForLater = useCallback(
    (providerId, notes = '') => {
      setCustomerRequests((prev) => {
        if (prev.savedProviders.some((entry) => entry.providerId === providerId)) {
          return prev
        }
        return {
          ...prev,
          savedProviders: [{ providerId, addedAt: new Date().toISOString(), notes }, ...prev.savedProviders],
        }
      })
      const providerName = providerMap[providerId]?.name ?? 'provider'
      pushToast(`${providerName} saved for later`)
    },
    [providerMap, pushToast]
  )

  const removeSavedProvider = useCallback((providerId) => {
    setCustomerRequests((prev) => ({
      ...prev,
      savedProviders: prev.savedProviders.filter((entry) => entry.providerId !== providerId),
    }))
    pushToast('Removed from saved providers')
  }, [pushToast])

  const bookSavedProvider = useCallback(
    (providerId) => {
      const targetDate = new Date()
      targetDate.setDate(targetDate.getDate() + 1)
      const date = targetDate.toISOString().slice(0, 10)
      const time = '10:00'
      addCustomerRequest({ providerId, date, time, notes: 'Scheduled via saved list' })
    },
    [addCustomerRequest]
  )

  const updateActiveRequestStatus = useCallback(
    (requestId) => {
      const statusFlow = ['Awaiting confirmation', 'Scheduled', 'In Progress', 'Completed']
      setCustomerRequests((prev) => {
        let completedRequest = null
        const nextActive = prev.activeRequests
          .map((request) => {
            if (request.id !== requestId) return request
            const currentIndex = statusFlow.indexOf(request.status)
            const nextIndex = Math.min(currentIndex + 1, statusFlow.length - 1)
            const nextStatus = statusFlow[nextIndex]
            if (nextStatus === 'Completed') {
              completedRequest = {
                id: uid('past'),
                providerId: request.providerId,
                completedOn: new Date().toISOString().slice(0, 10),
                rating: request.rating ?? 0,
                feedback: request.feedback ?? 'Completed via dashboard',
                status: 'Completed',
              }
              return null
            }
            return { ...request, status: nextStatus }
          })
          .filter(Boolean)

        return {
          ...prev,
          activeRequests: nextActive,
          pastRequests: completedRequest ? [completedRequest, ...prev.pastRequests] : prev.pastRequests,
        }
      })
      pushToast('Request updated')
    },
    [pushToast]
  )

  const cancelCustomerRequest = useCallback(
    (requestId, reason = 'Cancelled by customer') => {
      setCustomerRequests((prev) => {
        const target = prev.activeRequests.find((req) => req.id === requestId)
        if (!target) return prev
        const remaining = prev.activeRequests.filter((req) => req.id !== requestId)
        const cancelledEntry = {
          id: uid('past'),
          providerId: target.providerId,
          completedOn: new Date().toISOString().slice(0, 10),
          rating: target.rating ?? 0,
          feedback: reason,
          status: 'Cancelled',
        }
        return {
          ...prev,
          activeRequests: remaining,
          pastRequests: [cancelledEntry, ...prev.pastRequests],
        }
      })
      pushToast('Request cancelled')
    },
    [pushToast]
  )

  const rebookPastRequest = useCallback(
    (pastRequestId) => {
      const target = customerRequests.pastRequests.find((req) => req.id === pastRequestId)
      if (!target) return
      const nextDate = new Date()
      nextDate.setDate(nextDate.getDate() + 2)
      addCustomerRequest({
        providerId: target.providerId,
        date: nextDate.toISOString().slice(0, 10),
        time: '11:00',
        notes: 'Rebooked from history',
      })
    },
    [addCustomerRequest, customerRequests.pastRequests]
  )

  const submitCustomerReview = useCallback((pastRequestId, { rating, feedback }) => {
    setCustomerRequests((prev) => ({
      ...prev,
      pastRequests: prev.pastRequests.map((request) =>
        request.id === pastRequestId ? { ...request, rating, feedback } : request
      ),
    }))
    pushToast('Review submitted')
  }, [pushToast])

  const upsertProviderService = useCallback(
    (serviceId, payload) => {
      if (serviceId) {
        let updatedService = null
        setProviderData((prev) => ({
          ...prev,
          services: prev.services.map((service) => {
            if (service.id !== serviceId) return service
            updatedService = { ...service, ...payload, updated: 'Just now' }
            return updatedService
          }),
        }))
        if (updatedService) {
          upsertPublicService(updatedService)
          pushToast('Service updated')
        }
        return serviceId
      }

      const newId = uid('svc')
      const newService = {
        ...payload,
        id: newId,
        status: payload.status ?? 'Draft',
        updated: 'Just now',
      }
      setProviderData((prev) => ({
        ...prev,
        services: [newService, ...prev.services],
      }))
       upsertPublicService(newService)
      pushToast('Service created')
      return newId
    },
    [pushToast, upsertPublicService]
  )

  const duplicateProviderService = useCallback((serviceId) => {
    let duplicated = null
    setProviderData((prev) => {
      const template = prev.services.find((service) => service.id === serviceId)
      if (!template) return prev
      duplicated = {
        ...template,
        id: uid('svc'),
        name: `${template.name} Copy`,
        status: 'Draft',
        updated: 'Just now',
      }
      return {
        ...prev,
        services: [duplicated, ...prev.services],
      }
    })
    if (duplicated) {
      upsertPublicService(duplicated)
      pushToast('Service duplicated')
    }
  }, [pushToast, upsertPublicService])

  const toggleProviderServiceStatus = useCallback((serviceId) => {
    const flow = ['Active', 'Paused', 'Draft']
    let toggledService = null
    setProviderData((prev) => ({
      ...prev,
      services: prev.services.map((service) => {
        if (service.id !== serviceId) return service
        const currentIndex = flow.indexOf(service.status)
        const nextIndex = (currentIndex + 1) % flow.length
        toggledService = { ...service, status: flow[nextIndex], updated: 'Just now' }
        return toggledService
      }),
    }))
    if (toggledService) {
      upsertPublicService(toggledService)
      pushToast('Service status updated')
    }
  }, [pushToast, upsertPublicService])

  const removeProviderService = useCallback((serviceId) => {
    setProviderData((prev) => ({
      ...prev,
      services: prev.services.filter((service) => service.id !== serviceId),
    }))
    setPublicServices((prev) => prev.filter((service) => service.id !== serviceId))
    pushToast('Service removed')
  }, [pushToast])

  const acceptPendingRequest = useCallback((requestId) => {
    setProviderData((prev) => {
      const pending = prev.pendingRequests.find((request) => request.id === requestId)
      if (!pending) return prev
      const remaining = prev.pendingRequests.filter((request) => request.id !== requestId)
      const promoted = { ...pending, status: 'Confirmed' }
      return {
        ...prev,
        pendingRequests: remaining,
        activeRequests: [promoted, ...prev.activeRequests],
      }
    })
    pushToast('Request accepted')
  }, [pushToast])

  const declinePendingRequest = useCallback((requestId, { reason, notes }) => {
    setProviderData((prev) => {
      const pending = prev.pendingRequests.find((request) => request.id === requestId)
      if (!pending) return prev
      const remaining = prev.pendingRequests.filter((request) => request.id !== requestId)
      const declined = {
        ...pending,
        status: 'Declined',
        declineReason: reason,
        declineNotes: notes,
      }
      return {
        ...prev,
        pendingRequests: remaining,
        pastRequests: [declined, ...prev.pastRequests],
      }
    })
    pushToast('Request declined')
  }, [pushToast])

  const markProviderRequestCompleted = useCallback((requestId) => {
    setProviderData((prev) => {
      const active = prev.activeRequests.find((request) => request.id === requestId)
      if (!active) return prev
      const remaining = prev.activeRequests.filter((request) => request.id !== requestId)
      const completed = { ...active, status: 'Completed', date: active.date ?? new Date().toISOString().slice(0, 10) }
      return {
        ...prev,
        activeRequests: remaining,
        pastRequests: [completed, ...prev.pastRequests],
      }
    })
    pushToast('Request marked as completed')
  }, [pushToast])

  const respondToReview = useCallback((reviewId, response) => {
    setProviderData((prev) => ({
      ...prev,
      reviews: prev.reviews.map((review) => (review.id === reviewId ? { ...review, response } : review)),
    }))
    pushToast('Response saved')
  }, [pushToast])

  const updateAdminProviderStatus = useCallback((userId, status) => {
    setAdminData((prev) => ({
      ...prev,
      providerUsers: prev.providerUsers.map((user) =>
        user.id === userId ? { ...user, status } : user
      ),
    }))
  }, [])

  const updateAdminCustomerStatus = useCallback((userId, status) => {
    setAdminData((prev) => ({
      ...prev,
      customerUsers: prev.customerUsers.map((user) =>
        user.id === userId ? { ...user, status } : user
      ),
    }))
  }, [])

  const updateAdminRole = useCallback((userId, role) => {
    setAdminData((prev) => ({
      ...prev,
      adminUsers: prev.adminUsers.map((user) =>
        user.id === userId ? { ...user, role } : user
      ),
    }))
  }, [])

  const approveProviderSubmission = useCallback((userId) => {
    updateAdminProviderStatus(userId, 'Activated')
    pushToast('Provider approved')
  }, [updateAdminProviderStatus, pushToast])

  const rejectProviderSubmission = useCallback((userId) => {
    updateAdminProviderStatus(userId, 'Deactivated')
    pushToast('Provider rejected')
  }, [updateAdminProviderStatus, pushToast])

  const value = useMemo(
    () => ({
      publicServices,
      providerMap,
      customerRequests,
      providerData,
      adminData,
      addCustomerRequest,
      saveProviderForLater,
      removeSavedProvider,
      bookSavedProvider,
      updateActiveRequestStatus,
      cancelCustomerRequest,
      rebookPastRequest,
      submitCustomerReview,
      upsertProviderService,
      duplicateProviderService,
      toggleProviderServiceStatus,
      removeProviderService,
      acceptPendingRequest,
      declinePendingRequest,
      markProviderRequestCompleted,
      respondToReview,
      approveProviderSubmission,
      rejectProviderSubmission,
      updateAdminProviderStatus,
      updateAdminCustomerStatus,
      updateAdminRole,
      flashMessage,
      clearToast,
      pushToast,
    }),
    [
      publicServices,
      providerMap,
      customerRequests,
      providerData,
      adminData,
      addCustomerRequest,
      saveProviderForLater,
      removeSavedProvider,
      bookSavedProvider,
      updateActiveRequestStatus,
      cancelCustomerRequest,
      rebookPastRequest,
      submitCustomerReview,
      upsertProviderService,
      duplicateProviderService,
      toggleProviderServiceStatus,
      removeProviderService,
      acceptPendingRequest,
      declinePendingRequest,
      markProviderRequestCompleted,
      respondToReview,
      approveProviderSubmission,
      rejectProviderSubmission,
      updateAdminProviderStatus,
      updateAdminCustomerStatus,
      updateAdminRole,
      flashMessage,
      clearToast,
      pushToast,
    ]
  )

  return (
    <MockDataContext.Provider value={value}>
      {children}
    </MockDataContext.Provider>
  )
}

export const useMockData = () => {
  const context = useContext(MockDataContext)
  if (!context) {
    throw new Error('useMockData must be used within a MockDataProvider')
  }
  return context
}
