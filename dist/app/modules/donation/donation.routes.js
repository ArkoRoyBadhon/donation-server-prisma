"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.donationRoutes = void 0;
const express_1 = __importDefault(require("express"));
const donation_controller_1 = require("./donation.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const users_1 = require("../../../enums/users");
const router = express_1.default.Router();
//donation card
router.post('/donation/create', (0, auth_1.default)(users_1.ENUM_USER_ROLE.ADMIN), donation_controller_1.donationController.createDonation);
router.get('/donation/get-all', donation_controller_1.donationController.getAllDonation);
router.get('/donation/get-single/:id', donation_controller_1.donationController.getSingleDonation);
router.patch('/donation/update/:id', (0, auth_1.default)(users_1.ENUM_USER_ROLE.ADMIN), donation_controller_1.donationController.updateSingleDonation);
router.delete('/donation/delete/:id', (0, auth_1.default)(users_1.ENUM_USER_ROLE.ADMIN), donation_controller_1.donationController.deleteSingleDonation);
// user donation
router.post('/donation/user-donate', 
// authPermission(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
donation_controller_1.donationController.donationExecute);
router.get('/donation/user-donate', (0, auth_1.default)(users_1.ENUM_USER_ROLE.USER, users_1.ENUM_USER_ROLE.ADMIN), donation_controller_1.donationController.getAllDonationExecute);
router.get('/donation/single-user-donate', donation_controller_1.donationController.getSingleUserDonationExecute);
router.get('/donation/calculation', (0, auth_1.default)(users_1.ENUM_USER_ROLE.ADMIN), donation_controller_1.donationController.donationCalculations);
exports.donationRoutes = router;
