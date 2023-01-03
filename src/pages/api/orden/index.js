import { dbConnect } from "utils/mongoose";
import Orden from "models/Orden";

dbConnect();
export default async function handler(req, res) {
  const { method, body } = req;
  switch (method) {
    case "GET":
      try {
        const orden = await Orden.find({});
        return res.status(200).json(orden);
      } catch (err) {
        return res.status(400).json({ success: false + err });
      }
    case "POST":
      try {
        const orden = new Orden(body);
        if (orden) {
          await orden.save();
          return res.status(201).json("Orden procesada");
        } else {
          return res.status(400).json({
            success: false + "Orden vacía y no se puede procesar",
          });
        }
      } catch (err) {
        return res.status(400).json({ success: false + err });
      }
    default:
      return res.status(400).json({ success: false });
  }
}
