/**
 * Author: Ramy Gouiaa
 * 
 * Email: ramygouia90@gmail.com
 * github: 
 * a simple encryption/decryption server based on Ethereum Key pairs
 * 
 * this is an example of how can we use cryptography to exchange secret messages or data
 * 
 * Warning!! do not use this for production its only for demonstration or teaching!!!
 */

const express = require('express');
const EthCrypto = require('eth-crypto');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// POST route to encrypt message
app.post('/encrypt', async (req, res) => {
  try {
    const { publicKey, message } = req.body;
    const encryptedMessage = await EthCrypto.encryptWithPublicKey(publicKey, message);
    res.send({ encryptedMessage: EthCrypto.cipher.stringify(encryptedMessage) });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error encrypting message');
  }
});

// POST route to decrypt message
app.post('/decrypt', async (req, res) => {
  try {
    const { privateKey, encryptedMessage } = req.body;
    const decryptedMessage = await EthCrypto.decryptWithPrivateKey(privateKey, EthCrypto.cipher.parse(encryptedMessage));
    res.send({ decryptedMessage });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error decrypting message');
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));