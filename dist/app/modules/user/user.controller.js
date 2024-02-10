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
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {}
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p]
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]]
      }
    return t
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.userController = void 0
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'))
const http_status_1 = __importDefault(require('http-status'))
const sendResponse_1 = __importDefault(require('../../../shared/sendResponse'))
const user_service_1 = require('./user.service')
const config_1 = __importDefault(require('../../../config'))
const bcrypt_1 = __importDefault(require('bcrypt'))
const createUser = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body
    const hashPassword = yield bcrypt_1.default.hash(
      payload.password,
      Number(config_1.default.bycrypt_salt_rounds),
    )
    payload.password = hashPassword
    const result = yield user_service_1.userService.createUser(payload)
    ;(0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'User created successfully!',
      data: result,
    })
  }),
)
const loginUser = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const loginData = __rest(req.body, [])
    const result = yield user_service_1.userService.loginUser(loginData)
    const { refreshToken, accessToken } = result
    const cookieOptions = {
      secure: config_1.default.env === 'production',
      httpOnly: true,
    }
    res.cookie('refreshToken', refreshToken, cookieOptions)
    ;(0, sendResponse_1.default)(res, {
      statusCode: 200,
      success: true,
      message: 'User logged In successfully !',
      data: { accessToken },
    })
  }),
)
const getSingleUserById = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id
    const result = yield user_service_1.userService.getSingleUserById(id)
    ;(0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'User Get successfully!',
      data: result,
    })
  }),
)
exports.userController = {
  createUser,
  loginUser,
  getSingleUserById,
}
