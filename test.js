let fs, request, cheerio, xlsx, url;
fs = require("fs");
request = require("request");
cheerio = require("cheerio");
xlsx = require("node-xlsx");
url = "http://quotes.money.163.com/f10/zycwzb_600519.html#01c01"

request(url, function (err, res, body) {
  if (!err && res.statusCode == 200) {
    let $ = cheerio.load(body)
    let data = [];
    const title = [];content = [];
    let titleRow = $('tr', '.limit_sale.scr_table').eq(0)
    titleRow = $('th', titleRow);
    titleRow.each( (i, elem) =>{
      title.push($(this).text().trim());
    });
    data.push(title)
    let contentRow = $('tr', '.limit_sale.scr_table').eq(11)
    contentRow = $('td', contentRow);
    contentRow.each((i, elem)=> {
      content.push($(this).text().trim());
    });
    data.push(content)
    let obj = [{
      name: "firstSheet",
      data: [data]
    }]
    fs.writeFileSync("贵州茅台净利润(扣除非经常性损益后).xlsx", xlsx.build(obj), "binary");
  } else {
    clonsole.log(err);
  }
})