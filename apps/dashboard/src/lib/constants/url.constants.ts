export const environment = {
  production: false,
  serverBaseUrl: 'http://localhost:8000',
  dashboardBaseUrl: 'http://localhost:4200',
  apiBaseUrl: 'http://localhost:8000/api/v1',
};

export class WebUrl {
  public static SERVER_BASE_URL = environment.serverBaseUrl;
  public static DASHBOARD_BASE_URL = environment.dashboardBaseUrl;
  public static home = '/';
  public static signup = '/signup';
  public static signin = '/signin';
  public static createTenant = '/tenant';
  public static subscription = '/subscription';
  public static readonly products = '/product';
  public static createProduct = `${WebUrl.products}/create`;
  public static editProduct = `${WebUrl.products}/info`;
}

export class ApiUrl {
  public static BASE_URL = environment.apiBaseUrl;
  public static signUp = `${ApiUrl.BASE_URL}/auth/signup`;
  public static signIn = `${ApiUrl.BASE_URL}/auth/login`;
  public static tenant = `${ApiUrl.BASE_URL}/tenant`;
  public static product = `${ApiUrl.BASE_URL}/product`;
  public static subscription = `${ApiUrl.BASE_URL}/subscription`;
}
