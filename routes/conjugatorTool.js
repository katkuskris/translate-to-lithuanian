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

        this.pres1sg = { tense: "present", form: this.#pres()[0] }
        this.pres2sg = { tense: "present", form: this.#pres()[1] }
        this.pres3sg = { tense: "present", form: this.#pres()[2] }
        this.pres1pl = { tense: "present", form: this.#pres()[3] }
        this.pres2pl = { tense: "present", form: this.#pres()[4] }
        this.pres3pl = { tense: "present", form: this.#pres()[3] }

        this.past1sg = { tense: "past", form: this.#past()[0] }
        this.past2sg = { tense: "past", form: this.#past()[1] }
        this.past3sg = { tense: "past", form: this.#past()[2] }
        this.past1pl = { tense: "past", form: this.#past()[3] }
        this.past2pl = { tense: "past", form: this.#past()[4] }
        this.past3pl = { tense: "past", form: this.#past()[3] }

        this.pastf1sg = { tense: "past frequentive", form: this.#pastf()[0] }
        this.pastf2sg = { tense: "past frequentive", form: this.#pastf()[1] }
        this.pastf3sg = { tense: "past frequentive", form: this.#pastf()[2] }
        this.pastf1pl = { tense: "past frequentive", form: this.#pastf()[3] }
        this.pastf2pl = { tense: "past frequentive", form: this.#pastf()[4] }
        this.pastf3pl = { tense: "past frequentive", form: this.#pastf()[3] }

        this.fut1sg = { tense: "future", form: this.#future()[0] }
        this.fut2sg = { tense: "future", form: this.#future()[1] }
        this.fut3sg = { tense: "future", form: this.#future()[2] }
        this.fut1pl = { tense: "future", form: this.#future()[3] }
        this.fut2pl = { tense: "future", form: this.#future()[4] }
        this.fut3pl = { tense: "future", form: this.#future()[3] }

        this.subj1sg = { tense: "subjunctive", form: this.#subj()[0] }
        this.subj2sg = { tense: "subjunctive", form: this.#subj()[1] }
        this.subj3sg = { tense: "subjunctive", form: this.#subj()[2] }
        this.subj1pl = { tense: "subjunctive", form: this.#subj()[3] }
        this.subj2pl = { tense: "subjunctive", form: this.#subj()[4] }
        this.subj3pl = { tense: "subjunctive", form: this.#subj()[3] }

        this.imp2sg = { tense: "imperative", form: this.#subj()[0] }
        this.imp1pl = { tense: "imperative", form: this.#subj()[1] }
        this.imp3pl = { tense: "imperative", form: this.#subj()[2] }
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
            // -avo verbs need working?
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
    console.log(Object.keys(output))


}

// let output = new Verb(verbs["žaisti"])
// console.log(output)

// getPresentTense(testVerb)