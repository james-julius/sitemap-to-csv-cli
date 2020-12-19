const Sitemapper = require('sitemapper')
const { convertArrayToCSV } = require('convert-array-to-csv')
const stringify = require('csv-stringify')
const fs = require('fs')


/** Package features:
 ********************
 *  * Multiple inputs
 *  * Timer between multiple starts
 *  * input filename
 *  * cli for input url + filename
 */

const csvHeader = ['url'];


const sitemapper = new Sitemapper();
sitemapper.timeout = 5000;


sitemapper
  .fetch("https://sunbasket.com/sitemap.xml")
  // Needs to be in array format for the stringify function to work
  .then(({ url, sites }) => {
    for (let n = 0; n < sites.length; n++) {
      console.log("Processing url #" + n);
      sites[n] = [sites[n]];
    }
    stringify(sites, (err, output) => {
      fs.writeFile(
        "sunbasket-sitemap.csv",
        output,
        "utf8",
        (err) => {
          if (err) {
            console.log(
              "Some error occured - file either not saved or corrupted file saved."
            );
          } else {
            console.log("It's saved!");
          }
        }
      );
    });
    console.log(`url:${url}`);
  })
  .catch((error) => console.log(error));