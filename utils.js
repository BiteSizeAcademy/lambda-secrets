const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
const kms = new AWS.KMS();

const decrypted = {};

exports.decryptSecret = async (secretName) => {
  if (decrypted[secretName]) {
    console.log('returning cached ' + secretName);
    return decrypted[secretName];
  }
  console.log('decrypting ' + secretName);
  try {
    const req = { CiphertextBlob: Buffer.from(process.env[secretName], 'base64') };
    const data = await kms.decrypt(req).promise();
    const decryptedVal = data.Plaintext.toString('ascii');
    decrypted[secretName] = decryptedVal;
    return decryptedVal;
  } catch (err) {
    console.log('decrypt error:', err);
    throw err;
  }

};
