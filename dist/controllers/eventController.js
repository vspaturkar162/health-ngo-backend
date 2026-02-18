"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEvents = exports.createEvent = void 0;
const Event_1 = __importDefault(require("../models/Event"));
const createEvent = async (req, res) => {
    const event = await Event_1.default.create(req.body);
    res.status(201).json(event);
};
exports.createEvent = createEvent;
const getEvents = async (_, res) => {
    const events = await Event_1.default.find().sort({ startDate: 1 });
    res.json(events);
};
exports.getEvents = getEvents;
//# sourceMappingURL=eventController.js.map