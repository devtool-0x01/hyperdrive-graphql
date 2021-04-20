import { Manufacturer } from "../entities/Manufacturer";
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Int,
  FieldResolver,
  Root,
} from "type-graphql";
import { Car } from "../entities";
import { ReturnTypeFunc } from "type-graphql/dist/decorators/types";

const OfTypeInt: ReturnTypeFunc = () => Int;

@Resolver(() => Manufacturer)
export class ManufacturerResolver {
  @FieldResolver(() => [Car]!, {
    description: "cars from this manufacturer",
    complexity: () => 5,
  })
  async cars(
    @Root() root: Manufacturer
  ): // @Arg("manufacturerId", OfTypeInt) manId: number
  Promise<Car[]> {
    // console.log(root);
    return Car.find({
      where: {
        manufacturer: root,
      },
    }); // TODO: filter cars by manufacturer Id.
  }

  @Query(() => [Manufacturer], { description: "get all manufacturers." })
  async manufacturers(): Promise<Manufacturer[]> {
    const man = await Manufacturer.find({});
    return man;
  }

  @Query(() => Manufacturer, {
    nullable: true,
    description: "get a single manufacturer",
  })
  async manufacturer(
    @Arg("id", OfTypeInt) id: number
  ): Promise<Manufacturer | undefined> {
    const man = await Manufacturer.findOne(id);
    return man;
  }

  @Mutation(() => Manufacturer)
  async createManufacturer(
    @Arg("name") name: string,
    @Arg("description") description: string
  ): Promise<Manufacturer> {
    const man = Manufacturer.create({
      description,
      name,
    });
    await man.save();
    return man;
  }

  @Mutation(() => Boolean)
  async updateManufacturer(
    @Arg("id", OfTypeInt) id: number,
    @Arg("name") name: string,
    @Arg("description") description: string
  ): Promise<boolean> {
    await Manufacturer.update(id, {
      description,
      name,
    });
    return true;
  }

  @Mutation(() => Boolean)
  async deleteManufacturer(@Arg("id", OfTypeInt) id: number): Promise<Boolean> {
    await Manufacturer.delete(id);
    return true;
  }
}
