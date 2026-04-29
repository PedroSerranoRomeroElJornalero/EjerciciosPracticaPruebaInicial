export const toISODate = (date: string): string =>
  date ? new Date(date).toISOString() : "";