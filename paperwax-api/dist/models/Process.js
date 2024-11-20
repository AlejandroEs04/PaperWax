"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Process {
    id;
    type;
    start_time;
    end_time;
    roll_material_id;
    initial_weight;
    final_weight;
    finished_product_id;
    finished_quantity;
    product_id;
    constructor(item) {
        this.id = item?.id;
        this.type = item?.type ?? 'PRINTING';
        this.start_time = item?.start_time ?? new Date().toISOString();
        this.end_time = item?.end_time;
        this.roll_material_id = item?.roll_material_id;
        this.initial_weight = item?.initial_weight;
        this.final_weight = item?.final_weight;
        this.finished_product_id = item?.finished_product_id;
        this.finished_quantity = item?.finished_quantity;
        this.product_id = item?.product_id;
    }
}
exports.default = Process;
//# sourceMappingURL=Process.js.map