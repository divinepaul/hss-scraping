![No longer maintained](https://img.shields.io/badge/Maintenance-OFF-red.svg)
## [DEPRECATED] This repository is no longer maintained

# hss-scraping

A simple nodejs project for scraping marks of dhss students using puppeteer and nodejs.

## Installation

Please create a .env file and insert your firbase credentials inorder for this to work.
or you cannot use the db_helper

```bash
npm install
```

## Usage

````js
const Scraper = require("./scraping/scraper.js");
const DatabaseHelper = require('./db_helper/dbhelper.js');

let scraper = new Scraper();
let dbHelper = new DatabaseHelper();


(async()=>{


  await scraper.init();
  
  await scraper.navigateToSchoolCode("07087");

  await scraper.scrape();

  await dbHelper.insertIntoDb("ernakulam","07087",scraper.studentData);
  
  await scraper.disposeScraper();



})();

````
