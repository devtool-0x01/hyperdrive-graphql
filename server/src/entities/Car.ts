import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Manufacturer } from "./Manufacturer";

@ObjectType({ description: "A vehicle item" })
@Entity()
export class Car extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ type: "text" })
  description: String;

  @Column()
  manufacturerId: number;

  // @Column()
  @ManyToOne(() => Manufacturer, (man) => man.cars)
  manufacturer: Manufacturer;
}
