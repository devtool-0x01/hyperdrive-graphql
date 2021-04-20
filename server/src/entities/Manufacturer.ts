import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Car } from "./Car";

@ObjectType({ description: "A manufacturer item" })
@Entity()
export class Manufacturer extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ type: "text" })
  description: String;

  @OneToMany(() => Car, (car) => car.manufacturer, { onDelete: "CASCADE" })
  @Field(() => [Car])
  cars: Car[];
}
