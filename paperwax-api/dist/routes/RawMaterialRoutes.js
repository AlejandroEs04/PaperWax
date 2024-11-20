"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const RawMaterialController_1 = require("../controllers/RawMaterialController");
const router = (0, express_1.Router)();
router.get('/', RawMaterialController_1.RawMaterialController.getAllRawMaterial);
router.post('/', RawMaterialController_1.RawMaterialController.createRawMaterial);
router.get('/types', RawMaterialController_1.RawMaterialController.getAllRawMaterialType);
exports.default = router;
//# sourceMappingURL=RawMaterialRoutes.js.map