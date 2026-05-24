let sirAlphaNum = "";
const intervale = [
    [48, 57],
    [65, 90],
    [97, 122]
];

for (const interval of intervale) {
    for (let cod = interval[0]; cod <= interval[1]; cod++) {
        sirAlphaNum += String.fromCharCode(cod);
    }
}

function genereazaToken(lungime) {
    let token = "";

    for (let index = 0; index < lungime; index++) {
        token += sirAlphaNum[Math.floor(Math.random() * sirAlphaNum.length)];
    }

    return token;
}

module.exports = {
    genereazaToken
};
