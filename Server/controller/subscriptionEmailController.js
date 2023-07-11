import mongoose from "mongoose";
import subscribeEmailModel from "../model/subscriptionEmailModel.js";
import error from "../error.js";

export const sendSubscriptionEmail = async (req, res, next) => {
  console.log(req.body);
  try {
    const checkEmail = await subscribeEmailModel.findOne({
      email: req.body.email,
    });
    if (checkEmail) {
      return next(error(409, "You have already subscribed"));
    } else {
      await subscribeEmailModel.create({
        ...req.body,
      });
      res.status(200).json({
        status: 200,
        massage: "Sucessfully subscription completed",
      });
    }
  } catch (err) {
    next(err);
  }
};

export const getSubscriptionEmail = async (req, res, next) => {
  try {
    const checkEmailData = await subscribeEmailModel.findOne({});
    if (!checkEmailData) {
      return next(error(404, "data not found"));
    } else {
      const emailData = await subscribeEmailModel.findOne({});
      res.status(200).json(emailData);
    }
  } catch (err) {
    next(err);
  }
};

export const deleteSubscriptionEmail = async (req, res, next) => {
  try {
    await subscribeEmailModel.findByIdAndDelete({ _id: req.body.id });
    res.status(200).json({ masssge: "Sucessfully removed" });
  } catch (err) {
    next(err);
  }
};
