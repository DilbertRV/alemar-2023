import { Card } from "flowbite-react";
import React from "react";

export default function index({ orden }) {
  console.log(orden);
  return (
    <>
      <h1>Orden</h1>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const res = await fetch("http://localhost:3000/api/orden");
  const orden = await res.json();

  return {
    props: { orden },
  };
}
