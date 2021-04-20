import { Request, Response } from "express";
// import { Connection } from "typeorm";

export interface MyContext {
  req: Request;
  res: Response;
  // db: Connection;
}
