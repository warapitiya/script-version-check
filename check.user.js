// ==UserScript==
// @name         Check Wogaa.js version
// @namespace    https://wogaa.sg
// @version      0.1
// @description  try to take over the world!
// @author       wogaa.sg
// @match        *://*.sg/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var wogaaCheckBanner = document.createElement('div');
    wogaaCheckBanner.style.zIndex="999";
    wogaaCheckBanner.style.background="linear-gradient(#58A7F9, #0E7FF4)";
    wogaaCheckBanner.style.display="inline";
    wogaaCheckBanner.style.padding="10px";
    wogaaCheckBanner.style.position="absolute";
    wogaaCheckBanner.style.right="0px";
    wogaaCheckBanner.style.top="0px";
    wogaaCheckBanner.style.color="white";
    var scriptTag = document.querySelectorAll("script[src='https://assets.wogaa.sg/scripts/wogaa.js']");
    var isLaunch = scriptTag.length > 0;


    var wogaaLogo = document.createElement('img');
    wogaaLogo.src="https://wogaa.sg//client_assets/_/_/app/_components/Navbar/images/wogaa-nav-logo-26b8a76cf79ac5272333abaf68dbeb4b.png";
    wogaaLogo.style.height="20px";
    wogaaLogo.style.marginRight="5px";
    wogaaCheckBanner.appendChild(wogaaLogo);

    var versionString = "DTM";
    if (isLaunch) {
        var isV1 = scriptTag[0].async
        versionString = "WOGAA.JS Version: " + (isV1 ? "v1" : "v2");
    }
    var version = document.createElement('span');
    version.innerHTML = versionString;

    wogaaCheckBanner.appendChild(version);
    document.body.appendChild(wogaaCheckBanner);
})();
