// // utils/generateCryptomusSignature.js
// import crypto from 'crypto';

// /**
//  * Sorts the payload keys to ensure a canonical JSON string.
//  * @param {Object} payload - The payload object.
//  * @returns {string} - A JSON string with sorted keys.
//  */
// const getCanonicalJSONString = (payload) => {
//   const sortedKeys = Object.keys(payload).sort();
//   const sortedPayload = {};
//   sortedKeys.forEach(key => {
//     sortedPayload[key] = payload[key];
//   });
//   return JSON.stringify(sortedPayload);
// };

// /**
//  * Generates a Cryptomus signature using MD5.
//  * The signature is calculated as MD5(Base64(JSON(PAYLOAD_WITH_SORTED_KEYS)) + PAYMENT_KEY).
//  * @param {Object} payload - The request payload.
//  * @param {string} paymentKey - The Cryptomus payment key.
//  * @returns {Object} - An object containing the base64 encoded payload and its MD5 signature.
//  */
// const generateCryptomusSignature = (payload, paymentKey) => {
//   try {
//     // Get canonical JSON string with sorted keys
//     const jsonData = getCanonicalJSONString(payload);
//     // Convert to base64 (using UTF-8)
//     const base64data = Buffer.from(jsonData, 'utf8').toString("base64");
//     // Concatenate base64 string with the payment key and create the MD5 hash
//     const sign = crypto.createHash("md5").update(base64data + paymentKey).digest("hex");
//     return { sign, base64data };
//   } catch (error) {
//     console.error("Error generating Cryptomus signature:", error);
//     throw new Error("Failed to generate Cryptomus signature");
//   }
// };

// export default generateCryptomusSignature;
