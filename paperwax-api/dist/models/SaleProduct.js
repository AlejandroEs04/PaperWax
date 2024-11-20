"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SaleProduct {
    sale_id;
    product_id;
    quantity;
    price;
    status;
    discount;
    constructor(item) {
        this.sale_id = item?.sale_id;
        this.product_id = item?.product_id;
        this.quantity = item?.quantity;
        this.status = item?.status ?? 'ON_HOLD';
        this.price = item?.price;
        this.discount = item?.discount ?? 0;
    }
}
exports.default = SaleProduct;
//# sourceMappingURL=SaleProduct.js.map