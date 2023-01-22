import { useRouter } from "next/router";
import { useState } from "react";
import { TableMenu } from "../../components/TableMenu";
import { Button } from "flowbite-react";
import { ToastMensaje } from "components/ToastMensaje";
import { useEffect } from "react";

Inventario.titulo = "Inventario";
export default function Inventario({ menu }) {
  const router = useRouter();
  const [menus, setMenus] = useState(menu);
  const [selectedMenu, setSelectedMenu] = useState(menu[0]);
  const [nombreDelMenu, setNombreDelMenu] = useState(
    selectedMenu ? selectedMenu.nombre : ""
  );
  const [categoriaDelMenu, setCategoriaDelMenu] = useState({});
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const obtenerMenus = async () => {
      const response = await fetch("http://localhost:3000/api/inventario");
      const data = await response.json();

      setMenus(data);
      setNombreDelMenu(
        data.find((menu) => menu._id === selectedMenu._id).nombre
      );
      setSelectedMenu(data.find((menu) => menu._id === selectedMenu._id));
    };

    obtenerMenus();
  }, [menu, update]);

  const handleSelectedMenu = (e) => {
    setNombreDelMenu(e.target.textContent);
    if (e.target.textContent === selectedMenu.nombre) return;
    const menu = menus.find((menu) => menu.nombre === e.target.textContent);
    setSelectedMenu(menu);
  };

  const updateNombreDelMenu = async (menu_id) => {
    if (nombreDelMenu === selectedMenu.nombre) return;
    try {
      const response = await fetch(
        `http://localhost:3000/api/inventario/${menu_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            menu_id: menu_id,
            nombre: nombreDelMenu,
            accion: "updateMenu",
          }),
        }
      );
      if (response.status === 200) {
        setUpdate(!update);
        router.replace(
          {
            pathname: "/inventario",
            query: {
              mensaje: `${nombreDelMenu}`,
              type: "ActualizarMenu",
            },
          },
          undefined,
          { scroll: false },
          "/inventario"
        );
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateCategoriaDelMenu = async (
    menu_id,
    categoria_id,
    nuevaCategoria
  ) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/inventario/${menu_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            menu_id: menu_id,
            categoria_id: categoria_id,
            nombre: nuevaCategoria,
            accion: "updateCategoria",
          }),
        }
      );
      if (response.status === 200) {
        setUpdate(!update);
        router.replace(
          {
            pathname: "/inventario",
            query: {
              mensaje: `${categoriaDelMenu[categoria_id]}`,
              type: "ActualizarCategoria",
            },
          },
          undefined,
          { scroll: false },
          "/inventario"
        );
      } else {
      }
    } catch (error) {
      console.log(error);
    }
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
        setUpdate(!update);
        router.replace(
          {
            pathname: "/inventario",
            query: {
              mensaje: `${producto_id}`,
              type: "Eliminar",
            },
          },
          undefined,
          { scroll: false },
          "/inventario"
        );
      }
    } catch (error) {
      console.log(error);
    }
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
        updateNombreDelMenu={updateNombreDelMenu}
        nombreDelMenu={nombreDelMenu}
        setNombreDelMenu={setNombreDelMenu}
        updateCategoriaDelMenu={updateCategoriaDelMenu}
        categoriaDelMenu={categoriaDelMenu}
        setCategoriaDelMenu={setCategoriaDelMenu}
        eliminarProducto={eliminarProducto}
        type="inventario"
      />
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  const res = await fetch("http://localhost:3000/api/inventario");
  const menu = await res.json();
  return {
    props: {
      menu,
    },
  };
};
