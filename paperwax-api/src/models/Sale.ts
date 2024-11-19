import { SaleProductType } from "./SaleProduct"

export type SaleType = {
    id?: number
    date: string 
    status: 'ON_HOLD' | 'IN_PROGRESS' | 'COMPLETED' | 'DELIVERED'
    customer_id: number
    products: SaleProductType[]
}

export type SaleCreate = Pick<SaleType, 'date' | 'customer_id' | 'status'>

class Sale {
    public id?: number
    public date: string 
    public status: 'ON_HOLD' | 'IN_PROGRESS' | 'COMPLETED' | 'DELIVERED'
    public customer_id: number

    constructor(item?: Partial<SaleType>) {
        this.id = item?.id
        this.date = item?.date 
        this.status = item?.status ?? 'ON_HOLD'
        this.customer_id = item?.customer_id
    }
}

export default Sale