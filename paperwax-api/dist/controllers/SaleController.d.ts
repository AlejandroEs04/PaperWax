import { Request, Response } from "express";
export declare class SaleController {
    static createSale: (req: Request, res: Response) => Promise<void>;
    static getSales: (req: Request, res: Response) => Promise<void>;
    static getSaleProducts: (req: Request, res: Response) => Promise<void>;
    static saleProcess: (req: Request, res: Response) => Promise<void>;
}
