import { environment } from 'src/environments/environment';

export module Constant {
  const baseUrl: String = environment.baseURL;
  export const getEndpoint: String = `${baseUrl}/Movie`;
  export const deleteEndPoint: string = `${baseUrl}/Movie/`;
}
