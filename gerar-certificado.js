const selfsigned = require('selfsigned');
const fs = require('fs');

const attrs = [
  { name: 'commonName', value: 'localhost' }
];

const pems = selfsigned.generate(attrs, {
  algorithm: 'sha256',
  days: 365,
  keySize: 2048
});

if (!fs.existsSync('certs')) {
  fs.mkdirSync('certs');
}

console.log(pems);

fs.writeFileSync(
  'certs/server-key.pem',
  pems.private
);

fs.writeFileSync(
  'certs/server-cert.pem',
  pems.cert
);

console.log('Certificados gerados com sucesso!');