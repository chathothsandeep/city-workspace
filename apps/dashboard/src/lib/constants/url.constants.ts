export const environment = {
  production: false,
  serverBaseUrl: 'http://localhost:8000',
  dashboardBaseUrl: 'http://localhost:4200',
  apiBaseUrl: 'http://localhost:8000/api/v1',
};

export const WebUrl = {
  SERVER_BASE_URL: environment.serverBaseUrl,
  DASHBOARD_BASE_URL: environment.dashboardBaseUrl,
  home: '/',
  signup: '/signup',
  signin: '/signin',
  createTenant: '/tenant',
  subscription: '/subscription',
  products: '/product',
  createProduct: 'product/create',
  editProduct: '/product/info',
  service: '/service',
  createService: '/service/create',
  editService: '/service/info',
} as const;

export const ApiUrl = {
  BASE_URL: environment.apiBaseUrl,
  signUp: `${environment.apiBaseUrl}/auth/signup`,
  signIn: `${environment.apiBaseUrl}/auth/login`,
  tenant: `${environment.apiBaseUrl}/tenant`,
  product: `${environment.apiBaseUrl}/product`,
  service: `${environment.apiBaseUrl}/service`,
  subscription: `${environment.apiBaseUrl}/subscription`,
} as const;
