export class WebUrl {
  public static BASE_URL = 'http://localhost:8000';
  public static home = '/';
  public static signup = '/signup';
  public static signin = '/signin';
  public static createTenant = '/tenant';
  public static subscription = '/subscription';
}

export class ApiUrl {
  public static BASE_URL = 'http://localhost:8000/api/v1';
  public static signUp = `${ApiUrl.BASE_URL}/auth/signup`;
  public static signIn = `${ApiUrl.BASE_URL}/auth/login`;
  public static tenant = `${ApiUrl.BASE_URL}/tenant`;
  public static tenantLogo = `${ApiUrl.BASE_URL}/tenant/logo`;
  public static subscription = `${ApiUrl.BASE_URL}/subscription`;
}
