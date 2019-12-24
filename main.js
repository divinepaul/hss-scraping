const Scraper = require("./scraping/scraper.js");
const DatabaseHelper = require('./db_helper/dbhelper.js');

const schoolData = require('./school_data/schooldata.js');

let scraper = new Scraper();
let dbHelper = new DatabaseHelper();


(async()=>{


  await scraper.init();


  // schoolData.forEach((districts,i)=>{

  //   dbHelper.db.collection("tasks").doc(String(districts.district)).set(districts);

  // })

  
  
  await scraper.navigateToSchoolCode("07087");

  await scraper.scrape();

  await dbHelper.insertIntoDb("ernakulam","07087",scraper.studentData);
  
  await scraper.disposeScraper();



})();
