/**
 * Author: Ramy Gouiaa
 * 
 * Email: ramygouia90@gmail.com
 * github: 
 * a simple encryption/decryption server based on Ethereum Key pairs
 * 
 * this is an example of how can we use cryptography to exchange secret messages or data
 *
 */

const express = require('express');
const cors = require('cors');
const EthCrypto = require('eth-crypto');
const bodyParser = require('body-parser');
const app = express();
//  enable CORS for all origins
app.use(cors({
origin:"*"
}));
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PUBLICKEY = '7bb6761681072c4c161cae6962220404517a82ae7c0701daa8e20f8a2825a8e20f9cdcbbb14ae530696b2c735dc2c834a48e2e31afebb770c9f8403020350bf5';
const PRIVATEKEY = '0xa24c7b335b85a1b802dce837245e5173bd455d4836c81b50e05ec222cee284ad';

/**
 * Encrypts a value using a given public key and returns it as a serialized string.
 * @param {*} value - The value to be encrypted.
 * @param {string} publicKey - The public key used to encrypt the value.
 * @returns {Promise<string>} A Promise that resolves with the encrypted value as a serialized string.
 */
const encryptValueAndSerialize = async (value, publicKey) => {
  const encryptedValue = await EthCrypto.encryptWithPublicKey(publicKey, value);
  return EthCrypto.cipher.stringify(encryptedValue);
}

/**
 * Decrypts a serialized value using a given private key.
 * @param {string} privateKey - The private key used to decrypt the value.
 * @param {string} encryptedValue - The encrypted value as a serialized string.
 * @returns {Promise<*>} A Promise that resolves with the decrypted value.
*/
const decryptSerializedValue = async (privateKey, encryptedValue) => {
  const decryptedValue = await EthCrypto.decryptWithPrivateKey(privateKey, EthCrypto.cipher.parse(encryptedValue));
  return decryptedValue;
}

app.get('/', (req, res) => {
  try {
    res.send('Welcome te the Ethereum encryption service, you can create an account using metamask or simply go to /identity to get new Ethereum identity.Now Enjoy exchanging secret messages with your friends');
  } catch (err) {
    console.error(err);
    res.status(500).send('server error!');
  }
});

// POST route to encrypt message
app.post('/encrypt', async (req, res) => {
  try {
    const { publicKey, message } = req.body;
    const encryptedMessage = await encryptValueAndSerialize(message, publicKey)
    res.send({ encryptedMessage: encryptedMessage });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error encrypting message');
  }
});

// POST route to encrypt message
app.post('/encryptdocdata', async (req, res) => {
  try {
    const { documentdata } = req.body;
    const encryptedDocument = await encryptValueAndSerialize(documentdata, PUBLICKEY)
    res.send({ data: encryptedDocument });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error encrypting document data');
  }
});

// POST route to decrypt message
app.post('/decrypt', async (req, res) => {
  try {
    const { privateKey, encryptedMessage } = req.body;
    const decryptedMessage = await decryptSerializedValue(privateKey, encryptedMessage);
    res.send({ decryptedMessage });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error decrypting message');
  }
});

// POST route to decrypt document
app.post('/decryptdocdata', async (req, res) => {
  try {
    console.log('encryptionServer request body' ,req.body);
    const {data} = req.body;
    console.log('encryptedDocument',data);
    const decryptedDocument = await decryptSerializedValue(PRIVATEKEY, data);
    res.send({ decryptedDocument });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error decrypting message');
  }
});

app.get('/identity', (req, res) => {
  try {
    const identity = EthCrypto.createIdentity();
    res.send(identity);
  } catch (err) {
    console.error(err);
    res.status(500).send('could not create account!');
  }
});

// Error handling middleware
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Process event listeners
process.on('uncaughtException', function(err) {
  console.error('Uncaught Exception:', err.stack);
});

process.on('unhandledRejection', function(reason, promise) {
  console.error('Unhandled Rejection:', reason.stack || reason);
});

app.listen(port, () => console.log(`encryption Server up and listening on port http://localhost:${port}`));