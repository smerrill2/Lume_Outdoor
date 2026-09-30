// Shared contact block for the homepage contact section and the /consultation page
const businessHours = [
  { days: 'Monday – Friday', hours: '8am – 6pm' },
  { days: 'Saturday', hours: '9am – 4pm' },
  { days: 'Sunday', hours: 'Closed' },
];

function ContactDetails({ tone = 'light' }) {
  const isDark = tone === 'dark';
  const labelClassName = `text-sm mb-2 ${isDark ? 'text-white/45' : 'text-gray-500'}`;
  const bodyClassName = isDark ? 'text-white/80' : 'text-gray-700';
  const ruleClassName = isDark ? 'border-white/15' : 'border-gray-300';

  return (
    <dl className={`border-t ${ruleClassName}`}>
      <div className={`py-5 border-b ${ruleClassName}`}>
        <dt className={labelClassName}>Phone</dt>
        <dd>
          <a
            href="tel:+13166551270"
            className={`font-display text-3xl transition-colors duration-300 ${isDark ? 'text-white hover:text-orange-300' : 'text-gray-900 hover:text-orange-600'}`}
          >
            (316) 655-1270
          </a>
        </dd>
      </div>

      <div className={`py-5 border-b ${ruleClassName}`}>
        <dt className={labelClassName}>Email</dt>
        <dd>
          <a
            href="mailto:Drake@lumeoutdoorlighting.com"
            className={`${bodyClassName} underline underline-offset-4 decoration-current/30 hover:decoration-current transition-colors duration-300 break-all`}
          >
            Drake@lumeoutdoorlighting.com
          </a>
        </dd>
      </div>

      <div className={`py-5 border-b ${ruleClassName} grid grid-cols-2 gap-6`}>
        <div>
          <dt className={labelClassName}>Service area</dt>
          <dd className={bodyClassName}>Wichita metro &amp; surrounding areas</dd>
        </div>
        <div>
          <dt className={labelClassName}>Hours</dt>
          <dd className={`${bodyClassName} space-y-1 text-sm`}>
            {businessHours.map((businessDay) => (
              <p key={businessDay.days} className="flex justify-between gap-3">
                <span>{businessDay.days}</span>
                <span className={isDark ? 'text-white/55' : 'text-gray-500'}>{businessDay.hours}</span>
              </p>
            ))}
          </dd>
        </div>
      </div>

      <p className={`pt-5 text-sm ${isDark ? 'text-white/55' : 'text-gray-500'}`}>
        We get back to every request within 24–48 hours.
      </p>
    </dl>
  );
}

export default ContactDetails;
