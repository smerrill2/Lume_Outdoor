import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { blogPosts, getBlogPost } from '@/lib/blog'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    return { title: 'Article Not Found | Lume Outdoor' }
  }

  const url = `https://lumeoutdoor.com/blog/${post.slug}`

  return {
    title: `${post.title} | Lume Outdoor`,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url,
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: [{ url: post.image, alt: post.imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  }
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) notFound()

  const relatedPosts = blogPosts.filter((candidate) => candidate.slug !== post.slug).slice(0, 2)
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: `https://lumeoutdoor.com${post.image}`,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Lume Outdoor',
      url: 'https://lumeoutdoor.com',
    },
    mainEntityOfPage: `https://lumeoutdoor.com/blog/${post.slug}`,
  }

  return (
    <div className="min-h-screen bg-[#f6f4ef]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, '\\u003c') }}
      />

      <header className="relative -mt-[80px] min-h-[720px] overflow-hidden pt-[80px] text-white md:min-h-[780px]">
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          priority
          className="object-cover blog-hero-image"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/25" />

        <div className="relative mx-auto flex min-h-[640px] max-w-7xl flex-col justify-end px-4 pb-14 sm:px-6 md:min-h-[700px] md:pb-20 lg:px-8">
          <Link
            href="/blog"
            className="mb-10 inline-flex w-fit items-center gap-2 text-sm font-light text-white/65 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            All field notes
          </Link>
          <div className="max-w-4xl blog-rise">
            <p className="text-xs font-medium uppercase tracking-[0.26em] text-orange-300">
              {post.eyebrow}
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-extralight leading-[1.08] tracking-tight sm:text-5xl md:text-7xl">
              {post.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-white/70 md:text-lg">
              {post.excerpt}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4 text-xs text-white/55">
              <span>By {post.author}</span>
              <span className="h-px w-7 bg-white/30" />
              <time dateTime={post.publishedAt}>{post.dateLabel}</time>
              <span className="h-px w-7 bg-white/30" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[220px_minmax(0,720px)] lg:justify-center lg:gap-20 lg:px-8">
        <aside className="hidden lg:block">
          <div className="sticky top-28 border-l border-black/15 pl-5">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#C96A1B]">
              In this guide
            </p>
            <ol className="mt-5 space-y-4">
              {post.sections.map((section) => (
                <li key={section.heading}>
                  <a
                    href={`#${section.heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}
                    className="text-xs font-light leading-relaxed text-neutral-500 transition hover:text-neutral-950"
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </aside>

        <article>
          <p className="border-b border-black/15 pb-10 text-xl font-light leading-[1.75] text-neutral-700 md:text-2xl">
            {post.intro}
          </p>

          <div className="pt-4">
            {post.sections.map((section) => {
              const id = section.heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

              return (
                <section key={section.heading} id={id} className="scroll-mt-28 border-b border-black/10 py-10 md:py-12">
                  <h2 className="text-2xl font-light leading-tight tracking-tight text-neutral-950 md:text-3xl">
                    {section.heading}
                  </h2>
                  <div className="mt-6 space-y-5">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="text-base font-light leading-[1.85] text-neutral-650 md:text-[17px]">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {section.takeaway && (
                    <blockquote className="mt-8 border-l-2 border-[#C96A1B] py-1 pl-6 text-xl font-light leading-relaxed text-neutral-900">
                      {section.takeaway}
                    </blockquote>
                  )}
                </section>
              )
            })}
          </div>

          <div className="mt-12 bg-neutral-950 px-7 py-10 text-white sm:px-10 sm:py-12">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-orange-300">
              Your property is different
            </p>
            <h2 className="mt-4 text-2xl font-light tracking-tight md:text-3xl">
              Let&apos;s build the plan around it.
            </h2>
            <p className="mt-4 max-w-xl text-sm font-light leading-relaxed text-white/55">
              We design and install outdoor lighting throughout Wichita and the
              surrounding area. The first conversation is free.
            </p>
            <Link
              href="/consultation"
              className="btn-copper mt-7 h-11 px-6 text-sm"
            >
              Schedule a consultation
              <ArrowRight className="btn-arrow h-4 w-4" />
            </Link>
          </div>
        </article>
      </main>

      <section className="border-t border-black/10 bg-white px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between border-b border-black/15 pb-5">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#C96A1B]">
                Keep reading
              </p>
              <h2 className="mt-3 text-3xl font-light tracking-tight text-neutral-900">
                More field notes
              </h2>
            </div>
            <Link href="/blog" className="hidden items-center gap-2 text-sm text-neutral-600 hover:text-neutral-950 sm:inline-flex">
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-10 pt-10 md:grid-cols-2 md:gap-8">
            {relatedPosts.map((related) => (
              <Link key={related.slug} href={`/blog/${related.slug}`} className="group">
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                  <Image
                    src={related.image}
                    alt={related.imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <p className="mt-5 text-xs font-medium uppercase tracking-[0.2em] text-[#C96A1B]">
                  {related.eyebrow}
                </p>
                <h3 className="mt-3 text-2xl font-light leading-tight tracking-tight text-neutral-900">
                  {related.title}
                </h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-neutral-600">
                  {related.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
