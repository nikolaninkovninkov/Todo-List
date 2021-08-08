/**
 * @description use async await with timeout
 * @param ms milliseconds to wait
 * @returns Promise, which resolves when the time is up
 */
function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export default timeout;
