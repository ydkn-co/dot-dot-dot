/* eslint-disable security/detect-object-injection */
const flattenObject = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: any,
  roots: string[] = [],
  sep = '-'
): Record<string, unknown> => Object
  .keys(obj)
  .reduce(
    (acc, prop) => ({
      ...acc,
      ...(obj[prop] instanceof Object && obj[prop].constructor === Object)
        ? flattenObject(
          obj[prop],
          roots.concat([prop]),
          sep
        )
        : {
          [roots.concat([prop]).join(sep)]: obj[prop]
        }
    }),
    {}
  )

export default flattenObject
