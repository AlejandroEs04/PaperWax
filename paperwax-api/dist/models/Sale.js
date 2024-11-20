"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Sale {
    id;
    date;
    status;
    customer_id;
    constructor(item) {
        this.id = item?.id;
        this.date = item?.date;
        this.status = item?.status ?? 'ON_HOLD';
        this.customer_id = item?.customer_id;
    }
}
exports.default = Sale;
//# sourceMappingURL=Sale.js.map