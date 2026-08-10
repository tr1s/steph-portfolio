import Image from 'next/image';
import ProjectPage from '@/components/ProjectPage';
import { sizesFor } from '@/lib/image-sizes';
import nextImage from '@/images/pavilion-project.jpg';
import th01 from '@/images/top-hat/TH-01.jpg';
import th02 from '@/images/top-hat/TH-02.jpg';
import th03 from '@/images/top-hat/TH-03.jpg';
import th04 from '@/images/top-hat/TH-04.jpg';
import th05 from '@/images/top-hat/TH-05.jpg';
import th06 from '@/images/top-hat/TH-06.jpg';
import th07 from '@/images/top-hat/TH-07.jpg';
import th08 from '@/images/top-hat/TH-08.jpg';
import './page.scss';

export const metadata = {
  title: 'Stephanie Firka - Top Hat',
  description:
    'Graphic Designer & Number One Golden Girls Fan, based in Toronto, Canada.'
};

const alt = 'Image from a Top Hat report designed by Stephanie Firka.';

export default function TopHat() {
  return (
    <ProjectPage
      pageClass="page-top-hat"
      title="Top Hat"
      credits={
        <>
          <p>Creative Director</p>
          <p>Mark Ocampo</p>
        </>
      }
      next={{
        href: '/pavilion-project',
        label: 'Pavilion Project',
        image: nextImage,
        variant: 'block'
      }}
    >
      {/* sizes values mirror the max-width each image gets in page.scss */}
      <div className="img-container">
        <Image src={th01} alt={alt} placeholder="blur" sizes={sizesFor(408)} />
        <Image src={th02} alt={alt} placeholder="blur" sizes={sizesFor(565)} />
      </div>
      <Image
        className="image-3"
        src={th03}
        alt={alt}
        placeholder="blur"
        sizes={sizesFor(355)}
      />
      <Image
        className="image-4"
        src={th04}
        alt={alt}
        placeholder="blur"
        sizes={sizesFor(1000)}
      />
      <Image
        className="image-5"
        src={th05}
        alt={alt}
        placeholder="blur"
        sizes={sizesFor(956)}
      />
      <div className="img-container-2">
        <Image src={th06} alt={alt} placeholder="blur" sizes={sizesFor(414)} />
        <Image src={th07} alt={alt} placeholder="blur" sizes={sizesFor(414)} />
        <Image src={th08} alt={alt} placeholder="blur" sizes={sizesFor(414)} />
      </div>
    </ProjectPage>
  );
}
