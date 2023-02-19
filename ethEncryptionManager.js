const EthCrypto = require('eth-crypto');

class EthEncryptionManager {
  constructor() {}

  async encryptWithPublicKey(publicKey, message) {
    const encryptedObject = await EthCrypto.encryptWithPublicKey(publicKey, message);
    return EthCrypto.cipher.stringify(encryptedObject);
  }

  async decryptWithPrivateKey(privateKey, encryptedData) {
    const encryptedDataObj = EthCrypto.cipher.parse(encryptedData);
    return await EthCrypto.decryptWithPrivateKey(privateKey, encryptedDataObj);
  }

  createIdentity(){
  return EthCrypto.createIdentity();
  }
}

// example usage

/**
 *
 * for demonstration
 *
    privateKeyOfBob 0x9364cc495a859d83f692f05dd23a4a856d9a133ac4e39c8624951bf490cb219a
    publicKeyOfbob 32f667bf7b1c4188d69a696678f54ecd9cbd1f0a85b4250abfe260219f6b45c9f831c4f750c7e17e59a6d06f5aa00046974ec93b84e8cd9d5af735fd6398dcce
    privateKeyOfAlice 0x78235fde9d7da4ad5ca8810933edab75581713ecd3730dd084e07081067656b6
    publicKeyOfAlice aea889b56fede75cc206b86a45d2e4b751daaf7f61892ee74add1f8e0c4787744863a544ae2bb481f80eb1b839907e5a24d786429be4b1e230de6b53d5270e9d
    bobSecretMessageToAlice f84995da896a940474ce18c652bf0ff702f90b5a1809e52875be72c3ae239ab9d675a04f2bc7dde4021b487b30384532d2b05d1b9651261887b700720a976bb688873aabbbe8fbf6cdc3977dfe2e0abec0b9b265c90f4fb48923c2f1cafd6f4d102cc53e03dd8ba6935f7f99ec290f4588
    aliceSecretMessageToBob a6e16645915b16ed1e3e85a708a9fd280328960ebcf33ba4f013a9de3befdbb2d27e8a6f5aa8671675a4260804d87abd59af25029be6f947aa1854519f977e96498cd4f2dba073745f1a603cfabaf4155aee90bf420e8408864e0d09ec89efcbe99f63b1f07879088193b5e2eea9d08345
 *
 *
 */

const bobPublicKey = '32f667bf7b1c4188d69a696678f54ecd9cbd1f0a85b4250abfe260219f6b45c9f831c4f750c7e17e59a6d06f5aa00046974ec93b84e8cd9d5af735fd6398dcce';
const bobPrivateKey = '0x3bfdef0490a54f93ccb4e2d5b63d6613f7e7106543c516fc30454489bd59dc24';
const alicePrivateKey = '0x78235fde9d7da4ad5ca8810933edab75581713ecd3730dd084e07081067656b6';

const manager = new EthEncryptionManager();

//manager.encryptWithPublicKey(bobPublicKey, 'hoy shit bro!! thats a big shit').then(data => console.log('messageToBob',data));
manager.decryptWithPrivateKey('0x9364cc495a859d83f692f05dd23a4a856d9a133ac4e39c8624951bf490cb219a'
, 'a6e16645915b16ed1e3e85a708a9fd280328960ebcf33ba4f013a9de3befdbb2d27e8a6f5aa8671675a4260804d87abd59af25029be6f947aa1854519f977e96498cd4f2dba073745f1a603cfabaf4155aee90bf420e8408864e0d09ec89efcbe99f63b1f07879088193b5e2eea9d08345')
.then(data => console.log("message:",data));

console.log(manager.createIdentity());