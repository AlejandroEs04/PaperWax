import { Request, Response } from "express";
export declare class ProductController {
    static createProduct: (req: Request, res: Response) => Promise<void>;
    static getAllProducts: (req: Request, res: Response) => Promise<void>;
}
