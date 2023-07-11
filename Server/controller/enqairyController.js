import mongoose from "mongoose";
import enquairyModel from "../model/enquairyModel.js";
import error from "../error.js";

export const newEnquairyPost = async (req, res, next) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.number ||
    !req.body.massage
  ) {
    return next(error(400, "enquiry invalid !"));
  }
  try {
    const checkEnquary = await enquairyModel.findOne({ email: req.body.email });
    if (checkEnquary)
      return next(error(409, "Your Request Already Submitted !"));

    const newEnquairy = await enquairyModel.create({
      ...req.body,
    });
    res
      .status(200)
      .json({ status: 200, massage: "Your Request Sucessfully Submitted !" });
  } catch (err) {
    next(err);
  }
};

export const getEnquairy = async (req, res, next) => {
  try {
    const enquairyData = await enquairyModel.find({}).sort({ createdAt: -1 });
    if (!enquairyData) return next(error(404, "Not found data"));
    res.status(200).json(enquairyData);
  } catch (err) {
    next(err);
  }
};

export const updateEnquairy = async (req, res, next) => {
  try {
    const updateStatusData = await enquairyModel.findByIdAndUpdate(
      req.body._id,
      { status: "complete" }
    );
    if (!updateStatusData) return next(error(404, "Not found data"));
    res.status(200).json({ massage: "enquairy completed sucessfully" });
  } catch (err) {
    next(err);
  }
};

export const deleteEnquairy = async (req, res, next) => {
  try {
    const deleteEnquairy = await enquairyModel.findByIdAndDelete(req.params.id);
    if (!deleteEnquairy) return next(error(404, "Not found data"));
    res.status(200).json({ massage: "enquairy sucessfully  deleted" });
  } catch (error) {
    next(err);
  }
};
