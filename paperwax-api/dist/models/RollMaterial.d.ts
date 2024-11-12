export type RollMaterialType = {
    id?: number;
    material_id: number;
    lot: string;
    lot_id: number;
    weight: number;
    paper_id: number;
    status: 'AVAIBLE' | 'DISABLE' | 'INACTIVE';
};
export type RollMaterialCreate = Pick<RollMaterialType, 'lot' | 'lot_id' | 'material_id' | 'paper_id' | 'status' | 'weight'>;
declare class RollMaterial {
    id?: number;
    material_id: number;
    lot: string;
    lot_id: number;
    weight: number;
    paper_id: number;
    status: 'AVAIBLE' | 'DISABLE' | 'INACTIVE';
    constructor(item?: Partial<RollMaterialType>);
}
export default RollMaterial;
