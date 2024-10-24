export type RollMaterialType = {
    id?: number 
    material_id: number 
    lot: string 
    lot_id: number
    weight: number 
    paper_id: number
    status: 'AVAIBLE' | 'DISABLE' | 'INACTIVE'
}

export type RollMaterialCreate = Pick<RollMaterialType, 'lot' | 'lot_id' | 'material_id' | 'paper_id' | 'status' | 'weight'>

class RollMaterial {
    public id?: number 
    public material_id: number 
    public lot: string 
    public lot_id: number
    public weight: number 
    public paper_id: number
    public status: 'AVAIBLE' | 'DISABLE' | 'INACTIVE'

    constructor(item?: Partial<RollMaterialType>) {
        this.id = item?.id
        this.material_id = item?.material_id
        this.lot = item?.lot
        this.lot_id = item?.lot_id
        this.weight = item?.weight
        this.paper_id = item?.paper_id
        this.status = item?.status ?? 'AVAIBLE'
    }
}

export default RollMaterial