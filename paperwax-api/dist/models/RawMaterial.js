"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RawMaterial {
    id;
    name;
    type_id;
    stock;
    amount;
    unit;
    constructor(item) {
        this.id = item?.id;
        this.name = item?.name;
        this.type_id = item?.type_id;
        this.stock = item?.stock ?? 0;
        this.amount = item?.amount ?? 0;
        this.unit = item?.unit ?? 'KILOGRAMS';
    }
}
exports.default = RawMaterial;
//# sourceMappingURL=RawMaterial.js.map