import { projectDetails, serviceData } from '@/lib/content'
import { blogPosts } from '@/lib/blog'
import { serviceAreaTowns } from '@/lib/serviceAreas'

/* The bare domain 307-redirects to www, so every sitemap URL uses the www host
   Google actually lands on. Service, project, and blog entries come from the same
   data the pages are generated from, so new content shows up here automatically. */
const SITE_ORIGIN = 'https://www.lumeoutdoor.com'

const STATIC_PAGE_PATHS = ['/', '/services', '/service-areas', '/projects', '/blog', '/about', '/consultation']

export default function sitemap() {
  const staticPageEntries = STATIC_PAGE_PATHS.map((pagePath) => ({
    url: `${SITE_ORIGIN}${pagePath}`,
  }))

  const servicePageEntries = Object.keys(serviceData).map((serviceSlug) => ({
    url: `${SITE_ORIGIN}/services/${serviceSlug}`,
  }))

  const serviceAreaPageEntries = serviceAreaTowns.map((town) => ({
    url: `${SITE_ORIGIN}/service-areas/${town.slug}`,
  }))

  const projectPageEntries = Object.keys(projectDetails).map((projectSlug) => ({
    url: `${SITE_ORIGIN}/projects/${projectSlug}`,
  }))

  const blogPostEntries = blogPosts.map((blogPost) => {
    const publishedDate = new Date(blogPost.dateLabel)
    const hasValidPublishedDate = !Number.isNaN(publishedDate.getTime())

    return {
      url: `${SITE_ORIGIN}/blog/${blogPost.slug}`,
      ...(hasValidPublishedDate ? { lastModified: publishedDate } : {}),
    }
  })

  return [
    ...staticPageEntries,
    ...servicePageEntries,
    ...serviceAreaPageEntries,
    ...projectPageEntries,
    ...blogPostEntries,
  ]
}
