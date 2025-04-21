import "./globals.css";

export const metadata = {
  title: "Jahongir Hamidov Portfolio",
  description:
    "Portfolio of Jahongir Hamidov - Front-End Developer & Cybersecurity Student",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="redhat">{children}</body>
    </html>
  );
}
