const x = require('x-ray-scraper');
const fs = require('fs');

const channelSelector =
    'body > div.content-bg > div > div.main > div.content > div > div.section.group.example > div';

const scriptSelectorMp3 =
    'body > div.content-bg > div > div > div.content > div > div > div.single > div.para > div > span > sup > script:nth-child(3)';
const scriptSelectorHls =
    'body > div.content-bg > div > div > div.content > div > div > div.single > div.para > div > span > sup > script:nth-child(2)';

x('https://radiosindia.com/malayalamradio.html', channelSelector, [
    {
        image: 'a >img@src',
        name: 'a@href',
        url: x('a@href', { scriptSelectorMp3, scriptSelectorHls }),
    },
]).then(results => {
    const x = results.map(r => {
        url = r.url.scriptSelectorMp3 || r.url.scriptSelectorHls;

        return {
            ...r,
            url: url?.trim().match(`file:"(.*)",`)[1],
        };
    });
    fs.writeFileSync(
        'src/data/stations.js',
        `export const stationList = ${JSON.stringify(x)}`
    );
});
