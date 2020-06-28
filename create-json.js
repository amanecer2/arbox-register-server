const fs = require('fs');
console.log(__dirname);

fs.readFile(__dirname + '/data/data.json', 'utf8', function (err, data)  {
    if (err) {
        writeJson();
    }
});

function writeJson() {
    fs.writeFile(__dirname + '/data/data.json', JSON.stringify({schedule: [], users: {}}), function (err) {
        if (err) return console.log(err);
    });
}
/**
 *
 git add .
 git commit -m "msg."
 git push heroku master

 */

