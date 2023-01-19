import { FcCalendar } from "react-icons/fc";
export const Fecha = ({ fecha }) => {
  const fechaConvertida = new Date(fecha);
  return (
    <div className="flex gap-x-2 items-center">
      <FcCalendar color="blue" size={20} />
      <h3 className="text-md font-bold leading-none text-gray-900 ">
        {fechaConvertida.getDate() +
          "/" +
          (fechaConvertida.getMonth() + 1) +
          "/" +
          fechaConvertida.getFullYear() +
          " " +
          (fechaConvertida.getHours() > 12
            ? fechaConvertida.getHours() - 12
            : fechaConvertida.getHours()) +
          ":" +
          (fechaConvertida.getMinutes() < 10 ? "0" : "") +
          fechaConvertida.getMinutes() +
          (fechaConvertida.getHours() >= 12 ? " PM" : " AM")}
      </h3>
    </div>
  );
};
