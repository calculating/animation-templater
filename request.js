var request = require('request');
var fs = require('fs');
const { render } = require('@nexrender/core')
request('https://gfx.place/file.json', function (error, response, body) {
  if (!error && response.statusCode == 200) {
     var importedJSON = JSON.parse(body);
     console.log(importedJSON);
     console.log('|')
     const fileName = './job.json';
	 const file = require(fileName);
	 console.log(file.template.src);
	 console.log('|')
	 file.template.src = "https://gfx.place/" + importedJSON.template + ".aep";
	 file.assets[0].value = importedJSON.text;
	 fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
	   if (err) return console.log(err);
	 });
     console.log(JSON.stringify(file));
     console.log('|')
	 console.log('wrote job file');
	 console.log('|')
	 console.log('rendering')
	 console.log('|')

	 const main = async () => {
    	const result = await render(file);
    	console.log('---FINISHED RENDER NOW UPLOADING---');
        uploadFile();
	 }
	 main().catch(console.error);

  }
})

const {Storage} = require('@google-cloud/storage');
const express = require("express");

const app = new express();


const storage = new Storage({
    keyFilename: "./quicktemplate-ba238-firebase-adminsdk-klbii-2455b24c93.json",
 });

let bucketName = "gs://quicktemplate-ba238.appspot.com";

let filename = 'myresult.mp4';


//var admin = require("firebase-admin");


// Testing out upload of file
const uploadFile = async() => {

    // Uploads a local file to the bucket
    await storage.bucket(bucketName).upload(filename, {
        // Support for HTTP requests made with `Accept-Encoding: gzip`
        gzip: true,
        // By setting the option `destination`, you can change the name of the
        // object you are uploading to a bucket.
        metadata: {
            // Enable long-lived HTTP caching headers
            // Use only if the contents of the file will never change
            // (If the contents will change, use cacheControl: 'no-cache')
            cacheControl: 'public, max-age=31536000',
        },
});

console.log(`${filename} uploaded to ${bucketName}.`);
console.log(`view at: https://firebasestorage.googleapis.com/v0/b/quicktemplate-ba238.appspot.com/o/${filename}?alt=media`)
fs.unlinkSync(filename)
}

app.listen(process.env.PORT || 8088, () => { console.log('node server running'); console.log('|');})