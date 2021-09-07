const fs = require('fs');
const util = require('util');
const _difference = require('lodash/difference');

util.inspect.defaultOptions.maxArrayLength = null;

(async () => {
    const followers = getProfiles('followers');
    return;

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
    // return console.log('get profiles');
    const START_OF_NEW_PROF = 's profile picture';
    const entries = fs
        .readFileSync(`./parser/${type}`)
        .toString()
        .split('\n')
        .filter(s => s !== '·\r')
        .filter(s => s.indexOf('Verified') === -1); // trg: handle THIS

    // console.log({ entries, entriesLen: entries.length });
    // return;

    const profiles = [];
    let currProfile = [];

    for (let i = 1; i < entries.length; i++) {
        if (i === entries.length - 1) {
            profiles.push(currProfile);
        }
        // if (i % 3 === 0) {
        if (entries[i].indexOf(START_OF_NEW_PROF) > 0) {
            profiles.push(currProfile);
            currProfile = [entries[i]];
        } else {
            currProfile.push(entries[i]);
        }
    }

    // console.log(profiles, profiles.length);

    const asdf = {};

    profiles.forEach(async (x, idx) => {
        // (function(idx) {
        //     setTimeout(function() {
        //         console.log(x.length);
        //     }, 300 * (idx + 1));
        // })(idx);

        if (asdf[x.length]) {
            ++asdf[x.length];
        } else {
            asdf[x.length] = 1;
        }
    });

    console.log({
        aaa: profiles.length,
        first: profiles[0],
        last: profiles[profiles.length - 1]
    });

    const erty = profiles.map(x => x[1].replace('\r', ''));
    console.log({ erty });

    return;

    // let n = 0;

    // console.log({ entries });

    // while (n !== entries.length) {
    //     const asdfg = entries[n + 2].slice(0, 18).replace(/\n|\r/g, '');
    //     console.log({ asdfg });

    //     const profileRows =
    //         entries[n + 2].slice(-18).replace(/\n|\r/g, '') ===
    //         START_OF_NEW_PROF
    //             ? 2
    //             : 3;

    //     console.log({ profileRows });

    //     if (n === 0) {
    //         profiles.push(
    //             entries[n + 1] &&
    //                 entries[n + 1].slice(-18).replace(/\n|\r/g, '')
    //         );
    //     }

    //     n = n + profileRows;
    //     profiles.push(
    //         entries[n + 1] && entries[n + 1].slice(-18).replace(/\n|\r/g, '')
    //     );
    // }

    // consoleLogWithEnd(`${type.toUpperCase()} count: ${profiles.length}`);
    // return profiles.filter(x => !!x);
}

function consoleLogWithEnd(...lines) {
    lines.forEach(l => console.log(l));

    console.log('.....................................');
    console.log('.....................................');
    console.log('.....................................');
    console.log('.....................................');
}
