import { useRouter } from "next/router";
import { useState } from "react";
import { TableMenu } from "../../components/TableMenu";
import { Button } from "flowbite-react";
import { ToastMensaje } from "components/ToastMensaje";
import { useEffect } from "react";

Inventario.titulo = "Inventario";
export default function Inventario({ menus }) {
  const router = useRouter();
  const [selectedMenu, setSelectedMenu] = useState(menus[0]);

  useEffect(() => {
    setSelectedMenu(menus[0]);
  }, [menus]);

  const handleSelectedMenu = (e) => {
    if (e.target.textContent === selectedMenu.nombre) return;
    const menu = menus.find((menu) => menu.nombre === e.target.textContent);
    setSelectedMenu(menu);
  };

  const eliminarProducto = async (menu_id, categoria_id, producto_id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/inventario/${menu_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            menu_id: menu_id,
            categoria_id: categoria_id,
            producto_id: producto_id,
          }),
        }
      );
      if (response.status === 200) {
        router.push(
          {
            pathname: "/inventario",
            query: {
              mensaje: `${producto_id}`,
              type: "Eliminar",
            },
          },
          "/inventario"
        );
      }
    } catch (error) {}
  };

  if (menus.length === 0)
    return (
      <div>
        No hay menus
        <Button onClick={() => router.push("inventario/new")}>
          Nuevo Menu
        </Button>
      </div>
    );
  return (
    <>
      {router.query.mensaje ? (
        <ToastMensaje mensaje={router.query.mensaje} type={router.query.type} />
      ) : null}
      <Button
        className="absolute right-0 top-56 bg-red-500 hover:bg-red-600 rounded-r-none w-52 h-[65px] shadow-lg"
        onClick={() => router.push("inventario/new")}
      >
        Agregar producto
      </Button>
      <TableMenu
        menus={menus}
        handleSelectedMenu={handleSelectedMenu}
        selectedMenu={selectedMenu}
        eliminarProducto={eliminarProducto}
        type="inventario"
      />
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  const res = await fetch("http://localhost:3000/api/inventario");
  const menus = await res.json();
  return {
    props: {
      menus,
    },
  };
};
