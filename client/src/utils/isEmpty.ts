export default function isEmpty<T>(value: T) {
  if (Array.isArray(value)) {
    return value.length == 0;
  }
  if (typeof value === 'string' || value instanceof String) {
    return value.length == 0;
  }
}
