import { heading, body } from '@/fonts';
import Shell from '@/components/Shell';
import { siteConfig, getBaseUrl } from '@/lib/site.config';

// Load order mirrors the `css` array in the old nuxt.config.js.
import '@/styles/normalize.scss';
import '@/styles/typography.scss';
import '@/styles/global.scss';
import '@/styles/components.scss';

export const metadata = {
  // The template reproduces the exact titles the Nuxt site served
  // ("Stephanie Firka - Me"), so each page only declares its own name and the
  // full string is assembled here. Home uses `default`.
  title: {
    default: siteConfig.name,
    template: `${siteConfig.name} - %s`
  },
  description: siteConfig.description,

  // Turns the relative OG image path into the absolute URL crawlers require.
  metadataBase: new URL(getBaseUrl()),
  alternates: { canonical: '/' },

  authors: [{ name: siteConfig.author.name }],
  creator: siteConfig.author.name,

  // The Nuxt site emitted og: tags via @nuxtjs/pwa, but with the package
  // placeholder as their content ("steph-nuxt"), so links shared anywhere
  // previewed as gibberish. These are the real values.
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    title: siteConfig.name,
    description: siteConfig.description,
    url: '/',
    images: [
      {
        url: siteConfig.seo.defaultImage,
        width: 1200,
        height: 630,
        alt: siteConfig.seo.defaultImageAlt
      }
    ]
  },

  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.seo.defaultImage]
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1
    }
  },

  icons: { icon: '/rose.jpg' }
};

export const viewport = {
  width: 'device-width',
  initialScale: 1
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <Shell>{children}</Shell>
    </html>
  );
}
