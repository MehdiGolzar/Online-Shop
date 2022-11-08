export enum RegisterErrors {
  PHONE_NUMBER_CONFLICT = 'The phone number entered has already been registered',
  USERNAEM_CONFLICT = 'Username already exists',
  EMAIL_CONFLICT = 'The email entered has already been registered',
  VERIFICATION_FAILED = 'The verification code is incorrect or has expired',
  VERIFICATION_CODE_SENT = 'Verification code has been sent',
  TEMPORARY_USER_NOT_EXISTS = 'Access denied!, Please start registration again',
}

export enum AuthErrors {
  LOGIN_FAIL = 'Unauthorized!, Please check your login credentials',
  PHONE_NUMBER_NOT_REGISTERED = 'Unauthorized!, Please check your phone number',
  UNAUTHORIZED = 'Unauthorized!',
}
