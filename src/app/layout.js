import { heading, body } from '@/fonts';
import Shell from '@/components/Shell';

// Load order mirrors the `css` array in the old nuxt.config.js.
import '@/styles/normalize.scss';
import '@/styles/typography.scss';
import '@/styles/global.scss';
import '@/styles/components.scss';

export const metadata = {
  title: 'Stephanie Firka',
  description:
    'Graphic Designer & Number One Golden Girls Fan, based in Toronto, Canada.',
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
