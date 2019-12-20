const puppeteer = require('puppeteer');

class Scraper {

    constructor() {
        this.page = null;
        this.studentData = null;
        this.schoolCode = null;
    }

    async init() {

        this.browser = await puppeteer.launch();

        this.page = await this.browser.newPage();

        console.log("Init complete, browser window ready.");


    }

    async navigateToSchoolCode(schoolCode) {
        // i belive keralaresults.nic.in checks if the user visited the home page before querying marks.
        // thats why pupetter is used and these three links will navigate to the result page
        // like a normal user
        this.schoolCode = schoolCode;

        if (!this.page) {
            throw "Exception : please call init() method befor this method";
        }

        await this.page.goto('http://keralaresults.nic.in/');
        await this.page.goto("http://keralaresults.nic.in/dhsefy193k7sam/dhsefy.htm");
        await this.page.goto("http://keralaresults.nic.in/dhsefy193k7sam/swr_dhsefy.htm");

        // finding the input tag to enter the school code
        var ele = await this.page.$('input[name=treg]');

        // clicking the element
        await ele.click();

        // inserting the values into the input tag
        await this.page.keyboard.type(String(schoolCode));

        // submiting the result by pressing the ENTER key manually.
        await this.page.keyboard.press("Enter");


        // the execution is paused for 5 seconds becuase the result being is fetched and then displayed.
        await this.page.waitFor(5000);

        console.log("Navigated to the result of : " + this.schoolCode);


    }


    async scrape() {

        if (!this.schoolCode) {
            throw "Exception : Please call the navigateToSchoolCode() method before this method"
        }

        // using the evaluvate method to naviagate the DOM and to scrape the data.
        // the !GLOBAL variable contains the current queried student data.
        this.studentData = await this.page.evaluate(() => {

            // this array contains the raw innerText of the students.
            let strippedData = [];

            // the clean student data is in this array.
            let students = [];

            // all the <tr> tags of the page are queried.
            let data = document.querySelectorAll("tr");

            // the inner text of all <tr> is inserted into the strippedData array.
            data.forEach(
                (item) => {

                    strippedData.push(item.innerText);

                }
            )

            // for each of the strippedData
            strippedData.forEach((stud) => {
                // the individual columns are padded with \t in the website
                // so the split method is used on the array.
                var arr = stud.split("\t");

                // and the clean formateed array is pushed into the students array.
                students.push(arr);

            });
            // the last <tr> element of the page contains info that is not required.
            students.pop();
            // and the first 7 elements also contain usesless info the like the column name and 
            // school name.
            students.splice(0, 7);

            // the 2D array containing all the student data is returned.
            return students;

        });

        console.log("Scaping complete.");

    }



    // used to close the headless browser
    async disposeScraper() {
        await this.browser.close();
    }
    // getter to return 2D array.
    get results() {

        if (!this.studentData) {
            return this.studentData;

        } else {
            throw "Exception : Please call scrape function()"
        }
    }



}

module.exports = Scraper;