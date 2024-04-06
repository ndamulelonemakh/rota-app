/**
 * Makes an asynchronous GET request to the specified endpoint with the given parameters and headers.
 *
 * @param {string} endpoint - The API endpoint URL.
 * @param {Object} params - The query parameters to be included in the request.
 * @param {Object} [headers={}] - The headers to be included in the request.
 * @returns {Promise<Object>} A promise that resolves to the parsed JSON response data.
 * @throws {Error} If the server responds with an error status or if an error occurs during the request.
 */
export async function makeAsyncGetRequest(endpoint, params, headers = {}) {
  const queryString = buildQueryString(params);
  const url = `${endpoint}?${queryString}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Server error - status: ${response.status}. Please try again or contact support.`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to make request to ${url} => ${error.message}`);
  }
}

/**
 * Builds a URL-encoded query string from the given parameters object.
 *
 * @param {Object} params - The query parameters to be included in the query string.
 * @returns {string} The URL-encoded query string.
 */
function buildQueryString(params) {
  return Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
}