let fs, request, cheerio, xlsx, url;
fs = require("fs");
request = require("request");
cheerio = require("cheerio");
xlsx = require("node-xlsx");
url = "http://quotes.money.163.com/f10/zycwzb_600519.html#01c01"


request(url, function (err, res, body) {
  if (!err && res.statusCode == 200) {
    let $ = cheerio.load(body)
    let forEach = (row, data) => {
      row.each(function (i, elem) {
        data.push($(this).text().trim());
      });
    }
    const title = [],content = [];
    let titleNameRow = $('tr', '.limit_sale').eq(0).find('th')
    forEach(titleNameRow, title)
    let titleRow = $('tr', '.limit_sale.scr_table').eq(0).find('th')
    forEach(titleRow, title)
    let contentNameRow = $('tr', '.limit_sale').eq(11).find('td')
    forEach(contentNameRow, content)
    let contentRow = $('tr', '.limit_sale.scr_table').eq(11).find('td')
    forEach(contentRow, content)
    let obj = [{
      name: "firstSheet",
      data: [title, content]
    }]
    fs.writeFileSync("净利润(扣除非经常性损益后).xlsx", xlsx.build(obj), "binary");
  } else {
    clonsole.log(err);
  }
})