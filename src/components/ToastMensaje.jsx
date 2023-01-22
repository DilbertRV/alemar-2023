import { Toast } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiCheck, HiTrash, HiRefresh } from "react-icons/hi";

export const ToastMensaje = ({ mensaje, type }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 4000);
  }, [mensaje]);

  return (
    <Toast
      className={`fixed top-7 right-0 z-10 ${
        show
          ? "block transition duration-150 "
          : "opacity-0 duration-100 transition-all ease-in-out"
      }`}
    >
      <div
        className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
          type == "Agregar"
            ? `bg-green-100 text-green-500`
            : type == "Actualizar" ||
              type == "ActualizarMenu" ||
              type == "ActualizarCategoria"
            ? `bg-blue-100 text-blue-500`
            : type == "Eliminar"
            ? `bg-red-100 text-red-500`
            : ``
        }  
    }`}
      >
        {type == "Agregar" ? (
          <HiCheck size={20} />
        ) : type == "Eliminar" ? (
          <HiTrash size={20} />
        ) : type == "Actualizar" ||
          "ActualizarMenu" ||
          "ActualizarCategoria" ? (
          <HiRefresh size={20} />
        ) : null}
      </div>
      <div className="ml-3 text-sm font-normal">
        {type == "Agregar"
          ? "Producto agregado"
          : type == "Eliminar"
          ? "Producto eliminado"
          : type == "Actualizar"
          ? "Producto actualizado"
          : type == "ActualizarMenu"
          ? "Menú actualizado"
          : type == "ActualizarCategoria"
          ? "Categoría actualizada"
          : null}
      </div>
    </Toast>
  );
};
