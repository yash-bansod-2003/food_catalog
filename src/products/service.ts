import { ProjectionType, QueryOptions, RootFilterQuery, Types } from "mongoose";
import { Product, IProduct } from "./model.js";

class ProductsService {
  constructor(private readonly productsRepository: typeof Product) {
    this.productsRepository = productsRepository;
  }

  public async create(
    data: IProduct,
  ): Promise<IProduct & { _id: Types.ObjectId } & { __v: number }> {
    return await this.productsRepository.create(data);
  }

  public async findOne(
    filter: RootFilterQuery<IProduct>,
    projection?: ProjectionType<IProduct>,
    options?: QueryOptions<IProduct>,
  ): Promise<(IProduct & { _id: Types.ObjectId } & { __v: number }) | null> {
    return await Product.findOne(filter, projection, options).exec();
  }

  public async findAll(filter: RootFilterQuery<IProduct>): Promise<IProduct[]> {
    return await this.productsRepository.find(filter);
  }

  public async update(
    filter: RootFilterQuery<IProduct>,
    data: Partial<IProduct>,
  ): Promise<IProduct | null> {
    return await this.productsRepository
      .findOneAndUpdate(filter, data, { new: true })
      .exec();
  }

  public async delete(
    filter?: RootFilterQuery<IProduct>,
    options?: QueryOptions<IProduct>,
  ): Promise<IProduct | null> {
    return await this.productsRepository.findOneAndDelete(filter, options);
  }
}

export default ProductsService;
