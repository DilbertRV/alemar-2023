import { Button, Dropdown } from "flowbite-react";
import { useState } from "react";
import { useRouter } from "next/router";

export default function ConfirmarOrden({ confirmarOrden }) {
  const router = useRouter();
  const [selectedMesa, setSelectedMesa] = useState(null);
  const fecha = new Date();

  const calculateTotal = () => {
    let total = 0;
    confirmarOrden.productos.forEach((producto) => {
      total += producto.precio * producto.cantidad;
    });
    return total;
  };
  const mesas = ["1", "2", "3", "Sin mesa"];

  const datosRecopilados = {
    numeroMesa: selectedMesa,
    fecha: fecha,
    productos: [...confirmarOrden.productos],
    total: calculateTotal(),
  };

  function handleMesaSelection(value) {
    setSelectedMesa(value);
  }

  const handleProcesarOrden = () => {
    if (selectedMesa) {
      fetch("/api/orden", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosRecopilados),
      });
      router.push("/");
    } else {
      alert("Por favor, seleccione una mesa");
    }
  };

  return (
    <div>
      <h1>Confirmar Orden</h1>
      <Dropdown label="Número de mesa">
        {mesas.map((mesa, index) => (
          <Dropdown.Item
            key={index}
            value={mesa}
            onClick={() => handleMesaSelection(mesa)}
          >
            {mesa}
          </Dropdown.Item>
        ))}
      </Dropdown>
      <h3>
        {fecha.getDate() +
          "/" +
          (fecha.getMonth() + 1) +
          "/" +
          fecha.getFullYear() +
          " " +
          fecha.getHours() +
          ":" +
          fecha.getMinutes()}
      </h3>
      {confirmarOrden.productos.map((producto, index) => {
        return (
          <>
            <div key={index}>
              <p>{producto.nombre}</p>
              <p>{producto.cantidad}</p>
              <p>{producto.nota}</p>
            </div>
          </>
        );
      })}
      <Button onClick={handleProcesarOrden}>Procesar orden</Button>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const { confirmarOrden } = ctx.query;
  const orden = JSON.parse(confirmarOrden);
  return {
    props: {
      confirmarOrden: orden,
    },
  };
}
