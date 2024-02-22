"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const users_1 = require("../../../enums/users");
const router = express_1.default.Router();
router.post('/auth/signup', user_controller_1.userController.createUser);
router.patch('/auth/update', (0, auth_1.default)(users_1.ENUM_USER_ROLE.ADMIN), user_controller_1.userController.updateUser);
router.post('/auth/signin', user_controller_1.userController.loginUser);
router.get('/auth/get-user', user_controller_1.userController.getSingleUserById);
router.get('/auth/all-user', (0, auth_1.default)(users_1.ENUM_USER_ROLE.ADMIN), user_controller_1.userController.getAllUser);
exports.userRoutes = router;
