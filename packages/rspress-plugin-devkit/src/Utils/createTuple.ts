export const createTuple = <const T extends string>(...input: T[]) => {
  // @ts-expect-error
  return input as string[] & { _type: T };
};
