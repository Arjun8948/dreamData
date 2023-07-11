import mongoose from "mongoose";
import error from "../error.js";
import featureModel from "../model/featureModel.js";

export const addFeature = async (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  console.log(req.file);
  try {
    const image = url + "/upload/" + req.file.filename;
    const ban = await featureModel.create({
      featureName: req.body.featureName,
      imgUrl: image,
    });
    console.log(ban);
    res.status(200).json({ massage: "feature scucessfully upload!" });
  } catch (err) {
    next(err);
  }
};

export const getFeature = async (req, res, next) => {
  const allFeature = await featureModel.find({});
  if (!allFeature) {
    return next(error(404, "data not found !"));
  }
  res.status(200).json(allFeature);
};

export const deleteFeature = async (req, res, next) => {
  const deleteId = req.query.id;
  const data = await featureModel.findByIdAndDelete({ _id: deleteId });

  if (!data) {
    return next(error(404, "data not found !"));
  }

  res.status(200).json({ massage: "feature deleted suceessfully !" });
};
