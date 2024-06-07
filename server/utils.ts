export const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) => arr.reduce((groups, item) => {
  (groups[key(item)] ||= []).push(item);

  return groups;
}, {} as Record<K, T[]>);

export const getIdCondition = (afterId: number) => (afterId === -1 ? undefined : { lt: afterId });

export const getDateCondition = (date?: Date) => (date ? { lt: date } : undefined);
