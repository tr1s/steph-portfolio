import Image from 'next/image';
import ProjectPage from '@/components/ProjectPage';
import nextImage from '@/images/tmu.jpg';
import memberCard from '@/images/pavilion-project/MemberCard_PAV_170131.jpg';
import tote from '@/images/pavilion-project/Tote2-a_PAV_170131.jpg';
import postcards from '@/images/pavilion-project/Postcards_PAV_170131.jpg';
import credentials from '@/images/pavilion-project/Credentals_PAV_170131.jpg';
import bags from '@/images/pavilion-project/Bags_PAV_170131.jpg';
import './page.scss';

export const metadata = {
  title: 'Stephanie Firka - Pavilion Project',
  description:
    'Graphic Designer & Number One Golden Girls Fan, based in Toronto, Canada.'
};

const alt = 'Image from Pavilion Project branding designed by Stephanie Firka.';

export default function PavilionProject() {
  return (
    <ProjectPage
      pageClass="page-pavilion-project"
      title="Pavilion Project"
      credits={
        <>
          <p>Creative Director</p>
          <p>Whitman Emorson</p>
        </>
      }
      next={{
        href: '/tmu',
        label: 'TMU',
        image: nextImage,
        variant: 'block'
      }}
    >
      <div className="img-container">
        <Image src={memberCard} alt={alt} placeholder="blur" />
        <Image src={tote} alt={alt} placeholder="blur" />
      </div>
      <Image src={postcards} alt={alt} placeholder="blur" />
      <div className="img-container-2">
        <Image src={credentials} alt={alt} placeholder="blur" />
        <Image src={bags} alt={alt} placeholder="blur" />
      </div>
    </ProjectPage>
  );
}
