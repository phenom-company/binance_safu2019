// debug
console.log('ENV', process.env.NODE_ENV);

// env processor
var apiOrigin = 'https://safu-api-client.phenom.team'; // npm run build:prod
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'dev') {
  apiOrigin = 'https://safu-api-client.phenom.team'; // npm run build:dev
} else if (process.env.NODE_ENV === 'stage') {
  apiOrigin = 'https://safu-api-client.phenom.team'; // npm run build:stage || npm run dev
} else if (process.env.NODE_ENV === 'local') {
  apiOrigin = 'http://127.0.0.1:8000'; // npm run local
}

export const API_ORIGIN = apiOrigin;
export const API = `${API_ORIGIN}/api`;
