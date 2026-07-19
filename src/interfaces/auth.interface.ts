/**
 * Data required to register a new user.
 */
export interface RegisterUserDto {
  name: string;
  email: string;
  password: string;
}

/**
 * Data required to log in.
 */
export interface LoginUserDto {
  email: string;
  password: string;
}

/**
 * User information returned after registration or login.
 * Never expose the password.
 */
export interface UserResponseDto {
  id: string;
  name: string;
  email: string;
  role: string;
}

/**
 * Login response.
 */
export interface LoginResponseDto {
  user: UserResponseDto;
  accessToken: string;
  refreshToken: string;
}

/**
 * Forgot password request DTO.
 */
export interface ForgotPasswordDto {
  email: string;
}

/**
 * Reset password request DTO.
 */
export interface ResetPasswordDto {
  token: string;
  password: string;
}