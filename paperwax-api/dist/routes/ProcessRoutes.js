"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProcessController_1 = require("../controllers/ProcessController");
const router = (0, express_1.Router)();
router.get('/', ProcessController_1.ProcessController.getProcess);
router.get('/:id', ProcessController_1.ProcessController.getProcessById);
router.post('/', ProcessController_1.ProcessController.createProcess);
router.put('/finish/:id', ProcessController_1.ProcessController.finishProcess);
router.get('/:type/:date', ProcessController_1.ProcessController.getPrintProcess);
exports.default = router;
//# sourceMappingURL=ProcessRoutes.js.map