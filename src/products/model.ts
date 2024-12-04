import mongoose from "mongoose";

interface IPriceConfiguration {
  [key: string]: {
    priceType: "base" | "additional";
    availableOptions: { [key: string]: number };
  };
}

interface IAttribute {
  name: string;
  value: string;
}

export interface IProduct {
  name: string;
  discription: string;
  image: string;
  priceConfigurations: IPriceConfiguration;
  attributes: IAttribute[];
  restaurentId: string;
  categoryId: mongoose.Schema.Types.ObjectId;
  published: boolean;
}
const priceConfigurationsSchema = new mongoose.Schema<IPriceConfiguration>({
  priceType: { type: String, enum: ["base", "additional"], required: true },
  availableOptions: { type: Map, of: Number, required: true },
});

const attributesSchema = new mongoose.Schema<IAttribute>({
  name: { type: String, required: true },
  value: { type: mongoose.Schema.Types.Mixed, required: true },
});

const productSchema = new mongoose.Schema<IProduct>(
  {
    name: { type: String, required: true },
    discription: { type: String, required: true },
    image: { type: String, required: true },
    priceConfigurations: {
      type: Map,
      of: priceConfigurationsSchema,
      required: true,
    },
    attributes: { type: [attributesSchema], required: true },
    restaurentId: { type: String, required: true },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    published: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model<IProduct>("Product", productSchema, "products");

export { Product };
