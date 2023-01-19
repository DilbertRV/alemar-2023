import { Button } from "flowbite-react";

export const PrintButton = ({ fecha, selectedMesa, texto, id }) => {
  const fechaConvertida = new Date(fecha);
  return (
    <Button
      id="printJS-button"
      className="bg-red-500 hover:bg-red-600"
      onClick={async () => {
        const printJS = (await import("print-js")).default;
        printJS({
          printable: id,
          ignoreElements: [
            "printJS-icon",
            "printJS-drop",
            "printJS-button",
            "printJS-verifique",
            "printJS-total",
            "printJS-precio",
          ],
          type: "html",
          header: `Mesa: ${
            selectedMesa != "Sin mesa" ? `#${selectedMesa}` : `${selectedMesa}`
          } - ${
            fechaConvertida.getDate() +
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
            (fechaConvertida.getHours() >= 12 ? " PM" : " AM")
          }`,
          headerStyle: "font-size: 20px; font-weight: semibold;",
          documentTitle: "Orden",
          showModal: true,
          targetStyles: ["*"],
          modalMessage: "Tu orden está siendo procesada",
          font_size: "1em",
          maxWidth: "100%",
          style: `
          @media all {
            .page-break {
              display: none;
            }
          }
          
          @media print {
            html, body {
              height: initial !important;
              overflow: initial !important;
              -webkit-print-color-adjust: exact;
            }
          }
          @media print {
            .page-break {
              margin-top: 1rem;
              display: block;
              page-break-before: auto;
            }
          }
          @page {
            size: auto;
            margin: auto;
          }
          `,
        });
        // handleProcesarOrden;
      }}
    >
      {texto}
    </Button>
  );
};
