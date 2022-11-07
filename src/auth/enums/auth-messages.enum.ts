export enum RegisterErrors {
  USERNAEM_CONFLICT = 'Username already exists',
  EMAIL_CONFLICT = 'The email entered has already been registered',
  phoneNumber_CONFLICT = 'The phone number entered has already been registered',
}

export enum AuthErrors {
  LOGIN_FAIL = 'Unauthorized!, Please check your login credentials',
  UNAUTHORIZED = 'Unauthorized!',
  VERIFICATION_FAILED = 'The verification code is incorrect or has expired'
}
