"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Product {
    id;
    name;
    description;
    paper_id;
    quantity;
    constructor(item) {
        this.id = item?.id;
        this.name = item?.name;
        this.description = item?.description ?? '';
        this.paper_id = item?.paper_id;
        this.quantity = item?.quantity ?? 0;
    }
}
exports.default = Product;
//# sourceMappingURL=Product.js.map