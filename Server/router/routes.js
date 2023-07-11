import express from "express";
import multer from "multer";
import path from "path";
import * as uuidv4 from "uuid";
const DIR = "./upload/";
import {
  deleteEnquairy,
  getEnquairy,
  newEnquairyPost,
  updateEnquairy,
} from "../controller/enqairyController.js";
import {
  deleteSubscriptionEmail,
  getSubscriptionEmail,
  sendSubscriptionEmail,
} from "../controller/subscriptionEmailController.js";
import {
  UpdateStudent,
  adminupdateStudent,
  createBatch,
  deleteStudent,
  forgotPassword,
  getAllbatch,
  getStudent,
  studentLogin,
  studentSignup,
  verify,
} from "../controller/studentController.js";

import {
  addCourse,
  deleteCourse,
  getCourse,
  updateCourse,
} from "../controller/addCourseController.js";
import {
  addClass,
  deleteClass,
  getclass,
  updateClass,
} from "../controller/addClassController.js";
import {
  addBannerImg,
  deleteBannerImg,
  getBannerImg,
} from "../controller/bannerImgController.js";
import {
  addReview,
  deleteReview,
  getReview,
} from "../controller/reviewController.js";
import {
  addFeature,
  deleteFeature,
  getFeature,
} from "../controller/featureController.js";

import {
  decrementPresent,
  incrementPresent,
  instructorForgetPassword,
  instructorLogin,
  instructorSignup,
  instructordelete,
  instructorget,
  instructorupdate,
} from "../model/instructorController.js";

import {
  addVideo,
  deleteVideo,
  getVideo,
} from "../controller/video/videoController.js";
import {
  addNotes,
  deleteNotes,
  getNotes,
} from "../controller/notes/notesController.js";
import {
  addAssignment,
  deleteAssignment,
  getAssignment,
} from "../controller/assignment/assignmentController.js";
import {
  addClassLink,
  getClassLink,
} from "../controller/classLink/classLinkController.js";
import {
  adminDelete,
  adminForgot,
  adminGet,
  adminLogin,
  adminSignup,
  adminUpdate,
} from "../controller/admin/adminController.js";
import {
  addDashboardBanner,
  deleteDashboardBanner,
  getDashboardBanner,
} from "../controller/dashboardBannerController.js";
import {
  addContactus,
  deleteContactus,
  getContactus,
  updateContactus,
} from "../controller/contactUsController.js";

import {
  addBook,
  deleteBook,
  getBook,
  updateBook,
} from "../controller/books/bookController.js";
import {
  addTest,
  deleteTest,
  getTest,
  updateTest,
} from "../controller/test/testController.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + fileName);
  },
});
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "application/pdf" ||
      file.mimetype == "file/pdf"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

const router = express.Router();

/* Student enquairy route section comp'ate */
router.post("/enquairy", newEnquairyPost);
router.get("/enquairy/alldata", getEnquairy);
router.put("/enquairy", updateEnquairy);
router.delete("/enquairy/:id", deleteEnquairy);

/* Student email subscription section  complete*/
router.post("/subscription/email", sendSubscriptionEmail);
// Staff pannel
router.get("/subscription/getallemail", getSubscriptionEmail);
router.delete("/subscription/deleteemail", deleteSubscriptionEmail);

/*open ai section complete*/

/* Student  section */
router.post("/student/signup", studentSignup);
router.post("/student/login", studentLogin);
router.get("/student", getStudent);
router.put("/student/update", UpdateStudent);
router.delete("/student/dalete", deleteStudent);
router.post("/verify", verify);
router.put("/student/updateadmin", adminupdateStudent);
router.get("/student/bacth", getAllbatch);
router.put("/student/createBatch", createBatch);

router.put("/forgotPassword", forgotPassword);

/*review for expart  complate*/

router.post("/addreview", upload.single("profileImg"), addReview);
router.get("/getreview", getReview);
router.delete("/review", deleteReview);

// ============================================================
/*feature for dreamschool complate*/
router.post("/addfeature", upload.single("featureImg"), addFeature);
router.get("/getfeature", getFeature);
router.delete("/deletefeature", deleteFeature);

/*==============================completed======================*/
//main applicatian ads banner
router.post("/banner", upload.single("banner"), addBannerImg);
router.get("/getbanner/all", getBannerImg);
router.delete("/bannerimg", deleteBannerImg);

/*add course for board class*/

router.post(
  "/addcourse",
  upload.fields([
    { name: "imageUrl", maxCount: 1 },
    { name: "boardUrl", maxCount: 1 },
  ]),
  addCourse
);
router.get("/getcourse", getCourse);
router.put("/updatecourse", updateCourse);
router.delete("/deletecourse", deleteCourse);
/*enroll and class course  from student */

router.post(
  "/addclass",
  upload.fields([
    { name: "imageUrl", maxCount: 1 },
    { name: "boardUrl", maxCount: 1 },
  ]),
  addClass
);
router.get("/getclass", getclass);
router.put("/updateclass", updateClass);
router.delete("/deleteclass", deleteClass);

// instructor route
router.post(
  "/instractor/signup",
  upload.single("profileImg"),
  instructorSignup
);
router.post("/instractor/login", instructorLogin);
router.put("/instractor/update", upload.single("profileImg"), instructorupdate);
router.delete("/instractor/delete", instructordelete);
router.get("/instractor", instructorget);
router.put("/addinstructorpresent", incrementPresent);
router.put("/addinstructorabsent", decrementPresent);

router.put("/instractor/forget", instructorForgetPassword);
//student recorded video route complete

router.post("/video/add", addVideo);
router.get("/video", getVideo);
router.delete("/video/delete", deleteVideo);

// student class notes routes

router.post("/notes/add", upload.single("notes"), addNotes);
router.get("/notes", getNotes);
router.delete("/notes/delete", deleteNotes);

// student assignment
router.post("/assignment/add", upload.single("assignment"), addAssignment);
router.get("/assignment", getAssignment);
router.delete("/assignment/delete", deleteAssignment);

// dashboard banner image
//dashboard applicatian ads banner
router.post(
  "/dashboardbanner",
  upload.single("dashboardBanner"),
  addDashboardBanner
);
router.get("/dashboardbanner/all", getDashboardBanner);
router.delete("/dashboardbanner", deleteDashboardBanner);
/*====================================================*/

// addClassLink
router.post("/classlink/add", addClassLink);
// router.put("/classlink/update",updateClassLink)
router.get("/classlink/get", getClassLink);

// admin route
router.post("/admin/signup", upload.single("adminImg"), adminSignup);
router.post("/admin/login", adminLogin);
router.get("/getadmin", adminGet);
router.put("/admin/update", upload.single("adminImg"), adminUpdate);
router.delete("/admin/delete", adminDelete);
router.put("/admin/forgot", adminForgot);

// about page contect us

router.post("/addContact", addContactus);
router.get("/getContact", getContactus);
router.put("/updateContact", updateContactus);
router.delete("/deleteContact", deleteContactus);

//  test route
router.post("/addTest", addTest);
router.get("/getTest", getTest);
router.put("/updateTest", updateTest);
router.delete("/deleteTest", deleteTest);

// books  route
router.post("/addBooks", upload.single("books"), addBook);
router.get("/getBooks", getBook);
router.put("/updateBooks", upload.single("books"), updateBook);
router.delete("/deleteBooks", deleteBook);

export default router;
