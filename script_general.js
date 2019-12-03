(function(){
	var script = {
 "downloadEnabled": true,
 "buttonToggleFullscreen": "this.IconButton_6F0C8058_7BF6_B518_41CB_7D6B84744FF3",
 "class": "Player",
 "vrPolyfillScale": 1,
 "id": "rootPlayer",
 "scripts": {
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ var audioData = audios[audio.get('id')]; if(audioData){ audio = audioData.audio; delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "stopGlobalAudios": function(onlyForeground){  var audios = window.currentGlobalAudios; var self = this; if(audios){ Object.keys(audios).forEach(function(key){ var data = audios[key]; if(!onlyForeground || (onlyForeground && !data.asBackground)) { self.stopGlobalAudio(data.audio); } }); } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "getKey": function(key){  return window[key]; },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "registerTextVariable": function(obj){  var property = (function(){ switch(obj.get('class')) { case 'Label': return 'text'; case 'Button': case 'BaseButton': return 'label'; case 'HTMLText': return 'html'; } })(); if(property == undefined) return; var re = new RegExp('\\{\\{\\s*(\\w+)\\s*\\}\\}', 'g'); var text = obj.get(property); var data = obj.get('data') || {}; data[property] = text; obj.set('data', data); var updateLabel = function(vars) { var text = data[property]; for(var i = 0; i<vars.length; ++i){ var info = vars[i]; var index = info.dispatcher.get('selectedIndex'); if (index >= 0) { var srcPropArray = info.src.split('.'); var src = info.dispatcher.get('items')[index]; for (var j = 0; j < srcPropArray.length; ++j) src = 'get' in src ? src.get(srcPropArray[j]) : src[srcPropArray[j]]; text = text.replace(info.replace, src); } } obj.set(property, text); }; var vars = []; var addVars = function(dispatcher, eventName, src, replace) { vars.push({'dispatcher': dispatcher, 'eventName': eventName, 'src': src, 'replace': replace}); }; while (null != (result = re.exec(text))) { switch (result[1]) { case 'title': addVars(this.mainPlayList, 'change', 'media.label', result[0]); break; case 'subtitle': addVars(this.mainPlayList, 'change', 'media.data.subtitle', result[0]); break; } } if(vars.length > 0){ var func = updateLabel.bind(this, vars); for(var i = 0; i<vars.length; ++i){ var info = vars[i]; info.dispatcher.bind(info.eventName, func, this); } } },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback, stopBackgroundAudio){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')].audio; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } var src = this.playGlobalAudio(audio, endCallback); if(stopBackgroundAudio === true){ var stateChangeFunc = function(){ if(src.get('state') == 'playing'){ this.pauseGlobalAudios(src.get('id'), [src]); } else /*if(src.get('state') == 'stopped')*/{ this.resumeGlobalAudios(src.get('id')); src.unbind('stateChange', stateChangeFunc, this); } }; src.bind('stateChange', stateChangeFunc, this); } return src; },
  "playGlobalAudio": function(audio, endCallback, asBackground){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = {'audio': audio, 'asBackground': asBackground || false}; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios).map(function(v) { return v.audio })); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "getFirstPlayListWithMedia": function(media, onlySelected){  var playLists = this.getPlayListsWithMedia(media, onlySelected); return playLists.length > 0 ? playLists[0] : undefined; },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext, true); }; playNext(); },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ var audioData = audios[audio.get('id')]; if(audioData) audio = audioData.audio; } if(audio.get('state') == 'playing') audio.pause(); },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "shareSocial": function(socialID, url, deepLink){  if(url == undefined) { url = deepLink ? location.href : location.href.split(location.search||location.hash||/[?#]/)[0]; } else if(deepLink) { url += location.hash; } url = (function(id){ switch(id){ case 'fb': return 'https://www.facebook.com/sharer/sharer.php?u='+url; case 'wa': return 'https://api.whatsapp.com/send/?text='+encodeURIComponent(url); case 'tw': return 'https://twitter.com/intent/tweet?source=webclient&url='+url; default: return undefined; } })(socialID); window.open(url, '_blank'); },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "setOverlayBehaviour": function(overlay, media, action, preventDoubleClick){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(preventDoubleClick){ if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 1000); } }; if(preventDoubleClick && window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getFirstPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = undefined; if(mediaDispatcher){ var playListsWithMedia = this.getPlayListsWithMedia(mediaDispatcher, true); playListDispatcher = playListsWithMedia.indexOf(playList) != -1 ? playList : (playListsWithMedia.length > 0 ? playListsWithMedia[0] : undefined); } if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } item.bind('begin', onBeginFunction, self); this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "existsKey": function(key){  return key in window; },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')].audio; } return audio; },
  "getPlayListsWithMedia": function(media, onlySelected){  var result = []; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) result.push(playList); } return result; },
  "_initItemWithComps": function(playList, index, components, eventName, visible, effectToApply, delay, restoreStateAt){  var item = playList.get('items')[index]; var registerVisibility = restoreStateAt > 0; var rootPlayer = this.rootPlayer; var cloneEffect = function(visible) { var klass = effectToApply ? effectToApply.get('class') : undefined; var effect = undefined; switch(klass) { case 'FadeInEffect': case 'FadeOutEffect': effect = rootPlayer.createInstance(visible ? 'FadeInEffect' : 'FadeOutEffect'); break; case 'SlideInEffect': case 'SlideOutEffect': effect = rootPlayer.createInstance(visible ? 'SlideInEffect' : 'SlideOutEffect'); break; } if(effect){ effect.set('duration', effectToApply.get('duration')); effect.set('easing', effectToApply.get('easing')); if(klass.indexOf('Slide') != -1) effect.set(visible ? 'from' : 'to', effectToApply.get(visible ? 'to' : 'from')); } return effect; }; var endFunc = function() { for(var i = 0, count = components.length; i<count; ++i) { var component = components[i]; if(restoreStateAt > 0){ this.setComponentVisibility(component, !visible, 0, cloneEffect(!visible)); } else { var key = 'visibility_' + component.get('id'); if(this.existsKey(key)) { if(this.getKey(key)) this.setComponentVisibility(component, true, 0, cloneEffect(true)); else this.setComponentVisibility(component, false, 0, cloneEffect(false)); this.unregisterKey(key); } } } item.unbind('end', endFunc, this); if(addMediaEndEvent) media.unbind('end', endFunc, this); }; var stopFunc = function() { item.unbind('stop', stopFunc, this, true); item.unbind('stop', stopFunc, this); item.unbind('begin', stopFunc, this, true); item.unbind('begin', stopFunc, this); for(var i = 0, count = components.length; i<count; ++i) { this.keepCompVisible(components[i], false); } }; var addEvent = function(eventName, delay, restoreStateAt){ var changeFunc = function(){ var changeVisibility = function(component, visible, effect) { rootPlayer.setComponentVisibility(component, visible, delay, effect, visible ? 'showEffect' : 'hideEffect', false); if(restoreStateAt > 0){ var time = delay + restoreStateAt + (effect != undefined ? effect.get('duration') : 0); rootPlayer.setComponentVisibility(component, !visible, time, cloneEffect(!visible), visible ? 'hideEffect' : 'showEffect', true); } }; for(var i = 0, count = components.length; i<count; ++i){ var component = components[i]; if(visible == 'toggle'){ if(!component.get('visible')) changeVisibility(component, true, cloneEffect(true)); else changeVisibility(component, false, cloneEffect(false)); } else { changeVisibility(component, visible, cloneEffect(visible)); } } item.unbind(eventName, changeFunc, this); }; item.bind(eventName, changeFunc, this) }; if(eventName == 'begin'){ for(var i = 0, count = components.length; i<count; ++i){ var component = components[i]; this.keepCompVisible(component, true); if(registerVisibility) { var key = 'visibility_' + component.get('id'); this.registerKey(key, component.get('visible')); } } item.bind('stop', stopFunc, this, true); item.bind('stop', stopFunc, this); item.bind('begin', stopFunc, this, true); item.bind('begin', stopFunc, this); if(registerVisibility){ item.bind('end', endFunc, this); var media = item.get('media'); var addMediaEndEvent = media.get('loop') != undefined && !(media.get('loop')); if(addMediaEndEvent) media.bind('end', endFunc, this); } } else if(eventName == 'end' && restoreStateAt > 0){ addEvent('begin', restoreStateAt, 0); restoreStateAt = 0; } if(eventName != undefined) addEvent(eventName, delay, restoreStateAt); },
  "unregisterKey": function(key){  delete window[key]; },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "keepCompVisible": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "registerKey": function(key, value){  window[key] = value; },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; }
 },
 "start": "this.playAudioList([this.audio_D08E2941_C469_F2EC_41D7_04BA458AECE7]); this.init(); this.syncPlaylists([this.mainPlayList,this.ThumbnailList_3110C4FE_3FEE_AA94_41CF_038F42695873_playlist]); this.playList_DCF300E9_C98E_CEEE_41C7_D6CEAC83FABA.set('selectedIndex', 0); if(!this.get('fullscreenAvailable')) { [this.IconButton_6F0C8058_7BF6_B518_41CB_7D6B84744FF3].forEach(function(component) { component.set('visible', false); }) }",
 "paddingRight": 0,
 "scrollBarColor": "#000000",
 "gap": 10,
 "desktopMipmappingEnabled": false,
 "scrollBarMargin": 2,
 "borderSize": 0,
 "propagateClick": false,
 "paddingLeft": 0,
 "definitions": [{
 "automaticZoomSpeed": 10,
 "id": "camera_DFE1F1C0_C98E_CF1E_41D9_EA5984914C5D",
 "initialPosition": {
  "yaw": -45.31,
  "hfov": 120,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "class": "PanoramaCamera"
},
{
 "rotationY": 0,
 "showEasing": "cubic_in",
 "hfov": 7.03,
 "rotationZ": 0,
 "popupMaxHeight": "80%",
 "id": "popup_9DE78CB1_B4BC_3DA4_41D4_040BDB53775C",
 "rotationX": 0,
 "popupDistance": 100,
 "hideDuration": 500,
 "image": {
  "levels": [
   {
    "url": "media/popup_9DE78CB1_B4BC_3DA4_41D4_040BDB53775C_0_1.jpg",
    "width": 1024,
    "height": 683,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "popupMaxWidth": "80%",
 "showDuration": 500,
 "yaw": 0.01,
 "hideEasing": "cubic_out",
 "pitch": 1.76,
 "class": "PopupPanoramaOverlay"
},
{
 "automaticZoomSpeed": 10,
 "id": "camera_DF342262_C98E_CDE2_41DC_414AD3425765",
 "initialPosition": {
  "yaw": -28.69,
  "hfov": 120,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "class": "PanoramaCamera"
},
{
 "hfov": 360,
 "label": "\uc601\ub155\uc804",
 "id": "panorama_F70332DE_B1CD_04BF_41E0_52AD5D23EC3B",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_F70332DE_B1CD_04BF_41E0_52AD5D23EC3B_t.jpg",
 "adjacentPanoramas": [
  {
   "backwardYaw": -96.41,
   "yaw": 179.12,
   "panorama": "this.panorama_BB22B334_A60C_C516_41D4_85E2A3F602F3",
   "distance": 1,
   "class": "AdjacentPanorama"
  },
  {
   "backwardYaw": 122.89,
   "yaw": 126.56,
   "panorama": "this.panorama_B111BE24_A69F_6249_41D8_210A06A45A13",
   "distance": 1,
   "class": "AdjacentPanorama"
  },
  {
   "backwardYaw": 154.04,
   "yaw": 120.24,
   "panorama": "this.panorama_B149B9F0_A69E_A1C9_41A3_7D34CCC4C924",
   "distance": 1,
   "class": "AdjacentPanorama"
  },
  {
   "backwardYaw": -82.3,
   "yaw": 91.92,
   "panorama": "this.panorama_BB3EA0D4_A6BA_FFC9_41B5_378AA4C71E29",
   "distance": 1,
   "class": "AdjacentPanorama"
  }
 ],
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F70332DE_B1CD_04BF_41E0_52AD5D23EC3B_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F70332DE_B1CD_04BF_41E0_52AD5D23EC3B_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F70332DE_B1CD_04BF_41E0_52AD5D23EC3B_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F70332DE_B1CD_04BF_41E0_52AD5D23EC3B_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F70332DE_B1CD_04BF_41E0_52AD5D23EC3B_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F70332DE_B1CD_04BF_41E0_52AD5D23EC3B_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F70332DE_B1CD_04BF_41E0_52AD5D23EC3B_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F70332DE_B1CD_04BF_41E0_52AD5D23EC3B_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F70332DE_B1CD_04BF_41E0_52AD5D23EC3B_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F70332DE_B1CD_04BF_41E0_52AD5D23EC3B_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F70332DE_B1CD_04BF_41E0_52AD5D23EC3B_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F70332DE_B1CD_04BF_41E0_52AD5D23EC3B_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F70332DE_B1CD_04BF_41E0_52AD5D23EC3B_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F70332DE_B1CD_04BF_41E0_52AD5D23EC3B_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F70332DE_B1CD_04BF_41E0_52AD5D23EC3B_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F70332DE_B1CD_04BF_41E0_52AD5D23EC3B_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F70332DE_B1CD_04BF_41E0_52AD5D23EC3B_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F70332DE_B1CD_04BF_41E0_52AD5D23EC3B_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F70332DE_B1CD_04BF_41E0_52AD5D23EC3B_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F70332DE_B1CD_04BF_41E0_52AD5D23EC3B_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F70332DE_B1CD_04BF_41E0_52AD5D23EC3B_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F70332DE_B1CD_04BF_41E0_52AD5D23EC3B_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F70332DE_B1CD_04BF_41E0_52AD5D23EC3B_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_F70332DE_B1CD_04BF_41E0_52AD5D23EC3B_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F70332DE_B1CD_04BF_41E0_52AD5D23EC3B_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "mapLocations": [
  {
   "map": "this.map_D5C2EFDB_B155_1C85_41D8_129DE828BE4B",
   "x": 208.64,
   "angle": 30.49,
   "y": 369.1,
   "class": "PanoramaMapLocation"
  }
 ],
 "hfovMin": "200%",
 "partial": false,
 "pitch": 0,
 "hfovMax": 135,
 "overlays": [
  "this.overlay_F70322DE_B1CD_04BF_41E1_76362C2F0262",
  "this.overlay_F70312DF_B1CD_04BD_41E4_58A6221717F8",
  "this.overlay_FD97551E_B1DB_0DBF_41D1_BE5A704E2EFF",
  "this.overlay_C14B125F_B175_07BD_41E1_ED5F997143A0",
  "this.overlay_C1C48F16_B14B_1D8F_41DA_2CAE50DF2778",
  "this.overlay_A08F6975_B48C_24AC_41E2_B48CEB0E3691",
  "this.panorama_F70332DE_B1CD_04BF_41E0_52AD5D23EC3B_tcap0",
  "this.popup_C6191F7F_C965_C02B_41E6_A6B52E9246C1"
 ],
 "class": "Panorama"
},
{
 "automaticZoomSpeed": 10,
 "id": "camera_DFBEA218_C98E_CD2E_41DE_32DCB54DCF29",
 "initialPosition": {
  "yaw": -30.05,
  "hfov": 120,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "id": "camera_DC2F1185_C98E_CF26_41BA_B2B3B0FEE82B",
 "initialPosition": {
  "yaw": 44.33,
  "hfov": 120,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "id": "camera_DFD5E1EC_C98E_CEE6_41D7_0E6B778091E1",
 "initialPosition": {
  "yaw": -68.36,
  "hfov": 120,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "id": "camera_DF9DF22B_C98E_CD62_41E0_2F2BDBBDB41B",
 "initialPosition": {
  "yaw": -53.44,
  "hfov": 120,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "class": "PanoramaCamera"
},
{
 "rotationY": 0,
 "showEasing": "cubic_in",
 "hfov": 4.07,
 "rotationZ": 0,
 "popupMaxHeight": "80%",
 "id": "popup_C6191F7F_C965_C02B_41E6_A6B52E9246C1",
 "rotationX": 0,
 "popupDistance": 100,
 "hideDuration": 500,
 "image": {
  "levels": [
   {
    "url": "media/popup_C6191F7F_C965_C02B_41E6_A6B52E9246C1_0_1.png",
    "width": 1024,
    "height": 738,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "popupMaxWidth": "80%",
 "showDuration": 500,
 "yaw": 7.43,
 "hideEasing": "cubic_out",
 "pitch": 29.63,
 "class": "PopupPanoramaOverlay"
},
{
 "hfov": 360,
 "label": "\uc5b4\ubaa9\uc695\uccad",
 "id": "panorama_EE6E3D8C_B1BD_3C83_41E2_110C74F955A8",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_EE6E3D8C_B1BD_3C83_41E2_110C74F955A8_t.jpg",
 "adjacentPanoramas": [
  {
   "backwardYaw": -135.67,
   "yaw": 149.17,
   "panorama": "this.panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32",
   "distance": 1,
   "class": "AdjacentPanorama"
  },
  {
   "backwardYaw": -42.44,
   "yaw": -153.52,
   "panorama": "this.panorama_EB987E8F_B1CD_3C9D_41CA_53E02C0E1D7E",
   "distance": 1,
   "class": "AdjacentPanorama"
  },
  {
   "backwardYaw": 177.69,
   "yaw": 179.8,
   "panorama": "this.panorama_EA55570C_B1B5_0D83_419D_402AB2B70DDF",
   "distance": 1,
   "class": "AdjacentPanorama"
  }
 ],
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_EE6E3D8C_B1BD_3C83_41E2_110C74F955A8_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EE6E3D8C_B1BD_3C83_41E2_110C74F955A8_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EE6E3D8C_B1BD_3C83_41E2_110C74F955A8_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EE6E3D8C_B1BD_3C83_41E2_110C74F955A8_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_EE6E3D8C_B1BD_3C83_41E2_110C74F955A8_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EE6E3D8C_B1BD_3C83_41E2_110C74F955A8_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EE6E3D8C_B1BD_3C83_41E2_110C74F955A8_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EE6E3D8C_B1BD_3C83_41E2_110C74F955A8_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_EE6E3D8C_B1BD_3C83_41E2_110C74F955A8_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EE6E3D8C_B1BD_3C83_41E2_110C74F955A8_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EE6E3D8C_B1BD_3C83_41E2_110C74F955A8_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EE6E3D8C_B1BD_3C83_41E2_110C74F955A8_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_EE6E3D8C_B1BD_3C83_41E2_110C74F955A8_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EE6E3D8C_B1BD_3C83_41E2_110C74F955A8_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EE6E3D8C_B1BD_3C83_41E2_110C74F955A8_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EE6E3D8C_B1BD_3C83_41E2_110C74F955A8_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_EE6E3D8C_B1BD_3C83_41E2_110C74F955A8_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EE6E3D8C_B1BD_3C83_41E2_110C74F955A8_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EE6E3D8C_B1BD_3C83_41E2_110C74F955A8_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EE6E3D8C_B1BD_3C83_41E2_110C74F955A8_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_EE6E3D8C_B1BD_3C83_41E2_110C74F955A8_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EE6E3D8C_B1BD_3C83_41E2_110C74F955A8_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EE6E3D8C_B1BD_3C83_41E2_110C74F955A8_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EE6E3D8C_B1BD_3C83_41E2_110C74F955A8_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_EE6E3D8C_B1BD_3C83_41E2_110C74F955A8_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "mapLocations": [
  {
   "map": "this.map_D5C2EFDB_B155_1C85_41D8_129DE828BE4B",
   "x": 475.05,
   "angle": -73.69,
   "y": 660.38,
   "class": "PanoramaMapLocation"
  }
 ],
 "hfovMin": "200%",
 "partial": false,
 "pitch": 0,
 "hfovMax": 135,
 "overlays": [
  "this.overlay_ECCAB1CB_B1BD_0485_41C2_4F5DBC03D0EC",
  "this.overlay_EFB8738D_B1BB_049D_41C9_D64FD6F611F7",
  "this.overlay_EF8BFB9D_B1B5_04BD_41A6_485D1FBDE775",
  "this.overlay_AC7B0515_B4F4_6C6C_41D8_6AA6C6A4DA19",
  "this.overlay_AE5256BD_B4F4_2D9C_41AE_FEBC55EB54E4",
  "this.panorama_EE6E3D8C_B1BD_3C83_41E2_110C74F955A8_tcap0",
  "this.popup_D9465AEC_C964_402D_41DF_9EA22656117C"
 ],
 "class": "Panorama"
},
{
 "hfov": 360,
 "label": "\ud5a5\ub300\uccad(\uc2e0\uc2e4)",
 "id": "panorama_8037E8B6_B1BB_048F_419F_537FF8F54FCD",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_8037E8B6_B1BB_048F_419F_537FF8F54FCD_t.jpg",
 "adjacentPanoramas": [
  {
   "backwardYaw": 179.81,
   "yaw": 177.97,
   "panorama": "this.panorama_84A271EB_A69F_E1DF_41D4_672D5AE27031",
   "distance": 1,
   "class": "AdjacentPanorama"
  },
  {
   "backwardYaw": 134.69,
   "yaw": -109.78,
   "panorama": "this.panorama_EB987E8F_B1CD_3C9D_41CA_53E02C0E1D7E",
   "distance": 1,
   "class": "AdjacentPanorama"
  }
 ],
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_8037E8B6_B1BB_048F_419F_537FF8F54FCD_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_8037E8B6_B1BB_048F_419F_537FF8F54FCD_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_8037E8B6_B1BB_048F_419F_537FF8F54FCD_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_8037E8B6_B1BB_048F_419F_537FF8F54FCD_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_8037E8B6_B1BB_048F_419F_537FF8F54FCD_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_8037E8B6_B1BB_048F_419F_537FF8F54FCD_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_8037E8B6_B1BB_048F_419F_537FF8F54FCD_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_8037E8B6_B1BB_048F_419F_537FF8F54FCD_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_8037E8B6_B1BB_048F_419F_537FF8F54FCD_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_8037E8B6_B1BB_048F_419F_537FF8F54FCD_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_8037E8B6_B1BB_048F_419F_537FF8F54FCD_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_8037E8B6_B1BB_048F_419F_537FF8F54FCD_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_8037E8B6_B1BB_048F_419F_537FF8F54FCD_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_8037E8B6_B1BB_048F_419F_537FF8F54FCD_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_8037E8B6_B1BB_048F_419F_537FF8F54FCD_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_8037E8B6_B1BB_048F_419F_537FF8F54FCD_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_8037E8B6_B1BB_048F_419F_537FF8F54FCD_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_8037E8B6_B1BB_048F_419F_537FF8F54FCD_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_8037E8B6_B1BB_048F_419F_537FF8F54FCD_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_8037E8B6_B1BB_048F_419F_537FF8F54FCD_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_8037E8B6_B1BB_048F_419F_537FF8F54FCD_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_8037E8B6_B1BB_048F_419F_537FF8F54FCD_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_8037E8B6_B1BB_048F_419F_537FF8F54FCD_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_8037E8B6_B1BB_048F_419F_537FF8F54FCD_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "snapshots": [
    "this.snapshot_73156855_7CF9_E6D1_4185_9961FE9FF10B"
   ],
   "thumbnailUrl": "media/panorama_8037E8B6_B1BB_048F_419F_537FF8F54FCD_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "mapLocations": [
  {
   "map": "this.map_D5C2EFDB_B155_1C85_41D8_129DE828BE4B",
   "x": 540.53,
   "angle": -23.74,
   "y": 819.08,
   "class": "PanoramaMapLocation"
  }
 ],
 "hfovMin": "200%",
 "partial": false,
 "pitch": 0,
 "hfovMax": 135,
 "overlays": [
  "this.overlay_803708B7_B1BB_048D_41E0_1142194FA254",
  "this.overlay_F02C8A53_C5EB_76EC_41C9_68F9E89B2771",
  "this.panorama_803738B7_B1BB_048D_41C5_F1926D8C128B",
  "this.overlay_803758B7_B1BB_048D_41D1_E85B983CD9EC",
  "this.overlay_803688B7_B1BB_048D_41BA_9DC602585642",
  "this.overlay_8036A8B7_B1BB_048D_41B2_55BBE08D7015",
  "this.overlay_8036F8B7_B1BB_048D_41BF_C98F44AEA327",
  "this.overlay_803608B7_B1BB_048D_41E4_7CB2BB3918CF",
  "this.popup_AA643CE1_B48C_7DA4_41CA_AF54CAAB8036",
  "this.popup_9DE78CB1_B4BC_3DA4_41D4_040BDB53775C"
 ],
 "class": "Panorama"
},
{
 "class": "ImageResource",
 "id": "ImageResource_87D9C34C_B494_E4FC_41D2_C51234972271",
 "levels": [
  {
   "url": "media/popup_AB47D89A_B48D_E464_41D3_3474E77D4FEC_0_0.jpg",
   "width": 1619,
   "height": 1080,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_AB47D89A_B48D_E464_41D3_3474E77D4FEC_0_1.jpg",
   "width": 1024,
   "height": 683,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_AB47D89A_B48D_E464_41D3_3474E77D4FEC_0_2.jpg",
   "width": 512,
   "height": 341,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "automaticZoomSpeed": 10,
 "id": "camera_DC3D7194_C98E_CF26_41E5_611CB803337A",
 "initialPosition": {
  "yaw": 137.56,
  "hfov": 120,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "class": "PanoramaCamera"
},
{
 "label": "\uc9c0\ub3c4",
 "fieldOfViewOverlayInsideColor": "#3333FF",
 "width": 827,
 "fieldOfViewOverlayOutsideOpacity": 0,
 "id": "map_D5C2EFDB_B155_1C85_41D8_129DE828BE4B",
 "image": {
  "levels": [
   {
    "url": "media/map_D5C2EFDB_B155_1C85_41D8_129DE828BE4B.png",
    "width": 827,
    "height": 1111,
    "class": "ImageResourceLevel"
   },
   {
    "url": "media/map_D5C2EFDB_B155_1C85_41D8_129DE828BE4B_lq.png",
    "width": 220,
    "tags": "preload",
    "height": 296,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "maximumZoomFactor": 1,
 "fieldOfViewOverlayOutsideColor": "#000000",
 "fieldOfViewOverlayInsideOpacity": 0.5,
 "fieldOfViewOverlayRadiusScale": 0.05,
 "thumbnailUrl": "media/map_D5C2EFDB_B155_1C85_41D8_129DE828BE4B_t.png",
 "minimumZoomFactor": 0.9,
 "scaleMode": "fit_inside",
 "initialZoomFactor": 1,
 "overlays": [
  "this.overlay_D5C2FFDB_B155_1C85_41B5_A677FCD3E529",
  "this.overlay_D5C28FDC_B155_1C83_41D9_2B9973ABE29A",
  "this.overlay_D5C2AFDC_B155_1C83_41DF_65C7363A9E9F",
  "this.overlay_D5C2BFDC_B155_1C83_41E1_B13DC38B001F",
  "this.overlay_D5C34FDC_B155_1C83_41D0_2050972EDB00",
  "this.overlay_D5C35FDC_B155_1C83_41D9_E149890DBB95",
  "this.overlay_D5C36FDC_B155_1C83_41CD_01B9070762F2",
  "this.overlay_D5C37FDC_B155_1C83_41E5_A81CA4465FB3",
  "this.overlay_D5C31FDC_B155_1C83_412B_3326D7B70610",
  "this.overlay_D5C33FDC_B155_1C83_41E2_23879D9E6CFA",
  "this.overlay_D5C3CFDC_B155_1C83_41B5_0C29689D3358"
 ],
 "height": 1111,
 "class": "Map"
},
{
 "rotationY": 0,
 "showEasing": "cubic_in",
 "hfov": 4.68,
 "rotationZ": 0,
 "popupMaxHeight": "80%",
 "id": "popup_D47CE4BA_C469_339C_41E1_72B8526F61C2",
 "rotationX": 0,
 "autoplay": true,
 "popupDistance": 100,
 "hideDuration": 500,
 "class": "PopupPanoramaOverlay",
 "loop": false,
 "hideEasing": "cubic_out",
 "popupMaxWidth": "80%",
 "showDuration": 500,
 "yaw": -0.16,
 "pitch": 3.26,
 "video": {
  "width": 1280,
  "mp4Url": "media/video_F4741FF2_C438_EDAC_41B3_ABA3B32796CC.mp4",
  "height": 720,
  "class": "VideoResource"
 }
},
{
 "automaticZoomSpeed": 10,
 "id": "panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32_camera",
 "initialPosition": {
  "yaw": 0,
  "hfov": 120,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "id": "camera_DC8D1120_C98E_CF1E_41E7_F60CDA5FB97A",
 "initialPosition": {
  "yaw": 98.41,
  "hfov": 120,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "id": "camera_DC6A114B_C98E_CF22_41E8_26370B2FAFA2",
 "initialPosition": {
  "yaw": 83.59,
  "hfov": 120,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "class": "PanoramaCamera"
},
{
 "id": "IconButton_B2A6FD12_863A_59AD_41BD_0C663B0C6B4F",
 "data": {
  "name": "Button37509"
 },
 "paddingRight": 0,
 "borderSize": 0,
 "backgroundOpacity": 0,
 "propagateClick": false,
 "paddingLeft": 0,
 "width": 40,
 "minHeight": 0,
 "horizontalAlign": "center",
 "pressedIconURL": "skin/IconButton_B2A6FD12_863A_59AD_41BD_0C663B0C6B4F_pressed.png",
 "transparencyActive": true,
 "height": 40,
 "paddingTop": 0,
 "mode": "toggle",
 "borderRadius": 0,
 "minWidth": 0,
 "paddingBottom": 0,
 "verticalAlign": "middle",
 "shadow": false,
 "cursor": "hand",
 "iconURL": "skin/IconButton_B2A6FD12_863A_59AD_41BD_0C663B0C6B4F.png",
 "class": "IconButton"
},
{
 "duration": 300,
 "to": "left",
 "id": "effect_A20C10F0_873A_7AF6_41DC_0014DE771BA8",
 "easing": "linear",
 "class": "SlideOutEffect"
},
{
 "hfov": 360,
 "label": "\uc7ac\uad81",
 "id": "panorama_EB987E8F_B1CD_3C9D_41CA_53E02C0E1D7E",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_EB987E8F_B1CD_3C9D_41CA_53E02C0E1D7E_t.jpg",
 "adjacentPanoramas": [
  {
   "backwardYaw": 179.63,
   "yaw": 0.27,
   "panorama": "this.panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32",
   "distance": 1,
   "class": "AdjacentPanorama"
  },
  {
   "backwardYaw": 111.64,
   "yaw": -141.58,
   "panorama": "this.panorama_BB22B334_A60C_C516_41D4_85E2A3F602F3",
   "distance": 1,
   "class": "AdjacentPanorama"
  },
  {
   "backwardYaw": -109.78,
   "yaw": 134.69,
   "panorama": "this.panorama_8037E8B6_B1BB_048F_419F_537FF8F54FCD",
   "distance": 1,
   "class": "AdjacentPanorama"
  },
  {
   "backwardYaw": -153.52,
   "yaw": -42.44,
   "panorama": "this.panorama_EE6E3D8C_B1BD_3C83_41E2_110C74F955A8",
   "distance": 1,
   "class": "AdjacentPanorama"
  },
  {
   "backwardYaw": 149.95,
   "yaw": 41.81,
   "panorama": "this.panorama_EA55570C_B1B5_0D83_419D_402AB2B70DDF",
   "distance": 1,
   "class": "AdjacentPanorama"
  }
 ],
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_EB987E8F_B1CD_3C9D_41CA_53E02C0E1D7E_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EB987E8F_B1CD_3C9D_41CA_53E02C0E1D7E_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EB987E8F_B1CD_3C9D_41CA_53E02C0E1D7E_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EB987E8F_B1CD_3C9D_41CA_53E02C0E1D7E_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_EB987E8F_B1CD_3C9D_41CA_53E02C0E1D7E_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EB987E8F_B1CD_3C9D_41CA_53E02C0E1D7E_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EB987E8F_B1CD_3C9D_41CA_53E02C0E1D7E_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EB987E8F_B1CD_3C9D_41CA_53E02C0E1D7E_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_EB987E8F_B1CD_3C9D_41CA_53E02C0E1D7E_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EB987E8F_B1CD_3C9D_41CA_53E02C0E1D7E_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EB987E8F_B1CD_3C9D_41CA_53E02C0E1D7E_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EB987E8F_B1CD_3C9D_41CA_53E02C0E1D7E_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_EB987E8F_B1CD_3C9D_41CA_53E02C0E1D7E_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EB987E8F_B1CD_3C9D_41CA_53E02C0E1D7E_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EB987E8F_B1CD_3C9D_41CA_53E02C0E1D7E_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EB987E8F_B1CD_3C9D_41CA_53E02C0E1D7E_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_EB987E8F_B1CD_3C9D_41CA_53E02C0E1D7E_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EB987E8F_B1CD_3C9D_41CA_53E02C0E1D7E_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EB987E8F_B1CD_3C9D_41CA_53E02C0E1D7E_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EB987E8F_B1CD_3C9D_41CA_53E02C0E1D7E_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_EB987E8F_B1CD_3C9D_41CA_53E02C0E1D7E_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EB987E8F_B1CD_3C9D_41CA_53E02C0E1D7E_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EB987E8F_B1CD_3C9D_41CA_53E02C0E1D7E_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EB987E8F_B1CD_3C9D_41CA_53E02C0E1D7E_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_EB987E8F_B1CD_3C9D_41CA_53E02C0E1D7E_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "hfovMin": "200%",
 "partial": false,
 "pitch": 0,
 "hfovMax": 135,
 "overlays": [
  "this.overlay_EB986E8F_B1CD_3C9D_41E0_987C088590DF",
  "this.overlay_EB981E8F_B1CD_3C9D_41C7_5CB0F8124451",
  "this.overlay_FEA6DF59_B474_7CE4_41C8_30C9D9B79D6C",
  "this.overlay_ECC3A467_B1BF_038D_41D2_70E4B688F836",
  "this.overlay_D9402DB6_B15B_3C8F_41E1_61F7C5DE6E81",
  "this.panorama_EB987E8F_B1CD_3C9D_41CA_53E02C0E1D7E_tcap0"
 ],
 "class": "Panorama"
},
{
 "toolTipShadowBlurRadius": 3,
 "maxWidth": 128,
 "class": "IconButton",
 "toolTipPaddingTop": 4,
 "toolTipShadowVerticalLength": 0,
 "id": "IconButton_6F0C8058_7BF6_B518_41CB_7D6B84744FF3",
 "maxHeight": 128,
 "data": {
  "name": "zoom icon"
 },
 "toolTipFontWeight": "normal",
 "paddingRight": 0,
 "borderSize": 0,
 "backgroundOpacity": 0,
 "propagateClick": false,
 "paddingLeft": 0,
 "toolTipPaddingRight": 4,
 "toolTipTextShadowColor": "#000000",
 "minHeight": 1,
 "toolTipBorderSize": 0,
 "transparencyActive": true,
 "toolTip": "Fullscreen",
 "width": 40,
 "toolTipShadowHorizontalLength": 0,
 "horizontalAlign": "center",
 "height": 35,
 "toolTipBorderRadius": 3,
 "paddingTop": 0,
 "mode": "toggle",
 "borderRadius": 0,
 "toolTipPaddingBottom": 4,
 "minWidth": 1,
 "toolTipShadowSpread": 0,
 "toolTipDisplayTime": 600,
 "toolTipBackgroundColor": "#000000",
 "toolTipPaddingLeft": 4,
 "toolTipShadowOpacity": 1,
 "toolTipFontSize": "1.5vmin",
 "paddingBottom": 0,
 "toolTipTextShadowOpacity": 0,
 "toolTipBorderColor": "#FFFFFF",
 "toolTipFontColor": "#FFFFFF",
 "verticalAlign": "middle",
 "toolTipFontStyle": "normal",
 "toolTipShadowColor": "#333333",
 "toolTipTextShadowBlurRadius": 3,
 "shadow": false,
 "toolTipOpacity": 1,
 "cursor": "hand",
 "iconURL": "skin/IconButton_6F0C8058_7BF6_B518_41CB_7D6B84744FF3.png",
 "toolTipFontFamily": "제주고딕"
},
{
 "playbackBarBorderColor": "#FFFFFF",
 "id": "MainViewer",
 "left": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "playbackBarBorderSize": 0,
 "right": 0,
 "toolTipOpacity": 1,
 "playbackBarBackgroundOpacity": 1,
 "borderSize": 0,
 "progressBackgroundOpacity": 1,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "paddingLeft": 0,
 "minHeight": 50,
 "toolTipBorderSize": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "toolTipBorderRadius": 3,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarOpacity": 1,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBorderColor": "#000000",
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "toolTipShadowSpread": 0,
 "toolTipDisplayTime": 600,
 "minWidth": 100,
 "transitionDuration": 500,
 "toolTipFontSize": "1.5vmin",
 "progressBarBorderSize": 0,
 "toolTipBackgroundColor": "#000000",
 "toolTipPaddingLeft": 4,
 "playbackBarBottom": 5,
 "vrPointerSelectionTime": 2000,
 "playbackBarProgressOpacity": 1,
 "playbackBarHeight": 10,
 "toolTipShadowOpacity": 1,
 "playbackBarHeadOpacity": 1,
 "playbackBarHeadShadowColor": "#000000",
 "progressLeft": 0,
 "toolTipFontStyle": "normal",
 "playbackBarHeadBorderRadius": 0,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "shadow": false,
 "progressBarBorderColor": "#000000",
 "toolTipShadowVerticalLength": 0,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "progressHeight": 10,
 "class": "ViewerArea",
 "progressBorderRadius": 0,
 "toolTipShadowBlurRadius": 3,
 "transitionMode": "blending",
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipFontFamily": "제주고딕",
 "toolTipFontWeight": "normal",
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadShadowHorizontalLength": 0,
 "paddingRight": 0,
 "progressBottom": 0,
 "toolTipPaddingRight": 4,
 "propagateClick": false,
 "playbackBarRight": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "playbackBarLeft": 0,
 "toolTipTextShadowColor": "#000000",
 "playbackBarProgressBorderColor": "#000000",
 "top": 0,
 "progressBorderColor": "#000000",
 "bottom": "0%",
 "playbackBarBorderRadius": 0,
 "progressOpacity": 1,
 "paddingTop": 0,
 "borderRadius": 0,
 "toolTipPaddingBottom": 4,
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarHeadShadow": true,
 "progressBackgroundColorDirection": "vertical",
 "playbackBarBackgroundColorDirection": "vertical",
 "progressBarBorderRadius": 0,
 "progressBorderSize": 0,
 "paddingBottom": 0,
 "toolTipTextShadowOpacity": 0,
 "toolTipBorderColor": "#FFFFFF",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipFontColor": "#FFFFFF",
 "displayTooltipInTouchScreens": true,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "progressBarOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "vrPointerColor": "#FFFFFF",
 "toolTipShadowColor": "#333333",
 "playbackBarProgressBorderRadius": 0,
 "toolTipPaddingTop": 4,
 "playbackBarProgressBorderSize": 0,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "data": {
  "name": "Main Viewer"
 },
 "toolTipTextShadowBlurRadius": 3
},
{
 "automaticZoomSpeed": 10,
 "id": "panorama_B111BE24_A69F_6249_41D8_210A06A45A13_camera",
 "initialPosition": {
  "yaw": 6.66,
  "hfov": 120,
  "pitch": 3.46,
  "class": "PanoramaCameraPosition"
 },
 "class": "PanoramaCamera"
},
{
 "visible": false,
 "playbackBarBorderColor": "#FFFFFF",
 "id": "MapViewer",
 "left": "0.01%",
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "playbackBarBorderSize": 0,
 "right": "69.74%",
 "toolTipOpacity": 1,
 "playbackBarBackgroundOpacity": 1,
 "borderSize": 0,
 "progressBackgroundOpacity": 1,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "paddingLeft": 0,
 "minHeight": 1,
 "toolTipBorderSize": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "toolTipBorderRadius": 3,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarOpacity": 1,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBorderColor": "#000000",
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "toolTipShadowSpread": 0,
 "toolTipDisplayTime": 600,
 "minWidth": 1,
 "transitionDuration": 500,
 "toolTipFontSize": "1.5vmin",
 "progressBarBorderSize": 0,
 "toolTipBackgroundColor": "#000000",
 "toolTipPaddingLeft": 4,
 "playbackBarBottom": 0,
 "vrPointerSelectionTime": 2000,
 "playbackBarProgressOpacity": 1,
 "playbackBarHeight": 10,
 "toolTipShadowOpacity": 1,
 "playbackBarHeadOpacity": 1,
 "playbackBarHeadShadowColor": "#000000",
 "progressLeft": 0,
 "toolTipFontStyle": "normal",
 "playbackBarHeadBorderRadius": 0,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "shadow": false,
 "progressBarBorderColor": "#000000",
 "toolTipShadowVerticalLength": 0,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "progressHeight": 10,
 "class": "ViewerArea",
 "progressBorderRadius": 0,
 "toolTipShadowBlurRadius": 3,
 "transitionMode": "blending",
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipFontFamily": "제주고딕",
 "toolTipFontWeight": "normal",
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadShadowHorizontalLength": 0,
 "paddingRight": 0,
 "progressBottom": 2,
 "toolTipPaddingRight": 4,
 "propagateClick": false,
 "progressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "toolTipTextShadowColor": "#000000",
 "playbackBarRight": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "playbackBarProgressBorderColor": "#000000",
 "top": "39.54%",
 "progressBorderColor": "#000000",
 "bottom": "0%",
 "playbackBarBorderRadius": 0,
 "progressOpacity": 1,
 "paddingTop": 0,
 "borderRadius": 0,
 "toolTipPaddingBottom": 4,
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarHeadShadow": true,
 "progressBackgroundColorDirection": "vertical",
 "playbackBarBackgroundColorDirection": "vertical",
 "progressBarBorderRadius": 0,
 "progressBorderSize": 0,
 "paddingBottom": 0,
 "toolTipTextShadowOpacity": 0,
 "toolTipBorderColor": "#FFFFFF",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipFontColor": "#FFFFFF",
 "displayTooltipInTouchScreens": true,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "progressBarOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "vrPointerColor": "#FFFFFF",
 "toolTipShadowColor": "#333333",
 "playbackBarProgressBorderRadius": 0,
 "toolTipPaddingTop": 4,
 "playbackBarProgressBorderSize": 0,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "data": {
  "name": "MapViewer"
 },
 "toolTipTextShadowBlurRadius": 3
},
{
 "closeButtonPressedIconLineWidth": 5,
 "bodyBackgroundColorDirection": "vertical",
 "footerBackgroundColorDirection": "vertical",
 "id": "window_C2ABC276_C979_4DE2_41E8_FE50DC6AA1AA",
 "closeButtonRollOverBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonRollOverBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "veilOpacity": 0.4,
 "scrollBarColor": "#000000",
 "gap": 10,
 "footerHeight": 5,
 "closeButtonPaddingLeft": 0,
 "borderSize": 0,
 "closeButtonIconHeight": 20,
 "bodyBackgroundOpacity": 0,
 "paddingLeft": 0,
 "modal": true,
 "closeButtonBorderRadius": 10,
 "backgroundColorRatios": [],
 "minHeight": 20,
 "closeButtonIconLineWidth": 5,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "closeButtonPressedBackgroundColorDirection": "vertical",
 "headerPaddingBottom": 5,
 "backgroundColor": [],
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "bodyPaddingLeft": 0,
 "closeButtonBackgroundColorDirection": "vertical",
 "closeButtonBorderColor": "#000000",
 "contentOpaque": false,
 "backgroundColorDirection": "vertical",
 "minWidth": 20,
 "closeButtonPaddingTop": 0,
 "headerVerticalAlign": "middle",
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "titlePaddingBottom": 5,
 "showEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "headerPaddingLeft": 10,
 "closeButtonBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "layout": "vertical",
 "closeButtonBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "shadowBlurRadius": 6,
 "shadowHorizontalLength": 3,
 "bodyPaddingRight": 0,
 "titleFontSize": "1.29vmin",
 "headerBackgroundColorDirection": "vertical",
 "closeButtonPaddingRight": 0,
 "shadow": true,
 "titlePaddingLeft": 5,
 "class": "Window",
 "closeButtonRollOverIconColor": "#6699CC",
 "closeButtonPressedBackgroundColorRatios": [
  0,
  1
 ],
 "closeButtonRollOverIconLineWidth": 5,
 "children": [
  "this.viewer_uidDCF7D0E7_C98E_CEE2_41E7_4DD382428523"
 ],
 "shadowOpacity": 0.5,
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "footerBackgroundOpacity": 0,
 "shadowColor": "#000000",
 "bodyPaddingTop": 0,
 "bodyPaddingBottom": 0,
 "paddingRight": 0,
 "titlePaddingTop": 5,
 "veilShowEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "backgroundOpacity": 1,
 "propagateClick": false,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "veilColorRatios": [
  0,
  1
 ],
 "closeButtonPressedBorderColor": "#000000",
 "closeButtonPressedBackgroundOpacity": 0,
 "headerPaddingTop": 10,
 "horizontalAlign": "center",
 "veilHideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "closeButtonPaddingBottom": 0,
 "closeButtonRollOverBackgroundColorDirection": "vertical",
 "closeButtonBackgroundOpacity": 0,
 "closeButtonIconWidth": 20,
 "paddingTop": 0,
 "borderRadius": 5,
 "headerPaddingRight": 0,
 "closeButtonPressedBorderSize": 0,
 "shadowVerticalLength": 0,
 "closeButtonPressedBackgroundColor": [
  "#DDDDDD",
  "#FFFFFF"
 ],
 "closeButtonPressedIconColor": "#6699CC",
 "titlePaddingRight": 5,
 "titleFontFamily": "Arial",
 "paddingBottom": 0,
 "closeButtonBorderSize": 0,
 "closeButtonRollOverBackgroundOpacity": 0,
 "hideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "verticalAlign": "middle",
 "closeButtonRollOverBorderSize": 0,
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "closeButtonRollOverBorderColor": "#000000",
 "headerBackgroundOpacity": 0,
 "overflow": "scroll",
 "shadowSpread": 1,
 "data": {
  "name": "Window332"
 },
 "closeButtonIconColor": "#FFFFFF"
},
{
 "automaticZoomSpeed": 10,
 "id": "camera_DC0241A3_C98E_CF62_41B6_E5705E9439AC",
 "initialPosition": {
  "yaw": -2.31,
  "hfov": 120,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "class": "PanoramaCamera"
},
{
 "class": "ImageResource",
 "id": "ImageResource_DDCD8200_C97D_C3D5_41DD_65096295A243",
 "levels": [
  {
   "url": "media/popup_C605487E_C964_402D_41D7_484721F958AE_0_0.png",
   "width": 1739,
   "height": 1255,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_C605487E_C964_402D_41D7_484721F958AE_0_1.png",
   "width": 1024,
   "height": 738,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_C605487E_C964_402D_41D7_484721F958AE_0_2.png",
   "width": 512,
   "height": 369,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "rotationY": 0,
 "showEasing": "cubic_in",
 "hfov": 7.03,
 "rotationZ": 0,
 "popupMaxHeight": "80%",
 "id": "popup_95C1E5D2_B494_2FE4_41E4_0F8AEF9DBE5F",
 "rotationX": 0,
 "popupDistance": 100,
 "hideDuration": 500,
 "image": {
  "levels": [
   {
    "url": "media/popup_95C1E5D2_B494_2FE4_41E4_0F8AEF9DBE5F_0_1.jpg",
    "width": 1024,
    "height": 683,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "popupMaxWidth": "80%",
 "showDuration": 500,
 "yaw": 1.08,
 "hideEasing": "cubic_out",
 "pitch": -0.39,
 "class": "PopupPanoramaOverlay"
},
{
 "automaticZoomSpeed": 10,
 "id": "camera_DFC761DE_C98E_CF22_41E0_03B4033051A7",
 "initialPosition": {
  "yaw": -0.37,
  "hfov": 120,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "class": "PanoramaCamera"
},
{
 "hfov": 360,
 "label": "\uc815\uc804\ub0a8\uc2e0\ubb38",
 "id": "panorama_BB22B334_A60C_C516_41D4_85E2A3F602F3",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_BB22B334_A60C_C516_41D4_85E2A3F602F3_t.jpg",
 "adjacentPanoramas": [
  {
   "backwardYaw": 1.33,
   "yaw": 179.9,
   "panorama": "this.panorama_B8C238BA_A69E_AFB9_41DB_A6464F54721E",
   "distance": 1,
   "class": "AdjacentPanorama"
  },
  {
   "backwardYaw": 179.74,
   "yaw": -0.78,
   "panorama": "this.panorama_BB3EA0D4_A6BA_FFC9_41B5_378AA4C71E29",
   "distance": 1,
   "class": "AdjacentPanorama"
  },
  {
   "backwardYaw": -81.59,
   "yaw": -21.92,
   "panorama": "this.panorama_B149B9F0_A69E_A1C9_41A3_7D34CCC4C924",
   "distance": 1,
   "class": "AdjacentPanorama"
  },
  {
   "backwardYaw": 179.12,
   "yaw": -96.41,
   "panorama": "this.panorama_F70332DE_B1CD_04BF_41E0_52AD5D23EC3B",
   "distance": 1,
   "class": "AdjacentPanorama"
  },
  {
   "backwardYaw": -141.58,
   "yaw": 111.64,
   "panorama": "this.panorama_EB987E8F_B1CD_3C9D_41CA_53E02C0E1D7E",
   "distance": 1,
   "class": "AdjacentPanorama"
  }
 ],
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BB22B334_A60C_C516_41D4_85E2A3F602F3_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_BB22B334_A60C_C516_41D4_85E2A3F602F3_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_BB22B334_A60C_C516_41D4_85E2A3F602F3_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_BB22B334_A60C_C516_41D4_85E2A3F602F3_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_BB22B334_A60C_C516_41D4_85E2A3F602F3_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_BB22B334_A60C_C516_41D4_85E2A3F602F3_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_BB22B334_A60C_C516_41D4_85E2A3F602F3_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_BB22B334_A60C_C516_41D4_85E2A3F602F3_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BB22B334_A60C_C516_41D4_85E2A3F602F3_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_BB22B334_A60C_C516_41D4_85E2A3F602F3_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_BB22B334_A60C_C516_41D4_85E2A3F602F3_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_BB22B334_A60C_C516_41D4_85E2A3F602F3_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BB22B334_A60C_C516_41D4_85E2A3F602F3_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_BB22B334_A60C_C516_41D4_85E2A3F602F3_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_BB22B334_A60C_C516_41D4_85E2A3F602F3_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_BB22B334_A60C_C516_41D4_85E2A3F602F3_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_BB22B334_A60C_C516_41D4_85E2A3F602F3_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_BB22B334_A60C_C516_41D4_85E2A3F602F3_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_BB22B334_A60C_C516_41D4_85E2A3F602F3_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_BB22B334_A60C_C516_41D4_85E2A3F602F3_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BB22B334_A60C_C516_41D4_85E2A3F602F3_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_BB22B334_A60C_C516_41D4_85E2A3F602F3_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_BB22B334_A60C_C516_41D4_85E2A3F602F3_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_BB22B334_A60C_C516_41D4_85E2A3F602F3_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "snapshots": [
    "this.snapshot_6D9B38D9_7CF9_E7D1_41C0_E1886B58AFFD"
   ],
   "thumbnailUrl": "media/panorama_BB22B334_A60C_C516_41D4_85E2A3F602F3_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "mapLocations": [
  {
   "map": "this.map_D5C2EFDB_B155_1C85_41D8_129DE828BE4B",
   "x": 361.05,
   "angle": 21.11,
   "y": 622.96,
   "class": "PanoramaMapLocation"
  }
 ],
 "hfovMin": "200%",
 "partial": false,
 "pitch": 0,
 "hfovMax": 135,
 "overlays": [
  "this.overlay_BB22F334_A60C_C516_41BE_A69AFA655A35",
  "this.overlay_BB22E334_A60C_C516_41D8_467C839BAAD6",
  "this.overlay_BB22D334_A60C_C516_41B6_2D2BD660621F",
  "this.overlay_FD59FEE4_B1DD_1C83_41C3_6B5B376C8B26",
  "this.overlay_E3DEFE60_B1DF_3F83_41DF_6B1FFFEFA154",
  "this.overlay_C442CAC7_B14D_048D_41C9_425669EF6480",
  "this.panorama_BB22B334_A60C_C516_41D4_85E2A3F602F3_tcap0"
 ],
 "class": "Panorama"
},
{
 "rotationY": 0,
 "showEasing": "cubic_in",
 "hfov": 4.02,
 "rotationZ": 0,
 "popupMaxHeight": "80%",
 "id": "popup_C676DEFA_C964_4035_41E1_912ACE9B6945",
 "rotationX": 0,
 "popupDistance": 100,
 "hideDuration": 500,
 "image": {
  "levels": [
   {
    "url": "media/popup_C676DEFA_C964_4035_41E1_912ACE9B6945_0_1.png",
    "width": 1024,
    "height": 738,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "popupMaxWidth": "80%",
 "showDuration": 500,
 "yaw": 3.81,
 "hideEasing": "cubic_out",
 "pitch": 25.49,
 "class": "PopupPanoramaOverlay"
},
{
 "automaticZoomSpeed": 10,
 "id": "camera_DC78A159_C98E_CF2E_41A1_3331AA05C001",
 "initialPosition": {
  "yaw": -57.11,
  "hfov": 120,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "class": "PanoramaCamera"
},
{
 "gyroscopeEnabled": true,
 "mouseControlMode": "drag_rotation",
 "touchControlMode": "drag_rotation",
 "displayPlaybackBar": true,
 "id": "MainViewerPanoramaPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "viewerArea": "this.MainViewer",
 "class": "PanoramaPlayer"
},
{
 "class": "Video",
 "label": "ex_1",
 "scaleMode": "fit_inside",
 "width": 1280,
 "loop": false,
 "id": "video_F4741FF2_C438_EDAC_41B3_ABA3B32796CC",
 "thumbnailUrl": "media/video_F4741FF2_C438_EDAC_41B3_ABA3B32796CC_t.jpg",
 "height": 720,
 "video": {
  "width": 1280,
  "mp4Url": "media/video_F4741FF2_C438_EDAC_41B3_ABA3B32796CC.mp4",
  "height": 720,
  "class": "VideoResource"
 }
},
{
 "automaticZoomSpeed": 10,
 "id": "camera_DFA9F20A_C98E_CD22_41CA_FE02E8371CB2",
 "initialPosition": {
  "yaw": 26.48,
  "hfov": 120,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "class": "PanoramaCamera"
},
{
 "class": "ImageResource",
 "id": "ImageResource_87A6434F_B494_E4FC_41DE_E3350DDBC4BD",
 "levels": [
  {
   "url": "media/popup_9DE78CB1_B4BC_3DA4_41D4_040BDB53775C_0_0.jpg",
   "width": 1619,
   "height": 1080,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_9DE78CB1_B4BC_3DA4_41D4_040BDB53775C_0_1.jpg",
   "width": 1024,
   "height": 683,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_9DE78CB1_B4BC_3DA4_41D4_040BDB53775C_0_2.jpg",
   "width": 512,
   "height": 341,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "class": "ImageResource",
 "id": "ImageResource_DDCF7201_C97D_C3D7_4191_A748AC011969",
 "levels": [
  {
   "url": "media/popup_C6191F7F_C965_C02B_41E6_A6B52E9246C1_0_0.png",
   "width": 1739,
   "height": 1255,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_C6191F7F_C965_C02B_41E6_A6B52E9246C1_0_1.png",
   "width": 1024,
   "height": 738,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_C6191F7F_C965_C02B_41E6_A6B52E9246C1_0_2.png",
   "width": 512,
   "height": 369,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "class": "Container",
 "scrollBarMargin": 2,
 "id": "Container_9847BA93_8D48_7EB8_41D1_CCFC20490212",
 "right": "0.95%",
 "paddingRight": 0,
 "children": [
  "this.ThumbnailList_3110C4FE_3FEE_AA94_41CF_038F42695873"
 ],
 "scrollBarColor": "#000000",
 "gap": 10,
 "overflow": "scroll",
 "borderSize": 0,
 "backgroundOpacity": 0,
 "propagateClick": false,
 "paddingLeft": 0,
 "scrollBarOpacity": 0,
 "top": "9.16%",
 "minHeight": 1,
 "scrollBarVisible": "rollOver",
 "bottom": "6.15%",
 "horizontalAlign": "left",
 "contentOpaque": false,
 "paddingTop": 0,
 "width": "9.264%",
 "borderRadius": 0,
 "minWidth": 1,
 "layout": "absolute",
 "paddingBottom": 0,
 "verticalAlign": "top",
 "scrollBarWidth": 10,
 "shadow": false,
 "data": {
  "name": "Container6677"
 }
},
{
 "class": "ImageResource",
 "id": "ImageResource_DDB26204_C97D_C3DD_41E5_65DFC67CE814",
 "levels": [
  {
   "url": "media/popup_C6C3C4AE_C96B_C02D_41E2_9F1C65858DE3_0_0.png",
   "width": 1739,
   "height": 1255,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_C6C3C4AE_C96B_C02D_41E2_9F1C65858DE3_0_1.png",
   "width": 1024,
   "height": 738,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_C6C3C4AE_C96B_C02D_41E2_9F1C65858DE3_0_2.png",
   "width": 512,
   "height": 369,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "rotationY": 0,
 "showEasing": "cubic_in",
 "hfov": 6.26,
 "rotationZ": 0,
 "popupMaxHeight": "80%",
 "id": "popup_AA643CE1_B48C_7DA4_41CA_AF54CAAB8036",
 "rotationX": 0,
 "popupDistance": 100,
 "hideDuration": 500,
 "image": {
  "levels": [
   {
    "url": "media/popup_AA643CE1_B48C_7DA4_41CA_AF54CAAB8036_0_1.jpg",
    "width": 1024,
    "height": 683,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "popupMaxWidth": "80%",
 "showDuration": 500,
 "yaw": 9.58,
 "hideEasing": "cubic_out",
 "pitch": -27.05,
 "class": "PopupPanoramaOverlay"
},
{
 "hfov": 360,
 "label": "\uce60\uc0ac\ub2f9",
 "id": "panorama_B149B9F0_A69E_A1C9_41A3_7D34CCC4C924",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_B149B9F0_A69E_A1C9_41A3_7D34CCC4C924_t.jpg",
 "adjacentPanoramas": [
  {
   "backwardYaw": -21.92,
   "yaw": -81.59,
   "panorama": "this.panorama_BB22B334_A60C_C516_41D4_85E2A3F602F3",
   "distance": 1,
   "class": "AdjacentPanorama"
  },
  {
   "backwardYaw": 98.75,
   "yaw": -90.11,
   "panorama": "this.panorama_B111BE24_A69F_6249_41D8_210A06A45A13",
   "distance": 1,
   "class": "AdjacentPanorama"
  },
  {
   "backwardYaw": 120.24,
   "yaw": 154.04,
   "panorama": "this.panorama_F70332DE_B1CD_04BF_41E0_52AD5D23EC3B",
   "distance": 1,
   "class": "AdjacentPanorama"
  },
  {
   "backwardYaw": -129.2,
   "yaw": -147.57,
   "panorama": "this.panorama_BB3EA0D4_A6BA_FFC9_41B5_378AA4C71E29",
   "distance": 1,
   "class": "AdjacentPanorama"
  }
 ],
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_B149B9F0_A69E_A1C9_41A3_7D34CCC4C924_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_B149B9F0_A69E_A1C9_41A3_7D34CCC4C924_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_B149B9F0_A69E_A1C9_41A3_7D34CCC4C924_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_B149B9F0_A69E_A1C9_41A3_7D34CCC4C924_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_B149B9F0_A69E_A1C9_41A3_7D34CCC4C924_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_B149B9F0_A69E_A1C9_41A3_7D34CCC4C924_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_B149B9F0_A69E_A1C9_41A3_7D34CCC4C924_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_B149B9F0_A69E_A1C9_41A3_7D34CCC4C924_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_B149B9F0_A69E_A1C9_41A3_7D34CCC4C924_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_B149B9F0_A69E_A1C9_41A3_7D34CCC4C924_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_B149B9F0_A69E_A1C9_41A3_7D34CCC4C924_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_B149B9F0_A69E_A1C9_41A3_7D34CCC4C924_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_B149B9F0_A69E_A1C9_41A3_7D34CCC4C924_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_B149B9F0_A69E_A1C9_41A3_7D34CCC4C924_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_B149B9F0_A69E_A1C9_41A3_7D34CCC4C924_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_B149B9F0_A69E_A1C9_41A3_7D34CCC4C924_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_B149B9F0_A69E_A1C9_41A3_7D34CCC4C924_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_B149B9F0_A69E_A1C9_41A3_7D34CCC4C924_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_B149B9F0_A69E_A1C9_41A3_7D34CCC4C924_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_B149B9F0_A69E_A1C9_41A3_7D34CCC4C924_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_B149B9F0_A69E_A1C9_41A3_7D34CCC4C924_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_B149B9F0_A69E_A1C9_41A3_7D34CCC4C924_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_B149B9F0_A69E_A1C9_41A3_7D34CCC4C924_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_B149B9F0_A69E_A1C9_41A3_7D34CCC4C924_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "snapshots": [
    "this.snapshot_734046C5_7CF9_EA31_41D9_F38EDF99B5EE"
   ],
   "thumbnailUrl": "media/panorama_B149B9F0_A69E_A1C9_41A3_7D34CCC4C924_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "mapLocations": [
  {
   "map": "this.map_D5C2EFDB_B155_1C85_41D8_129DE828BE4B",
   "x": 309.14,
   "angle": 202.07,
   "y": 562.33,
   "class": "PanoramaMapLocation"
  }
 ],
 "hfovMin": "200%",
 "partial": false,
 "pitch": 0,
 "hfovMax": 135,
 "overlays": [
  "this.overlay_B14999F0_A69E_A1C9_41B0_86B3ABC9D1C9",
  "this.overlay_B149D9F0_A69E_A1C9_41D5_1E924557F89A",
  "this.overlay_B149C9F0_A69E_A1C9_41D2_7931BB59EF2D",
  "this.overlay_C31879C2_B17D_0487_41E1_4EFF621804F9",
  "this.overlay_C4AD109E_B17B_04BF_41DD_2E994770FDD1",
  "this.overlay_C55BF74A_B17F_0D87_41E2_96F27AF1D116",
  "this.overlay_FE0CE844_B48C_E4EC_41E1_07F6D373C171",
  "this.panorama_B149B9F0_A69E_A1C9_41A3_7D34CCC4C924_tcap0",
  "this.popup_C605487E_C964_402D_41D7_484721F958AE"
 ],
 "class": "Panorama"
},
{
 "class": "ImageResource",
 "id": "ImageResource_87A5D34E_B494_E4FC_41B8_7EAE84B52A6D",
 "levels": [
  {
   "url": "media/popup_95C1E5D2_B494_2FE4_41E4_0F8AEF9DBE5F_0_0.jpg",
   "width": 1619,
   "height": 1080,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_95C1E5D2_B494_2FE4_41E4_0F8AEF9DBE5F_0_1.jpg",
   "width": 1024,
   "height": 683,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_95C1E5D2_B494_2FE4_41E4_0F8AEF9DBE5F_0_2.jpg",
   "width": 512,
   "height": 341,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "automaticZoomSpeed": 10,
 "id": "panorama_B149B9F0_A69E_A1C9_41A3_7D34CCC4C924_camera",
 "initialPosition": {
  "yaw": -0.3,
  "hfov": 120,
  "pitch": 1.99,
  "class": "PanoramaCameraPosition"
 },
 "class": "PanoramaCamera"
},
{
 "rotationY": 0,
 "showEasing": "cubic_in",
 "hfov": 6.74,
 "rotationZ": 0,
 "popupMaxHeight": "80%",
 "id": "popup_9FBDA241_B4B4_24E4_41BF_22A24B02003C",
 "rotationX": 0,
 "popupDistance": 100,
 "hideDuration": 500,
 "image": {
  "levels": [
   {
    "url": "media/popup_9FBDA241_B4B4_24E4_41BF_22A24B02003C_0_1.jpg",
    "width": 1024,
    "height": 683,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "popupMaxWidth": "80%",
 "showDuration": 500,
 "yaw": -99.59,
 "hideEasing": "cubic_out",
 "pitch": -16.51,
 "class": "PopupPanoramaOverlay"
},
{
 "automaticZoomSpeed": 10,
 "id": "camera_DC96A12A_C98E_CF62_41E7_4F884CEE0104",
 "initialPosition": {
  "yaw": -0.88,
  "hfov": 120,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "id": "camera_DF084274_C98E_CDE6_41E7_F091D779AA38",
 "initialPosition": {
  "yaw": -88.08,
  "hfov": 120,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "class": "PanoramaCamera"
},
{
 "rotationY": 0,
 "showEasing": "cubic_in",
 "hfov": 4.66,
 "rotationZ": 0,
 "popupMaxHeight": "80%",
 "id": "popup_C64A66C7_C964_405B_41B0_A24020C9ADE2",
 "rotationX": 0,
 "popupDistance": 100,
 "hideDuration": 500,
 "image": {
  "levels": [
   {
    "url": "media/popup_C64A66C7_C964_405B_41B0_A24020C9ADE2_0_1.png",
    "width": 1024,
    "height": 738,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "popupMaxWidth": "80%",
 "showDuration": 500,
 "yaw": 15.42,
 "hideEasing": "cubic_out",
 "pitch": 6.71,
 "class": "PopupPanoramaOverlay"
},
{
 "automaticZoomSpeed": 10,
 "id": "panorama_84A271EB_A69F_E1DF_41D4_672D5AE27031_camera",
 "initialPosition": {
  "yaw": 9.39,
  "hfov": 120,
  "pitch": 2.4,
  "class": "PanoramaCameraPosition"
 },
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "id": "camera_DED272A2_C98E_CD62_41A4_7A5E11739271",
 "initialPosition": {
  "yaw": -81.25,
  "hfov": 120,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "id": "camera_DEB1C2B4_C98E_CD66_41BD_0D24CE675557",
 "initialPosition": {
  "yaw": 50.8,
  "hfov": 120,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "id": "panorama_EA55570C_B1B5_0D83_419D_402AB2B70DDF_camera",
 "initialPosition": {
  "yaw": -2.55,
  "hfov": 120,
  "pitch": 1.32,
  "class": "PanoramaCameraPosition"
 },
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "id": "camera_DF73323D_C98E_CD66_41E5_A61EC36F942E",
 "initialPosition": {
  "yaw": -45.63,
  "hfov": 120,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "id": "camera_DF403246_C98E_CD22_41DD_085C51D387C8",
 "initialPosition": {
  "yaw": -0.2,
  "hfov": 120,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "id": "panorama_BB22B334_A60C_C516_41D4_85E2A3F602F3_camera",
 "initialPosition": {
  "yaw": 1.75,
  "hfov": 120,
  "pitch": 4.46,
  "class": "PanoramaCameraPosition"
 },
 "class": "PanoramaCamera"
},
{
 "rotationY": 0,
 "showEasing": "cubic_in",
 "hfov": 4.69,
 "rotationZ": 0,
 "popupMaxHeight": "80%",
 "id": "popup_C605487E_C964_402D_41D7_484721F958AE",
 "rotationX": 0,
 "popupDistance": 100,
 "hideDuration": 500,
 "image": {
  "levels": [
   {
    "url": "media/popup_C605487E_C964_402D_41D7_484721F958AE_0_1.png",
    "width": 1024,
    "height": 738,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "popupMaxWidth": "80%",
 "showDuration": 500,
 "yaw": 5.97,
 "hideEasing": "cubic_out",
 "pitch": 1.52,
 "class": "PopupPanoramaOverlay"
},
{
 "class": "WebFrame",
 "id": "WebFrame_6E96CCB0_7C39_53A0_41D0_2470CE6C43BE",
 "left": "12.14%",
 "paddingRight": 0,
 "borderSize": 0,
 "backgroundOpacity": 0.96,
 "propagateClick": false,
 "paddingLeft": 0,
 "minHeight": 1,
 "url": "https://sketchfab.com/models/f33d1ddfc2ee48c4b824db087f3927e0/embed",
 "backgroundColorRatios": [
  0
 ],
 "top": "14.42%",
 "insetBorder": false,
 "paddingTop": 0,
 "width": "75.378%",
 "borderRadius": 0,
 "minWidth": 1,
 "backgroundColorDirection": "vertical",
 "backgroundColor": [
  "#FFFFFF"
 ],
 "paddingBottom": 0,
 "scrollEnabled": true,
 "height": "70.056%",
 "visible": false,
 "shadow": false,
 "data": {
  "name": "WebFrame"
 }
},
{
 "automaticZoomSpeed": 10,
 "id": "camera_DC10C1B1_C98E_CF7E_41C6_1A14B06BF66F",
 "initialPosition": {
  "yaw": -0.19,
  "hfov": 120,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "class": "PanoramaCamera"
},
{
 "rotationY": 0,
 "showEasing": "cubic_in",
 "hfov": 4.28,
 "rotationZ": 0,
 "popupMaxHeight": "80%",
 "id": "popup_C6E70596_C964_C0FD_41BB_5121ABEF7C5B",
 "rotationX": 0,
 "popupDistance": 100,
 "hideDuration": 500,
 "image": {
  "levels": [
   {
    "url": "media/popup_C6E70596_C964_C0FD_41BB_5121ABEF7C5B_0_1.png",
    "width": 1024,
    "height": 738,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "popupMaxWidth": "80%",
 "showDuration": 500,
 "yaw": 4.84,
 "hideEasing": "cubic_out",
 "pitch": -24.06,
 "class": "PopupPanoramaOverlay"
},
{
 "class": "ImageResource",
 "id": "ImageResource_87A2C352_B494_E4E4_41C1_E6097406040C",
 "levels": [
  {
   "url": "media/popup_9D3D1E61_B4B4_7CA4_41E6_900D4F087CB4_0_0.jpg",
   "width": 1619,
   "height": 1080,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_9D3D1E61_B4B4_7CA4_41E6_900D4F087CB4_0_1.jpg",
   "width": 1024,
   "height": 683,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_9D3D1E61_B4B4_7CA4_41E6_900D4F087CB4_0_2.jpg",
   "width": 512,
   "height": 341,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "automaticZoomSpeed": 10,
 "id": "camera_DEEFC287_C98E_CD22_41D5_D214EFB97AB8",
 "initialPosition": {
  "yaw": -30.83,
  "hfov": 120,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "class": "PanoramaCamera"
},
{
 "hfov": 360,
 "label": "\uc5b4\uc7ac\uc2e4",
 "id": "panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32_t.jpg",
 "adjacentPanoramas": [
  {
   "backwardYaw": -155.97,
   "yaw": 134.37,
   "panorama": "this.panorama_EA55570C_B1B5_0D83_419D_402AB2B70DDF",
   "distance": 1,
   "class": "AdjacentPanorama"
  },
  {
   "backwardYaw": 149.17,
   "yaw": -135.67,
   "panorama": "this.panorama_EE6E3D8C_B1BD_3C83_41E2_110C74F955A8",
   "distance": 1,
   "class": "AdjacentPanorama"
  },
  {
   "backwardYaw": 0.27,
   "yaw": 179.63,
   "panorama": "this.panorama_EB987E8F_B1CD_3C9D_41CA_53E02C0E1D7E",
   "distance": 1,
   "class": "AdjacentPanorama"
  }
 ],
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "mapLocations": [
  {
   "map": "this.map_D5C2EFDB_B155_1C85_41D8_129DE828BE4B",
   "x": 505.99,
   "angle": 19.86,
   "y": 630.69,
   "class": "PanoramaMapLocation"
  }
 ],
 "hfovMin": "200%",
 "partial": false,
 "pitch": 0,
 "hfovMax": 135,
 "overlays": [
  "this.overlay_D16B3838_B1B7_0383_41D2_1D26D22226D2",
  "this.overlay_ECB95C5F_B1B7_03BD_41D9_2EB6E58F9F58",
  "this.overlay_EC78173B_B1B5_0D85_41DA_D9579B31EE9B",
  "this.overlay_AF9D388F_B4F4_247C_41C3_4FBDE3A4B1F9",
  "this.overlay_AFB672BE_B4F4_259C_41DB_D165EB81B612",
  "this.overlay_878CD5A8_B48C_2FA4_41D6_363644666152",
  "this.overlay_AAC55361_B48C_64A4_41E3_EAD6663DA941",
  "this.popup_AB47D89A_B48D_E464_41D3_3474E77D4FEC",
  "this.overlay_91BC1358_B48C_64E4_41C0_1763EECEF06C",
  "this.overlay_9185DA01_B4B4_2464_41D7_4756D2EE4A30",
  "this.popup_EF9DA0E7_C4E8_D3B4_41C6_1C5C75C217EF",
  "this.panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32_tcap0",
  "this.popup_C6C3C4AE_C96B_C02D_41E2_9F1C65858DE3"
 ],
 "class": "Panorama"
},
{
 "class": "ImageResource",
 "id": "ImageResource_9047B2C2_B49B_E5E4_41D4_516029D61FF5",
 "levels": [
  {
   "url": "media/popup_AA643CE1_B48C_7DA4_41CA_AF54CAAB8036_0_0.jpg",
   "width": 1619,
   "height": 1080,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_AA643CE1_B48C_7DA4_41CA_AF54CAAB8036_0_1.jpg",
   "width": 1024,
   "height": 683,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_AA643CE1_B48C_7DA4_41CA_AF54CAAB8036_0_2.jpg",
   "width": 512,
   "height": 341,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "items": [
  {
   "camera": "this.panorama_EB987E8F_B1CD_3C9D_41CA_53E02C0E1D7E_camera",
   "media": "this.panorama_EB987E8F_B1CD_3C9D_41CA_53E02C0E1D7E",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  }
 ],
 "id": "playList_DCF720E6_C98E_CEE2_41E9_1AD2BF13FC43",
 "class": "PlayList"
},
{
 "automaticZoomSpeed": 10,
 "id": "camera_DF27C259_C98E_CD2E_41C8_9ED8CBA7298A",
 "initialPosition": {
  "yaw": 179.22,
  "hfov": 120,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "id": "panorama_EB987E8F_B1CD_3C9D_41CA_53E02C0E1D7E_camera",
 "initialPosition": {
  "yaw": -3.24,
  "hfov": 120,
  "pitch": 0.29,
  "class": "PanoramaCameraPosition"
 },
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "id": "panorama_8037E8B6_B1BB_048F_419F_537FF8F54FCD_camera",
 "initialPosition": {
  "yaw": 0.41,
  "hfov": 120,
  "pitch": -0.13,
  "class": "PanoramaCameraPosition"
 },
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "id": "camera_DCA2D105_C98E_CF26_41C4_99BF4985CD83",
 "initialPosition": {
  "yaw": -0.1,
  "hfov": 120,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "id": "camera_DCB7610E_C98E_CF22_41DA_F66D85DB3096",
 "initialPosition": {
  "yaw": -178.67,
  "hfov": 120,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "id": "camera_DFF651CF_C98E_CF22_41E7_451A5BE57228",
 "initialPosition": {
  "yaw": -2.03,
  "hfov": 120,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "id": "panorama_F70332DE_B1CD_04BF_41E0_52AD5D23EC3B_camera",
 "initialPosition": {
  "yaw": 0.68,
  "hfov": 120,
  "pitch": 3.24,
  "class": "PanoramaCameraPosition"
 },
 "class": "PanoramaCamera"
},
{
 "id": "ThumbnailList_3110C4FE_3FEE_AA94_41CF_038F42695873",
 "itemThumbnailShadowOpacity": 0.54,
 "right": "0.46%",
 "width": "69.466%",
 "scrollBarColor": "#FFFFFF",
 "gap": 0,
 "itemThumbnailHeight": 50,
 "borderSize": 0,
 "itemOpacity": 1,
 "paddingLeft": 0,
 "rollOverItemLabelFontWeight": "bold",
 "scrollBarOpacity": 0.5,
 "minHeight": 20,
 "scrollBarVisible": "rollOver",
 "height": 758,
 "itemPaddingTop": 3,
 "itemThumbnailShadowSpread": 1,
 "itemLabelPosition": "bottom",
 "layout": "vertical",
 "itemBackgroundColor": [],
 "minWidth": 20,
 "itemLabelHorizontalAlign": "center",
 "itemBackgroundColorRatios": [],
 "selectedItemLabelFontWeight": "bold",
 "itemHorizontalAlign": "center",
 "itemThumbnailShadowHorizontalLength": 3,
 "playList": "this.ThumbnailList_3110C4FE_3FEE_AA94_41CF_038F42695873_playlist",
 "itemThumbnailOpacity": 1,
 "itemPaddingBottom": 3,
 "itemThumbnailWidth": 50,
 "shadow": false,
 "class": "ThumbnailList",
 "itemLabelTextDecoration": "none",
 "itemLabelFontWeight": "normal",
 "itemThumbnailBorderRadius": 10,
 "itemLabelFontColor": "#FFFFFF",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "propagateClick": false,
 "rollOverItemBackgroundOpacity": 0,
 "itemThumbnailScaleMode": "fit_outside",
 "selectedItemLabelFontColor": "#FFCC00",
 "horizontalAlign": "left",
 "itemLabelFontFamily": "Arial",
 "top": "-0.05%",
 "itemBackgroundColorDirection": "vertical",
 "paddingTop": 0,
 "borderRadius": 5,
 "itemThumbnailShadowColor": "#000000",
 "click": "this.setComponentVisibility(this.WebFrame_6E96CCB0_7C39_53A0_41D0_2470CE6C43BE, false, 0, null, null, false); this.setComponentVisibility(this.IconButton_6ED08C3E_7C38_D2A0_41B0_83963070F910, false, 0, null, null, false)",
 "itemThumbnailShadowVerticalLength": 3,
 "itemMode": "normal",
 "itemBackgroundOpacity": 0,
 "itemThumbnailShadow": true,
 "itemVerticalAlign": "middle",
 "paddingBottom": 0,
 "itemLabelFontStyle": "normal",
 "itemThumbnailShadowBlurRadius": 8,
 "verticalAlign": "top",
 "itemBorderRadius": 0,
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "itemPaddingRight": 3,
 "itemLabelGap": 5,
 "visible": false,
 "data": {
  "name": "ThumbnailList35762"
 },
 "itemLabelFontSize": 14,
 "itemPaddingLeft": 3
},
{
 "hfov": 360,
 "label": "\uacf5\uc2e0\ub2f9",
 "id": "panorama_B111BE24_A69F_6249_41D8_210A06A45A13",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_B111BE24_A69F_6249_41D8_210A06A45A13_t.jpg",
 "adjacentPanoramas": [
  {
   "backwardYaw": -90.11,
   "yaw": 98.75,
   "panorama": "this.panorama_B149B9F0_A69E_A1C9_41A3_7D34CCC4C924",
   "distance": 1,
   "class": "AdjacentPanorama"
  },
  {
   "backwardYaw": 126.56,
   "yaw": 122.89,
   "panorama": "this.panorama_F70332DE_B1CD_04BF_41E0_52AD5D23EC3B",
   "distance": 1,
   "class": "AdjacentPanorama"
  },
  {
   "backwardYaw": 132.56,
   "yaw": 151.31,
   "panorama": "this.panorama_BB3EA0D4_A6BA_FFC9_41B5_378AA4C71E29",
   "distance": 1,
   "class": "AdjacentPanorama"
  }
 ],
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_B111BE24_A69F_6249_41D8_210A06A45A13_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_B111BE24_A69F_6249_41D8_210A06A45A13_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_B111BE24_A69F_6249_41D8_210A06A45A13_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_B111BE24_A69F_6249_41D8_210A06A45A13_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_B111BE24_A69F_6249_41D8_210A06A45A13_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_B111BE24_A69F_6249_41D8_210A06A45A13_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_B111BE24_A69F_6249_41D8_210A06A45A13_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_B111BE24_A69F_6249_41D8_210A06A45A13_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_B111BE24_A69F_6249_41D8_210A06A45A13_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_B111BE24_A69F_6249_41D8_210A06A45A13_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_B111BE24_A69F_6249_41D8_210A06A45A13_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_B111BE24_A69F_6249_41D8_210A06A45A13_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_B111BE24_A69F_6249_41D8_210A06A45A13_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_B111BE24_A69F_6249_41D8_210A06A45A13_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_B111BE24_A69F_6249_41D8_210A06A45A13_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_B111BE24_A69F_6249_41D8_210A06A45A13_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_B111BE24_A69F_6249_41D8_210A06A45A13_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_B111BE24_A69F_6249_41D8_210A06A45A13_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_B111BE24_A69F_6249_41D8_210A06A45A13_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_B111BE24_A69F_6249_41D8_210A06A45A13_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_B111BE24_A69F_6249_41D8_210A06A45A13_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_B111BE24_A69F_6249_41D8_210A06A45A13_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_B111BE24_A69F_6249_41D8_210A06A45A13_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_B111BE24_A69F_6249_41D8_210A06A45A13_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "snapshots": [
    "this.snapshot_6D6D5754_7CF9_EAD7_41C4_4EB61BE9FDDC"
   ],
   "thumbnailUrl": "media/panorama_B111BE24_A69F_6249_41D8_210A06A45A13_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "mapLocations": [
  {
   "map": "this.map_D5C2EFDB_B155_1C85_41D8_129DE828BE4B",
   "x": 432.47,
   "angle": 192.72,
   "y": 615.53,
   "class": "PanoramaMapLocation"
  }
 ],
 "hfovMin": "200%",
 "partial": false,
 "pitch": 0,
 "hfovMax": 135,
 "overlays": [
  "this.overlay_B111EE24_A69F_6249_41C3_2D9200117003",
  "this.overlay_B1111E24_A69F_6249_41E1_DB07FE0724C4",
  "this.overlay_B1112E24_A69F_6249_41C1_D0AB4545E94A",
  "this.overlay_DE13E831_B17B_0385_41E1_3D6375972574",
  "this.overlay_DE104C99_B175_3C85_41B4_09395978F97F",
  "this.overlay_83AD06AD_B477_EDBC_4193_868AD8B017D4",
  "this.panorama_B111BE24_A69F_6249_41D8_210A06A45A13_tcap0",
  "this.popup_C64A66C7_C964_405B_41B0_A24020C9ADE2"
 ],
 "class": "Panorama"
},
{
 "items": [
  {
   "media": "this.video_F4741FF2_C438_EDAC_41B3_ABA3B32796CC",
   "start": "this.viewer_uidDCF7D0E7_C98E_CEE2_41E7_4DD382428523VideoPlayer.set('displayPlaybackBar', true); this.pauseGlobalAudiosWhilePlayItem(this.playList_D91E4CB6_C979_5562_41E3_9A7E4A06B99D, 0)",
   "begin": "this.fixTogglePlayPauseButton(this.viewer_uidDCF7D0E7_C98E_CEE2_41E7_4DD382428523VideoPlayer)",
   "player": "this.viewer_uidDCF7D0E7_C98E_CEE2_41E7_4DD382428523VideoPlayer",
   "class": "VideoPlayListItem"
  }
 ],
 "id": "playList_D91E4CB6_C979_5562_41E3_9A7E4A06B99D",
 "class": "PlayList"
},
{
 "from": "right",
 "duration": 300,
 "id": "effect_CC932844_B14D_0383_41BD_A8E4E6B9A456",
 "easing": "linear",
 "class": "SlideInEffect"
},
{
 "movementMode": "constrained",
 "id": "MapViewerMapPlayer",
 "viewerArea": "this.MapViewer",
 "class": "MapPlayer"
},
{
 "automaticZoomSpeed": 10,
 "id": "camera_DFDB21FB_C98E_CEE2_41D0_66F866AF13F3",
 "initialPosition": {
  "yaw": 70.22,
  "hfov": 120,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "class": "PanoramaCamera"
},
{
 "maxWidth": 64,
 "class": "IconButton",
 "id": "IconButton_C4202DE9_863E_587F_41D1_AA5B04C25200",
 "maxHeight": 64,
 "data": {
  "name": "IconButton47516"
 },
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "propagateClick": false,
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 47,
 "minHeight": 1,
 "horizontalAlign": "center",
 "transparencyActive": true,
 "height": 47,
 "paddingTop": 0,
 "mode": "push",
 "borderRadius": 0,
 "minWidth": 1,
 "click": "if(!this.ThumbnailList_3110C4FE_3FEE_AA94_41CF_038F42695873.get('visible')){ this.setComponentVisibility(this.ThumbnailList_3110C4FE_3FEE_AA94_41CF_038F42695873, true, 0, this.effect_CC932844_B14D_0383_41BD_A8E4E6B9A456, 'showEffect', false) } else { this.setComponentVisibility(this.ThumbnailList_3110C4FE_3FEE_AA94_41CF_038F42695873, false, 0, this.effect_CC930844_B14D_0383_41B1_C71DD0E3BE20, 'hideEffect', false) }",
 "paddingBottom": 0,
 "verticalAlign": "middle",
 "shadow": false,
 "cursor": "hand",
 "iconURL": "skin/IconButton_C4202DE9_863E_587F_41D1_AA5B04C25200.png"
},
{
 "automaticZoomSpeed": 10,
 "id": "camera_DC64E13C_C98E_CF66_41D2_2BDB1180BF1A",
 "initialPosition": {
  "yaw": 38.42,
  "hfov": 120,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "class": "PanoramaCamera"
},
{
 "items": [
  {
   "camera": "this.panorama_84A271EB_A69F_E1DF_41D4_672D5AE27031_camera",
   "media": "this.panorama_84A271EB_A69F_E1DF_41D4_672D5AE27031",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  }
 ],
 "id": "playList_DCF1D0E8_C98E_CEEE_41E4_A32D6BD92B24",
 "class": "PlayList"
},
{
 "automaticZoomSpeed": 10,
 "id": "camera_DF05126B_C98E_CDE2_41E0_603708019C84",
 "initialPosition": {
  "yaw": 32.43,
  "hfov": 120,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "id": "camera_DC5FF177_C98E_CFE2_41C4_7FC7AAD6D402",
 "initialPosition": {
  "yaw": 97.7,
  "hfov": 120,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "id": "camera_DF62F234_C98E_CD66_41D9_A4C1250889F5",
 "initialPosition": {
  "yaw": -47.44,
  "hfov": 120,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "class": "PanoramaCamera"
},
{
 "class": "ImageResource",
 "id": "ImageResource_DDC8F1FE_C97D_C02D_41E1_FDCF270E4E07",
 "levels": [
  {
   "url": "media/popup_C676DEFA_C964_4035_41E1_912ACE9B6945_0_0.png",
   "width": 1739,
   "height": 1255,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_C676DEFA_C964_4035_41E1_912ACE9B6945_0_1.png",
   "width": 1024,
   "height": 738,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_C676DEFA_C964_4035_41E1_912ACE9B6945_0_2.png",
   "width": 512,
   "height": 369,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "automaticZoomSpeed": 10,
 "displayMovements": [
  {
   "duration": 1000,
   "easing": "linear",
   "class": "TargetRotationalCameraDisplayMovement"
  },
  {
   "duration": 3000,
   "targetStereographicFactor": 0,
   "class": "TargetRotationalCameraDisplayMovement",
   "targetPitch": -1.63,
   "easing": "cubic_in_out",
   "targetHfov": 120
  }
 ],
 "id": "panorama_B8C238BA_A69E_AFB9_41DB_A6464F54721E_camera",
 "initialPosition": {
  "yaw": -0.63,
  "hfov": 120,
  "pitch": -1.63,
  "class": "PanoramaCameraPosition"
 },
 "displayOriginPosition": {
  "stereographicFactor": 1,
  "yaw": -0.63,
  "hfov": 165,
  "pitch": -90,
  "class": "RotationalCameraDisplayPosition"
 },
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "id": "panorama_BB3EA0D4_A6BA_FFC9_41B5_378AA4C71E29_camera",
 "initialPosition": {
  "yaw": -0.47,
  "hfov": 120,
  "pitch": 6.99,
  "class": "PanoramaCameraPosition"
 },
 "class": "PanoramaCamera"
},
{
 "class": "ImageResource",
 "id": "ImageResource_87A22351_B494_E4E4_41D5_DC70791D09BD",
 "levels": [
  {
   "url": "media/popup_9EAEA666_B4BB_ECAC_41D4_2BF45C36F5C4_0_0.jpg",
   "width": 1619,
   "height": 1080,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_9EAEA666_B4BB_ECAC_41D4_2BF45C36F5C4_0_1.jpg",
   "width": 1024,
   "height": 683,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_9EAEA666_B4BB_ECAC_41D4_2BF45C36F5C4_0_2.jpg",
   "width": 512,
   "height": 341,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "rotationY": 0,
 "showEasing": "cubic_in",
 "hfov": 6.95,
 "rotationZ": 0,
 "popupMaxHeight": "80%",
 "id": "popup_EF9DA0E7_C4E8_D3B4_41C6_1C5C75C217EF",
 "rotationX": 0,
 "popupDistance": 100,
 "hideDuration": 500,
 "image": {
  "levels": [
   {
    "url": "media/popup_EF9DA0E7_C4E8_D3B4_41C6_1C5C75C217EF_0_1.jpg",
    "width": 1024,
    "height": 683,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "popupMaxWidth": "80%",
 "showDuration": 500,
 "yaw": -91.3,
 "hideEasing": "cubic_out",
 "pitch": -8.81,
 "class": "PopupPanoramaOverlay"
},
{
 "hfov": 360,
 "label": "\uc678\ub300\ubb38",
 "id": "panorama_B8C238BA_A69E_AFB9_41DB_A6464F54721E",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_B8C238BA_A69E_AFB9_41DB_A6464F54721E_t.jpg",
 "adjacentPanoramas": [
  {
   "backwardYaw": 179.9,
   "yaw": 1.33,
   "panorama": "this.panorama_BB22B334_A60C_C516_41D4_85E2A3F602F3",
   "distance": 1,
   "class": "AdjacentPanorama"
  }
 ],
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_B8C238BA_A69E_AFB9_41DB_A6464F54721E_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_B8C238BA_A69E_AFB9_41DB_A6464F54721E_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_B8C238BA_A69E_AFB9_41DB_A6464F54721E_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_B8C238BA_A69E_AFB9_41DB_A6464F54721E_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_B8C238BA_A69E_AFB9_41DB_A6464F54721E_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_B8C238BA_A69E_AFB9_41DB_A6464F54721E_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_B8C238BA_A69E_AFB9_41DB_A6464F54721E_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_B8C238BA_A69E_AFB9_41DB_A6464F54721E_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_B8C238BA_A69E_AFB9_41DB_A6464F54721E_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_B8C238BA_A69E_AFB9_41DB_A6464F54721E_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_B8C238BA_A69E_AFB9_41DB_A6464F54721E_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_B8C238BA_A69E_AFB9_41DB_A6464F54721E_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_B8C238BA_A69E_AFB9_41DB_A6464F54721E_t.jpg",
   "back": {
    "levels": [
     {
      "url": "media/panorama_B8C238BA_A69E_AFB9_41DB_A6464F54721E_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_B8C238BA_A69E_AFB9_41DB_A6464F54721E_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_B8C238BA_A69E_AFB9_41DB_A6464F54721E_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_B8C238BA_A69E_AFB9_41DB_A6464F54721E_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_B8C238BA_A69E_AFB9_41DB_A6464F54721E_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_B8C238BA_A69E_AFB9_41DB_A6464F54721E_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_B8C238BA_A69E_AFB9_41DB_A6464F54721E_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_B8C238BA_A69E_AFB9_41DB_A6464F54721E_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_B8C238BA_A69E_AFB9_41DB_A6464F54721E_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_B8C238BA_A69E_AFB9_41DB_A6464F54721E_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_B8C238BA_A69E_AFB9_41DB_A6464F54721E_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_B8C238BA_A69E_AFB9_41DB_A6464F54721E_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "mapLocations": [
  {
   "map": "this.map_D5C2EFDB_B155_1C85_41D8_129DE828BE4B",
   "x": 487.73,
   "angle": -3.54,
   "y": 1002.62,
   "class": "PanoramaMapLocation"
  }
 ],
 "hfovMin": "200%",
 "partial": false,
 "pitch": 0,
 "hfovMax": 135,
 "overlays": [
  "this.overlay_B8C218BA_A69E_AFB9_41D0_B743A9DC9EFE",
  "this.overlay_B8C208BA_A69E_AFB9_41DA_3049694A1CD1",
  "this.panorama_B8C3E8BA_A69E_AFB9_41C1_116805EE9981",
  "this.overlay_B8C3D8BA_A69E_AFB9_41D5_7410D6AC66CA"
 ],
 "class": "Panorama"
},
{
 "items": [
  {
   "class": "MapPlayListItem",
   "media": "this.map_D5C2EFDB_B155_1C85_41D8_129DE828BE4B",
   "player": "this.MapViewerMapPlayer",
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'constrained')"
  }
 ],
 "id": "playList_DCF300E9_C98E_CEEE_41C7_D6CEAC83FABA",
 "class": "PlayList"
},
{
 "duration": 300,
 "to": "right",
 "id": "effect_CC930844_B14D_0383_41B1_C71DD0E3BE20",
 "easing": "linear",
 "class": "SlideOutEffect"
},
{
 "class": "ImageResource",
 "id": "ImageResource_EDB90FE6_C4EB_6DB4_41E1_2C567E3751DF",
 "levels": [
  {
   "url": "media/popup_EF9DA0E7_C4E8_D3B4_41C6_1C5C75C217EF_0_0.jpg",
   "width": 1619,
   "height": 1080,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_EF9DA0E7_C4E8_D3B4_41C6_1C5C75C217EF_0_1.jpg",
   "width": 1024,
   "height": 683,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_EF9DA0E7_C4E8_D3B4_41C6_1C5C75C217EF_0_2.jpg",
   "width": 512,
   "height": 341,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "automaticZoomSpeed": 10,
 "id": "camera_DEA322AB_C98E_CD62_41E7_ECC6B1A5A89F",
 "initialPosition": {
  "yaw": -59.76,
  "hfov": 120,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "class": "PanoramaCamera"
},
{
 "maxWidth": 40,
 "class": "Image",
 "id": "Image_57653967_4347_7F6F_4166_5A375DABB586",
 "left": "3.38%",
 "maxHeight": 40,
 "paddingRight": 0,
 "borderSize": 0,
 "backgroundOpacity": 0,
 "propagateClick": true,
 "paddingLeft": 0,
 "width": 40,
 "minHeight": 1,
 "url": "skin/Image_57653967_4347_7F6F_4166_5A375DABB586.png",
 "horizontalAlign": "center",
 "top": "89.34%",
 "bottom": "5.86%",
 "paddingTop": 0,
 "borderRadius": 0,
 "minWidth": 1,
 "click": "if(!this.MapViewer.get('visible')){ this.setComponentVisibility(this.MapViewer, true, 0, this.effect_A20C00F0_873A_7AF6_41B9_B03B98122DFA, 'showEffect', false) } else { this.setComponentVisibility(this.MapViewer, false, 0, this.effect_A20C10F0_873A_7AF6_41DC_0014DE771BA8, 'hideEffect', false) }",
 "paddingBottom": 0,
 "verticalAlign": "middle",
 "scaleMode": "fit_inside",
 "shadow": false,
 "data": {
  "name": "map icon"
 }
},
{
 "class": "ImageResource",
 "id": "ImageResource_87A1A350_B494_E4E4_41D6_BFA0AA0BA470",
 "levels": [
  {
   "url": "media/popup_9FBDA241_B4B4_24E4_41BF_22A24B02003C_0_0.jpg",
   "width": 1619,
   "height": 1080,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_9FBDA241_B4B4_24E4_41BF_22A24B02003C_0_1.jpg",
   "width": 1024,
   "height": 683,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_9FBDA241_B4B4_24E4_41BF_22A24B02003C_0_2.jpg",
   "width": 512,
   "height": 341,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "class": "ImageResource",
 "id": "ImageResource_DDB14202_C97D_C3D5_41DE_7698605BC02D",
 "levels": [
  {
   "url": "media/popup_C6E70596_C964_C0FD_41BB_5121ABEF7C5B_0_0.png",
   "width": 1739,
   "height": 1255,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_C6E70596_C964_C0FD_41BB_5121ABEF7C5B_0_1.png",
   "width": 1024,
   "height": 738,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_C6E70596_C964_C0FD_41BB_5121ABEF7C5B_0_2.png",
   "width": 512,
   "height": 369,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "from": "left",
 "duration": 300,
 "id": "effect_A20C00F0_873A_7AF6_41B9_B03B98122DFA",
 "easing": "linear",
 "class": "SlideInEffect"
},
{
 "hfov": 360,
 "label": "\uc138\uc790\uc7ac\uc2e4",
 "id": "panorama_EA55570C_B1B5_0D83_419D_402AB2B70DDF",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_EA55570C_B1B5_0D83_419D_402AB2B70DDF_t.jpg",
 "adjacentPanoramas": [
  {
   "backwardYaw": 134.37,
   "yaw": -155.97,
   "panorama": "this.panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32",
   "distance": 1,
   "class": "AdjacentPanorama"
  },
  {
   "backwardYaw": 179.8,
   "yaw": 177.69,
   "panorama": "this.panorama_EE6E3D8C_B1BD_3C83_41E2_110C74F955A8",
   "distance": 1,
   "class": "AdjacentPanorama"
  },
  {
   "backwardYaw": 41.81,
   "yaw": 149.95,
   "panorama": "this.panorama_EB987E8F_B1CD_3C9D_41CA_53E02C0E1D7E",
   "distance": 1,
   "class": "AdjacentPanorama"
  }
 ],
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_EA55570C_B1B5_0D83_419D_402AB2B70DDF_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EA55570C_B1B5_0D83_419D_402AB2B70DDF_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EA55570C_B1B5_0D83_419D_402AB2B70DDF_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EA55570C_B1B5_0D83_419D_402AB2B70DDF_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_EA55570C_B1B5_0D83_419D_402AB2B70DDF_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EA55570C_B1B5_0D83_419D_402AB2B70DDF_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EA55570C_B1B5_0D83_419D_402AB2B70DDF_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EA55570C_B1B5_0D83_419D_402AB2B70DDF_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_EA55570C_B1B5_0D83_419D_402AB2B70DDF_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EA55570C_B1B5_0D83_419D_402AB2B70DDF_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EA55570C_B1B5_0D83_419D_402AB2B70DDF_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EA55570C_B1B5_0D83_419D_402AB2B70DDF_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_EA55570C_B1B5_0D83_419D_402AB2B70DDF_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EA55570C_B1B5_0D83_419D_402AB2B70DDF_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EA55570C_B1B5_0D83_419D_402AB2B70DDF_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EA55570C_B1B5_0D83_419D_402AB2B70DDF_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_EA55570C_B1B5_0D83_419D_402AB2B70DDF_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EA55570C_B1B5_0D83_419D_402AB2B70DDF_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EA55570C_B1B5_0D83_419D_402AB2B70DDF_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EA55570C_B1B5_0D83_419D_402AB2B70DDF_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_EA55570C_B1B5_0D83_419D_402AB2B70DDF_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EA55570C_B1B5_0D83_419D_402AB2B70DDF_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EA55570C_B1B5_0D83_419D_402AB2B70DDF_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_EA55570C_B1B5_0D83_419D_402AB2B70DDF_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_EA55570C_B1B5_0D83_419D_402AB2B70DDF_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "mapLocations": [
  {
   "map": "this.map_D5C2EFDB_B155_1C85_41D8_129DE828BE4B",
   "x": 520.1,
   "angle": 112.09,
   "y": 675,
   "class": "PanoramaMapLocation"
  }
 ],
 "hfovMin": "200%",
 "partial": false,
 "pitch": 0,
 "hfovMax": 135,
 "overlays": [
  "this.overlay_D0FED3AE_B14B_049F_4185_50B35249158C",
  "this.overlay_ED7B23B0_B14D_0483_41D1_797F73B8588F",
  "this.overlay_D0D0262F_B14F_0F9D_41CA_7D59D21F29CB",
  "this.overlay_AE559480_B4F4_2C64_41D0_1DE74043F647",
  "this.overlay_826DAFB8_B48C_3BA4_41D2_373EAEF0A9AD",
  "this.overlay_AB0138B5_B494_25AC_41E3_D87D7280A06D",
  "this.overlay_AB1DD549_B494_6CE4_41D0_1997A73448FB",
  "this.popup_95C1E5D2_B494_2FE4_41E4_0F8AEF9DBE5F",
  "this.panorama_EA55570C_B1B5_0D83_419D_402AB2B70DDF_tcap0",
  "this.popup_C6E70596_C964_C0FD_41BB_5121ABEF7C5B"
 ],
 "class": "Panorama"
},
{
 "rotationY": 0,
 "showEasing": "cubic_in",
 "hfov": 6.78,
 "rotationZ": 0,
 "popupMaxHeight": "80%",
 "id": "popup_9D3D1E61_B4B4_7CA4_41E6_900D4F087CB4",
 "rotationX": 0,
 "popupDistance": 100,
 "hideDuration": 500,
 "image": {
  "levels": [
   {
    "url": "media/popup_9D3D1E61_B4B4_7CA4_41E6_900D4F087CB4_0_1.jpg",
    "width": 1024,
    "height": 683,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "popupMaxWidth": "80%",
 "showDuration": 500,
 "yaw": -9.66,
 "hideEasing": "cubic_out",
 "pitch": -15.37,
 "class": "PopupPanoramaOverlay"
},
{
 "maxWidth": 64,
 "class": "IconButton",
 "id": "IconButton_6ED08C3E_7C38_D2A0_41B0_83963070F910",
 "maxHeight": 64,
 "width": 31.75,
 "data": {
  "name": "webframe_close_button"
 },
 "right": "13.07%",
 "borderSize": 0,
 "backgroundOpacity": 0,
 "propagateClick": false,
 "paddingLeft": 0,
 "paddingRight": 0,
 "minHeight": 1,
 "horizontalAlign": "center",
 "top": "15.09%",
 "transparencyActive": false,
 "height": 35.2,
 "paddingTop": 0,
 "mode": "push",
 "borderRadius": 0,
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.WebFrame_6E96CCB0_7C39_53A0_41D0_2470CE6C43BE, false, 0, null, null, false); this.setComponentVisibility(this.IconButton_6ED08C3E_7C38_D2A0_41B0_83963070F910, false, 0, null, null, false)",
 "paddingBottom": 0,
 "verticalAlign": "middle",
 "visible": false,
 "shadow": false,
 "cursor": "hand",
 "iconURL": "skin/IconButton_6ED08C3E_7C38_D2A0_41B0_83963070F910.png"
},
{
 "rotationY": 0,
 "showEasing": "cubic_in",
 "hfov": 7.01,
 "rotationZ": 0,
 "popupMaxHeight": "80%",
 "id": "popup_AB47D89A_B48D_E464_41D3_3474E77D4FEC",
 "rotationX": 0,
 "popupDistance": 100,
 "hideDuration": 500,
 "image": {
  "levels": [
   {
    "url": "media/popup_AB47D89A_B48D_E464_41D3_3474E77D4FEC_0_1.jpg",
    "width": 1024,
    "height": 683,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "popupMaxWidth": "80%",
 "showDuration": 500,
 "yaw": 17.96,
 "hideEasing": "cubic_out",
 "pitch": 4.03,
 "class": "PopupPanoramaOverlay"
},
{
 "automaticZoomSpeed": 10,
 "id": "camera_DF56D250_C98E_CD3E_41D0_2496E455B40C",
 "initialPosition": {
  "yaw": -138.19,
  "hfov": 120,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "class": "PanoramaCamera"
},
{
 "items": [
  "this.PanoramaPlayListItem_DCF3F0E9_C98E_CEEE_41DB_211B25877F9C",
  "this.PanoramaPlayListItem_DCF270E9_C98E_CEEE_41E6_CD78C345841E",
  "this.PanoramaPlayListItem_DCF2F0E9_C98E_CEEE_41C9_5BCA17FA4821",
  "this.PanoramaPlayListItem_DCFD60EA_C98E_CEE2_41E4_8CC3C082A615",
  "this.PanoramaPlayListItem_DCFDD0EA_C98E_CEE2_41E5_568AA623BB70",
  "this.PanoramaPlayListItem_DCFC50EA_C98E_CEE2_41E8_CE41B411768C",
  "this.PanoramaPlayListItem_DCFCE0EA_C98E_CEE2_41D9_FA713FAB49F6",
  "this.PanoramaPlayListItem_DCFF80EA_C98E_CEE2_41DC_608D53985D0C",
  "this.PanoramaPlayListItem_DCFE00EB_C98E_CEE2_41E3_6DCFE73FA951",
  "this.PanoramaPlayListItem_DCFE80EB_C98E_CEE2_41DC_B06CF03923E7"
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "rotationY": 0,
 "showEasing": "cubic_in",
 "hfov": 4.48,
 "rotationZ": 0,
 "popupMaxHeight": "80%",
 "id": "popup_C6C3C4AE_C96B_C02D_41E2_9F1C65858DE3",
 "rotationX": 0,
 "popupDistance": 100,
 "hideDuration": 500,
 "image": {
  "levels": [
   {
    "url": "media/popup_C6C3C4AE_C96B_C02D_41E2_9F1C65858DE3_0_1.png",
    "width": 1024,
    "height": 738,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "popupMaxWidth": "80%",
 "showDuration": 500,
 "yaw": 7.86,
 "hideEasing": "cubic_out",
 "pitch": -16.97,
 "class": "PopupPanoramaOverlay"
},
{
 "automaticZoomSpeed": 10,
 "id": "camera_DF8F9221_C98E_CD61_41E4_AA7951757C33",
 "initialPosition": {
  "yaw": 89.89,
  "hfov": 120,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "class": "PanoramaCamera"
},
{
 "rotationY": 0,
 "showEasing": "cubic_in",
 "hfov": 6.81,
 "rotationZ": 0,
 "popupMaxHeight": "80%",
 "id": "popup_9EAEA666_B4BB_ECAC_41D4_2BF45C36F5C4",
 "rotationX": 0,
 "popupDistance": 100,
 "hideDuration": 500,
 "image": {
  "levels": [
   {
    "url": "media/popup_9EAEA666_B4BB_ECAC_41D4_2BF45C36F5C4_0_1.jpg",
    "width": 1024,
    "height": 683,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "popupMaxWidth": "80%",
 "showDuration": 500,
 "yaw": 31.62,
 "hideEasing": "cubic_out",
 "pitch": -14.46,
 "class": "PopupPanoramaOverlay"
},
{
 "class": "ImageResource",
 "id": "ImageResource_DDB6B206_C97D_C3DD_41C4_328D0464D0F2",
 "levels": [
  {
   "url": "media/popup_D9465AEC_C964_402D_41DF_9EA22656117C_0_0.png",
   "width": 1739,
   "height": 1255,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_D9465AEC_C964_402D_41DF_9EA22656117C_0_1.png",
   "width": 1024,
   "height": 738,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_D9465AEC_C964_402D_41DF_9EA22656117C_0_2.png",
   "width": 512,
   "height": 369,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "duration": 500,
 "to": "left",
 "id": "effect_5E49C718_459A_82D5_41BC_347F532C2491",
 "easing": "linear",
 "class": "SlideOutEffect"
},
{
 "rotationY": 0,
 "showEasing": "cubic_in",
 "hfov": 4.21,
 "rotationZ": 0,
 "popupMaxHeight": "80%",
 "id": "popup_D9465AEC_C964_402D_41DF_9EA22656117C",
 "rotationX": 0,
 "popupDistance": 100,
 "hideDuration": 500,
 "image": {
  "levels": [
   {
    "url": "media/popup_D9465AEC_C964_402D_41DF_9EA22656117C_0_1.png",
    "width": 1024,
    "height": 738,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "popupMaxWidth": "80%",
 "showDuration": 500,
 "yaw": 6.6,
 "hideEasing": "cubic_out",
 "pitch": -26.12,
 "class": "PopupPanoramaOverlay"
},
{
 "automaticZoomSpeed": 10,
 "id": "camera_DF1EE27D_C98E_CDE6_41CE_29C5FE5E4890",
 "initialPosition": {
  "yaw": 24.03,
  "hfov": 120,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "id": "camera_DEFC9290_C98E_CD3E_41E3_44D239FDC907",
 "initialPosition": {
  "yaw": -179.73,
  "hfov": 120,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "class": "PanoramaCamera"
},
{
 "hfov": 360,
 "label": "\uc815\uc804",
 "id": "panorama_BB3EA0D4_A6BA_FFC9_41B5_378AA4C71E29",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_BB3EA0D4_A6BA_FFC9_41B5_378AA4C71E29_t.jpg",
 "adjacentPanoramas": [
  {
   "backwardYaw": -0.78,
   "yaw": 179.74,
   "panorama": "this.panorama_BB22B334_A60C_C516_41D4_85E2A3F602F3",
   "distance": 1,
   "class": "AdjacentPanorama"
  },
  {
   "backwardYaw": 151.31,
   "yaw": 132.56,
   "panorama": "this.panorama_B111BE24_A69F_6249_41D8_210A06A45A13",
   "distance": 1,
   "class": "AdjacentPanorama"
  },
  {
   "backwardYaw": -147.57,
   "yaw": -129.2,
   "panorama": "this.panorama_B149B9F0_A69E_A1C9_41A3_7D34CCC4C924",
   "distance": 1,
   "class": "AdjacentPanorama"
  },
  {
   "backwardYaw": 91.92,
   "yaw": -82.3,
   "panorama": "this.panorama_F70332DE_B1CD_04BF_41E0_52AD5D23EC3B",
   "distance": 1,
   "class": "AdjacentPanorama"
  }
 ],
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BB3EA0D4_A6BA_FFC9_41B5_378AA4C71E29_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_BB3EA0D4_A6BA_FFC9_41B5_378AA4C71E29_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_BB3EA0D4_A6BA_FFC9_41B5_378AA4C71E29_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_BB3EA0D4_A6BA_FFC9_41B5_378AA4C71E29_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BB3EA0D4_A6BA_FFC9_41B5_378AA4C71E29_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_BB3EA0D4_A6BA_FFC9_41B5_378AA4C71E29_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_BB3EA0D4_A6BA_FFC9_41B5_378AA4C71E29_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_BB3EA0D4_A6BA_FFC9_41B5_378AA4C71E29_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BB3EA0D4_A6BA_FFC9_41B5_378AA4C71E29_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_BB3EA0D4_A6BA_FFC9_41B5_378AA4C71E29_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_BB3EA0D4_A6BA_FFC9_41B5_378AA4C71E29_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_BB3EA0D4_A6BA_FFC9_41B5_378AA4C71E29_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_BB3EA0D4_A6BA_FFC9_41B5_378AA4C71E29_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_BB3EA0D4_A6BA_FFC9_41B5_378AA4C71E29_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_BB3EA0D4_A6BA_FFC9_41B5_378AA4C71E29_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_BB3EA0D4_A6BA_FFC9_41B5_378AA4C71E29_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BB3EA0D4_A6BA_FFC9_41B5_378AA4C71E29_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_BB3EA0D4_A6BA_FFC9_41B5_378AA4C71E29_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_BB3EA0D4_A6BA_FFC9_41B5_378AA4C71E29_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_BB3EA0D4_A6BA_FFC9_41B5_378AA4C71E29_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_BB3EA0D4_A6BA_FFC9_41B5_378AA4C71E29_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_BB3EA0D4_A6BA_FFC9_41B5_378AA4C71E29_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_BB3EA0D4_A6BA_FFC9_41B5_378AA4C71E29_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_BB3EA0D4_A6BA_FFC9_41B5_378AA4C71E29_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BB3EA0D4_A6BA_FFC9_41B5_378AA4C71E29_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "mapLocations": [
  {
   "map": "this.map_D5C2EFDB_B155_1C85_41D8_129DE828BE4B",
   "x": 382.56,
   "angle": 21.31,
   "y": 564.98,
   "class": "PanoramaMapLocation"
  }
 ],
 "hfovMin": "200%",
 "partial": false,
 "pitch": 0,
 "hfovMax": 135,
 "overlays": [
  "this.overlay_DACCE588_B15F_0C83_41D9_B02ED1A38A82",
  "this.overlay_BB3E30D4_A6BA_FFC9_41E2_BFE160E7EFD5",
  "this.overlay_BB3E20D4_A6BA_FFC9_41D6_84B15C4620C0",
  "this.overlay_BB3FC0D4_A6BA_FFC9_41D6_C68910E22E36",
  "this.overlay_BB3FF0D4_A6BA_FFC9_41DA_8C0525C41271",
  "this.panorama_BB3FB0D4_A6BA_FFC9_41D7_5BF805A12DBE",
  "this.overlay_BB3F50D4_A6BA_FFC9_41DC_9FF387C88689",
  "this.overlay_8E7BBD30_B1FF_1D83_41DE_0075B791EBE8",
  "this.overlay_A6C9F75C_B477_EC9C_41E2_CC39BB1811DF",
  "this.popup_D47CE4BA_C469_339C_41E1_72B8526F61C2",
  "this.popup_C676DEFA_C964_4035_41E1_912ACE9B6945"
 ],
 "class": "Panorama"
},
{
 "class": "Container",
 "scrollBarMargin": 2,
 "id": "Container_6A04ED74_7BD9_8F65_41BF_BB44D551B523",
 "right": "0%",
 "paddingRight": 0,
 "children": [
  "this.IconButton_C4202DE9_863E_587F_41D1_AA5B04C25200",
  "this.IconButton_B2A6FD12_863A_59AD_41BD_0C663B0C6B4F",
  "this.IconButton_6F0C8058_7BF6_B518_41CB_7D6B84744FF3"
 ],
 "scrollBarColor": "#000000",
 "gap": 8,
 "overflow": "hidden",
 "borderSize": 0,
 "backgroundOpacity": 0,
 "propagateClick": false,
 "paddingLeft": 0,
 "scrollBarOpacity": 0.5,
 "top": "2.17%",
 "minHeight": 1,
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "center",
 "contentOpaque": false,
 "paddingTop": 0,
 "width": "10.608%",
 "borderRadius": 0,
 "minWidth": 1,
 "height": "6.017%",
 "scrollBarWidth": 10,
 "paddingBottom": 0,
 "verticalAlign": "middle",
 "layout": "horizontal",
 "shadow": false,
 "data": {
  "name": "Container5809"
 }
},
{
 "automaticZoomSpeed": 10,
 "id": "camera_DC495168_C98E_CFEE_41DF_F7298E4BFCFC",
 "initialPosition": {
  "yaw": -25.96,
  "hfov": 120,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "class": "PanoramaCamera"
},
{
 "hfov": 360,
 "label": "\ud5a5\ub300\uccad(\uc2e0\uc2e42)",
 "id": "panorama_84A271EB_A69F_E1DF_41D4_672D5AE27031",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_84A271EB_A69F_E1DF_41D4_672D5AE27031_t.jpg",
 "adjacentPanoramas": [
  {
   "backwardYaw": 177.97,
   "yaw": 179.81,
   "panorama": "this.panorama_8037E8B6_B1BB_048F_419F_537FF8F54FCD",
   "distance": 1,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_EB987E8F_B1CD_3C9D_41CA_53E02C0E1D7E",
   "class": "AdjacentPanorama"
  }
 ],
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_84A271EB_A69F_E1DF_41D4_672D5AE27031_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_84A271EB_A69F_E1DF_41D4_672D5AE27031_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_84A271EB_A69F_E1DF_41D4_672D5AE27031_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_84A271EB_A69F_E1DF_41D4_672D5AE27031_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_84A271EB_A69F_E1DF_41D4_672D5AE27031_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_84A271EB_A69F_E1DF_41D4_672D5AE27031_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_84A271EB_A69F_E1DF_41D4_672D5AE27031_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_84A271EB_A69F_E1DF_41D4_672D5AE27031_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_84A271EB_A69F_E1DF_41D4_672D5AE27031_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_84A271EB_A69F_E1DF_41D4_672D5AE27031_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_84A271EB_A69F_E1DF_41D4_672D5AE27031_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_84A271EB_A69F_E1DF_41D4_672D5AE27031_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_84A271EB_A69F_E1DF_41D4_672D5AE27031_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_84A271EB_A69F_E1DF_41D4_672D5AE27031_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_84A271EB_A69F_E1DF_41D4_672D5AE27031_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_84A271EB_A69F_E1DF_41D4_672D5AE27031_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_84A271EB_A69F_E1DF_41D4_672D5AE27031_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_84A271EB_A69F_E1DF_41D4_672D5AE27031_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_84A271EB_A69F_E1DF_41D4_672D5AE27031_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_84A271EB_A69F_E1DF_41D4_672D5AE27031_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_84A271EB_A69F_E1DF_41D4_672D5AE27031_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 5,
      "width": 2560,
      "colCount": 5,
      "height": 2560,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_84A271EB_A69F_E1DF_41D4_672D5AE27031_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 3,
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_84A271EB_A69F_E1DF_41D4_672D5AE27031_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_84A271EB_A69F_E1DF_41D4_672D5AE27031_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "snapshots": [
    "this.snapshot_6E3C07CC_7CF9_EA37_41D9_C3DF07D6B485"
   ],
   "thumbnailUrl": "media/panorama_84A271EB_A69F_E1DF_41D4_672D5AE27031_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "hfovMin": "200%",
 "partial": false,
 "pitch": 0,
 "hfovMax": 135,
 "overlays": [
  "this.overlay_84A261EB_A69F_E1DF_41C6_09EB17893D08",
  "this.overlay_84A211EB_A69F_E1DF_41D5_9A1C472DECEE",
  "this.panorama_84A231EB_A69F_E1DF_41E4_0CF88A0684C9",
  "this.overlay_84A291EB_A69F_E1DF_41CA_9D0E88EB3B35",
  "this.overlay_845D11EB_A69F_E1DF_41C9_66BA3F199C6C",
  "this.overlay_84A2B1EB_A69F_E1DF_4195_D360F42F5E38",
  "this.overlay_845D31EB_A69F_E1DF_41C0_0ED857062ECD",
  "this.overlay_B2B0743F_AA29_1B8F_41E0_FC6544C02D70",
  "this.overlay_B99CF473_AA2B_1B97_41E5_14CCB9E5528B",
  "this.popup_9EAEA666_B4BB_ECAC_41D4_2BF45C36F5C4",
  "this.popup_9D3D1E61_B4B4_7CA4_41E6_900D4F087CB4",
  "this.popup_9FBDA241_B4B4_24E4_41BF_22A24B02003C"
 ],
 "class": "Panorama"
},
{
 "automaticZoomSpeed": 10,
 "id": "camera_DECDA299_C98E_CD2E_41C5_9DE0B75D1F39",
 "initialPosition": {
  "yaw": 158.08,
  "hfov": 120,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "class": "PanoramaCamera"
},
{
 "audio": {
  "mp3Url": "media/audio_D377640D_C477_F274_41DD_D087C037EFA5.mp3",
  "oggUrl": "media/audio_D377640D_C477_F274_41DD_D087C037EFA5.ogg",
  "class": "AudioResource"
 },
 "id": "audio_D377640D_C477_F274_41DD_D087C037EFA5",
 "data": {
  "label": "\ub864\uc624\ubc843"
 },
 "autoplay": true,
 "class": "MediaAudio"
},
{
 "items": [
  {
   "media": "this.panorama_B8C238BA_A69E_AFB9_41DB_A6464F54721E",
   "camera": "this.panorama_B8C238BA_A69E_AFB9_41DB_A6464F54721E_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_3110C4FE_3FEE_AA94_41CF_038F42695873_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BB22B334_A60C_C516_41D4_85E2A3F602F3",
   "camera": "this.panorama_BB22B334_A60C_C516_41D4_85E2A3F602F3_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_3110C4FE_3FEE_AA94_41CF_038F42695873_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BB3EA0D4_A6BA_FFC9_41B5_378AA4C71E29",
   "camera": "this.panorama_BB3EA0D4_A6BA_FFC9_41B5_378AA4C71E29_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_3110C4FE_3FEE_AA94_41CF_038F42695873_playlist, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_B111BE24_A69F_6249_41D8_210A06A45A13",
   "camera": "this.panorama_B111BE24_A69F_6249_41D8_210A06A45A13_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_3110C4FE_3FEE_AA94_41CF_038F42695873_playlist, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_B149B9F0_A69E_A1C9_41A3_7D34CCC4C924",
   "camera": "this.panorama_B149B9F0_A69E_A1C9_41A3_7D34CCC4C924_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_3110C4FE_3FEE_AA94_41CF_038F42695873_playlist, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F70332DE_B1CD_04BF_41E0_52AD5D23EC3B",
   "camera": "this.panorama_F70332DE_B1CD_04BF_41E0_52AD5D23EC3B_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_3110C4FE_3FEE_AA94_41CF_038F42695873_playlist, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_EA55570C_B1B5_0D83_419D_402AB2B70DDF",
   "camera": "this.panorama_EA55570C_B1B5_0D83_419D_402AB2B70DDF_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_3110C4FE_3FEE_AA94_41CF_038F42695873_playlist, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32",
   "camera": "this.panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_3110C4FE_3FEE_AA94_41CF_038F42695873_playlist, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_EE6E3D8C_B1BD_3C83_41E2_110C74F955A8",
   "camera": "this.panorama_EE6E3D8C_B1BD_3C83_41E2_110C74F955A8_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_3110C4FE_3FEE_AA94_41CF_038F42695873_playlist, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_8037E8B6_B1BB_048F_419F_537FF8F54FCD",
   "camera": "this.panorama_8037E8B6_B1BB_048F_419F_537FF8F54FCD_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_3110C4FE_3FEE_AA94_41CF_038F42695873_playlist, 9, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  }
 ],
 "id": "ThumbnailList_3110C4FE_3FEE_AA94_41CF_038F42695873_playlist",
 "class": "PlayList"
},
{
 "automaticZoomSpeed": 10,
 "id": "panorama_EE6E3D8C_B1BD_3C83_41E2_110C74F955A8_camera",
 "initialPosition": {
  "yaw": -2.03,
  "hfov": 120,
  "pitch": -0.49,
  "class": "PanoramaCameraPosition"
 },
 "class": "PanoramaCamera"
},
{
 "class": "ImageResource",
 "id": "ImageResource_DDCD41FF_C97D_C02B_41D8_CD4C36DDD9DB",
 "levels": [
  {
   "url": "media/popup_C64A66C7_C964_405B_41B0_A24020C9ADE2_0_0.png",
   "width": 1739,
   "height": 1255,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_C64A66C7_C964_405B_41B0_A24020C9ADE2_0_1.png",
   "width": 1024,
   "height": 738,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_C64A66C7_C964_405B_41B0_A24020C9ADE2_0_2.png",
   "width": 512,
   "height": 369,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "audio": {
  "mp3Url": "media/audio_D08E2941_C469_F2EC_41D7_04BA458AECE7.mp3",
  "oggUrl": "media/audio_D08E2941_C469_F2EC_41D7_04BA458AECE7.ogg",
  "class": "AudioResource"
 },
 "id": "audio_D08E2941_C469_F2EC_41D7_04BA458AECE7",
 "data": {
  "label": "S_SMA_TR03 More and More"
 },
 "autoplay": true,
 "class": "MediaAudio"
},
{
 "automaticZoomSpeed": 10,
 "id": "camera_DCB82117_C98E_CF22_41E7_84DE904D24BB",
 "initialPosition": {
  "yaw": -0.26,
  "hfov": 120,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "class": "PanoramaCamera"
},
{
 "class": "UIComponent",
 "id": "veilPopupPanorama",
 "left": 0,
 "right": 0,
 "paddingRight": 0,
 "borderSize": 0,
 "backgroundOpacity": 0.55,
 "propagateClick": false,
 "paddingLeft": 0,
 "minHeight": 0,
 "backgroundColorRatios": [
  0
 ],
 "bottom": 0,
 "top": 0,
 "paddingTop": 0,
 "borderRadius": 0,
 "minWidth": 0,
 "backgroundColorDirection": "vertical",
 "backgroundColor": [
  "#000000"
 ],
 "paddingBottom": 0,
 "showEffect": {
  "duration": 350,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "visible": false,
 "shadow": false,
 "data": {
  "name": "UIComponent4616"
 }
},
{
 "class": "ZoomImage",
 "id": "zoomImagePopupPanorama",
 "left": 0,
 "right": 0,
 "paddingRight": 0,
 "borderSize": 0,
 "backgroundOpacity": 1,
 "propagateClick": false,
 "paddingLeft": 0,
 "minHeight": 0,
 "backgroundColorRatios": [],
 "bottom": 0,
 "top": 0,
 "paddingTop": 0,
 "borderRadius": 0,
 "minWidth": 0,
 "backgroundColorDirection": "vertical",
 "backgroundColor": [],
 "paddingBottom": 0,
 "visible": false,
 "scaleMode": "custom",
 "shadow": false,
 "data": {
  "name": "ZoomImage4617"
 }
},
{
 "fontSize": "1.29vmin",
 "class": "CloseButton",
 "shadowSpread": 1,
 "layout": "horizontal",
 "id": "closeButtonPopupPanorama",
 "iconLineWidth": 5,
 "pressedIconColor": "#888888",
 "data": {
  "name": "CloseButton4618"
 },
 "fontFamily": "Arial",
 "right": 10,
 "paddingRight": 5,
 "shadowColor": "#000000",
 "borderSize": 0,
 "backgroundOpacity": 0.3,
 "propagateClick": false,
 "gap": 5,
 "paddingLeft": 5,
 "minHeight": 0,
 "rollOverIconColor": "#666666",
 "horizontalAlign": "center",
 "backgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "backgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "borderColor": "#000000",
 "paddingTop": 5,
 "mode": "push",
 "borderRadius": 0,
 "top": 10,
 "minWidth": 0,
 "label": "",
 "backgroundColorDirection": "vertical",
 "paddingBottom": 5,
 "fontStyle": "normal",
 "shadowBlurRadius": 6,
 "iconHeight": 20,
 "verticalAlign": "middle",
 "showEffect": {
  "duration": 350,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "textDecoration": "none",
 "visible": false,
 "iconBeforeLabel": true,
 "fontColor": "#FFFFFF",
 "shadow": false,
 "cursor": "hand",
 "iconColor": "#000000",
 "iconWidth": 20,
 "fontWeight": "normal"
},
{
 "enabled": false,
 "maps": [
  {
   "yaw": 179.12,
   "hfov": 6.69,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F70332DE_B1CD_04BF_41E0_52AD5D23EC3B_1_HS_4_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.48,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01b"
 },
 "enabledInCardboard": true,
 "useHandCursor": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BB22B334_A60C_C516_41D4_85E2A3F602F3, this.camera_DC6A114B_C98E_CF22_41E8_26370B2FAFA2); this.mainPlayList.set('selectedIndex', 1)",
   "toolTip": "\uc815\uc804\ub0a8\uc2e0\ubb38",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 6.69,
   "image": "this.AnimatedImageResource_8B50F814_C46B_5294_41DA_7B0491AD2550",
   "pitch": -7.48,
   "yaw": 179.12,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_F70322DE_B1CD_04BF_41E1_76362C2F0262",
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": -1.36,
   "hfov": 10.97,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F70332DE_B1CD_04BF_41E0_52AD5D23EC3B_1_HS_5_0_0_map.gif",
      "width": 24,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 29.46,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "typo__youngnungjeon_zoom"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 10.97,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F70332DE_B1CD_04BF_41E0_52AD5D23EC3B_1_HS_5_0.png",
      "width": 268,
      "height": 172,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 29.46,
   "yaw": -1.36,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_F70312DF_B1CD_04BD_41E4_58A6221717F8",
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": 91.92,
   "hfov": 6.74,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F70332DE_B1CD_04BF_41E0_52AD5D23EC3B_1_HS_10_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.65,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01b"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BB3EA0D4_A6BA_FFC9_41B5_378AA4C71E29, this.camera_DC5FF177_C98E_CFE2_41C4_7FC7AAD6D402); this.mainPlayList.set('selectedIndex', 2)",
   "toolTip": "\uc815\uc804",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 6.74,
   "image": "this.AnimatedImageResource_8B537814_C46B_5294_41B6_4A0783A6AB49",
   "pitch": -3.65,
   "yaw": 91.92,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_FD97551E_B1DB_0DBF_41D1_BE5A704E2EFF",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabled": false,
 "maps": [
  {
   "yaw": 120.24,
   "hfov": 6.74,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F70332DE_B1CD_04BF_41E0_52AD5D23EC3B_1_HS_11_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.16,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01b"
 },
 "enabledInCardboard": true,
 "useHandCursor": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_B149B9F0_A69E_A1C9_41A3_7D34CCC4C924, this.camera_DC495168_C98E_CFEE_41DF_F7298E4BFCFC); this.mainPlayList.set('selectedIndex', 4)",
   "toolTip": "\uce60\uc0ac\ub2f9",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 6.74,
   "image": "this.AnimatedImageResource_8B533814_C46B_5294_41DA_88F44AA773DD",
   "pitch": -3.16,
   "yaw": 120.24,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_C14B125F_B175_07BD_41E1_ED5F997143A0",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabled": false,
 "maps": [
  {
   "yaw": 126.56,
   "hfov": 6.74,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F70332DE_B1CD_04BF_41E0_52AD5D23EC3B_1_HS_12_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.3,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01b"
 },
 "enabledInCardboard": true,
 "useHandCursor": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_B111BE24_A69F_6249_41D8_210A06A45A13, this.camera_DC78A159_C98E_CF2E_41A1_3331AA05C001); this.mainPlayList.set('selectedIndex', 3)",
   "toolTip": "\uacf5\uc2e0\ub2f9 ",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 6.74,
   "image": "this.AnimatedImageResource_8B53D814_C46B_5294_41E5_447C2B9B2A5D",
   "pitch": -3.3,
   "yaw": 126.56,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_C1C48F16_B14B_1D8F_41DA_2CAE50DF2778",
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": 7.43,
   "hfov": 4.07,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F70332DE_B1CD_04BF_41E0_52AD5D23EC3B_1_HS_13_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 29.63,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showPopupPanoramaOverlay(this.popup_C6191F7F_C965_C02B_41E6_A6B52E9246C1, {'paddingTop':0,'rollOverIconWidth':20,'pressedIconWidth':20,'rollOverIconHeight':20,'backgroundColorDirection':'vertical','pressedBorderSize':0,'pressedIconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedBackgroundOpacity':0,'pressedBorderColor':'#000000','pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'paddingRight':15,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBorderSize':0,'iconLineWidth':5,'iconColor':'#FFFFFF','rollOverIconLineWidth':5,'backgroundOpacity':0,'backgroundColorRatios':[0,0.09803921568627451,1],'iconHeight':20,'rollOverIconColor':'#6699CC','paddingBottom':0,'pressedIconLineWidth':5,'paddingLeft':0,'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderSize':0,'pressedIconColor':'#6699CC','iconWidth':20,'borderColor':'#000000','rollOverBackgroundOpacity':0,'pressedBackgroundColorDirection':'vertical','rollOverBorderColor':'#000000','backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_DDCF7201_C97D_C3D7_4191_A748AC011969, null, null, null, this.audio_D377640D_C477_F274_41DD_D087C037EFA5, false)"
  }
 ],
 "items": [
  {
   "hfov": 4.07,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F70332DE_B1CD_04BF_41E0_52AD5D23EC3B_1_HS_13_0.png",
      "width": 100,
      "height": 100,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 29.63,
   "yaw": 7.43,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_A08F6975_B48C_24AC_41E2_B48CEB0E3691",
 "class": "HotspotPanoramaOverlay"
},
{
 "inertia": false,
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_F70332DE_B1CD_04BF_41E0_52AD5D23EC3B_tcap0",
 "hfov": 45,
 "image": {
  "levels": [
   {
    "url": "media/panorama_B8C3E8BA_A69E_AFB9_41C1_116805EE9981.png",
    "width": 850,
    "height": 850,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "TripodCapPanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": -153.52,
   "hfov": 6.7,
   "image": {
    "levels": [
     {
      "url": "media/panorama_EE6E3D8C_B1BD_3C83_41E2_110C74F955A8_1_HS_0_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.04,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01b"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_EB987E8F_B1CD_3C9D_41CA_53E02C0E1D7E, this.camera_DC3D7194_C98E_CF26_41E5_611CB803337A); this.setMediaBehaviour(this.playList_DCF720E6_C98E_CEE2_41E9_1AD2BF13FC43, 0, this.panorama_EE6E3D8C_B1BD_3C83_41E2_110C74F955A8)",
   "toolTip": "\uc7ac\uad81",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 6.7,
   "image": "this.AnimatedImageResource_8B57F817_C46B_5294_41D7_152F6388EE9D",
   "pitch": -7.04,
   "yaw": -153.52,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_ECCAB1CB_B1BD_0485_41C2_4F5DBC03D0EC",
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": 149.17,
   "hfov": 6.71,
   "image": {
    "levels": [
     {
      "url": "media/panorama_EE6E3D8C_B1BD_3C83_41E2_110C74F955A8_1_HS_1_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.35,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01b"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32, this.camera_DC2F1185_C98E_CF26_41BA_B2B3B0FEE82B); this.mainPlayList.set('selectedIndex', 7)",
   "toolTip": "\uc5b4\uc7ac\uc2e4",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 6.71,
   "image": "this.AnimatedImageResource_8B567817_C46B_5294_41DE_06FDA05F8BF3",
   "pitch": -6.35,
   "yaw": 149.17,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_EFB8738D_B1BB_049D_41C9_D64FD6F611F7",
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": 179.8,
   "hfov": 6.72,
   "image": {
    "levels": [
     {
      "url": "media/panorama_EE6E3D8C_B1BD_3C83_41E2_110C74F955A8_1_HS_2_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.68,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01b"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_EA55570C_B1B5_0D83_419D_402AB2B70DDF, this.camera_DC0241A3_C98E_CF62_41B6_E5705E9439AC); this.mainPlayList.set('selectedIndex', 6)",
   "toolTip": "\uc138\uc790\uc7ac\uc2e4",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 6.72,
   "image": "this.AnimatedImageResource_8B56E817_C46B_5294_41D3_C09BB9E9B13D",
   "pitch": -5.68,
   "yaw": 179.8,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_EF8BFB9D_B1B5_04BD_41A6_485D1FBDE775",
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": -3,
   "hfov": 11.8,
   "image": {
    "levels": [
     {
      "url": "media/panorama_EE6E3D8C_B1BD_3C83_41E2_110C74F955A8_1_HS_3_0_0_map.gif",
      "width": 29,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -25.97,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "typo\u00ad_7sadang_zoom"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 11.8,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_EE6E3D8C_B1BD_3C83_41E2_110C74F955A8_1_HS_3_0.png",
      "width": 280,
      "height": 150,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -25.97,
   "yaw": -3,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_AC7B0515_B4F4_6C6C_41D8_6AA6C6A4DA19",
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": 6.6,
   "hfov": 4.21,
   "image": {
    "levels": [
     {
      "url": "media/panorama_EE6E3D8C_B1BD_3C83_41E2_110C74F955A8_1_HS_4_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -26.12,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showPopupPanoramaOverlay(this.popup_D9465AEC_C964_402D_41DF_9EA22656117C, {'paddingTop':0,'rollOverIconWidth':20,'pressedIconWidth':20,'rollOverIconHeight':20,'backgroundColorDirection':'vertical','pressedBorderSize':0,'pressedIconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedBackgroundOpacity':0,'pressedBorderColor':'#000000','pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'paddingRight':15,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBorderSize':0,'iconLineWidth':5,'iconColor':'#FFFFFF','rollOverIconLineWidth':5,'backgroundOpacity':0,'backgroundColorRatios':[0,0.09803921568627451,1],'iconHeight':20,'rollOverIconColor':'#6699CC','paddingBottom':0,'pressedIconLineWidth':5,'paddingLeft':0,'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderSize':0,'pressedIconColor':'#6699CC','iconWidth':20,'borderColor':'#000000','rollOverBackgroundOpacity':0,'pressedBackgroundColorDirection':'vertical','rollOverBorderColor':'#000000','backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_DDB6B206_C97D_C3DD_41C4_328D0464D0F2, null, null, null, this.audio_D377640D_C477_F274_41DD_D087C037EFA5, false)"
  }
 ],
 "items": [
  {
   "hfov": 4.21,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_EE6E3D8C_B1BD_3C83_41E2_110C74F955A8_1_HS_4_0.png",
      "width": 100,
      "height": 100,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -26.12,
   "yaw": 6.6,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_AE5256BD_B4F4_2D9C_41AE_FEBC55EB54E4",
 "class": "HotspotPanoramaOverlay"
},
{
 "inertia": false,
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_EE6E3D8C_B1BD_3C83_41E2_110C74F955A8_tcap0",
 "hfov": 45,
 "image": {
  "levels": [
   {
    "url": "media/panorama_B8C3E8BA_A69E_AFB9_41C1_116805EE9981.png",
    "width": 850,
    "height": 850,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "TripodCapPanoramaOverlay"
},
{
 "position": {
  "yaw": 0.61,
  "hfov": 135,
  "pitch": 4.32,
  "class": "PanoramaCameraPosition"
 },
 "id": "snapshot_73156855_7CF9_E6D1_4185_9961FE9FF10B",
 "class": "PanoramaSnapshot"
},
{
 "maps": [
  {
   "yaw": -109.78,
   "hfov": 8.3,
   "image": {
    "levels": [
     {
      "url": "media/panorama_8037E8B6_B1BB_048F_419F_537FF8F54FCD_1_HS_13_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -27.71,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01b"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_EB987E8F_B1CD_3C9D_41CA_53E02C0E1D7E, this.camera_DFE1F1C0_C98E_CF1E_41D9_EA5984914C5D); this.setMediaBehaviour(this.playList_DCF720E6_C98E_CEE2_41E9_1AD2BF13FC43, 0, this.panorama_8037E8B6_B1BB_048F_419F_537FF8F54FCD)",
   "toolTip": "\uc7ac\uad81",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 8.3,
   "image": "this.AnimatedImageResource_8B593817_C46B_5294_41E4_0F6DB5AECB8D",
   "pitch": -27.71,
   "yaw": -109.78,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_803708B7_B1BB_048D_41E0_1142194FA254",
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": 177.97,
   "hfov": 9.4,
   "image": {
    "levels": [
     {
      "url": "media/panorama_8037E8B6_B1BB_048F_419F_537FF8F54FCD_1_HS_23_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -27.74,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01b"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_84A271EB_A69F_E1DF_41D4_672D5AE27031, this.camera_DC10C1B1_C98E_CF7E_41C6_1A14B06BF66F); this.setMediaBehaviour(this.playList_DCF1D0E8_C98E_CEEE_41E4_A32D6BD92B24, 0, this.panorama_8037E8B6_B1BB_048F_419F_537FF8F54FCD)",
   "toolTip": "\ud5a5\ub300\uccad(\uc2e0\uc2e42)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 9.4,
   "image": "this.AnimatedImageResource_8B59A818_C46B_529C_41CF_2287174BC198",
   "pitch": -27.74,
   "yaw": 177.97,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_F02C8A53_C5EB_76EC_41C9_68F9E89B2771",
 "class": "HotspotPanoramaOverlay"
},
{
 "inertia": false,
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_803738B7_B1BB_048D_41C5_F1926D8C128B",
 "hfov": 45,
 "image": {
  "levels": [
   {
    "url": "media/panorama_B8C3E8BA_A69E_AFB9_41C1_116805EE9981.png",
    "width": 850,
    "height": 850,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "TripodCapPanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": 59.49,
   "hfov": 11.83,
   "image": {
    "levels": [
     {
      "url": "media/panorama_8037E8B6_B1BB_048F_419F_537FF8F54FCD_1_HS_11_0_0_map.gif",
      "width": 31,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 3.75,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "typo_sinsil"
 },
 "enabledInCardboard": true,
 "useHandCursor": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 11.83,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_8037E8B6_B1BB_048F_419F_537FF8F54FCD_1_HS_11_0.png",
      "width": 252,
      "height": 130,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 3.75,
   "yaw": 59.49,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_803758B7_B1BB_048D_41D1_E85B983CD9EC",
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": -0.12,
   "hfov": 12.39,
   "image": {
    "levels": [
     {
      "url": "media/panorama_8037E8B6_B1BB_048F_419F_537FF8F54FCD_1_HS_16_1_0_map.gif",
      "width": 132,
      "height": 100,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.49,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "Polygon"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.setOverlayBehaviour(this.overlay_8036A8B7_B1BB_048D_41B2_55BBE08D7015, this.panorama_8037E8B6_B1BB_048F_419F_537FF8F54FCD, 'triggerClick', true)"
  }
 ],
 "items": [
  {
   "hfov": 12.39,
   "roll": 0,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_8037E8B6_B1BB_048F_419F_537FF8F54FCD_1_HS_16_0.png",
      "width": 265,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.49,
   "yaw": -0.12,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_803688B7_B1BB_048D_41BA_9DC602585642",
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": 0.01,
   "hfov": 7.03,
   "image": {
    "levels": [
     {
      "url": "media/panorama_8037E8B6_B1BB_048F_419F_537FF8F54FCD_1_HS_18_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.76,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image1"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showPopupPanoramaOverlay(this.popup_9DE78CB1_B4BC_3DA4_41D4_040BDB53775C, {'paddingTop':15,'rollOverIconWidth':20,'pressedIconWidth':20,'rollOverIconHeight':20,'backgroundColorDirection':'vertical','pressedBorderSize':0,'pressedIconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedBackgroundOpacity':0,'pressedBorderColor':'#000000','pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'paddingRight':15,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBorderSize':0,'iconLineWidth':5,'iconColor':'#FFFFFF','rollOverIconLineWidth':5,'backgroundOpacity':0,'backgroundColorRatios':[0,0.09803921568627451,1],'iconHeight':20,'rollOverIconColor':'#6699CC','paddingBottom':0,'pressedIconLineWidth':5,'paddingLeft':0,'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderSize':0,'pressedIconColor':'#6699CC','iconWidth':20,'borderColor':'#000000','rollOverBackgroundOpacity':0,'pressedBackgroundColorDirection':'vertical','rollOverBorderColor':'#000000','backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_87A6434F_B494_E4FC_41DE_E3350DDBC4BD, null, null, null, this.audio_D377640D_C477_F274_41DD_D087C037EFA5, false)"
  }
 ],
 "items": [
  {
   "hfov": 7.03,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_8037E8B6_B1BB_048F_419F_537FF8F54FCD_1_HS_18_0.png",
      "width": 149,
      "height": 149,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.76,
   "yaw": 0.01,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_8036A8B7_B1BB_048D_41B2_55BBE08D7015",
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": 7.72,
   "hfov": 18.09,
   "image": {
    "levels": [
     {
      "url": "media/panorama_8037E8B6_B1BB_048F_419F_537FF8F54FCD_1_HS_21_1_0_map.gif",
      "width": 194,
      "height": 146,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -29.29,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "Polygon"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.setOverlayBehaviour(this.overlay_803608B7_B1BB_048D_41E4_7CB2BB3918CF, this.panorama_8037E8B6_B1BB_048F_419F_537FF8F54FCD, 'triggerClick', true)"
  }
 ],
 "items": [
  {
   "hfov": 18.09,
   "roll": 0,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_8037E8B6_B1BB_048F_419F_537FF8F54FCD_1_HS_21_0.png",
      "width": 389,
      "height": 293,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -29.29,
   "yaw": 7.72,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_8036F8B7_B1BB_048D_41BF_C98F44AEA327",
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": 9.58,
   "hfov": 6.26,
   "image": {
    "levels": [
     {
      "url": "media/panorama_8037E8B6_B1BB_048F_419F_537FF8F54FCD_1_HS_22_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -27.05,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image0"
 },
 "enabledInCardboard": true,
 "useHandCursor": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showPopupPanoramaOverlay(this.popup_AA643CE1_B48C_7DA4_41CA_AF54CAAB8036, {'paddingTop':15,'rollOverIconWidth':20,'pressedIconWidth':20,'rollOverIconHeight':20,'backgroundColorDirection':'vertical','pressedBorderSize':0,'pressedIconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedBackgroundOpacity':0,'pressedBorderColor':'#000000','pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'paddingRight':15,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBorderSize':0,'iconLineWidth':5,'iconColor':'#FFFFFF','rollOverIconLineWidth':5,'backgroundOpacity':0,'backgroundColorRatios':[0,0.09803921568627451,1],'iconHeight':20,'rollOverIconColor':'#6699CC','paddingBottom':0,'pressedIconLineWidth':5,'paddingLeft':0,'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderSize':0,'pressedIconColor':'#6699CC','iconWidth':20,'borderColor':'#000000','rollOverBackgroundOpacity':0,'pressedBackgroundColorDirection':'vertical','rollOverBorderColor':'#000000','backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_9047B2C2_B49B_E5E4_41D4_516029D61FF5, null, null, null, this.audio_D377640D_C477_F274_41DD_D087C037EFA5, false)"
  }
 ],
 "items": [
  {
   "hfov": 6.26,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_8037E8B6_B1BB_048F_419F_537FF8F54FCD_1_HS_22_0.png",
      "width": 149,
      "height": 149,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -27.05,
   "yaw": 9.58,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_803608B7_B1BB_048D_41E4_7CB2BB3918CF",
 "class": "HotspotPanoramaOverlay"
},
{
 "map": {
  "width": 50,
  "x": 282.54,
  "image": {
   "levels": [
    {
     "url": "media/map_D5C2EFDB_B155_1C85_41D8_129DE828BE4B_HS_43_map.gif",
     "width": 16,
     "height": 16,
     "class": "ImageResourceLevel"
    }
   ],
   "class": "ImageResource"
  },
  "offsetX": 0,
  "offsetY": 0,
  "height": 50,
  "y": 535.83,
  "class": "HotspotMapOverlayMap"
 },
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 282.54,
  "height": 50,
  "y": 535.83,
  "width": 50,
  "image": {
   "levels": [
    {
     "url": "media/map_D5C2EFDB_B155_1C85_41D8_129DE828BE4B_HS_43.png",
     "width": 50,
     "height": 50,
     "class": "ImageResourceLevel"
    }
   ],
   "class": "ImageResource"
  },
  "class": "HotspotMapOverlayImage"
 },
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 4); this.setComponentVisibility(this.WebFrame_6E96CCB0_7C39_53A0_41D0_2470CE6C43BE, false, 0, null, null, false); this.setComponentVisibility(this.IconButton_6ED08C3E_7C38_D2A0_41B0_83963070F910, false, 0, null, null, false)",
   "toolTip": "\uce60\uc0ac\ub2f9",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "id": "overlay_D5C2FFDB_B155_1C85_41B5_A677FCD3E529",
 "class": "AreaHotspotMapOverlay"
},
{
 "map": {
  "width": 50,
  "x": 182.17,
  "image": {
   "levels": [
    {
     "url": "media/map_D5C2EFDB_B155_1C85_41D8_129DE828BE4B_HS_44_map.gif",
     "width": 16,
     "height": 16,
     "class": "ImageResourceLevel"
    }
   ],
   "class": "ImageResource"
  },
  "offsetX": 0,
  "offsetY": 0,
  "height": 50,
  "y": 342.75,
  "class": "HotspotMapOverlayMap"
 },
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 182.17,
  "height": 50,
  "y": 342.75,
  "width": 50,
  "image": {
   "levels": [
    {
     "url": "media/map_D5C2EFDB_B155_1C85_41D8_129DE828BE4B_HS_44.png",
     "width": 50,
     "height": 50,
     "class": "ImageResourceLevel"
    }
   ],
   "class": "ImageResource"
  },
  "class": "HotspotMapOverlayImage"
 },
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 5); this.setComponentVisibility(this.WebFrame_6E96CCB0_7C39_53A0_41D0_2470CE6C43BE, false, 0, null, null, false); this.setComponentVisibility(this.IconButton_6ED08C3E_7C38_D2A0_41B0_83963070F910, false, 0, null, null, false)",
   "toolTip": "\uc601\ub155\uc804",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "id": "overlay_D5C28FDC_B155_1C83_41D9_2B9973ABE29A",
 "class": "AreaHotspotMapOverlay"
},
{
 "map": {
  "width": 52.15,
  "x": 563.55,
  "image": {
   "levels": [
    {
     "url": "media/map_D5C2EFDB_B155_1C85_41D8_129DE828BE4B_HS_48_map.gif",
     "width": 19,
     "height": 16,
     "class": "ImageResourceLevel"
    }
   ],
   "class": "ImageResource"
  },
  "offsetX": 0,
  "offsetY": 0,
  "height": 43.9,
  "y": 270.98,
  "class": "HotspotMapOverlayMap"
 },
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 563.55,
  "height": 43.9,
  "y": 270.98,
  "width": 52.15,
  "image": {
   "levels": [
    {
     "url": "media/map_D5C2EFDB_B155_1C85_41D8_129DE828BE4B_HS_48.png",
     "width": 52,
     "height": 43,
     "class": "ImageResourceLevel"
    }
   ],
   "class": "ImageResource"
  },
  "class": "HotspotMapOverlayImage"
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.setComponentVisibility(this.MapViewer, false, 0, this.effect_5E49C718_459A_82D5_41BC_347F532C2491, 'hideEffect', false)"
  }
 ],
 "id": "overlay_D5C2AFDC_B155_1C83_41DF_65C7363A9E9F",
 "class": "AreaHotspotMapOverlay"
},
{
 "map": {
  "width": 50,
  "x": 354.88,
  "image": {
   "levels": [
    {
     "url": "media/map_D5C2EFDB_B155_1C85_41D8_129DE828BE4B_HS_45_map.gif",
     "width": 16,
     "height": 16,
     "class": "ImageResourceLevel"
    }
   ],
   "class": "ImageResource"
  },
  "offsetX": 0,
  "offsetY": 0,
  "height": 50,
  "y": 537.43,
  "class": "HotspotMapOverlayMap"
 },
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 354.88,
  "height": 50,
  "y": 537.43,
  "width": 50,
  "image": {
   "levels": [
    {
     "url": "media/map_D5C2EFDB_B155_1C85_41D8_129DE828BE4B_HS_45.png",
     "width": 50,
     "height": 50,
     "class": "ImageResourceLevel"
    }
   ],
   "class": "ImageResource"
  },
  "class": "HotspotMapOverlayImage"
 },
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 2); this.setComponentVisibility(this.WebFrame_6E96CCB0_7C39_53A0_41D0_2470CE6C43BE, false, 0, null, null, false); this.setComponentVisibility(this.IconButton_6ED08C3E_7C38_D2A0_41B0_83963070F910, false, 0, null, null, false)",
   "toolTip": "\uc815\uc804",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "id": "overlay_D5C2BFDC_B155_1C83_41E1_B13DC38B001F",
 "class": "AreaHotspotMapOverlay"
},
{
 "map": {
  "width": 50,
  "x": 513.93,
  "image": {
   "levels": [
    {
     "url": "media/map_D5C2EFDB_B155_1C85_41D8_129DE828BE4B_HS_46_map.gif",
     "width": 16,
     "height": 16,
     "class": "ImageResourceLevel"
    }
   ],
   "class": "ImageResource"
  },
  "offsetX": 0,
  "offsetY": 0,
  "height": 50,
  "y": 792.58,
  "class": "HotspotMapOverlayMap"
 },
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 513.93,
  "height": 50,
  "y": 792.58,
  "width": 50,
  "image": {
   "levels": [
    {
     "url": "media/map_D5C2EFDB_B155_1C85_41D8_129DE828BE4B_HS_46.png",
     "width": 50,
     "height": 50,
     "class": "ImageResourceLevel"
    }
   ],
   "class": "ImageResource"
  },
  "class": "HotspotMapOverlayImage"
 },
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 9); this.setComponentVisibility(this.WebFrame_6E96CCB0_7C39_53A0_41D0_2470CE6C43BE, false, 0, null, null, false); this.setComponentVisibility(this.IconButton_6ED08C3E_7C38_D2A0_41B0_83963070F910, false, 0, null, null, false)",
   "toolTip": "\ud5a5\ub300\uccad(\uc2e0\uc2e4)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "id": "overlay_D5C34FDC_B155_1C83_41D0_2050972EDB00",
 "class": "AreaHotspotMapOverlay"
},
{
 "map": {
  "width": 50,
  "x": 405.9,
  "image": {
   "levels": [
    {
     "url": "media/map_D5C2EFDB_B155_1C85_41D8_129DE828BE4B_HS_42_map.gif",
     "width": 16,
     "height": 16,
     "class": "ImageResourceLevel"
    }
   ],
   "class": "ImageResource"
  },
  "offsetX": 0,
  "offsetY": 0,
  "height": 50,
  "y": 588.83,
  "class": "HotspotMapOverlayMap"
 },
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 405.9,
  "height": 50,
  "y": 588.83,
  "width": 50,
  "image": {
   "levels": [
    {
     "url": "media/map_D5C2EFDB_B155_1C85_41D8_129DE828BE4B_HS_42.png",
     "width": 50,
     "height": 50,
     "class": "ImageResourceLevel"
    }
   ],
   "class": "ImageResource"
  },
  "class": "HotspotMapOverlayImage"
 },
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 3); this.setComponentVisibility(this.WebFrame_6E96CCB0_7C39_53A0_41D0_2470CE6C43BE, false, 0, null, null, false); this.setComponentVisibility(this.IconButton_6ED08C3E_7C38_D2A0_41B0_83963070F910, false, 0, null, null, false)",
   "toolTip": "\uacf5\uc2e0\ub2f9",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "id": "overlay_D5C35FDC_B155_1C83_41D9_E149890DBB95",
 "class": "AreaHotspotMapOverlay"
},
{
 "map": {
  "width": 50,
  "x": 339.24,
  "image": {
   "levels": [
    {
     "url": "media/map_D5C2EFDB_B155_1C85_41D8_129DE828BE4B_HS_41_map.gif",
     "width": 16,
     "height": 16,
     "class": "ImageResourceLevel"
    }
   ],
   "class": "ImageResource"
  },
  "offsetX": 0,
  "offsetY": 0,
  "height": 50,
  "y": 590.68,
  "class": "HotspotMapOverlayMap"
 },
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 339.24,
  "height": 50,
  "y": 590.68,
  "width": 50,
  "image": {
   "levels": [
    {
     "url": "media/map_D5C2EFDB_B155_1C85_41D8_129DE828BE4B_HS_41.png",
     "width": 50,
     "height": 50,
     "class": "ImageResourceLevel"
    }
   ],
   "class": "ImageResource"
  },
  "class": "HotspotMapOverlayImage"
 },
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 1); this.setComponentVisibility(this.WebFrame_6E96CCB0_7C39_53A0_41D0_2470CE6C43BE, false, 0, null, null, false); this.setComponentVisibility(this.IconButton_6ED08C3E_7C38_D2A0_41B0_83963070F910, false, 0, null, null, false)",
   "toolTip": "\uc815\uc804\ub0a8\uc2e0\ubb38",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "id": "overlay_D5C36FDC_B155_1C83_41CD_01B9070762F2",
 "class": "AreaHotspotMapOverlay"
},
{
 "map": {
  "width": 50,
  "x": 460.11,
  "image": {
   "levels": [
    {
     "url": "media/map_D5C2EFDB_B155_1C85_41D8_129DE828BE4B_HS_40_map.gif",
     "width": 16,
     "height": 16,
     "class": "ImageResourceLevel"
    }
   ],
   "class": "ImageResource"
  },
  "offsetX": 0,
  "offsetY": 0,
  "height": 50,
  "y": 975,
  "class": "HotspotMapOverlayMap"
 },
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 460.11,
  "height": 50,
  "y": 975,
  "width": 50,
  "image": {
   "levels": [
    {
     "url": "media/map_D5C2EFDB_B155_1C85_41D8_129DE828BE4B_HS_40.png",
     "width": 50,
     "height": 50,
     "class": "ImageResourceLevel"
    }
   ],
   "class": "ImageResource"
  },
  "class": "HotspotMapOverlayImage"
 },
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 0); this.setComponentVisibility(this.WebFrame_6E96CCB0_7C39_53A0_41D0_2470CE6C43BE, false, 0, null, null, false); this.setComponentVisibility(this.IconButton_6ED08C3E_7C38_D2A0_41B0_83963070F910, false, 0, null, null, false)",
   "toolTip": "\uc678\ub300\ubb38",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "id": "overlay_D5C37FDC_B155_1C83_41E5_A81CA4465FB3",
 "class": "AreaHotspotMapOverlay"
},
{
 "map": {
  "width": 50,
  "x": 480.99,
  "image": {
   "levels": [
    {
     "url": "media/map_D5C2EFDB_B155_1C85_41D8_129DE828BE4B_HS_50_map.gif",
     "width": 16,
     "height": 16,
     "class": "ImageResourceLevel"
    }
   ],
   "class": "ImageResource"
  },
  "offsetX": 0,
  "offsetY": 0,
  "height": 50,
  "y": 605.69,
  "class": "HotspotMapOverlayMap"
 },
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 480.99,
  "height": 50,
  "y": 605.69,
  "width": 50,
  "image": {
   "levels": [
    {
     "url": "media/map_D5C2EFDB_B155_1C85_41D8_129DE828BE4B_HS_50.png",
     "width": 50,
     "height": 50,
     "class": "ImageResourceLevel"
    }
   ],
   "class": "ImageResource"
  },
  "class": "HotspotMapOverlayImage"
 },
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 7); this.setComponentVisibility(this.WebFrame_6E96CCB0_7C39_53A0_41D0_2470CE6C43BE, false, 0, null, null, false); this.setComponentVisibility(this.IconButton_6ED08C3E_7C38_D2A0_41B0_83963070F910, false, 0, null, null, false)",
   "toolTip": "\uc5b4\uc7ac\uc2e4",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "id": "overlay_D5C31FDC_B155_1C83_412B_3326D7B70610",
 "class": "AreaHotspotMapOverlay"
},
{
 "map": {
  "width": 44.7,
  "x": 452.7,
  "image": {
   "levels": [
    {
     "url": "media/map_D5C2EFDB_B155_1C85_41D8_129DE828BE4B_HS_51_map.gif",
     "width": 16,
     "height": 18,
     "class": "ImageResourceLevel"
    }
   ],
   "class": "ImageResource"
  },
  "offsetX": 0,
  "offsetY": 0,
  "height": 50,
  "y": 635.38,
  "class": "HotspotMapOverlayMap"
 },
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 452.7,
  "height": 50,
  "y": 635.38,
  "width": 44.7,
  "image": {
   "levels": [
    {
     "url": "media/map_D5C2EFDB_B155_1C85_41D8_129DE828BE4B_HS_51.png",
     "width": 44,
     "height": 50,
     "class": "ImageResourceLevel"
    }
   ],
   "class": "ImageResource"
  },
  "class": "HotspotMapOverlayImage"
 },
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.setComponentVisibility(this.WebFrame_6E96CCB0_7C39_53A0_41D0_2470CE6C43BE, false, 0, null, null, false); this.setComponentVisibility(this.IconButton_6ED08C3E_7C38_D2A0_41B0_83963070F910, false, 0, null, null, false); this.mainPlayList.set('selectedIndex', 8)",
   "toolTip": "\uc5b4\ubaa9\uc695\uccad",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "id": "overlay_D5C33FDC_B155_1C83_41E2_23879D9E6CFA",
 "class": "AreaHotspotMapOverlay"
},
{
 "map": {
  "width": 50,
  "x": 495.1,
  "image": {
   "levels": [
    {
     "url": "media/map_D5C2EFDB_B155_1C85_41D8_129DE828BE4B_HS_52_map.gif",
     "width": 16,
     "height": 16,
     "class": "ImageResourceLevel"
    }
   ],
   "class": "ImageResource"
  },
  "offsetX": 0,
  "offsetY": 0,
  "height": 50,
  "y": 650,
  "class": "HotspotMapOverlayMap"
 },
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 495.1,
  "height": 50,
  "y": 650,
  "width": 50,
  "image": {
   "levels": [
    {
     "url": "media/map_D5C2EFDB_B155_1C85_41D8_129DE828BE4B_HS_52.png",
     "width": 50,
     "height": 50,
     "class": "ImageResourceLevel"
    }
   ],
   "class": "ImageResource"
  },
  "class": "HotspotMapOverlayImage"
 },
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.setComponentVisibility(this.WebFrame_6E96CCB0_7C39_53A0_41D0_2470CE6C43BE, false, 0, null, null, false); this.setComponentVisibility(this.IconButton_6ED08C3E_7C38_D2A0_41B0_83963070F910, false, 0, null, null, false); this.mainPlayList.set('selectedIndex', 6)",
   "toolTip": "\uc138\uc790\uc7ac\uc2e4",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "id": "overlay_D5C3CFDC_B155_1C83_41B5_0C29689D3358",
 "class": "AreaHotspotMapOverlay"
},
{
 "maps": [
  {
   "yaw": 134.69,
   "hfov": 7.39,
   "image": {
    "levels": [
     {
      "url": "media/panorama_EB987E8F_B1CD_3C9D_41CA_53E02C0E1D7E_1_HS_0_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -22.59,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01b"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_8037E8B6_B1BB_048F_419F_537FF8F54FCD, this.camera_DFDB21FB_C98E_CEE2_41D0_66F866AF13F3); this.mainPlayList.set('selectedIndex', 9)",
   "toolTip": "\ud5a5\ub300\uccad(\uc2e0\uc2e4)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 7.39,
   "image": "this.AnimatedImageResource_8AA1081B_C46B_529C_41E2_8F9638C8F5F9",
   "pitch": -22.59,
   "yaw": 134.69,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_EB986E8F_B1CD_3C9D_41E0_987C088590DF",
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": 0.27,
   "hfov": 6.72,
   "image": {
    "levels": [
     {
      "url": "media/panorama_EB987E8F_B1CD_3C9D_41CA_53E02C0E1D7E_1_HS_1_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.26,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01b"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32, this.camera_DFC761DE_C98E_CF22_41E0_03B4033051A7); this.mainPlayList.set('selectedIndex', 7)",
   "toolTip": "\uc5b4\uc7ac\uc2e4",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 6.72,
   "image": "this.AnimatedImageResource_8AA1D81B_C46B_529C_41D4_9F39D392EB7B",
   "pitch": -5.26,
   "yaw": 0.27,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_EB981E8F_B1CD_3C9D_41C7_5CB0F8124451",
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": -141.58,
   "hfov": 6.29,
   "image": {
    "levels": [
     {
      "url": "media/panorama_EB987E8F_B1CD_3C9D_41CA_53E02C0E1D7E_1_HS_5_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -21.16,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01b"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BB22B334_A60C_C516_41D4_85E2A3F602F3, this.camera_DFD5E1EC_C98E_CEE6_41D7_0E6B778091E1); this.mainPlayList.set('selectedIndex', 1)",
   "toolTip": "\uc815\uc804\ub0a8\uc2e0\ubb38",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 6.29,
   "image": "this.AnimatedImageResource_8AA0781B_C46B_529C_41D1_8762BB9B2429",
   "pitch": -21.16,
   "yaw": -141.58,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_FEA6DF59_B474_7CE4_41C8_30C9D9B79D6C",
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": -42.44,
   "hfov": 6.69,
   "image": {
    "levels": [
     {
      "url": "media/panorama_EB987E8F_B1CD_3C9D_41CA_53E02C0E1D7E_1_HS_3_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.94,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01b"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_EE6E3D8C_B1BD_3C83_41E2_110C74F955A8, this.camera_DFA9F20A_C98E_CD22_41CA_FE02E8371CB2); this.mainPlayList.set('selectedIndex', 8)",
   "toolTip": "\uc5b4\ubaa9\uc695\uccad",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 6.69,
   "image": "this.AnimatedImageResource_8AA0381B_C46B_529C_41D8_84FF23B8E9FC",
   "pitch": -7.94,
   "yaw": -42.44,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_ECC3A467_B1BF_038D_41D2_70E4B688F836",
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": 41.81,
   "hfov": 6.7,
   "image": {
    "levels": [
     {
      "url": "media/panorama_EB987E8F_B1CD_3C9D_41CA_53E02C0E1D7E_1_HS_4_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.79,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01b"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_EA55570C_B1B5_0D83_419D_402AB2B70DDF, this.camera_DFBEA218_C98E_CD2E_41DE_32DCB54DCF29); this.mainPlayList.set('selectedIndex', 6)",
   "toolTip": "\uc138\uc790\uc7ac\uc2e4",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 6.7,
   "image": "this.AnimatedImageResource_8AA0D81B_C46B_529C_41B2_7059FEE4DB06",
   "pitch": -6.79,
   "yaw": 41.81,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_D9402DB6_B15B_3C8F_41E1_61F7C5DE6E81",
 "class": "HotspotPanoramaOverlay"
},
{
 "inertia": false,
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_EB987E8F_B1CD_3C9D_41CA_53E02C0E1D7E_tcap0",
 "hfov": 45,
 "image": {
  "levels": [
   {
    "url": "media/panorama_B8C3E8BA_A69E_AFB9_41C1_116805EE9981.png",
    "width": 850,
    "height": 850,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "TripodCapPanoramaOverlay"
},
{
 "playbackBarBorderColor": "#FFFFFF",
 "id": "viewer_uidDCF7D0E7_C98E_CEE2_41E7_4DD382428523",
 "toolTipOpacity": 1,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "playbackBarBorderSize": 0,
 "playbackBarBackgroundOpacity": 1,
 "width": "100%",
 "paddingLeft": 0,
 "borderSize": 0,
 "progressBackgroundOpacity": 1,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "minHeight": 50,
 "toolTipBorderSize": 1,
 "playbackBarHeadWidth": 6,
 "playbackBarHeadShadowBlurRadius": 3,
 "toolTipBorderRadius": 3,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarHeadBorderSize": 0,
 "playbackBarOpacity": 1,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBorderColor": "#000000",
 "progressRight": 0,
 "height": "100%",
 "firstTransitionDuration": 0,
 "toolTipShadowSpread": 0,
 "toolTipDisplayTime": 600,
 "minWidth": 100,
 "transitionDuration": 500,
 "toolTipFontSize": "1.11vmin",
 "progressBarBorderSize": 0,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipPaddingLeft": 6,
 "playbackBarBottom": 0,
 "vrPointerSelectionTime": 2000,
 "playbackBarProgressOpacity": 1,
 "playbackBarHeight": 10,
 "toolTipShadowOpacity": 1,
 "playbackBarHeadOpacity": 1,
 "playbackBarHeadShadowColor": "#000000",
 "progressLeft": 0,
 "toolTipFontStyle": "normal",
 "playbackBarHeadBorderRadius": 0,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "shadow": false,
 "progressBarBorderColor": "#000000",
 "toolTipShadowVerticalLength": 0,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "progressHeight": 10,
 "class": "ViewerArea",
 "progressBorderRadius": 0,
 "toolTipShadowBlurRadius": 3,
 "transitionMode": "blending",
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipFontFamily": "Arial",
 "toolTipFontWeight": "normal",
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadShadowHorizontalLength": 0,
 "paddingRight": 0,
 "progressBottom": 2,
 "toolTipPaddingRight": 6,
 "propagateClick": false,
 "playbackBarRight": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "playbackBarLeft": 0,
 "toolTipTextShadowColor": "#000000",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarBorderRadius": 0,
 "progressBorderColor": "#000000",
 "progressOpacity": 1,
 "paddingTop": 0,
 "borderRadius": 0,
 "toolTipPaddingBottom": 4,
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarHeadShadow": true,
 "progressBackgroundColorDirection": "vertical",
 "playbackBarBackgroundColorDirection": "vertical",
 "progressBarBorderRadius": 0,
 "progressBorderSize": 0,
 "paddingBottom": 0,
 "toolTipTextShadowOpacity": 0,
 "toolTipBorderColor": "#767676",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipFontColor": "#606060",
 "displayTooltipInTouchScreens": true,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "progressBarOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "vrPointerColor": "#FFFFFF",
 "toolTipShadowColor": "#333333",
 "playbackBarProgressBorderRadius": 0,
 "toolTipPaddingTop": 4,
 "playbackBarProgressBorderSize": 0,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "data": {
  "name": "ViewerArea4615"
 },
 "toolTipTextShadowBlurRadius": 3
},
{
 "position": {
  "yaw": 1.75,
  "hfov": 135,
  "pitch": 4.46,
  "class": "PanoramaCameraPosition"
 },
 "id": "snapshot_6D9B38D9_7CF9_E7D1_41C0_E1886B58AFFD",
 "class": "PanoramaSnapshot"
},
{
 "maps": [
  {
   "yaw": -0.78,
   "hfov": 8.62,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BB22B334_A60C_C516_41D4_85E2A3F602F3_1_HS_19_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -23.15,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01b"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BB3EA0D4_A6BA_FFC9_41B5_378AA4C71E29, this.camera_DCB82117_C98E_CF22_41E7_84DE904D24BB); this.mainPlayList.set('selectedIndex', 2)",
   "toolTip": "\uc815\uc804",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 8.62,
   "image": "this.AnimatedImageResource_8B49A80E_C46B_5274_41B1_87EA01564B5A",
   "pitch": -23.15,
   "yaw": -0.78,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_BB22F334_A60C_C516_41BE_A69AFA655A35",
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": 179.9,
   "hfov": 4.92,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BB22B334_A60C_C516_41D4_85E2A3F602F3_1_HS_20_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.27,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01b"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_B8C238BA_A69E_AFB9_41DB_A6464F54721E, this.camera_DCB7610E_C98E_CF22_41DA_F66D85DB3096); this.mainPlayList.set('selectedIndex', 0)",
   "toolTip": "\uc678\ub300\ubb38",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 4.92,
   "image": "this.AnimatedImageResource_8B48680E_C46B_5274_41D6_7ADDC4933554",
   "pitch": -10.27,
   "yaw": 179.9,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_BB22E334_A60C_C516_41D8_467C839BAAD6",
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": -0.16,
   "hfov": 11.51,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BB22B334_A60C_C516_41D4_85E2A3F602F3_1_HS_18_0_0_map.gif",
      "width": 35,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 33.15,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "typo_namsinmun"
 },
 "enabledInCardboard": true,
 "useHandCursor": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 11.51,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BB22B334_A60C_C516_41D4_85E2A3F602F3_1_HS_18_0.png",
      "width": 293,
      "height": 133,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 33.15,
   "yaw": -0.16,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_BB22D334_A60C_C516_41B6_2D2BD660621F",
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": 111.64,
   "hfov": 7.97,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BB22B334_A60C_C516_41D4_85E2A3F602F3_1_HS_21_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.12,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01b"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_EB987E8F_B1CD_3C9D_41CA_53E02C0E1D7E, this.camera_DC64E13C_C98E_CF66_41D2_2BDB1180BF1A); this.setMediaBehaviour(this.playList_DCF720E6_C98E_CEE2_41E9_1AD2BF13FC43, 0, this.panorama_BB22B334_A60C_C516_41D4_85E2A3F602F3)",
   "toolTip": "\uc7ac\uad81",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 7.97,
   "image": "this.AnimatedImageResource_8B48E80E_C46B_5274_41D7_D86FC172D120",
   "pitch": -10.12,
   "yaw": 111.64,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_FD59FEE4_B1DD_1C83_41C3_6B5B376C8B26",
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": -96.41,
   "hfov": 8.05,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BB22B334_A60C_C516_41D4_85E2A3F602F3_1_HS_22_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.24,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01b"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_F70332DE_B1CD_04BF_41E0_52AD5D23EC3B, this.camera_DC96A12A_C98E_CF62_41E7_4F884CEE0104); this.mainPlayList.set('selectedIndex', 5)",
   "toolTip": "\uc601\ub155\uc804",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 8.05,
   "image": "this.AnimatedImageResource_8B4B780E_C46B_5274_41C7_9F7677C0DE81",
   "pitch": -6.24,
   "yaw": -96.41,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_E3DEFE60_B1DF_3F83_41DF_6B1FFFEFA154",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabled": false,
 "maps": [
  {
   "yaw": -21.92,
   "hfov": 6.73,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BB22B334_A60C_C516_41D4_85E2A3F602F3_1_HS_23_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -4.66,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01b"
 },
 "enabledInCardboard": true,
 "useHandCursor": false,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_B149B9F0_A69E_A1C9_41A3_7D34CCC4C924, this.camera_DC8D1120_C98E_CF1E_41E7_F60CDA5FB97A); this.mainPlayList.set('selectedIndex', 4)",
   "toolTip": "\uce60\uc0ac\ub2f9\u000a",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 6.73,
   "image": "this.AnimatedImageResource_8B4B180E_C46B_5274_41BE_128556D0487C",
   "pitch": -4.66,
   "yaw": -21.92,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_C442CAC7_B14D_048D_41C9_425669EF6480",
 "class": "HotspotPanoramaOverlay"
},
{
 "inertia": false,
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_BB22B334_A60C_C516_41D4_85E2A3F602F3_tcap0",
 "hfov": 45,
 "image": {
  "levels": [
   {
    "url": "media/panorama_B8C3E8BA_A69E_AFB9_41C1_116805EE9981.png",
    "width": 850,
    "height": 850,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "TripodCapPanoramaOverlay"
},
{
 "position": {
  "yaw": 0.04,
  "hfov": 135,
  "pitch": 2.88,
  "class": "PanoramaCameraPosition"
 },
 "id": "snapshot_734046C5_7CF9_EA31_41D9_F38EDF99B5EE",
 "class": "PanoramaSnapshot"
},
{
 "maps": [
  {
   "yaw": -147.57,
   "hfov": 6.75,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B149B9F0_A69E_A1C9_41A3_7D34CCC4C924_1_HS_13_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -1.68,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01b"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BB3EA0D4_A6BA_FFC9_41B5_378AA4C71E29, this.camera_DEB1C2B4_C98E_CD66_41BD_0D24CE675557); this.mainPlayList.set('selectedIndex', 2)",
   "toolTip": "\uc815\uc804",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 6.75,
   "image": "this.AnimatedImageResource_8B4EC813_C46B_526C_41D4_8D5376B0CBA1",
   "pitch": -1.68,
   "yaw": -147.57,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_B14999F0_A69E_A1C9_41B0_86B3ABC9D1C9",
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": -2.28,
   "hfov": 10.8,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B149B9F0_A69E_A1C9_41A3_7D34CCC4C924_1_HS_12_0_0_map.gif",
      "width": 32,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.65,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "typo\u00ad_7sadang_zoom"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 10.8,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B149B9F0_A69E_A1C9_41A3_7D34CCC4C924_1_HS_12_0.png",
      "width": 230,
      "height": 115,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.65,
   "yaw": -2.28,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_B149D9F0_A69E_A1C9_41D5_1E924557F89A",
 "class": "HotspotPanoramaOverlay"
},
{
 "bleaching": 0.5,
 "yaw": -76.66,
 "pitch": 38.47,
 "bleachingDistance": 0.3,
 "id": "overlay_B149C9F0_A69E_A1C9_41D2_7931BB59EF2D",
 "class": "LensFlarePanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": -81.59,
   "hfov": 5.76,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B149B9F0_A69E_A1C9_41A3_7D34CCC4C924_1_HS_15_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.89,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01b"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BB22B334_A60C_C516_41D4_85E2A3F602F3, this.camera_DECDA299_C98E_CD2E_41C5_9DE0B75D1F39); this.mainPlayList.set('selectedIndex', 1)",
   "toolTip": "\uc815\uc804\ub0a8\uc2e0\ubb38",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 5.76,
   "image": "this.AnimatedImageResource_8B514813_C46B_526C_41DB_CDAEBE66CC1E",
   "pitch": -3.89,
   "yaw": -81.59,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_C31879C2_B17D_0487_41E1_4EFF621804F9",
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": -90.11,
   "hfov": 4.4,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B149B9F0_A69E_A1C9_41A3_7D34CCC4C924_1_HS_16_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.4,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01b"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_B111BE24_A69F_6249_41D8_210A06A45A13, this.camera_DED272A2_C98E_CD62_41A4_7A5E11739271); this.mainPlayList.set('selectedIndex', 3)",
   "toolTip": "\uacf5\uc2e0\ub2f9",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 4.4,
   "image": "this.AnimatedImageResource_8B51F813_C46B_526C_41E3_8E3E2CA71B3C",
   "pitch": -0.4,
   "yaw": -90.11,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_C4AD109E_B17B_04BF_41DD_2E994770FDD1",
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": 154.04,
   "hfov": 6.74,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B149B9F0_A69E_A1C9_41A3_7D34CCC4C924_1_HS_17_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.3,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01b"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_F70332DE_B1CD_04BF_41E0_52AD5D23EC3B, this.camera_DEA322AB_C98E_CD62_41E7_ECC6B1A5A89F); this.mainPlayList.set('selectedIndex', 5)",
   "toolTip": "\uc601\ub155\uc804",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 6.74,
   "image": "this.AnimatedImageResource_8B518814_C46B_5294_41D0_A893F439C313",
   "pitch": -2.3,
   "yaw": 154.04,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_C55BF74A_B17F_0D87_41E2_96F27AF1D116",
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": 5.97,
   "hfov": 4.69,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B149B9F0_A69E_A1C9_41A3_7D34CCC4C924_1_HS_19_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.52,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showPopupPanoramaOverlay(this.popup_C605487E_C964_402D_41D7_484721F958AE, {'paddingTop':0,'rollOverIconWidth':20,'pressedIconWidth':20,'rollOverIconHeight':20,'backgroundColorDirection':'vertical','pressedBorderSize':0,'pressedIconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedBackgroundOpacity':0,'pressedBorderColor':'#000000','pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'paddingRight':15,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBorderSize':0,'iconLineWidth':5,'iconColor':'#FFFFFF','rollOverIconLineWidth':5,'backgroundOpacity':0,'backgroundColorRatios':[0,0.09803921568627451,1],'iconHeight':20,'rollOverIconColor':'#6699CC','paddingBottom':0,'pressedIconLineWidth':5,'paddingLeft':0,'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderSize':0,'pressedIconColor':'#6699CC','iconWidth':20,'borderColor':'#000000','rollOverBackgroundOpacity':0,'pressedBackgroundColorDirection':'vertical','rollOverBorderColor':'#000000','backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_DDCD8200_C97D_C3D5_41DD_65096295A243, null, null, null, this.audio_D377640D_C477_F274_41DD_D087C037EFA5, false)"
  }
 ],
 "items": [
  {
   "hfov": 4.69,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B149B9F0_A69E_A1C9_41A3_7D34CCC4C924_1_HS_19_0.png",
      "width": 100,
      "height": 100,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.52,
   "yaw": 5.97,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_FE0CE844_B48C_E4EC_41E1_07F6D373C171",
 "class": "HotspotPanoramaOverlay"
},
{
 "inertia": false,
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_B149B9F0_A69E_A1C9_41A3_7D34CCC4C924_tcap0",
 "hfov": 45,
 "image": {
  "levels": [
   {
    "url": "media/panorama_B8C3E8BA_A69E_AFB9_41C1_116805EE9981.png",
    "width": 850,
    "height": 850,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "TripodCapPanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": 134.37,
   "hfov": 6.66,
   "image": {
    "levels": [
     {
      "url": "media/panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32_1_HS_0_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.55,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01b"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_EA55570C_B1B5_0D83_419D_402AB2B70DDF, this.camera_DF1EE27D_C98E_CDE6_41CE_29C5FE5E4890); this.mainPlayList.set('selectedIndex', 6)",
   "toolTip": "\uc138\uc790\uc7ac\uc2e4",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 6.66,
   "image": "this.AnimatedImageResource_8B557816_C46B_5294_41E3_5346411866D0",
   "pitch": -9.55,
   "yaw": 134.37,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_D16B3838_B1B7_0383_41D2_1D26D22226D2",
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": 179.63,
   "hfov": 6.64,
   "image": {
    "levels": [
     {
      "url": "media/panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32_1_HS_1_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.56,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01b"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_EB987E8F_B1CD_3C9D_41CA_53E02C0E1D7E, this.camera_DEFC9290_C98E_CD3E_41E3_44D239FDC907); this.setMediaBehaviour(this.playList_DCF720E6_C98E_CEE2_41E9_1AD2BF13FC43, 0, this.panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32)",
   "toolTip": "\uc7ac\uad81",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 6.64,
   "image": "this.AnimatedImageResource_8B553816_C46B_5294_41E7_F9C80A06C92C",
   "pitch": -10.56,
   "yaw": 179.63,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_ECB95C5F_B1B7_03BD_41D9_2EB6E58F9F58",
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": -135.67,
   "hfov": 6.6,
   "image": {
    "levels": [
     {
      "url": "media/panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32_1_HS_2_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -12.11,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01b"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_EE6E3D8C_B1BD_3C83_41E2_110C74F955A8, this.camera_DEEFC287_C98E_CD22_41D5_D214EFB97AB8); this.mainPlayList.set('selectedIndex', 8)",
   "toolTip": "\uc5b4\ubaa9\uc695\uccad",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 6.6,
   "image": "this.AnimatedImageResource_8B55D816_C46B_5294_41D7_57D74A3F9C2D",
   "pitch": -12.11,
   "yaw": -135.67,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_EC78173B_B1B5_0D85_41DA_D9579B31EE9B",
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": -0.43,
   "hfov": 11.22,
   "image": {
    "levels": [
     {
      "url": "media/panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32_1_HS_3_0_0_map.gif",
      "width": 30,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -16.73,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "typo\u00ad_7sadang_zoom"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 11.22,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32_1_HS_3_0.png",
      "width": 249,
      "height": 129,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -16.73,
   "yaw": -0.43,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_AF9D388F_B4F4_247C_41C3_4FBDE3A4B1F9",
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": 7.86,
   "hfov": 4.48,
   "image": {
    "levels": [
     {
      "url": "media/panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32_1_HS_4_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -16.97,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showPopupPanoramaOverlay(this.popup_C6C3C4AE_C96B_C02D_41E2_9F1C65858DE3, {'paddingTop':0,'rollOverIconWidth':20,'pressedIconWidth':20,'rollOverIconHeight':20,'backgroundColorDirection':'vertical','pressedBorderSize':0,'pressedIconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedBackgroundOpacity':0,'pressedBorderColor':'#000000','pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'paddingRight':15,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBorderSize':0,'iconLineWidth':5,'iconColor':'#FFFFFF','rollOverIconLineWidth':5,'backgroundOpacity':0,'backgroundColorRatios':[0,0.09803921568627451,1],'iconHeight':20,'rollOverIconColor':'#6699CC','paddingBottom':0,'pressedIconLineWidth':5,'paddingLeft':0,'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderSize':0,'pressedIconColor':'#6699CC','iconWidth':20,'borderColor':'#000000','rollOverBackgroundOpacity':0,'pressedBackgroundColorDirection':'vertical','rollOverBorderColor':'#000000','backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_DDB26204_C97D_C3DD_41E5_65DFC67CE814, null, null, null, this.audio_D377640D_C477_F274_41DD_D087C037EFA5, false)"
  }
 ],
 "items": [
  {
   "hfov": 4.48,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32_1_HS_4_0.png",
      "width": 100,
      "height": 100,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -16.97,
   "yaw": 7.86,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_AFB672BE_B4F4_259C_41DB_D165EB81B612",
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": 17.41,
   "hfov": 35.08,
   "image": {
    "levels": [
     {
      "url": "media/panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32_1_HS_9_1_0_map.gif",
      "width": 199,
      "height": 134,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.35,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "Polygon"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.setOverlayBehaviour(this.overlay_AAC55361_B48C_64A4_41E3_EAD6663DA941, this.panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32, 'triggerClick', true)"
  }
 ],
 "items": [
  {
   "hfov": 35.08,
   "roll": 0,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32_1_HS_9_0.png",
      "width": 772,
      "height": 519,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.35,
   "yaw": 17.41,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_878CD5A8_B48C_2FA4_41D6_363644666152",
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": 17.96,
   "hfov": 7.01,
   "image": {
    "levels": [
     {
      "url": "media/panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32_1_HS_6_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 4.03,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image0"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showPopupPanoramaOverlay(this.popup_AB47D89A_B48D_E464_41D3_3474E77D4FEC, {'paddingTop':15,'rollOverIconWidth':20,'pressedIconWidth':20,'rollOverIconHeight':20,'backgroundColorDirection':'vertical','pressedBorderSize':0,'pressedIconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedBackgroundOpacity':0,'pressedBorderColor':'#000000','pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'paddingRight':15,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBorderSize':0,'iconLineWidth':5,'iconColor':'#FFFFFF','rollOverIconLineWidth':5,'backgroundOpacity':0,'backgroundColorRatios':[0,0.09803921568627451,1],'iconHeight':20,'rollOverIconColor':'#6699CC','paddingBottom':0,'pressedIconLineWidth':5,'paddingLeft':0,'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderSize':0,'pressedIconColor':'#6699CC','iconWidth':20,'borderColor':'#000000','rollOverBackgroundOpacity':0,'pressedBackgroundColorDirection':'vertical','rollOverBorderColor':'#000000','backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_87D9C34C_B494_E4FC_41D2_C51234972271, null, null, null, this.audio_D377640D_C477_F274_41DD_D087C037EFA5, false)"
  }
 ],
 "items": [
  {
   "hfov": 7.01,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32_1_HS_6_0.png",
      "width": 149,
      "height": 149,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 4.03,
   "yaw": 17.96,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_AAC55361_B48C_64A4_41E3_EAD6663DA941",
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": -92.8,
   "hfov": 12.65,
   "image": {
    "levels": [
     {
      "url": "media/panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32_1_HS_7_1_0_map.gif",
      "width": 135,
      "height": 94,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.22,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "Polygon"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.setOverlayBehaviour(this.overlay_9185DA01_B4B4_2464_41D7_4756D2EE4A30, this.panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32, 'triggerClick', true)"
  }
 ],
 "items": [
  {
   "hfov": 12.65,
   "roll": 0,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32_1_HS_7_0.png",
      "width": 271,
      "height": 189,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.22,
   "yaw": -92.8,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_91BC1358_B48C_64E4_41C0_1763EECEF06C",
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": -91.3,
   "hfov": 6.95,
   "image": {
    "levels": [
     {
      "url": "media/panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32_1_HS_8_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.81,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image1"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showPopupPanoramaOverlay(this.popup_EF9DA0E7_C4E8_D3B4_41C6_1C5C75C217EF, {'paddingTop':15,'rollOverIconWidth':20,'pressedIconWidth':20,'rollOverIconHeight':20,'backgroundColorDirection':'vertical','pressedBorderSize':0,'pressedIconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedBackgroundOpacity':0,'pressedBorderColor':'#000000','pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'paddingRight':15,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBorderSize':0,'iconLineWidth':5,'iconColor':'#FFFFFF','rollOverIconLineWidth':5,'backgroundOpacity':0,'backgroundColorRatios':[0,0.09803921568627451,1],'iconHeight':20,'rollOverIconColor':'#6699CC','paddingBottom':0,'pressedIconLineWidth':5,'paddingLeft':0,'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderSize':0,'pressedIconColor':'#6699CC','iconWidth':20,'borderColor':'#000000','rollOverBackgroundOpacity':0,'pressedBackgroundColorDirection':'vertical','rollOverBorderColor':'#000000','backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_EDB90FE6_C4EB_6DB4_41E1_2C567E3751DF, null, null, null, this.audio_D377640D_C477_F274_41DD_D087C037EFA5, false)"
  }
 ],
 "items": [
  {
   "hfov": 6.95,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32_1_HS_8_0.png",
      "width": 149,
      "height": 149,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.81,
   "yaw": -91.3,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_9185DA01_B4B4_2464_41D7_4756D2EE4A30",
 "class": "HotspotPanoramaOverlay"
},
{
 "inertia": false,
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32_tcap0",
 "hfov": 45,
 "image": {
  "levels": [
   {
    "url": "media/panorama_B8C3E8BA_A69E_AFB9_41C1_116805EE9981.png",
    "width": 850,
    "height": 850,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "TripodCapPanoramaOverlay"
},
{
 "position": {
  "yaw": 7.67,
  "hfov": 135,
  "pitch": -3,
  "class": "PanoramaCameraPosition"
 },
 "id": "snapshot_6D6D5754_7CF9_EAD7_41C4_4EB61BE9FDDC",
 "class": "PanoramaSnapshot"
},
{
 "maps": [
  {
   "yaw": 151.31,
   "hfov": 9.37,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B111BE24_A69F_6249_41D8_210A06A45A13_1_HS_13_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.87,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01b"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BB3EA0D4_A6BA_FFC9_41B5_378AA4C71E29, this.camera_DF62F234_C98E_CD66_41D9_A4C1250889F5); this.mainPlayList.set('selectedIndex', 2)",
   "toolTip": "\uc815\uc804",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 9.37,
   "image": "this.AnimatedImageResource_8B4F7812_C46B_526C_41DD_B87C9EC9D802",
   "pitch": -0.87,
   "yaw": 151.31,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_B111EE24_A69F_6249_41C3_2D9200117003",
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": 6.94,
   "hfov": 11.51,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B111BE24_A69F_6249_41D8_210A06A45A13_1_HS_14_0_0_map.gif",
      "width": 37,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 6.74,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "typo_gongsindang_zoom"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "items": [
  {
   "hfov": 11.51,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B111BE24_A69F_6249_41D8_210A06A45A13_1_HS_14_0.png",
      "width": 247,
      "height": 106,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 6.74,
   "yaw": 6.94,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_B1111E24_A69F_6249_41E1_DB07FE0724C4",
 "class": "HotspotPanoramaOverlay"
},
{
 "bleaching": 0.5,
 "yaw": -74.21,
 "pitch": 58.74,
 "bleachingDistance": 0.3,
 "id": "overlay_B1112E24_A69F_6249_41C1_D0AB4545E94A",
 "class": "LensFlarePanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": 122.89,
   "hfov": 5.77,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B111BE24_A69F_6249_41D8_210A06A45A13_1_HS_15_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.37,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01b"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_F70332DE_B1CD_04BF_41E0_52AD5D23EC3B, this.camera_DF9DF22B_C98E_CD62_41E0_2F2BDBBDB41B); this.mainPlayList.set('selectedIndex', 5)",
   "toolTip": "\uc601\ub155\uc804",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 5.77,
   "image": "this.AnimatedImageResource_8B4FF813_C46B_526C_41A2_AAB8EA7DA350",
   "pitch": 0.37,
   "yaw": 122.89,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_DE13E831_B17B_0385_41E1_3D6375972574",
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": 98.75,
   "hfov": 5.62,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B111BE24_A69F_6249_41D8_210A06A45A13_1_HS_16_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.95,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01b"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_B149B9F0_A69E_A1C9_41A3_7D34CCC4C924, this.camera_DF8F9221_C98E_CD61_41E4_AA7951757C33); this.mainPlayList.set('selectedIndex', 4)",
   "toolTip": "\uce60\uc0ac\ub2f9",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 5.62,
   "image": "this.AnimatedImageResource_8B4F8813_C46B_526C_41BD_C979CAFF888E",
   "pitch": 0.95,
   "yaw": 98.75,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_DE104C99_B175_3C85_41B4_09395978F97F",
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": 15.42,
   "hfov": 4.66,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B111BE24_A69F_6249_41D8_210A06A45A13_1_HS_17_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 6.71,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showPopupPanoramaOverlay(this.popup_C64A66C7_C964_405B_41B0_A24020C9ADE2, {'paddingTop':0,'rollOverIconWidth':20,'pressedIconWidth':20,'rollOverIconHeight':20,'backgroundColorDirection':'vertical','pressedBorderSize':0,'pressedIconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedBackgroundOpacity':0,'pressedBorderColor':'#000000','pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'paddingRight':15,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBorderSize':0,'iconLineWidth':5,'iconColor':'#FFFFFF','rollOverIconLineWidth':5,'backgroundOpacity':0,'backgroundColorRatios':[0,0.09803921568627451,1],'iconHeight':20,'rollOverIconColor':'#6699CC','paddingBottom':0,'pressedIconLineWidth':5,'paddingLeft':0,'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderSize':0,'pressedIconColor':'#6699CC','iconWidth':20,'borderColor':'#000000','rollOverBackgroundOpacity':0,'pressedBackgroundColorDirection':'vertical','rollOverBorderColor':'#000000','backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_DDCD41FF_C97D_C02B_41D8_CD4C36DDD9DB, null, null, null, this.audio_D377640D_C477_F274_41DD_D087C037EFA5, false)"
  }
 ],
 "items": [
  {
   "hfov": 4.66,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B111BE24_A69F_6249_41D8_210A06A45A13_1_HS_17_0.png",
      "width": 99,
      "height": 99,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 6.71,
   "yaw": 15.42,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_83AD06AD_B477_EDBC_4193_868AD8B017D4",
 "class": "HotspotPanoramaOverlay"
},
{
 "inertia": false,
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_B111BE24_A69F_6249_41D8_210A06A45A13_tcap0",
 "hfov": 45,
 "image": {
  "levels": [
   {
    "url": "media/panorama_B8C3E8BA_A69E_AFB9_41C1_116805EE9981.png",
    "width": 850,
    "height": 850,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "TripodCapPanoramaOverlay"
},
{
 "displayPlaybackBar": true,
 "id": "viewer_uidDCF7D0E7_C98E_CEE2_41E7_4DD382428523VideoPlayer",
 "viewerArea": "this.viewer_uidDCF7D0E7_C98E_CEE2_41E7_4DD382428523",
 "class": "VideoPlayer"
},
{
 "maps": [
  {
   "yaw": 1.33,
   "hfov": 8.84,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B8C238BA_A69E_AFB9_41DB_A6464F54721E_1_HS_31_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -19.5,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01b"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BB22B334_A60C_C516_41D4_85E2A3F602F3, this.camera_DCA2D105_C98E_CF26_41C4_99BF4985CD83); this.mainPlayList.set('selectedIndex', 1)",
   "toolTip": "\uc815\uc804\ub0a8\uc2e0\ubb38",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 8.84,
   "image": "this.AnimatedImageResource_8B46B80D_C46B_5274_41CE_9FB1AEA4EFF4",
   "pitch": -19.5,
   "yaw": 1.33,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_B8C218BA_A69E_AFB9_41D0_B743A9DC9EFE",
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": 0.48,
   "hfov": 10.89,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B8C238BA_A69E_AFB9_41DB_A6464F54721E_1_HS_33_0_0_map.gif",
      "width": 40,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 29.37,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "typo_oedaemun"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 10.89,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B8C238BA_A69E_AFB9_41DB_A6464F54721E_1_HS_33_0.png",
      "width": 266,
      "height": 106,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 29.37,
   "yaw": 0.48,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_B8C208BA_A69E_AFB9_41DA_3049694A1CD1",
 "class": "HotspotPanoramaOverlay"
},
{
 "inertia": false,
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_B8C3E8BA_A69E_AFB9_41C1_116805EE9981",
 "hfov": 45,
 "image": {
  "levels": [
   {
    "url": "media/panorama_B8C3E8BA_A69E_AFB9_41C1_116805EE9981.png",
    "width": 850,
    "height": 850,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "TripodCapPanoramaOverlay"
},
{
 "bleaching": 0.7,
 "yaw": -180,
 "pitch": 39.86,
 "bleachingDistance": 0.3,
 "id": "overlay_B8C3D8BA_A69E_AFB9_41D5_7410D6AC66CA",
 "class": "LensFlarePanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": 177.69,
   "hfov": 6.69,
   "image": {
    "levels": [
     {
      "url": "media/panorama_EA55570C_B1B5_0D83_419D_402AB2B70DDF_1_HS_0_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.51,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01b"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_EE6E3D8C_B1BD_3C83_41E2_110C74F955A8, this.camera_DF403246_C98E_CD22_41DD_085C51D387C8); this.mainPlayList.set('selectedIndex', 8)",
   "toolTip": "\uc5b4\ubaa9\uc695\uccad",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 6.69,
   "image": "this.AnimatedImageResource_8B523815_C46B_5294_41E6_FFEFB152F6F2",
   "pitch": -7.51,
   "yaw": 177.69,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_D0FED3AE_B14B_049F_4185_50B35249158C",
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": 149.95,
   "hfov": 6.67,
   "image": {
    "levels": [
     {
      "url": "media/panorama_EA55570C_B1B5_0D83_419D_402AB2B70DDF_1_HS_1_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.61,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01b"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_EB987E8F_B1CD_3C9D_41CA_53E02C0E1D7E, this.camera_DF56D250_C98E_CD3E_41D0_2496E455B40C); this.setMediaBehaviour(this.playList_DCF720E6_C98E_CEE2_41E9_1AD2BF13FC43, 0, this.panorama_EA55570C_B1B5_0D83_419D_402AB2B70DDF)",
   "toolTip": "\uc7ac\uad81",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 6.67,
   "image": "this.AnimatedImageResource_8B52D815_C46B_5294_41C0_F3B814E3FE51",
   "pitch": -8.61,
   "yaw": 149.95,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_ED7B23B0_B14D_0483_41D1_797F73B8588F",
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": -155.97,
   "hfov": 6.67,
   "image": {
    "levels": [
     {
      "url": "media/panorama_EA55570C_B1B5_0D83_419D_402AB2B70DDF_1_HS_2_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.65,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01b"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32, this.camera_DF73323D_C98E_CD66_41E5_A61EC36F942E); this.mainPlayList.set('selectedIndex', 7)",
   "toolTip": "\uc5b4\uc7ac\uc2e4",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 6.67,
   "image": "this.AnimatedImageResource_8B552815_C46B_5294_41D9_DEF2CCAD2360",
   "pitch": -8.65,
   "yaw": -155.97,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_D0D0262F_B14F_0F9D_41CA_7D59D21F29CB",
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": -4.66,
   "hfov": 11.99,
   "image": {
    "levels": [
     {
      "url": "media/panorama_EA55570C_B1B5_0D83_419D_402AB2B70DDF_1_HS_3_0_0_map.gif",
      "width": 29,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -23.98,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "typo\u00ad_7sadang_zoom"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 11.99,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_EA55570C_B1B5_0D83_419D_402AB2B70DDF_1_HS_3_0.png",
      "width": 279,
      "height": 149,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -23.98,
   "yaw": -4.66,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_AE559480_B4F4_2C64_41D0_1DE74043F647",
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": -2.11,
   "hfov": 47.84,
   "image": {
    "levels": [
     {
      "url": "media/panorama_EA55570C_B1B5_0D83_419D_402AB2B70DDF_1_HS_7_1_0_map.gif",
      "width": 200,
      "height": 140,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.07,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "Polygon"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.setOverlayBehaviour(this.overlay_AB1DD549_B494_6CE4_41D0_1997A73448FB, this.panorama_EA55570C_B1B5_0D83_419D_402AB2B70DDF, 'triggerClick', true)"
  }
 ],
 "items": [
  {
   "hfov": 47.84,
   "roll": 0,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_EA55570C_B1B5_0D83_419D_402AB2B70DDF_1_HS_7_0.png",
      "width": 1084,
      "height": 764,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.07,
   "yaw": -2.11,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_826DAFB8_B48C_3BA4_41D2_373EAEF0A9AD",
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": 4.84,
   "hfov": 4.28,
   "image": {
    "levels": [
     {
      "url": "media/panorama_EA55570C_B1B5_0D83_419D_402AB2B70DDF_1_HS_4_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -24.06,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showPopupPanoramaOverlay(this.popup_C6E70596_C964_C0FD_41BB_5121ABEF7C5B, {'paddingTop':0,'rollOverIconWidth':20,'pressedIconWidth':20,'rollOverIconHeight':20,'backgroundColorDirection':'vertical','pressedBorderSize':0,'pressedIconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedBackgroundOpacity':0,'pressedBorderColor':'#000000','pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'paddingRight':15,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBorderSize':0,'iconLineWidth':5,'iconColor':'#FFFFFF','rollOverIconLineWidth':5,'backgroundOpacity':0,'backgroundColorRatios':[0,0.09803921568627451,1],'iconHeight':20,'rollOverIconColor':'#666666','paddingBottom':0,'pressedIconLineWidth':5,'paddingLeft':0,'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderSize':0,'pressedIconColor':'#888888','iconWidth':20,'borderColor':'#000000','rollOverBackgroundOpacity':0,'pressedBackgroundColorDirection':'vertical','rollOverBorderColor':'#000000','backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_DDB14202_C97D_C3D5_41DE_7698605BC02D, null, null, null, this.audio_D377640D_C477_F274_41DD_D087C037EFA5, false)"
  }
 ],
 "items": [
  {
   "hfov": 4.28,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_EA55570C_B1B5_0D83_419D_402AB2B70DDF_1_HS_4_0.png",
      "width": 100,
      "height": 100,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -24.06,
   "yaw": 4.84,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_AB0138B5_B494_25AC_41E3_D87D7280A06D",
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": 1.08,
   "hfov": 7.03,
   "image": {
    "levels": [
     {
      "url": "media/panorama_EA55570C_B1B5_0D83_419D_402AB2B70DDF_1_HS_6_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.39,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image0"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showPopupPanoramaOverlay(this.popup_95C1E5D2_B494_2FE4_41E4_0F8AEF9DBE5F, {'paddingTop':15,'rollOverIconWidth':20,'pressedIconWidth':20,'rollOverIconHeight':20,'backgroundColorDirection':'vertical','pressedBorderSize':0,'pressedIconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedBackgroundOpacity':0,'pressedBorderColor':'#000000','pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'paddingRight':15,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBorderSize':0,'iconLineWidth':5,'iconColor':'#FFFFFF','rollOverIconLineWidth':5,'backgroundOpacity':0,'backgroundColorRatios':[0,0.09803921568627451,1],'iconHeight':20,'rollOverIconColor':'#6699CC','paddingBottom':0,'pressedIconLineWidth':5,'paddingLeft':0,'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderSize':0,'pressedIconColor':'#6699CC','iconWidth':20,'borderColor':'#000000','rollOverBackgroundOpacity':0,'pressedBackgroundColorDirection':'vertical','rollOverBorderColor':'#000000','backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_87A5D34E_B494_E4FC_41B8_7EAE84B52A6D, null, null, null, this.audio_D377640D_C477_F274_41DD_D087C037EFA5, false)"
  }
 ],
 "items": [
  {
   "hfov": 7.03,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_EA55570C_B1B5_0D83_419D_402AB2B70DDF_1_HS_6_0.png",
      "width": 149,
      "height": 149,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.39,
   "yaw": 1.08,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_AB1DD549_B494_6CE4_41D0_1997A73448FB",
 "class": "HotspotPanoramaOverlay"
},
{
 "inertia": false,
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_EA55570C_B1B5_0D83_419D_402AB2B70DDF_tcap0",
 "hfov": 45,
 "image": {
  "levels": [
   {
    "url": "media/panorama_B8C3E8BA_A69E_AFB9_41C1_116805EE9981.png",
    "width": 850,
    "height": 850,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "TripodCapPanoramaOverlay"
},
{
 "class": "PanoramaPlayListItem",
 "media": "this.panorama_B8C238BA_A69E_AFB9_41DB_A6464F54721E",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_DCF3F0E9_C98E_CEEE_41DB_211B25877F9C, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 0, 1)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_DCF3F0E9_C98E_CEEE_41DB_211B25877F9C",
 "camera": "this.panorama_B8C238BA_A69E_AFB9_41DB_A6464F54721E_camera"
},
{
 "class": "PanoramaPlayListItem",
 "media": "this.panorama_BB22B334_A60C_C516_41D4_85E2A3F602F3",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_DCF270E9_C98E_CEEE_41E6_CD78C345841E, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 1, 2)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_DCF270E9_C98E_CEEE_41E6_CD78C345841E",
 "camera": "this.panorama_BB22B334_A60C_C516_41D4_85E2A3F602F3_camera"
},
{
 "class": "PanoramaPlayListItem",
 "media": "this.panorama_BB3EA0D4_A6BA_FFC9_41B5_378AA4C71E29",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_DCF2F0E9_C98E_CEEE_41C9_5BCA17FA4821, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 2, 3)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_DCF2F0E9_C98E_CEEE_41C9_5BCA17FA4821",
 "camera": "this.panorama_BB3EA0D4_A6BA_FFC9_41B5_378AA4C71E29_camera"
},
{
 "class": "PanoramaPlayListItem",
 "media": "this.panorama_B111BE24_A69F_6249_41D8_210A06A45A13",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_DCFD60EA_C98E_CEE2_41E4_8CC3C082A615, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 3, 4)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_DCFD60EA_C98E_CEE2_41E4_8CC3C082A615",
 "camera": "this.panorama_B111BE24_A69F_6249_41D8_210A06A45A13_camera"
},
{
 "class": "PanoramaPlayListItem",
 "media": "this.panorama_B149B9F0_A69E_A1C9_41A3_7D34CCC4C924",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_DCFDD0EA_C98E_CEE2_41E5_568AA623BB70, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 4, 5)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_DCFDD0EA_C98E_CEE2_41E5_568AA623BB70",
 "camera": "this.panorama_B149B9F0_A69E_A1C9_41A3_7D34CCC4C924_camera"
},
{
 "class": "PanoramaPlayListItem",
 "media": "this.panorama_F70332DE_B1CD_04BF_41E0_52AD5D23EC3B",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_DCFC50EA_C98E_CEE2_41E8_CE41B411768C, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 5, 6)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_DCFC50EA_C98E_CEE2_41E8_CE41B411768C",
 "camera": "this.panorama_F70332DE_B1CD_04BF_41E0_52AD5D23EC3B_camera"
},
{
 "class": "PanoramaPlayListItem",
 "media": "this.panorama_EA55570C_B1B5_0D83_419D_402AB2B70DDF",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_DCFCE0EA_C98E_CEE2_41D9_FA713FAB49F6, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 6, 7)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_DCFCE0EA_C98E_CEE2_41D9_FA713FAB49F6",
 "camera": "this.panorama_EA55570C_B1B5_0D83_419D_402AB2B70DDF_camera"
},
{
 "class": "PanoramaPlayListItem",
 "media": "this.panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_DCFF80EA_C98E_CEE2_41DC_608D53985D0C, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 7, 8)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_DCFF80EA_C98E_CEE2_41DC_608D53985D0C",
 "camera": "this.panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32_camera"
},
{
 "class": "PanoramaPlayListItem",
 "media": "this.panorama_EE6E3D8C_B1BD_3C83_41E2_110C74F955A8",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_DCFE00EB_C98E_CEE2_41E3_6DCFE73FA951, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 8, 9)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_DCFE00EB_C98E_CEE2_41E3_6DCFE73FA951",
 "camera": "this.panorama_EE6E3D8C_B1BD_3C83_41E2_110C74F955A8_camera"
},
{
 "class": "PanoramaPlayListItem",
 "media": "this.panorama_8037E8B6_B1BB_048F_419F_537FF8F54FCD",
 "end": "this.trigger('tourEnded')",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_DCFE80EB_C98E_CEE2_41DC_B06CF03923E7, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 9, 0)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_DCFE80EB_C98E_CEE2_41DC_B06CF03923E7",
 "camera": "this.panorama_8037E8B6_B1BB_048F_419F_537FF8F54FCD_camera"
},
{
 "maps": [
  {
   "yaw": -82.3,
   "hfov": 8.09,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BB3EA0D4_A6BA_FFC9_41B5_378AA4C71E29_1_HS_87_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -4.96,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01b"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_F70332DE_B1CD_04BF_41E0_52AD5D23EC3B, this.camera_DF084274_C98E_CDE6_41E7_F091D779AA38); this.mainPlayList.set('selectedIndex', 5)",
   "toolTip": "\uc601\ub155\uc804",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 8.09,
   "image": "this.AnimatedImageResource_8B4B880F_C46B_5274_41E1_40D742EEFF70",
   "pitch": -4.96,
   "yaw": -82.3,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_DACCE588_B15F_0C83_41D9_B02ED1A38A82",
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": -129.2,
   "hfov": 8.09,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BB3EA0D4_A6BA_FFC9_41B5_378AA4C71E29_1_HS_70_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.5,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01b"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_B149B9F0_A69E_A1C9_41A3_7D34CCC4C924, this.camera_DF05126B_C98E_CDE2_41E0_603708019C84); this.mainPlayList.set('selectedIndex', 4)",
   "toolTip": "\uce60\uc0ac\ub2f9",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 8.09,
   "image": "this.AnimatedImageResource_8B4A580F_C46B_5274_41E0_15941ACE669A",
   "pitch": -5.5,
   "yaw": -129.2,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_BB3E30D4_A6BA_FFC9_41E2_BFE160E7EFD5",
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": -2.34,
   "hfov": 6.74,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BB3EA0D4_A6BA_FFC9_41B5_378AA4C71E29_1_HS_56_0_0_map.gif",
      "width": 24,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 25.49,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "typo_jungjeon"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 6.74,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BB3EA0D4_A6BA_FFC9_41B5_378AA4C71E29_1_HS_56_0.png",
      "width": 159,
      "height": 106,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 25.49,
   "yaw": -2.34,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_BB3E20D4_A6BA_FFC9_41D6_84B15C4620C0",
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": 179.74,
   "hfov": 4.97,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BB3EA0D4_A6BA_FFC9_41B5_378AA4C71E29_1_HS_71_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.22,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01b"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BB22B334_A60C_C516_41D4_85E2A3F602F3, this.camera_DF27C259_C98E_CD2E_41C8_9ED8CBA7298A); this.mainPlayList.set('selectedIndex', 1)",
   "toolTip": "\uc815\uc804\ub0a8\uc2e0\ubb38",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 4.97,
   "image": "this.AnimatedImageResource_8B4AA80F_C46B_5274_41D1_C4EC676DC0AA",
   "pitch": -6.22,
   "yaw": 179.74,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_BB3FC0D4_A6BA_FFC9_41D6_C68910E22E36",
 "class": "HotspotPanoramaOverlay"
},
{
 "bleaching": 0.7,
 "yaw": 130.74,
 "pitch": 65.97,
 "bleachingDistance": 0.4,
 "id": "overlay_BB3FF0D4_A6BA_FFC9_41DA_8C0525C41271",
 "class": "LensFlarePanoramaOverlay"
},
{
 "inertia": false,
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_BB3FB0D4_A6BA_FFC9_41D7_5BF805A12DBE",
 "hfov": 45,
 "image": {
  "levels": [
   {
    "url": "media/panorama_B8C3E8BA_A69E_AFB9_41C1_116805EE9981.png",
    "width": 850,
    "height": 850,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "TripodCapPanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": 132.56,
   "hfov": 8.09,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BB3EA0D4_A6BA_FFC9_41B5_378AA4C71E29_1_HS_72_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -4.93,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01b"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_B111BE24_A69F_6249_41D8_210A06A45A13, this.camera_DF342262_C98E_CDE2_41DC_414AD3425765); this.mainPlayList.set('selectedIndex', 3)",
   "toolTip": "\uacf5\uc2e0\ub2f9",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 8.09,
   "image": "this.AnimatedImageResource_8B4D280F_C46B_5274_41CF_D2A4A16BC1D7",
   "pitch": -4.93,
   "yaw": 132.56,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_BB3F50D4_A6BA_FFC9_41DC_9FF387C88689",
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": -0.16,
   "hfov": 4.68,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BB3EA0D4_A6BA_FFC9_41B5_378AA4C71E29_1_HS_85_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 3.26,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "if(this.isCardboardViewMode()) { this.showPopupPanoramaVideoOverlay(this.popup_D47CE4BA_C469_339C_41E1_72B8526F61C2, {'paddingTop':0,'rollOverIconWidth':20,'pressedIconWidth':20,'rollOverIconHeight':20,'backgroundColorDirection':'vertical','pressedBorderSize':0,'pressedIconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedBackgroundOpacity':0,'pressedBorderColor':'#000000','pressedBackgroundColor':['#DDDDDD','#FFFFFF'],'paddingRight':0,'pressedBackgroundColorRatios':[0,1],'rollOverBorderSize':0,'iconLineWidth':5,'iconColor':'#FFFFFF','rollOverIconLineWidth':5,'backgroundOpacity':0,'backgroundColorRatios':[0,0.09803921568627451,1],'iconHeight':20,'rollOverIconColor':'#6699CC','paddingBottom':0,'pressedIconLineWidth':5,'paddingLeft':0,'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderSize':0,'pressedIconColor':'#6699CC','iconWidth':20,'borderColor':'#000000','rollOverBackgroundOpacity':0,'pressedBackgroundColorDirection':'vertical','rollOverBorderColor':'#000000','backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorDirection':'vertical'}, true) } else { this.showPopupMedia(this.window_C2ABC276_C979_4DE2_41E8_FE50DC6AA1AA, this.video_F4741FF2_C438_EDAC_41B3_ABA3B32796CC, this.playList_D91E4CB6_C979_5562_41E3_9A7E4A06B99D, '80%', '80%', true, true) }",
   "toolTip": "\uc885\ubb18\uc81c\ub840\uc545",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 4.68,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BB3EA0D4_A6BA_FFC9_41B5_378AA4C71E29_1_HS_85_0.png",
      "width": 99,
      "height": 99,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 3.26,
   "yaw": -0.16,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_8E7BBD30_B1FF_1D83_41DE_0075B791EBE8",
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": 3.81,
   "hfov": 4.02,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BB3EA0D4_A6BA_FFC9_41B5_378AA4C71E29_1_HS_88_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 25.49,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showPopupPanoramaOverlay(this.popup_C676DEFA_C964_4035_41E1_912ACE9B6945, {'paddingTop':0,'rollOverIconWidth':20,'pressedIconWidth':20,'rollOverIconHeight':20,'backgroundColorDirection':'vertical','pressedBorderSize':0,'pressedIconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedBackgroundOpacity':0,'pressedBorderColor':'#000000','pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'paddingRight':15,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBorderSize':0,'iconLineWidth':5,'iconColor':'#FFFFFF','rollOverIconLineWidth':5,'backgroundOpacity':0,'backgroundColorRatios':[0,0.09803921568627451,1],'iconHeight':20,'rollOverIconColor':'#6699CC','paddingBottom':0,'pressedIconLineWidth':5,'paddingLeft':0,'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderSize':0,'pressedIconColor':'#6699CC','iconWidth':20,'borderColor':'#000000','rollOverBackgroundOpacity':0,'pressedBackgroundColorDirection':'vertical','rollOverBorderColor':'#000000','backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_DDC8F1FE_C97D_C02D_41E1_FDCF270E4E07, null, null, null, this.audio_D377640D_C477_F274_41DD_D087C037EFA5, false)"
  }
 ],
 "items": [
  {
   "hfov": 4.02,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BB3EA0D4_A6BA_FFC9_41B5_378AA4C71E29_1_HS_88_0.png",
      "width": 94,
      "height": 94,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 25.49,
   "yaw": 3.81,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_A6C9F75C_B477_EC9C_41E2_CC39BB1811DF",
 "class": "HotspotPanoramaOverlay"
},
{
 "position": {
  "yaw": 4.74,
  "hfov": 135,
  "pitch": 0.96,
  "class": "PanoramaCameraPosition"
 },
 "id": "snapshot_6E3C07CC_7CF9_EA37_41D9_C3DF07D6B485",
 "class": "PanoramaSnapshot"
},
{
 "maps": [
  {
   "yaw": 179.81,
   "hfov": 8.32,
   "image": {
    "levels": [
     {
      "url": "media/panorama_84A271EB_A69F_E1DF_41D4_672D5AE27031_1_HS_4_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -27.5,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01b"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_8037E8B6_B1BB_048F_419F_537FF8F54FCD, this.camera_DFF651CF_C98E_CF22_41E7_451A5BE57228); this.mainPlayList.set('selectedIndex', 9)",
   "toolTip": "\ud5a5\ub300\uccad(\uc2e0\uc2e41)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 8.32,
   "image": "this.AnimatedImageResource_8B5F781A_C46B_529C_41CE_1733CB746B70",
   "pitch": -27.5,
   "yaw": 179.81,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_84A261EB_A69F_E1DF_41C6_09EB17893D08",
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": 146.35,
   "hfov": 8.73,
   "image": {
    "levels": [
     {
      "url": "media/panorama_84A271EB_A69F_E1DF_41D4_672D5AE27031_1_HS_5_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -29.22,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 01b"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.setMediaBehaviour(this.playList_DCF720E6_C98E_CEE2_41E9_1AD2BF13FC43, 0, this.panorama_84A271EB_A69F_E1DF_41D4_672D5AE27031)",
   "toolTip": "\uc7ac\uad81",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 8.73,
   "image": "this.AnimatedImageResource_8B5F181A_C46B_529C_41D9_94A2B4CEAC15",
   "pitch": -29.22,
   "yaw": 146.35,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_84A211EB_A69F_E1DF_41D5_9A1C472DECEE",
 "class": "HotspotPanoramaOverlay"
},
{
 "inertia": false,
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_84A231EB_A69F_E1DF_41E4_0CF88A0684C9",
 "hfov": 45,
 "image": {
  "levels": [
   {
    "url": "media/panorama_B8C3E8BA_A69E_AFB9_41C1_116805EE9981.png",
    "width": 850,
    "height": 850,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "TripodCapPanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": -99.6,
   "hfov": 8.85,
   "image": {
    "levels": [
     {
      "url": "media/panorama_84A271EB_A69F_E1DF_41D4_672D5AE27031_1_HS_11_1_0_map.gif",
      "width": 94,
      "height": 108,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -16.29,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "Polygon"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.setOverlayBehaviour(this.overlay_845D11EB_A69F_E1DF_41C9_66BA3F199C6C, this.panorama_84A271EB_A69F_E1DF_41D4_672D5AE27031, 'triggerClick', true)"
  }
 ],
 "items": [
  {
   "hfov": 8.85,
   "roll": 0,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_84A271EB_A69F_E1DF_41D4_672D5AE27031_1_HS_11_0.png",
      "width": 189,
      "height": 216,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -16.29,
   "yaw": -99.6,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_84A291EB_A69F_E1DF_41CA_9D0E88EB3B35",
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": -99.59,
   "hfov": 6.74,
   "image": {
    "levels": [
     {
      "url": "media/panorama_84A271EB_A69F_E1DF_41D4_672D5AE27031_1_HS_13_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -16.51,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image0"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showPopupPanoramaOverlay(this.popup_9FBDA241_B4B4_24E4_41BF_22A24B02003C, {'paddingTop':15,'rollOverIconWidth':20,'pressedIconWidth':20,'rollOverIconHeight':20,'backgroundColorDirection':'vertical','pressedBorderSize':0,'pressedIconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedBackgroundOpacity':0,'pressedBorderColor':'#000000','pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'paddingRight':15,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBorderSize':0,'iconLineWidth':5,'iconColor':'#FFFFFF','rollOverIconLineWidth':5,'backgroundOpacity':0,'backgroundColorRatios':[0,0.09803921568627451,1],'iconHeight':20,'rollOverIconColor':'#6699CC','paddingBottom':0,'pressedIconLineWidth':5,'paddingLeft':0,'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderSize':0,'pressedIconColor':'#6699CC','iconWidth':20,'borderColor':'#000000','rollOverBackgroundOpacity':0,'pressedBackgroundColorDirection':'vertical','rollOverBorderColor':'#000000','backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_87A1A350_B494_E4E4_41D6_BFA0AA0BA470, null, null, null, this.audio_D377640D_C477_F274_41DD_D087C037EFA5, false)"
  }
 ],
 "items": [
  {
   "hfov": 6.74,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_84A271EB_A69F_E1DF_41D4_672D5AE27031_1_HS_13_0.png",
      "width": 150,
      "height": 150,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -16.51,
   "yaw": -99.59,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_845D11EB_A69F_E1DF_41C9_66BA3F199C6C",
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": 29.67,
   "hfov": 17.23,
   "image": {
    "levels": [
     {
      "url": "media/panorama_84A271EB_A69F_E1DF_41D4_672D5AE27031_1_HS_12_1_0_map.gif",
      "width": 185,
      "height": 98,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -16.12,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "Polygon"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.setOverlayBehaviour(this.overlay_845D31EB_A69F_E1DF_41C0_0ED857062ECD, this.panorama_84A271EB_A69F_E1DF_41D4_672D5AE27031, 'triggerClick', true)"
  }
 ],
 "items": [
  {
   "hfov": 17.23,
   "roll": 0,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_84A271EB_A69F_E1DF_41D4_672D5AE27031_1_HS_12_0.png",
      "width": 370,
      "height": 197,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -16.12,
   "yaw": 29.67,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_84A2B1EB_A69F_E1DF_4195_D360F42F5E38",
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": 31.62,
   "hfov": 6.81,
   "image": {
    "levels": [
     {
      "url": "media/panorama_84A271EB_A69F_E1DF_41D4_672D5AE27031_1_HS_14_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -14.46,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image2"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showPopupPanoramaOverlay(this.popup_9EAEA666_B4BB_ECAC_41D4_2BF45C36F5C4, {'paddingTop':15,'rollOverIconWidth':20,'pressedIconWidth':20,'rollOverIconHeight':20,'backgroundColorDirection':'vertical','pressedBorderSize':0,'pressedIconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedBackgroundOpacity':0,'pressedBorderColor':'#000000','pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'paddingRight':15,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBorderSize':0,'iconLineWidth':5,'iconColor':'#FFFFFF','rollOverIconLineWidth':5,'backgroundOpacity':0,'backgroundColorRatios':[0,0.09803921568627451,1],'iconHeight':20,'rollOverIconColor':'#6699CC','paddingBottom':0,'pressedIconLineWidth':5,'paddingLeft':0,'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderSize':0,'pressedIconColor':'#6699CC','iconWidth':20,'borderColor':'#000000','rollOverBackgroundOpacity':0,'pressedBackgroundColorDirection':'vertical','rollOverBorderColor':'#000000','backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_87A22351_B494_E4E4_41D5_DC70791D09BD, null, null, null, this.audio_D377640D_C477_F274_41DD_D087C037EFA5, false)"
  }
 ],
 "items": [
  {
   "hfov": 6.81,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_84A271EB_A69F_E1DF_41D4_672D5AE27031_1_HS_14_0.png",
      "width": 150,
      "height": 150,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -14.46,
   "yaw": 31.62,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_845D31EB_A69F_E1DF_41C0_0ED857062ECD",
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": -14.68,
   "hfov": 23.05,
   "image": {
    "levels": [
     {
      "url": "media/panorama_84A271EB_A69F_E1DF_41D4_672D5AE27031_1_HS_15_1_0_map.gif",
      "width": 200,
      "height": 88,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -18.85,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "Polygon"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.setOverlayBehaviour(this.overlay_B99CF473_AA2B_1B97_41E5_14CCB9E5528B, this.panorama_84A271EB_A69F_E1DF_41D4_672D5AE27031, 'triggerClick', true)"
  }
 ],
 "items": [
  {
   "hfov": 23.05,
   "roll": 0,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_84A271EB_A69F_E1DF_41D4_672D5AE27031_1_HS_15_0.png",
      "width": 498,
      "height": 220,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -18.85,
   "yaw": -14.68,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_B2B0743F_AA29_1B8F_41E0_FC6544C02D70",
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "yaw": -9.66,
   "hfov": 6.78,
   "image": {
    "levels": [
     {
      "url": "media/panorama_84A271EB_A69F_E1DF_41D4_672D5AE27031_1_HS_16_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -15.37,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image1"
 },
 "enabledInCardboard": true,
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.showPopupPanoramaOverlay(this.popup_9D3D1E61_B4B4_7CA4_41E6_900D4F087CB4, {'paddingTop':15,'rollOverIconWidth':20,'pressedIconWidth':20,'rollOverIconHeight':20,'backgroundColorDirection':'vertical','pressedBorderSize':0,'pressedIconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedBackgroundOpacity':0,'pressedBorderColor':'#000000','pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'paddingRight':15,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBorderSize':0,'iconLineWidth':5,'iconColor':'#FFFFFF','rollOverIconLineWidth':5,'backgroundOpacity':0,'backgroundColorRatios':[0,0.09803921568627451,1],'iconHeight':20,'rollOverIconColor':'#6699CC','paddingBottom':0,'pressedIconLineWidth':5,'paddingLeft':0,'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderSize':0,'pressedIconColor':'#6699CC','iconWidth':20,'borderColor':'#000000','rollOverBackgroundOpacity':0,'pressedBackgroundColorDirection':'vertical','rollOverBorderColor':'#000000','backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_87A2C352_B494_E4E4_41C1_E6097406040C, null, null, null, this.audio_D377640D_C477_F274_41DD_D087C037EFA5, false)"
  }
 ],
 "items": [
  {
   "hfov": 6.78,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_84A271EB_A69F_E1DF_41D4_672D5AE27031_1_HS_16_0.png",
      "width": 150,
      "height": 150,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -15.37,
   "yaw": -9.66,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_B99CF473_AA2B_1B97_41E5_14CCB9E5528B",
 "class": "HotspotPanoramaOverlay"
},
{
 "levels": [
  {
   "url": "media/panorama_F70332DE_B1CD_04BF_41E0_52AD5D23EC3B_1_HS_4_0.png",
   "width": 400,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameDuration": 62,
 "rowCount": 6,
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_8B50F814_C46B_5294_41DA_7B0491AD2550",
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_F70332DE_B1CD_04BF_41E0_52AD5D23EC3B_1_HS_10_0.png",
   "width": 400,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameDuration": 62,
 "rowCount": 6,
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_8B537814_C46B_5294_41B6_4A0783A6AB49",
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_F70332DE_B1CD_04BF_41E0_52AD5D23EC3B_1_HS_11_0.png",
   "width": 400,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameDuration": 62,
 "rowCount": 6,
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_8B533814_C46B_5294_41DA_88F44AA773DD",
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_F70332DE_B1CD_04BF_41E0_52AD5D23EC3B_1_HS_12_0.png",
   "width": 400,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameDuration": 62,
 "rowCount": 6,
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_8B53D814_C46B_5294_41E5_447C2B9B2A5D",
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_EE6E3D8C_B1BD_3C83_41E2_110C74F955A8_1_HS_0_0.png",
   "width": 400,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameDuration": 62,
 "rowCount": 6,
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_8B57F817_C46B_5294_41D7_152F6388EE9D",
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_EE6E3D8C_B1BD_3C83_41E2_110C74F955A8_1_HS_1_0.png",
   "width": 400,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameDuration": 62,
 "rowCount": 6,
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_8B567817_C46B_5294_41DE_06FDA05F8BF3",
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_EE6E3D8C_B1BD_3C83_41E2_110C74F955A8_1_HS_2_0.png",
   "width": 400,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameDuration": 62,
 "rowCount": 6,
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_8B56E817_C46B_5294_41D3_C09BB9E9B13D",
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_8037E8B6_B1BB_048F_419F_537FF8F54FCD_1_HS_13_0.png",
   "width": 400,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameDuration": 41,
 "rowCount": 6,
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_8B593817_C46B_5294_41E4_0F6DB5AECB8D",
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_8037E8B6_B1BB_048F_419F_537FF8F54FCD_1_HS_23_0.png",
   "width": 400,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameDuration": 62,
 "rowCount": 6,
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_8B59A818_C46B_529C_41CF_2287174BC198",
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_EB987E8F_B1CD_3C9D_41CA_53E02C0E1D7E_1_HS_0_0.png",
   "width": 400,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameDuration": 41,
 "rowCount": 6,
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_8AA1081B_C46B_529C_41E2_8F9638C8F5F9",
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_EB987E8F_B1CD_3C9D_41CA_53E02C0E1D7E_1_HS_1_0.png",
   "width": 400,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameDuration": 62,
 "rowCount": 6,
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_8AA1D81B_C46B_529C_41D4_9F39D392EB7B",
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_EB987E8F_B1CD_3C9D_41CA_53E02C0E1D7E_1_HS_5_0.png",
   "width": 400,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameDuration": 62,
 "rowCount": 6,
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_8AA0781B_C46B_529C_41D1_8762BB9B2429",
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_EB987E8F_B1CD_3C9D_41CA_53E02C0E1D7E_1_HS_3_0.png",
   "width": 400,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameDuration": 62,
 "rowCount": 6,
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_8AA0381B_C46B_529C_41D8_84FF23B8E9FC",
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_EB987E8F_B1CD_3C9D_41CA_53E02C0E1D7E_1_HS_4_0.png",
   "width": 400,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameDuration": 62,
 "rowCount": 6,
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_8AA0D81B_C46B_529C_41B2_7059FEE4DB06",
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_BB22B334_A60C_C516_41D4_85E2A3F602F3_1_HS_19_0.png",
   "width": 400,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameDuration": 41,
 "rowCount": 6,
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_8B49A80E_C46B_5274_41B1_87EA01564B5A",
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_BB22B334_A60C_C516_41D4_85E2A3F602F3_1_HS_20_0.png",
   "width": 400,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameDuration": 62,
 "rowCount": 6,
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_8B48680E_C46B_5274_41D6_7ADDC4933554",
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_BB22B334_A60C_C516_41D4_85E2A3F602F3_1_HS_21_0.png",
   "width": 400,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameDuration": 62,
 "rowCount": 6,
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_8B48E80E_C46B_5274_41D7_D86FC172D120",
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_BB22B334_A60C_C516_41D4_85E2A3F602F3_1_HS_22_0.png",
   "width": 400,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameDuration": 62,
 "rowCount": 6,
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_8B4B780E_C46B_5274_41C7_9F7677C0DE81",
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_BB22B334_A60C_C516_41D4_85E2A3F602F3_1_HS_23_0.png",
   "width": 400,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameDuration": 62,
 "rowCount": 6,
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_8B4B180E_C46B_5274_41BE_128556D0487C",
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_B149B9F0_A69E_A1C9_41A3_7D34CCC4C924_1_HS_13_0.png",
   "width": 400,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameDuration": 62,
 "rowCount": 6,
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_8B4EC813_C46B_526C_41D4_8D5376B0CBA1",
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_B149B9F0_A69E_A1C9_41A3_7D34CCC4C924_1_HS_15_0.png",
   "width": 400,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameDuration": 62,
 "rowCount": 6,
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_8B514813_C46B_526C_41DB_CDAEBE66CC1E",
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_B149B9F0_A69E_A1C9_41A3_7D34CCC4C924_1_HS_16_0.png",
   "width": 400,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameDuration": 62,
 "rowCount": 6,
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_8B51F813_C46B_526C_41E3_8E3E2CA71B3C",
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_B149B9F0_A69E_A1C9_41A3_7D34CCC4C924_1_HS_17_0.png",
   "width": 400,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameDuration": 62,
 "rowCount": 6,
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_8B518814_C46B_5294_41D0_A893F439C313",
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32_1_HS_0_0.png",
   "width": 400,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameDuration": 62,
 "rowCount": 6,
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_8B557816_C46B_5294_41E3_5346411866D0",
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32_1_HS_1_0.png",
   "width": 400,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameDuration": 62,
 "rowCount": 6,
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_8B553816_C46B_5294_41E7_F9C80A06C92C",
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_E0DA67A6_B1D7_0C8F_41B0_290A60C62B32_1_HS_2_0.png",
   "width": 400,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameDuration": 62,
 "rowCount": 6,
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_8B55D816_C46B_5294_41D7_57D74A3F9C2D",
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_B111BE24_A69F_6249_41D8_210A06A45A13_1_HS_13_0.png",
   "width": 400,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameDuration": 62,
 "rowCount": 6,
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_8B4F7812_C46B_526C_41DD_B87C9EC9D802",
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_B111BE24_A69F_6249_41D8_210A06A45A13_1_HS_15_0.png",
   "width": 400,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameDuration": 62,
 "rowCount": 6,
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_8B4FF813_C46B_526C_41A2_AAB8EA7DA350",
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_B111BE24_A69F_6249_41D8_210A06A45A13_1_HS_16_0.png",
   "width": 400,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameDuration": 62,
 "rowCount": 6,
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_8B4F8813_C46B_526C_41BD_C979CAFF888E",
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_B8C238BA_A69E_AFB9_41DB_A6464F54721E_1_HS_31_0.png",
   "width": 400,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameDuration": 41,
 "rowCount": 6,
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_8B46B80D_C46B_5274_41CE_9FB1AEA4EFF4",
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_EA55570C_B1B5_0D83_419D_402AB2B70DDF_1_HS_0_0.png",
   "width": 400,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameDuration": 62,
 "rowCount": 6,
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_8B523815_C46B_5294_41E6_FFEFB152F6F2",
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_EA55570C_B1B5_0D83_419D_402AB2B70DDF_1_HS_1_0.png",
   "width": 400,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameDuration": 62,
 "rowCount": 6,
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_8B52D815_C46B_5294_41C0_F3B814E3FE51",
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_EA55570C_B1B5_0D83_419D_402AB2B70DDF_1_HS_2_0.png",
   "width": 400,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameDuration": 62,
 "rowCount": 6,
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_8B552815_C46B_5294_41D9_DEF2CCAD2360",
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_BB3EA0D4_A6BA_FFC9_41B5_378AA4C71E29_1_HS_87_0.png",
   "width": 400,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameDuration": 41,
 "rowCount": 6,
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_8B4B880F_C46B_5274_41E1_40D742EEFF70",
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_BB3EA0D4_A6BA_FFC9_41B5_378AA4C71E29_1_HS_70_0.png",
   "width": 400,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameDuration": 41,
 "rowCount": 6,
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_8B4A580F_C46B_5274_41E0_15941ACE669A",
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_BB3EA0D4_A6BA_FFC9_41B5_378AA4C71E29_1_HS_71_0.png",
   "width": 400,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameDuration": 62,
 "rowCount": 6,
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_8B4AA80F_C46B_5274_41D1_C4EC676DC0AA",
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_BB3EA0D4_A6BA_FFC9_41B5_378AA4C71E29_1_HS_72_0.png",
   "width": 400,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameDuration": 41,
 "rowCount": 6,
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_8B4D280F_C46B_5274_41CF_D2A4A16BC1D7",
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_84A271EB_A69F_E1DF_41D4_672D5AE27031_1_HS_4_0.png",
   "width": 400,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameDuration": 41,
 "rowCount": 6,
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_8B5F781A_C46B_529C_41CE_1733CB746B70",
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_84A271EB_A69F_E1DF_41D4_672D5AE27031_1_HS_5_0.png",
   "width": 400,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameDuration": 62,
 "rowCount": 6,
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_8B5F181A_C46B_529C_41D9_94A2B4CEAC15",
 "class": "AnimatedImageResource"
}],
 "mobileMipmappingEnabled": false,
 "defaultVRPointer": "laser",
 "minHeight": 20,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "overflow": "hidden",
 "horizontalAlign": "left",
 "paddingTop": 0,
 "width": "100%",
 "borderRadius": 0,
 "minWidth": 20,
 "contentOpaque": false,
 "paddingBottom": 0,
 "backgroundPreloadEnabled": true,
 "children": [
  "this.MainViewer",
  "this.MapViewer",
  "this.Container_9847BA93_8D48_7EB8_41D1_CCFC20490212",
  "this.Image_57653967_4347_7F6F_4166_5A375DABB586",
  "this.Container_6A04ED74_7BD9_8F65_41BF_BB44D551B523",
  "this.WebFrame_6E96CCB0_7C39_53A0_41D0_2470CE6C43BE",
  "this.IconButton_6ED08C3E_7C38_D2A0_41B0_83963070F910",
  "this.veilPopupPanorama",
  "this.zoomImagePopupPanorama",
  "this.closeButtonPopupPanorama"
 ],
 "mouseWheelEnabled": true,
 "verticalAlign": "top",
 "scrollBarWidth": 10,
 "height": "100%",
 "buttonToggleMute": "this.IconButton_B2A6FD12_863A_59AD_41BD_0C663B0C6B4F",
 "shadow": false,
 "layout": "absolute",
 "data": {
  "name": "Player513"
 }
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
