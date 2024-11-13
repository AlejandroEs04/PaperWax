export type ProcessType = {
    id?: number
    type: 'PRINTING' | 'PARAFFIN' | 'CUT' | 'PACKAGING'
    start_time: string
    end_time: string 
    roll_material_id: number 
    initial_weight: number 
    final_weight: number 
    finished_product_id: number 
    finished_quantity: number 
    product_id: number 
}

export type ProcessCreate = Pick<ProcessType, 'id' | 'end_time' | 'final_weight' | 'finished_product_id' | 'finished_quantity' | 'initial_weight' | 'product_id' | 'roll_material_id' | 'start_time' | 'type'>

class Process {
    public id?: number
    public type: 'PRINTING' | 'PARAFFIN' | 'CUT' | 'PACKAGING'
    public start_time: string
    public end_time: string 
    public roll_material_id: number 
    public initial_weight: number 
    public final_weight: number 
    public finished_product_id: number 
    public finished_quantity: number 
    public product_id: number 

    constructor(item?: Partial<ProcessType>) {
        this.id = item?.id
        this.type = item?.type ?? 'PRINTING'
        this.start_time = item?.start_time ?? new Date().toISOString()
        this.end_time = item?.end_time
        this.roll_material_id = item?.roll_material_id
        this.initial_weight = item?.initial_weight
        this.final_weight = item?.final_weight
        this.finished_product_id = item?.finished_product_id
        this.finished_quantity = item?.finished_quantity
        this.product_id = item?.product_id
    }
}

export default Process