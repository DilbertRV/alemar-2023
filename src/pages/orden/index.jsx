import { useRouter } from "next/router";
import { useState } from "react";
import { Button } from "flowbite-react";
import { TableMenu } from "components/TableMenu";
import { useEffect } from "react";

NuavaOrden.titulo = "Nueva orden";
export default function NuavaOrden({ menu }) {
  const router = useRouter();
  const [menus, setMenus] = useState(menu);
  const [selectedMenu, setSelectedMenu] = useState(menu[0]);
  const [orden, setOrden] = useState([]);
  const [nota, setNota] = useState("");

  const confirmarOrden = {
    productos: [...orden],
  };

  useEffect(() => {
    const obtenerMenus = async () => {
      const response = await fetch("http://localhost:3000/api/inventario");
      const data = await response.json();

      setMenus(data);
      setSelectedMenu(data.find((menu) => menu._id === selectedMenu._id));
    };

    obtenerMenus();
  }, [menu]);

  const agregarProducto = (producto) => {
    const productoExistente = orden.find((p) => p.nombre === producto.nombre);
    if (productoExistente) {
      const nuevaOrden = orden.map((p) => {
        if (p.nombre === producto.nombre) {
          return {
            ...p,
            nota: nota,
            cantidad: p.cantidad + 1,
          };
        }
        return p;
      });
      setOrden(nuevaOrden);
    } else {
      setOrden([...orden, { ...producto, nota: nota, cantidad: 1 }]);
    }
  };

  const restarProducto = (producto) => {
    const productoExistente = orden.find((p) => p.nombre === producto.nombre);
    if (productoExistente && productoExistente.cantidad > 0) {
      setOrden(
        orden
          .map((p) =>
            p.nombre === producto.nombre
              ? { ...p, cantidad: p.cantidad - 1 }
              : p
          )
          .filter((p) => p.cantidad > 0)
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
      }
    }
    setNota("");
  };

  const handleSelectedMenu = (e) => {
    if (e.target.textContent === selectedMenu.nombre) return;
    const menu = menus.find((menu) => menu.nombre === e.target.textContent);
    setSelectedMenu(menu);
  };

  function handleOrdenSubmit() {
    if (orden.length === 0) return alert("No hay productos en la orden");
    router.push({
      pathname: "/orden/procesarorden",
      query: { confirmarOrden: JSON.stringify(confirmarOrden) },
    });
  }

  if (menus.length === 0)
    return (
      <div>
        No hay menus
        <Button onClick={() => router.push("/inventario/new")}>
          Nuevo Menu
        </Button>
      </div>
    );
  return (
    <>
      {/* <Button onClick={handleOrdenSubmit}>Confirmar orden</Button> */}
      <TableMenu
        menus={menus}
        handleSelectedMenu={handleSelectedMenu}
        selectedMenu={selectedMenu}
        agregarProducto={agregarProducto}
        restarProducto={restarProducto}
        handleAgregarNota={handleAgregarNota}
        orden={orden}
        setNota={setNota}
        setOrden={setOrden}
        type="orden"
      />
      <div>
        <Button
          disabled={orden.length === 0}
          onClick={handleOrdenSubmit}
          className={`${
            orden.length > 0
              ? "transition  duration-150 opacity-300 translate-y-6"
              : "opacity-0 duration-100 transition-all selection:"
          } absolute right-0 top-52 bg-red-500 hover:bg-red-600 rounded-r-none w-52 h-[65px] shadow-lg`}
        >
          Confirmar orden
        </Button>
        {/* {orden.length > 0 && (
          <Button className="transition ease-in duration-100 fixed right-0 top-60 bg-red-500 hover:bg-red-600 rounded-r-none w-52 h-[65px] shadow-lg">
            Confirmar orden
          </Button>
        )} */}
      </div>
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
