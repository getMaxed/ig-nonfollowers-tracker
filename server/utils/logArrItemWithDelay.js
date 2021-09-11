module.exports = (arr, timeout = 2000) =>
    arr.forEach(async (x, idx) => {
        (function(idx) {
            setTimeout(function() {
                console.log(`Item #${idx} ${x}`);
            }, timeout * (idx + 1));
        })(idx);
    });
