'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.donationController = void 0
const http_status_1 = __importDefault(require('http-status'))
const sendResponse_1 = __importDefault(require('../../../shared/sendResponse'))
const donation_service_1 = require('./donation.service')
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'))
const createDonation = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body
    const result = yield donation_service_1.donationService.createDonation(data)
    ;(0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Donation created successfully!',
      data: result,
    })
  }),
)
const getAllDonation = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = req.query
    const result =
      yield donation_service_1.donationService.getAllDonation(searchTerm)
    ;(0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'All Donation Retrieved successfully!',
      data: result,
    })
  }),
)
const getSingleDonation = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id
    const result =
      yield donation_service_1.donationService.getSingleDonation(id)
    ;(0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Donation Retrieved successfully!',
      data: result,
    })
  }),
)
const updateSingleDonation = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id
    const payload = req.body
    const result =
      yield donation_service_1.donationService.updateSingleDonation(id, payload)
    ;(0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Donation updated successfully!',
      data: result,
    })
  }),
)
const donationExecute = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body
    const result =
      yield donation_service_1.donationService.donationExecute(data)
    ;(0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'You successfully Donate!',
      data: result,
    })
  }),
)
const getAllDonationExecute = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result =
      yield donation_service_1.donationService.getAllDonationExecute()
    ;(0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'All Donation retrieved successfully!',
      data: result,
    })
  }),
)
const getSingleUserDonationExecute = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id
    const result =
      yield donation_service_1.donationService.getSingleUserDonationExecute(id)
    ;(0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'All Donation retrieved successfully!',
      data: result,
    })
  }),
)
const donationCalculations = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result =
      yield donation_service_1.donationService.donationCalculations()
    ;(0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'All Donation Calculations retrieved successfully!',
      data: result,
    })
  }),
)
exports.donationController = {
  createDonation,
  getAllDonation,
  getSingleDonation,
  updateSingleDonation,
  donationExecute,
  getAllDonationExecute,
  getSingleUserDonationExecute,
  donationCalculations,
}
