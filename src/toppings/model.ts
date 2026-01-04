import mongoose from "mongoose";

export interface ITopping {
  name: string;
  image: string;
  price: number;
  restaurantId: number;
  isPublished: boolean;
}

const toppingSchema = new mongoose.Schema<ITopping>(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    restaurantId: { type: Number, required: true },
    isPublished: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  },
);

const Topping = mongoose.model<ITopping>("Topping", toppingSchema, "toppings");

export { Topping };
