import { NavbarMenu } from "./Navbar";
import Head from "next/head";

export const Layout = ({ children, titulo }) => {
  return (
    <>
      <Head>
        <title>{titulo}</title>
      </Head>
      <NavbarMenu titulo={titulo} />
      <div className="m-8 ml-12 mr-12">{children}</div>
    </>
  );
};
