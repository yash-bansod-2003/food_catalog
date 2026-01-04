import { ProjectionType, QueryOptions, RootFilterQuery, Types } from "mongoose";
import { Topping, ITopping } from "./model.js";

class ToppingsService {
  constructor(private readonly toppingsRepository: typeof Topping) {
    this.toppingsRepository = toppingsRepository;
  }

  public async create(
    data: ITopping,
  ): Promise<ITopping & { _id: Types.ObjectId } & { __v: number }> {
    return await this.toppingsRepository.create(data);
  }

  public async findOne(
    filter: RootFilterQuery<ITopping>,
    projection?: ProjectionType<ITopping>,
    options?: QueryOptions<ITopping>,
  ): Promise<(ITopping & { _id: Types.ObjectId } & { __v: number }) | null> {
    return await Topping.findOne(filter, projection, options).exec();
  }

  public async findAll(
    filter: RootFilterQuery<ITopping> | null,
    options?: QueryOptions<ITopping>,
  ): Promise<ITopping[]> {
    return await this.toppingsRepository.find(filter, null, options).exec();
  }

  public async update(
    filter: RootFilterQuery<ITopping>,
    data: Partial<ITopping>,
  ): Promise<ITopping | null> {
    return await this.toppingsRepository
      .findOneAndUpdate(filter, data, { new: true })
      .exec();
  }

  public async delete(
    filter?: RootFilterQuery<ITopping>,
    options?: QueryOptions<ITopping>,
  ): Promise<ITopping | null> {
    return await this.toppingsRepository.findOneAndDelete(filter, options);
  }
}

export default ToppingsService;
