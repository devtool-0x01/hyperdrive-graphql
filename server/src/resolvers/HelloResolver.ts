// import { Manufacturer } from "src/entities";
import { Resolver, Query, Ctx } from "type-graphql";
import { MyContext } from "../types";

@Resolver()
export class HelloResolver {
  @Query(() => String, { description: "this is a test query." })
  hello(@Ctx() { req }: MyContext): String {
    return "hello " + req.path;
  }
}
