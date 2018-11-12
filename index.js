require('dotenv').config()
const accountSid = process.env.ACCOUNT_SID
const authToken = process.env.AUTH_TOKEN
const client = require('twilio')(accountSid, authToken)
const fetch = require('node-fetch')
const xmldoc = require('xmldoc')

function sendMessage (text) {
  client.messages
    .create({
      body: text,
      from: process.env.TWILIO_NUMBER,
      to: process.env.PHONE_NUMBER
    }, function(err, result){
      console.log('Created message using callback');
      console.log(result.sid)
      callback();
  })
}

async function getRiverData () {
  // This gets the XML file with the river data from USGS
  const riverData = await fetch('https://waterservices.usgs.gov/nwis/dv/?format=waterml,2.0&sites=09506000&siteStatus=all')
    .then(res => res.text())
    .catch(e => console.log(e))
  // This uses the xmldoc package to let us use the xmldoc API
  const riverDataXMLDoc = new xmldoc.XmlDocument(riverData)
  // This array gets the data points we need
  const flowDataArray = riverDataXMLDoc.childNamed('wml2:observationMember').childNamed('om:OM_Observation').childNamed('om:result').childNamed('wml2:MeasurementTimeseries').childrenNamed('wml2:point')

  // This is where we'll store the time and date values, as individual arrays
  let timeAndDateValues = []

  // Here we map over the data, pull out the time and value, and then push them into our array
  flowDataArray.map(element => {
    let time = element.childNamed('wml2:MeasurementTVP').valueWithPath('wml2:time')
    let value = element.childNamed('wml2:MeasurementTVP').valueWithPath('wml2:value')
    let pair = [time, value]
    timeAndDateValues.push(pair)
  })

  // This is the message we send in the text
  let message = 'Yo Andy!🤙🏼\n\nHere are the flow rates at White Bridge 🛶:\n'
  for (let value of timeAndDateValues) {
    message += `\n${value[0]}: ${value[1]}cfs`
  }
  sendMessage(message)
}

getRiverData()
