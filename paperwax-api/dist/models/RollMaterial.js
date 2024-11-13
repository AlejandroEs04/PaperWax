"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RollMaterial {
    id;
    material_id;
    lot;
    lot_id;
    weight;
    paper_id;
    status;
    constructor(item) {
        this.id = item?.id;
        this.material_id = item?.material_id;
        this.lot = item?.lot;
        this.lot_id = item?.lot_id;
        this.weight = item?.weight;
        this.paper_id = item?.paper_id;
        this.status = item?.status ?? 'AVAIBLE';
    }
}
exports.default = RollMaterial;
//# sourceMappingURL=RollMaterial.js.map