import Link from "next/link";
import Logo from "@/assets/icons/logo";
import Image from "next/image";
import footer from "@/assets/images/footer.jpg";
import { teamData } from "@/lib/fackData/teamData";

const Footer = () => {
  const socialLinks = teamData[0].social_link;

  return (
    <footer className="container-fluid mx-auto relative">
      <div className="relative min-h-[800px]">
        <div className="absolute inset-0 z-0">
          <Image
            src={footer}
            alt="Footer background"
            layout="fill"
            objectFit="cover"
            objectPosition="bottom"
            quality={100}
            priority
          />
        </div>
        <div className="container relative z-10 text-white py-36">
          <div className="grid lg:grid-cols-12 gap-x-10 gap-y-16">
            {/* Logo on the left */}
            <div className="lg:col-span-4 flex items-start">
              <Link href={"/"} className="text-primary-foreground">
                <Logo height={"350"} width={"380"} />
              </Link>
            </div>
            
            {/* Content on the right */}
            <div className="lg:col-span-8">
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-10 gap-y-16">
                {/* Address */}
                <div className="flex flex-col">
                  <div className="pt-4">
                    <h5 className="text-xl font-bold text-primary-foreground leading-relaxed">
                      Adres:
                    </h5>
                    <span className="w-[80px] h-[1px] bg-primary block my-3"></span>
                    <p className="text-lg text-primary-foreground mt-4">
                      Zuiderzeestraatweg west 12a,<br />
                      8085 AE, Doornspijk
                    </p>
                  </div>
                </div>

                {/* Business Information */}
                <div className="flex flex-col justify-start">
                  <h5 className="text-xl font-bold text-primary-foreground leading-relaxed">
                    Bedrijfsinformatie:
                  </h5>
                  <span className="w-[80px] h-[1px] bg-primary block my-3"></span>
                  <div className="grid sm:grid-cols-2 grid-cols-1 gap-x-6 gap-y-3 mt-4">
                    <p className="text-base text-primary-foreground">
                      <span className="font-semibold">BTW</span> NL 854432322 B01
                    </p>
                    <p className="text-base text-primary-foreground">
                      <span className="font-semibold">KvK</span> 61654558
                    </p>
                    <p className="text-base text-primary-foreground">
                      <span className="font-semibold">IBAN</span> NL48INGB0004595016
                    </p>
                    <p className="text-base text-primary-foreground">
                      <span className="font-semibold">BIC</span> INGBNL2A
                    </p>
                    <p className="text-base text-primary-foreground sm:col-span-2">
                      <span className="font-semibold">Bank</span> ING BANK NV
                    </p>
                  </div>
                </div>
              </div>
              
              <hr className="border-primary/30 my-10" />
              
              {/* Social Links */}
              <div className="flex justify-start gap-6 py-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-foreground hover:text-primary transition-colors"
                  >
                    {link.media}
                  </a>
                ))}
              </div>

              <div className="py-6">
                <span className="text-sm text-primary-foreground block text-center lg:text-left">
                  ©{new Date().getFullYear()}, Usance Interieurs, Alle Rechten Voorbehouden
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
