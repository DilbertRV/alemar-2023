import { Button, Dropdown, Card } from "flowbite-react";
import { useState } from "react";
import { useRouter } from "next/router";
import { Fecha } from "components/Fecha";
import { PrintButton } from "components/PrintButton";

ProcesarOrden.titulo = "Procesar la orden";
export default function ProcesarOrden({ confirmarOrden }) {
  const router = useRouter();
  const [selectedMesa, setSelectedMesa] = useState("Sin mesa");
  const fecha = new Date();

  const calculateTotal = () => {
    let total = 0;
    confirmarOrden.productos.forEach((producto) => {
      total += producto.precio * producto.cantidad;
    });
    return total;
  };
  const mesas = ["1", "2", "3", "4", "5", "Sin mesa"];

  const datosRecopilados = {
    numeroMesa: selectedMesa,
    fecha: fecha,
    productos: [...confirmarOrden.productos],
    total: calculateTotal(),
  };

  function handleMesaSelection(mesa) {
    setSelectedMesa(mesa);
  }

  const handleProcesarOrden = (printJS) => {
    // if (selectedMesa) {
    //   fetch("/api/orden", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(datosRecopilados),
    //   });
    //   router.push("/orden");
    // } else {
    //   alert("Por favor, seleccione una mesa");
    // }
  };

  return (
    <div>
      <>
        <Card className="divit">
          <div className="mb-4 flex items-center justify-between">
            <Fecha fecha={fecha} />
            <Dropdown
              id="printJS-drop"
              label={`Número de mesa: ${
                selectedMesa != "Sin mesa"
                  ? `#${selectedMesa}`
                  : `${selectedMesa}`
              }`}
            >
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
          </div>
          <div id="printJS-card" className="flow-root">
            <h2 id="printJS-verifique" className="text-lg text-gray-900">
              Verifique la orden:
            </h2>
            <ul className="divide-y divide-gray-100">
              {confirmarOrden.productos.map((producto, index) => {
                return (
                  <li key={index} className="py-3 sm:py-4">
                    <div className="flex space-x-4">
                      <div
                        className="
                          flex-1
                          flex
                          space-x-2
                          truncate
                          items-center
                      "
                      >
                        <p className="font-semibold">
                          {producto.cantidad + " x"}
                        </p>
                        <p className="truncate text-md font-medium text-gray-900 ">
                          {producto.nombre}
                          <span className="flex truncate text-sm text-gray-500">
                            {producto.nota ? "* " + producto.nota : ""}
                          </span>
                        </p>
                      </div>
                      <div id="printJS-precio" className="flex items-center">
                        <h2 className="text-base font-semibold text-gray-900">
                          ₡{producto.precio}
                        </h2>
                      </div>
                    </div>
                  </li>
                );
              })}
              <li className="pt-3 sm:pt-5">
                <div className="flex space-x-4 float-right items-center text-2xl font-semibold text-gray-900">
                  <div id="printJS-total" className="flex space-x-3">
                    <h2>Total: </h2>
                    <h2>₡{calculateTotal()}</h2>
                  </div>
                </div>
              </li>
            </ul>
            <PrintButton
              selectedMesa={selectedMesa}
              fecha={fecha}
              texto="Procesar orden"
              id={"printJS-card"}
            />
          </div>
        </Card>
      </>
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
