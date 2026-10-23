'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import {
  Lock,
  LogOut,
  ExternalLink,
  Star,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MessageSquare,
  ImageIcon,
  Upload,
  MapPin,
  Calendar,
  PlusCircle,
  ArrowLeft,
  ShieldCheck,
  Eye,
  Pencil,
  X,
} from 'lucide-react'
import type { Review } from '@/lib/data/reviews'
import type { GalleryItem } from '@/lib/data/gallery'

function AdminPanelContent() {
  const searchParams = useSearchParams()
  const initialTab = searchParams.get('tab') === 'gallery' ? 'gallery' : 'reviews'

  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authError, setAuthError] = useState('')
  const [activeTab, setActiveTab] = useState<'reviews' | 'gallery'>(initialTab)

  // Status notification
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

  // --- REVIEWS STATE ---
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoadingReviews, setIsLoadingReviews] = useState(false)
  const [isSubmittingReview, setIsSubmittingReview] = useState(false)
  const [isDeletingReview, setIsDeletingReview] = useState<string | null>(null)
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null)
  const reviewFormRef = useRef<HTMLDivElement>(null)

  // Review form
  const [author, setAuthor] = useState('')
  const [location, setLocation] = useState('')
  const [journey, setJourney] = useState('')
  const [rating, setRating] = useState(5)
  const [quote, setQuote] = useState('')
  const [travelDate, setTravelDate] = useState('')
  const [isVerified, setIsVerified] = useState(true)

  // --- GALLERY STATE ---
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [isLoadingGallery, setIsLoadingGallery] = useState(false)
  const [isUploadingGallery, setIsUploadingGallery] = useState(false)
  const [isDeletingGallery, setIsDeletingGallery] = useState<string | null>(null)

  // Gallery form
  const [galleryFile, setGalleryFile] = useState<File | null>(null)
  const [galleryPreviewUrl, setGalleryPreviewUrl] = useState<string | null>(null)
  const [galleryCaption, setGalleryCaption] = useState('')
  const [galleryLocation, setGalleryLocation] = useState('')
  const [galleryAlt, setGalleryAlt] = useState('')
  const [galleryAspect, setGalleryAspect] = useState('4/5')
  const galleryFileInputRef = useRef<HTMLInputElement>(null)

  // Check stored session
  useEffect(() => {
    const saved = sessionStorage.getItem('ow_admin_pw')
    if (saved) {
      setPassword(saved)
      setIsAuthenticated(true)
      fetchReviews()
      fetchGallery()
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!password) {
      setAuthError('Please enter the admin password')
      return
    }
    sessionStorage.setItem('ow_admin_pw', password)
    setIsAuthenticated(true)
    setAuthError('')
    fetchReviews()
    fetchGallery()
  }

  const handleLogout = () => {
    sessionStorage.removeItem('ow_admin_pw')
    setIsAuthenticated(false)
    setPassword('')
    setReviews([])
    setGalleryItems([])
  }

  // --- Reviews API calls ---
  const fetchReviews = async () => {
    setIsLoadingReviews(true)
    try {
      const res = await fetch('/api/admin/reviews')
      const data = await res.json()
      if (data.items) setReviews(data.items)
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoadingReviews(false)
    }
  }

  const startEditReview = (r: Review) => {
    setEditingReviewId(r.id)
    setAuthor(r.author)
    setLocation(r.location || '')
    setJourney(r.journey || '')
    setRating(r.rating || 5)
    setQuote(r.quote)
    setTravelDate(r.date || '')
    setIsVerified(r.verified !== false)
    setStatusMessage(null)
    reviewFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const cancelEditReview = () => {
    setEditingReviewId(null)
    setAuthor('')
    setLocation('')
    setJourney('')
    setRating(5)
    setQuote('')
    setTravelDate('')
    setIsVerified(true)
  }

  const handleSaveReview = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!author.trim() || !quote.trim()) {
      setStatusMessage({ text: 'Please fill in traveler name and review quote.', type: 'error' })
      return
    }

    setIsSubmittingReview(true)
    setStatusMessage(null)

    const isEditing = Boolean(editingReviewId)
    const method = isEditing ? 'PUT' : 'POST'

    try {
      const res = await fetch('/api/admin/reviews', {
        method,
        headers: {
          Authorization: `Bearer ${password}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: editingReviewId || undefined,
          author,
          location,
          journey,
          rating,
          quote,
          date: travelDate,
          verified: isVerified,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || `Failed to ${isEditing ? 'update' : 'publish'} review`)

      setStatusMessage({
        text: isEditing ? 'Traveler review updated successfully!' : 'Traveler review published to website successfully!',
        type: 'success',
      })

      cancelEditReview()
      await fetchReviews()
    } catch (err: any) {
      setStatusMessage({ text: err.message || 'Error saving review', type: 'error' })
    } finally {
      setIsSubmittingReview(false)
    }
  }

  const handleDeleteReview = async (id: string) => {
    if (!confirm('Are you sure you want to delete this traveler review?')) return
    setIsDeletingReview(id)
    try {
      const res = await fetch('/api/admin/reviews', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${password}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to delete review')
      setReviews((prev) => prev.filter((r) => r.id !== id))
      setStatusMessage({ text: 'Review removed from website.', type: 'success' })
    } catch (err: any) {
      alert(err.message || 'Failed to delete review')
    } finally {
      setIsDeletingReview(null)
    }
  }

  // --- Gallery API calls ---
  const fetchGallery = async () => {
    setIsLoadingGallery(true)
    try {
      const res = await fetch('/api/admin/gallery')
      const data = await res.json()
      if (data.items) setGalleryItems(data.items)
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoadingGallery(false)
    }
  }

  const handleGalleryFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (selected) {
      setGalleryFile(selected)
      setGalleryPreviewUrl(URL.createObjectURL(selected))
      if (!galleryCaption) {
        const friendly = selected.name
          .replace(/\.[^/.]+$/, '')
          .replace(/[-_]/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase())
        setGalleryCaption(friendly)
      }
    }
  }

  const handleGalleryUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!galleryFile) {
      setStatusMessage({ text: 'Please select an image file to upload.', type: 'error' })
      return
    }

    setIsUploadingGallery(true)
    setStatusMessage(null)

    try {
      const formData = new FormData()
      formData.append('file', galleryFile)
      formData.append('caption', galleryCaption)
      formData.append('location', galleryLocation)
      formData.append('alt', galleryAlt || galleryCaption)
      formData.append('aspectRatio', galleryAspect)

      const res = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { Authorization: `Bearer ${password}` },
        body: formData,
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to upload photo')

      setStatusMessage({ text: 'Photo uploaded and added to gallery successfully!', type: 'success' })
      setGalleryFile(null)
      setGalleryPreviewUrl(null)
      setGalleryCaption('')
      setGalleryLocation('')
      setGalleryAlt('')
      if (galleryFileInputRef.current) galleryFileInputRef.current.value = ''
      await fetchGallery()
    } catch (err: any) {
      setStatusMessage({ text: err.message || 'Error uploading photo', type: 'error' })
    } finally {
      setIsUploadingGallery(false)
    }
  }

  const handleDeleteGallery = async (id: string) => {
    if (!confirm('Are you sure you want to remove this photo from the gallery?')) return
    setIsDeletingGallery(id)
    try {
      const res = await fetch('/api/admin/gallery', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${password}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to delete photo')
      setGalleryItems((prev) => prev.filter((i) => i.id !== id))
      setStatusMessage({ text: 'Photo removed from gallery.', type: 'success' })
    } catch (err: any) {
      alert(err.message || 'Failed to delete photo')
    } finally {
      setIsDeletingGallery(null)
    }
  }

  // --- LOGIN SCREEN (Clean White & Red Theme) ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex flex-col justify-center items-center p-6 text-zinc-900">
        <div className="w-full max-w-md bg-white border border-zinc-200 rounded-3xl p-8 sm:p-10 shadow-xl shadow-zinc-200/50 relative overflow-hidden">
          <div className="w-14 h-14 rounded-2xl bg-[#FEF2F2] border border-[#FEE2E2] flex items-center justify-center text-[#C4171A] mb-6 shadow-sm">
            <Lock className="w-7 h-7" />
          </div>

          <h1 className="text-2xl font-bold font-serif text-zinc-900 mb-1">
            One World Admin
          </h1>
          <p className="text-xs text-zinc-500 mb-8">
            Sign in to manage traveler reviews and website gallery photos.
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2">
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password..."
                className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#C4171A] focus:ring-2 focus:ring-[#C4171A]/20 transition-all"
                autoFocus
              />
            </div>

            {authError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl font-medium text-sm text-white bg-[#C4171A] hover:bg-[#A31316] transition-colors shadow-lg shadow-[#C4171A]/25 flex items-center justify-center gap-2"
            >
              Sign In to Admin Panel
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-zinc-100 flex items-center justify-between">
            <Link
              href="/"
              className="text-xs font-medium text-zinc-500 hover:text-[#C4171A] transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Go Back to Site
            </Link>
            <span className="text-[11px] text-zinc-400 font-mono">One World Travel</span>
          </div>
        </div>
      </div>
    )
  }

  // --- AUTHENTICATED ADMIN PANEL (Left Side Panel + Clean White & Red Theme) ---
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col md:flex-row text-zinc-900 antialiased">
      {/* ============================================================== */}
      {/* LEFT SIDE PANEL (Fixed on desktop, White & Red Theme)          */}
      {/* ============================================================== */}
      <aside className="w-full md:w-72 bg-white border-r border-zinc-200 flex flex-col justify-between md:h-screen md:sticky md:top-0 z-20 flex-shrink-0 shadow-sm">
        {/* Top: Branding & Nav Options */}
        <div>
          {/* Brand header */}
          <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C4171A] flex items-center justify-center font-bold text-white shadow-md shadow-[#C4171A]/25 text-base">
                OW
              </div>
              <div>
                <h2 className="text-sm font-bold text-zinc-900 tracking-tight">One World Travel</h2>
                <p className="text-[11px] text-[#C4171A] font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Admin Dashboard
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Section */}
          <div className="p-4 space-y-6">
            <div>
              <p className="px-3 text-[10px] uppercase font-bold tracking-wider text-zinc-400 mb-2">
                Manage Content
              </p>
              <nav className="space-y-1.5">
                {/* 1. Reviews Option */}
                <button
                  type="button"
                  onClick={() => setActiveTab('reviews')}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeTab === 'reviews'
                      ? 'bg-[#C4171A] text-white shadow-md shadow-[#C4171A]/20'
                      : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-4 h-4" />
                    <span>Traveler Reviews</span>
                  </div>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                      activeTab === 'reviews' ? 'bg-white/25 text-white' : 'bg-zinc-100 text-zinc-600'
                    }`}
                  >
                    {reviews.length}
                  </span>
                </button>

                {/* 2. Gallery Option */}
                <button
                  type="button"
                  onClick={() => setActiveTab('gallery')}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeTab === 'gallery'
                      ? 'bg-[#C4171A] text-white shadow-md shadow-[#C4171A]/20'
                      : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ImageIcon className="w-4 h-4" />
                    <span>Moments Gallery</span>
                  </div>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                      activeTab === 'gallery' ? 'bg-white/25 text-white' : 'bg-zinc-100 text-zinc-600'
                    }`}
                  >
                    {galleryItems.length}
                  </span>
                </button>
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom Section of Left Sidebar */}
        <div className="p-4 border-t border-zinc-100 space-y-3 bg-zinc-50/50">
          {/* Quick link to view current live section */}
          <Link
            href={activeTab === 'reviews' ? '/reviews' : '/gallery'}
            target="_blank"
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-zinc-700 bg-white border border-zinc-200 hover:border-zinc-300 hover:text-zinc-900 shadow-sm transition-all"
          >
            <Eye className="w-3.5 h-3.5 text-[#C4171A]" />
            View Live {activeTab === 'reviews' ? 'Reviews' : 'Gallery'}
          </Link>

          {/* User & Logout */}
          <div className="flex items-center justify-between px-1 pt-1">
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Admin Logged In</span>
            </div>
            <button
              onClick={handleLogout}
              className="text-xs text-zinc-500 hover:text-[#C4171A] flex items-center gap-1 font-medium transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          </div>

          {/* THE SPECIFIED BUTTON: "on last a button go back to site" */}
          <Link
            href="/"
            className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-[#C4171A] bg-[#FEF2F2] hover:bg-[#FEE2E2] border border-[#FEE2E2] transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Go Back to Site
          </Link>
        </div>
      </aside>

      {/* ============================================================== */}
      {/* RIGHT MAIN CONTENT AREA (Clean White & Red Theme)             */}
      {/* ============================================================== */}
      <main className="flex-1 p-6 sm:p-10 max-w-7xl">
        {/* Status Notification */}
        {statusMessage && (
          <div
            className={`mb-6 p-4 rounded-2xl border flex items-center gap-3 text-sm animate-fade-in ${
              statusMessage.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : 'bg-red-50 border-red-200 text-red-700'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-600" />
            )}
            <span className="font-medium">{statusMessage.text}</span>
          </div>
        )}

        {/* ============================================================== */}
        {/* 1. REVIEWS MANAGER TAB                                         */}
        {/* ============================================================== */}
        {activeTab === 'reviews' && (
          <div>
            {/* Header */}
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-zinc-200">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold font-serif text-zinc-900">
                  Traveler Reviews Management
                </h1>
                <p className="text-xs text-zinc-500 mt-1">
                  Add verified customer reviews and experiences directly to the homepage and reviews page.
                </p>
              </div>

              <div className="flex items-center gap-3 self-start sm:self-auto">
                <span className="text-xs font-medium px-3 py-1.5 rounded-xl bg-white border border-zinc-200 text-zinc-700 shadow-sm">
                  Published: <strong className="text-[#C4171A]">{reviews.length}</strong>
                </span>
                <button
                  type="button"
                  onClick={fetchReviews}
                  disabled={isLoadingReviews}
                  className="text-xs text-zinc-600 hover:text-zinc-900 px-3 py-1.5 rounded-xl bg-white border border-zinc-200 shadow-sm transition-all"
                >
                  Refresh
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Form: Add or Edit Review (5 cols) */}
              <div ref={reviewFormRef} className={`lg:col-span-5 bg-white border rounded-3xl p-6 sm:p-7 shadow-sm transition-all ${
                editingReviewId ? 'border-blue-300 ring-2 ring-blue-100' : 'border-zinc-200'
              }`}>
                <div className="flex items-center justify-between mb-5 pb-4 border-b border-zinc-100">
                  <div className="flex items-center gap-2">
                    {editingReviewId ? (
                      <Pencil className="w-5 h-5 text-blue-600" />
                    ) : (
                      <PlusCircle className="w-5 h-5 text-[#C4171A]" />
                    )}
                    <h3 className="font-bold text-zinc-900 text-base font-serif">
                      {editingReviewId ? 'Edit Traveler Review' : 'Add New Traveler Review'}
                    </h3>
                  </div>
                  {editingReviewId && (
                    <button
                      type="button"
                      onClick={cancelEditReview}
                      className="text-xs text-zinc-500 hover:text-zinc-800 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-100 hover:bg-zinc-200 transition-colors cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                      Cancel
                    </button>
                  )}
                </div>

                {editingReviewId && (
                  <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between text-xs text-blue-800">
                    <span>Editing review. Make your changes and click &quot;Save Changes&quot;.</span>
                    <button
                      type="button"
                      onClick={cancelEditReview}
                      className="underline font-semibold ml-2 hover:text-blue-950 cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                )}

                <form onSubmit={handleSaveReview} className="space-y-4">
                  {/* Traveler Name */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                      Traveler Name <span className="text-[#C4171A]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="e.g. Priya Mehta or Arjun & Family"
                      className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#C4171A] focus:ring-1 focus:ring-[#C4171A]"
                    />
                  </div>

                  {/* Star Rating */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                      Star Rating
                    </label>
                    <div className="flex items-center gap-1.5 bg-zinc-50 p-2 rounded-xl border border-zinc-200">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="p-1 rounded-lg hover:scale-110 transition-transform cursor-pointer"
                          aria-label={`${star} Stars`}
                        >
                          <Star
                            size={22}
                            className={star <= rating ? 'fill-amber-400 text-amber-400' : 'text-zinc-300'}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-bold text-amber-500 ml-2">
                        {rating}.0 / 5.0
                      </span>
                    </div>
                  </div>

                  {/* Location & Package in 2 cols */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                        Location / City
                      </label>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. Calicut, India"
                        className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#C4171A]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                        Tour / Package
                      </label>
                      <input
                        type="text"
                        value={journey}
                        onChange={(e) => setJourney(e.target.value)}
                        placeholder="e.g. Dubai Discovery · 5D"
                        className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#C4171A]"
                      />
                    </div>
                  </div>

                  {/* Travel Date */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                      Travel Date / Period
                    </label>
                    <input
                      type="text"
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      placeholder="e.g. October 2026"
                      className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#C4171A]"
                    />
                  </div>

                  {/* Review Text */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                      Review / Experience Quote <span className="text-[#C4171A]">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={quote}
                      onChange={(e) => setQuote(e.target.value)}
                      placeholder="Paste customer's feedback or review words here..."
                      className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#C4171A] focus:ring-1 focus:ring-[#C4171A]"
                    />
                  </div>

                  {/* Verified Checkbox */}
                  <label className="flex items-center gap-2.5 cursor-pointer select-none text-xs text-zinc-700 pt-1">
                    <input
                      type="checkbox"
                      checked={isVerified}
                      onChange={(e) => setIsVerified(e.target.checked)}
                      className="rounded accent-[#C4171A] w-4 h-4 cursor-pointer"
                    />
                    <span className="font-medium">Mark as Verified Traveler</span>
                  </label>

                  {/* Action Buttons */}
                  <div className="flex gap-2.5 pt-2">
                    {editingReviewId && (
                      <button
                        type="button"
                        onClick={cancelEditReview}
                        className="py-3 px-4 rounded-xl font-medium text-sm text-zinc-700 bg-zinc-100 hover:bg-zinc-200 transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={isSubmittingReview}
                      className={`flex-1 py-3.5 px-4 rounded-xl font-medium text-sm text-white ${
                        editingReviewId ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20' : 'bg-[#C4171A] hover:bg-[#A31316] shadow-[#C4171A]/20'
                      } transition-colors shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer`}
                    >
                      {isSubmittingReview ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" /> {editingReviewId ? 'Saving Changes...' : 'Publishing Review...'}
                        </>
                      ) : (
                        <>
                          {editingReviewId ? <Pencil className="w-4 h-4" /> : <PlusCircle className="w-4 h-4" />}
                          <span>{editingReviewId ? 'Save Changes & Update Review' : 'Publish Review to Website'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* List: Published Reviews (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between pb-1">
                  <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                    Published Reviews on Website ({reviews.length})
                  </h3>
                </div>

                {isLoadingReviews ? (
                  <div className="flex items-center justify-center p-12 bg-white border border-zinc-200 rounded-3xl text-zinc-400 gap-3 shadow-sm">
                    <Loader2 className="w-5 h-5 animate-spin text-[#C4171A]" />
                    <span>Loading reviews...</span>
                  </div>
                ) : reviews.length === 0 ? (
                  <div className="text-center p-12 bg-white border border-zinc-200 rounded-3xl shadow-sm">
                    <div className="w-12 h-12 rounded-2xl bg-[#FEF2F2] border border-[#FEE2E2] flex items-center justify-center mx-auto mb-4 text-[#C4171A]">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-bold text-zinc-900 mb-1 font-serif">No Reviews Published Yet</h4>
                    <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                      All previous dummy reviews were removed. Use the form on the left to add your real customer reviews.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {reviews.map((r) => (
                      <div
                        key={r.id}
                        className={`bg-white border rounded-2xl p-5 shadow-sm transition-all relative group ${
                          editingReviewId === r.id ? 'border-blue-400 ring-2 ring-blue-400/20 bg-blue-50/20' : 'border-zinc-200 hover:border-zinc-300'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#C4171A] flex items-center justify-center text-xs font-bold text-white shadow-sm shrink-0">
                              {r.author
                                .split(' ')
                                .map((n) => n[0])
                                .join('')
                                .slice(0, 2)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="text-sm font-bold text-zinc-900">{r.author}</h4>
                                {r.verified !== false && (
                                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                                    ✓ Verified
                                  </span>
                                )}
                                {editingReviewId === r.id && (
                                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold">
                                    Currently Editing
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-zinc-500">
                                {r.location} {r.journey ? `• ${r.journey}` : ''}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 flex-wrap justify-end">
                            <div className="flex items-center gap-0.5 mr-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  size={13}
                                  className={i < r.rating ? 'fill-amber-400 text-amber-400' : 'text-zinc-200'}
                                />
                              ))}
                            </div>
                            <button
                              onClick={() => startEditReview(r)}
                              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 flex items-center gap-1 transition-colors cursor-pointer border border-blue-200/50"
                              title="Edit review"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">Edit</span>
                            </button>
                            <button
                              onClick={() => handleDeleteReview(r.id)}
                              disabled={isDeletingReview === r.id}
                              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-700 hover:bg-red-100 flex items-center gap-1 transition-colors cursor-pointer border border-red-200/50"
                              title="Delete review"
                            >
                              {isDeletingReview === r.id ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#C4171A]" />
                              ) : (
                                <>
                                  <Trash2 className="w-3.5 h-3.5" />
                                  <span className="hidden sm:inline">Delete</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>

                        <blockquote className="text-sm text-zinc-700 italic leading-relaxed pl-3.5 border-l-2 border-[#C4171A] mb-2 font-serif">
                          &ldquo;{r.quote}&rdquo;
                        </blockquote>

                        {r.date && (
                          <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 mt-3 pt-2 border-t border-zinc-100">
                            <Calendar className="w-3 h-3 text-[#C4171A]" />
                            <span>Travel Date: {r.date}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* 2. GALLERY MANAGER TAB                                         */}
        {/* ============================================================== */}
        {activeTab === 'gallery' && (
          <div>
            {/* Header */}
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-zinc-200">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold font-serif text-zinc-900">
                  Moments Gallery Management
                </h1>
                <p className="text-xs text-zinc-500 mt-1">
                  Upload destination photos to GitHub & local storage to appear in the traveler gallery.
                </p>
              </div>

              <div className="flex items-center gap-3 self-start sm:self-auto">
                <span className="text-xs font-medium px-3 py-1.5 rounded-xl bg-white border border-zinc-200 text-zinc-700 shadow-sm">
                  Photos: <strong className="text-[#C4171A]">{galleryItems.length}</strong>
                </span>
                <button
                  type="button"
                  onClick={fetchGallery}
                  disabled={isLoadingGallery}
                  className="text-xs text-zinc-600 hover:text-zinc-900 px-3 py-1.5 rounded-xl bg-white border border-zinc-200 shadow-sm transition-all"
                >
                  Refresh
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Form: Upload Photo (5 cols) */}
              <div className="lg:col-span-5 bg-white border border-zinc-200 rounded-3xl p-6 sm:p-7 shadow-sm">
                <div className="flex items-center gap-2 mb-5 pb-4 border-b border-zinc-100 text-[#C4171A]">
                  <Upload className="w-5 h-5" />
                  <h3 className="font-bold text-zinc-900 text-base font-serif">Upload Photo to Gallery</h3>
                </div>

                <form onSubmit={handleGalleryUpload} className="space-y-4">
                  {/* File Upload Box */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2">
                      Select Image <span className="text-[#C4171A]">*</span>
                    </label>
                    <div
                      onClick={() => galleryFileInputRef.current?.click()}
                      className="border-2 border-dashed border-zinc-300 hover:border-[#C4171A] rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-zinc-50 relative overflow-hidden group min-h-[160px]"
                    >
                      {galleryPreviewUrl ? (
                        <div className="relative w-full h-40">
                          <Image
                            src={galleryPreviewUrl}
                            alt="Preview"
                            fill
                            className="object-contain rounded-xl"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-medium text-white rounded-xl">
                            Click to change image
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="w-12 h-12 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center text-zinc-500 group-hover:text-[#C4171A] group-hover:scale-110 transition-all mb-3 shadow-sm">
                            <ImageIcon className="w-6 h-6" />
                          </div>
                          <p className="text-xs font-semibold text-zinc-700">Click to choose image file</p>
                          <p className="text-[11px] text-zinc-400 mt-1">PNG, JPG, WEBP up to 10MB</p>
                        </>
                      )}
                      <input
                        ref={galleryFileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleGalleryFileChange}
                      />
                    </div>
                  </div>

                  {/* Caption */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                      Photo Title / Caption <span className="text-[#C4171A]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={galleryCaption}
                      onChange={(e) => setGalleryCaption(e.target.value)}
                      placeholder="e.g. Sunset Over Alleppey Backwaters"
                      className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#C4171A]"
                    />
                  </div>

                  {/* Location & Aspect in 2 cols */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                        Location
                      </label>
                      <input
                        type="text"
                        value={galleryLocation}
                        onChange={(e) => setGalleryLocation(e.target.value)}
                        placeholder="e.g. Alleppey, Kerala"
                        className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#C4171A]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                        Card Shape
                      </label>
                      <select
                        value={galleryAspect}
                        onChange={(e) => setGalleryAspect(e.target.value)}
                        className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3.5 py-2.5 text-sm text-zinc-900 focus:outline-none focus:border-[#C4171A]"
                      >
                        <option value="4/5">Portrait (4:5)</option>
                        <option value="3/4">Tall (3:4)</option>
                        <option value="4/3">Landscape (4:3)</option>
                        <option value="1/1">Square (1:1)</option>
                      </select>
                    </div>
                  </div>

                  {/* Alt description */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                      Alt Description (Accessibility)
                    </label>
                    <input
                      type="text"
                      value={galleryAlt}
                      onChange={(e) => setGalleryAlt(e.target.value)}
                      placeholder="Brief descriptive text of the photo..."
                      className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#C4171A]"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isUploadingGallery || !galleryFile}
                    className="w-full py-3.5 px-4 rounded-xl font-medium text-sm text-white bg-[#C4171A] hover:bg-[#A31316] transition-colors shadow-lg shadow-[#C4171A]/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                  >
                    {isUploadingGallery ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Uploading & Saving...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" /> Upload Photo to Gallery
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* List: Gallery Grid (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between pb-1">
                  <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                    Gallery Photos ({galleryItems.length})
                  </h3>
                </div>

                {isLoadingGallery ? (
                  <div className="flex items-center justify-center p-12 bg-white border border-zinc-200 rounded-3xl text-zinc-400 gap-3 shadow-sm">
                    <Loader2 className="w-5 h-5 animate-spin text-[#C4171A]" />
                    <span>Loading photos...</span>
                  </div>
                ) : galleryItems.length === 0 ? (
                  <div className="text-center p-12 bg-white border border-zinc-200 rounded-3xl text-zinc-500 shadow-sm">
                    No photos found in gallery.
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {galleryItems.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white border border-zinc-200 rounded-2xl overflow-hidden group hover:border-[#C4171A]/40 hover:shadow-md transition-all flex flex-col"
                      >
                        <div className="relative aspect-[4/5] bg-zinc-100 overflow-hidden">
                          <Image
                            src={item.src}
                            alt={item.alt || item.caption}
                            fill
                            sizes="(max-width: 640px) 50vw, 25vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <button
                            type="button"
                            onClick={() => handleDeleteGallery(item.id)}
                            disabled={isDeletingGallery === item.id}
                            className="absolute top-2 right-2 p-2 rounded-xl bg-white/95 hover:bg-[#C4171A] hover:text-white text-[#C4171A] shadow-md border border-red-100 transition-colors z-10 disabled:opacity-50"
                            title="Delete photo"
                            aria-label={`Delete photo ${item.caption}`}
                          >
                            {isDeletingGallery === item.id ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Trash2 className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                        <div className="p-3 bg-white flex-1 flex flex-col justify-between gap-2.5">
                          <div>
                            <p className="text-xs font-bold text-zinc-900 truncate" title={item.caption}>{item.caption}</p>
                            {item.location && (
                              <p className="text-[11px] text-zinc-500 truncate flex items-center gap-1 mt-0.5">
                                <MapPin className="w-2.5 h-2.5 text-[#C4171A]" /> {item.location}
                              </p>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => handleDeleteGallery(item.id)}
                            disabled={isDeletingGallery === item.id}
                            className="w-full py-1.5 px-2.5 rounded-lg bg-red-50 hover:bg-[#C4171A] hover:text-white text-[#C4171A] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-red-200 disabled:opacity-50"
                          >
                            {isDeletingGallery === item.id ? (
                              <>
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                <span>Deleting...</span>
                              </>
                            ) : (
                              <>
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Delete Photo</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default function AdminPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center text-zinc-400 text-sm">
          Loading Admin Panel...
        </div>
      }
    >
      <AdminPanelContent />
    </Suspense>
  )
}

