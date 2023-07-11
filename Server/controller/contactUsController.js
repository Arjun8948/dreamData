import mongoose from "mongoose";
import error from "../error.js";
import contectusModel from "../model/contectus/contectusModel.js";

export const addContactus = async (req, res, next) => {
  console.log(req.body);
  const { name, email, massage } = req.body;
  try {
    if (!name || !email || !massage) {
      return next(error(400, "All field required"));
    } else {
      const checkEmail = await contectusModel.findOne({ email });
      if (checkEmail)
        return next(error(409, "Your requrest already ragisterd"));
      const newContact = await contectusModel.create({
        ...req.body,
      });
      console.log(newContact);

      res.status(200).json({ massage: "Your request successfully submmited" });
    }
  } catch (err) {
    next(err);
  }
};

export const getContactus = async (req, res, next) => {
  try {
    const data = await contectusModel.find({ createdAt: 1 });
    if (!data) return next(error(404, "data not found"));
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

export const updateContactus = async (req, res, next) => {
  const id = req.body.id;
  try {
    const update = await contectusModel.findByIdAndUpdate(
      id,
      {
        $set: { status: "sucess" },
      },
      { new: true }
    );
    if (!update) return next(error(404, "data not found"));
    res.status(200).json({ massage: "Update request success" });
  } catch (err) {
    next(err);
  }
};

export const deleteContactus = async (req, res, next) => {
  const id = req.query.id;
  try {
    const detete = await contectusModel.findByIdAndDelete(id);
    if (!detete) return next(error(404, "data not found"));
    res
      .status(200)
      .json({ massage: "contact us  request succsefully deleted " });
  } catch (err) {
    next(err);
  }
};
