'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Upload,
  Lock,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ImageIcon,
  LogOut,
  RefreshCw,
  ExternalLink,
  MapPin,
  Sparkles,
} from 'lucide-react'

interface GalleryItem {
  id: string
  src: string
  caption: string
  location?: string
  alt: string
  aspectRatio?: string
  createdAt?: string
}

export default function AdminGalleryPage() {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authError, setAuthError] = useState('')

  // Form states
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [caption, setCaption] = useState('')
  const [location, setLocation] = useState('')
  const [alt, setAlt] = useState('')
  const [aspectRatio, setAspectRatio] = useState('4/5')

  // Status states
  const [isUploading, setIsUploading] = useState(false)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

  // Gallery items state
  const [items, setItems] = useState<GalleryItem[]>([])
  const [isLoadingItems, setIsLoadingItems] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  // Check stored session
  useEffect(() => {
    const saved = sessionStorage.getItem('ow_admin_pw')
    if (saved) {
      setPassword(saved)
      setIsAuthenticated(true)
      fetchGalleryItems()
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!password) {
      setAuthError('Please enter the admin password')
      return
    }
    // Store in session and load items
    sessionStorage.setItem('ow_admin_pw', password)
    setIsAuthenticated(true)
    setAuthError('')
    fetchGalleryItems()
  }

  const handleLogout = () => {
    sessionStorage.removeItem('ow_admin_pw')
    setIsAuthenticated(false)
    setPassword('')
    setItems([])
  }

  const fetchGalleryItems = async () => {
    setIsLoadingItems(true)
    try {
      const res = await fetch('/api/admin/gallery')
      const data = await res.json()
      if (data.items) {
        setItems(data.items)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoadingItems(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (selected) {
      setFile(selected)
      const url = URL.createObjectURL(selected)
      setPreviewUrl(url)
      if (!caption) {
        // Auto-friendly caption from name
        const friendlyName = selected.name
          .replace(/\.[^/.]+$/, '')
          .replace(/[-_]/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase())
        setCaption(friendlyName)
      }
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) {
      setStatusMessage({ text: 'Please select an image file to upload.', type: 'error' })
      return
    }

    setIsUploading(true)
    setStatusMessage(null)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('caption', caption)
      formData.append('location', location)
      formData.append('alt', alt || caption)
      formData.append('aspectRatio', aspectRatio)

      const res = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${password}`,
        },
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to upload image')
      }

      setStatusMessage({
        text: 'Photo uploaded and committed to GitHub successfully!',
        type: 'success',
      })

      // Reset form
      setFile(null)
      setPreviewUrl(null)
      setCaption('')
      setLocation('')
      setAlt('')
      if (fileInputRef.current) fileInputRef.current.value = ''

      // Reload gallery list
      await fetchGalleryItems()
    } catch (err: any) {
      setStatusMessage({
        text: err.message || 'Something went wrong during upload',
        type: 'error',
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this photo from the gallery?')) {
      return
    }

    setIsDeleting(id)
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
      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete')
      }

      setItems((prev) => prev.filter((i) => i.id !== id))
      setStatusMessage({ text: 'Photo removed from gallery.', type: 'success' })
    } catch (err: any) {
      alert(err.message || 'Failed to delete')
    } finally {
      setIsDeleting(null)
    }
  }

  // --- Login Screen ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-zinc-950 text-white">
        <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#C4171A]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-[#C4171A]/20 flex items-center justify-center text-[#C4171A]">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-serif">Admin Portal</h1>
              <p className="text-xs text-zinc-400">One World Travel Gallery Manager</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#C4171A] focus:ring-2 focus:ring-[#C4171A]/20"
                autoFocus
              />
            </div>

            {authError && (
              <p className="text-xs text-red-400 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" /> {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl font-medium text-sm text-white bg-[#C4171A] hover:bg-[#A31316] transition-colors shadow-lg shadow-[#C4171A]/20 flex items-center justify-center gap-2"
            >
              Sign In to Gallery Admin
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-zinc-800 flex justify-between items-center text-xs text-zinc-500">
            <Link href="/" className="hover:text-zinc-300 transition-colors">
              ← Back to Site
            </Link>
            <span>v1.0 • GitHub Powered</span>
          </div>
        </div>
      </div>
    )
  }

  // --- Main Admin Panel ---
  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-[#C4171A]/30">
      {/* Top Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#C4171A] flex items-center justify-center font-bold text-white shadow-md">
              OW
            </div>
            <div>
              <h1 className="text-sm font-semibold tracking-wide flex items-center gap-2">
                Gallery Manager
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  GitHub Live
                </span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/gallery"
              target="_blank"
              className="text-xs text-zinc-400 hover:text-white px-3 py-1.5 rounded-lg border border-zinc-700/60 hover:border-zinc-500 transition-colors flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" /> View Live Gallery
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs text-zinc-400 hover:text-red-400 p-2 rounded-lg hover:bg-zinc-800 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alerts / Status Messages */}
        {statusMessage && (
          <div
            className={`mb-6 p-4 rounded-2xl border flex items-center gap-3 text-sm animate-fade-in ${
              statusMessage.type === 'success'
                ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
                : 'bg-red-950/40 border-red-500/30 text-red-300'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-400" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Upload Form Box */}
          <div className="lg:col-span-5 bg-zinc-900/70 border border-zinc-800 rounded-3xl p-6 sm:p-7 relative overflow-hidden backdrop-blur">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-4 h-4 text-[#C4171A]" />
              <h2 className="text-base font-semibold text-zinc-100">Upload New Photo</h2>
            </div>

            <form onSubmit={handleUpload} className="space-y-5">
              {/* Dropzone / File Picker */}
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                  Image File
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all ${
                    previewUrl
                      ? 'border-[#C4171A]/40 bg-zinc-950/40'
                      : 'border-zinc-700/80 hover:border-zinc-500 bg-zinc-950/20 hover:bg-zinc-950/40'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {previewUrl ? (
                    <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden group">
                      <Image
                        src={previewUrl}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs text-white">
                        Click to change photo
                      </div>
                    </div>
                  ) : (
                    <div className="py-6 flex flex-col items-center justify-center gap-2 text-zinc-400">
                      <div className="w-12 h-12 rounded-2xl bg-zinc-800/80 flex items-center justify-center text-zinc-300">
                        <Upload className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-medium text-zinc-200">
                        Click to choose photo
                      </span>
                      <span className="text-xs text-zinc-500">
                        Supports JPG, PNG, WEBP (auto-committed to GitHub)
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Caption */}
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                  Caption / Title
                </label>
                <input
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="e.g. Spiti Valley at Sunrise"
                  className="w-full bg-zinc-800/80 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#C4171A]"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                  Location (Optional)
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute left-3.5 top-3 text-zinc-500" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Himachal Pradesh, India"
                    className="w-full bg-zinc-800/80 border border-zinc-700 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#C4171A]"
                  />
                </div>
              </div>

              {/* Aspect Ratio */}
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                  Display Aspect Ratio
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {['4/5', '3/4', '4/3', '1/1'].map((ratio) => (
                    <button
                      type="button"
                      key={ratio}
                      onClick={() => setAspectRatio(ratio)}
                      className={`py-2 text-xs rounded-xl border transition-all ${
                        aspectRatio === ratio
                          ? 'border-[#C4171A] bg-[#C4171A]/20 text-white font-semibold'
                          : 'border-zinc-700 bg-zinc-800/50 text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      {ratio}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isUploading || !file}
                className="w-full py-3 rounded-xl font-medium text-sm text-white bg-[#C4171A] hover:bg-[#A31316] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-[#C4171A]/25 flex items-center justify-center gap-2"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Committing to GitHub...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    Add Photo to Gallery
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Current Photos Gallery List */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between pb-2">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-zinc-400" />
                <h2 className="text-base font-semibold text-zinc-100">
                  Current Gallery Photos ({items.length})
                </h2>
              </div>
              <button
                onClick={fetchGalleryItems}
                disabled={isLoadingItems}
                className="text-xs text-zinc-400 hover:text-white flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-zinc-800 hover:border-zinc-700"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoadingItems ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>

            {isLoadingItems && items.length === 0 ? (
              <div className="p-12 text-center text-zinc-500 flex flex-col items-center justify-center gap-2">
                <Loader2 className="w-6 h-6 animate-spin text-[#C4171A]" />
                <p className="text-xs">Loading photos from repository...</p>
              </div>
            ) : items.length === 0 ? (
              <div className="p-12 border border-zinc-800 rounded-3xl text-center text-zinc-500">
                <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p className="text-sm">No photos found in gallery yet.</p>
                <p className="text-xs text-zinc-600 mt-1">
                  Upload your first photo using the panel on the left!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="group bg-zinc-900 border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-zinc-700 transition-all flex flex-col"
                  >
                    <div
                      className="relative w-full bg-zinc-950 overflow-hidden"
                      style={{ aspectRatio: item.aspectRatio || '4/3' }}
                    >
                      <Image
                        src={item.src}
                        alt={item.alt || item.caption}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 300px"
                      />
                      <button
                        onClick={() => handleDelete(item.id)}
                        disabled={isDeleting === item.id}
                        className="absolute top-2.5 right-2.5 p-2 rounded-xl bg-black/70 hover:bg-red-600 text-white transition-colors backdrop-blur disabled:opacity-50"
                        title="Delete from gallery"
                      >
                        {isDeleting === item.id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    <div className="p-3.5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-zinc-200 line-clamp-1">
                          {item.caption || 'Untitled photo'}
                        </h3>
                        {item.location && (
                          <p className="text-xs text-zinc-400 flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3 text-[#C4171A]" />
                            {item.location}
                          </p>
                        )}
                      </div>
                      <div className="mt-2 pt-2 border-t border-zinc-800/60 flex items-center justify-between text-[11px] text-zinc-500">
                        <span>Ratio: {item.aspectRatio || '4/5'}</span>
                        <span className="font-mono text-[10px] text-zinc-600 truncate max-w-[120px]">
                          {item.id}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
