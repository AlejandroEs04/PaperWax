"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const RollMaterialController_1 = require("../controllers/RollMaterialController");
const router = (0, express_1.Router)();
router.get('/', RollMaterialController_1.RollMaterialController.getAllRollMaterial);
router.post('/', RollMaterialController_1.RollMaterialController.createRollMaterial);
exports.default = router;
//# sourceMappingURL=RollMaterialRoutes.js.map