const fs = require('fs')
     ,client = require('cheerio-httpcli');
let   link_update = JSON.parse(fs.readFileSync('./link.json','utf8'))
     ,link_option = []
     ,url,title,date;

Promise.resolve().then(()=>{
    return new Promise((resolve, reject)=>{
        (function loop(i=0){
            // rssがある場合はrssを取得
            url=link_update[i].rss ? link_update[i].rss : link_update[i].url;

            client.fetch(url,{},(err,$,res)=>{
                if(err) { console.log(err); return; }

                switch(link_update[i].no){
                    case 102:
                        // reactjs.org
                        title = $('h1').text().trim();
                        date = $('h1').parent().next().text().replace(/by.*$/,'');
                        break;
                    default:
                        // rss
                        title = $('item:nth-of-type(1)').find('title').text();
                        date = $('item:nth-of-type(1)').find('pubDate').text();
                        break;
                }

                link_option.push({title,date});

                if(link_update[i+1]){
                    loop(i+1);
                    return;
                }
                resolve();
            });
        })();
    });
}).then(()=>{
    link_update = link_update.map((obj,index)=>{
        obj.title=link_option[index].title;
        obj.date=link_option[index].date;
        return obj;
    });
    
    fs.writeFile('./link_update.json',JSON.stringify(link_update,undefined,1),err=>{
        if (err) { console.log(err); return; }
    });
});
