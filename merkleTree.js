const { MerkleTree } = require('merkletreejs');
const SHA256 = require('crypto-js/sha256');

// Sample addresses
const addresses = [
  '0x23a7e1f99fb3e3fe4d9a7e4a78eab3b719b7e042', 
  '0x56b87f5f4dcd8c7f6a9a04e051c3b0f213928b81',
  '0x98c20f2a84c2f5052f8c503f4a14bfac6872d654',
  '0xcfe62df4617b9be57a8e272b3e2b0b8579d8b1a4',
  '0xd72cc864b33ed6db45e1f2a8d18ed879b12d9d47'
];


const leaves = addresses.map(address => SHA256(address));


const merkleTree = new MerkleTree(leaves, SHA256);

const merkleRoot = merkleTree.getRoot().toString('hex');

function verify(address) {
  const leaf = SHA256(address);
  const proof = merkleTree.getProof(leaf)
  return merkleTree.verify(proof, leaf, merkleRoot);
}

console.log(verify('0xd72cc864b33ed6db45e1f2a8d18ed879b12d9d47'));
console.log(verify('0x999')); 