import mongoose from "mongoose";

interface IPriceConfiguration {
  [key: string]: {
    priceType: "base" | "additional";
    availableOptions: string[];
  };
}

interface IAttribute {
  name: string;
  widgetType: "switch" | "radio";
  defaultValue: string;
  availableOptions: string[];
}

export interface ICategory {
  name: string;
  priceConfigurations: IPriceConfiguration;
  attributes: IAttribute[];
}
const priceConfigurationsSchema = new mongoose.Schema<IPriceConfiguration>({
  priceType: { type: String, enum: ["base", "additional"], required: true },
  availableOptions: { type: [String], required: true },
});

const attributesSchema = new mongoose.Schema<IAttribute>({
  name: { type: String, required: true },
  widgetType: { type: String, enum: ["switch", "radio"], required: true },
  defaultValue: { type: mongoose.Schema.Types.Mixed, required: true },
  availableOptions: { type: [String], required: true },
});

const categorySchema = new mongoose.Schema<ICategory>({
  name: { type: String, required: true },
  priceConfigurations: {
    type: Map,
    of: priceConfigurationsSchema,
    required: true,
  },
  attributes: { type: [attributesSchema], required: true },
});

const Category = mongoose.model<ICategory>(
  "Category",
  categorySchema,
  "categories",
);

export { Category };
