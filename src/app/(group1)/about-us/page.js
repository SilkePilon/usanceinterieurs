import Image from "next/image";
import Title from "@/components/ui/title";
import ButtonOutline from "@/components/ui/buttons/buttonOutline";
import Link from "next/link";
import { createBucketClient } from '@cosmicjs/sdk';

// Custom component to render HTML content safely
const HtmlContent = ({ html }) => {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

// Parse HTML content from expertise list
const parseExpertiseList = (htmlContent) => {
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
  const cosmic = createBucketClient({
    bucketSlug: 'usance-production',
    readKey: 'I3jedjwVkj48hIM1WRP6qGKIy2atHx0knIxGxWIDSrr5J7ODZ2'
  });

  const response = await cosmic.objects.findOne({
    type: "about-us",
    slug: "over-ons"
  })
  .props("slug,title,metadata,type")
  .depth(1);

  return response.object;
}

export default async function AboutUsPage() {
  const aboutUsData = await getAboutUsContent();
  const expertiseItems = parseExpertiseList(aboutUsData.metadata.onze_expertise_tekst);

  return (
    <section className="about-us">
      <div className="container 2sm:mt-[156px] sm:mt-30 mt-20">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-[65%_auto] gap-[38px]">
          <div className="relative after:absolute sm:after:-left-12.5 after:-left-5 after:top-1/2 after:-translate-y-1/2 after:w-[1px] sm:after:h-[130%] after:h-[120%] after:bg-primary sm:ml-12.5 ml-5">
            <h1 className="text-primary-foreground [font-size:_clamp(3px,5vw,50px)] font-extrabold leading-110">
              {aboutUsData.title}
            </h1>
            <span className="inline-block w-[300px] h-[1px] bg-primary"></span>
            <div className="text-2xl sm:text-3xl 2sm:text-4xl !leading-160 text-primary-foreground mt-[18px]">
              <HtmlContent html={aboutUsData.metadata.over_ons} />
            </div>
          </div>

          <div
            style={{ background: "#2a2b2d" }}
            className="py-15 sm:px-[38px] px-5"
          >
            <Title
              title_text={aboutUsData.metadata.onze_expertise}
              className={"text-secondary-foreground mb-0"}
            />
            <ul className="pb-7.5 pt-[75px] flex lg:flex-col flex-row flex-wrap lg:flex-nowrap gap-x-3 lg:gap-x-0 gap-y-[20px]">
              {expertiseItems.map((item, index) => (
                <li key={index}>
                  <strong className="text-secondary-foreground block text-2xl mb-1.5">
                    {item.title}
                  </strong>
                  <span className="text-secondary-foreground block">
                    {item.content}
                  </span>
                </li>
              ))}
            </ul>

            <Link href="/#projects">
              <ButtonOutline className="text-secondary-foreground border-secondary whitespace-nowrap hover:text-primary-foreground hover:bg-secondary">
                Bekijk Projecten
              </ButtonOutline>
            </Link>
          </div>
        </div>

        {/* Our Story Section */}
        <div className="mt-32">
          <h1 className="text-primary-foreground [font-size:_clamp(3px,5vw,50px)] font-extrabold leading-110">
            Ons Verhaal
          </h1>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070"
                  alt="Modern interieurontwerp woonkamer"
                  width={600}
                  height={400}
                  className="rounded-md"
                />
              </div>
            </div>
            <div>
              <HtmlContent html={aboutUsData.metadata.ons_verhaal} />
            </div>
          </div>
        </div>

        {/* Our Process Section */}
        <div className="mt-32">
          <h1 className="text-primary-foreground [font-size:_clamp(3px,5vw,50px)] font-extrabold leading-110">
            Ons Proces
          </h1>
          <div className="grid md:grid-cols-3 gap-8">
            {aboutUsData.metadata.ons_proces.map((process, index) => (
              <div key={index} className="bg-secondary/10 p-8 rounded-md">
                <HtmlContent html={process.ons_proces} />
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-32">
          <h1 className="text-primary-foreground [font-size:_clamp(3px,5vw,50px)] font-extrabold leading-110">
            Ons Team
          </h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="team-member text-center">
              <div className="relative mb-6 overflow-hidden rounded-md">
                <Image
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974"
                  alt="Hoofdontwerper"
                  width={350}
                  height={400}
                  className="w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-primary-foreground">Dennis de Vries</h3>
              <p className="text-lg text-primary-foreground/80">Hoofdontwerper</p>
              <Link href="/denis">
                <ButtonOutline className="mt-4">Meer Info</ButtonOutline>
              </Link>
            </div>
            <div className="team-member text-center">
              <div className="relative mb-6 overflow-hidden rounded-md">
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976"
                  alt="Interieuradviseur"
                  width={350}
                  height={400}
                  className="w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-primary-foreground">Mariska Janssen</h3>
              <p className="text-lg text-primary-foreground/80">Interieuradviseur</p>
              <Link href="/mariska">
                <ButtonOutline className="mt-4">Meer Info</ButtonOutline>
              </Link>
            </div>
          </div>
        </div>

        {/* Contact CTA Section */}
        <div className="mt-32 mb-20 bg-primary/10 p-16 rounded-lg text-center">
          <h2 className="text-4xl font-bold mb-4 text-primary-foreground">Klaar om uw droominterieur te realiseren?</h2>
          <p className="text-xl mb-8 text-primary-foreground/80 max-w-2xl mx-auto">
            Neem contact met ons op voor een vrijblijvend gesprek over de mogelijkheden voor uw project.
          </p>
          <Link href="/contact">
            <ButtonOutline className="text-lg px-8 py-4">Contact Opnemen</ButtonOutline>
          </Link>
        </div>
      </div>
    </section>
  );
}
