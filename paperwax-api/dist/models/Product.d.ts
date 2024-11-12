export type ProductType = {
    id?: number;
    name: string;
    description: string;
    paper_id: number;
    quantity: number;
};
export type ProductCreate = Omit<ProductType, 'id'>;
declare class Product {
    id: number;
    name: string;
    description: string;
    paper_id: number;
    quantity: number;
    constructor(item?: Partial<ProductType>);
}
export default Product;
