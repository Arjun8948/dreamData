import mongoose from "mongoose";
import error from "../error.js";
import classModel from "../model/classModel.js";

export const addClass = async (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  console.log(req.body, req.files);
  // console.log(req.body,req.files.imageUrl)
  const { ...imageUrl } = req.files.imageUrl[0];
  const { ...boardUrl } = req.files.boardUrl[0];
  try {
    const newClass = await classModel.create({
      boardUrl: url + "/upload/" + boardUrl.filename,
      imageUrl: url + "/upload/" + imageUrl.filename,
      boardName: req.body.boardName,
      className: req.body.className,
      price: req.body.price,
      start: req.body.start,
      subject: req.body.subject,
      status: req.body.status,
    });

    res
      .status(200)
      .json({ newClass, massage: "board class  upload successdully" });
  } catch (err) {
    next(err);
  }
};

export const updateClass = async (req, res, next) => {
  const id = req.body.id;
  try {
    const update = await classModel.findByIdAndUpdate(
      { _id: id },
      {
        ...req.body,
      },
      { new: true }
    );
    res
      .status(200)
      .json({ data: update, massage: "course updated sucessfully !" });
  } catch (err) {
    next(err);
  }
};

export const getclass = async (req, res, next) => {
  const sort = req.query.boardName;
  console.log(sort);
  try {
    if (sort) {
      const allCourse = await classModel.find({ boardName: sort });
      if (!allCourse) return next(error(404, "data not found !"));
      res.status(200).json(allCourse);
    } else {
      const allCourse = await classModel.find({});
      if (!allCourse) return next(error(404, "data not found !"));
      res.status(200).json(allCourse);
    }
  } catch (err) {
    next(err);
  }
};

export const deleteClass = async (req, res, next) => {
  try {
    const data = await classModel.findByIdAndDelete({ _id: req.query.id });
    if (!data) return next(error(404, "course not found"));
    res.status(200).json({ massage: "course deleted scuessfully" });
  } catch (err) {
    next(err);
  }
};
