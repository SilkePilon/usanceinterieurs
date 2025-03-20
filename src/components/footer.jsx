import Link from "next/link";
import Logo from "@/assets/icons/logo";
import Image from "next/image";
import footer from "@/assets/images/footer.jpg";

const Footer = () => {
  return (
    <footer className="container-fluid mx-auto relative">
      <div className="relative">
        <div className="absolute inset-0 z-0">
          <Image
            src={footer}
            alt="Footer background"
            layout="fill"
            objectFit="cover"
            objectPosition="top"
            quality={100}
            priority
          />
        </div>
        <div className="container relative z-10 text-white py-16">
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-10 gap-y-12">
            {/* Company Logo and Address */}
            <div className="flex flex-col">
              <Link href={"/"} className="text-primary-foreground">
                <Logo height={"250"} width={"272"} />
              </Link>
              <h5 className="text-2xl font-semibold text-primary-foreground leading-160 pt-6 pb-3">
                Vormgeving van Interieur Excellentie
              </h5>
              <div className="pt-4">
                <h5 className="text-xl font-bold text-primary-foreground leading-relaxed">
                  Adres:
                </h5>
                <span className="w-[80px] h-[1px] bg-primary block my-2"></span>
                <p className="text-lg text-primary-foreground mt-2">
                  Zuiderzeestraatweg west 12a,<br />
                  8085 AE, Doornspijk
                </p>
              </div>
            </div>

            {/* Business Information */}
            <div className="flex flex-col justify-end">
              <h5 className="text-xl font-bold text-primary-foreground leading-relaxed">
                Bedrijfsinformatie:
              </h5>
              <span className="w-[80px] h-[1px] bg-primary block my-2"></span>
              <div className="grid sm:grid-cols-2 grid-cols-1 gap-x-6 gap-y-2 mt-2">
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
          
          <hr className="border-primary/30 my-6" />
          
          <div className="py-4">
            <span className="text-sm text-primary-foreground block text-center lg:text-left">
              ©{new Date().getFullYear()}, Usance Interieurs, Alle Rechten Voorbehouden
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
