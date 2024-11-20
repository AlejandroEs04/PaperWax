import { Request, Response } from "express";
export declare class RawMaterialController {
    static createRawMaterial: (req: Request, res: Response) => Promise<void>;
    static getAllRawMaterial: (req: Request, res: Response) => Promise<void>;
    static getAllRawMaterialType: (req: Request, res: Response) => Promise<void>;
}
