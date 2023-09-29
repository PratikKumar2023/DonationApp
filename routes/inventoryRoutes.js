const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const {
  createInventoryController,
  getInventoryController,
  getDonorsController,
  getHospitalController,
  getOrganisationController,
  getOrganisationForHospitalController,
  getInventoryHospitalController,
  getRecentInventoryController,
} = require('../controllers/inventoryController');

const router = express.Router();

//routes

//ADD inventory || POST
router.post('/create-inventory', authMiddleware, createInventoryController);

//GET records
router.get('/get-inventory', authMiddleware, getInventoryController);

//GET donor records
router.get('/get-donors', authMiddleware, getDonorsController);

//GET hospital records
router.get('/get-hospitals', authMiddleware, getHospitalController);

//GET HOSPITAL BLOOD RECORDS
router.post(
  '/get-inventory-hospital',
  authMiddleware,
  getInventoryHospitalController
);

//GET RECENT BLOOD RECORDS
router.get(
  '/get-recent-inventory',
  authMiddleware,
  getRecentInventoryController
);

//GET organisation records
router.get('/get-organisation', authMiddleware, getOrganisationController);
router.get(
  '/get-organisation-for-hospital',
  authMiddleware,
  getOrganisationForHospitalController
);

module.exports = router;
