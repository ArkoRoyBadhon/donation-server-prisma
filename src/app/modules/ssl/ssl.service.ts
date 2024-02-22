/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import config from '../../../config'
import axios from 'axios'

const initPayment = async (payload: any) => {
  try {
    const data = {
      store_id: config.ssl.store_id,
      store_passwd: config.ssl.store_passwd,
      total_amount: payload.total_amount,
      // total_amount: 100,
      currency: 'BDT',
      tran_id: payload.tran_id, // use unique tran_id for each api call
      // tran_id: "SSL", // use unique tran_id for each api call
      success_url: `${process.env.LIVE_LINK}/payment?status=success`,
      fail_url: `${process.env.LIVE_LINK}/payment?status=fail`,
      cancel_url: `${process.env.LIVE_LINK}/payment?status=cancel`,
      ipn_url: 'http://localhost:3030/ipn',
      shipping_method: 'N/A',
      product_name: 'Donation',
      product_category: 'Payment',
      product_profile: 'Donar',
      cus_name: payload.cus_name,
      // cus_name: "arko",
      cus_email: payload.cus_email,
      // cus_email: "arkoroyb@gmail.com",
      // cus_add1: payload.cus_add1,
      cus_add1: 'dhaka',
      cus_city: 'Dhaka',
      cus_state: 'Dhaka',
      cus_postcode: '1000',
      cus_country: 'Bangladesh',
      // cus_phone: payload.cus_phone,
      cus_phone: '0174536262',
      cus_fax: '01711111111',
      ship_name: 'Customer Name',
      ship_add1: 'Dhaka',
      ship_add2: 'Dhaka',
      ship_city: 'Dhaka',
      ship_state: 'Dhaka',
      ship_postcode: 1000,
      ship_country: 'Bangladesh',
    }

    const response = await axios({
      method: 'post',
      url: config.ssl.sslPaymentUrl,
      data: data,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })

    return response.data
  } catch (err) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Payment error')
  }
}

const validate = async (data: any) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `${config.ssl.sslValidationUrl}?val_id=${data.val_id}&store_id=${config.ssl.store_id}&store_passwd=${config.ssl.store_passwd}&format=json`,
    })

    // console.log("response", response.data);

    return response.data
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Payment validation error')
  }
}

export const sslService = {
  initPayment,
  validate,
}
