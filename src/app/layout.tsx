import StyledComponentsRegistry from "@/_lib/registry";
import type { Metadata } from "next";
import Layout from "./_components/Layout";
import { GlobalStyles } from "./_styles/GlobalStyles";
import localFont from "next/font/local";
import RecoilRootProvider from "@/_lib/recoilRootProvider";
import Head from "next/head";

export const metadata: Metadata = {
  metadataBase: new URL("https://hyelog-six.vercel.app"),
  title: "Hyelog",
  description: "Hyelog by Hailey",
  openGraph: {
    title: "Hyelog",
    description: "Hyelog by Hailey",
    url: "https://hyelog-six.vercel.app",
    siteName: "Hyelog",
    images: [{ url: "/public/sidebar/profile.jpg", width: 800, height: 600 }],
  },
};

const suite = localFont({
  src: [
    {
      path: "./_font/SUITE-Regular.ttf",
      weight: "normal",
      style: "normal",
    },
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={suite.className}>
      <Head>
        <title>Hyelog</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Hyelog by Hailey" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />
      </Head>
      <body>
        <RecoilRootProvider>
          <StyledComponentsRegistry>
            <GlobalStyles />
            <Layout>{children}</Layout>
          </StyledComponentsRegistry>
        </RecoilRootProvider>
      </body>
    </html>
  );
}
