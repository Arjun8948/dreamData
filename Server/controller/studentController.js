import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import studentModel from "../model/studentModel.js";
import error from "../error.js";
import sendGmail from "../model/mail/studentRegistetion.js";

export const studentSignup = async (req, res, next) => {
  try {
    const checkEmail = await studentModel.findOne({ email: req.body.email });

    if (checkEmail) {
      return next(error(409, "Your Email Already Ragisterted"));
    } else {
      const securePassword = await bcrypt.hash(req.body.password, 10);
      const student = await studentModel.create({
        ...req.body,
        password: securePassword,
      });
      const token = jwt.sign({ id: student._id }, process.env.ScrateKey);
      res
        .status(200)
        .json({ token, massage: "Registration Successfully Completed" });

      sendGmail(`${student.firstName + " " + student.lastName}`, student.email);
    }
  } catch (err) {
    next(err);
  }
};

export const studentLogin = async (req, res, next) => {
  try {
    const checkUser = await studentModel.findOne({ email: req.body.email });
    if (!checkUser) return next(error(400, "Your account does't exits !"));
    const checkPassword = await bcrypt.compare(
      req.body.password,
      checkUser.password
    );
    if (!checkPassword) return next(error(401, "email or password invalid"));
    const token = jwt.sign({ id: checkUser._id }, process.env.ScrateKey);
    const { password: password, ...data } = checkUser._doc;
    res.status(200).json({ token, data: data, massage: "loging sucessfully " });
  } catch (err) {
    next(err);
  }
};

export const UpdateStudent = async (req, res, next) => {
  console.log(req.body);
  try {
    const updateUser = await studentModel.findByIdAndUpdate(
      req.body.id,
      {
        $set: {
          enrollId: req.body.enrollId,
          boardName: req.body.boardName,
          className: req.body.className,
          price: req.body.price,
          enroll: true,
        },
      },
      { new: true },
      { upsert: true }
    );
    res.send({ massage: "Student deteils Updata Successfully" });
  } catch (err) {
    next(err);
  }
};

export const getStudent = async (req, res, next) => {
  const id = req.query.id;
  const batch = req.query.batch;
  console.log(batch);
  try {
    if (id) {
      const student = await studentModel.find({ _id: id });
      if (!student) return next(error(404, "data not found"));
      res.status(200).json(student);
    } else if (batch) {
      const student = await studentModel.find({ batch });
      if (!student) return next(error(404, "data not found"));
      res.status(200).json(student);
    } else {
      const student = await studentModel.find({});
      if (!student) return next(error(404, "data not found"));
      res.status(200).json(student);
    }
  } catch (err) {
    next(err);
  }
};

export const deleteStudent = async (req, res, next) => {
  const id = req.query.id;
  try {
    const deleteStudent = await studentModel.findByIdAndDelete(id);
    if (!deleteStudent) return next(error(404, "data not found"));
    res.status(200).json({ massage: "Student deleted successFully" });
  } catch (err) {
    next(err);
  }
};

export const verify = (req, res, next) => {
  const authheader = req.headers.authorization.split(" ")[1];

  if (!authheader) {
    return next(error(404, "You are not authenticated!"));
  } else {
    const result = jwt.verify(authheader, process.env.ScrateKey);
    if (!result) return next(error(404, "Please login your account"));
    res.status(200).json({ token: result.iat, massage: "user authenticated" });
  }
};

export const adminupdateStudent = async (req, res, next) => {
  console.log(req.body);
  const id = req.body.id;
  try {
    const updateStudent = await studentModel.findByIdAndUpdate(
      id,
      { $set: { ...req.body } },
      { new: true },
      { upsert: true }
    );
    res.status(200).json({ massage: "Student deteils Updata Successfully" });
  } catch (err) {
    next(err);
  }
};

export const getAllbatch = async (req, res, next) => {
  try {
    const allBatch = await studentModel.distinct("batch");
    res.status(200).json(allBatch);
  } catch (err) {
    next(err);
  }
};

export const forgotPassword = async (req, res, next) => {
  const email = req.body.email;
  const forgotPassword = req.body.password;
  const id = req.body.verifyId;
  console.log(req.body);
  try {
    if (!forgotPassword) {
      const findStudent = await studentModel.findOne({ email });
      if (!findStudent) return next(error(404, "Your account does't exits"));
      res
        .status(200)
        .json({
          id: findStudent._id,
          massage: "Email verification sucessfully",
        });
    } else {
      const hashPassword = await bcrypt.hash(forgotPassword, 10);
      const updated = await studentModel.findByIdAndUpdate(
        id,
        {
          $set: {
            password: hashPassword,
          },
        },
        { new: true },
        { upsert: true }
      );
      res.status(200).json({ massage: "Password reset succesfully" });
    }
  } catch (err) {
    next(err);
  }
};

export const createBatch = async (req, res, next) => {
  const { boardName, className, batch, limit, skip } = req.body;
  const createBatch = await studentModel
    .updateMany({ $and: [{ boardName }, { className }] }, { $set: { batch } })
    .limit(limit);
  console.log(createBatch);
  res.status(200).json({ massage: "batch successfully created" });
};

