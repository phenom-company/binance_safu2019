# Spider - Universal Scoring Solution for Crypto Industry

Binance SAFU Hackathon 2019

https://safu.phenom.team

## What is Spider?

Spider is a Сrypto scoring platform that allows checking if crypto wallet has ever been involved in transfers of illegally obtained funds and helps businesses to meet AML regulation requirements.

## Calculated metrics

**Score** - probability with which the funds from the current wallet balance are obtained illegally. 
 
**Historical score** - allows checking if wallet could possess illegally obtained funds in the past.

The score is calculated on the information about reported loss incidents.
Score evaluation is based on a database of approved cases of loss.
 
## Ecosystem Roles

### **1. Client**

  * Top up account balance
  * Request wallet scoring
  * From the web interface
  * Through the API
  * Request transaction flow

### **2. Contributor**

  * Submit the Case
  * Pass KYC  (otherwise case is automatically rejected in 12 hours)
  * Receive up to 85% of profit from each scoring request associated with the case

### **3. Arbitrator**

  * Designated and trained staff who review and maintain all reported cases from verified contributors

## For More Info Contact Us:

  * Alex Smirnov, Telegram: @phenom_alex, Email: alex@phenom.team
  * Web-site: www.phenom.team


### Copy and Paste

Copy all your files to your project folder and then,

``` bash
# go into app's directory
$ cd safu2019_client

# install app's dependencies
$ npm install
```

## Usage

``` bash
# serve with hot reload at localhost:8080
npm run serve

# build for production with minification
npm run build

# run linter
npm run lint

# run unit tests
npm run test:unit

# run e2e tests
npm run test:e2e
```
