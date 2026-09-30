'use client'

import { useState, useMemo } from 'react'
import { Search, Filter, Sparkles, PhoneCall, ShieldCheck, Award } from 'lucide-react'
import { Service, servicesData } from '@/lib/data/services'
import ServiceCard from './ServiceCard'
import ServiceEnquiryModal from './ServiceEnquiryModal'

const CATEGORIES = [
  { id: 'all', label: 'All Services (7)' },
  { id: 'Flights', label: 'Flight Tickets' },
  { id: 'Hotels', label: 'Hotel Booking' },
  { id: 'Umra', label: 'Umra Packages' },
  { id: 'Insurance', label: 'Travel Insurance' },
  { id: 'Visa', label: 'Global Visa' },
  { id: 'Holidays', label: 'Holiday Packages' },
  { id: 'Cruises', label: 'Cruise Booking' },
]

export default function ServicesList() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [modalService, setModalService] = useState<Service | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredServices = useMemo(() => {
    return servicesData.filter((service) => {
      const matchesCategory =
        activeCategory === 'all' || service.category === activeCategory
      const query = searchQuery.trim().toLowerCase()
      if (!query) return matchesCategory

      const matchesSearch =
        service.title.toLowerCase().includes(query) ||
        service.tagline.toLowerCase().includes(query) ||
        service.shortDescription.toLowerCase().includes(query) ||
        service.highlights.some((h) => h.toLowerCase().includes(query)) ||
        service.features.some((f) => f.toLowerCase().includes(query))

      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  const handleOpenEnquiry = (service: Service) => {
    setModalService(service)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="w-full">
      {/* Search and Category Filter Toolbar */}
      <div className="mb-10 sm:mb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-black/[0.08]">
          {/* Category Tabs */}
          <div
            className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none"
            role="tablist"
            aria-label="Filter services by category"
          >
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  role="tab"
                  aria-selected={isActive}
                  className={`text-xs font-semibold px-4 py-2.5 rounded-full transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                    isActive
                      ? 'bg-[#C4171A] text-white shadow-sm'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  {cat.label}
                </button>
              )
            })}
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-72 flex-shrink-0">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services (e.g., Umra, Visa, Cruise)..."
              className="w-full pl-9 pr-4 py-2.5 rounded-full border border-black/10 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)] transition-all"
              aria-label="Search services"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs px-1"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Counter & Status */}
        <div className="flex items-center justify-between text-xs text-stone-500 mt-4 px-1">
          <p>
            Showing <strong>{filteredServices.length}</strong> of {servicesData.length} core services
          </p>
          <p className="hidden sm:inline-block">
            Accredited by <strong>IATA</strong> &amp; <strong>TAFI</strong>
          </p>
        </div>
      </div>

      {/* Grid of Individual Service Cards */}
      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onEnquire={handleOpenEnquiry}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 px-4 bg-stone-50 rounded-3xl border border-stone-200/70">
          <p className="text-lg font-semibold text-gray-800 mb-2">
            No services matched &ldquo;{searchQuery}&rdquo;
          </p>
          <p className="text-xs text-gray-500 max-w-sm mx-auto mb-6">
            We offer custom flight ticketing, hotel booking, Umra, visas, insurance, holidays, and cruise reservations.
          </p>
          <button
            onClick={() => {
              setActiveCategory('all')
              setSearchQuery('')
            }}
            className="btn btn-outline text-xs px-5 py-2.5"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Interactive Modal */}
      <ServiceEnquiryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        initialService={modalService}
      />
    </div>
  )
}
