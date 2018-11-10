# text-me-riverflow

A small serverless function that will text you with riverflow rates. We used it inside a [Twilio Function](https://www.twilio.com/functions) so that it sends you the rates in a text using their [SMS API](https://www.twilio.com/docs/sms/api). 😊

## Motivation

A friend of mine likes to go kayaking 🛶but only when the river is flowing. So I showed him how to get that data and send it to his phone.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development.

1. Clone the project locally
2. Run `npm install`
3. Create a `.env` file based off the `example.env` and add your variables.
4. Run `node index.js` and see if you get a text 😄

### Prerequisites

To run this, you need the following:

```bash
node v10.5
npm v6.4
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Twilio](http://www.twilio.com) - for hosting our function and sending the text
* [USGS Water Service API](https://waterservices.usgs.gov/) - to get the flow data


## Acknowledgments

* Thank you everyone on Twitter for the encouragement 🙌🏼
