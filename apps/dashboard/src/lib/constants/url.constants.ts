// export const environment = {
//   production: false,
//   serverBaseUrl: 'http://localhost:8000',
//   dashboardBaseUrl: 'http://localhost:4200',
//   apiBaseUrl: 'http://localhost:8000/api/v1',
// };

export const environment = {
  production: true,
  serverBaseUrl: '',
  dashboardBaseUrl: '',
  apiBaseUrl: '/api/v1',
};

// export const environment = {
//   production: process.env.NODE_ENV?.toString() === 'production',
//   serverBaseUrl: process.env.SERVER_BASE_URL,
//   dashboardBaseUrl: process.env.DASHBOARD_BASE_URL,
//   apiBaseUrl: process.env.API_BASE_URL,
// };

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
