/*
 * Toronto Life - project page.
 * ------------------------------------------------------------------------------
 * Editorial spreads for Toronto Life magazine. Layout comes from ProjectPage;
 * the per-image positioning is in page.scss, and each sizesFor() value below is
 * the max-width that image gets there.
 *
 * This page nests its credits in an extra <div> that the stylesheet centres, so
 * the wrapper has to stay.
 */

import Image from 'next/image';
import ProjectPage from '@/components/ProjectPage';
import { sizesFor } from '@/lib/image-sizes';
import nextImage from '@/images/tmu.jpg';
import tl01 from '@/images/toronto-life/TL-01.jpg';
import tl02 from '@/images/toronto-life/TL-02.jpg';
import tl03 from '@/images/toronto-life/TL-03.jpg';
import tl04 from '@/images/toronto-life/TL-04.jpg';
import tl05 from '@/images/toronto-life/TL-05.jpg';
import tl06 from '@/images/toronto-life/TL-06.jpg';
import './page.scss';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata = pageMetadata({
  title: 'Toronto Life',
  path: '/toronto-life/'
});

const alt = 'Image from Toronto Life magazine designed by Stephanie Firka.';

export default function TorontoLife() {
  return (
    <ProjectPage
      pageClass="page-toronto-life"
      title="Toronto Life"
      // This page nested its credits in an extra <div>; the stylesheet centres
      // that wrapper, so it has to stay.
      credits={
        <div>
          <p>Art Director</p>
          <p>Brian Wong</p>
        </div>
      }
      next={{
        href: '/tmu',
        label: 'TMU',
        image: nextImage
      }}
    >
      {/* sizes values mirror the max-width each image gets in page.scss */}
      <Image src={tl01} alt={alt} placeholder="blur" sizes={sizesFor(900)} />
      <div className="img-container">
        <Image src={tl02} alt={alt} placeholder="blur" sizes={sizesFor(410)} />
        <Image src={tl03} alt={alt} placeholder="blur" sizes={sizesFor(818)} />
      </div>
      <Image src={tl04} alt={alt} placeholder="blur" sizes={sizesFor(1089)} />
      <Image src={tl05} alt={alt} placeholder="blur" sizes={sizesFor(818)} />
      <Image src={tl06} alt={alt} placeholder="blur" sizes={sizesFor(1105)} />
    </ProjectPage>
  );
}
