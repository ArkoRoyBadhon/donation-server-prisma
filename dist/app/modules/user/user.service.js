"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const exist = yield prisma_1.default.user.findUnique({
        where: {
            email: data === null || data === void 0 ? void 0 : data.email,
        },
    });
    if (exist) {
        throw new ApiError_1.default(http_status_1.default.NOT_IMPLEMENTED, 'User already exists');
    }
    const result = yield prisma_1.default.user.create({
        data,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password } = result, others = __rest(result, ["password"]);
    return others;
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isUserExist = yield prisma_1.default.user.findUnique({
        where: {
            email,
        },
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    if (!isUserExist.password) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Google user');
    }
    if (isUserExist.password &&
        !(yield bcrypt_1.default.compare(password, isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect');
    }
    const { id: userId, role } = isUserExist;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ userId, role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ userId, role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getSingleUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma_1.default.user.findUnique({
            where: {
                id: id,
            },
        });
        return result;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.SERVICE_UNAVAILABLE, 'Something went wrong');
    }
});
exports.userService = {
    createUser,
    loginUser,
    getSingleUserById,
};
