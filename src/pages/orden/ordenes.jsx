import { Fecha } from "components/Fecha";
import { PrintButton } from "components/PrintButton";
import { Card, Badge } from "flowbite-react";

Ordenes.titulo = "Lista de ordenes";
export default function Ordenes({ orden }) {
  return (
    <>
      {orden.map((orden) => (
        <Card key={orden._id} className="mb-4">
          <div className="mb-4 flex items-center justify-between">
            <Fecha fecha={orden.fecha} />
            {/* SPAN mesa rounded */}
            <Badge size={"sm"} color="success">
              Mesa: {orden.numeroMesa}
            </Badge>
          </div>
          <div id={orden._id} className="flow-root">
            <h2 className="text-lg text-gray-900">Lista de productos:</h2>
            <ul className="divide-y divide-gray-100">
              {orden.productos.map((producto) => {
                return (
                  <li key={producto._id} className="py-3 sm:py-4">
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
                        <p className="truncate text-md font-medium text-gray-600 ">
                          {producto.nombre}
                          <span className="flex truncate text-sm text-gray-500">
                            {producto.nota ? "* " + producto.nota : ""}
                          </span>
                        </p>
                      </div>
                      <div className="flex items-center">
                        <h2 className="text-base font-semibold text-gray-600">
                          ₡{producto.precio}
                        </h2>
                      </div>
                    </div>
                  </li>
                );
              })}
              <li className="pt-3 sm:pt-5">
                <div className="flex space-x-4 float-right items-center text-2xl font-semibold text-gray-600">
                  <div id="printJS-total" className="flex space-x-3">
                    <h2>Total: </h2>
                    <h2>₡{orden.total}</h2>
                  </div>
                </div>
              </li>
            </ul>
            <PrintButton
              selectedMesa={orden.numeroMesa}
              fecha={orden.fecha}
              texto="Imprimir orden"
              id={orden._id}
            />
          </div>
        </Card>
      ))}
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
