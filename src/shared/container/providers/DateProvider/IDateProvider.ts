interface IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number
  convertToUTC(end_date: Date): string
  dayNow(): Date
  compareInDays(start_date: Date, end_date: Date): number
}

export { IDateProvider }