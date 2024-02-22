import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bycrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt: {
    secret: process.env.JWT_SECRET,
    refresh_secret: process.env.JWT_REFRESH_SECRET,
    expires_in: process.env.JWT_EXPIRES_IN,
    refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  },
  ssl: {
    store_id: process.env.STORE_ID,
    store_passwd: process.env.STORE_PASSWORD,
    sslPaymentUrl: process.env.SSL_BASE_PAYMENT_URL,
    sslValidationUrl: process.env.SSL_BASE_VALIDATION_URL,
  },
  // is_live: false //true for live, false for sandbox
}
