import { SaleProductType } from "./SaleProduct";
export type SaleType = {
    id?: number;
    date: string;
    status: 'ON_HOLD' | 'IN_PROGRESS' | 'COMPLETED' | 'DELIVERED';
    customer_id: number;
    products: SaleProductType[];
};
export type SaleCreate = Pick<SaleType, 'date' | 'customer_id' | 'status'>;
declare class Sale {
    id?: number;
    date: string;
    status: 'ON_HOLD' | 'IN_PROGRESS' | 'COMPLETED' | 'DELIVERED';
    customer_id: number;
    constructor(item?: Partial<SaleType>);
}
export default Sale;
