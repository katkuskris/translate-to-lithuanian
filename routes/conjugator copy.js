const verbs = require("../verbs.json")

let keys = Object.keys(verbs)

let testVerbs = []
for (let i = 0; i < 10; i++) {
    let key = keys[Math.floor(Math.random() * keys.length)]
    testVerbs.push(verbs[key])
}
// console.log(testVerbs)

class Verb {
    constructor(verb) {
        this.inf = verb[0]
        this.basicPres = verb[1]
        this.basicPast = verb[2]

        this.pres = this.#pres()
        this.pres = {
            "1sg": this.pres[0],
            "2sg": this.pres[1],
            "3sg": this.pres[2],
            "1pl": this.pres[3],
            "2pl": this.pres[4],
            "3pl": this.pres[3]
        }

        this.past = this.#past()
        this.past = {
            "1sg": this.past[0],
            "2sg": this.past[1],
            "3sg": this.past[2],
            "1pl": this.past[3],
            "2pl": this.past[4],
            "3pl": this.past[3]
        }

        this.pastf = this.#pastf()
        this.pastf = {
            "1sg": this.pastf[0],
            "2sg": this.pastf[1],
            "3sg": this.pastf[2],
            "1pl": this.pastf[3],
            "2pl": this.pastf[4],
            "3pl": this.pastf[3]
        }

        this.future = this.#future()
        this.future = {
            "1sg": this.future[0],
            "2sg": this.future[1],
            "3sg": this.future[2],
            "1pl": this.future[3],
            "2pl": this.future[4],
            "3pl": this.future[3]
        }


        this.subj = this.#subj()
        this.subj = {
            "1sg": this.subj[0],
            "2sg": this.subj[1],
            "3sg": this.subj[2],
            "1pl": this.subj[3],
            "2pl": this.subj[4],
            "3pl": this.subj[3]
        }

        this.imp = this.#imp()
        this.imp = {
            "2sg": this.imp[0],
            "1pl": this.imp[1],
            "2pl": this.imp[2]
        }
    }

    #pres() {
        if (this.inf == "buti") {
            return ["esu", "esi", "yra", "esate", "yra"]
        } else if (this.basicPres.slice(-2) == "ia") {
            let root = this.basicPres.slice(0, this.basicPres.length - 2)
            return [root + "iu", root + "i", root + "ia", root + "iame", root + "iate"]
        } else if (
            this.basicPres.slice(-1) == "a") {
            let root = this.basicPres.slice(0, this.basicPres.length - 1)
            return [root + "u", root + "i", root + "a", root + "ame", root + "ate"]
        } else if (
            this.basicPres.slice(-1) == "i") {
            let root = this.basicPres.slice(0, this.basicPres.length - 1)
            return [root + "iu", root + "i", root + "o", root + "ime", root + "ite"]
        } else if (
            this.basicPres.slice(-1) == "o") {
            let root = this.basicPres.slice(0, this.basicPres.length - 1)
            return [root + "au", root + "ao", root + "o", root + "ome", root + "ote"]
        }
    }

    #past() {
        if (this.basicPast.slice(-1) == "o") {
            let root = this.basicPast.slice(0, this.basicPast.length - 1)
            return [root + "au", root + "ai", root + "o", root + "ome", root + "ote"]
        } else if (
            this.basicPast.slice(-1) == "ė") {
            let root = this.basicPast.slice(0, this.basicPast.length - 1)
            return [root + "iau", root + "ei", root + "ė", root + "ėme", root + "ėte"]
        } else {
            // reflexive verbs need working
            return ["broken", "broken", "broken", "broken", "broken"]
        }
    }

    #pastf() {
        let root = this.inf.slice(0, this.inf.length - 2)
        return [root + "davo", root + "davai", root + "davo", root + "davome", root + "davote"]
        // need reflexive verbs
    }

    #future() {
        let root = this.inf.slice(0, this.inf.length - 2)
        return [root + "siu", root + "si", root + "s", root + "sime", root + "site"]
        // need reflexive verbs
    }

    #subj() {
        let root = this.inf.slice(0, this.inf.length - 2)
        return [root + "čiau", root + "tum", root + "tų", root + "tume", root + "tute"]
        // need reflexive verbs
    }

    #imp() {
        let root = this.inf.slice(0, this.inf.length - 2)
        return [root + "k", root + "kime", root + "kite"]
        // need reflexive verbs
    }
}

for (let verb of testVerbs) {
    let output = new Verb(verb)
    console.log(output)

}

// let output = new Verb(verbs["žaisti"])
// console.log(output)

// getPresentTense(testVerb)