import { Button, Table, Modal, Label, TextInput } from "flowbite-react";
import { useRouter } from "next/router";
import { useState } from "react";

export const TableMenu = ({
  menus,
  handleSelectedMenu,
  selectedMenu,
  agregarProducto,
  restarProducto,
  handleAgregarNota,
  handleModal,
  onClose,
  isModalOpen,
  orden,
  setNota,
  type,
}) => {
  const router = useRouter();
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
              <Table.Head>
                <Table.HeadCell>Producto</Table.HeadCell>
                {type === "orden" ? (
                  <Table.HeadCell>Cantidad</Table.HeadCell>
                ) : null}
                <Table.HeadCell>Precio</Table.HeadCell>
                {type === "orden" ? (
                  <Table.HeadCell>Opciones</Table.HeadCell>
                ) : (
                  <Table.HeadCell>
                    <span className="sr-only">Opciones</span>
                  </Table.HeadCell>
                )}
              </Table.Head>
              <Table.Body className="divide-y">
                {categoria.productos.map((producto) => (
                  <Table.Row key={producto._id}>
                    {type === "orden" ? (
                      <Table.Cell
                        style={{ minWidth: "250px", maxWidth: "250px" }}
                      >
                        {producto.nombre}
                      </Table.Cell>
                    ) : (
                      <Table.Cell
                        style={{ minWidth: "365px", maxWidth: "350px" }}
                      >
                        {producto.nombre}
                      </Table.Cell>
                    )}
                    {/* <Table.Cell
                      style={{ minWidth: "365px", maxWidth: "350px" }}
                    >
                      {producto.nombre}
                    </Table.Cell> */}
                    {orden.length > 0 ? (
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
                                      onClick={() =>
                                        handleAgregarNota(producto)
                                      }
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
                        variant="primary"
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
                        <span>
                          {orden.find((p) => p.nombre === producto.nombre)
                            ?.cantidad || 0}
                        </span>
                      ) : null}
                      <Button
                        //a plus button
                        variant="primary"
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
