var fetchApi;
if (
    ("function" === typeof fetch &&
        (fetchApi =
            "undefined" !== typeof global && global.fetch
                ? global.fetch
                : "undefined" !== typeof window && window.fetch
                  ? window.fetch
                  : fetch),
    "undefined" !== typeof require && "undefined" === typeof window)
) {
    var f = fetchApi || require("cross-fetch");
    f.default && (f = f.default),
        (exports.default = f),
        (module.exports = exports.default);
}
