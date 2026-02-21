import { Router } from "express";
import Person from "../models/Person";

const router = Router();

/* GET all */
router.get("/", async (_req, res) => {
  const people = await Person.find().sort({ createdAt: -1 });
  res.json(people);
});

/* CREATE */
router.post("/", async (req, res) => {
  try {
    const person = new Person(req.body);
    await person.save();
    res.status(201).json(person);
  } catch (err) {
    res.status(500).json({ message: "Failed to add person" });
  }
});

/* DELETE */
router.delete("/:id", async (req, res) => {
  await Person.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
});

export default router;