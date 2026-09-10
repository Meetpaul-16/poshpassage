import "../style.css";
import { Bodoni_Moda, Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import SiteClient from "./site-client";

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bodoni-moda",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600"],
});

export const metadata = {
  metadataBase: new URL("https://www.poshpassagelimousine.ca"),
  icons: { icon: "/images/posh-passage-logo.png" },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${bodoniModa.variable} ${inter.variable} ${spaceGrotesk.variable}`}
    >
      <body>
        {children}
        <SiteClient />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2WJ29KXS71"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2WJ29KXS71');
          `}
        </Script>
      </body>
    </html>
  );
}
