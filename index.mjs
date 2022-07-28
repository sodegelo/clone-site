 
import { exit } from 'process';
import scrape from 'website-scraper';
import PuppeteerPlugin from 'website-scraper-puppeteer';
import path from 'path';

const  site     = process.argv[2];
const  folder   = process.argv[3]; 
let  time     = process.argv[4] || 5; 
let   hasTimeout  = true;

if(time === 'none'){
    time = 1;
    hasTimeout= false;
}

if(!validate(site,folder,time)){
    exit(0);
}

 
const timeout = (time*60)*1000;
console.log("\x1b[34m", "Processing:          ");  
console.log("\x1b[33m", "  Clonning:          ","\x1b[37m",site  );  
console.log("\x1b[33m", "  To Folder:         ","\x1b[37m",folder ); 
console.log("\x1b[33m", "  Max Execution:   ","\x1b[37m",time,"\x1b[33m","Min") ;
console.log("\x1b[33m", ""); 
console.log("\x1b[33m", ""); 
console.log("\x1b[34m", "Clonning. Wait ...");  


console.log("\x1b[37m", "");  

if(hasTimeout){
    setTimeout(async () => {
        exit(0);
    }, timeout);
}


await scrape({
    urls: [site],
    directory:folder ,
    plugins: [
        new PuppeteerPlugin({
        
        launchOptions: { headless: true }, /* optional */
        scrollToBottom: { timeout: 10000, viewportN: 10 }, /* optional */
        blockNavigation: true, /* optional */
        })
    ]
});


function validate(site,folder,time) {
    if(site === undefined || site === ''|| site === null) return false;
    if(folder === undefined || folder === ''|| folder === null) return false;
    if(time === undefined ||  time <= 0 || time === null) return false;
    return true; 
}