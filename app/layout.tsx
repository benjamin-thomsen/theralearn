import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "TheraLearn",
    template: "%s | TheraLearn",
  },
  description:
    "TheraLearn er en digital læringsplatform til psykoterapi, psykologi og personlig udvikling.",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="da">
      <body>{children}</body>
    </html>
  );
}