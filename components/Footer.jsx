import Link from 'next/link';

const serviceLinks = [
  { name: 'Residential Landscape', id: 'residential-landscape' },
  { name: 'Tree Lighting', id: 'tree-lighting' },
  { name: 'Pathway Lighting', id: 'pathway-lighting' },
  { name: 'Architectural', id: 'architectural' },
  { name: 'Deck & Patio', id: 'deck-patio' },
  { name: 'Pool & Water Features', id: 'pool-water' },
  { name: 'Security Lighting', id: 'security-lighting' },
  { name: 'Commercial Lighting', id: 'commercial-lighting' },
  { name: 'Repair & Maintenance', id: 'landscape-lighting-repair' },
];

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Our Work', href: '/projects' },
  { label: 'Our Process', href: '/#process' },
  { label: 'Service Area', href: '/#service-area' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/#contact' },
];

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/lumeoutdoorlighting/' },
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61575907045065' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/107065988/' },
];

const footerLinkClassName = 'text-white/70 hover:text-white transition-colors duration-300';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-950 text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-10">
        {/* Brand row */}
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 pb-12 md:pb-16 border-b border-white/10">
          <div className="md:col-span-5">
            <Link href="/" className="inline-block hover:opacity-80 transition-opacity duration-300">
              <img src="/lume-logo-white.svg" alt="Lume Outdoor" className="h-14 md:h-16 w-auto" />
            </Link>
          </div>
          <div className="md:col-span-7 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <p className="font-display text-3xl md:text-4xl leading-[1.15] text-white max-w-md">
              Outdoor lighting for Wichita homes, <em className="italic">after dark.</em>
            </p>
            <Link
              href="/consultation"
              className="self-start md:self-auto flex-shrink-0 inline-flex items-center h-12 px-7 rounded-sm bg-orange-500 hover:bg-orange-600 text-white font-medium tracking-wide transition-colors duration-300"
            >
              Schedule a Consultation
            </Link>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-x-8 gap-y-12 py-12 md:py-16">
          <div className="col-span-2 md:col-span-5">
            <h3 className="text-sm text-white/45 mb-5">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a href="tel:+13166551270" className="font-display text-2xl md:text-3xl text-white hover:text-orange-300 transition-colors duration-300">
                  (316) 655-1270
                </a>
              </li>
              <li>
                <a href="mailto:Drake@lumeoutdoorlighting.com" className={footerLinkClassName}>
                  Drake@lumeoutdoorlighting.com
                </a>
              </li>
              <li className="text-white/70">Wichita metro &amp; surrounding areas</li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-sm text-white/45 mb-5">Services</h3>
            <ul className="space-y-3">
              {serviceLinks.map((service) => (
                <li key={service.id}>
                  <Link href={`/services/${service.id}`} className={footerLinkClassName}>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-sm text-white/45 mb-5">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={footerLinkClassName}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-sm text-white/45 mb-5">Follow</h3>
            <ul className="space-y-3">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a href={social.href} target="_blank" rel="noopener noreferrer" className={footerLinkClassName}>
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-white/45">
          <p>&copy; {currentYear} Lume Outdoor. Brightening nights since 2020.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a>
            <a href="/sitemap.xml" className="hover:text-white transition-colors duration-300">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
