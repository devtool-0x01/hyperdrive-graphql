import { Car, Manufacturer } from "../entities/";
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Int,
  Root,
  FieldResolver,
} from "type-graphql";

@Resolver(() => Car)
export class CarResolver {
  @FieldResolver(() => Manufacturer)
  async manufacturer(@Root() parent: Car): Promise<Manufacturer | undefined> {
    return Manufacturer.findOne(parent.manufacturerId);
  }

  @Query(() => [Car], { description: "get all cars." })
  async cars(
    @Arg("first", () => Int, { nullable: true }) first: number = 0,
    @Arg("limit", () => Int, { nullable: true }) limit: number = 1
  ): Promise<Car[]> {
    const maxLimit = Math.min(limit, 10);
    const skip = Math.max(first, 0);
    const cars = await Car.createQueryBuilder()
      .skip(skip)
      .take(maxLimit)
      .getMany();
    // .select("*")
    // console.log(cars);

    return cars;
  }

  @Query(() => Car, {
    nullable: true,
    description: "get a single Car",
  })
  async car(@Arg("id", () => Int) id: number): Promise<Car | undefined> {
    const car = await Car.findOne(id);
    return car;
  }

  @Mutation(() => Car)
  async createCar(
    @Arg("manufacturerId", () => Int) manId: number,
    @Arg("name") name: string,
    @Arg("description") description: string
  ): Promise<Car> {
    const man = await Manufacturer.findOne(manId);
    const car = Car.create({
      description,
      name,
      manufacturer: man,
    });
    await car.save();
    return car;
  }

  @Mutation(() => Boolean)
  async updateCar(
    @Arg("id", () => Int) id: number,
    @Arg("name") name: string,
    @Arg("description") description: string
  ): Promise<boolean> {
    await Car.update(id, {
      description,
      name,
    });
    return true;
  }

  @Mutation(() => Boolean)
  async deleteCar(@Arg("id", () => Int) id: number): Promise<boolean> {
    await Car.delete(id);
    return true;
  }
}
