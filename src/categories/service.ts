import { ProjectionType, QueryOptions, RootFilterQuery, Types } from "mongoose";
import { Category, ICategory } from "./model";

class CategoriesService {
  constructor(private readonly categoriesRepository: typeof Category) {
    this.categoriesRepository = categoriesRepository;
  }

  public async create(
    data: ICategory,
  ): Promise<ICategory & { _id: Types.ObjectId } & { __v: number }> {
    return await this.categoriesRepository.create(data);
  }

  public async findOne(
    filter: RootFilterQuery<ICategory>,
    projection?: ProjectionType<ICategory>,
    options?: QueryOptions<ICategory>,
  ): Promise<(ICategory & { _id: Types.ObjectId } & { __v: number }) | null> {
    return await Category.findOne(filter, projection, options).exec();
  }

  public async findAll(
    filter: RootFilterQuery<ICategory>,
  ): Promise<ICategory[]> {
    return await this.categoriesRepository.find(filter);
  }

  public async update(
    filter: RootFilterQuery<ICategory>,
    data: Partial<ICategory>,
  ): Promise<ICategory | null> {
    return await this.categoriesRepository
      .findOneAndUpdate(filter, data, { new: true })
      .exec();
  }

  public async delete(
    filter?: RootFilterQuery<ICategory>,
    options?: QueryOptions<ICategory>,
  ): Promise<ICategory | null> {
    return await this.categoriesRepository.findOneAndDelete(filter, options);
  }
}

export default CategoriesService;
