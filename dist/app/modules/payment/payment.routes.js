"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const payment_controller_1 = require("./payment.controller");
const router = express_1.default.Router();
router.get('/', 
//   auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
payment_controller_1.PaymentController.getAllFromDB);
router.get('/:id', 
//   auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
payment_controller_1.PaymentController.getByIdFromDB);
// router.get(
//   '/:id',
// //   auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
//   PaymentController.getSingleUserPayment,
// )
router.post('/init', payment_controller_1.PaymentController.initPayment);
router.get('/webhook', payment_controller_1.PaymentController.webhook);
exports.paymentRoutes = router;
