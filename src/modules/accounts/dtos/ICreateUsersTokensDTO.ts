export interface ICreateUsersTokensDTO {
  id?: string;
  refresh_token: string;
  user_id: string
  expires_date: Date
}