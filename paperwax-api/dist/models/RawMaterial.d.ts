export type RawMaterialType = {
    id?: number;
    name: string;
    type_id: number;
    stock: number;
    unit: 'LITERS' | 'KILOGRAMS';
};
export type RawMaterialCreate = Pick<RawMaterialType, 'name' | 'stock' | 'unit' | 'type_id'>;
declare class RawMaterial {
    id?: number;
    name: string;
    type_id: number;
    stock: number;
    unit: 'LITERS' | 'KILOGRAMS';
    constructor(item?: Partial<RawMaterialType>);
}
export default RawMaterial;
