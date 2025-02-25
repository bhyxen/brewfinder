export const X_URL = "https://x.com/bhyxenn";
export const GITHUB_URL = "https://github.com/bhyxen/brewfinder";
export const PAYPAL_URL = "https://paypal.me/bhxyen";
export const EMAIL_PROVIDER_ID = "resend";

export enum AuthErrors {
	AccessDenied = "Access denied. You do not have permission to access this resource. If you believe this is an error, please contact support.",
	AccountNotLinked = "An account with this email address already exists. Please sign in with the original provider you used to create the account. If you wish to link this account to your current provider, please contact support for assistance.",
	AdapterError = "An unexpected database error occurred. Please try again later. If the problem persists, please contact support.",
	AuthError = "An authentication error occurred. Please try again. If the problem persists, contact support.",
	CallbackRouteError = "Unable to complete sign-in. Please try again. If the problem persists, ensure you have authorized the application (if using a social provider), or check your email for a valid verification link (if using email sign-in).",
	CredentialsSignin = "Invalid credentials. Please check your username and password and try again.",
	DuplicateConditionalUI = "There was a misconfiguration with our login system. Please contact support.",
	EmailSignInError = "There was an issue with your email sign-in. Please check your email for a valid verification link and try again.",
	ErrorPageLoop = "An unexpected error loop occurred. Please contact support for assistance.",
	EventError = "An unexpected event error occurred. Please try again or contact support.",
	ExperimentalFeatureNotEnabled = "An experimental feature is not enabled. Please contact support for assistance.",
	InvalidCallbackUrl = "Invalid callback URL. Please contact support to resolve this issue.",
	InvalidCheck = "An unexpected validation error occurred. Please try again or contact support.",
	InvalidEndpoints = "An unexpected endpoint error occurred. Please contact support for assistance.",
	InvalidProvider = "Invalid authentication provider. Please contact support to resolve this issue.",
	JWTSessionError = "An unexpected JWT session error occurred. Please try again or contact support.",
	MissingAdapter = "A required adapter is missing. Please contact support for assistance.",
	OAuthAccountNotLinked = "This account is not linked to your current OAuth provider. Please sign in with the original provider or contact support for linking assistance.",
	OAuthCallbackError = "An unexpected OAuth callback error occurred. Please try again or contact support.",
	OAuthProfileParseError = "An unexpected error occurred while fetching your profile. Please try again or contact support.",
	OAuthSignInError = "An unexpected OAuth sign-in error occurred. Please ensure you have authorized the application and try again.",
	SessionTokenError = "An unexpected session token error occurred. Please try again or contact support.",
	SignOutError = "An unexpected sign-out error occurred. Please try again or contact support.",
	UnknownAction = "An unexpected action error occurred. Please contact support for assistance.",
	UnsupportedStrategy = "An unsupported authentication strategy is being used. Please contact support to resolve this issue.",
	UntrustedHost = "Access from this host is not trusted. Please contact support if you believe this is an error.",
	Verification = "Verification error. The token may have expired or been used already.",
	MissingCSRF = "CSRF protection is missing. Please contact support to resolve this security issue.",
	Default = "An unexpected error occurred. Please try again or contact support.",
}
