const express = require('express')
const app = express()
const winston = require("winston")
const expressWinston = require("express-winston")
const port = 2600

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("/data/emf2024jambonz.sqlite")

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS calls (id INTEGER PRIMARY KEY AUTOINCREMENT, caller TEXT, callername TEXT)")
    db.run("CREATE TABLE IF NOT EXISTS menuselection (id INTEGER PRIMARY KEY AUTOINCREMENT, caller TEXT, selection TEXT)")
    db.run("CREATE TABLE IF NOT EXISTS complaints (id INTEGER PRIMARY KEY AUTOINCREMENT, caller TEXT, selection INTEGER)")
})

app.use(expressWinston.logger({
    transports: [
            new winston.transports.Console()
        ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
}))

app.use('/files', express.static('static'))
app.use(express.json())


app.get('/', (req, res) => {
    res.send("Nothing to see here...")
})

function filename(f) {
    return `https://jambonz.emf2024.michaelcullen.name/files/${f}`
}

function getfilesfordigits(n) {
    if(n == 1) {
        return [filename("one.mp3")]
    } else if(n == 2) {
        return [filename("two.mp3")]
    } else if(n == 3) {
        return [filename("three.mp3")]
    } else if(n == 4) {
        return [filename("four.mp3")]
    } else if(n == 5) {
        return [filename("five.mp3")]
    } else if(n == 6) {
        return [filename("six.mp3")]
    } else if(n == 7) {
        return [filename("seven.mp3")]
    } else if(n == 8) {
        return [filename("eight.mp3")]
    } else if(n == 9) {
        return [filename("nine.mp3")]
    } else if(n == 10) {
        return [filename("ten.mp3")]
    } else if(n == 11) {
        return [filename("eleven.mp3")]
    } else if(n == 12) {
        return [filename("twelve.mp3")]
    } else if(n == 13) {
        return [filename("thirteen.mp3")]
    } else if(n == 14) {
        return [filename("fourteen.mp3")]
    } else if(n == 15) {
        return [filename("fifteen.mp3")]
    } else if(n == 16) {
        return [filename("sixteen.mp3")]
    } else if(n == 17) {
        return [filename("seventeen.mp3")]
    } else if(n == 18) {
        return [filename("eighteen.mp3")]
    } else if(n == 19) {
        return [filename("nineteen.mp3")]
    } else if(n == 20) {
        return [filename("twenty.mp3")]
    } else if(n > 20 && n < 30) {
        return [filename("twenty.mp3")].concat(getfilesfordigits(n-20))
    } else if(n == 30) {
        return [filename("thirty.mp3")]
    } else if(n > 30 && n < 40) {
        return [filename("thirty.mp3")].concat(getfilesfordigits(n-30))
    } else if(n == 40) {
        return [filename("fourty.mp3")]
    } else if(n > 20 && n < 30) {
        return [filename("fourty.mp3")].concat(getfilesfordigits(n-40))
    } else if(n == 50) {
        return [filename("fifty.mp3")]
    } else if(n > 50 && n < 60) {
        return [filename("fifty.mp3")].concat(getfilesfordigits(n-50))
    } else if(n == 60) {
        return [filename("sixty.mp3")]
    } else if(n > 60 && n < 70) {
        return [filename("sixty.mp3")].concat(getfilesfordigits(n-60))
    } else if(n == 70) {
        return [filename("seventy.mp3")]
    } else if(n > 70 && n < 80) {
        return [filename("seventy.mp3")].concat(getfilesfordigits(n-70))
    } else if(n == 80) {
        return [filename("eighty.mp3")]
    } else if(n > 80 && n < 90) {
        return [filename("eighty.mp3")].concat(getfilesfordigits(n-80))
    } else if(n == 90) {
        return [filename("ninty.mp3")]
    } else if(n > 90 && n < 100) {
        return [filename("ninty.mp3")].concat(getfilesfordigits(n-90))
    } else if (n > 99 && n < 1000) {
        let hundreds = Math.floor(n/100)
        let remainder = n - (hundreds*100)
        let res = getfilesfordigits(hundreds)
        res.push(filename("hundred.mp3"))
        if(remainder > 0) {
            res.push(filename("and.mp3"))
            res = res.concat(getfilesfordigits(remainder))
        }
        return res
    } else if(n >= 1000 && n < 1000000) {
        let thousands = Math.floor(n/1000)
        let remainder = n - (thousands*1000)
        let res = getfilesfordigits(thousands)
        res.push(filename("thousand.mp3"))
        if(remainder > 0) {
            if(remainder < 100) {
                res.push(filename("and.mp3"))
            }
            res = res.concat(getfilesfordigits(remainder))
        }
        return res
    } else if(n >= 1000000) {
        let millions = Math.floor(n/1000000)
        let remainder = n - (millions*1000000)
        let res = getfilesfordigits(millions)
        res.push(filename("million.mp3"))
        if(remainder > 0) {
            if(remainder < 100) {
                res.push(filename("and.mp3"))
            }
            res = res.concat(getfilesfornumber(remainder))
        }
        return res
    }
}

function getfilesfornumber(n) {
    console.log(`enumerating ${n}`)
    let res = []

    if(n == 1) {
        res.push(filename("first.mp3"))
    } else if(n == 2) {
        res.push(filename("second.mp3"))
    } else if(n == 3) {
        res.push(filename("third.mp3"))
    } else if(n == 4) {
        res.push(filename("fourth.mp3"))
    } else if(n == 5) {
        res.push(filename("fifth.mp3"))
    } else if(n == 6) {
        res.push(filename("sixth.mp3"))
    } else if(n == 7) {
        res.push(filename("seventh.mp3"))
    } else if(n == 8) {
        res.push(filename("eighth.mp3"))
    } else if(n == 9) {
        res.push(filename("ninth.mp3"))
    } else if(n == 10) {
        res.push(filename("tenth.mp3"))
    } else if(n == 11) {
        res.push(filename("eleventh.mp3"))
    } else if(n == 12) {
        res.push(filename("twelth.mp3"))
    } else if(n == 13) {
        res.push(filename("thirteenth.mp3"))
    } else if(n == 14) {
        res.push(filename("fourteenth.mp3"))
    } else if(n == 15) {
        res.push(filename("fifteenth.mp3"))
    } else if(n == 16) {
        res.push(filename("sixteenth.mp3"))
    } else if(n == 17) {
        res.push(filename("seventeenth.mp3"))
    } else if(n == 18) {
        res.push(filename("eighteenth.mp3"))
    } else if(n == 19) {
        res.push(filename("ninteenth.mp3"))
    } else if(n == 20) {
        res.push(filename("twentieth.mp3"))
    } else if(n > 20 && n < 30) {
        res.push(filename("twenty.mp3"))
        res = res.concat(getfilesfornumber(n-20))
    } else if(n == 30) {
        res.push(filename("thirtieth.mp3"))
    } else if(n > 30 && n < 40) {
        res.push(filename("thirty.mp3"))
        res = res.concat(getfilesfornumber(n-30))
    } else if(n == 40) {
        res.push(filename("fourtieth.mp3"))
    } else if(n > 40 && n < 50) {
        res.push(filename("fourty.mp3"))
        res = res.concat(getfilesfornumber(n-40))
    } else if(n == 50) {
        res.push(filename("fiftieth.mp3"))
    } else if(n > 50 && n < 60) {
        res.push(filename("fifty.mp3"))
        res = res.concat(getfilesfornumber(n-50))
    } else if(n == 60) {
        res.push(filename("sixtieth.mp3"))
    } else if(n > 60 && n < 70) {
        res.push(filename("sixty.mp3"))
        res = res.concat(getfilesfornumber(n-60))
    } else if(n == 70) {
        res.push(filename("seventieth.mp3"))
    } else if(n > 70 && n < 80) {
        res.push(filename("seventy.mp3"))
        res = res.concat(getfilesfornumber(n-70))
    } else if(n == 80) {
        res.push(filename("eightieth.mp3"))
    } else if(n > 80 && n < 90) {
       res.push(filename("eighty.mp3"))
        res = res.concat(getfilesfornumber(n-80))
    } else if(n == 90) {
        res.push(filename("nintieth.mp3"))
    } else if(n > 90 && n < 100) {
        res.push(filename("ninty.mp3"))
        res = res.concat(getfilesfornumber(n-90))
    } else if(n >= 100 && n < 1000) {
        let hundreds = Math.floor(n/100);
        let remainder = n - (hundreds*100)
        res = res.concat(getfilesfordigits(hundreds))
        if(remainder == 0) {
            res.push(filename("hundredth.mp3"))
        } else {
            res.push(filename("hundred.mp3"))
            res.push(filename("and.mp3"))
            res = res.concat(getfilesfornumber(remainder))
        }
    } else if(n >= 1000 && n < 1000000) {
        let thousands = Math.floor(n/1000)
        let remainder = n - (thousands*1000)
        res = res.concat(getfilesfordigits(thousands))
        if(remainder == 0) {
            res.push(filename("thousandth.mp3"))
        } else {
            res.push(filename("thousand.mp3"))
            if(remainder < 100) {
                res.push(filename("and.mp3"))
            }
            res = res.concat(getfilesfornumber(remainder))
        }
    } else if(n >= 1000000) {
        let millions = Math.floor(n/1000000)
        let remainder = n - (millions*1000000)
        res = getfilesfordigits(millions)
        if(remainder == 0) {
            res.push(filename("millionth.mp3"))
        } else {
            res.push(filename("million.mp3"))
            if(remainder < 100) {
                res.push(filename("and.mp3"))
            }
            res = res.concat(getfilesfornumber(remainder))
        }
    } else { // Catch for errors - nth ;-)
        res.push(filename("nth.mp3"))
    }

    return res
}

function complaints() {
    return [
        {
            verb: "gather",
            input: ["digits"],
            dtmfBargein: true,
            numDigits: 1,
            timeout: 5,
            actionHook: "https://jambonz.emf2024.michaelcullen.name/complaints",
            play: {
                url: [
                        filename("complaints/complaints.mp3"),
                    ]
            }
        }
    ]
}

function menu() {
    return [
            {
                verb: "gather",
                input: ["digits"],
                dtmfBargein: true,
                numDigits: 1,
                timeout: 5,
                actionHook: "https://jambonz.emf2024.michaelcullen.name/dtmf",
                play: {
                    url: [
                        filename("menu/options.mp3"),
                        filename("menu/options1-3.mp3"),
                        filename("menu/4-complaints.mp3")
                        ],
                }
            }
        ]
}

app.post('/call', (req, res) => {
    console.log(`Incoming call from ${req.body.from} - name ${req.body.caller_name}`)
    db.get("SELECT COUNT(*) AS count FROM calls", (err, row) => {
        let n = row.count + 1;
        db.run("INSERT INTO calls (caller, callername) VALUES (?, ?)", [req.body.from, req.body.caller_name])
        res.json(
            [
                {
                    verb: "tag",
                    data: {
                        name: req.body.caller_name,
                        number: req.body.from,
                    }
                },
                {
                    verb: "play",
                    url: [filename("thankyou_you_are_caller.mp3")].concat(getfilesfornumber(n)).concat([filename("caller.mp3")])
                }
            ].concat(menu()))
    })
})

app.post('/dtmf', (req, res) => {
    let resp = []
    console.log("Digits: " + req.body.digits)
    db.run("INSERT INTO menuselection (caller, selection) VALUES(?,?)", [req.body.customerData?.number, req.body.digits])
    if(req.body.digits == '0') {
        resp.push({verb: "play", url: filename("menu/presszero.mp3")})
    } else if(req.body.digits == '1') {
        resp.push({verb: "play", url: filename("surprises/marvin04.mp3")})
    } else if(req.body.digits == '2') {
        resp.push({verb: "play", url: filename("surprises/marvin12.mp3")})
    } else if(req.body.digits == '3') {
        resp.push({verb: "play", url: filename("surprises/meowmix.mp3")})
    } else if(req.body.digits == '4') {
        res.json(resp.concat(complaints()))
        return
    } else if(req.body.digits == '5') {
        resp.push({verb: "play", url: filename("menu/optionmissing.mp3")})
    } else if(req.body.digits == '6') {
        resp.push({verb: "play", url: filename("menu/optionmissing.mp3")})
    } else if(req.body.digits == '7') {
        resp.push({verb: "play", url: filename("menu/optionmissing.mp3")})
    } else if(req.body.digits == '8') {
        resp.push({verb: "play", url: filename("menu/optionmissing.mp3")})
    } else if(req.body.digits == '9') {
        resp.push({verb: "play", url: filename("menu/optionmissing.mp3")})
    } else {
        resp.push({verb: "play", url: filename("menu/notadigit.mp3")})
    }
    res.json(resp.concat(menu()))
})

app.post('/complaints', (req, res) => {
    let resp = []
    console.log("Digits: " + req.body.digits)
    let complaint = 0
    if(req.body.digits == '0') {
        // main menu
        res.json(menu())
        return;
    } else if(req.body.digits == '1') {
        // complain about 7
        complaint = 7
    } else if(req.body.digits == '2') {
        // complain about 9
        complaint = 9
    } else if(req.body.digits == '3') {
        // complain about 4
        complaint = 4
    } else if(req.body.digits == '4') {
        // complain about 6
        complaint = 6
    } else if(req.body.digits == '5') {
        // complain about 8
        complaint = 8
    } else if(req.body.digits == '6') {
        // complain about 3
        complaint = 3
    } else if(req.body.digits == '7') {
        // complain about 1
        complaint = 1
    } else if(req.body.digits == '8') {
        // complain about 5
        complaint = 5
    } else if(req.body.digits == '9') {
        // complain about 2
        complaint = 2
    } else {
        resp.push({verb: "play", url: filename("menu/notadigit.mp3")})
        res.json(resp.concat(complaints()))
        return;
    }
    db.run("INSERT INTO complaints (caller, selection) VALUES(?,?)", [req.body.customerData?.number, complaint])
    resp.push({verb: "play", url: [filename("complaints/your-complaint-about.mp3"), getfilesfordigits(complaint), filename("complaints/filed.mp3")]})
    res.json(resp.concat(complaints()))
})

app.post('/status', (req, res) => {
    console.log("Status:\n" + req.body)
    res.status(202).end()
})

app.get('/stats', (req, res) => {
    db.get("SELECT COUNT(*) AS count, COUNT(DISTINCT caller) AS callers FROM calls", (err, row) => {
        db.get("SELECT COUNT(*) AS count FROM menuselection", (err, msrow) => {
            let calls = row.count
            let callers = row.callers
            let menuselections = msrow.count
            res.json({
                calls: calls,
                callers: callers,
                menuchoices: menuselections,
            })
        })
    })
})

app.get('/metrics', (req, res) => {
    db.get("SELECT COUNT(*) AS count, COUNT(DISTINCT caller) AS callers FROM calls", (err, row) => {
        let calls = row.count
        let callers = row.callers
        
        db.all("SELECT selection, COUNT(*) AS count FROM menuselection GROUP BY selection", (err, msrow) => {
            let selections = new Map()
            console.log(`got ${msrow.length} rows`)
            for(const r of msrow) {
                selections.set(r.selection, r.count)
            }

            let data = `# HELP phonetree_calls_total number of calls to the menu
# TYPE phonetree_calls_total counter
phonetree_calls_total{tree="emfcamp2024"} ${calls}

# HELP phonetree_callers_total number of distinct callers
# TYPE phonetree_callers_total counter
phonetree_callers_total{tree="emfcamp2024"} ${callers}

# HELP phonetree_menuselections_total number of menu selections
# TYPE phonetree_menuselections_total counter
`
            for(const [key, value] of selections) {
                data += `phonetree_menuselections_total{tree="emfcamp2024",selection="${key}"} ${value}\n`
            }

            data += "#HELP phonetree_complaints_total number of complaints\n"
            data += "#TYPE phonetree_complaints_total counter\n"

            db.all("SELECT selection, COUNT(*) AS count FROM complaints GROUP BY selection", (err, crow) => {
                 let complaints = new Map()
                 for(const r of crow) {
                    complaints.set(r.selection, r.count)
                }

                for(const [key, value] of complaints) {
                    data += `phonetree_complaints_total{tree="emfcamp2024",selection="${key}"} ${value}\n`
                }

                res.send(data)
            })
        })
    })
})

app.listen(port, () => {
    console.log(`EMF 2024 Stupid App listening on port ${port}`)
})
