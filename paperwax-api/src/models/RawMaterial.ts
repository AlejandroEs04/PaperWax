export type RawMaterialType = {
    id?: number 
    name: string 
    type_id: number 
    stock: number 
    unit: 'LITERS' | 'KILOGRAMS'
}

export type RawMaterialCreate = Pick<RawMaterialType, 'name' | 'stock' | 'unit' | 'type_id'>

class RawMaterial {
    public id?: number 
    public name: string 
    public type_id: number 
    public stock: number 
    public unit: 'LITERS' | 'KILOGRAMS'

    constructor(item?: Partial<RawMaterialType>) {
        this.id = item?.id
        this.name = item?.name
        this.type_id = item?.type_id
        this.stock = item?.stock ?? 0
        this.unit = item?.unit ?? 'KILOGRAMS'
    }
}

export default RawMaterial