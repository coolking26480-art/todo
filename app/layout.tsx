import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sujal Jain — Researcher & Designer",
  description: "Portfolio of Sujal Jain — Researcher, Designer, and Developer exploring the intersection of neuroscience, code, and creative design.",
  keywords: ["Sujal Jain", "Researcher", "Designer", "Developer", "Portfolio", "Neuroscience", "Python", "Next.js"],
  authors: [{ name: "Sujal Jain" }],
  openGraph: {
    title: "Sujal Jain — Researcher & Designer",
    description: "Portfolio exploring the intersection of neuroscience, code, and creative design.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
