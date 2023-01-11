import { useRouter } from "next/router";
import { useState } from "react";
import { TableMenu } from "../../components/TableMenu";
import { Table, Button, Modal, TextInput, Label } from "flowbite-react";

Inventario.titulo = "Inventario";
export default function Inventario({ menus }) {
  const router = useRouter();
  const [selectedMenu, setSelectedMenu] = useState(menus[0]);
  const [orden, setOrden] = useState([]);

  const handleSelectedMenu = (e) => {
    if (e.target.textContent === selectedMenu.nombre) return;
    const menu = menus.find((menu) => menu.nombre === e.target.textContent);
    setSelectedMenu(menu);
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
    <TableMenu
      menus={menus}
      handleSelectedMenu={handleSelectedMenu}
      selectedMenu={selectedMenu}
      orden={orden}
      type="inventario"
    />
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
