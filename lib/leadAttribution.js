const STORAGE_KEY = 'lume_lead_attribution_v1';
const ATTRIBUTION_KEYS = [
  'gclid',
  'gbraid',
  'wbraid',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
];

const trimValue = (value, maxLength = 500) =>
  typeof value === 'string' ? value.trim().slice(0, maxLength) : '';

function readStoredAttribution() {
  if (typeof window === 'undefined') return {};

  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

export function captureLeadAttribution() {
  if (typeof window === 'undefined') return {};

  const stored = readStoredAttribution();
  const params = new URLSearchParams(window.location.search);
  const captured = {};

  ATTRIBUTION_KEYS.forEach((key) => {
    const value = trimValue(params.get(key));
    if (value) captured[key] = value;
  });

  const now = new Date().toISOString();
  const attribution = {
    ...stored,
    ...captured,
    first_seen_at: stored.first_seen_at || now,
    last_seen_at: now,
    landing_page: stored.landing_page || window.location.href.slice(0, 1000),
  };

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // Attribution is helpful, but it should never block the lead form.
  }

  return attribution;
}

export function getLeadAttribution() {
  return captureLeadAttribution();
}

export function buildTrackedJobberFormUrl(baseUrl) {
  const attribution = getLeadAttribution();
  const url = new URL(baseUrl);
  const hasGoogleClickId =
    attribution.gclid || attribution.gbraid || attribution.wbraid;

  url.searchParams.set('source', 'sp_website');
  url.searchParams.set(
    'utm_source',
    attribution.utm_source || (hasGoogleClickId ? 'google' : 'lume_website'),
  );
  url.searchParams.set(
    'utm_medium',
    attribution.utm_medium || (hasGoogleClickId ? 'cpc' : 'website'),
  );
  url.searchParams.set(
    'utm_campaign',
    attribution.utm_campaign || (hasGoogleClickId ? 'lume_google_ads' : 'consultation'),
  );

  if (attribution.utm_term) {
    url.searchParams.set('utm_term', trimValue(attribution.utm_term, 250));
  }

  const clickIdEntry = ['gclid', 'gbraid', 'wbraid']
    .filter((key) => attribution[key])
    .map((key) => `${key}:${trimValue(attribution[key], 250)}`)
    .join('|');
  const contentParts = [trimValue(attribution.utm_content, 250), clickIdEntry]
    .filter(Boolean)
    .join('|');

  if (contentParts) {
    url.searchParams.set('utm_content', contentParts.slice(0, 500));
  }

  return url.toString();
}

