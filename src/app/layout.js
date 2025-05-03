import Head from "next/head";
import "./globals.css";

export const metadata = {
  title: "Jahongir Hamidov Portfolio",
  description:
    "Portfolio of Jahongir Hamidov - Front-End Developer & Cybersecurity Student",
  keywords: "Jahongir Hamidov, portfolio, front-end developer, cybersecurity",
  icon: {
    icon: "./images/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="./images/favicon.ico" />
      </Head>
      <body className="redhat">{children}</body>
    </html>
  );
}
