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
        const menu = await Menu.findById(id);
        if (!menu)
          return res
            .status(404)
            .json({ success: false + "Cliente no encontrado" });
        return res.status(200).json(menu);
      } catch (err) {
        return res.status(400).json({ success: false + err });
      }
    case "PUT":
      try {
        const menu = await Menu.findByIdAndUpdate(id, body, {
          new: true,
        });
        if (!menu)
          return res.status(404).json({ success: false + "No encontrado" });
        return res.status(200).json(menu);
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
