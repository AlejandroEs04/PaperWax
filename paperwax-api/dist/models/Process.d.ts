export type ProcessType = {
    id?: number;
    type: 'PRINTING' | 'PARAFFIN' | 'CUT' | 'PACKAGING';
    start_time: string;
    end_time: string;
    roll_material_id: number;
    initial_weight: number;
    final_weight: number;
    finished_product_id: number;
    finished_quantity: number;
    product_id: number;
};
export type ProcessCreate = Pick<ProcessType, 'id' | 'end_time' | 'final_weight' | 'finished_product_id' | 'finished_quantity' | 'initial_weight' | 'product_id' | 'roll_material_id' | 'start_time' | 'type'>;
declare class Process {
    id?: number;
    type: 'PRINTING' | 'PARAFFIN' | 'CUT' | 'PACKAGING';
    start_time: string;
    end_time: string;
    roll_material_id: number;
    initial_weight: number;
    final_weight: number;
    finished_product_id: number;
    finished_quantity: number;
    product_id: number;
    constructor(item?: Partial<ProcessType>);
}
export default Process;
