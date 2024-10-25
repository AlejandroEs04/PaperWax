export type ProductType = {
    id?: number
    name: string 
    description: string
    paper_id: number 
    quantity: number
}

export type ProductCreate = Omit<ProductType, 'id'>

class Product {
    public id: number 
    public name: string 
    public description: string
    public paper_id: number 
    public quantity: number

    constructor(item?: Partial<ProductType>) {
        this.id = item?.id
        this.name = item?.name
        this.description = item?.description ?? ''
        this.paper_id = item?.paper_id 
        this.quantity = item?.quantity ?? 0
    }
}

export default Product