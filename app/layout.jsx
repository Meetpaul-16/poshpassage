import "../style.css";
import SiteClient from "./site-client";

export const metadata = {
  metadataBase: new URL("https://www.poshpassagelimousine.ca"),
  icons: { icon: "/images/posh-passage-logo.png" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <SiteClient />
      </body>
    </html>
  );
}
