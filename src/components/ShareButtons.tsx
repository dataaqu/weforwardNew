import { Share2, Facebook, Twitter, Linkedin, Copy, MessageSquare } from 'lucide-react'
import { useState } from 'react'
import { useTheme } from './theme-provider'

interface ShareButtonsProps {
  url: string
  title: string
  description: string
  imageUrl?: string
}

export function ShareButtons({ url, title, description }: ShareButtonsProps) {
  const { theme } = useTheme()
  const [showTooltip, setShowTooltip] = useState(false)
  
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&via=WeForward`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setShowTooltip(true)
      setTimeout(() => setShowTooltip(false), 2000)
    } catch (err) {
      console.error('Failed to copy URL:', err)
    }
  }

  const openShare = (shareUrl: string) => {
    window.open(shareUrl, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes')
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url
        })
      } catch (err) {
        console.error('Error sharing:', err)
      }
    }
  }

  return (
    <div className={`flex items-center gap-4 p-4 rounded-lg border ${
      theme === 'dark' ? 'bg-stone-900 border-stone-800' : 'bg-white border-gray-200'
    }`}>
      <span className={`text-sm font-medium ${
        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
      }`}>
        Share:
      </span>
      
      <div className="flex items-center gap-2">
        {/* Native Share (if supported) */}
        {'share' in navigator && (
          <button
            onClick={handleNativeShare}
            className={`p-2 rounded-lg transition-colors ${
              theme === 'dark'
                ? 'hover:bg-stone-800 text-gray-400 hover:text-white'
                : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
            }`}
            title="Share"
          >
            <Share2 size={18} />
          </button>
        )}

        {/* Facebook */}
        <button
          onClick={() => openShare(shareLinks.facebook)}
          className={`p-2 rounded-lg transition-colors hover:bg-blue-50 hover:text-blue-600 ${
            theme === 'dark'
              ? 'text-gray-400 hover:bg-blue-900/20'
              : 'text-gray-600'
          }`}
          title="Share on Facebook"
        >
          <Facebook size={18} />
        </button>

        {/* Twitter */}
        <button
          onClick={() => openShare(shareLinks.twitter)}
          className={`p-2 rounded-lg transition-colors hover:bg-blue-50 hover:text-blue-500 ${
            theme === 'dark'
              ? 'text-gray-400 hover:bg-blue-900/20'
              : 'text-gray-600'
          }`}
          title="Share on Twitter"
        >
          <Twitter size={18} />
        </button>

        {/* LinkedIn */}
        <button
          onClick={() => openShare(shareLinks.linkedin)}
          className={`p-2 rounded-lg transition-colors hover:bg-blue-50 hover:text-blue-700 ${
            theme === 'dark'
              ? 'text-gray-400 hover:bg-blue-900/20'
              : 'text-gray-600'
          }`}
          title="Share on LinkedIn"
        >
          <Linkedin size={18} />
        </button>

        {/* WhatsApp */}
        <button
          onClick={() => openShare(shareLinks.whatsapp)}
          className={`p-2 rounded-lg transition-colors hover:bg-green-50 hover:text-green-600 ${
            theme === 'dark'
              ? 'text-gray-400 hover:bg-green-900/20'
              : 'text-gray-600'
          }`}
          title="Share on WhatsApp"
        >
          <MessageSquare size={18} />
        </button>

        {/* Copy Link */}
        <div className="relative">
          <button
            onClick={copyToClipboard}
            className={`p-2 rounded-lg transition-colors hover:bg-green-50 hover:text-green-600 ${
              theme === 'dark'
                ? 'text-gray-400 hover:bg-green-900/20'
                : 'text-gray-600'
            }`}
            title="Copy link"
          >
            <Copy size={18} />
          </button>
          
          {showTooltip && (
            <div className={`absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs rounded ${
              theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-900 text-white'
            }`}>
              Copied!
            </div>
          )}
        </div>
      </div>
    </div>
  )
}