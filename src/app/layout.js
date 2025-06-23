import favicon from "@/app/favicon.ico";
import Footer from "@/components/footer";
import HeaderThree from "@/components/header/headerThree";
import ProgressCircle from "@/components/ui/scrollCircle";
import HashScrollHandler from "@/components/ui/hashScrollHandler";
import LayoutChildren from "@/lib/layoutChildren";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plus_jakarta_sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--plus-jakarta-sans",
});

export const metadata = {
  title: "Usance Interieurs - Interieurontwerp op maat",
  description: "Usance Interieurs denkt met u mee en zal altijd voor het interieur van uw woning, bedrijf, winkel of product het nut als uitgangspunt nemen. Wij werken niet in eigen stijl maar op eigen wijze.",
  keywords: "interieurontwerp, interieuradvies, meubelshowroom, retail interieur, bedrijfsinterieur, particulieren interieur, woninginterieur renovatie, bouwbegeleiding, Usance Interieurs",
  authors: [{ name: "Usance Interieurs" }],
  creator: "Usance Interieurs",
  publisher: "Usance Interieurs",
  icons: {
    icon: `${favicon.src}`,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://test.usanceinterieurs.nl'),
  openGraph: {
    title: "Usance Interieurs - Interieurontwerp op maat",
    description: "Wij werken niet in eigen stijl maar op eigen wijze. Een op maat gemaakt advies waarin volledig op uw wensen en eisen wordt ingespeeld, tot en met de realisatie.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://test.usanceinterieurs.nl",
    siteName: "Usance Interieurs",
    images: [
      {
        url: "/assets/images/hero_img.png",
        width: 1200,
        height: 630,
        alt: "Usance Interieurs - Interieurontwerp op maat",
      },
    ],
    locale: "nl_NL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Usance Interieurs - Interieurontwerp op maat",
    description: "Wij werken niet in eigen stijl maar op eigen wijze. Een op maat gemaakt advies waarin volledig op uw wensen en eisen wordt ingespeeld.",
    images: ["/assets/images/hero_img.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || "https://test.usanceinterieurs.nl",
  },
  contact: {
    email: process.env.NEXT_PUBLIC_COMPANY_EMAIL || "info@usanceinterieurs.nl",
    phone: "+31630305760",
  },
};

export default function RootLayout({ children }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://test.usanceinterieurs.nl";
  const companyEmail = process.env.NEXT_PUBLIC_COMPANY_EMAIL || "info@usanceinterieurs.nl";
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/usanceinterieurs";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": siteUrl,
    "name": "Usance Interieurs",
    "description": "Usance Interieurs denkt met u mee en zal altijd voor het interieur van uw woning, bedrijf, winkel of product het nut als uitgangspunt nemen. Wij werken niet in eigen stijl maar op eigen wijze.",
    "url": siteUrl,
    "telephone": "+31630305760",
    "email": companyEmail,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Zuiderzeestraatweg west 12a",
      "addressLocality": "Doornspijk",
      "postalCode": "8085 AE",
      "addressCountry": "NL"
    },
    "founder": [
      {
        "@type": "Person",
        "name": "Mariska van der Velde",
        "jobTitle": "Interieur- en winkelvormgever"
      },
      {
        "@type": "Person",
        "name": "Dennis van den Dool",
        "jobTitle": "Interieurbouwer / Allround uitvoerder"
      }
    ],
    "serviceArea": {
      "@type": "Country",
      "name": "Netherlands"
    },
    "priceRange": "€€€",
    "image": `${siteUrl}/assets/images/hero_img.png`,
    "logo": `${siteUrl}/favicon.ico`,
    "sameAs": [
      instagramUrl
    ]
  };

  return (
    <html lang="nl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${plus_jakarta_sans.variable}`}
        suppressHydrationWarning={true}
      >
        <div id="page-wrapper" className="!relative ">
          {/* ------ body line start */}
          <div className="w-full h-full fixed -z-[1] top-0 left-0 right-0 mx-auto page-lines">
            <div className="container h-full">
              <div className="flex justify-between w-full h-full">
                <span className="block h-full w-[1px] bg-secondary_rgba"></span>
                <span className="block h-full w-[1px] bg-secondary_rgba"></span>
                <span className="block h-full w-[1px] bg-secondary_rgba"></span>
              </div>
            </div>
          </div>
          {/* ------ body line end */}
          <ProgressCircle />
          <HashScrollHandler />
          <LayoutChildren>
            <HeaderThree />
            {children}
            <Footer />
          </LayoutChildren>
        </div>
      </body>
    </html>
  );
}
