export function getLimitedData<T>(array: T[] | undefined, dbLimit: number | null | undefined): T[] {
  if (!array) return [];
  // Limit
  const limit = (dbLimit === null || dbLimit === undefined)
    ? 1 
    : (dbLimit === 0 ? undefined : dbLimit);

  return array.slice(0, limit);
}