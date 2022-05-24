const verbs = require("./verbs.json")
const fs = require('fs')

let infinitives = Object.keys(verbs)
let count = 0
let indices = []
for (let verb of infinitives) {
    if (verb.slice(-1) == 's') {
        indices.push(infinitives.indexOf(verb))
    }
}
while (indices.length != 0) {
    infinitives.pop(indices.pop())
}
console.log(infinitives.length)
fs.writeFile('test.txt', JSON.stringify(infinitives), err => {
    if (err) {
        console.error(err);
    }
    // file written successfully
});

