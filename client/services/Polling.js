/**
 * Start a polling.
 *
 * @param {Function} fn The function to execute on each iteration
 * @param {*} interval The interval between each iteration (unit: seconds)
 * @returns {Number} The polling id
 */
export function poll(fn, interval = 30) {
  const timer = interval * 1000;
  const id = setInterval(fn, timer);
  return id;
}
/**
 * Stop a running polling.
 *
 * @param {Number} pollingId The polling id given by the poll() function
 * @returns {Function} The function to stop the polling
 */
export function stopPolling(pollingId) {
  clearInterval(pollingId);
}
