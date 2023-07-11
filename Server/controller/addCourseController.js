import mongoose from "mongoose";
import error from "../error.js";
import courseModel from "../model/courseModel .js";
import MailMessage from "nodemailer/lib/mailer/mail-message.js";

export const addCourse = async (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  console.log(req.file);
  // console.log(req.body,req.files.imageUrl)
  const { ...imageUrl } = req.files.imageUrl[0];
  const { ...boardUrl } = req.files.boardUrl[0];

  try {
    const newPost = await courseModel.create({
      boardUrl: url + "/upload/" + boardUrl.filename,
      imageUrl: url + "/upload/" + imageUrl.filename,
      boardName: req.body.boardName,
      price: req.body.price,
      start: req.body.start,
      subject: req.body.subject,
      status: req.body.status,
    });

    res
      .status(200)
      .json({ newPost, massage: "Board course  upload successfully" });
  } catch (err) {
    next(err);
  }
};

export const updateCourse = async (req, res, next) => {
  const id = req.body.id;
  try {
    const update = await courseModel.findByIdAndUpdate(
      { _id: id },
      {
        ...req.body,
      },
      { new: true }
    );
    res.status(200).json({ update, massage: "course updated sucessfully !" });
  } catch (err) {
    next(err);
  }
};

export const getCourse = async (req, res, next) => {
  try {
    const allCourse = await courseModel.find({});
    if (!allCourse) return next(error(404, "data not found !"));
    res.status(200).json(allCourse);
  } catch (err) {
    next(err);
  }
};
export const deleteCourse = async (req, res, next) => {
  try {
    const data = await courseModel.findByIdAndDelete({ _id: req.query.id });
    if (!data) return next(error(404, "course not found"));
    res.status(200).json({ massage: "course deleted scuessfully" });
  } catch (err) {
    next(err);
  }
};
