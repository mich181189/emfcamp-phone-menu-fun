const mqtt = require("mqtt")
const client = mqtt.connect("mqtt://mqtt.emf.camp")

function toFarenheit(c) {
    return ((c*9)/5) + 32
}

let lastWeather = null;

client.on("connect", () => {
    let sub = (topic) => {
        client.subscribe("emf/weather", (err) => {
        if(err) {
            console.log("Error subscribing to " + topic + err)
        }
    })
    }

    sub("emf/weather");
});

client.on("message", (topic, message) => {
    if(topic == "emf/weather") {
        let data = JSON.parse(message);
        lastWeather = data
    } else {
        console.log("Unexpected topic ", topic, " message:" + message)
    }
})

function weather2text(res) {
    res.json([
        {
          "verb": "gather",
          "actionHook": "https://jambonz.emf2024.michaelcullen.name/weather_result",
          "input": ["digits"],
          "dtmfBargein": true,
          "numDigits": 1,
          "timeout": 5,
          "say": {
            "text": "Welcome to the EMF Camp Weather Hotline. For temperatures in degrees celsius, press 1. For temperatures in Farenheit, press 2. For temperatures in Kelvin, press 3. For temperatures in Rankine, press 4.",
          }
        }])
}

function roundNum(n) {
    return Math.round(n*100)/100
}

function roundNum1(n) {
    return Math.round(n*10)/10
}

function getDigitsCelsius() {
    return {
        tempin: roundNum(lastWeather.tempin),
        temp: roundNum(lastWeather.temp),
        humidityin: lastWeather.humidityin,
        humidity: lastWeather.humidity,
    }
}

function getDigitsFarenheit() {
    return {
        tempin: roundNum(toFarenheit(lastWeather.tempin)),
        temp: roundNum(toFarenheit(lastWeather.temp)),
        humidityin: lastWeather.humidityin,
        humidity: lastWeather.humidity,
    }
}

function getDigitsKelvin() {
    return {
        tempin: roundNum(lastWeather.tempin+273.15),
        temp: roundNum(lastWeather.temp+273.15),
        humidityin: lastWeather.humidityin,
        humidity: lastWeather.humidity,
    }
}

function getDigitsRankine() {
    return {
        tempin: roundNum(toFarenheit(lastWeather.tempin)+491.67),
        temp: roundNum(toFarenheit(lastWeather.temp)+491.67),
        humidityin: lastWeather.humidityin,
        humidity: lastWeather.humidity,
    }
}

function weather_response(res, digits) {
    if(lastWeather == null) {
        res.json(
                {
                    "verb": "say",
                    "text": "Sorry, There is no weather data available at this time.",
                }
            )
        return;
    }

    console.log("Digits are " + digits)

    let numbers = null;
    let units = null;
    if(digits == '1') {
        numbers = getDigitsCelsius()
        units = "degrees celsius"
    } else if(digits == '2') {
        numbers = getDigitsFarenheit()
        units = "degrees Farenheit"
    } else if(digits == '3') {
        numbers = getDigitsKelvin()
        units = "kelvin"
    } else if(digits == '4') {
        numbers = getDigitsRankine()
        units = "degrees Rankine"
    } else {
        numbers = getDigitsCelsius()
        units = "degrees celsius"
    }

    windDir = (deg) => {
        console.log("Calculating wind direction for " + deg)
        if(deg < 22.5) {
            return "north"
        } else if(deg < 67.5) {
            return "north-east";
        } else if(deg < 102.5) {
            return "east"
        } else if(deg < 157.5) {
            return "south-east"
        } else if(deg < 202.5) {
            return "south"
        } else if(deg < 247.5) {
            return "south-west"
        } else if(deg < 292.5) {
            return "west"
        } else if(deg < 337.5) {
            return "north-west"
        } else {
            return "north"
        }
    }

    res.json([
                {
                    "verb": "say",
                    "text": "The temperature in HQ is currently " + numbers.tempin + " " + units + ". The temperature outside is currently " + numbers.temp + " " + units + ". " +
                    "Relative humidity inside HQ is currently " + numbers.humidityin + " percent. Outside, it is " + numbers.humidity + " percent. " +
                    "Wind is blowing from the " + windDir(lastWeather.winddir) + " at " + roundNum1(lastWeather.windspeed*3.6) + " kilometers per hour" + " with gusts of " + roundNum1(lastWeather.windgust*3.6) + " kilometers per hour. " +
                    "Data is provided by the EMF Weather Center. Units may be guesses based on the numbers, because the documentation is wrong",
                },
                { "verb": "hangup" }
            ])
}


exports.weather2text = weather2text
exports.weather_response = weather_response