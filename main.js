
const Scraper = require("./scraping/scraper.js");
const DatabaseHelper = require('./db_helper/dbhelper.js');


let scraper = new Scraper();
let dbHelper = new DatabaseHelper();


(async()=>{

  await scraper.init();
  await scraper.navigateToSchoolCode("07087");
  await scraper.scrape();

  scraper.studentData

})();
