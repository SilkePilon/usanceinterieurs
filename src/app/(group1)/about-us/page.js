import Image from "next/image";
import Title from "@/components/ui/title";
import ButtonOutline from "@/components/ui/buttons/buttonOutline";
import Link from "next/link";

export default function AboutUsPage() {
  return (
    <section className="about-us">
      <div className="container 2sm:mt-[156px] sm:mt-30 mt-20">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-[65%_auto] gap-[38px]">
          <div className="relative after:absolute sm:after:-left-12.5 after:-left-5 after:top-1/2 after:-translate-y-1/2 after:w-[1px] sm:after:h-[130%] after:h-[120%] after:bg-primary sm:ml-12.5 ml-5">
            <h1 className="text-primary-foreground [font-size:_clamp(3px,5vw,50px)] font-extrabold leading-110">
              Over Ons
            </h1>
            <span className="inline-block w-[300px] h-[1px] bg-primary"></span>
            <div className="text-2xl sm:text-3xl 2sm:text-4xl !leading-160 text-primary-foreground mt-[18px]">
              <p>
                Welkom bij Usance Interieurs, waar wij interieurs creëren die uw
                ruimte transformeren tot een samenspel van functionaliteit,
                esthetiek en persoonlijkheid.
              </p>
              <p className="mt-6">
                Met onze expertise en passie voor design brengen wij uw visie
                tot leven, of het nu gaat om woon-, werk- of commerciële ruimtes.
              </p>
            </div>
          </div>

          <div
            style={{ background: "#2a2b2d" }}
            className="py-15 sm:px-[38px] px-5"
          >
            <Title
              title_text="Onze Expertise"
              className={"text-secondary-foreground mb-0"}
            />
            <ul className="pb-7.5 pt-[75px] flex lg:flex-col flex-row flex-wrap lg:flex-nowrap gap-x-3 lg:gap-x-0 gap-y-[20px]">
              <li>
                <strong className="text-secondary-foreground block text-2xl mb-1.5">
                  Interieurontwerp:
                </strong>
                <span className="text-secondary-foreground block">
                  Wij ontwerpen ruimtes die zowel functioneel als esthetisch aantrekkelijk zijn
                </span>
              </li>
              <li>
                <strong className="text-secondary-foreground block text-2xl mb-1.5">
                  Projectmanagement:
                </strong>
                <span className="text-secondary-foreground block">
                  Van concept tot realisatie, wij begeleiden het hele proces
                </span>
              </li>
              <li>
                <strong className="text-secondary-foreground block text-2xl mb-1.5">
                  Ruimtelijk advies:
                </strong>
                <span className="text-secondary-foreground block">
                  Optimale indeling voor elke ruimte, afgestemd op uw wensen
                </span>
              </li>
              <li>
                <strong className="text-secondary-foreground block text-2xl mb-1.5">
                  Maatwerk:
                </strong>
                <span className="text-secondary-foreground block">
                  Speciaal ontworpen meubels passend bij uw interieur
                </span>
              </li>
            </ul>

            <Link href="/projecten">
              <ButtonOutline className="text-secondary-foreground border-secondary whitespace-nowrap hover:text-primary-foreground hover:bg-secondary">
                Bekijk Projecten
              </ButtonOutline>
            </Link>
          </div>
        </div>

        {/* Our Story Section */}
        <div className="mt-32">
          <Title
            title_text="Ons Verhaal"
            className="text-primary-foreground mb-16"
          />
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
              <p className="text-xl mb-6 text-primary-foreground">
                Usance Interieurs werd opgericht vanuit een passie voor design en een drang om ruimtes te creëren die mensen inspireren. Met jaren ervaring in de interieurbranche hebben we een diepgaand begrip van wat een ruimte tot leven brengt.
              </p>
              <p className="text-xl mb-6 text-primary-foreground">
                Onze ontwerpers werken nauw samen met vakmensen om elk project met precisie en aandacht voor detail uit te voeren. We geloven dat een goed ontworpen ruimte niet alleen mooi moet zijn, maar ook moet aansluiten bij de levensstijl en behoeften van de gebruikers.
              </p>
              <p className="text-xl text-primary-foreground">
                Of het nu gaat om een woning, kantoor of commerciële ruimte, wij streven ernaar om unieke, duurzame en tijdloze interieurs te creëren die uw persoonlijkheid weerspiegelen.
              </p>
            </div>
          </div>
        </div>

        {/* Our Process Section */}
        <div className="mt-32">
          <Title
            title_text="Ons Proces"
            className="text-primary-foreground mb-16"
          />
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-secondary/10 p-8 rounded-md">
              <h3 className="text-2xl font-bold mb-4 text-primary">1. Inspiratie & Concept</h3>
              <p className="text-primary-foreground">
                We beginnen met het leren kennen van uw wensen, stijl en budget. Op basis hiervan ontwikkelen we een conceptontwerp dat als basis dient voor het project.
              </p>
            </div>
            <div className="bg-secondary/10 p-8 rounded-md">
              <h3 className="text-2xl font-bold mb-4 text-primary">2. Ontwerp & Planning</h3>
              <p className="text-primary-foreground">
                Het concept wordt uitgewerkt tot een gedetailleerd ontwerp met materiaalvoorstellen, kleurenschema's en een duidelijke tijdsplanning.
              </p>
            </div>
            <div className="bg-secondary/10 p-8 rounded-md">
              <h3 className="text-2xl font-bold mb-4 text-primary">3. Realisatie & Oplevering</h3>
              <p className="text-primary-foreground">
                Wij coördineren alle werkzaamheden van begin tot eind en zorgen voor een soepele uitvoering en perfecte afwerking van uw project.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-32">
          <Title
            title_text="Ons Team"
            className="text-primary-foreground mb-16"
          />
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
            <div className="team-member text-center">
              <div className="relative mb-6 overflow-hidden rounded-md">
                <Image
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070"
                  alt="Projectmanager"
                  width={350}
                  height={400}
                  className="w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-primary-foreground">Thomas Bakker</h3>
              <p className="text-lg text-primary-foreground/80">Projectmanager</p>
              <Link href="/team-single">
                <ButtonOutline className="mt-4">Meer Info</ButtonOutline>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Project Showcase Section */}
        {/* <div className="mt-32">
          <Title
            title_text="Project Galerij"
            className="text-primary-foreground mb-16"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="overflow-hidden rounded-lg">
              <Image 
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1932"
                alt="Modern interieur project" 
                width={400} 
                height={300}
                className="w-full h-[300px] object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="overflow-hidden rounded-lg">
              <Image 
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000" 
                alt="Luxe woonkamer ontwerp" 
                width={400} 
                height={300}
                className="w-full h-[300px] object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="overflow-hidden rounded-lg">
              <Image 
                src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=1992" 
                alt="Moderne keuken ontwerp" 
                width={400} 
                height={300}
                className="w-full h-[300px] object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="overflow-hidden rounded-lg">
              <Image 
                src="https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?q=80&w=2070" 
                alt="Restaurant interieur" 
                width={400} 
                height={300}
                className="w-full h-[300px] object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="overflow-hidden rounded-lg">
              <Image 
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070" 
                alt="Minimalistisch interieur" 
                width={400} 
                height={300}
                className="w-full h-[300px] object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="overflow-hidden rounded-lg">
              <Image 
                src="https://images.unsplash.com/photo-1531835551805-16d864c8d311?q=80&w=2787" 
                alt="Kantoor ontwerp" 
                width={400} 
                height={300}
                className="w-full h-[300px] object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div> */}

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
