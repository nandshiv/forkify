import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config';

/**
 * Returns a promise that rejects after a timeout.
 * @param {number} s - Timeout in seconds.
 * @returns {Promise<never>} A promise that rejects after s seconds.
 */
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

/**
 * Makes an AJAX request (GET or POST) and returns the response data.
 * @param {string} url - The URL to request.
 * @param {Object} [uploadData=undefined] - Data to send for POST requests.
 * @returns {Promise<Object>} The response data from the server.
 */
export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

// /*
// /**
//  * (Unused) Makes a GET request and returns the response data.
//  * @param {string} url - The URL to request.
//  * @returns {Promise<Object>} The response data from the server.
//  */
// export const getJSON = async function (url) {};

// /**
//  * (Unused) Makes a POST request and returns the response data.
//  * @param {string} url - The URL to request.
//  * @param {Object} uploadData - Data to send in the POST request.
//  * @returns {Promise<Object>} The response data from the server.
//  */
// export const sendJSON = async function (url, uploadData) {
//   try {
//     const fetchPro = fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(uploadData),
//     });

//     const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
//     const data = await res.json();

//     if (!res.ok) throw new Error(`${data.message} (${res.status})`);
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };
