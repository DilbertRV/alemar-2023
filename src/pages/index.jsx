import Image from "next/image";
import { Button, Spinner } from "flowbite-react";
import { IoReceipt } from "react-icons/io5";
import { IoReaderSharp } from "react-icons/io5";
import { useRouter } from "next/router";
import Link from "next/link";

MenuPrincipal.titulo = "Restaurante";

export default function MenuPrincipal() {
  const route = useRouter();

  return (
    <div className="container">
      <Image
        className="
        absolute top-0 left-0 z-0
      "
        src="/bg.svg"
        alt="Imagen de fondo"
        width={1400}
        height={600}
      />
      <div className="flex justify-center">
        <Image
          className="z-10"
          src="/logoAlemar.png"
          alt="Logo Alemar"
          width={505}
          height={307}
        />
      </div>
      <div className="flex flex-col mt-72 justify-center ml-16 mr-16">
        <Link href="/orden" passHref legacyBehavior>
          <Button
            className="h-32 border-b-8 w-full border-red-500 shadow-md"
            color={"transparent"}
            style={{
              backgroundImage: `url(${"/Crearordenbgfood.png"})`,
            }}
            size="lg"
            onClick={() => route.push("/orden")}
          >
            {/* <div className="relative bottom-0 right-2">
            <Spinner size="lg" light={true} />
          </div> */}
            <h3 className="text-3xl font-bold text-white">Crear nueva orden</h3>
          </Button>
        </Link>
        <div
          className=" 
        flex flex-row justify-between gap-x-5 mt-7
      "
        >
          <Link href="/orden/ordenes" passHref legacyBehavior>
            <Button
              className="flex p-5 justify-between h-32 max-w-xs border-b-8 border-b-red-500 shadow-lg"
              color="gray"
              size="xs"
            >
              {/* <div className="relative bottom-0 right-2">
              <Spinner size="lg" light={true} />
            </div> */}
              <h3 className="flex text-3xl font-bold text-gray-900 text-left">
                Ver todas las ordenes
              </h3>
              <IoReceipt size={40} className="text-gray-900" />
            </Button>
          </Link>
          <Link href="/inventario" passHref legacyBehavior>
            <Button
              className="flex p-5 justify-between h-32 max-w-xs border-b-8 border-b-red-500 shadow-lg"
              color="gray"
              size="xs"
            >
              <div className="flex flex-col pr-5">
                <h3 className="text-3xl font-bold text-gray-900 text-left">
                  Inventario
                </h3>
                <p className="text-left">Solo administrador</p>
              </div>
              <IoReaderSharp size={30} className="text-gray-900" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
