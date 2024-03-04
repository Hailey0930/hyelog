import StyledComponentsRegistry from "@/_lib/registry";
import type { Metadata } from "next";
import Layout from "./_components/Layout";
import { GlobalStyles } from "./_styles/GlobalStyles";
import localFont from "next/font/local";
import RecoilRootProvider from "@/_lib/recoilRootProvider";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Hyelog",
  description: "Hyelog by Hailey",
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
        <meta property="og:site_name" content="Hyelog" />
        <meta property="og:locale" content="ko_KR" />
        <meta property="og:title" content="Hyelog" />
        <meta property="og:description" content="Hyelog by Hailey" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hyelog-six.vercel.app/" />
        <meta property="og:image" content="../../public/sidebar/profile.jpg" />
        <meta property="og:image:alt" content="Hyelog profile image" />
        <meta property="og:image:type" content="image/jpg" />
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
