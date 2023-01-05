import { useRouter } from "next/router";
import { useState } from "react";
import { TableMenu } from "../../components/TableMenu";
import { Table, Button, Modal, TextInput, Label } from "flowbite-react";

Inventario.titulo = "Inventario";
export default function Inventario({ menus }) {
  const router = useRouter();
  const [selectedMenu, setSelectedMenu] = useState(menus[0]);
  const [orden, setOrden] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

    //   <>
    //     <div className="flex p-3 pb-0 overflow-x-scroll flex-nowrap gap-2">
    //       {menus.map((menu) => (
    //         <div key={menu._id} className="p-2">
    //           <Button
    //             id="botonMenu"
    //             gradientDuoTone="gray"
    //             size={"lg"}
    //             className={`inline-block whitespace-nowrap !p-2 ${
    //               menu._id === selectedMenu._id
    //                 ? "border-white border-4 focus:border-red-50 focus:border-4 focus:shadow-lg"
    //                 : ""
    //             } `}
    //             style={{
    //               backgroundImage: `linear-gradient(
    //               rgba(0, 0, 0, 0.5) 100%,
    //               rgba(0, 0, 0, 0.5) 100%
    //             ), url(${"/bebidas.png"})`,
    //               backgroundSize: "cover",
    //               backgroundPosition: "center",
    //               backgroundRepeat: "no-repeat",
    //               boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    //             }}
    //             onClick={handleSelectedMenu}
    //           >
    //             <h1 className="text-xl font-semibold text-white whitespace-no-wrap">
    //               {menu.nombre}
    //             </h1>
    //           </Button>
    //         </div>
    //       ))}
    //     </div>
    //     <div className="bg-white shadow-lg rounded-lg">
    //       <h1 className="text-2xl font-semibold pl-3 pt-8">
    //         {selectedMenu.nombre}
    //         <hr className="w-2/4 mt-1 mb-2" />
    //       </h1>
    //       {selectedMenu.categorias.map((categoria) => (
    //         <div key={categoria._id}>
    //           <h2 className="pl-4 mb-2 mt-6 text-red-500 font-semibold">
    //             {categoria.nombre}
    //           </h2>
    //           <Table striped={true}>
    //             <Table.Head>
    //               <Table.HeadCell>Producto</Table.HeadCell>
    //               <Table.HeadCell>Precio</Table.HeadCell>
    //               <Table.HeadCell>
    //                 <span className="sr-only">Editar</span>
    //               </Table.HeadCell>
    //             </Table.Head>
    //             <Table.Body className="divide-y">
    //               {categoria.productos.map((producto) => (
    //                 <Table.Row key={producto._id}>
    //                   <Table.Cell
    //                     style={{ minWidth: "365px", maxWidth: "350px" }}
    //                   >
    //                     {producto.nombre}
    //                   </Table.Cell>
    //                   <Table.Cell
    //                     style={{
    //                       maxWidth: "100px",
    //                       overflow: "-moz-hidden-unscrollable",
    //                       overflow: "hidden",
    //                     }}
    //                   >
    //                     {producto.precio}
    //                   </Table.Cell>
    //                   <Table.Cell className="flex flex-wrap gap-2 justify-center">
    //                     <Button
    //                       variant="primary"
    //                       onClick={() =>
    //                         router.push(`/inventario/${producto._id}/editar`)
    //                       }
    //                     >
    //                       Editar
    //                     </Button>
    //                     <Button
    //                       //a plus button
    //                       variant="primary"
    //                       onClick={() => eliminarProducto(producto)}
    //                     >
    //                       Eliminar
    //                     </Button>
    //                   </Table.Cell>
    //                 </Table.Row>
    //               ))}
    //             </Table.Body>
    //           </Table>
    //         </div>
    //       ))}
    //     </div>
    //   </>
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
