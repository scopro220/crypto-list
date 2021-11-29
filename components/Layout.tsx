import Head from "next/head";

export default function Layout({ children, title = "Crypto List" }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Top 20 Crypto List" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>{children}</div>
    </div>
  );
}
