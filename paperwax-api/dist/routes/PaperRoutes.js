"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PaperController_1 = require("../controllers/PaperController");
const router = (0, express_1.Router)();
router.post('/', PaperController_1.PaperController.createPaper);
router.get('/', PaperController_1.PaperController.getAllPapers);
exports.default = router;
//# sourceMappingURL=PaperRoutes.js.map