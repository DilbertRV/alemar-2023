/* eslint-disable import/no-anonymous-default-export */
import { dbConnect } from "utils/mongoose";
import Menu from "models/Menu";
dbConnect();
export default async (req, res) => {
  const {
    method,
    body,
    query: { id },
  } = req;

  switch (method) {
    case "GET":
      try {
        const menu = await Menu.findOne({
          "categorias.productos._id": id,
        });
        const categoria = menu.categorias.find((c) =>
          c.productos.some((p) => p._id.equals(id))
        );
        const producto = categoria.productos.find((p) => p._id.equals(id));
        const nombreMenu = menu.nombre;
        const nombreCategoria = categoria.nombre;
        return res.status(200).json({ nombreMenu, nombreCategoria, producto });
      } catch (err) {
        return res.status(400).json({ success: false + err });
      }
    case "PUT":
      try {
        // Busca el menú que contiene la categoría que contiene el producto a actualizar
        const menu = await Menu.findOne({
          "categorias.productos._id": id,
        });
        // Si no se encuentra el menú, devuelve un error
        if (!menu)
          return res
            .status(404)
            .json({ success: false + "No se encontró el menú" });
        // Actualiza el producto específico utilizando el operador $set
        await Menu.updateOne(
          {
            _id: menu._id,
            "categorias.productos._id": id,
          },
          {
            $set: {
              "categorias.$.productos.$": body,
            },
          }
        );
        // Devuelve el menú actualizado
        const updatedMenu = await Menu.findById(menu._id);
        return res.status(200).json(updatedMenu);
      } catch (err) {
        return res.status(500).json({ success: false + err });
      }
    case "DELETE":
      try {
        const menu = await Menu.findByIdAndDelete(id);
        if (!menu)
          return res.status(404).json({ success: false + "No encontrado" });
        return res.status(204).json(menu);
      } catch (err) {
        return res.status(400).json({ success: false + err });
      }
    default:
      return res.status(400).json({ success: false });
  }
};
