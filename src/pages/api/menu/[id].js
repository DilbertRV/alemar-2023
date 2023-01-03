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
        const { menu_id, categoria_id, producto_id, elProducto } = body;
        const menu = await Menu.findById(menu_id);
        const categoria = menu.categorias.find(
          (c) => c._id.toString() === categoria_id
        );
        const producto = categoria.productos.find(
          (p) => p._id.toString() === producto_id
        );
        producto.nombre = elProducto.nombre;
        producto.precio = elProducto.precio;
        await menu.save();
        return res.status(200).send({
          success: true,
          mensaje: "Producto actualizado",
        });
      } catch (error) {
        return res
          .status(500)
          .send({ success: false, mensaje: "Error al actualizar el producto" });
      }
    default:
      return res.status(400).json({ success: false });
  }
};
