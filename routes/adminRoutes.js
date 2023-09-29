const express = require('express');
const authMiddelware = require('../middlewares/authMiddleware');
const {
  getDonorsListController,
  getHospitalListController,
  getOrgListController,
  deleteDonorController,
} = require('../controllers/adminController');
const adminMiddleware = require('../middlewares/adminMiddleware');

//router object
const router = express.Router();

//Routes

//GET || DONOR LIST
router.get(
  '/donor-list',
  authMiddelware,
  adminMiddleware,
  getDonorsListController
);
//GET || HOSPITAL LIST
router.get(
  '/hospital-list',
  authMiddelware,
  adminMiddleware,
  getHospitalListController
);
//GET || ORG LIST
router.get('/org-list', authMiddelware, adminMiddleware, getOrgListController);
// ==========================

// DELETE DONOR || GET
router.delete(
  '/delete-donor/:id',
  authMiddelware,
  adminMiddleware,
  deleteDonorController
);

//EXPORT
module.exports = router;
