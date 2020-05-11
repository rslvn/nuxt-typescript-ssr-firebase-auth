import { CookieSerializeOptions } from "cookie";

export const cookieOptions: CookieSerializeOptions = { sameSite: 'lax' }

export const sessionCookieOptions: CookieSerializeOptions = { sameSite: 'none' }
