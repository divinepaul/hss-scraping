const puppeteer = require('puppeteer');
var readlineSync = require('readline-sync');

(async () => {
  let studentData = [];
  const browser = await puppeteer.launch();
  let page = await browser.newPage();
  await page.goto('http://keralaresults.nic.in/');
  await page.goto("http://keralaresults.nic.in/dhsefy193k7sam/dhsefy.htm");
  await page.goto("http://keralaresults.nic.in/dhsefy193k7sam/swr_dhsefy.htm");

  var ele = await page.$('input[name=treg]');
  await ele.click();
  await page.keyboard.type('07037');
  await page.keyboard.press("Enter");
  await page.waitFor(5000);
  let strippedData = await page.evaluate(()=>{
    let students = [];

    let data1 = document.querySelectorAll("tr");
    

    data1.forEach(
      (item)=>{
        students.push(item.innerText);
        
      }
    )
    
    
    return students;
  });



  strippedData.forEach((stud)=>{

    var arr = stud.split("\t");
    studentData.push(arr);
    
  });

  studentData.pop();
  studentData.splice(0,7);

  console.log(studentData[studentData.length-1]);


  await browser.close();

})();