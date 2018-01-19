var fs = require('fs');
const path = require('path');

var Font = require('fonteditor-core').Font;
var fs = require('fs');
var buffer = fs.readFileSync(
    path.resolve(__dirname, './wx-applet-style/fonts/wx-applet-symbols.ttf')
);

var font = Font.create(buffer, {
    type: 'ttf', // support ttf,woff,eot,otf,svg
    subset: [65, 66], // only read `a`, `b` glyf
    hinting: true, // save font hinting
    compound2simple: true, // transform ttf compound glyf to simple
    inflate: null, // inflate function for woff
    combinePath: false // for svg path
});

let base64 = font.toBase64({
    type: 'ttf' // support ttf,woff,eot,svg
});

let template = `@font-face {
    font-family: 'wx-applet-symbols';
    src: url(${base64}) format('ttf');
    font-weight: normal;
    font-style: normal;
}`;
var dataBuffer = new Buffer(template);
fs.writeFile('./wx-applet-style/wx-applet-symbols-base64.css', dataBuffer, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('success');
    }
});
