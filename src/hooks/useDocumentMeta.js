import { useEffect } from 'react'

const updateMetaTag = (selector, attributes) => {
  if (typeof document === 'undefined') return
  let tag = document.querySelector(selector)
  if (!tag) {
    tag = document.createElement('meta')
    document.head.appendChild(tag)
  }
  Object.entries(attributes).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      tag.setAttribute(key, value)
    }
  })
}

const useDocumentMeta = ({ title, description, ogImage, url }) => {
  useEffect(() => {
    if (typeof document === 'undefined') return

    if (title) {
      document.title = title
      updateMetaTag('meta[property="og:title"]', { property: 'og:title', content: title })
    }

    if (description) {
      updateMetaTag('meta[name="description"]', { name: 'description', content: description })
      updateMetaTag('meta[property="og:description"]', { property: 'og:description', content: description })
    }

    if (ogImage) {
      updateMetaTag('meta[property="og:image"]', { property: 'og:image', content: ogImage })
    }

    if (url) {
      updateMetaTag('meta[property="og:url"]', { property: 'og:url', content: url })
    }
  }, [title, description, ogImage, url])
}

export default useDocumentMeta
