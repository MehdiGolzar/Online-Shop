export enum SignUpErrors {
  USERNAEM_CONFLICT = 'Username already exists',
  EMAIL_CONFLICT = 'The email entered has already been registered',
  phoneNumber_CONFLICT = 'The phone number entered has already been registered',
}

export enum SignInErrors {
  UNAUTHORIZED = 'Unauthorized!, please check your login credentials',
}
