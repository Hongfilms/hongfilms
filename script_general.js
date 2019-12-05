(function(){
	var script = {
 "mouseWheelEnabled": true,
 "scrollBarOpacity": 0.5,
 "start": "this.init()",
 "overflow": "hidden",
 "defaultVRPointer": "laser",
 "height": "100%",
 "id": "rootPlayer",
 "paddingLeft": 0,
 "paddingRight": 0,
 "horizontalAlign": "left",
 "width": "100%",
 "gap": 10,
 "backgroundPreloadEnabled": true,
 "contentOpaque": false,
 "borderSize": 0,
 "children": [
  "this.MainViewer",
  "this.Container_DF884EAF_CFB3_9CB8_41E1_96BD47779950",
  "this.Container_CD433AED_D464_D24E_41E3_AE723D84DA21",
  "this.Container_C8F21624_D45F_55FC_41E5_DE32E668F410",
  "this.Container_CEA66E9F_D45B_D2CC_41E3_CB7218F7EE17",
  "this.Container_CE48C64D_D45B_B24C_41D0_953DAB8E95D7",
  "this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9F",
  "this.Container_C0032120_CFB0_85A8_41D1_BBFE7EB19031"
 ],
 "minHeight": 20,
 "scrollBarWidth": 10,
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "scripts": {
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "registerTextVariable": function(obj){  var property = (function(){ switch(obj.get('class')) { case 'Label': return 'text'; case 'Button': case 'BaseButton': return 'label'; case 'HTMLText': return 'html'; } })(); if(property == undefined) return; var re = new RegExp('\\{\\{\\s*(\\w+)\\s*\\}\\}', 'g'); var text = obj.get(property); var data = obj.get('data') || {}; data[property] = text; obj.set('data', data); var updateLabel = function(vars) { var text = data[property]; for(var i = 0; i<vars.length; ++i){ var info = vars[i]; var index = info.dispatcher.get('selectedIndex'); if (index >= 0) { var srcPropArray = info.src.split('.'); var src = info.dispatcher.get('items')[index]; for (var j = 0; j < srcPropArray.length; ++j) src = 'get' in src ? src.get(srcPropArray[j]) : src[srcPropArray[j]]; text = text.replace(info.replace, src); } } obj.set(property, text); }; var vars = []; var addVars = function(dispatcher, eventName, src, replace) { vars.push({'dispatcher': dispatcher, 'eventName': eventName, 'src': src, 'replace': replace}); }; while (null != (result = re.exec(text))) { switch (result[1]) { case 'title': addVars(this.mainPlayList, 'change', 'media.label', result[0]); break; case 'subtitle': addVars(this.mainPlayList, 'change', 'media.data.subtitle', result[0]); break; } } if(vars.length > 0){ var func = updateLabel.bind(this, vars); for(var i = 0; i<vars.length; ++i){ var info = vars[i]; info.dispatcher.bind(info.eventName, func, this); } } },
  "getFirstPlayListWithMedia": function(media, onlySelected){  var playLists = this.getPlayListsWithMedia(media, onlySelected); return playLists.length > 0 ? playLists[0] : undefined; },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "playGlobalAudio": function(audio, endCallback, asBackground){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = {'audio': audio, 'asBackground': asBackground || false}; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback, stopBackgroundAudio){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')].audio; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } var src = this.playGlobalAudio(audio, endCallback); if(stopBackgroundAudio === true){ var stateChangeFunc = function(){ if(src.get('state') == 'playing'){ this.pauseGlobalAudios(src.get('id'), [src]); } else /*if(src.get('state') == 'stopped')*/{ this.resumeGlobalAudios(src.get('id')); src.unbind('stateChange', stateChangeFunc, this); } }; src.bind('stateChange', stateChangeFunc, this); } return src; },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')].audio; } return audio; },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext, true); }; playNext(); },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios).map(function(v) { return v.audio })); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ var audioData = audios[audio.get('id')]; if(audioData) audio = audioData.audio; } if(audio.get('state') == 'playing') audio.pause(); },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "getKey": function(key){  return window[key]; },
  "unregisterKey": function(key){  delete window[key]; },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ var audioData = audios[audio.get('id')]; if(audioData){ audio = audioData.audio; delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "stopGlobalAudios": function(onlyForeground){  var audios = window.currentGlobalAudios; var self = this; if(audios){ Object.keys(audios).forEach(function(key){ var data = audios[key]; if(!onlyForeground || (onlyForeground && !data.asBackground)) { self.stopGlobalAudio(data.audio); } }); } },
  "registerKey": function(key, value){  window[key] = value; },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "setOverlayBehaviour": function(overlay, media, action, preventDoubleClick){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(preventDoubleClick){ if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 1000); } }; if(preventDoubleClick && window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getFirstPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = undefined; if(mediaDispatcher){ var playListsWithMedia = this.getPlayListsWithMedia(mediaDispatcher, true); playListDispatcher = playListsWithMedia.indexOf(playList) != -1 ? playList : (playListsWithMedia.length > 0 ? playListsWithMedia[0] : undefined); } if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } item.bind('begin', onBeginFunction, self); this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "_initItemWithComps": function(playList, index, components, eventName, visible, effectToApply, delay, restoreStateAt){  var item = playList.get('items')[index]; var registerVisibility = restoreStateAt > 0; var rootPlayer = this.rootPlayer; var cloneEffect = function(visible) { var klass = effectToApply ? effectToApply.get('class') : undefined; var effect = undefined; switch(klass) { case 'FadeInEffect': case 'FadeOutEffect': effect = rootPlayer.createInstance(visible ? 'FadeInEffect' : 'FadeOutEffect'); break; case 'SlideInEffect': case 'SlideOutEffect': effect = rootPlayer.createInstance(visible ? 'SlideInEffect' : 'SlideOutEffect'); break; } if(effect){ effect.set('duration', effectToApply.get('duration')); effect.set('easing', effectToApply.get('easing')); if(klass.indexOf('Slide') != -1) effect.set(visible ? 'from' : 'to', effectToApply.get(visible ? 'to' : 'from')); } return effect; }; var endFunc = function() { for(var i = 0, count = components.length; i<count; ++i) { var component = components[i]; if(restoreStateAt > 0){ this.setComponentVisibility(component, !visible, 0, cloneEffect(!visible)); } else { var key = 'visibility_' + component.get('id'); if(this.existsKey(key)) { if(this.getKey(key)) this.setComponentVisibility(component, true, 0, cloneEffect(true)); else this.setComponentVisibility(component, false, 0, cloneEffect(false)); this.unregisterKey(key); } } } item.unbind('end', endFunc, this); if(addMediaEndEvent) media.unbind('end', endFunc, this); }; var stopFunc = function() { item.unbind('stop', stopFunc, this, true); item.unbind('stop', stopFunc, this); item.unbind('begin', stopFunc, this, true); item.unbind('begin', stopFunc, this); for(var i = 0, count = components.length; i<count; ++i) { this.keepCompVisible(components[i], false); } }; var addEvent = function(eventName, delay, restoreStateAt){ var changeFunc = function(){ var changeVisibility = function(component, visible, effect) { rootPlayer.setComponentVisibility(component, visible, delay, effect, visible ? 'showEffect' : 'hideEffect', false); if(restoreStateAt > 0){ var time = delay + restoreStateAt + (effect != undefined ? effect.get('duration') : 0); rootPlayer.setComponentVisibility(component, !visible, time, cloneEffect(!visible), visible ? 'hideEffect' : 'showEffect', true); } }; for(var i = 0, count = components.length; i<count; ++i){ var component = components[i]; if(visible == 'toggle'){ if(!component.get('visible')) changeVisibility(component, true, cloneEffect(true)); else changeVisibility(component, false, cloneEffect(false)); } else { changeVisibility(component, visible, cloneEffect(visible)); } } item.unbind(eventName, changeFunc, this); }; item.bind(eventName, changeFunc, this) }; if(eventName == 'begin'){ for(var i = 0, count = components.length; i<count; ++i){ var component = components[i]; this.keepCompVisible(component, true); if(registerVisibility) { var key = 'visibility_' + component.get('id'); this.registerKey(key, component.get('visible')); } } item.bind('stop', stopFunc, this, true); item.bind('stop', stopFunc, this); item.bind('begin', stopFunc, this, true); item.bind('begin', stopFunc, this); if(registerVisibility){ item.bind('end', endFunc, this); var media = item.get('media'); var addMediaEndEvent = media.get('loop') != undefined && !(media.get('loop')); if(addMediaEndEvent) media.bind('end', endFunc, this); } } else if(eventName == 'end' && restoreStateAt > 0){ addEvent('begin', restoreStateAt, 0); restoreStateAt = 0; } if(eventName != undefined) addEvent(eventName, delay, restoreStateAt); },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "getPlayListsWithMedia": function(media, onlySelected){  var result = []; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) result.push(playList); } return result; },
  "keepCompVisible": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "shareSocial": function(socialID, url, deepLink){  if(url == undefined) { url = deepLink ? location.href : location.href.split(location.search||location.hash||/[?#]/)[0]; } else if(deepLink) { url += location.hash; } url = (function(id){ switch(id){ case 'fb': return 'https://www.facebook.com/sharer/sharer.php?u='+url; case 'wa': return 'https://api.whatsapp.com/send/?text='+encodeURIComponent(url); case 'tw': return 'https://twitter.com/intent/tweet?source=webclient&url='+url; default: return undefined; } })(socialID); window.open(url, '_blank'); },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "existsKey": function(key){  return key in window; },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } }
 },
 "minWidth": 20,
 "desktopMipmappingEnabled": false,
 "downloadEnabled": false,
 "class": "Player",
 "borderRadius": 0,
 "paddingBottom": 0,
 "mobileMipmappingEnabled": false,
 "shadow": false,
 "verticalAlign": "top",
 "definitions": [{
 "scrollBarOpacity": 0.51,
 "maxHeight": 640,
 "overflow": "visible",
 "children": [
  "this.Container_DF8BDEAF_CFB3_9CB8_41DB_5660D40A3DEC"
 ],
 "height": "100%",
 "id": "Container_DF8BFEAF_CFB3_9CB8_41D4_93C42D97C6C6",
 "scrollBarMargin": 2,
 "paddingLeft": 25,
 "paddingRight": 0,
 "horizontalAlign": "left",
 "width": 535,
 "gap": 0,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 640,
 "scrollBarColor": "#0069A3",
 "backgroundOpacity": 1,
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 535,
 "class": "Container",
 "backgroundColor": [
  "#CCCCCC",
  "#CCCCCC"
 ],
 "paddingBottom": 25,
 "borderRadius": 0,
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "data": {
  "name": "-right"
 },
 "paddingTop": 0,
 "layout": "horizontal",
 "maxWidth": 535
},
{
 "scrollBarOpacity": 0.5,
 "maxHeight": 640,
 "overflow": "scroll",
 "children": [
  "this.WebFrame_C84845A5_D45F_56FC_41E5_8D4D6040982D"
 ],
 "height": "100%",
 "id": "Container_C84E15A5_D45F_56FC_41D9_F26AF965BC71",
 "scrollBarMargin": 2,
 "paddingLeft": 25,
 "paddingRight": 0,
 "horizontalAlign": "center",
 "width": "44%",
 "gap": 10,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 640,
 "backgroundOpacity": 1,
 "propagateClick": true,
 "backgroundColorRatios": [
  0
 ],
 "scrollBarColor": "#000000",
 "minWidth": 440,
 "class": "Container",
 "backgroundColor": [
  "#CCCCCC"
 ],
 "paddingBottom": 25,
 "borderRadius": 0,
 "backgroundColorDirection": "vertical",
 "verticalAlign": "middle",
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "data": {
  "name": "-left"
 },
 "paddingTop": 25,
 "layout": "absolute",
 "maxWidth": 440
},
{
 "items": [
  {
   "media": "this.video_CF707DF7_D45C_B65B_41E7_784CD9E6AFA8",
   "start": "this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9FVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_C081A3A9_D555_6C66_41E3_FAA19520B2DD, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_C081A3A9_D555_6C66_41E3_FAA19520B2DD, 0)",
   "begin": "this.fixTogglePlayPauseButton(this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9FVideoPlayer)",
   "player": "this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9FVideoPlayer",
   "class": "VideoPlayListItem"
  }
 ],
 "id": "playList_C081A3A9_D555_6C66_41E3_FAA19520B2DD",
 "class": "PlayList"
},
{
 "items": [
  {
   "media": "this.video_CF5244B4_D45C_D6DC_41E3_A9007FF4A5DE",
   "start": "this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9FVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_C08263A9_D555_6C66_41E5_9FA1AAB85E56, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_C08263A9_D555_6C66_41E5_9FA1AAB85E56, 0)",
   "begin": "this.fixTogglePlayPauseButton(this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9FVideoPlayer)",
   "player": "this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9FVideoPlayer",
   "class": "VideoPlayListItem"
  }
 ],
 "id": "playList_C08263A9_D555_6C66_41E5_9FA1AAB85E56",
 "class": "PlayList"
},
{
 "iconWidth": 30,
 "layout": "horizontal",
 "maxHeight": 40,
 "data": {
  "name": "Button"
 },
 "shadowSpread": 1,
 "backgroundColor": [
  "#04A3E1"
 ],
 "id": "Button_CEC66E05_D45B_D5BF_41C4_5CE3A5954D82",
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 0,
 "shadowOpacity": 0,
 "fontFamily": "Noto Sans CJK KR Bold",
 "horizontalAlign": "center",
 "width": 136,
 "gap": 5,
 "shadowColor": "#000000",
 "borderSize": 0,
 "textDecoration": "none",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minHeight": 40,
 "propagateClick": false,
 "backgroundColorRatios": [
  0
 ],
 "shadowHorizontalLength": 3,
 "minWidth": 136,
 "borderColor": "#000000",
 "fontColor": "#333333",
 "fontSize": "20px",
 "label": "\uc601\uc0c1 \ubcf4\uae30",
 "shadowVerticalLength": 0,
 "mode": "push",
 "class": "Button",
 "height": 40,
 "click": "this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9F.bind('hide', function(e){ e.source.unbind('hide', arguments.callee, this); this.playList_C08263A9_D555_6C66_41E5_9FA1AAB85E56.set('selectedIndex', -1); }, this); this.playList_C08263A9_D555_6C66_41E5_9FA1AAB85E56.set('selectedIndex', 0); this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9FVideoPlayer.play(); this.setComponentVisibility(this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9F, true, 0, this.effect_C7241DE6_D467_D67C_41D3_E51C710EB548, 'showEffect', false); this.setComponentVisibility(this.Container_C0032120_CFB0_85A8_41D1_BBFE7EB19031, true, 0, this.effect_C7241DE6_D467_D67C_41D3_E51C710EB548, 'showEffect', false)",
 "paddingBottom": 0,
 "iconHeight": 30,
 "borderRadius": 0,
 "verticalAlign": "middle",
 "pressedBackgroundColor": [
  "#000000"
 ],
 "backgroundColorDirection": "vertical",
 "pressedBackgroundOpacity": 0,
 "shadow": true,
 "rollOverBackgroundOpacity": 0,
 "fontStyle": "normal",
 "iconBeforeLabel": true,
 "shadowBlurRadius": 6,
 "paddingTop": 0,
 "cursor": "hand",
 "maxWidth": 136,
 "fontWeight": "normal",
 "iconURL": "skin/Button_CEC66E05_D45B_D5BF_41C4_5CE3A5954D82.png"
},
{
 "gyroscopeVerticalDraggingEnabled": true,
 "buttonPlayPause": "this.IconButton_6E599476_7CD6_3169_41DB_650F1AEAFBAB",
 "buttonStop": "this.IconButton_C0DF5EFD_CFB0_9C99_41E7_39141CDC7093",
 "displayPlaybackBar": true,
 "id": "MainViewerPanoramaPlayer",
 "mouseControlMode": "drag_rotation",
 "class": "PanoramaPlayer",
 "touchControlMode": "drag_rotation",
 "viewerArea": "this.MainViewer"
},
{
 "iconWidth": 30,
 "layout": "horizontal",
 "maxHeight": 40,
 "data": {
  "name": "Button"
 },
 "shadowSpread": 1,
 "backgroundColor": [
  "#04A3E1"
 ],
 "id": "Button_C84365AC_D45F_56CC_41E9_BF7B66F3993F",
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 0,
 "shadowOpacity": 0,
 "fontFamily": "Noto Sans CJK KR Bold",
 "horizontalAlign": "center",
 "width": 136,
 "gap": 5,
 "shadowColor": "#000000",
 "borderSize": 0,
 "textDecoration": "none",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minHeight": 40,
 "propagateClick": false,
 "backgroundColorRatios": [
  0
 ],
 "shadowHorizontalLength": 3,
 "minWidth": 136,
 "borderColor": "#000000",
 "fontColor": "#333333",
 "fontSize": "20px",
 "label": "\uc601\uc0c1 \ubcf4\uae30",
 "shadowVerticalLength": 0,
 "mode": "push",
 "class": "Button",
 "height": 40,
 "click": "this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9F.bind('hide', function(e){ e.source.unbind('hide', arguments.callee, this); this.playList_C081A3A9_D555_6C66_41E3_FAA19520B2DD.set('selectedIndex', -1); }, this); this.playList_C081A3A9_D555_6C66_41E3_FAA19520B2DD.set('selectedIndex', 0); this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9FVideoPlayer.play(); this.setComponentVisibility(this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9F, true, 0, this.effect_C7241DE6_D467_D67C_41D3_E51C710EB548, 'showEffect', false); this.setComponentVisibility(this.Container_C0032120_CFB0_85A8_41D1_BBFE7EB19031, true, 0, this.effect_C7241DE6_D467_D67C_41D3_E51C710EB548, 'showEffect', false)",
 "paddingBottom": 0,
 "iconHeight": 30,
 "borderRadius": 0,
 "verticalAlign": "middle",
 "pressedBackgroundColor": [
  "#000000"
 ],
 "backgroundColorDirection": "vertical",
 "pressedBackgroundOpacity": 0,
 "shadow": true,
 "rollOverBackgroundOpacity": 0,
 "fontStyle": "normal",
 "iconBeforeLabel": true,
 "shadowBlurRadius": 6,
 "paddingTop": 0,
 "cursor": "hand",
 "maxWidth": 136,
 "fontWeight": "normal",
 "iconURL": "skin/Button_CEC66E05_D45B_D5BF_41C4_5CE3A5954D82.png"
},
{
 "maxHeight": 590,
 "id": "WebFrame_CEC6EE04_D45B_D5BD_41E9_063F637268CE",
 "left": "0%",
 "paddingLeft": 0,
 "paddingRight": 0,
 "right": "0%",
 "scrollEnabled": true,
 "borderSize": 0,
 "minHeight": 590,
 "url": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124996.9374348636!2d-122.28527635110757!3d46.18920169732165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54969956568a2691%3A0x69ddb4f4b6cf94c7!2z7IS47J247Yq47Zes66CM7IqkIOyCsA!5e0!3m2!1sko!2skr!4v1575523264173!5m2!1sko!2skr",
 "backgroundOpacity": 1,
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": false,
 "bottom": "0%",
 "minWidth": 415,
 "top": "0%",
 "class": "WebFrame",
 "backgroundColor": [
  "#FFFFFF"
 ],
 "paddingBottom": 0,
 "borderRadius": 0,
 "backgroundColorDirection": "vertical",
 "insetBorder": false,
 "shadow": false,
 "data": {
  "name": "WebFrame48191"
 },
 "paddingTop": 0,
 "maxWidth": 415
},
{
 "scrollBarOpacity": 0.51,
 "maxHeight": 640,
 "overflow": "visible",
 "children": [
  "this.Container_CE7345ED_D45B_B64C_41D8_F572A1AAD5D2"
 ],
 "height": "100%",
 "id": "Container_CE7395ED_D45B_B64C_41E8_F437E3FAD9EF",
 "scrollBarMargin": 2,
 "paddingLeft": 25,
 "paddingRight": 0,
 "horizontalAlign": "left",
 "width": 535,
 "gap": 0,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 640,
 "scrollBarColor": "#0069A3",
 "backgroundOpacity": 1,
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 535,
 "class": "Container",
 "backgroundColor": [
  "#CCCCCC",
  "#CCCCCC"
 ],
 "paddingBottom": 25,
 "borderRadius": 0,
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "data": {
  "name": "-right"
 },
 "paddingTop": 0,
 "layout": "horizontal",
 "maxWidth": 535
},
{
 "duration": 500,
 "id": "effect_C72C1325_D464_B3FF_41DA_8886918156AF",
 "class": "FadeOutEffect",
 "easing": "linear"
},
{
 "id": "IconButton_6E599476_7CD6_3169_41DB_650F1AEAFBAB",
 "paddingLeft": 0,
 "paddingRight": 0,
 "horizontalAlign": "center",
 "width": 40,
 "borderSize": 0,
 "minHeight": 0,
 "backgroundOpacity": 0,
 "propagateClick": false,
 "transparencyActive": true,
 "minWidth": 0,
 "pressedIconURL": "skin/IconButton_6E599476_7CD6_3169_41DB_650F1AEAFBAB_pressed.png",
 "mode": "toggle",
 "class": "IconButton",
 "borderRadius": 0,
 "paddingBottom": 0,
 "height": 40,
 "shadow": false,
 "verticalAlign": "middle",
 "data": {
  "name": "Pause"
 },
 "paddingTop": 0,
 "cursor": "hand",
 "iconURL": "skin/IconButton_6E599476_7CD6_3169_41DB_650F1AEAFBAB.png"
},
{
 "maxHeight": 20,
 "rollOverIconURL": "skin/IconButton_CEC4AE07_D45B_D5BB_41E3_03ADEEE5B5B7_rollover.png",
 "id": "IconButton_CEC4AE07_D45B_D5BB_41E3_03ADEEE5B5B7",
 "paddingLeft": 0,
 "paddingRight": 0,
 "horizontalAlign": "center",
 "width": 20,
 "borderSize": 0,
 "minHeight": 20,
 "backgroundOpacity": 0,
 "propagateClick": false,
 "transparencyActive": false,
 "minWidth": 20,
 "pressedIconURL": "skin/IconButton_CEC4AE07_D45B_D5BB_41E3_03ADEEE5B5B7.png",
 "click": "this.setComponentVisibility(this.Container_CEA66E9F_D45B_D2CC_41E3_CB7218F7EE17, false, 0, null, null, false)",
 "mode": "push",
 "class": "IconButton",
 "borderRadius": 0,
 "paddingBottom": 0,
 "height": 20,
 "shadow": false,
 "verticalAlign": "middle",
 "data": {
  "name": "X"
 },
 "paddingTop": 0,
 "cursor": "hand",
 "maxWidth": 20,
 "iconURL": "skin/IconButton_CEC4AE07_D45B_D5BB_41E3_03ADEEE5B5B7.png"
},
{
 "maxHeight": 20,
 "rollOverIconURL": "skin/IconButton_CEC4AE07_D45B_D5BB_41E3_03ADEEE5B5B7_rollover.png",
 "id": "IconButton_C83F15AD_D45F_56CC_41E0_CE5835F90A19",
 "paddingLeft": 0,
 "paddingRight": 0,
 "horizontalAlign": "center",
 "width": 20,
 "borderSize": 0,
 "minHeight": 20,
 "backgroundOpacity": 0,
 "propagateClick": false,
 "transparencyActive": false,
 "minWidth": 20,
 "pressedIconURL": "skin/IconButton_CEC4AE07_D45B_D5BB_41E3_03ADEEE5B5B7.png",
 "click": "this.setComponentVisibility(this.Container_C8F21624_D45F_55FC_41E5_DE32E668F410, false, 0, null, null, false)",
 "mode": "push",
 "class": "IconButton",
 "borderRadius": 0,
 "paddingBottom": 0,
 "height": 20,
 "shadow": false,
 "verticalAlign": "middle",
 "data": {
  "name": "X"
 },
 "paddingTop": 0,
 "cursor": "hand",
 "maxWidth": 20,
 "iconURL": "skin/IconButton_CEC4AE07_D45B_D5BB_41E3_03ADEEE5B5B7.png"
},
{
 "scrollBarOpacity": 0.5,
 "maxHeight": 640,
 "overflow": "scroll",
 "children": [
  "this.IconButton_DF887EAF_CFB3_9CB8_41DD_7FB6D79C3851"
 ],
 "id": "Container_C7CF1BA4_D3EA_0B2D_41CC_904BF5614C48",
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "paddingRight": 0,
 "horizontalAlign": "left",
 "width": 25,
 "gap": 10,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 640,
 "scrollBarColor": "#000000",
 "backgroundOpacity": 0,
 "propagateClick": false,
 "minWidth": 25,
 "class": "Container",
 "borderRadius": 0,
 "paddingBottom": 0,
 "height": 640,
 "shadow": false,
 "verticalAlign": "top",
 "scrollBarVisible": "rollOver",
 "data": {
  "name": "Container10029"
 },
 "paddingTop": 8,
 "layout": "horizontal",
 "maxWidth": 25
},
{
 "maxHeight": 510,
 "height": 510,
 "id": "Image_CE6C05EE_D45B_B64C_41D5_FCE9CCDD944A",
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": 510,
 "borderSize": 0,
 "minHeight": 510,
 "url": "skin/Image_CE6C05EE_D45B_B64C_41D5_FCE9CCDD944A.png",
 "backgroundOpacity": 0,
 "propagateClick": false,
 "minWidth": 510,
 "class": "Image",
 "borderRadius": 0,
 "paddingBottom": 0,
 "verticalAlign": "top",
 "shadow": false,
 "data": {
  "name": "Image7152"
 },
 "scaleMode": "fit_inside",
 "paddingTop": 0,
 "maxWidth": 510
},
{
 "scrollBarOpacity": 0.5,
 "maxHeight": 640,
 "overflow": "scroll",
 "children": [
  "this.WebFrame_CE73F5ED_D45B_B64C_41B3_F36834684B98"
 ],
 "height": "100%",
 "id": "Container_CE7545ED_D45B_B64C_41C2_3660E442ABB8",
 "scrollBarMargin": 2,
 "paddingLeft": 25,
 "paddingRight": 0,
 "horizontalAlign": "center",
 "width": "44%",
 "gap": 10,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 640,
 "backgroundOpacity": 1,
 "propagateClick": true,
 "backgroundColorRatios": [
  0
 ],
 "scrollBarColor": "#000000",
 "minWidth": 440,
 "class": "Container",
 "backgroundColor": [
  "#CCCCCC"
 ],
 "paddingBottom": 25,
 "borderRadius": 0,
 "backgroundColorDirection": "vertical",
 "verticalAlign": "middle",
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "data": {
  "name": "-left"
 },
 "paddingTop": 25,
 "layout": "absolute",
 "maxWidth": 440
},
{
 "scrollBarOpacity": 0.79,
 "maxHeight": 615,
 "overflow": "scroll",
 "children": [
  "this.Image_CEC60E05_D45B_D5BF_41E8_40BA5F12420E",
  "this.Button_CEC66E05_D45B_D5BF_41C4_5CE3A5954D82"
 ],
 "id": "Container_CEC62E05_D45B_D5BF_41E1_81918B767C4D",
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "paddingRight": 0,
 "horizontalAlign": "right",
 "width": "95.327%",
 "gap": 40,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 615,
 "backgroundOpacity": 0,
 "propagateClick": true,
 "scrollBarColor": "#E73B2C",
 "minWidth": 510,
 "class": "Container",
 "borderRadius": 0,
 "paddingBottom": 0,
 "height": 615,
 "shadow": false,
 "verticalAlign": "top",
 "scrollBarVisible": "rollOver",
 "data": {
  "name": "Container text"
 },
 "paddingTop": 25,
 "layout": "vertical",
 "maxWidth": 510
},
{
 "scrollBarOpacity": 0.5,
 "maxHeight": 640,
 "overflow": "scroll",
 "children": [
  "this.IconButton_C83F15AD_D45F_56CC_41E0_CE5835F90A19"
 ],
 "id": "Container_C83D25AD_D45F_56CC_41D7_59D101C68187",
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "paddingRight": 0,
 "horizontalAlign": "left",
 "width": 25,
 "gap": 10,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 640,
 "scrollBarColor": "#000000",
 "backgroundOpacity": 0,
 "propagateClick": false,
 "minWidth": 25,
 "class": "Container",
 "borderRadius": 0,
 "paddingBottom": 0,
 "height": 640,
 "shadow": false,
 "verticalAlign": "top",
 "scrollBarVisible": "rollOver",
 "data": {
  "name": "Container10029"
 },
 "paddingTop": 8,
 "layout": "horizontal",
 "maxWidth": 25
},
{
 "maxHeight": 20,
 "rollOverIconURL": "skin/IconButton_CEC4AE07_D45B_D5BB_41E3_03ADEEE5B5B7_rollover.png",
 "id": "IconButton_CD714A40_D464_DDB4_41E1_355376A58CC4",
 "paddingLeft": 0,
 "paddingRight": 0,
 "horizontalAlign": "center",
 "width": 20,
 "borderSize": 0,
 "minHeight": 20,
 "backgroundOpacity": 0,
 "propagateClick": false,
 "transparencyActive": false,
 "minWidth": 20,
 "pressedIconURL": "skin/IconButton_CEC4AE07_D45B_D5BB_41E3_03ADEEE5B5B7.png",
 "click": "this.setComponentVisibility(this.Container_CD433AED_D464_D24E_41E3_AE723D84DA21, false, 0, null, null, false)",
 "mode": "push",
 "class": "IconButton",
 "borderRadius": 0,
 "paddingBottom": 0,
 "height": 20,
 "shadow": false,
 "verticalAlign": "middle",
 "data": {
  "name": "X"
 },
 "paddingTop": 0,
 "cursor": "hand",
 "maxWidth": 20,
 "iconURL": "skin/IconButton_CEC4AE07_D45B_D5BB_41E3_03ADEEE5B5B7.png"
},
{
 "maxHeight": 510,
 "height": 510,
 "id": "Image_CD7DFA3E_D464_DDCC_41D9_918F531A3D17",
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": 510,
 "borderSize": 0,
 "minHeight": 510,
 "url": "skin/Image_CD7DFA3E_D464_DDCC_41D9_918F531A3D17.png",
 "backgroundOpacity": 0,
 "propagateClick": false,
 "minWidth": 510,
 "class": "Image",
 "borderRadius": 0,
 "paddingBottom": 0,
 "verticalAlign": "top",
 "shadow": false,
 "data": {
  "name": "Image7152"
 },
 "scaleMode": "fit_inside",
 "paddingTop": 0,
 "maxWidth": 510
},
{
 "timeToIdle": 5000,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -2.15,
  "class": "PanoramaCameraPosition",
  "hfov": 10,
  "pitch": 2.94
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_80D13AEC_8D09_AEB1_41D9_2DF9BEE19E00_camera",
 "manualRotationSpeed": 600
},
{
 "scrollBarOpacity": 0.5,
 "maxHeight": 640,
 "overflow": "scroll",
 "children": [
  "this.Container_CD7CAA38_D464_DDD4_41D5_4069F49AE46C",
  "this.Container_CD7D0A3D_D464_DDCC_41E4_7B6D286BF971",
  "this.Container_CD713A40_D464_DDB4_419B_7CD7A3BB83EA"
 ],
 "shadowSpread": 1,
 "id": "Container_CD7C5A38_D464_DDD4_41D6_E89426F1554E",
 "left": "20%",
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "shadowColor": "#000000",
 "right": "20%",
 "gap": 0,
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 640,
 "scrollBarColor": "#000000",
 "backgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "horizontalAlign": "left",
 "top": "10%",
 "bottom": "20%",
 "shadowHorizontalLength": 0,
 "minWidth": 1000,
 "shadowVerticalLength": 0,
 "class": "Container",
 "backgroundColor": [
  "#CCCCCC",
  "#CCCCCC"
 ],
 "shadowOpacity": 0.3,
 "paddingBottom": 0,
 "borderRadius": 0,
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "shadow": true,
 "scrollBarVisible": "rollOver",
 "shadowBlurRadius": 25,
 "data": {
  "name": "Global"
 },
 "paddingTop": 0,
 "layout": "horizontal",
 "maxWidth": 1000
},
{
 "scrollBarOpacity": 0.5,
 "maxHeight": 640,
 "overflow": "scroll",
 "children": [
  "this.WebFrame_DF8BEEAF_CFB3_9CB8_41E5_A4F1DC38D43C"
 ],
 "height": "100%",
 "id": "Container_DF8B1EAF_CFB3_9CB8_41E5_BA0CFFD199F1",
 "scrollBarMargin": 2,
 "paddingLeft": 25,
 "paddingRight": 0,
 "horizontalAlign": "center",
 "width": "44%",
 "gap": 10,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 640,
 "backgroundOpacity": 1,
 "propagateClick": true,
 "backgroundColorRatios": [
  0
 ],
 "scrollBarColor": "#000000",
 "minWidth": 440,
 "class": "Container",
 "backgroundColor": [
  "#CCCCCC"
 ],
 "paddingBottom": 25,
 "borderRadius": 0,
 "backgroundColorDirection": "vertical",
 "verticalAlign": "middle",
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "data": {
  "name": "-left"
 },
 "paddingTop": 25,
 "layout": "absolute",
 "maxWidth": 440
},
{
 "maxHeight": 590,
 "id": "WebFrame_C84845A5_D45F_56FC_41E5_8D4D6040982D",
 "left": "0%",
 "paddingLeft": 0,
 "paddingRight": 0,
 "right": "0%",
 "scrollEnabled": true,
 "borderSize": 0,
 "minHeight": 590,
 "url": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d825357.4397416194!2d-113.40494743372912!3d36.092208251220214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x873312ae759b4d15%3A0x1f38a9bec9912029!2z6re4656c65OcIOy6kOuLiOyWuCDqta3rpr3qs7Xsm5A!5e0!3m2!1sko!2skr!4v1575523084799!5m2!1sko!2skr",
 "backgroundOpacity": 1,
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": false,
 "bottom": "0%",
 "minWidth": 415,
 "top": "0%",
 "class": "WebFrame",
 "backgroundColor": [
  "#FFFFFF"
 ],
 "paddingBottom": 0,
 "borderRadius": 0,
 "backgroundColorDirection": "vertical",
 "insetBorder": false,
 "shadow": false,
 "data": {
  "name": "WebFrame48191"
 },
 "paddingTop": 0,
 "maxWidth": 415
},
{
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipPaddingTop": 4,
 "id": "MainViewer",
 "left": 0,
 "paddingLeft": 0,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarBottom": 5,
 "width": "100%",
 "playbackBarHeadShadowColor": "#000000",
 "displayTooltipInTouchScreens": true,
 "playbackBarHeadShadow": true,
 "progressBackgroundOpacity": 1,
 "borderSize": 0,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarOpacity": 1,
 "minHeight": 50,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "progressBottom": 0,
 "toolTipBorderSize": 1,
 "minWidth": 100,
 "transitionDuration": 500,
 "toolTipBorderRadius": 3,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderSize": 0,
 "class": "ViewerArea",
 "toolTipShadowSpread": 0,
 "playbackBarBackgroundOpacity": 1,
 "progressBarBorderSize": 0,
 "toolTipPaddingLeft": 6,
 "toolTipFontSize": "2vmin",
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipBackgroundColor": "#F6F6F6",
 "playbackBarHeadOpacity": 1,
 "toolTipShadowOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBorderSize": 0,
 "progressBackgroundColorDirection": "vertical",
 "shadow": false,
 "playbackBarBorderRadius": 0,
 "toolTipDisplayTime": 600,
 "progressBorderSize": 0,
 "toolTipFontStyle": "normal",
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "height": "100%",
 "playbackBarHeadWidth": 6,
 "progressBorderColor": "#000000",
 "progressBarBorderColor": "#000000",
 "toolTipShadowBlurRadius": 3,
 "transitionMode": "blending",
 "toolTipFontFamily": "나눔고딕",
 "paddingRight": 0,
 "progressBarOpacity": 1,
 "toolTipFontWeight": "normal",
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "vrPointerColor": "#FFFFFF",
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipPaddingRight": 6,
 "playbackBarLeft": 0,
 "playbackBarHeight": 10,
 "playbackBarHeadHeight": 15,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "toolTipShadowVerticalLength": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "propagateClick": false,
 "toolTipTextShadowColor": "#000000",
 "progressRight": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "progressBorderRadius": 0,
 "vrPointerSelectionColor": "#FF6600",
 "top": 0,
 "playbackBarProgressOpacity": 1,
 "progressBarBorderRadius": 0,
 "vrPointerSelectionTime": 2000,
 "playbackBarHeadShadowBlurRadius": 3,
 "borderRadius": 0,
 "toolTipPaddingBottom": 4,
 "paddingBottom": 0,
 "progressLeft": 0,
 "playbackBarRight": 0,
 "progressHeight": 10,
 "toolTipTextShadowOpacity": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipBorderColor": "#767676",
 "playbackBarProgressBorderSize": 0,
 "data": {
  "name": "Main Viewer"
 },
 "toolTipFontColor": "#606060",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipShadowColor": "#333333",
 "playbackBarHeadBorderRadius": 0,
 "paddingTop": 0,
 "toolTipOpacity": 1,
 "toolTipTextShadowBlurRadius": 3
},
{
 "scrollBarOpacity": 0.5,
 "maxHeight": 640,
 "overflow": "scroll",
 "children": [
  "this.Container_DF8B1EAF_CFB3_9CB8_41E5_BA0CFFD199F1",
  "this.Container_DF8BFEAF_CFB3_9CB8_41D4_93C42D97C6C6",
  "this.Container_C7CF1BA4_D3EA_0B2D_41CC_904BF5614C48"
 ],
 "shadowSpread": 1,
 "id": "Container_DF8B0EAF_CFB3_9CB8_41E4_AB5E34C23898",
 "left": "20%",
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "shadowColor": "#000000",
 "right": "20%",
 "gap": 0,
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 640,
 "scrollBarColor": "#000000",
 "backgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "horizontalAlign": "left",
 "top": "10%",
 "bottom": "20%",
 "shadowHorizontalLength": 0,
 "minWidth": 1000,
 "shadowVerticalLength": 0,
 "class": "Container",
 "backgroundColor": [
  "#CCCCCC",
  "#CCCCCC"
 ],
 "shadowOpacity": 0.3,
 "paddingBottom": 0,
 "borderRadius": 0,
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "shadow": true,
 "scrollBarVisible": "rollOver",
 "shadowBlurRadius": 25,
 "data": {
  "name": "Global"
 },
 "paddingTop": 0,
 "layout": "horizontal",
 "maxWidth": 1000
},
{
 "items": [
  {
   "media": "this.panorama_80D13AEC_8D09_AEB1_41D9_2DF9BEE19E00",
   "end": "this.trigger('tourEnded')",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_80D13AEC_8D09_AEB1_41D9_2DF9BEE19E00_camera",
   "class": "PanoramaPlayListItem"
  }
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "scrollBarOpacity": 0.5,
 "maxHeight": 640,
 "overflow": "scroll",
 "children": [
  "this.WebFrame_CD7D3A38_D464_DDC9_41D0_B23FB0025BE6"
 ],
 "height": "100%",
 "id": "Container_CD7CAA38_D464_DDD4_41D5_4069F49AE46C",
 "scrollBarMargin": 2,
 "paddingLeft": 25,
 "paddingRight": 0,
 "horizontalAlign": "center",
 "width": "44%",
 "gap": 10,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 640,
 "backgroundOpacity": 1,
 "propagateClick": true,
 "backgroundColorRatios": [
  0
 ],
 "scrollBarColor": "#000000",
 "minWidth": 440,
 "class": "Container",
 "backgroundColor": [
  "#CCCCCC"
 ],
 "paddingBottom": 25,
 "borderRadius": 0,
 "backgroundColorDirection": "vertical",
 "verticalAlign": "middle",
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "data": {
  "name": "-left"
 },
 "paddingTop": 25,
 "layout": "absolute",
 "maxWidth": 440
},
{
 "duration": 500,
 "id": "effect_C5DE5919_D017_88D8_41E9_3302DCBA8FB9",
 "class": "FadeInEffect",
 "easing": "linear"
},
{
 "duration": 500,
 "id": "effect_C37D5BAD_D465_B2CC_41DC_92D85B8EBC09",
 "class": "FadeInEffect",
 "easing": "linear"
},
{
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipPaddingTop": 4,
 "id": "ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9F",
 "left": "0%",
 "paddingLeft": 0,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "right": "0%",
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadShadowColor": "#000000",
 "displayTooltipInTouchScreens": true,
 "playbackBarBottom": 0,
 "progressBackgroundOpacity": 1,
 "borderSize": 0,
 "playbackBarOpacity": 1,
 "minHeight": 1,
 "playbackBarHeadShadow": true,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "progressBottom": 2,
 "toolTipBorderSize": 1,
 "minWidth": 1,
 "transitionDuration": 500,
 "toolTipBorderRadius": 3,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderSize": 0,
 "class": "ViewerArea",
 "toolTipShadowSpread": 0,
 "playbackBarBackgroundOpacity": 1,
 "toolTipBackgroundColor": "#F6F6F6",
 "progressBarBorderSize": 0,
 "toolTipPaddingLeft": 6,
 "toolTipFontSize": "1.11vmin",
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarHeadOpacity": 1,
 "toolTipShadowOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBorderSize": 0,
 "progressBackgroundColorDirection": "vertical",
 "shadow": false,
 "playbackBarBorderRadius": 0,
 "toolTipDisplayTime": 600,
 "progressBorderSize": 0,
 "toolTipFontStyle": "normal",
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "playbackBarHeadWidth": 6,
 "progressBorderColor": "#000000",
 "progressBarBorderColor": "#000000",
 "toolTipShadowBlurRadius": 3,
 "transitionMode": "blending",
 "toolTipFontFamily": "Arial",
 "paddingRight": 0,
 "progressBarOpacity": 1,
 "toolTipFontWeight": "normal",
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "vrPointerColor": "#FFFFFF",
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipPaddingRight": 6,
 "playbackBarLeft": 0,
 "playbackBarHeight": 10,
 "playbackBarHeadHeight": 15,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "toolTipShadowVerticalLength": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "propagateClick": false,
 "toolTipTextShadowColor": "#000000",
 "progressRight": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "bottom": "0%",
 "vrPointerSelectionColor": "#FF6600",
 "top": "0%",
 "playbackBarProgressOpacity": 1,
 "progressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "vrPointerSelectionTime": 2000,
 "playbackBarHeadShadowBlurRadius": 3,
 "borderRadius": 0,
 "toolTipPaddingBottom": 4,
 "paddingBottom": 0,
 "progressLeft": 0,
 "playbackBarRight": 0,
 "progressHeight": 10,
 "toolTipTextShadowOpacity": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipBorderColor": "#767676",
 "playbackBarProgressBorderSize": 0,
 "data": {
  "name": "VideoPlay"
 },
 "toolTipFontColor": "#606060",
 "visible": false,
 "playbackBarHeadBorderColor": "#000000",
 "toolTipShadowColor": "#333333",
 "playbackBarHeadBorderRadius": 0,
 "paddingTop": 0,
 "toolTipOpacity": 1,
 "toolTipTextShadowBlurRadius": 3
},
{
 "scrollBarOpacity": 0.5,
 "overflow": "scroll",
 "children": [
  "this.Container_CEC6AE04_D45B_D5BD_41DB_9BCAEDB54646"
 ],
 "id": "Container_CEA66E9F_D45B_D2CC_41E3_CB7218F7EE17",
 "left": "0%",
 "paddingLeft": 0,
 "paddingRight": 0,
 "right": "0%",
 "gap": 10,
 "creationPolicy": "inAdvance",
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 1,
 "scrollBarColor": "#000000",
 "backgroundOpacity": 0.6,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "horizontalAlign": "left",
 "bottom": "0%",
 "minWidth": 1,
 "top": "0%",
 "class": "Container",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "paddingBottom": 0,
 "borderRadius": 0,
 "verticalAlign": "top",
 "backgroundColorDirection": "vertical",
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "visible": false,
 "data": {
  "name": "\uc138\uc778\ud2b8 \ud57c\ub80c\uc2a4 \uc0b0"
 },
 "paddingTop": 0,
 "layout": "absolute",
 "scrollBarMargin": 2
},
{
 "scrollBarOpacity": 0.5,
 "maxHeight": 640,
 "overflow": "scroll",
 "children": [
  "this.IconButton_CD714A40_D464_DDB4_41E1_355376A58CC4"
 ],
 "id": "Container_CD713A40_D464_DDB4_419B_7CD7A3BB83EA",
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "paddingRight": 0,
 "horizontalAlign": "left",
 "width": 25,
 "gap": 10,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 640,
 "scrollBarColor": "#000000",
 "backgroundOpacity": 0,
 "propagateClick": false,
 "minWidth": 25,
 "class": "Container",
 "borderRadius": 0,
 "paddingBottom": 0,
 "height": 640,
 "shadow": false,
 "verticalAlign": "top",
 "scrollBarVisible": "rollOver",
 "data": {
  "name": "Container10029"
 },
 "paddingTop": 8,
 "layout": "horizontal",
 "maxWidth": 25
},
{
 "scrollBarOpacity": 0.5,
 "maxHeight": 640,
 "overflow": "scroll",
 "children": [
  "this.IconButton_CE65D5EF_D45B_B64C_41E6_41B5274E0E70"
 ],
 "id": "Container_CE6795EF_D45B_B64C_41D4_B9C44212B8A5",
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "paddingRight": 0,
 "horizontalAlign": "left",
 "width": 25,
 "gap": 10,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 640,
 "scrollBarColor": "#000000",
 "backgroundOpacity": 0,
 "propagateClick": false,
 "minWidth": 25,
 "class": "Container",
 "borderRadius": 0,
 "paddingBottom": 0,
 "height": 640,
 "shadow": false,
 "verticalAlign": "top",
 "scrollBarVisible": "rollOver",
 "data": {
  "name": "Container10029"
 },
 "paddingTop": 8,
 "layout": "horizontal",
 "maxWidth": 25
},
{
 "scrollBarOpacity": 0.5,
 "maxHeight": 640,
 "children": [
  "this.Container_CEC68E04_D45B_D5BD_41B3_9D97F857C4E6",
  "this.Container_CEC6CE05_D45B_D5BF_41E9_50C81FA527D2",
  "this.Container_CEC54E07_D45B_D5BB_41DE_4A7588886A6F"
 ],
 "shadowSpread": 1,
 "id": "Container_CEC6AE04_D45B_D5BD_41DB_9BCAEDB54646",
 "left": "20%",
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "shadowColor": "#000000",
 "right": "20%",
 "gap": 0,
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "overflow": "scroll",
 "minHeight": 640,
 "scrollBarColor": "#000000",
 "backgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "horizontalAlign": "left",
 "top": "10%",
 "bottom": "20%",
 "shadowHorizontalLength": 0,
 "minWidth": 1000,
 "shadowVerticalLength": 0,
 "class": "Container",
 "backgroundColor": [
  "#CCCCCC",
  "#CCCCCC"
 ],
 "paddingBottom": 0,
 "borderRadius": 0,
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "shadowOpacity": 0.3,
 "shadow": true,
 "scrollBarVisible": "rollOver",
 "shadowBlurRadius": 25,
 "data": {
  "name": "Global"
 },
 "paddingTop": 0,
 "layout": "horizontal",
 "maxWidth": 1000
},
{
 "maxHeight": 590,
 "id": "WebFrame_CE73F5ED_D45B_B64C_41B3_F36834684B98",
 "left": "0%",
 "paddingLeft": 0,
 "paddingRight": 0,
 "right": "0%",
 "scrollEnabled": true,
 "borderSize": 0,
 "minHeight": 590,
 "url": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d70248.75444845893!2d114.14561646848594!3d22.278165529241498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3404002b7e463e87%3A0xe4c58f8e0fb01840!2z7ZmN7L2pIOyErA!5e0!3m2!1sko!2skr!4v1575523358822!5m2!1sko!2skr",
 "backgroundOpacity": 1,
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": false,
 "bottom": "0%",
 "minWidth": 415,
 "top": "0%",
 "class": "WebFrame",
 "backgroundColor": [
  "#FFFFFF"
 ],
 "paddingBottom": 0,
 "borderRadius": 0,
 "backgroundColorDirection": "vertical",
 "insetBorder": false,
 "shadow": false,
 "data": {
  "name": "WebFrame48191"
 },
 "paddingTop": 0,
 "maxWidth": 415
},
{
 "scrollBarOpacity": 0.51,
 "maxHeight": 640,
 "overflow": "visible",
 "children": [
  "this.Container_CEC62E05_D45B_D5BF_41E1_81918B767C4D"
 ],
 "height": "100%",
 "id": "Container_CEC6CE05_D45B_D5BF_41E9_50C81FA527D2",
 "scrollBarMargin": 2,
 "paddingLeft": 25,
 "paddingRight": 0,
 "horizontalAlign": "left",
 "width": 535,
 "gap": 0,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 640,
 "scrollBarColor": "#0069A3",
 "backgroundOpacity": 1,
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 535,
 "class": "Container",
 "backgroundColor": [
  "#CCCCCC",
  "#CCCCCC"
 ],
 "paddingBottom": 25,
 "borderRadius": 0,
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "data": {
  "name": "-right"
 },
 "paddingTop": 0,
 "layout": "horizontal",
 "maxWidth": 535
},
{
 "scrollBarOpacity": 0.5,
 "maxHeight": 640,
 "overflow": "scroll",
 "children": [
  "this.IconButton_CEC4AE07_D45B_D5BB_41E3_03ADEEE5B5B7"
 ],
 "id": "Container_CEC54E07_D45B_D5BB_41DE_4A7588886A6F",
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "paddingRight": 0,
 "horizontalAlign": "left",
 "width": 25,
 "gap": 10,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 640,
 "scrollBarColor": "#000000",
 "backgroundOpacity": 0,
 "propagateClick": false,
 "minWidth": 25,
 "class": "Container",
 "borderRadius": 0,
 "paddingBottom": 0,
 "height": 640,
 "shadow": false,
 "verticalAlign": "top",
 "scrollBarVisible": "rollOver",
 "data": {
  "name": "Container10029"
 },
 "paddingTop": 8,
 "layout": "horizontal",
 "maxWidth": 25
},
{
 "label": "\ub178\ud2b8\ub974\ub2f4 \ub300\uc131\ub2f9",
 "scaleMode": "fit_inside",
 "class": "Video",
 "width": 1920,
 "loop": false,
 "id": "video_C1829366_D467_B27C_41E9_19C9C2A3F092",
 "thumbnailUrl": "media/video_C1829366_D467_B27C_41E9_19C9C2A3F092_t.jpg",
 "height": 1080,
 "video": {
  "width": 1920,
  "mp4Url": "media/video_C1829366_D467_B27C_41E9_19C9C2A3F092.mp4",
  "class": "VideoResource",
  "height": 1080
 }
},
{
 "iconWidth": 30,
 "layout": "horizontal",
 "maxHeight": 40,
 "data": {
  "name": "Button"
 },
 "shadowSpread": 1,
 "backgroundColor": [
  "#04A3E1"
 ],
 "id": "Button_DF8B8EAF_CFB3_9CB8_41E8_8D84B040D751",
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 0,
 "shadowOpacity": 0,
 "fontFamily": "Noto Sans CJK KR Bold",
 "horizontalAlign": "center",
 "width": 136,
 "gap": 5,
 "shadowColor": "#000000",
 "borderSize": 0,
 "textDecoration": "none",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minHeight": 40,
 "propagateClick": false,
 "backgroundColorRatios": [
  0
 ],
 "shadowHorizontalLength": 3,
 "minWidth": 136,
 "borderColor": "#000000",
 "fontColor": "#333333",
 "fontSize": "20px",
 "label": "\uc601\uc0c1 \ubcf4\uae30",
 "shadowVerticalLength": 0,
 "mode": "push",
 "class": "Button",
 "height": 40,
 "click": "this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9F.bind('hide', function(e){ e.source.unbind('hide', arguments.callee, this); this.playList_C08153A9_D555_6C66_41E9_7CCB037E8996.set('selectedIndex', -1); }, this); this.playList_C08153A9_D555_6C66_41E9_7CCB037E8996.set('selectedIndex', 0); this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9FVideoPlayer.play(); this.setComponentVisibility(this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9F, true, 0, this.effect_C7241DE6_D467_D67C_41D3_E51C710EB548, 'showEffect', false); this.setComponentVisibility(this.Container_C0032120_CFB0_85A8_41D1_BBFE7EB19031, true, 0, this.effect_C7241DE6_D467_D67C_41D3_E51C710EB548, 'showEffect', false)",
 "paddingBottom": 0,
 "iconHeight": 30,
 "borderRadius": 0,
 "verticalAlign": "middle",
 "pressedBackgroundColor": [
  "#000000"
 ],
 "backgroundColorDirection": "vertical",
 "pressedBackgroundOpacity": 0,
 "shadow": true,
 "rollOverBackgroundOpacity": 0,
 "fontStyle": "normal",
 "iconBeforeLabel": true,
 "shadowBlurRadius": 6,
 "paddingTop": 0,
 "cursor": "hand",
 "maxWidth": 136,
 "fontWeight": "normal",
 "iconURL": "skin/Button_CEC66E05_D45B_D5BF_41C4_5CE3A5954D82.png"
},
{
 "scrollBarOpacity": 0.5,
 "overflow": "scroll",
 "children": [
  "this.IconButton_6E599476_7CD6_3169_41DB_650F1AEAFBAB",
  "this.IconButton_C0DF5EFD_CFB0_9C99_41E7_39141CDC7093"
 ],
 "id": "Container_C0032120_CFB0_85A8_41D1_BBFE7EB19031",
 "left": "0%",
 "paddingLeft": 0,
 "paddingRight": 20,
 "horizontalAlign": "right",
 "width": "100%",
 "gap": 10,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 1,
 "scrollBarColor": "#000000",
 "backgroundOpacity": 0,
 "propagateClick": false,
 "minWidth": 1,
 "bottom": "90%",
 "top": "0%",
 "class": "Container",
 "borderRadius": 0,
 "paddingBottom": 0,
 "verticalAlign": "middle",
 "shadow": false,
 "visible": false,
 "scrollBarVisible": "rollOver",
 "paddingTop": 0,
 "layout": "horizontal",
 "scrollBarMargin": 2,
 "data": {
  "name": "Media_Control"
 }
},
{
 "iconWidth": 30,
 "layout": "horizontal",
 "maxHeight": 40,
 "data": {
  "name": "Button"
 },
 "shadowSpread": 1,
 "backgroundColor": [
  "#04A3E1"
 ],
 "id": "Button_CE6C15EE_D45B_B64C_41D1_90C5993EDBE0",
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 0,
 "shadowOpacity": 0,
 "fontFamily": "Noto Sans CJK KR Bold",
 "horizontalAlign": "center",
 "width": 136,
 "gap": 5,
 "shadowColor": "#000000",
 "borderSize": 0,
 "textDecoration": "none",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minHeight": 40,
 "propagateClick": false,
 "backgroundColorRatios": [
  0
 ],
 "shadowHorizontalLength": 3,
 "minWidth": 136,
 "borderColor": "#000000",
 "fontColor": "#333333",
 "fontSize": "20px",
 "label": "\uc601\uc0c1 \ubcf4\uae30",
 "shadowVerticalLength": 0,
 "mode": "push",
 "class": "Button",
 "height": 40,
 "click": "this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9F.bind('hide', function(e){ e.source.unbind('hide', arguments.callee, this); this.playList_C08233A9_D555_6C66_41E9_D8E3AC635517.set('selectedIndex', -1); }, this); this.playList_C08233A9_D555_6C66_41E9_D8E3AC635517.set('selectedIndex', 0); this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9FVideoPlayer.play(); this.setComponentVisibility(this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9F, true, 0, this.effect_C7241DE6_D467_D67C_41D3_E51C710EB548, 'showEffect', false); this.setComponentVisibility(this.Container_C0032120_CFB0_85A8_41D1_BBFE7EB19031, true, 0, this.effect_C7241DE6_D467_D67C_41D3_E51C710EB548, 'showEffect', false)",
 "paddingBottom": 0,
 "iconHeight": 30,
 "borderRadius": 0,
 "verticalAlign": "middle",
 "pressedBackgroundColor": [
  "#000000"
 ],
 "backgroundColorDirection": "vertical",
 "pressedBackgroundOpacity": 0,
 "shadow": true,
 "rollOverBackgroundOpacity": 0,
 "fontStyle": "normal",
 "iconBeforeLabel": true,
 "shadowBlurRadius": 6,
 "paddingTop": 0,
 "cursor": "hand",
 "maxWidth": 136,
 "fontWeight": "normal",
 "iconURL": "skin/Button_CEC66E05_D45B_D5BF_41C4_5CE3A5954D82.png"
},
{
 "scrollBarOpacity": 0.5,
 "overflow": "scroll",
 "children": [
  "this.Container_C84E65A5_D45F_56FC_41C3_D5F703FC7CA2"
 ],
 "id": "Container_C8F21624_D45F_55FC_41E5_DE32E668F410",
 "left": "0%",
 "paddingLeft": 0,
 "paddingRight": 0,
 "right": "0%",
 "gap": 10,
 "creationPolicy": "inAdvance",
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 1,
 "scrollBarColor": "#000000",
 "backgroundOpacity": 0.6,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "horizontalAlign": "left",
 "bottom": "0%",
 "minWidth": 1,
 "top": "0%",
 "class": "Container",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "paddingBottom": 0,
 "borderRadius": 0,
 "verticalAlign": "top",
 "backgroundColorDirection": "vertical",
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "visible": false,
 "data": {
  "name": "\uadf8\ub79c\ub4dc \uce90\ub2c8\uc5b8"
 },
 "paddingTop": 0,
 "layout": "absolute",
 "scrollBarMargin": 2
},
{
 "scrollBarOpacity": 0.5,
 "maxHeight": 640,
 "overflow": "scroll",
 "children": [
  "this.WebFrame_CEC6EE04_D45B_D5BD_41E9_063F637268CE"
 ],
 "height": "100%",
 "id": "Container_CEC68E04_D45B_D5BD_41B3_9D97F857C4E6",
 "scrollBarMargin": 2,
 "paddingLeft": 25,
 "paddingRight": 0,
 "horizontalAlign": "center",
 "width": "44%",
 "gap": 10,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 640,
 "backgroundOpacity": 1,
 "propagateClick": true,
 "backgroundColorRatios": [
  0
 ],
 "scrollBarColor": "#000000",
 "minWidth": 440,
 "class": "Container",
 "backgroundColor": [
  "#CCCCCC"
 ],
 "paddingBottom": 25,
 "borderRadius": 0,
 "backgroundColorDirection": "vertical",
 "verticalAlign": "middle",
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "data": {
  "name": "-left"
 },
 "paddingTop": 25,
 "layout": "absolute",
 "maxWidth": 440
},
{
 "scrollBarOpacity": 0.5,
 "maxHeight": 640,
 "children": [
  "this.Container_CE7545ED_D45B_B64C_41C2_3660E442ABB8",
  "this.Container_CE7395ED_D45B_B64C_41E8_F437E3FAD9EF",
  "this.Container_CE6795EF_D45B_B64C_41D4_B9C44212B8A5"
 ],
 "shadowSpread": 1,
 "id": "Container_CE75A5EC_D45B_B64C_41E3_1F4B3B63A1D1",
 "left": "20%",
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "shadowColor": "#000000",
 "right": "20%",
 "gap": 0,
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "overflow": "scroll",
 "minHeight": 640,
 "scrollBarColor": "#000000",
 "backgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "horizontalAlign": "left",
 "top": "10%",
 "bottom": "20%",
 "shadowHorizontalLength": 0,
 "minWidth": 1000,
 "shadowVerticalLength": 0,
 "class": "Container",
 "backgroundColor": [
  "#CCCCCC",
  "#CCCCCC"
 ],
 "paddingBottom": 0,
 "borderRadius": 0,
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "shadowOpacity": 0.3,
 "shadow": true,
 "scrollBarVisible": "rollOver",
 "shadowBlurRadius": 25,
 "data": {
  "name": "Global"
 },
 "paddingTop": 0,
 "layout": "horizontal",
 "maxWidth": 1000
},
{
 "duration": 500,
 "id": "effect_CF7D6A2C_D4AB_DDCD_41E0_6C32E5CDBBE6",
 "class": "FadeInEffect",
 "easing": "linear"
},
{
 "scrollBarOpacity": 0.5,
 "overflow": "scroll",
 "children": [
  "this.Container_CE75A5EC_D45B_B64C_41E3_1F4B3B63A1D1"
 ],
 "id": "Container_CE48C64D_D45B_B24C_41D0_953DAB8E95D7",
 "left": "0%",
 "paddingLeft": 0,
 "paddingRight": 0,
 "right": "0%",
 "gap": 10,
 "creationPolicy": "inAdvance",
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 1,
 "scrollBarColor": "#000000",
 "backgroundOpacity": 0.6,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "horizontalAlign": "left",
 "bottom": "0%",
 "minWidth": 1,
 "top": "0%",
 "class": "Container",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "paddingBottom": 0,
 "borderRadius": 0,
 "verticalAlign": "top",
 "backgroundColorDirection": "vertical",
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "visible": false,
 "data": {
  "name": "\ud64d\ucf69 \uc12c"
 },
 "paddingTop": 0,
 "layout": "absolute",
 "scrollBarMargin": 2
},
{
 "duration": 500,
 "id": "effect_CFAE9315_D4A4_B3DC_41D1_98C2EE0D38AF",
 "class": "FadeInEffect",
 "easing": "linear"
},
{
 "items": [
  {
   "media": "this.video_C0133211_D010_F8A8_41E1_F3D0BE326121",
   "start": "this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9FVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_C08153A9_D555_6C66_41E9_7CCB037E8996, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_C08153A9_D555_6C66_41E9_7CCB037E8996, 0)",
   "begin": "this.fixTogglePlayPauseButton(this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9FVideoPlayer)",
   "player": "this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9FVideoPlayer",
   "class": "VideoPlayListItem"
  }
 ],
 "id": "playList_C08153A9_D555_6C66_41E9_7CCB037E8996",
 "class": "PlayList"
},
{
 "items": [
  {
   "media": "this.video_CDF6AB4F_D45C_D24B_41DB_2FC7C8BB91F3",
   "start": "this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9FVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_C08233A9_D555_6C66_41E9_D8E3AC635517, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_C08233A9_D555_6C66_41E9_D8E3AC635517, 0)",
   "begin": "this.fixTogglePlayPauseButton(this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9FVideoPlayer)",
   "player": "this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9FVideoPlayer",
   "class": "VideoPlayListItem"
  }
 ],
 "id": "playList_C08233A9_D555_6C66_41E9_D8E3AC635517",
 "class": "PlayList"
},
{
 "duration": 500,
 "id": "effect_CF8455D5_D4AB_565F_41E8_1CDCACC3C1BD",
 "class": "FadeInEffect",
 "easing": "linear"
},
{
 "scrollBarOpacity": 0.79,
 "maxHeight": 615,
 "overflow": "scroll",
 "children": [
  "this.Image_CE6C05EE_D45B_B64C_41D5_FCE9CCDD944A",
  "this.Button_CE6C15EE_D45B_B64C_41D1_90C5993EDBE0"
 ],
 "id": "Container_CE7345ED_D45B_B64C_41D8_F572A1AAD5D2",
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "paddingRight": 0,
 "horizontalAlign": "right",
 "width": "95.327%",
 "gap": 40,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 615,
 "backgroundOpacity": 0,
 "propagateClick": true,
 "scrollBarColor": "#E73B2C",
 "minWidth": 510,
 "class": "Container",
 "borderRadius": 0,
 "paddingBottom": 0,
 "height": 615,
 "shadow": false,
 "verticalAlign": "top",
 "scrollBarVisible": "rollOver",
 "data": {
  "name": "Container text"
 },
 "paddingTop": 25,
 "layout": "vertical",
 "maxWidth": 510
},
{
 "scrollBarOpacity": 0.5,
 "overflow": "scroll",
 "children": [
  "this.Container_CD7C5A38_D464_DDD4_41D6_E89426F1554E"
 ],
 "id": "Container_CD433AED_D464_D24E_41E3_AE723D84DA21",
 "left": "0%",
 "paddingLeft": 0,
 "paddingRight": 0,
 "right": "0%",
 "gap": 10,
 "creationPolicy": "inAdvance",
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 1,
 "scrollBarColor": "#000000",
 "backgroundOpacity": 0.6,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "horizontalAlign": "left",
 "bottom": "0%",
 "minWidth": 1,
 "top": "0%",
 "class": "Container",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "paddingBottom": 0,
 "borderRadius": 0,
 "verticalAlign": "top",
 "backgroundColorDirection": "vertical",
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "visible": false,
 "data": {
  "name": "\ub178\ud2b8\ub974\ub2f4 \ub300\uc131\ub2f9"
 },
 "paddingTop": 0,
 "layout": "absolute",
 "scrollBarMargin": 2
},
{
 "label": "\uc138\uc778\ud2b8 \ud5ec\ub80c\uc2a4 \uc0b0",
 "scaleMode": "fit_inside",
 "class": "Video",
 "width": 1920,
 "loop": false,
 "id": "video_CF5244B4_D45C_D6DC_41E3_A9007FF4A5DE",
 "thumbnailUrl": "media/video_CF5244B4_D45C_D6DC_41E3_A9007FF4A5DE_t.jpg",
 "height": 1080,
 "video": {
  "width": 1920,
  "mp4Url": "media/video_CF5244B4_D45C_D6DC_41E3_A9007FF4A5DE.mp4",
  "class": "VideoResource",
  "height": 1080
 }
},
{
 "label": "\uadf8\ub79c\ub4dc \uce90\ub2c8\uc5b8 \uad6d\ub9bd\uacf5\uc6d0",
 "scaleMode": "fit_inside",
 "class": "Video",
 "width": 1920,
 "loop": false,
 "id": "video_CF707DF7_D45C_B65B_41E7_784CD9E6AFA8",
 "thumbnailUrl": "media/video_CF707DF7_D45C_B65B_41E7_784CD9E6AFA8_t.jpg",
 "height": 1080,
 "video": {
  "width": 1920,
  "mp4Url": "media/video_CF707DF7_D45C_B65B_41E7_784CD9E6AFA8.mp4",
  "class": "VideoResource",
  "height": 1080
 }
},
{
 "maxHeight": 590,
 "id": "WebFrame_DF8BEEAF_CFB3_9CB8_41E5_A4F1DC38D43C",
 "left": "0%",
 "paddingLeft": 0,
 "paddingRight": 0,
 "right": "0%",
 "scrollEnabled": true,
 "borderSize": 0,
 "minHeight": 590,
 "url": "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13253.102891379987!2d151.2152967!3d-33.8567844!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x3133f8d75a1ac251!2z7Iuc65Oc64uIIOyYpO2OmOudvCDtlZjsmrDsiqQ!5e0!3m2!1sko!2skr!4v1575443186359!5m2!1sko!2skr",
 "backgroundOpacity": 1,
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": false,
 "bottom": "0%",
 "minWidth": 415,
 "top": "0%",
 "class": "WebFrame",
 "backgroundColor": [
  "#FFFFFF"
 ],
 "paddingBottom": 0,
 "borderRadius": 0,
 "backgroundColorDirection": "vertical",
 "insetBorder": false,
 "shadow": false,
 "data": {
  "name": "WebFrame48191"
 },
 "paddingTop": 0,
 "maxWidth": 415
},
{
 "scrollBarOpacity": 0.79,
 "maxHeight": 615,
 "overflow": "scroll",
 "children": [
  "this.Image_DE556639_CFF1_8738_41BA_BCB33135F1C9",
  "this.Button_DF8B8EAF_CFB3_9CB8_41E8_8D84B040D751"
 ],
 "id": "Container_DF8BDEAF_CFB3_9CB8_41DB_5660D40A3DEC",
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "paddingRight": 0,
 "horizontalAlign": "right",
 "width": "95.327%",
 "gap": 40,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 615,
 "backgroundOpacity": 0,
 "propagateClick": true,
 "scrollBarColor": "#E73B2C",
 "minWidth": 510,
 "class": "Container",
 "borderRadius": 0,
 "paddingBottom": 0,
 "height": 615,
 "shadow": false,
 "verticalAlign": "top",
 "scrollBarVisible": "rollOver",
 "data": {
  "name": "Container text"
 },
 "paddingTop": 25,
 "layout": "vertical",
 "maxWidth": 510
},
{
 "scrollBarOpacity": 0.51,
 "maxHeight": 640,
 "overflow": "visible",
 "children": [
  "this.Container_C84B95AA_D45F_56F4_41D6_72533EA0485E"
 ],
 "height": "100%",
 "id": "Container_C84805A6_D45F_56FC_41C6_BA330B9EA6D6",
 "scrollBarMargin": 2,
 "paddingLeft": 25,
 "paddingRight": 0,
 "horizontalAlign": "left",
 "width": 535,
 "gap": 0,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 640,
 "scrollBarColor": "#0069A3",
 "backgroundOpacity": 1,
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 535,
 "class": "Container",
 "backgroundColor": [
  "#CCCCCC",
  "#CCCCCC"
 ],
 "paddingBottom": 25,
 "borderRadius": 0,
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "data": {
  "name": "-right"
 },
 "paddingTop": 0,
 "layout": "horizontal",
 "maxWidth": 535
},
{
 "items": [
  {
   "media": "this.video_C1829366_D467_B27C_41E9_19C9C2A3F092",
   "start": "this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9FVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_C081E3A9_D555_6C66_41E3_26E138176D58, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_C081E3A9_D555_6C66_41E3_26E138176D58, 0)",
   "begin": "this.fixTogglePlayPauseButton(this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9FVideoPlayer)",
   "player": "this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9FVideoPlayer",
   "class": "VideoPlayListItem"
  }
 ],
 "id": "playList_C081E3A9_D555_6C66_41E3_26E138176D58",
 "class": "PlayList"
},
{
 "label": "\ud64d\ucf69 \uc12c",
 "scaleMode": "fit_inside",
 "class": "Video",
 "width": 1920,
 "loop": false,
 "id": "video_CDF6AB4F_D45C_D24B_41DB_2FC7C8BB91F3",
 "thumbnailUrl": "media/video_CDF6AB4F_D45C_D24B_41DB_2FC7C8BB91F3_t.jpg",
 "height": 1080,
 "video": {
  "width": 1920,
  "mp4Url": "media/video_CDF6AB4F_D45C_D24B_41DB_2FC7C8BB91F3.mp4",
  "class": "VideoResource",
  "height": 1080
 }
},
{
 "maxHeight": 20,
 "rollOverIconURL": "skin/IconButton_CEC4AE07_D45B_D5BB_41E3_03ADEEE5B5B7_rollover.png",
 "id": "IconButton_DF887EAF_CFB3_9CB8_41DD_7FB6D79C3851",
 "paddingLeft": 0,
 "paddingRight": 0,
 "horizontalAlign": "center",
 "width": 20,
 "borderSize": 0,
 "minHeight": 20,
 "backgroundOpacity": 0,
 "propagateClick": false,
 "transparencyActive": false,
 "minWidth": 20,
 "pressedIconURL": "skin/IconButton_CEC4AE07_D45B_D5BB_41E3_03ADEEE5B5B7.png",
 "click": "this.setComponentVisibility(this.Container_DF884EAF_CFB3_9CB8_41E1_96BD47779950, false, 0, null, null, false)",
 "mode": "push",
 "class": "IconButton",
 "borderRadius": 0,
 "paddingBottom": 0,
 "height": 20,
 "shadow": false,
 "verticalAlign": "middle",
 "data": {
  "name": "X"
 },
 "paddingTop": 0,
 "cursor": "hand",
 "maxWidth": 20,
 "iconURL": "skin/IconButton_CEC4AE07_D45B_D5BB_41E3_03ADEEE5B5B7.png"
},
{
 "displayPlaybackBar": true,
 "buttonStop": "this.IconButton_C0DF5EFD_CFB0_9C99_41E7_39141CDC7093",
 "id": "ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9FVideoPlayer",
 "class": "VideoPlayer",
 "buttonPlayPause": "this.IconButton_6E599476_7CD6_3169_41DB_650F1AEAFBAB",
 "viewerArea": "this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9F"
},
{
 "maxHeight": 590,
 "id": "WebFrame_CD7D3A38_D464_DDC9_41D0_B23FB0025BE6",
 "left": "0%",
 "paddingLeft": 0,
 "paddingRight": 0,
 "right": "0%",
 "scrollEnabled": true,
 "borderSize": 0,
 "minHeight": 590,
 "url": "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10501.099585939326!2d2.3499021!3d48.8529682!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x36401da7abfa068d!2z64W47Yq466W064u0IOuMgOyEseuLuQ!5e0!3m2!1sko!2skr!4v1575522936810!5m2!1sko!2skr",
 "backgroundOpacity": 1,
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": false,
 "bottom": "0%",
 "minWidth": 415,
 "top": "0%",
 "class": "WebFrame",
 "backgroundColor": [
  "#FFFFFF"
 ],
 "paddingBottom": 0,
 "borderRadius": 0,
 "backgroundColorDirection": "vertical",
 "insetBorder": false,
 "shadow": false,
 "data": {
  "name": "WebFrame48191"
 },
 "paddingTop": 0,
 "maxWidth": 415
},
{
 "scrollBarOpacity": 0.5,
 "maxHeight": 640,
 "children": [
  "this.Container_C84E15A5_D45F_56FC_41D9_F26AF965BC71",
  "this.Container_C84805A6_D45F_56FC_41C6_BA330B9EA6D6",
  "this.Container_C83D25AD_D45F_56CC_41D7_59D101C68187"
 ],
 "shadowSpread": 1,
 "id": "Container_C84E65A5_D45F_56FC_41C3_D5F703FC7CA2",
 "left": "20%",
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "shadowColor": "#000000",
 "right": "20%",
 "gap": 0,
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "overflow": "scroll",
 "minHeight": 640,
 "scrollBarColor": "#000000",
 "backgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "horizontalAlign": "left",
 "top": "10%",
 "bottom": "20%",
 "shadowHorizontalLength": 0,
 "minWidth": 1000,
 "shadowVerticalLength": 0,
 "class": "Container",
 "backgroundColor": [
  "#CCCCCC",
  "#CCCCCC"
 ],
 "paddingBottom": 0,
 "borderRadius": 0,
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "shadowOpacity": 0.3,
 "shadow": true,
 "scrollBarVisible": "rollOver",
 "shadowBlurRadius": 25,
 "data": {
  "name": "Global"
 },
 "paddingTop": 0,
 "layout": "horizontal",
 "maxWidth": 1000
},
{
 "duration": 500,
 "id": "effect_C7241DE6_D467_D67C_41D3_E51C710EB548",
 "class": "FadeInEffect",
 "easing": "linear"
},
{
 "scrollBarOpacity": 0.5,
 "overflow": "scroll",
 "children": [
  "this.Container_DF8B0EAF_CFB3_9CB8_41E4_AB5E34C23898"
 ],
 "id": "Container_DF884EAF_CFB3_9CB8_41E1_96BD47779950",
 "left": "0%",
 "paddingLeft": 0,
 "paddingRight": 0,
 "right": "0%",
 "gap": 10,
 "creationPolicy": "inAdvance",
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 1,
 "scrollBarColor": "#000000",
 "backgroundOpacity": 0.6,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "horizontalAlign": "left",
 "bottom": "0%",
 "minWidth": 1,
 "top": "0%",
 "class": "Container",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "paddingBottom": 0,
 "borderRadius": 0,
 "verticalAlign": "top",
 "backgroundColorDirection": "vertical",
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "visible": false,
 "data": {
  "name": "\uc2dc\ub4dc\ub2c8 \uc624\ud398\ub77c \ud558\uc6b0\uc2a4"
 },
 "paddingTop": 0,
 "layout": "absolute",
 "scrollBarMargin": 2
},
{
 "partial": true,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_80D13AEC_8D09_AEB1_41D9_2DF9BEE19E00_0/f/0/{row}_{column}.jpg",
      "rowCount": 49,
      "height": 25088,
      "width": 25088,
      "colCount": 49,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_80D13AEC_8D09_AEB1_41D9_2DF9BEE19E00_0/f/1/{row}_{column}.jpg",
      "rowCount": 25,
      "height": 12800,
      "width": 12800,
      "colCount": 25,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_80D13AEC_8D09_AEB1_41D9_2DF9BEE19E00_0/f/2/{row}_{column}.jpg",
      "rowCount": 13,
      "height": 6656,
      "width": 6656,
      "colCount": 13,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_80D13AEC_8D09_AEB1_41D9_2DF9BEE19E00_0/f/3/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "width": 3584,
      "colCount": 7,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_80D13AEC_8D09_AEB1_41D9_2DF9BEE19E00_0/f/4/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "width": 2048,
      "colCount": 4,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_80D13AEC_8D09_AEB1_41D9_2DF9BEE19E00_0/f/5/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "width": 1024,
      "colCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_80D13AEC_8D09_AEB1_41D9_2DF9BEE19E00_0/f/6/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "width": 512,
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_80D13AEC_8D09_AEB1_41D9_2DF9BEE19E00_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 17.05,
 "id": "panorama_80D13AEC_8D09_AEB1_41D9_2DF9BEE19E00",
 "class": "Panorama",
 "label": "World Map",
 "thumbnailUrl": "media/panorama_80D13AEC_8D09_AEB1_41D9_2DF9BEE19E00_t.jpg",
 "pitch": 0,
 "overlays": [
  "this.overlay_AE66D3BF_A130_5AB5_41E3_805A6A7A3EC0",
  "this.overlay_80D09AED_8D09_AEB3_41A6_0F9CAE86A560",
  "this.overlay_AFB91C65_A130_6DD5_41C8_913CC9BFE19D",
  "this.overlay_C979750E_D4AC_B7CC_41CA_E4FA4E697046",
  "this.overlay_80D0FAED_8D09_AEB3_41C8_806326E42906",
  "this.overlay_80D25AED_8D09_AEB3_41DF_92F408240D87",
  "this.overlay_A5FED8D3_B492_1267_41BE_E5146930D694",
  "this.overlay_A7B6B7C0_B492_3E61_41C0_531B490E2033"
 ],
 "hfovMax": 15,
 "hfov": 30
},
{
 "maxHeight": 510,
 "height": 510,
 "id": "Image_CEC60E05_D45B_D5BF_41E8_40BA5F12420E",
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": 510,
 "borderSize": 0,
 "minHeight": 510,
 "url": "skin/Image_CEC60E05_D45B_D5BF_41E8_40BA5F12420E.png",
 "backgroundOpacity": 0,
 "propagateClick": false,
 "minWidth": 510,
 "class": "Image",
 "borderRadius": 0,
 "paddingBottom": 0,
 "verticalAlign": "top",
 "shadow": false,
 "data": {
  "name": "Image7152"
 },
 "scaleMode": "fit_inside",
 "paddingTop": 0,
 "maxWidth": 510
},
{
 "scrollBarOpacity": 0.79,
 "maxHeight": 615,
 "overflow": "scroll",
 "children": [
  "this.Image_C843F5AB_D45F_56F4_41E9_4C0BFE490491",
  "this.Button_C84365AC_D45F_56CC_41E9_BF7B66F3993F"
 ],
 "id": "Container_C84B95AA_D45F_56F4_41D6_72533EA0485E",
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "paddingRight": 0,
 "horizontalAlign": "right",
 "width": "95.327%",
 "gap": 40,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 615,
 "backgroundOpacity": 0,
 "propagateClick": true,
 "scrollBarColor": "#E73B2C",
 "minWidth": 510,
 "class": "Container",
 "borderRadius": 0,
 "paddingBottom": 0,
 "height": 615,
 "shadow": false,
 "verticalAlign": "top",
 "scrollBarVisible": "rollOver",
 "data": {
  "name": "Container text"
 },
 "paddingTop": 25,
 "layout": "vertical",
 "maxWidth": 510
},
{
 "maxHeight": 510,
 "height": 510,
 "id": "Image_DE556639_CFF1_8738_41BA_BCB33135F1C9",
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": 510,
 "borderSize": 0,
 "minHeight": 510,
 "url": "skin/Image_DE556639_CFF1_8738_41BA_BCB33135F1C9.png",
 "backgroundOpacity": 0,
 "propagateClick": false,
 "minWidth": 510,
 "class": "Image",
 "borderRadius": 0,
 "paddingBottom": 0,
 "verticalAlign": "top",
 "shadow": false,
 "data": {
  "name": "Image7152"
 },
 "scaleMode": "fit_inside",
 "paddingTop": 0,
 "maxWidth": 510
},
{
 "id": "IconButton_C0DF5EFD_CFB0_9C99_41E7_39141CDC7093",
 "paddingLeft": 0,
 "paddingRight": 0,
 "horizontalAlign": "center",
 "width": 40,
 "borderSize": 0,
 "minHeight": 0,
 "backgroundOpacity": 0,
 "propagateClick": false,
 "transparencyActive": true,
 "minWidth": 0,
 "pressedIconURL": "skin/IconButton_C0DF5EFD_CFB0_9C99_41E7_39141CDC7093_pressed.png",
 "click": "this.setComponentVisibility(this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9F, false, 0, this.effect_C72C1325_D464_B3FF_41DA_8886918156AF, 'hideEffect', false); this.setComponentVisibility(this.Container_C0032120_CFB0_85A8_41D1_BBFE7EB19031, false, 0, this.effect_C72C1325_D464_B3FF_41DA_8886918156AF, 'hideEffect', false)",
 "mode": "push",
 "class": "IconButton",
 "borderRadius": 0,
 "paddingBottom": 0,
 "height": 40,
 "shadow": false,
 "verticalAlign": "middle",
 "data": {
  "name": "Exit"
 },
 "paddingTop": 0,
 "cursor": "hand",
 "iconURL": "skin/IconButton_C0DF5EFD_CFB0_9C99_41E7_39141CDC7093.png"
},
{
 "maxHeight": 510,
 "height": 510,
 "id": "Image_C843F5AB_D45F_56F4_41E9_4C0BFE490491",
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": 510,
 "borderSize": 0,
 "minHeight": 510,
 "url": "skin/Image_C843F5AB_D45F_56F4_41E9_4C0BFE490491.png",
 "backgroundOpacity": 0,
 "propagateClick": false,
 "minWidth": 510,
 "class": "Image",
 "borderRadius": 0,
 "paddingBottom": 0,
 "verticalAlign": "top",
 "shadow": false,
 "data": {
  "name": "Image7152"
 },
 "scaleMode": "fit_inside",
 "paddingTop": 0,
 "maxWidth": 510
},
{
 "maxHeight": 20,
 "rollOverIconURL": "skin/IconButton_CEC4AE07_D45B_D5BB_41E3_03ADEEE5B5B7_rollover.png",
 "id": "IconButton_CE65D5EF_D45B_B64C_41E6_41B5274E0E70",
 "paddingLeft": 0,
 "paddingRight": 0,
 "horizontalAlign": "center",
 "width": 20,
 "borderSize": 0,
 "minHeight": 20,
 "backgroundOpacity": 0,
 "propagateClick": false,
 "transparencyActive": false,
 "minWidth": 20,
 "pressedIconURL": "skin/IconButton_CEC4AE07_D45B_D5BB_41E3_03ADEEE5B5B7.png",
 "click": "this.setComponentVisibility(this.Container_CE48C64D_D45B_B24C_41D0_953DAB8E95D7, false, 0, null, null, false)",
 "mode": "push",
 "class": "IconButton",
 "borderRadius": 0,
 "paddingBottom": 0,
 "height": 20,
 "shadow": false,
 "verticalAlign": "middle",
 "data": {
  "name": "X"
 },
 "paddingTop": 0,
 "cursor": "hand",
 "maxWidth": 20,
 "iconURL": "skin/IconButton_CEC4AE07_D45B_D5BB_41E3_03ADEEE5B5B7.png"
},
{
 "label": "\uc2dc\ub4dc\ub2c8 \uc624\ud398\ub77c \ud558\uc6b0\uc2a4",
 "scaleMode": "fit_inside",
 "class": "Video",
 "width": 1920,
 "loop": false,
 "id": "video_C0133211_D010_F8A8_41E1_F3D0BE326121",
 "thumbnailUrl": "media/video_C0133211_D010_F8A8_41E1_F3D0BE326121_t.jpg",
 "height": 1080,
 "video": {
  "width": 1920,
  "mp4Url": "media/video_C0133211_D010_F8A8_41E1_F3D0BE326121.mp4",
  "class": "VideoResource",
  "height": 1080
 }
},
{
 "iconWidth": 30,
 "layout": "horizontal",
 "maxHeight": 40,
 "data": {
  "name": "Button"
 },
 "shadowSpread": 1,
 "backgroundColor": [
  "#04A3E1"
 ],
 "id": "Button_CD7F3A3E_D464_DDCC_41E1_75F26E4EE55C",
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 0,
 "shadowOpacity": 0,
 "fontFamily": "Noto Sans CJK KR Bold",
 "horizontalAlign": "center",
 "width": 136,
 "gap": 5,
 "shadowColor": "#000000",
 "borderSize": 0,
 "textDecoration": "none",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minHeight": 40,
 "propagateClick": false,
 "backgroundColorRatios": [
  0
 ],
 "shadowHorizontalLength": 3,
 "minWidth": 136,
 "borderColor": "#000000",
 "fontColor": "#333333",
 "fontSize": "20px",
 "label": "\uc601\uc0c1 \ubcf4\uae30",
 "shadowVerticalLength": 0,
 "mode": "push",
 "class": "Button",
 "height": 40,
 "click": "this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9F.bind('hide', function(e){ e.source.unbind('hide', arguments.callee, this); this.playList_C081E3A9_D555_6C66_41E3_26E138176D58.set('selectedIndex', -1); }, this); this.playList_C081E3A9_D555_6C66_41E3_26E138176D58.set('selectedIndex', 0); this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9FVideoPlayer.play(); this.setComponentVisibility(this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9F, true, 0, this.effect_C7241DE6_D467_D67C_41D3_E51C710EB548, 'showEffect', false); this.setComponentVisibility(this.Container_C0032120_CFB0_85A8_41D1_BBFE7EB19031, true, 0, this.effect_C7241DE6_D467_D67C_41D3_E51C710EB548, 'showEffect', false)",
 "paddingBottom": 0,
 "iconHeight": 30,
 "borderRadius": 0,
 "verticalAlign": "middle",
 "pressedBackgroundColor": [
  "#000000"
 ],
 "backgroundColorDirection": "vertical",
 "pressedBackgroundOpacity": 0,
 "shadow": true,
 "rollOverBackgroundOpacity": 0,
 "fontStyle": "normal",
 "iconBeforeLabel": true,
 "shadowBlurRadius": 6,
 "paddingTop": 0,
 "cursor": "hand",
 "maxWidth": 136,
 "fontWeight": "normal",
 "iconURL": "skin/Button_CEC66E05_D45B_D5BF_41C4_5CE3A5954D82.png"
},
{
 "scrollBarOpacity": 0.51,
 "maxHeight": 640,
 "overflow": "visible",
 "children": [
  "this.Container_CD7D5A3E_D464_DDCC_41CF_3F376881371A"
 ],
 "height": "100%",
 "id": "Container_CD7D0A3D_D464_DDCC_41E4_7B6D286BF971",
 "scrollBarMargin": 2,
 "paddingLeft": 25,
 "paddingRight": 0,
 "horizontalAlign": "left",
 "width": 535,
 "gap": 0,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 640,
 "scrollBarColor": "#0069A3",
 "backgroundOpacity": 1,
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 535,
 "class": "Container",
 "backgroundColor": [
  "#CCCCCC",
  "#CCCCCC"
 ],
 "paddingBottom": 25,
 "borderRadius": 0,
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "data": {
  "name": "-right"
 },
 "paddingTop": 0,
 "layout": "horizontal",
 "maxWidth": 535
},
{
 "scrollBarOpacity": 0.79,
 "maxHeight": 615,
 "overflow": "scroll",
 "children": [
  "this.Image_CD7DFA3E_D464_DDCC_41D9_918F531A3D17",
  "this.Button_CD7F3A3E_D464_DDCC_41E1_75F26E4EE55C"
 ],
 "id": "Container_CD7D5A3E_D464_DDCC_41CF_3F376881371A",
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "paddingRight": 0,
 "horizontalAlign": "right",
 "width": "95.327%",
 "gap": 40,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 615,
 "backgroundOpacity": 0,
 "propagateClick": true,
 "scrollBarColor": "#E73B2C",
 "minWidth": 510,
 "class": "Container",
 "borderRadius": 0,
 "paddingBottom": 0,
 "height": 615,
 "shadow": false,
 "verticalAlign": "top",
 "scrollBarVisible": "rollOver",
 "data": {
  "name": "Container text"
 },
 "paddingTop": 25,
 "layout": "vertical",
 "maxWidth": 510
},
{
 "maps": [
  {
   "hfov": 0.14,
   "yaw": 8.15,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 3.27,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_80D13AEC_8D09_AEB1_41D9_2DF9BEE19E00_1_HS_17_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 22
     }
    ]
   }
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.setComponentVisibility(this.Container_C8F21624_D45F_55FC_41E5_DE32E668F410, true, 0, this.effect_CF8455D5_D4AB_565F_41E8_1CDCACC3C1BD, 'showEffect', false)",
   "toolTip": "\uadf8\ub79c\ub4dc \uce90\ub2c8\uc5b8",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_80D13AEC_8D09_AEB1_41D9_2DF9BEE19E00_1_HS_17_0.png",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 40
     }
    ]
   },
   "pitch": 3.27,
   "yaw": 8.15,
   "hfov": 0.14
  }
 ],
 "id": "overlay_AE66D3BF_A130_5AB5_41E3_805A6A7A3EC0",
 "data": {
  "label": "\uadf8\ub79c\ub4dc\ucf00\ub2c8\uc5b8"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "hfov": 0.14,
   "yaw": 7.27,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 4.31,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_80D13AEC_8D09_AEB1_41D9_2DF9BEE19E00_1_HS_11_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 22
     }
    ]
   }
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.setComponentVisibility(this.Container_CEA66E9F_D45B_D2CC_41E3_CB7218F7EE17, true, 0, this.effect_CF7D6A2C_D4AB_DDCD_41E0_6C32E5CDBBE6, 'showEffect', false)",
   "toolTip": "\uc138\uc778\ud2b8 \ud5ec\ub80c\uc2a4 \uc0b0",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_80D13AEC_8D09_AEB1_41D9_2DF9BEE19E00_1_HS_11_0.png",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 40
     }
    ]
   },
   "pitch": 4.31,
   "yaw": 7.27,
   "hfov": 0.14
  }
 ],
 "id": "overlay_80D09AED_8D09_AEB3_41A6_0F9CAE86A560",
 "data": {
  "label": "\uc138\uc778\ud2b8 \ud5ec\ub80c\uc2a4 \uc0b0"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "hfov": 0.14,
   "yaw": -3.37,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 1.81,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_80D13AEC_8D09_AEB1_41D9_2DF9BEE19E00_1_HS_18_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 22
     }
    ]
   }
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.setComponentVisibility(this.Container_CE48C64D_D45B_B24C_41D0_953DAB8E95D7, true, 0, this.effect_CFAE9315_D4A4_B3DC_41D1_98C2EE0D38AF, 'showEffect', false)",
   "toolTip": "\ud64d\ucf69 \uc12c",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_80D13AEC_8D09_AEB1_41D9_2DF9BEE19E00_1_HS_18_0.png",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 40
     }
    ]
   },
   "pitch": 1.81,
   "yaw": -3.37,
   "hfov": 0.14
  }
 ],
 "id": "overlay_AFB91C65_A130_6DD5_41C8_913CC9BFE19D",
 "data": {
  "label": "\ud64d\ucf69"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "maps": [
  {
   "hfov": 0.14,
   "yaw": -1.26,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 3.18,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_80D13AEC_8D09_AEB1_41D9_2DF9BEE19E00_1_HS_22_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 22
     }
    ]
   }
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "toolTip": "\ud6c4\uc9c0\uc0b0",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_80D13AEC_8D09_AEB1_41D9_2DF9BEE19E00_1_HS_22_0.png",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 40
     }
    ]
   },
   "pitch": 3.18,
   "yaw": -1.26,
   "hfov": 0.14
  }
 ],
 "id": "overlay_C979750E_D4AC_B7CC_41CA_E4FA4E697046",
 "data": {
  "label": "\ud6c4\uc9c0\uc0b0"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "hfov": 0.14,
   "yaw": -13,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 4.58,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_80D13AEC_8D09_AEB1_41D9_2DF9BEE19E00_1_HS_12_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 22
     }
    ]
   }
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.setComponentVisibility(this.Container_CD433AED_D464_D24E_41E3_AE723D84DA21, true, 0, this.effect_C37D5BAD_D465_B2CC_41DC_92D85B8EBC09, 'showEffect', false)",
   "toolTip": "\ub178\ud2b8\ub974\ub2f4 \ub300\uc131\ub2f9",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_80D13AEC_8D09_AEB1_41D9_2DF9BEE19E00_1_HS_12_0.png",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 40
     }
    ]
   },
   "pitch": 4.58,
   "yaw": -13,
   "hfov": 0.14
  }
 ],
 "id": "overlay_80D0FAED_8D09_AEB3_41C8_806326E42906",
 "data": {
  "label": "\ub178\ud2b8\ub974\ub2f4"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "hfov": 0.14,
   "yaw": -0.27,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -4.25,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_80D13AEC_8D09_AEB1_41D9_2DF9BEE19E00_1_HS_15_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 22
     }
    ]
   }
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.setComponentVisibility(this.Container_DF884EAF_CFB3_9CB8_41E1_96BD47779950, true, 0, this.effect_C5DE5919_D017_88D8_41E9_3302DCBA8FB9, 'showEffect', false)",
   "toolTip": "\uc2dc\ub4dc\ub2c8 \uc624\ud398\ub77c \ud558\uc6b0\uc2a4",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_80D13AEC_8D09_AEB1_41D9_2DF9BEE19E00_1_HS_15_0.png",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 40
     }
    ]
   },
   "pitch": -4.25,
   "yaw": -0.27,
   "hfov": 0.14
  }
 ],
 "id": "overlay_80D25AED_8D09_AEB3_41DF_92F408240D87",
 "data": {
  "label": "\uc2dc\ub4dc\ub2c8 \uc624\ud398\ub77c\ud558\uc6b0\uc2a4"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "maps": [
  {
   "hfov": 0.14,
   "yaw": -13.34,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 4.86,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_80D13AEC_8D09_AEB1_41D9_2DF9BEE19E00_1_HS_19_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 22
     }
    ]
   }
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "toolTip": "\uc2a4\ud1a4\ud5e8\uc9c0",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_80D13AEC_8D09_AEB1_41D9_2DF9BEE19E00_1_HS_19_0.png",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 40
     }
    ]
   },
   "pitch": 4.86,
   "yaw": -13.34,
   "hfov": 0.14
  }
 ],
 "id": "overlay_A5FED8D3_B492_1267_41BE_E5146930D694",
 "data": {
  "label": "\uc2a4\ud1a4\ud5e8\uc9c0"
 },
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "maps": [
  {
   "hfov": 0.14,
   "yaw": -13.39,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 3.34,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_80D13AEC_8D09_AEB1_41D9_2DF9BEE19E00_1_HS_20_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 22
     }
    ]
   }
  }
 ],
 "rollOverDisplay": false,
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "toolTip": "\uc0ac\uadf8\ub77c\ub2e4 \ud30c\ubc00\ub9ac\uc544",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_80D13AEC_8D09_AEB1_41D9_2DF9BEE19E00_1_HS_20_0.png",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 40
     }
    ]
   },
   "pitch": 3.34,
   "yaw": -13.39,
   "hfov": 0.14
  }
 ],
 "id": "overlay_A7B6B7C0_B492_3E61_41C0_531B490E2033",
 "data": {
  "label": "\uc0ac\uadf8\ub77c\ub2e4 \ud30c\ubc00\ub9ac\uc544"
 },
 "class": "HotspotPanoramaOverlay"
}],
 "scrollBarVisible": "rollOver",
 "vrPolyfillScale": 0.75,
 "data": {
  "name": "Player1659"
 },
 "paddingTop": 0,
 "layout": "absolute",
 "scrollBarMargin": 2
};

	
	function HistoryData(playList) {
		this.playList = playList;
		this.list = [];
		this.pointer = -1;
	}

	HistoryData.prototype.add = function(index){
		if(this.pointer < this.list.length && this.list[this.pointer] == index) {
			return;
		}
		++this.pointer;
		this.list.splice(this.pointer, this.list.length - this.pointer, index);
	};

	HistoryData.prototype.back = function(){
		if(!this.canBack()) return;
		this.playList.set('selectedIndex', this.list[--this.pointer]);
	};

	HistoryData.prototype.forward = function(){
		if(!this.canForward()) return;
		this.playList.set('selectedIndex', this.list[++this.pointer]);
	};

	HistoryData.prototype.canBack = function(){
		return this.pointer > 0;
	};

	HistoryData.prototype.canForward = function(){
		return this.pointer >= 0 && this.pointer < this.list.length-1;
	};
	//

	if(script.data == undefined)
		script.data = {};
	script.data["history"] = {};    //playListID -> HistoryData

	TDV.PlayerAPI.defineScript(script);
})();
