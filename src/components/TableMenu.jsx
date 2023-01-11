import { Button, Table, Modal, Label, TextInput, Toast } from "flowbite-react";
import { IoClose, IoPencil } from "react-icons/io5";
import { useRouter } from "next/router";
import { useState } from "react";

export const TableMenu = ({
  menus,
  handleSelectedMenu,
  selectedMenu,
  agregarProducto,
  restarProducto,
  handleAgregarNota,
  orden,
  setNota,
  setOrden,
  type,
}) => {
  const router = useRouter();

  const [error, setError] = useState("");

  function handleChange(e) {
    setNota(e.target.value);
    setError(e.target.value.length > 0 ? "" : "Campo requerido");
  }

  const handleSubmitNota = (producto) => {
    if (error === "") {
      handleAgregarNota(producto);
    } else {
      setError("Campo requerido");
    }
  };

  const handleDeleteNota = (producto) => {
    setOrden(
      orden.map((p) => (p._id === producto._id ? { ...p, nota: "" } : p))
    );
  };

  const getNotaDeLaOrden = (orden, producto) => {
    return orden.find((p) => p._id === producto._id).nota;
  };

  const [modalOpen, setModalOpen] = useState({});

  async function handleModal(producto) {
    setModalOpen({ ...modalOpen, [producto._id]: true });
    await new Promise((resolve) => {
      setTimeout(() => {
        const inputText = document.getElementById("nota_" + producto._id);
        console.log(inputText);
        resolve();

        inputText.value = getNotaDeLaOrden(orden, producto);
      }, 0);
    });
  }

  function onClose(producto) {
    setModalOpen({ ...modalOpen, [producto._id]: false });
    setError("");
  }

  return (
    <>
      <div className="flex p-3 pb-0 overflow-x-scroll flex-nowrap gap-2">
        {menus.map((menu) => (
          <div key={menu._id} className="p-2">
            <Button
              id="botonMenu"
              gradientDuoTone="gray"
              size={"lg"}
              className={`inline-block whitespace-nowrap !p-2 ${
                menu._id === selectedMenu._id
                  ? "border-white border-4 focus:border-red-50 focus:border-4 focus:shadow-lg"
                  : ""
              } `}
              style={{
                backgroundImage: `linear-gradient(
                rgba(0, 0, 0, 0.5) 100%,
                rgba(0, 0, 0, 0.5) 100%
              ), url(${"/bebidas.png"})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              }}
              onClick={handleSelectedMenu}
            >
              <h1 className="text-xl font-semibold text-white whitespace-no-wrap">
                {menu.nombre}
              </h1>
            </Button>
          </div>
        ))}
      </div>
      <div className="bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-semibold pl-3 pt-8">
          {selectedMenu.nombre}
          <hr className="w-2/4 mt-1 mb-2" />
        </h1>
        {selectedMenu.categorias.map((categoria) => (
          <div key={categoria._id}>
            <h2 className="pl-4 mb-2 mt-6 text-red-500 font-semibold">
              {categoria.nombre}
            </h2>
            <Table striped={true}>
              <Table.Head className="text-center">
                <Table.HeadCell className="text-left">Producto</Table.HeadCell>
                {type === "orden" ? (
                  <Table.HeadCell>Nota</Table.HeadCell>
                ) : null}
                <Table.HeadCell>Precio</Table.HeadCell>
                {type === "orden" ? (
                  <Table.HeadCell>Cantidad</Table.HeadCell>
                ) : (
                  <Table.HeadCell>
                    <span className="sr-only">Opciones</span>
                  </Table.HeadCell>
                )}
              </Table.Head>
              <Table.Body className="divide-y text-center">
                {categoria.productos.map((producto) => (
                  <Table.Row key={producto._id}>
                    {type === "orden" ? (
                      <Table.Cell
                        className="text-left pr-0"
                        style={{ minWidth: "250px", maxWidth: "250px" }}
                      >
                        {producto.nombre}
                      </Table.Cell>
                    ) : (
                      <Table.Cell
                        className="text-left"
                        style={{ minWidth: "365px", maxWidth: "350px" }}
                      >
                        {producto.nombre}
                      </Table.Cell>
                    )}
                    {type === "orden" ? (
                      <Table.Cell className="px-0 py-0">
                        {orden.find(
                          (p) => p._id === producto._id && p.cantidad > 0
                        ) ? (
                          <>
                            <Button
                              size="xs"
                              onClick={() => handleModal(producto)}
                              // className="m-auto bg-green-500 hover:bg-green-600 text-white"
                              className={
                                orden.find(
                                  (p) =>
                                    p._id === producto._id && p.cantidad > 0
                                ).nota != ""
                                  ? "m-auto bg-lime-500 hover:bg-lime-600 text-white"
                                  : "m-auto bg-gray-500 hover:bg-gray-700 text-white"
                              }
                            >
                              Nota
                            </Button>
                            <Modal
                              id={producto._id}
                              show={modalOpen[producto._id]}
                              size="md"
                              popup={true}
                              onClose={() => onClose(producto)}
                            >
                              <Modal.Header />
                              <Modal.Body>
                                <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                                  <div>
                                    <div className="mb-2 block">
                                      <Label
                                        htmlFor="nota"
                                        value="Nota del producto"
                                      />
                                    </div>
                                    <div className="flex flex-row w-full gap-x-2">
                                      <TextInput
                                        className="w-full"
                                        id={"nota_" + producto._id}
                                        placeholder="Agregar una nota al producto del cliente"
                                        onChange={(e) => handleChange(e)}
                                      />
                                    </div>
                                    <div className="flex divide-gray-200 mt-2 ">
                                      {orden.find(
                                        (p) =>
                                          p._id === producto._id &&
                                          p.cantidad > 0
                                      ).nota != "" && (
                                        <Toast>
                                          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-500">
                                            <IoPencil className="h-5 w-5" />
                                          </div>
                                          <div className="ml-3 text-sm font-normal">
                                            {
                                              orden.find(
                                                (p) =>
                                                  p._id === producto._id &&
                                                  p.cantidad > 0
                                              ).nota
                                            }
                                          </div>
                                          <Button
                                            size={25}
                                            className="ml-auto inline-flex h-8 rounded-lg bg-red-500 p-1.5 hover:bg-red-600 focus:ring-2 focus:ring-gray-300"
                                            onClick={() =>
                                              handleDeleteNota(producto)
                                            }
                                          >
                                            <IoClose size={25} />
                                          </Button>
                                        </Toast>
                                      )}
                                    </div>

                                    {error && (
                                      <p className="text-red-500 text-sm">
                                        {error}
                                      </p>
                                    )}
                                  </div>
                                  <div className="flex gap-x-4">
                                    <Button
                                      onClick={() => handleSubmitNota(producto)}
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
                    ) : null}
                    <Table.Cell
                      style={{
                        maxWidth: "100px",
                        overflow: "-moz-hidden-unscrollable",
                        overflow: "hidden",
                      }}
                    >
                      {producto.precio}
                    </Table.Cell>
                    <Table.Cell className="flex flex-wrap gap-2 float-right justify-center">
                      <Button
                        color="gray"
                        onClick={() => {
                          type === "orden"
                            ? restarProducto(producto)
                            : router.push(`/inventario/${producto._id}/editar`);
                        }}
                      >
                        {type === "orden" ? (
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
                        ) : (
                          "Editar"
                        )}
                      </Button>
                      {type === "orden" ? (
                        <span
                          className="self-center font-bold"
                          style={{ minWidth: "15px" }}
                        >
                          {orden.find((p) => p.nombre === producto.nombre)
                            ?.cantidad || 0}
                        </span>
                      ) : null}
                      <Button
                        //a plus button
                        color="gray"
                        onClick={() => {
                          type === "orden"
                            ? agregarProducto(producto)
                            : eliminarProducto(producto);
                        }}
                      >
                        {type === "orden" ? (
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
                        ) : (
                          "Eliminar"
                        )}
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
};
