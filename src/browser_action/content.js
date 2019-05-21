/**
 * Created by warapitiya on 2019-05-17.
 */

var wogaaStgUrl = 'https://assets.dcube.cloud/scripts/wogaa.js';
var wogaaProdUrl = 'https://assets.wogaa.sg/scripts/wogaa.js';

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    /**
     * Get all WOGAA info
     * @param _payload
     */
    function getAllInfo(_payload) {
        document.addEventListener('wogaa:debug:getInfo', function (e) {
            if (e.detail !== undefined) {
                _payload.data.info = e.detail;
                sendResponse(_payload);
            }
        });

        var _script = `
            (function () {
                var _values = {
                    wogaaJSVersion: window.wogaaCustom.wogaaJSVersion,
                    rsid: window.wogaaCustom.siteInfo.siteRSID,
                    dataLayerVersion: window.wogaaCustom.datalayer.version,
                    sentiments: window.wogaaCustom.sentiments ? window.wogaaCustom.sentiments._version : null,
                };
    
                document.dispatchEvent(new CustomEvent('wogaa:debug:getInfo', {
                    detail: _values
                }));
            })();
            
        `;

        injectScript(_script);
    }

    /**
     * Inject event dispatch
     * @param _scriptTxt
     */
    function injectScript(_scriptTxt) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.textContent = _scriptTxt;
        head.appendChild(script);
        script.onload = function () {
            script.remove();
        };
    }

    if (request.action === 'ON_LOAD') {
        var scriptList = Array.from(document.head.querySelectorAll('script'))
            .reduce((group, i) => {
                if (i.src && i.src !== "") {
                    group[i.src] = i;
                    return group;
                }
                return group;
            }, {});

        if (scriptList[wogaaStgUrl]) {
            getAllInfo({
                data: {
                    enable: true,
                    env: 'stg',
                    version: scriptList[wogaaStgUrl].async,
                    info: {}
                },
                hasWogaa: true,
                success: true
            });
        } else if (scriptList[wogaaProdUrl]) {
            getAllInfo({
                data: {
                    enable: true,
                    env: 'prod',
                    version: scriptList[wogaaProdUrl].async,
                    info: {}
                },
                hasWogaa: true,
                success: true
            });
        } else {
            sendResponse({
                data: {},
                hasWogaa: false,
                success: true
            })
        }
    }
});

