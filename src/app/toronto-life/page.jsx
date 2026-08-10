import Image from 'next/image';
import ProjectPage from '@/components/ProjectPage';
import nextImage from '@/images/top-hat.jpg';
import tl01 from '@/images/toronto-life/TL-01.jpg';
import tl02 from '@/images/toronto-life/TL-02.jpg';
import tl03 from '@/images/toronto-life/TL-03.jpg';
import tl04 from '@/images/toronto-life/TL-04.jpg';
import tl05 from '@/images/toronto-life/TL-05.jpg';
import tl06 from '@/images/toronto-life/TL-06.jpg';
import './page.scss';

export const metadata = {
  title: 'Stephanie Firka - Toronto Life',
  description:
    'Graphic Designer & Number One Golden Girls Fan, based in Toronto, Canada.'
};

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
        href: '/top-hat',
        label: 'Top Hat',
        image: nextImage,
        variant: 'pavillion'
      }}
    >
      <Image src={tl01} alt={alt} placeholder="blur" />
      <div className="img-container">
        <Image src={tl02} alt={alt} placeholder="blur" />
        <Image src={tl03} alt={alt} placeholder="blur" />
      </div>
      <Image src={tl04} alt={alt} placeholder="blur" />
      <Image src={tl05} alt={alt} placeholder="blur" />
      <Image src={tl06} alt={alt} placeholder="blur" />
    </ProjectPage>
  );
}
