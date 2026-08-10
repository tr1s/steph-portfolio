import Image from 'next/image';
import ProjectPage from '@/components/ProjectPage';
import { sizesFor } from '@/lib/image-sizes';
import nextImage from '@/images/canadian-business.jpg';
import tmu01 from '@/images/tmu/TMU-01.jpg';
import tmu02 from '@/images/tmu/TMU-02.jpg';
import tmu03 from '@/images/tmu/TMU-03.jpg';
import tmu04 from '@/images/tmu/TMU-04.jpg';
import tmu05 from '@/images/tmu/TMU-05.jpg';
import tmu06 from '@/images/tmu/TMU-06.jpg';
import './page.scss';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata = pageMetadata({
  title: 'TMU',
  path: '/tmu/'
});

const alt =
  'Image from the Toronto Metropolitan University Future Student Guide designed by Stephanie Firka.';

export default function Tmu() {
  return (
    <ProjectPage
      pageClass="page-tmu"
      title="TMU"
      credits={
        <>
          <p>Creative Director</p>
          <p>Aleeza Balita</p>
        </>
      }
      next={{
        href: '/canadian-business',
        label: 'Canadian Business',
        image: nextImage,
        variant: 'block'
      }}
    >
      {/* sizes values mirror the max-width each image gets in page.scss */}
      <Image className="image-1" src={tmu01} alt={alt} placeholder="blur" sizes={sizesFor(730)} />
      <Image className="image-2" src={tmu02} alt={alt} placeholder="blur" sizes={sizesFor(1240)} />
      <div className="img-container">
        <Image src={tmu03} alt={alt} placeholder="blur" sizes={sizesFor(308)} />
        <Image src={tmu04} alt={alt} placeholder="blur" sizes={sizesFor(308)} />
        <Image src={tmu05} alt={alt} placeholder="blur" sizes={sizesFor(308)} />
      </div>
      <Image className="image-6" src={tmu06} alt={alt} placeholder="blur" sizes={sizesFor(1200)} />
    </ProjectPage>
  );
}
