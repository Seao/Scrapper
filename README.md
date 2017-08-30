# Scrapper

<img src="https://travis-ci.org/Seao/scrapper.svg?branch=master" />

> Simple Web Scraping REST API

## History

I used YQL (Yahoo Query Language) a long time ago for reading information out of html pages. However according to [YQL Terms of Use](https://policies.yahoo.com/us/en/yahoo/terms/product-atos/yql/index.htm) recently updated, html table used is no longer supported. This situation createad unexpected behavior with side effects on my old applications, so I decided to implement a similar service to support them.

## Installation

### Local

```bash
git clone https://github.com/Seao/scrapper.git
cd scrapper
npm install
npm start
```

Application should be served at [localhost:5000](http://localhost:5000)

## How it works

Quite simply in fact! When the node application is served, the root route can be used to extract content from web pages using a specified xpath. Core functionality was developed thanks to [this answer](https://stackoverflow.com/a/25971812).

The following steps are executed behind the scene:

- Request HTML at the url specified
- Parse HTML with parse5 (Though it's fast enough and W3C-compiant, result is not DOM)
- Serialize it to XHTML with xmlserializer (It accepts DOM-like structures of parse5 as input)
- Parse that XHTML again with xmldom (We finally have that DOM)
- Execute xpath queries using xpath library builds upon xmldom

> Note:  Be aware that XHTML has its own namespace, and queries like //a won't work. You **must** user namespace ```x``` in you xpath, as in the example below. 

### Example

GET request on ```http://localhost:5000/?url=http://www.google.fr&xpath=//x:div[@id=%22hplogo%22]``` will return :

```json
{
  "error":false,
  "status":200,
  "body":"<div style=\"height:110px;width:276px;background:url(/images/branding/googlelogo/1x/googlelogo_white_background_color_272x92dp.png) no-repeat\" title=\"Google\" align=\"left\" id=\"hplogo\" onload=\"window.lol&amp;&amp;lol()\" ><div style=\"color:#777;font-size:16px;font-weight:bold;position:relative;top:70px;left:218px\" nowrap=\"\">France</div></div>"
}
```

### Errors handling

If there is an error during the process (xpath or url params missing, invalid url, html parsing error, invalid xpath, ...) the request will return a status 500 and a response with the following pattern :

```json
{
  "error":"some explanations here..."
}
```
