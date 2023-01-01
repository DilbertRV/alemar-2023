import { Schema, model, models } from "mongoose";

const productoSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  precio: {
    type: Number,
    required: true,
    trim: true,
  },
});

const categoriaSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  productos: [productoSchema],
});

const menuSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  categorias: [categoriaSchema],
});

module.exports = models.Menu || model("Menu", menuSchema);
