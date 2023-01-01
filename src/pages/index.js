import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import { Table, Button, Modal, TextInput, Label } from "flowbite-react";

export default function HomePage({ menus }) {
  const router = useRouter();
  const [selectedMenu, setSelectedMenu] = useState(menus[0]);
  const [orden, setOrden] = useState([]);
  const [nota, setNota] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const confirmarOrden = {
    productos: [...orden],
  };

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const onClose = () => {
    setIsModalOpen(false);
  };

  const agregarProducto = (producto) => {
    const productoExistente = orden.find((p) => p.nombre === producto.nombre);
    if (productoExistente) {
      const nuevaOrden = orden.map((p) => {
        if (p.nombre === producto.nombre) {
          return {
            ...p,
            cantidad: p.cantidad + 1,
          };
        }
        return p;
      });
      setOrden(nuevaOrden);
    } else {
      setOrden([...orden, { ...producto, cantidad: 1 }]);
    }
  };

  const handleRestarProducto = (producto) => {
    const productoExistente = orden.find((p) => p.nombre === producto.nombre);
    if (productoExistente && productoExistente.cantidad > 0) {
      setOrden(
        orden.map((p) =>
          p.nombre === producto.nombre ? { ...p, cantidad: p.cantidad - 1 } : p
        )
      );
    }
  };

  const handleAgregarNota = (producto) => {
    const productoExistente = orden.find((p) => p.nombre === producto.nombre);
    if (productoExistente) {
      if (nota != "") {
        setOrden(
          orden.map((p) =>
            p.nombre === producto.nombre ? { ...p, nota: nota } : p
          )
        );
      } else {
        //llamar al alert que todavía no está
        setIsModalOpen(false);
      }
    }
    setNota("");
    setIsModalOpen(false);
  };

  const handleSelectedMenu = (e) => {
    if (e.target.textContent === selectedMenu.nombre) return;
    const menu = menus.find((menu) => menu.nombre === e.target.textContent);
    setSelectedMenu(menu);
  };

  function handleOrdenSubmit() {
    if (orden.length === 0) return alert("No hay productos en la orden");
    router.push({
      pathname: "/orden",
      query: { confirmarOrden: JSON.stringify(confirmarOrden) },
    });
  }

  if (menus.length === 0)
    return (
      <div>
        No hay menus
        <Button onClick={() => router.push("/menu/new")}>Nuevo Menu</Button>
      </div>
    );
  return (
    <>
      <Button onClick={() => router.push("/menu/new")}>Nuevo Menu</Button>
      <Button onClick={() => router.push("/menu")}>Inventario</Button>
      <Button onClick={handleOrdenSubmit}>Confirmar orden</Button>
      <div className="flex flex-wrap gap-2">
        {menus.map((menu) => (
          <Button key={menu._id} onClick={handleSelectedMenu}>
            {menu.nombre}
          </Button>
        ))}
      </div>
      <h1 className="text-2xl font-semibold">{selectedMenu.nombre}</h1>
      <div>
        {selectedMenu.categorias.map((categoria) => (
          <div key={categoria._id}>
            <h2>{categoria.nombre}</h2>
            <Table striped={true}>
              <Table.Head>
                <Table.HeadCell>Producto</Table.HeadCell>
                <Table.HeadCell>Cantidad</Table.HeadCell>
                <Table.HeadCell>Precio</Table.HeadCell>
                <Table.HeadCell>
                  <span className="sr-only">Edit</span>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {categoria.productos.map((producto) => (
                  <Table.Row key={producto._id}>
                    <Table.Cell>{producto.nombre}</Table.Cell>
                    <Table.Cell>
                      {orden.find(
                        (p) => p.nombre === producto.nombre && p.cantidad > 0
                      ) ? (
                        <>
                          <Button
                            size="xs"
                            outline={true}
                            color="dark"
                            onClick={handleModal}
                          >
                            Nota
                          </Button>
                          <Modal
                            show={isModalOpen}
                            size="md"
                            popup={true}
                            onClose={onClose}
                          >
                            <Modal.Header />
                            <Modal.Body>
                              <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                                <div>
                                  <div className="mb-2 block">
                                    <Label htmlFor="nota" value="nota" />
                                  </div>
                                  <TextInput
                                    id="nota"
                                    placeholder="Agregar una nota al producto del cliente"
                                    onChange={(e) => setNota(e.target.value)}
                                  />
                                </div>
                                <div>
                                  <Button
                                    onClick={() => handleAgregarNota(producto)}
                                  >
                                    Agregar nota
                                  </Button>
                                </div>
                              </div>
                            </Modal.Body>
                          </Modal>
                        </>
                      ) : null}
                    </Table.Cell>
                    <Table.Cell>{producto.precio}</Table.Cell>
                    <Table.Cell className="flex flex-wrap">
                      <Button
                        variant="primary"
                        onClick={() => handleRestarProducto(producto)}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M18 12H6"
                          />
                        </svg>
                      </Button>
                      <span className="mx-2">
                        {orden.find((p) => p.nombre === producto.nombre)
                          ?.cantidad || 0}
                      </span>
                      <Button
                        //a plus button
                        variant="primary"
                        onClick={() => agregarProducto(producto)}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        ))}
      </div>
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  const res = await fetch("http://localhost:3000/api/menu");
  const menus = await res.json();
  return {
    props: {
      menus,
    },
  };
};
