import { Request, Response } from "express";
export declare class ProcessController {
    static createProcess: (req: Request, res: Response) => Promise<void>;
    static getProcess: (req: Request, res: Response) => Promise<void>;
    static getProcessById: (req: Request, res: Response) => Promise<void>;
    static finishProcess: (req: Request, res: Response) => Promise<void>;
    static getPrintProcess: (req: Request, res: Response) => Promise<void>;
}
