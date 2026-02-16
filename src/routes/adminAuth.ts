// import { Router, Request, Response } from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import Admin from "../models/Admin";

// const router = Router();

// /**
//  * REGISTER ADMIN
//  */
// // routes/adminAuth.ts
// router.post("/register", async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: "Email and password required" });
//     }

//     const existingAdmin = await Admin.findOne({ email });
//     if (existingAdmin) {
//       return res.status(409).json({ message: "Admin already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 12);

//     const admin = await Admin.create({
//       email,
//       password: hashedPassword,
//       role: "admin",
//     });

//     // ✅ CREATE TOKEN ON SIGNUP
//     const token = jwt.sign(
//       { id: admin._id, role: admin.role },
//       process.env.JWT_SECRET || "supersecret",
//       { expiresIn: "1d" }
//     );

//     return res.status(201).json({
//       token,
//       message: "Admin registered successfully",
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Server error" });
//   }
// });

// /**
//  * LOGIN ADMIN
//  */
// router.post("/login", async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: "Email and password required" });
//     }

//     const admin = await Admin.findOne({ email });
//     if (!admin) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const token = jwt.sign(
//       {
//         id: admin._id,
//         role: admin.role, // ✅ ROLE INCLUDED
//       },
//       process.env.JWT_SECRET || "supersecret",
//       { expiresIn: "1d" }
//     );

//     return res.json({ token });
//   } catch (error) {
//     return res.status(500).json({ message: "Server error" });
//   }
// });

// export default router;
import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin";

const router = Router();

/**
 * REGISTER ADMIN
 */
router.post("/register", async (req: Request, res: Response) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const admin = await Admin.create({
      email,
      password: hashedPassword,
      role: "admin",
    });
    console.log("ADMIN CREATED:", admin);
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET || "supersecret",
      { expiresIn: "1d" }
    );

    return res.status(201).json({
      token,
      message: "Admin registered successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

/**
 * LOGIN ADMIN
 */
router.post("/login", async (req: Request, res: Response) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET || "supersecret",
      { expiresIn: "1d" }
    );

    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;