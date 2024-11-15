import { z } from 'zod'

export const rawMaterialTypeSchema = z.object({
    description: z.string(), 
    id: z.number()
})

export type RawMaterialType = z.infer<typeof rawMaterialTypeSchema>

export const rawMaterialSchema = z.object({
    id: z.number(),
    name: z.string(), 
    stock: z.number(),
    type_id: z.number(), 
    type: rawMaterialTypeSchema, 
    unit: z.string(), 
    amount: z.number()
})

export type RawMaterial = z.infer<typeof rawMaterialSchema>
export type RawMaterialCreate = Pick<RawMaterial, 'name' | 'stock' | 'type_id' | 'unit' | 'amount'>

export const rollMaterialSchema = z.object({
    id: z.number(), 
    material_id: z.number(), 
    lot: z.string(), 
    lot_id: z.number(), 
    weight: z.number(), 
    paper_id: z.number(), 
    status: z.enum(['AVAIBLE', 'DISABLE', 'INACTIVE'])
})

export type RollMaterial = z.infer<typeof rollMaterialSchema>

export const productSchema = z.object({
    id: z.number(), 
    name: z.string(), 
    description: z.string(), 
    paper_id: z.number(), 
    quantity: z.number()
})

export type ProductType = z.infer<typeof productSchema>
export type ProductCreate = Pick<ProductType, 'name' | 'description' | 'paper_id' | 'quantity'>

export const processSchema = z.object({
    id: z.number(),
    type: z.enum(['PRINTING', 'PARAFFIN', 'CUT', 'PACKAGING']), 
    start_time: z.string(), 
    end_time: z.string(), 
    roll_material_id: z.number(), 
    initial_weight: z.number(), 
    final_weight: z.number(), 
    finished_product_id: z.number(), 
    finished_quantity: z.number(), 
    product_id: z.number(), 
    product: productSchema, 
    roll_material: rollMaterialSchema
})

export type ProcessType = z.infer<typeof processSchema>
export type ProcessCreate = Pick<ProcessType, 'initial_weight' | 'product_id' | 'type' | 'roll_material_id'>

export const paperSchema = z.object({
    id: z.number(), 
    name: z.string()
})

export type PaperType = z.infer<typeof paperSchema>

