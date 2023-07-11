import mongoose from "mongoose";
import error from "../../error.js";
import classLinkModel from "../../model/Class/classLinkModel.js";

export const addClassLink = async (req, res, next) => {
    const {
        chapterName,
        subChapter,
        batch,
        subject,
        classLink,
        date
    } = req.body;
    console.log(req.body);
    if (!chapterName || !subChapter || !batch || !subject || !classLink || !date) {
        return next(error(400, "All filed is required!"))
    }
    try {

        const checkLink = await classLinkModel.findOne({batch: batch});
        if (checkLink) {
            const updateLink = await classLinkModel.findOneAndReplace({
                batch: req.body.batch
            }, {
                ...req.body
            }, {new: true})
            res.status(200).json({updateLink, massage: 'class link upload sucessfully'})
        } else {

            const newClassLink = await classLinkModel.create({
                ...req.body
            })
            res.status(200).json({newClassLink, massage: "class link upload sucessfully"})
        }


    } catch (err) {
        next(err)
    }
}


export const getClassLink = async (req, res, next) => {
    const instructorId = req.query.instructorId;
    const subject = req.query.subject;
    const batch = req.query.batch;
    console.log(req.body, req.query);
    try {
        if (instructorId && subject) {
            const classLink = await classLinkModel.find({ $and:[{ instructorId: instructorId }, {subject: subject}]
            }).sort({date: -1});
            if (! classLink) 
                return next(error(404, "Class Link not found!"))
            res.status(200).json(classLink)
        } else {
            const classLink = await classLinkModel.find({batch})
            res.status(200).json(classLink)
        }
    } catch (err) {
        next(err)
    }
}



