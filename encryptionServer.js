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

/**
 * Encrypts payload data with a given public key.
 * @param {Array} data - An array containing payload data.
 * @param {string} publicKey - The public key used to encrypt the payload data.
 * @returns {Promise<Array>} A Promise that resolves with the encrypted payload data as an array.
*/
const encryptPayloadData = async (data, publicKey) => {
  //here we destructure the elements of the data object
  const [
    registryOffice,
    registryNumber,
    [firstName, lastName, gender, birthDate, placeOfBirth, religion],
    [motherFamilyName, motherBirthName, motherSurname, motherReligion],
    [fatherFamilyName, fatherBirthName, fatherSurname, fatherReligion],
    furtherInformation,
  ] = data;

  const encryptedRegistryOffice = await encryptValueAndSerialize(registryOffice, publicKey);
  const encryptedRegistryNumber = await encryptValueAndSerialize(registryNumber, publicKey);

  const encryptedFirstName = await encryptValueAndSerialize(firstName, publicKey);
  const encryptedLastName = await encryptValueAndSerialize(lastName, publicKey);
  const encryptedGender = await encryptValueAndSerialize(gender, publicKey);
  const encryptedBirthDate = await encryptValueAndSerialize(birthDate, publicKey);
  const encryptedPlaceOfBirth = await encryptValueAndSerialize(placeOfBirth, publicKey);
  const encryptedReligion = await encryptValueAndSerialize(religion, publicKey);

  const encryptedMotherFamilyName = await encryptValueAndSerialize(motherFamilyName, publicKey);
  const encryptedMotherBirthName = await encryptValueAndSerialize(motherBirthName, publicKey);
  const encryptedMotherSurname = await encryptValueAndSerialize(motherSurname, publicKey);
  const encryptedMotherReligion = await encryptValueAndSerialize(motherReligion, publicKey);

  const encryptedFatherFamilyName = await encryptValueAndSerialize(fatherFamilyName, publicKey);
  const encryptedFatherBirthName = await encryptValueAndSerialize(fatherBirthName, publicKey);
  const encryptedFatherSurname = await encryptValueAndSerialize(fatherSurname, publicKey);
  const encryptedFatherReligion = await encryptValueAndSerialize(fatherReligion, publicKey);

  const encryptedFurtherInformation = await encryptValueAndSerialize(furtherInformation, publicKey);

  return [
    encryptedRegistryOffice,
    encryptedRegistryNumber,
    [encryptedFirstName, encryptedLastName, encryptedGender, encryptedBirthDate, encryptedPlaceOfBirth, encryptedReligion],
    [encryptedMotherFamilyName, encryptedMotherBirthName, encryptedMotherSurname, encryptedMotherReligion],
    [encryptedFatherFamilyName, encryptedFatherBirthName, encryptedFatherSurname, encryptedFatherReligion],
    encryptedFurtherInformation,
  ]
}

/**
 * Decrypts payload data with a given private key.
 * @param {Array} encryptedData - An array containing encrypted payload data.
 * @param {string} privateKey - The private key used to decrypt the payload data.
 * @returns {Promise<Array>} A Promise that resolves with the decrypted payload data as an array.
*/
const decryptPayloadData = async (encryptedData, privateKey) => {
  //here we destructure the elements of the data object
  const [
    registryOffice,
    registryNumber,
    [firstName, lastName, gender, birthDate, placeOfBirth, religion],
    [motherFamilyName, motherBirthName, motherSurname, motherReligion],
    [fatherFamilyName, fatherBirthName, fatherSurname, fatherReligion],
    furtherInformation,
  ] = encryptedData;

  const decryptedRegistryOffice = await decryptSerializedValue(privateKey, registryOffice);
  const decryptedRegistryNumber = await decryptSerializedValue(privateKey, registryNumber);

  const decryptedFirstName = await decryptSerializedValue(privateKey, firstName);
  const decryptedLastName = await decryptSerializedValue(privateKey, lastName);
  const decryptedGender = await decryptSerializedValue(privateKey, gender);
  const decryptedBirthDate = await decryptSerializedValue(privateKey, birthDate);
  const decryptedPlaceOfBirth = await decryptSerializedValue(privateKey, placeOfBirth);
  const decryptedReligion = await decryptSerializedValue(privateKey, religion);

  const decryptedMotherFamilyName = await decryptSerializedValue(privateKey, motherFamilyName);
  const decryptedMotherBirthName = await decryptSerializedValue(privateKey, motherBirthName);
  const decryptedMotherSurname = await decryptSerializedValue(privateKey, motherSurname);
  const decryptedMotherReligion = await decryptSerializedValue(privateKey, motherReligion);

  const decryptedFatherFamilyName = await decryptSerializedValue(privateKey, fatherFamilyName);
  const decryptedFatherBirthName = await decryptSerializedValue(privateKey, fatherBirthName);
  const decryptedFatherSurname = await decryptSerializedValue(privateKey, fatherSurname);
  const decryptedFatherReligion = await decryptSerializedValue(privateKey, fatherReligion);

  const decryptedFurtherInformation = await decryptSerializedValue(privateKey, furtherInformation);

  return [
    decryptedRegistryOffice,
    decryptedRegistryNumber,
    [decryptedFirstName, decryptedLastName, decryptedGender, decryptedBirthDate, decryptedPlaceOfBirth, decryptedReligion],
    [decryptedMotherFamilyName, decryptedMotherBirthName, decryptedMotherSurname, decryptedMotherReligion],
    [decryptedFatherFamilyName, decryptedFatherBirthName, decryptedFatherSurname, decryptedFatherReligion],
    decryptedFurtherInformation,
  ]
}

app.get('/', (req, res) => {
  try {
    res.send( 'Welcome te the Ethereum encryption service, you can create an account using metamask or simply go to /identity to get new Ethereum identity.Now Enjoy exchanging secret messages with your friends' );
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
    res.send({ encryptedDoc: encryptedDocument });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error encrypting document data');
  }
});

// POST route to encrypt data payload
app.post('/encryptpayload', async (req, res) => {
  try {
    const { publicKey, payload } = req.body;
    const encryptedPayload = await encryptPayloadData(payload, publicKey);
    res.send({ encryptedPayload: encryptedPayload });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error encrypting payload');
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
    const { encryptedDocumentData } = req.body;
    const decryptedDoc = await decryptSerializedValue(PRIVATEKEY, encryptedDocumentData);
    res.send({ decryptedDoc });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error decrypting message');
  }
});

// POST route to encrypt data payload
app.post('/decryptpayload', async (req, res) => {
  try {
    const { privateKey, encryptedPayload } = req.body;
    const decryptedPayload = await decryptPayloadData(encryptedPayload, privateKey);
    res.send({ encryptedPayload: decryptedPayload });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error decrypting payload');
  }
});

app.get('/identity', (req, res) => {
  try {
    const identity = EthCrypto.createIdentity();
    res.send( identity );
  } catch (err) {
    console.error(err);
    res.status(500).send('could not create account!');
  }
});


app.listen(port, () => console.log(`encryption Server up and listening on port ${port}!`));