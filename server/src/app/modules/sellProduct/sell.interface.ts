import { Types } from "mongoose";

export type TSell={
      productName:string;
      buyerName:string;
      sellingDate:string;
      productQuantity:number;
      productId:Types.ObjectId

}