export type PaperType = {
    id?: number;
    name: string;
};
export type PaperCreate = Omit<PaperType, 'id'>;
declare class Paper {
    id?: number;
    name: string;
    constructor(item?: Partial<PaperType>);
}
export default Paper;
