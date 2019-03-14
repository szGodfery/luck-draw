window.onresize = adjuest;
adjuest();
function adjuest() {
	if(!!navigator.userAgent.match(/AppleWebKit.*Mobile.*/)) {
		document.querySelector("meta[name=viewport]") || (viewport = document.createElement('meta'), document.getElementsByTagName('head')[0].appendChild(viewport), viewport.setAttribute('name', 'viewport'), viewport.setAttribute('content', 'width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=0' + (navigator.userAgent.indexOf('Android') > -1 ? ',target-densitydpi=device-dpi' : '')));
	}
	document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
}