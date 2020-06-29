const fs = require('fs');
console.log(__dirname);

fs.readFile(__dirname + '/data/data.json', 'utf8', function (err, data)  {
    console.log('reading json file');
    if (err) {
        console.log('could not read json file');
        writeJson();
        return
    }
    const _data = JSON.parse(data);
    console.log('json is ok, user: ', Object.keys(_data.users), 'schedule.length: ', _data.schedule.length);

});

function writeJson() {
    const dir =     __dirname + '/data';
    if (!fs.existsSync(dir)){
        console.log('creating data folder at ', dir);
        fs.mkdirSync(dir);
    }

    fs.writeFile(__dirname + '/data/data.json', JSON.stringify({schedule: [], users: {}}), function (err) {
        if (err) return console.log(err);
        console.log('creating data.json', dir);

    });
}
/**
 *
 git add .
 git commit -m "msg."
 git push heroku master

 */

