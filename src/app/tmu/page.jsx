import Image from 'next/image';
import ProjectPage from '@/components/ProjectPage';
import nextImage from '@/images/canadian-business.jpg';
import tmu01 from '@/images/tmu/TMU-01.jpg';
import tmu02 from '@/images/tmu/TMU-02.jpg';
import tmu03 from '@/images/tmu/TMU-03.jpg';
import tmu04 from '@/images/tmu/TMU-04.jpg';
import tmu05 from '@/images/tmu/TMU-05.jpg';
import tmu06 from '@/images/tmu/TMU-06.jpg';
import './page.scss';

// Title and alt text say "Nightizm" rather than "TMU" - carried over verbatim
// from pages/tmu.vue, where the project appears to have been renamed without
// the copy being updated. Flagged in the handoff rather than silently changed.
export const metadata = {
  title: 'Stephanie Firka - Nightizm',
  description:
    'Graphic Designer & Number One Golden Girls Fan, based in Toronto, Canada.'
};

const alt = 'Image from Nightizm branding designed by Stephanie Firka.';

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
      <Image className="image-1" src={tmu01} alt={alt} placeholder="blur" />
      <Image className="image-2" src={tmu02} alt={alt} placeholder="blur" />
      <div className="img-container">
        <Image src={tmu03} alt={alt} placeholder="blur" />
        <Image src={tmu04} alt={alt} placeholder="blur" />
        <Image src={tmu05} alt={alt} placeholder="blur" />
      </div>
      <Image className="image-6" src={tmu06} alt={alt} placeholder="blur" />
    </ProjectPage>
  );
}
