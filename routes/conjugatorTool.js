const { SourceLanguageConfig } = require("microsoft-cognitiveservices-speech-sdk")
const verbs = require("../verbs.json")

class Verb {
    constructor(verb) {

        verb = verbs[verb]

        this.inf = verb[0]
        this.basicPres = verb[1]
        this.basicPast = verb[2]

        this.isReflexive = this.#isReflexive()

        this.pres = this.#pres()
        this.pres = {
            "title": "Prsent Tense",
            "1sg": this.pres[0],
            "2sg": this.pres[1],
            "3sg": this.pres[2],
            "1pl": this.pres[3],
            "2pl": this.pres[4],
            "3pl": this.pres[2]
        }

        this.past = this.#past(verb)
        this.past = {
            "title": "Past Tense",
            "1sg": this.past[0],
            "2sg": this.past[1],
            "3sg": this.past[2],
            "1pl": this.past[3],
            "2pl": this.past[4],
            "3pl": this.past[3]
        }

        this.pastf = this.#pastf(verb)
        this.pastf = {
            "title": "Past Frequentive Tense",
            "1sg": this.pastf[0],
            "2sg": this.pastf[1],
            "3sg": this.pastf[2],
            "1pl": this.pastf[3],
            "2pl": this.pastf[4],
            "3pl": this.pastf[3]
        }

        this.fut = this.#future(verb)
        this.fut = {
            "title": "Future Tense",
            "1sg": this.fut[0],
            "2sg": this.fut[1],
            "3sg": this.fut[2],
            "1pl": this.fut[3],
            "2pl": this.fut[4],
            "3pl": this.fut[3]
        }


        this.subj = this.#subj(verb)
        this.subj = {
            "title": "Subjunctive Mood",
            "1sg": this.subj[0],
            "2sg": this.subj[1],
            "3sg": this.subj[2],
            "1pl": this.subj[3],
            "2pl": this.subj[4],
            "3pl": this.subj[3]
        }

        this.imp = this.#imp(verb)
        this.imp = {
            "title": "Imperative Mood",
            "2sg": this.imp[0],
            "1pl": this.imp[1],
            "2pl": this.imp[2]
        }
    }

    #isReflexive() {
        return this.inf.slice(-1) == "s" ? true : false
    }

    #zip(root, endings) {
        let forms = []
        for (let i = 0; i < endings.length; i++) {
            forms.push(root + endings[i])
        }
        if (this.#isReflexive()) {
            console.log('ahoy!')
            let reflexiveEndings = ["si", "si", "si", "s", "s"]
            console.log(root, endings)
            for (let i = 0; i < reflexiveEndings.length; i++) {
                forms[i] += reflexiveEndings[i]
            }
        }
        console.log(forms)
        return forms
    }

    #pres() {
        let root
        let endings
        let basicPres = this.basicPres
        console.log(basicPres)
        if (this.#isReflexive()) {
            basicPres.slice(0, basicPres.length - 2)
        }
        if (this.inf == "buti") {
            return ["esu", "esi", "yra", "esate", "yra"]
        } else if (basicPres.slice(-2) == "ia") {
            root = basicPres.slice(0, basicPres.length - 2)
            endings = ["iu", "i", "ia", "iame", "iate"]
        } else if (basicPres.slice(-1) == "a") {
            root = basicPres.slice(0, basicPres.length - 1)
            endings = ["u", "i", "a", "ame", "ate"]
        } else if (basicPres.slice(-1) == "i") {
            root = basicPres.slice(0, basicPres.length - 1)
            endings = ["iu", "i", "o", "ime", "ite"]
        } else if (basicPres.slice(-1) == "o") {
            root = basicPres.slice(0, basicPres.length - 1)
            endings = ["au", "ai", "o", "ome", "ote"]
        } else {
            return ["broken", "broken", "broken", "broken", "broken"]
        }
        return this.#zip(root, endings)

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
            return ["broken", "broken", "broken", "broken", "broken"]
        }
    }

    #pastf() {
        let root = this.inf.slice(0, this.inf.length - 2)
        return [root + "davo", root + "davai", root + "davo", root + "davome", root + "davote"]
    }

    #future() {
        let root = this.inf.slice(0, this.inf.length - 2)
        return [root + "siu", root + "si", root + "s", root + "sime", root + "site"]
    }

    #subj() {
        let root = this.inf.slice(0, this.inf.length - 2)
        return [root + "čiau", root + "tum", root + "tų", root + "tume", root + "tute"]
    }

    #imp() {
        let root = this.inf.slice(0, this.inf.length - 2)
        return [root + "k", root + "kime", root + "kite"]
    }
}


module.exports = Verb