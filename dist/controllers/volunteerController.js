"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.approveVolunteer = exports.registerVolunteer = void 0;
const Volunteer_1 = __importDefault(require("../models/Volunteer"));
const registerVolunteer = async (req, res) => {
    const volunteer = await Volunteer_1.default.create(req.body);
    res.status(201).json(volunteer);
};
exports.registerVolunteer = registerVolunteer;
const approveVolunteer = async (req, res) => {
    const volunteer = await Volunteer_1.default.findByIdAndUpdate(req.params.id, { approved: true }, { new: true });
    res.json(volunteer);
};
exports.approveVolunteer = approveVolunteer;
//# sourceMappingURL=volunteerController.js.map