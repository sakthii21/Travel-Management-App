import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  //braintreeTokenController,
  createPackage,
  deletePackage,
  getPackageData,
  getPackages,
  updatePackage,
} from "../controllers/package.controller.js";

const router = express.Router();

//create package
router.post("/create-package", requireSignIn,  createPackage);

//update package by id
router.post("/update-package/:id", requireSignIn,  updatePackage);

//delete package by id
router.delete("/delete-package/:id", requireSignIn, deletePackage);

//get all packages
router.get("/get-packages", getPackages);

//get single package data by id
router.get("/get-package-data/:id", getPackageData);

//payments routes
//token
//router.get("/braintree/token", braintreeTokenController);

export default router;
