const x = require('x-ray-scraper');
const axios = require('axios');
const fs = require('fs');

const channelSelector =
    'body > div.content-bg > div > div.main > div.content > div > div.section.group.example > div';

const scriptSelectorMp3 =
    'body > div.content-bg > div > div > div.content > div > div > div.single > div.para > div > span > sup > script:nth-child(3)';
const scriptSelectorHls =
    'body > div.content-bg > div > div > div.content > div > div > div.single > div.para > div > span > sup > script:nth-child(2)';

async function scrapeStations() {
    return new Promise((resolve, reject) => {
        x('https://radiosindia.com/malayalamradio.html', channelSelector, [
            {
                img: 'a >img@src',
                name: 'a > p',
                url: x('a@href', { scriptSelectorMp3, scriptSelectorHls }),
            },
        ])
            .then(async results => {
                const data = results.map(r => {
                    url = r.url.scriptSelectorMp3 || r.url.scriptSelectorHls;

                    return {
                        ...r,
                        url: url?.trim().match(`file:"(.*)",`)[1],
                    };
                });

                resolve(data);
            })
            .catch(reject);
    });
}

async function downloadImage(url) {
    const fileName = url.split('/').pop();
    console.log(fileName);

    const response = await axios.get(url, {
        responseType: 'arraybuffer',
    });

    fs.writeFileSync(`./public/stations/${fileName}`, response.data);

    return `/stations/${fileName}`;
}

async function updateStations() {
    try {
        const stations = await scrapeStations();

        fs.rmdirSync('./public/stations/', { recursive: true });
        fs.mkdirSync('./public/stations/');

        const dataPromise = stations
            .filter(station => station.url)
            .map(async station => {
                const filePath = await downloadImage(station.img);
                return {
                    ...station,
                    img: filePath,
                };
            });

        const data = await Promise.all(dataPromise);

        fs.writeFileSync(
            'src/data/stations.js',
            `export const stationList = ${JSON.stringify(data)}`
        );
    } catch (error) {
        console.log(error);
    }
}

updateStations();
