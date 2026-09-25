import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { blogPosts } from '@/lib/blog'

export const metadata = {
  title: 'Outdoor Lighting Guides & Ideas | Lume Outdoor',
  description:
    'Practical outdoor lighting advice from Lume Outdoor, including fixture guides, design notes, and ideas for Wichita-area homes.',
  alternates: {
    canonical: 'https://lumeoutdoor.com/blog',
  },
  openGraph: {
    title: 'Outdoor Lighting Guides & Ideas | Lume Outdoor',
    description:
      'Straightforward outdoor lighting advice from the team that designs and installs it.',
    url: 'https://lumeoutdoor.com/blog',
    images: ['/projects/reeds_cove_project/IMG_5410.jpeg'],
  },
}

export default function BlogPage() {
  const [featuredPost, ...morePosts] = blogPosts

  return (
    <div className="min-h-screen bg-[#f6f4ef]">
      <header className="relative -mt-[80px] min-h-[680px] overflow-hidden pt-[80px] text-white">
        <Image
          src={featuredPost.image}
          alt={featuredPost.imageAlt}
          fill
          priority
          className="object-cover blog-hero-image"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

        <div className="relative mx-auto flex min-h-[600px] max-w-7xl items-end px-4 pb-16 sm:px-6 md:pb-20 lg:px-8">
          <div className="max-w-3xl blog-rise">
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.28em] text-orange-300">
              The Lume Field Notes
            </p>
            <h1 className="max-w-2xl text-4xl font-extralight leading-[1.08] tracking-tight sm:text-5xl md:text-7xl">
              Better light starts with a better plan.
            </h1>
            <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-white/70 md:text-lg">
              Straightforward advice about fixtures, placement, and the little
              choices that make outdoor lighting feel right.
            </p>
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div className="mb-10 flex items-end justify-between border-b border-black/15 pb-5">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#C96A1B]">
                Latest notes
              </p>
              <h2 className="mt-3 text-3xl font-light tracking-tight text-neutral-900 md:text-4xl">
                From the field
              </h2>
            </div>
            <p className="hidden max-w-xs text-right text-sm leading-relaxed text-neutral-500 md:block">
              Written for homeowners. No lighting degree required.
            </p>
          </div>

          <Link
            href={`/blog/${featuredPost.slug}`}
            className="group grid gap-7 border-b border-black/15 pb-14 md:grid-cols-[1.25fr_0.75fr] md:items-center md:gap-12"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-neutral-900">
              <Image
                src={featuredPost.image}
                alt={featuredPost.imageAlt}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                sizes="(max-width: 768px) 100vw, 62vw"
              />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#C96A1B]">
                {featuredPost.eyebrow}
              </p>
              <h3 className="mt-4 text-3xl font-light leading-tight tracking-tight text-neutral-900 md:text-4xl">
                {featuredPost.title}
              </h3>
              <p className="mt-5 text-base font-light leading-relaxed text-neutral-600">
                {featuredPost.excerpt}
              </p>
              <div className="mt-7 flex items-center gap-4 text-xs text-neutral-500">
                <span>{featuredPost.dateLabel}</span>
                <span className="h-px w-6 bg-neutral-400" />
                <span>{featuredPost.readTime}</span>
              </div>
              <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-neutral-900">
                Read the guide
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </Link>

          <div className="grid gap-10 pt-14 md:grid-cols-2 md:gap-8">
            {morePosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-neutral-900">
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <p className="mt-6 text-xs font-medium uppercase tracking-[0.22em] text-[#C96A1B]">
                  {post.eyebrow}
                </p>
                <h3 className="mt-3 max-w-xl text-2xl font-light leading-tight tracking-tight text-neutral-900 md:text-3xl">
                  {post.title}
                </h3>
                <p className="mt-4 max-w-xl text-sm font-light leading-relaxed text-neutral-600">
                  {post.excerpt}
                </p>
                <div className="mt-5 flex items-center gap-4 text-xs text-neutral-500">
                  <span>{post.dateLabel}</span>
                  <span className="h-px w-6 bg-neutral-400" />
                  <span>{post.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-neutral-950 px-4 py-20 text-white sm:px-6 md:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-orange-300">
              See it on your property
            </p>
            <h2 className="mt-5 text-3xl font-extralight tracking-tight md:text-5xl">
              The best lighting advice is specific.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-sm font-light leading-relaxed text-white/55 md:text-base">
              We&apos;ll walk your property, talk through what matters, and build a
              plan around the way you actually use the space.
            </p>
            <Link
              href="/consultation"
              className="btn-copper mt-8 h-12 px-7 text-sm"
            >
              Schedule a consultation
              <ArrowRight className="btn-arrow h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
