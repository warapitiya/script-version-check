/**
 * Created by warapitiya on 2019-05-17.
 */

/**
 * Get WOGAA.js status
 * @param env
 * @param version
 * @returns {string}
 */
function getWogaaStatus(env, version) {
    var _v = ' v' + (version ? 1 : 2);
    return 'WOGAA.js ' + env.toLocaleUpperCase() + _v + ' is active.'
}

chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: 'ON_LOAD'}, function (response) {
        const statusSection = document.getElementById('statusSection');
        if (response.hasOwnProperty('success') && response.hasWogaa) {
            statusSection.classList.add('wog-green');
            statusSection.classList.remove('wog-lemon');
            document.getElementById('statusIcon').src = '../../svg/zap.svg';
            document.getElementById('wogaaText').innerText = getWogaaStatus(response.data.env, response.data.version);
            document.getElementById('wogaaVersion').innerText = '- ' + response.data.info.wogaaJSVersion;
            document.getElementById('wogaaRsid').innerText = '- ' + response.data.info.rsid;
            document.getElementById('wogaaDataLayerVersion').innerText = '- ' + response.data.info.dataLayerVersion;
            document.getElementById('wogaaSentimentsVersion').innerText = '- ' + response.data.info.sentiments;
        } else {
            statusSection.classList.add('wog-lemon');
            statusSection.classList.remove('wog-green');
            document.getElementById('statusIcon').src = '../../svg/alert-triangle.svg';
            document.getElementById('wogaaText').innerText = 'WOGAA.js is not active.';
            document.getElementById('wogaaVersion').innerText = '- none';
            document.getElementById('wogaaRsid').innerText = '- none';
            document.getElementById('wogaaDataLayerVersion').innerText = '- none';
            document.getElementById('wogaaSentimentsVersion').innerText = '- none';
        }
    });
});
