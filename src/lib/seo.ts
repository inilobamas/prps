import { Metadata } from "next"
import { SITE_CONFIG } from "./constants"

export function generateSEO({
  title,
  description,
  path = "",
  image = "/og-image.png"
}: {
  title?: string
  description?: string  
  path?: string
  image?: string
}): Metadata {
  const siteTitle = title ? `${title} | ${SITE_CONFIG.name}` : SITE_CONFIG.name
  const url = `${SITE_CONFIG.url}${path}`

  return {
    title: siteTitle,
    description: description || SITE_CONFIG.description,
    openGraph: {
      type: "website",
      locale: "id_ID",
      url,
      title: siteTitle,
      description: description || SITE_CONFIG.description,
      siteName: SITE_CONFIG.name,
      images: [{
        url: image,
        width: 1200,
        height: 630,
        alt: siteTitle
      }]
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description: description || SITE_CONFIG.description,
      images: [image],
      creator: SITE_CONFIG.creator
    },
    alternates: {
      canonical: url
    }
  }
}