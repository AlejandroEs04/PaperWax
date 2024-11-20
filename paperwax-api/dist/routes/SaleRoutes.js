"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SaleController_1 = require("../controllers/SaleController");
const router = (0, express_1.Router)();
router.get('/', SaleController_1.SaleController.getSales);
router.post('/', SaleController_1.SaleController.createSale);
router.get('/products/all', SaleController_1.SaleController.getSaleProducts);
exports.default = router;
//# sourceMappingURL=SaleRoutes.js.map