const fs = require('fs');
const util = require('util');
const _difference = require('lodash/difference');

util.inspect.defaultOptions.maxArrayLength = null;

(async () => {
    const followers = getProfiles('followers');
    const following = getProfiles('following');

    const target = _difference(following, followers);
    console.log({ 'Non Followers List': target });

    fs.writeFileSync(
        'non-followers',
        target.map((u, idx) => `${idx + 1}. ${u}`).join('\n')
    );
})();

/*
|--------------------------------------------------------------------------
| HELPERS
|--------------------------------------------------------------------------
*/

function getProfiles(type) {
    return console.log('get profiles');
    const START_OF_NEW_PROF = 's profile picture';
    const entries = fs
        .readFileSync(`./parser/${type}`)
        .toString()
        .split('\n')
        .filter(s => s.indexOf('Verified') === -1);

    const profiles = [];
    let n = 0;

    console.log({ entries });

    while (n !== entries.length) {
        const asdfg = entries[n + 2].slice(0, 18).replace(/\n|\r/g, '');
        console.log({ asdfg });

        const profileRows =
            entries[n + 2].slice(-18).replace(/\n|\r/g, '') ===
            START_OF_NEW_PROF
                ? 2
                : 3;

        console.log({ profileRows });

        if (n === 0) {
            profiles.push(
                entries[n + 1] &&
                    entries[n + 1].slice(-18).replace(/\n|\r/g, '')
            );
        }

        n = n + profileRows;
        profiles.push(
            entries[n + 1] && entries[n + 1].slice(-18).replace(/\n|\r/g, '')
        );
    }

    consoleLogWithEnd(`${type.toUpperCase()} count: ${profiles.length}`);
    return profiles.filter(x => !!x);
}

function consoleLogWithEnd(...lines) {
    lines.forEach(l => console.log(l));

    console.log('.....................................');
    console.log('.....................................');
    console.log('.....................................');
    console.log('.....................................');
}
