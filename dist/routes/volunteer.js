"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const volunteerController_1 = require("../controllers/volunteerController");
const auths_1 = require("../middlewares/auths");
const router = express_1.default.Router();
router.post("/", volunteerController_1.registerVolunteer);
router.put("/:id/approve", auths_1.authenticate, auths_1.authorizeAdmin, volunteerController_1.approveVolunteer);
exports.default = router;
//# sourceMappingURL=volunteer.js.map