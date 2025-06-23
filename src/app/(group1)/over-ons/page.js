import Image from "next/image";
import Title from "@/components/ui/title";
import ButtonOutline from "@/components/ui/buttons/buttonOutline";
import Link from "next/link";
import { createBucketClient } from '@cosmicjs/sdk';
import PdfPreview from "@/components/ui/PdfPreview";

// Custom component to render HTML content safely
const HtmlContent = ({ html }) => {
  return html ? <div dangerouslySetInnerHTML={{ __html: html }} /> : null;
};

// Parse HTML content from expertise list
const parseExpertiseList = (htmlContent) => {
  if (!htmlContent) return [];
  
  // Simple regex to extract list items
  const items = htmlContent.match(/<li>(.*?)<\/li>/gs) || [];
  return items.map((item) => {
    // Extract the strong tag content and the rest of the text
    const strongMatch = item.match(/<strong>(.*?)<\/strong>/);
    const title = strongMatch ? strongMatch[1] : '';
    const content = item.replace(/<li>.*?<\/strong>/s, '').replace(/<\/li>/s, '').trim();
    return { title, content };
  });
};

async function getAboutUsContent() {
  try {
    const cosmic = createBucketClient({
      bucketSlug: process.env.COSMIC_BUCKET_SLUG || 'usance-production',
      readKey: process.env.COSMIC_READ_KEY
    });

    const response = await cosmic.objects.findOne({
      type: "over-ons",
      slug: "over-ons"
    })
      .props("slug,title,metadata,type")
      .depth(1);

    console.log('Cosmic JS Response:', response); // Debug log
    return response?.object || null;
  } catch (error) {
    console.error('Error fetching about us content:', error);
    throw error; // Re-throw to see the actual error
  }
}

export default async function AboutUsPage() {
  let aboutUsData = null;
  
  try {
    aboutUsData = await getAboutUsContent();
  } catch (error) {
    console.error('Failed to load about us content:', error);
    // Continue with fallback content
  }
  
  // Get data from CMS with fallbacks
  const pageTitle = aboutUsData?.title || 'Over Ons';
  const onsVerhaal = aboutUsData?.metadata?.titel_1 || 'ONZE VAKKENNIS EN ERVARING';
  const onsVerhaalText = aboutUsData?.metadata?.tekst_1 || '';
  const onzeExpertise = aboutUsData?.metadata?.title_2 || 'ONZE EXPERTISES';
  const onzeExpertiseTekst = aboutUsData?.metadata?.tekst_2 || '';
  const inDeMedia = aboutUsData?.metadata?.titel_3 || 'IN DE MEDIA';
  const inDeMediaText = aboutUsData?.metadata?.tekst_4 || '';
  const workshops = aboutUsData?.metadata?.titel_4 || 'WORKSHOPS';
  const workshopsText = aboutUsData?.metadata?.tekst_5 || '';
  const tekst3 = aboutUsData?.metadata?.tekst_3 || '';

  // Debug: Log the data we received
  if (process.env.NODE_ENV === 'development') {
    console.log('About Us Data:', {
      hasData: !!aboutUsData,
      title: aboutUsData?.title,
      metadata: aboutUsData?.metadata ? Object.keys(aboutUsData.metadata) : 'No metadata'
    });
  }  // Get images from CMS
  const foto1 = aboutUsData?.metadata?.foto_1?.imgix_url || aboutUsData?.metadata?.foto_1?.url || '/assets/images/about-image.jpg';
  const foto2 = aboutUsData?.metadata?.foto_2?.imgix_url || aboutUsData?.metadata?.foto_2?.url || '/assets/images/about-image-2.jpg';
  const foto3 = aboutUsData?.metadata?.foto_3?.imgix_url || aboutUsData?.metadata?.foto_3?.url || '/assets/images/about-image-3.jpg';

  // Parse expertise content
  const expertiseContent = parseExpertiseList(onzeExpertiseTekst);
  return (
    <section className="about-us">
      <div className="container 2sm:mt-[156px] sm:mt-30 mt-20">
        {/* Show loading/error state if no data */}
        {!aboutUsData && (
          <div className="text-center py-20">
            <p className="text-lg text-primary-foreground">
              Even gedult aub...
            </p>
          </div>
        )}
        
        {/* Top Section: Ons Verhaal and Expertise */}
        <div className="grid lg:grid-cols-[65%_auto] gap-[38px]">
          {/* Main Content Column */}
          <div className="relative after:absolute sm:after:-left-12.5 after:-left-5 after:top-1/2 after:-translate-y-1/2 after:w-[1px] sm:after:h-[130%] after:h-[120%] after:bg-primary sm:ml-12.5 ml-5">
            <Title
              title_text={onsVerhaal}
              className="text-primary mb-8"
            />
            <div className="text-lg !leading-160 text-primary-foreground">
              <HtmlContent html={onsVerhaalText} />
            </div>
            {/* Full width image with adjusted sizing */}
            <div className="mt-10 relative w-full">
              <div className="relative w-full aspect-[16/9] max-h-[500px]">
                <Image
                  src={foto1}
                  alt="Modern interieurontwerp"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 85vw"
                  priority
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Expertise Sidebar */}
          <div
            style={{ background: "#2a2b2d" }}
            className="py-15 sm:px-[38px] px-5"
          >
            <Title
              title_text={onzeExpertise}
              className={"text-secondary-foreground mb-0"}
            />
            <div className="py-7.5 text-secondary-foreground">
              <HtmlContent html={onzeExpertiseTekst} />
            </div>
            <Link href="/#projects">
              <ButtonOutline className="text-secondary-foreground border-secondary whitespace-nowrap hover:text-primary-foreground hover:bg-secondary">
                Bekijk Projecten
              </ButtonOutline>
            </Link>
          </div>
        </div>

        {/* Additional Text Section (replacing previous image location) */}
        <div className="mt-20 sm:ml-12.5 ml-5">
          <div className="text-lg !leading-160 text-primary-foreground">
            <HtmlContent html={tekst3} />
          </div>
        </div>

        {/* In de Media Section */}
        <div className="mt-20 sm:ml-12.5 ml-5">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <Title
                title_text={inDeMedia}
                className="text-primary mb-8"
              />
              <div className="text-lg !leading-160 text-primary-foreground">
                <HtmlContent html={inDeMediaText} />
              </div>
            </div>
            <div className="relative w-full h-[300px] mt-[52px]">
              <Link href="/assets/def._Nunspeet_mag_2024_03_p48_v4.pdf" target="_blank" className="block h-full">
                <PdfPreview 
                  imageUrl={foto2}
                  className="h-full"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Workshops Section */}
        <div className="mt-20 mb-20 sm:ml-12.5 ml-5">
          <Title
            title_text={workshops}
            className="text-primary mb-8"
          />
          <div className="grid md:grid-cols-2 gap-10">
            <div className="relative w-full h-[300px]">
              <Image
                src={foto3}
                alt="Workshops"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="text-lg !leading-160 text-primary-foreground">
              <HtmlContent html={workshopsText} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
