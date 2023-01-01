import { useRouter } from "next/router";
import { useState } from "react";
import { Table, Button, Modal, TextInput, Label } from "flowbite-react";

export default function Inventario({ menus }) {
  const router = useRouter();
  const [selectedMenu, setSelectedMenu] = useState(menus[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const onClose = () => {
    setIsModalOpen(false);
  };

  const eliminarProducto = (producto) => {};

  const handleSelectedMenu = (e) => {
    if (e.target.textContent === selectedMenu.nombre) return;
    const menu = menus.find((menu) => menu.nombre === e.target.textContent);
    setSelectedMenu(menu);
  };

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
                <Table.HeadCell>Precio</Table.HeadCell>
                <Table.HeadCell>
                  <span className="sr-only">Edit</span>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {categoria.productos.map((producto) => (
                  <Table.Row key={producto._id}>
                    <Table.Cell>{producto.nombre}</Table.Cell>

                    <Table.Cell>{producto.precio}</Table.Cell>
                    <Table.Cell className="flex flex-wrap gap-2">
                      <Button
                        variant="primary"
                        onClick={() =>
                          router.push(`/menu/${producto._id}/editar`)
                        }
                      >
                        Editar
                      </Button>
                      <Button
                        //a plus button
                        variant="primary"
                        onClick={() => eliminarProducto(producto)}
                      >
                        Eliminar
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
