import Image from 'next/image';
import ProjectPage from '@/components/ProjectPage';
import nextImage from '@/images/toronto-life.jpg';
import cb16 from '@/images/canadian-business/CB17_JAN2017_HI-16.jpg';
import cb17 from '@/images/canadian-business/CB17_JAN2017_HI-17.jpg';
import bestPackage from '@/images/canadian-business/BestPackagenew.jpg';
import bestPackage3 from '@/images/canadian-business/BestPackage3new.jpg';
import ronWhite from '@/images/canadian-business/CB-RonWhite-white.jpg';
import sum16 from '@/images/canadian-business/CB07-08_SUM2016-HI-16.jpg';
import sum17 from '@/images/canadian-business/CB07-08_SUM2016-HI-17.jpg';
import sum20 from '@/images/canadian-business/CB07-08_SUM2016-HI-20.jpg';
import './page.scss';

export const metadata = {
  title: 'Stephanie Firka - Canadian Business',
  description:
    'Graphic Designer & Number One Golden Girls Fan, based in Toronto, Canada.'
};

const alt = 'Image from Canadian Business magazine designed by Stephanie Firka.';

export default function CanadianBusiness() {
  return (
    <ProjectPage
      pageClass="page-canadian-business"
      title="Canadian Business"
      credits={
        <>
          <p>Art Director</p>
          <p>John Montgomery</p>
        </>
      }
      next={{
        href: '/toronto-life',
        label: 'Toronto Life',
        image: nextImage,
        variant: 'block'
      }}
    >
      <Image src={cb16} alt={alt} placeholder="blur" />
      <Image src={cb17} alt={alt} placeholder="blur" />
      <div className="img-container">
        <Image src={bestPackage} alt={alt} placeholder="blur" />
        <Image src={bestPackage3} alt={alt} placeholder="blur" />
      </div>
      <Image src={ronWhite} alt={alt} placeholder="blur" />
      <div className="img-container-2">
        <Image src={sum16} alt={alt} placeholder="blur" />
        <Image src={sum17} alt={alt} placeholder="blur" />
        <Image src={sum20} alt={alt} placeholder="blur" />
      </div>
    </ProjectPage>
  );
}
