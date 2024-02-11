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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.donationService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createDonation = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.donation.create({ data });
    return result;
});
const getAllDonation = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.donation.findMany({
        where: {
            category: {
                contains: searchTerm,
            },
        },
    });
    return result;
});
const getSingleDonation = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.donation.findUnique({
        where: {
            id,
        },
    });
    return result;
});
const updateSingleDonation = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.donation.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteSingleDonation = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const donationHistory = yield prisma_1.default.donationDone.findMany({
        where: {
            donationId: id,
        },
    });
    if (donationHistory) {
        yield prisma_1.default.donationDone.deleteMany({
            where: {
                donationId: id,
            },
        });
    }
    const result = yield prisma_1.default.donation.delete({
        where: {
            id,
        },
    });
    return result;
});
const donationExecute = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.donationDone.create({
        data,
    });
    return result;
});
const getAllDonationExecute = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.donationDone.findMany({
        include: {
            userInfo: true,
            donationInfo: true,
        },
    });
    return result;
});
const getSingleUserDonationExecute = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('id', id);
    const result = yield prisma_1.default.donationDone.findMany({
        where: {
            userId: id,
        },
        include: {
            userInfo: true,
            donationInfo: true,
        },
    });
    return result;
});
const donationCalculations = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.donationDone.findMany({
        include: {
            userInfo: true,
            donationInfo: true,
        },
    });
    // category
    // food, education, clothing, health, religion
    let totalDonationAmount = 0;
    let foodAmount = 0;
    let educationAmount = 0;
    let clothingAmount = 0;
    let healthAmount = 0;
    let religionAmount = 0;
    result.forEach(donation => {
        var _a, _b, _c, _d, _e;
        totalDonationAmount += donation.amount;
        if (((_a = donation === null || donation === void 0 ? void 0 : donation.donationInfo) === null || _a === void 0 ? void 0 : _a.category) === 'food') {
            foodAmount += donation.amount;
        }
        if (((_b = donation === null || donation === void 0 ? void 0 : donation.donationInfo) === null || _b === void 0 ? void 0 : _b.category) === 'education') {
            educationAmount += donation.amount;
        }
        if (((_c = donation === null || donation === void 0 ? void 0 : donation.donationInfo) === null || _c === void 0 ? void 0 : _c.category) === 'clothing') {
            clothingAmount += donation.amount;
        }
        if (((_d = donation === null || donation === void 0 ? void 0 : donation.donationInfo) === null || _d === void 0 ? void 0 : _d.category) === 'health') {
            healthAmount += donation.amount;
        }
        if (((_e = donation === null || donation === void 0 ? void 0 : donation.donationInfo) === null || _e === void 0 ? void 0 : _e.category) === 'religion') {
            religionAmount += donation.amount;
        }
    });
    const totalDonation = result.length;
    const output = {
        totalDonation,
        totalDonationAmount,
        foodAmount,
        educationAmount,
        clothingAmount,
        healthAmount,
        religionAmount,
    };
    return output;
});
exports.donationService = {
    createDonation,
    getAllDonation,
    getSingleDonation,
    updateSingleDonation,
    deleteSingleDonation,
    // user give donations
    donationExecute,
    getAllDonationExecute,
    getSingleUserDonationExecute,
    donationCalculations,
};
