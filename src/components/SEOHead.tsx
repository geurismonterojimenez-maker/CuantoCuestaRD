import { useEffect } from 'react';

type JsonLd = Record<string, unknown>;

interface SEOHeadProps {
  title: string;
  description: string;
  schema?: JsonLd | JsonLd[];
  canonicalPath?: string;
  image?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
}

const SITE_URL = 'https://cuantocuestard.com';
const SITE_NAME = 'CuantoCuestaRD';
const DEFAULT_IMAGE = `${SITE_URL}/favicon.svg`;

function upsertMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let tag = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', rel);
    document.head.appendChild(tag);
  }
  tag.setAttribute('href', href);
}

function getCanonicalUrl(canonicalPath?: string) {
  const rawPath = canonicalPath || window.location.pathname || '/';
  const path = rawPath !== '/' ? rawPath.replace(/\/+$/, '') : '/';
  return `${SITE_URL}${path}`;
}

export default function SEOHead({
  title,
  description,
  schema,
  canonicalPath,
  image = DEFAULT_IMAGE,
  type = 'website',
  noindex = false
}: SEOHeadProps) {
  useEffect(() => {
    const canonicalUrl = getCanonicalUrl(canonicalPath);
    const schemas = Array.isArray(schema) ? schema : schema ? [schema] : [];
    const baseSchema: JsonLd[] = [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/favicon.svg`
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        url: SITE_URL,
        inLanguage: 'es-DO',
        potentialAction: {
          '@type': 'SearchAction',
          target: `${SITE_URL}/herramientas?q={search_term_string}`,
          'query-input': 'required name=search_term_string'
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: title,
        description,
        url: canonicalUrl,
        isPartOf: {
          '@type': 'WebSite',
          name: SITE_NAME,
          url: SITE_URL
        },
        inLanguage: 'es-DO'
      }
    ];

    document.title = title;
    upsertMeta('meta[name="description"]', 'name', 'description', description);
    upsertMeta('meta[name="robots"]', 'name', 'robots', noindex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large');
    upsertMeta('meta[name="theme-color"]', 'name', 'theme-color', '#2563eb');
    upsertMeta('meta[property="og:site_name"]', 'property', 'og:site_name', SITE_NAME);
    upsertMeta('meta[property="og:title"]', 'property', 'og:title', title);
    upsertMeta('meta[property="og:description"]', 'property', 'og:description', description);
    upsertMeta('meta[property="og:type"]', 'property', 'og:type', type);
    upsertMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    upsertMeta('meta[property="og:image"]', 'property', 'og:image', image);
    upsertMeta('meta[property="og:locale"]', 'property', 'og:locale', 'es_DO');
    upsertMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    upsertMeta('meta[name="twitter:image"]', 'name', 'twitter:image', image);
    upsertLink('canonical', canonicalUrl);

    const oldSchema = document.getElementById('seo-jsonld-schema');
    if (oldSchema) {
      oldSchema.remove();
    }

    const schemaScriptTag = document.createElement('script');
    schemaScriptTag.id = 'seo-jsonld-schema';
    schemaScriptTag.setAttribute('type', 'application/ld+json');
    schemaScriptTag.innerHTML = JSON.stringify([...baseSchema, ...schemas]);
    document.head.appendChild(schemaScriptTag);

    return () => {
      const tag = document.getElementById('seo-jsonld-schema');
      if (tag) {
        tag.remove();
      }
    };
  }, [canonicalPath, description, image, noindex, schema, title, type]);

  return null;
}
