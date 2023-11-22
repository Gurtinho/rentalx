import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens"

interface IDateProvider {
  dayNow(): Date
  addDays(days: number): Date
  addHours(hours: number): Date
  convertToUTC(end_date: Date): string
  compareInDays(start_date: Date, end_date: Date): number
  compareInHours(start_date: Date, end_date: Date): number
  compareIfBefore(start_date: Date, end_date: Date): boolean
}

export { IDateProvider }