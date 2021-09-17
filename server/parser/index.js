const fs = require('fs');
const util = require('util');
const _difference = require('lodash/difference');
const logArrItemWithDelay = require('../utils/logArrItemWithDelay');

util.inspect.defaultOptions.maxArrayLength = null;

/*
|--------------------------------------------------------------------------
| SORTER
|--------------------------------------------------------------------------
*/

// (async () => {
//     const entries = fs
//         .readFileSync(`./parser/sorter`)
//         .toString()
//         .split('\n')
//         .map(x => x.split(' ')[1])
//         .sort();

//     fs.writeFileSync(
//         './parser/OUTPUT-sorted',
//         entries.map((u, idx) => `${idx + 1}. ${u}`).join('\n')
//     );

//     console.log({ entries });
// })();

// return;

(async () => {
    const followers = getProfiles('followers');
    const following = getProfiles('following');

    const nonFollowers = _difference(following, followers);

    console.log({ 'I Follow': following.length });
    console.log({ 'Follow Me': followers.length });
    console.log({ 'Non Followers': nonFollowers.length });

    // console.log({ following });
    // console.log({ followers });
    // console.log({ nonFollowers });

    fs.writeFileSync(
        './parser/OUTPUT-unfollowers',
        nonFollowers.map((u, idx) => `${idx + 1}. ${u}`).join('\n')
    );
    // return;
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

    for (let i = 0; i < entries.length; i++) {
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
        if (asdf[x.length]) {
            ++asdf[x.length];
        } else {
            asdf[x.length] = 1;
        }
    });

    // console.log(profiles);

    // logArrItemWithDelay(profiles, 2000);

    return profiles.map(x => x[1] && x[1].replace('\r', ''));

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
