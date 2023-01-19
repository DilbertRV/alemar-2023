import { IoReturnUpBackOutline } from "react-icons/io5";
import { Button } from "flowbite-react";
import { useRouter } from "next/router";
export const NavbarMenu = ({ titulo }) => {
  const router = useRouter();
  const color = titulo != "Restaurante" ? "red-500" : "white";
  return (
    <div className="flex flex-wrap items-center mt-3 h-16">
      <div className="mx-3">
        {titulo != null ? (
          <Button
            color={"transparent"}
            onClick={
              titulo == "Nuevo producto"
                ? () =>
                    router.replace("/inventario", undefined, { shallow: true })
                : titulo == "Detalle del producto"
                ? () =>
                    router.replace("/inventario", undefined, { shallow: true })
                : titulo == "Inventario"
                ? () => router.replace("/", undefined, { shallow: true })
                : () => router.back()
            }
          >
            <IoReturnUpBackOutline size={35} />
          </Button>
        ) : null}
      </div>
      <h1 className={`mx-auto text-4xl font-bold text-${color} z-10`}>
        {titulo}
      </h1>
      <div className="mx-3 invisible">
        <Button color={"transparent"}>
          <IoReturnUpBackOutline size={35} />
        </Button>
      </div>
    </div>
  );
};
