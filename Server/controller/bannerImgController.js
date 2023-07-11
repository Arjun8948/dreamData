import mongoose from "mongoose";
import bannerModel from "../model/bannerModel.js";
import error from "../error.js";

export const addBannerImg = async (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");

  try {
    const ban = await bannerModel.create({
      imgUrl: url + "/upload/" + req.file.filename,
    });
    res.status(200).json({ massage: "banner upload scucessfully !" });
  } catch (err) {
    next(err);
  }
};

export const getBannerImg = async (req, res, next) => {
  const allBanner = await bannerModel.find({});
  if (!allBanner) {
    return next(error(404, "data not found !"));
  }
  res.status(200).json(allBanner);
};
export const deleteBannerImg = async (req, res, next) => {
  const deleteId = req.query.id;
  const data = await bannerModel.findByIdAndDelete({ _id: deleteId });

  if (!data) {
    return next(error(404, "data not found !"));
  }

  res.status(200).json({ massage: "banner deleted suceessfully !" });
};
