import { dbConnect } from "utils/mongoose";
import Menu from "models/Menu";

dbConnect();
export default async function handler(req, res) {
  const { method, body } = req;
  console.log(body);
  switch (method) {
    case "GET":
      try {
        const menu = await Menu.find({});
        return res.status(200).json(menu);
      } catch (err) {
        return res.status(400).json({ success: false + err });
      }
    case "POST":
      try {
        const menu = await Menu.findOne({ nombre: body.menu });
        if (!menu) {
          const menu = await Menu(body);
          await menu.save();
          return res.status(201).json("Menú creado");
        }
        const categoria = menu.categorias.find(
          (c) => c.nombre === body.categoria
        );
        categoria.productos.push({
          nombre: body.producto.nombre,
          precio: body.producto.precio,
        });
        await menu.save();
        return res.status(201).json("Producto agregado");
      } catch (err) {
        return res.status(400).json({ success: false + err });
      }
    default:
      return res.status(400).json({ success: false });
  }
}
