import mongoose from "mongoose";
import error from "../error.js";
import reviewModel from "../model/reviewModel.js";

export const addReview = async (req, res, next) => {
  console.log(req.body, req.file);
  if (
    !req.body.name ||
    !req.body.massage ||
    !req.body.designation ||
    !req.file ||
    !req.body.rating
  ) {
    return next(error(400, "all fileds required !"));
  }

  const url = req.protocol + "://" + req.get("host");
  try {
    const newReview = await reviewModel.create({
      profileLogo: url + "/upload/" + req.file.filename,
      ...req.body,
    });
    res.status(200).json({ massage: "Review sucessfully upload!" });
  } catch (err) {
    next(err);
  }
};
export const getReview = async (req, res, next) => {
  try {
    const reviewData = await reviewModel.find({}).sort({ rating: -1 });
    if (!reviewData) return next(error(404, "data not found!"));
    res.status(200).json(reviewData);
  } catch (err) {
    next(err);
  }
};

export const deleteReview = async (req, res, next) => {
  try {
    await reviewModel.findByIdAndDelete({ _id: req.query.id });
    res.status(200).json({ massage: "Review sucessfully deleted !" });
  } catch (err) {
    next(err);
  }
};
