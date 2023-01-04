import "../styles/globals.css";
import { Layout } from "../components/Layout";
import { Inter } from "@next/font/google";

const inter = Inter({
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  return (
    <Layout titulo={Component.titulo != undefined ? Component.titulo : null}>
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </Layout>
  );
}
