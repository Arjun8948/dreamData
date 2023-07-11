import mongoose from "mongoose";
import error from "../error.js";
import dashboardBannerModel from "../model/dashboardBannerModel.js";

export const addDashboardBanner = async (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");

  try {
    const ban = await dashboardBannerModel.create({
      dashboardBanner: url + "/upload/" + req.file.filename,
    });
    res.status(200).json({ massage: "dashboard banner upload scucessfully !" });
  } catch (err) {
    next(err);
  }
};
export const getDashboardBanner = async (req, res, next) => {
  const allBanner = await dashboardBannerModel.find({});
  if (!allBanner) {
    return next(error(404, "data not found !"));
  }
  res.status(200).json(allBanner);
};
export const deleteDashboardBanner = async (req, res, next) => {
  const deleteId = req.query.id;
  const data = await dashboardBannerModel.findByIdAndDelete({ _id: deleteId });

  if (!data) {
    return next(error(404, "data not found !"));
  }

  res.status(200).json({ massage: "dashboard banner deleted suceessfully !" });
};
