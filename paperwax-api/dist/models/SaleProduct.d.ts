export type SaleProductType = {
    sale_id: number;
    product_id: number;
    quantity: number;
    price: number;
    status: 'ON_HOLD' | 'PRINTING' | 'PARAFFIN' | 'CUT' | 'PACKAGING' | 'COMPLETED' | 'DELIVERED';
    discount: number;
};
declare class SaleProduct {
    sale_id: number;
    product_id: number;
    quantity: number;
    price: number;
    status: 'ON_HOLD' | 'PRINTING' | 'PARAFFIN' | 'CUT' | 'PACKAGING' | 'COMPLETED' | 'DELIVERED';
    discount: number;
    constructor(item?: Partial<SaleProductType>);
}
export default SaleProduct;
