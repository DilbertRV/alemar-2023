import { Schema, model, models } from "mongoose";

const ordenSchema = new Schema({
  numeroMesa: {
    type: String,
  },
  fecha: {
    type: Date,
    required: true,
  },
  productos: [
    {
      nombre: {
        type: String,
        required: true,
        trim: true,
      },
      cantidad: {
        type: Number,
        required: true,
      },
      precio: {
        type: Number,
        required: true,
      },
      nota: {
        type: String,
        trim: true,
      },
    },
  ],
  total: {
    type: Number,
    required: true,
  },
});

module.exports = models.Orden || model("Orden", ordenSchema);
