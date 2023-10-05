import careers from "../data/careers.json";
import express from "express";

var router = express.Router();

// api/v1/careers.json
router.get("/", (req, res) => res.json(careers));

export default router;
