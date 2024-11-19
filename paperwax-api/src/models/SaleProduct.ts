export type SaleProductType = {
    sale_id: number
    product_id: number
    quantity: number 
    price: number 
    discount: number 
}

class SaleProduct {
    public sale_id: number
    public product_id: number
    public quantity: number 
    public price: number 
    public discount: number 

    constructor(item?: Partial<SaleProductType>) {
        this.sale_id = item?.sale_id
        this.product_id = item?.product_id
        this.quantity = item?.quantity
        this.price = item?.price 
        this.discount = item?.discount ?? 0
    }
}

export default SaleProduct