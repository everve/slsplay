// Feel free to extend this interface
// depending on your app specific config.
export interface IConfig {
  API: string;
  GOOGLE_CLIENT_ID: string;
  FACEBOOK_CLIENT_ID: string;
  
}

export const Config: IConfig = JSON.parse('<%= ENV_CONFIG %>');
