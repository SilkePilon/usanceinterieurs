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
  title: "Usance Interieurs",
  description: "Usance Interieurs - Interior Design Studio",
  icons: {
    icon: `${favicon.src}`,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
          {/* ------ body line end */}          <ProgressCircle />
          <HashScrollHandler />
          <LayoutChildren>
            {" "}
            <div>
              <HeaderThree />
              {children}
              <Footer />
            </div>
          </LayoutChildren>
        </div>
      </body>
    </html>
  );
}
