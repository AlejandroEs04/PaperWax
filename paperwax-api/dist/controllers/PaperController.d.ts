import { Request, Response } from "express";
export declare class PaperController {
    static createPaper: (req: Request, res: Response) => Promise<void>;
    static getAllPapers: (req: Request, res: Response) => Promise<void>;
}
