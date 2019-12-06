(function(){
	var script = {
 "mouseWheelEnabled": true,
 "propagateClick": false,
 "buttonToggleMute": "this.IconButton_6E599476_7CD6_3169_41DB_650F1AEAFBAB",
 "scrollBarColor": "#000000",
 "id": "rootPlayer",
 "scripts": {
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')].audio; } return audio; },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext, true); }; playNext(); },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "getFirstPlayListWithMedia": function(media, onlySelected){  var playLists = this.getPlayListsWithMedia(media, onlySelected); return playLists.length > 0 ? playLists[0] : undefined; },
  "existsKey": function(key){  return key in window; },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "registerTextVariable": function(obj){  var property = (function() { switch (obj.get('class')) { case 'Label': return 'text'; case 'Button': case 'BaseButton': return 'label'; case 'HTMLText': return 'html'; } })(); if (property == undefined) return; var re = new RegExp('\\{\\{\\s*(\\w+)\\s*\\}\\}', 'g'); var text = obj.get(property); var data = obj.get('data') || {}; data[property] = text; obj.set('data', data); var updateLabel = function(vars) { var text = data[property]; for (var i = 0; i < vars.length; ++i) { var info = vars[i]; var dispatchers = info.dispatchers; for (var j = 0; j < dispatchers.length; ++j) { var dispatcher = dispatchers[j]; var index = dispatcher.get('selectedIndex'); if (index >= 0) { var srcPropArray = info.src.split('.'); var src = dispatcher.get('items')[index]; if(info.itemCondition !== undefined && !info.itemCondition.call(this, src)) continue; for (var z = 0; z < srcPropArray.length; ++z) src = 'get' in src ? src.get(srcPropArray[z]) : src[srcPropArray[z]]; text = text.replace(info.replace, src); } } } if(text != data[property]) obj.set(property, text); }; var vars = []; var addVars = function(dispatchers, eventName, src, replace, itemCondition) { vars.push({ 'dispatchers': dispatchers, 'eventName': eventName, 'src': src, 'replace': replace, 'itemCondition': itemCondition }); }; var viewerAreaItemCondition = function(item) { var player = item.get('player'); return player !== undefined && player.get('viewerArea') == this.MainViewer; }; while (null != (result = re.exec(text))) { switch (result[1]) { case 'title': var playLists = this._getPlayListsWithViewer(this.MainViewer); addVars(playLists, 'change', 'media.label', result[0], viewerAreaItemCondition); break; case 'subtitle': var playLists = this._getPlayListsWithViewer(this.MainViewer); addVars(playLists, 'change', 'media.data.subtitle', result[0], viewerAreaItemCondition); break; } } if (vars.length > 0) { var func = updateLabel.bind(this, vars); for (var i = 0; i < vars.length; ++i) { var info = vars[i]; var dispatchers = info.dispatchers; for (var j = 0; j < dispatchers.length; ++j) dispatchers[j].bind(info.eventName, func, this); } } },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "playGlobalAudio": function(audio, endCallback, asBackground){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = {'audio': audio, 'asBackground': asBackground || false}; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = undefined; if(mediaDispatcher){ var playListsWithMedia = this.getPlayListsWithMedia(mediaDispatcher, true); playListDispatcher = playListsWithMedia.indexOf(playList) != -1 ? playList : (playListsWithMedia.length > 0 ? playListsWithMedia[0] : undefined); } if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } item.bind('begin', onBeginFunction, self); this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios).map(function(v) { return v.audio })); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "getPlayListsWithMedia": function(media, onlySelected){  var result = []; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) result.push(playList); } return result; },
  "stopGlobalAudios": function(onlyForeground){  var audios = window.currentGlobalAudios; var self = this; if(audios){ Object.keys(audios).forEach(function(key){ var data = audios[key]; if(!onlyForeground || (onlyForeground && !data.asBackground)) { self.stopGlobalAudio(data.audio); } }); } },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ var audioData = audios[audio.get('id')]; if(audioData){ audio = audioData.audio; delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ var audioData = audios[audio.get('id')]; if(audioData) audio = audioData.audio; } if(audio.get('state') == 'playing') audio.pause(); },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "_initItemWithComps": function(playList, index, components, eventName, visible, effectToApply, delay, restoreStateAt){  var item = playList.get('items')[index]; var registerVisibility = restoreStateAt > 0; var rootPlayer = this.rootPlayer; var cloneEffect = function(visible) { var klass = effectToApply ? effectToApply.get('class') : undefined; var effect = undefined; switch(klass) { case 'FadeInEffect': case 'FadeOutEffect': effect = rootPlayer.createInstance(visible ? 'FadeInEffect' : 'FadeOutEffect'); break; case 'SlideInEffect': case 'SlideOutEffect': effect = rootPlayer.createInstance(visible ? 'SlideInEffect' : 'SlideOutEffect'); break; } if(effect){ effect.set('duration', effectToApply.get('duration')); effect.set('easing', effectToApply.get('easing')); if(klass.indexOf('Slide') != -1) effect.set(visible ? 'from' : 'to', effectToApply.get(visible ? 'to' : 'from')); } return effect; }; var endFunc = function() { for(var i = 0, count = components.length; i<count; ++i) { var component = components[i]; if(restoreStateAt > 0){ this.setComponentVisibility(component, !visible, 0, cloneEffect(!visible)); } else { var key = 'visibility_' + component.get('id'); if(this.existsKey(key)) { if(this.getKey(key)) this.setComponentVisibility(component, true, 0, cloneEffect(true)); else this.setComponentVisibility(component, false, 0, cloneEffect(false)); this.unregisterKey(key); } } } item.unbind('end', endFunc, this); if(addMediaEndEvent) media.unbind('end', endFunc, this); }; var stopFunc = function() { item.unbind('stop', stopFunc, this, true); item.unbind('stop', stopFunc, this); item.unbind('begin', stopFunc, this, true); item.unbind('begin', stopFunc, this); for(var i = 0, count = components.length; i<count; ++i) { this.keepCompVisible(components[i], false); } }; var addEvent = function(eventName, delay, restoreStateAt){ var changeFunc = function(){ var changeVisibility = function(component, visible, effect) { rootPlayer.setComponentVisibility(component, visible, delay, effect, visible ? 'showEffect' : 'hideEffect', false); if(restoreStateAt > 0){ var time = delay + restoreStateAt + (effect != undefined ? effect.get('duration') : 0); rootPlayer.setComponentVisibility(component, !visible, time, cloneEffect(!visible), visible ? 'hideEffect' : 'showEffect', true); } }; for(var i = 0, count = components.length; i<count; ++i){ var component = components[i]; if(visible == 'toggle'){ if(!component.get('visible')) changeVisibility(component, true, cloneEffect(true)); else changeVisibility(component, false, cloneEffect(false)); } else { changeVisibility(component, visible, cloneEffect(visible)); } } item.unbind(eventName, changeFunc, this); }; item.bind(eventName, changeFunc, this) }; if(eventName == 'begin'){ for(var i = 0, count = components.length; i<count; ++i){ var component = components[i]; this.keepCompVisible(component, true); if(registerVisibility) { var key = 'visibility_' + component.get('id'); this.registerKey(key, component.get('visible')); } } item.bind('stop', stopFunc, this, true); item.bind('stop', stopFunc, this); item.bind('begin', stopFunc, this, true); item.bind('begin', stopFunc, this); if(registerVisibility){ item.bind('end', endFunc, this); var media = item.get('media'); var addMediaEndEvent = media.get('loop') != undefined && !(media.get('loop')); if(addMediaEndEvent) media.bind('end', endFunc, this); } } else if(eventName == 'end' && restoreStateAt > 0){ addEvent('begin', restoreStateAt, 0); restoreStateAt = 0; } if(eventName != undefined) addEvent(eventName, delay, restoreStateAt); },
  "_getPlayListsWithViewer": function(viewer){  var playLists = this.getByClassName('PlayList'); var containsViewer = function(playList) { var items = playList.get('items'); for(var j=items.length-1; j>=0; --j) { var item = items[j]; var player = item.get('player'); if(player !== undefined && player.get('viewerArea') == viewer) return true; } return false; }; for(var i=playLists.length-1; i>=0; --i) { if(!containsViewer(playLists[i])) playLists.splice(i, 1); } return playLists; },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "getKey": function(key){  return window[key]; },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "registerKey": function(key, value){  window[key] = value; },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback, stopBackgroundAudio){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')].audio; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } var src = this.playGlobalAudio(audio, endCallback); if(stopBackgroundAudio === true){ var stateChangeFunc = function(){ if(src.get('state') == 'playing'){ this.pauseGlobalAudios(src.get('id'), [src]); } else /*if(src.get('state') == 'stopped')*/{ this.resumeGlobalAudios(src.get('id')); src.unbind('stateChange', stateChangeFunc, this); } }; src.bind('stateChange', stateChangeFunc, this); } return src; },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "keepCompVisible": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "shareSocial": function(socialID, url, deepLink){  if(url == undefined) { url = deepLink ? location.href : location.href.split(location.search||location.hash||/[?#]/)[0]; } else if(deepLink) { url += location.hash; } url = (function(id){ switch(id){ case 'fb': return 'https://www.facebook.com/sharer/sharer.php?u='+url; case 'wa': return 'https://api.whatsapp.com/send/?text='+encodeURIComponent(url); case 'tw': return 'https://twitter.com/intent/tweet?source=webclient&url='+url; default: return undefined; } })(socialID); window.open(url, '_blank'); },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "unregisterKey": function(key){  delete window[key]; },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "setOverlayBehaviour": function(overlay, media, action, preventDoubleClick){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(preventDoubleClick){ if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 1000); } }; if(preventDoubleClick && window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getFirstPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); }
 },
 "minHeight": 20,
 "children": [
  "this.MainViewer",
  "this.Container_DF884EAF_CFB3_9CB8_41E1_96BD47779950",
  "this.Container_CD433AED_D464_D24E_41E3_AE723D84DA21",
  "this.Container_C8F21624_D45F_55FC_41E5_DE32E668F410",
  "this.Container_CEA66E9F_D45B_D2CC_41E3_CB7218F7EE17",
  "this.Container_CE48C64D_D45B_B24C_41D0_953DAB8E95D7",
  "this.Container_C5BF9EE0_D9EE_A480_41E6_73AEE2103F66",
  "this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9F",
  "this.Container_C0032120_CFB0_85A8_41D1_BBFE7EB19031"
 ],
 "layout": "absolute",
 "shadow": false,
 "defaultVRPointer": "laser",
 "borderSize": 0,
 "width": "100%",
 "horizontalAlign": "left",
 "gap": 10,
 "start": "this.init(); this.syncPlaylists([this.mainPlayList,this.ThumbnailList_C35F2980_D8AD_AC81_41EA_527CBF21FD96_playlist])",
 "minWidth": 20,
 "borderRadius": 0,
 "desktopMipmappingEnabled": false,
 "downloadEnabled": false,
 "paddingBottom": 0,
 "mobileMipmappingEnabled": false,
 "paddingRight": 0,
 "class": "Player",
 "backgroundPreloadEnabled": true,
 "paddingLeft": 0,
 "vrPolyfillScale": 0.75,
 "height": "100%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "overflow": "hidden",
 "verticalAlign": "top",
 "paddingTop": 0,
 "definitions": [{
 "propagateClick": false,
 "id": "IconButton_CD714A40_D464_DDB4_41E1_355376A58CC4",
 "backgroundOpacity": 0,
 "width": 20,
 "minHeight": 20,
 "shadow": false,
 "borderSize": 0,
 "horizontalAlign": "center",
 "pressedIconURL": "skin/IconButton_CD714A40_D464_DDB4_41E1_355376A58CC4.png",
 "minWidth": 20,
 "borderRadius": 0,
 "maxWidth": 20,
 "maxHeight": 20,
 "paddingBottom": 0,
 "iconURL": "skin/IconButton_CD714A40_D464_DDB4_41E1_355376A58CC4.png",
 "mode": "push",
 "paddingRight": 0,
 "click": "this.setComponentVisibility(this.Container_CD433AED_D464_D24E_41E3_AE723D84DA21, false, 0, null, null, false)",
 "class": "IconButton",
 "height": 20,
 "paddingLeft": 0,
 "rollOverIconURL": "skin/IconButton_CD714A40_D464_DDB4_41E1_355376A58CC4_rollover.png",
 "verticalAlign": "middle",
 "transparencyActive": false,
 "data": {
  "name": "X"
 },
 "paddingTop": 0,
 "cursor": "hand"
},
{
 "label": "\uc138\uc778\ud2b8 \ud5ec\ub80c\uc2a4 \uc0b0",
 "scaleMode": "fit_inside",
 "class": "Video",
 "width": 1920,
 "thumbnailUrl": "media/video_CF5244B4_D45C_D6DC_41E3_A9007FF4A5DE_t.jpg",
 "loop": false,
 "id": "video_CF5244B4_D45C_D6DC_41E3_A9007FF4A5DE",
 "height": 1080,
 "video": {
  "width": 1920,
  "mp4Url": "media/video_CF5244B4_D45C_D6DC_41E3_A9007FF4A5DE.mp4",
  "class": "VideoResource",
  "height": 1080
 }
},
{
 "id": "effect_D6358D36_D969_8D63_41E3_F75C817FF723",
 "class": "FadeInEffect",
 "easing": "linear",
 "duration": 500
},
{
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#000000",
 "id": "Container_C8F21624_D45F_55FC_41E5_DE32E668F410",
 "left": "0%",
 "children": [
  "this.Container_C84E65A5_D45F_56FC_41C3_D5F703FC7CA2"
 ],
 "layout": "absolute",
 "backgroundOpacity": 0.6,
 "right": "0%",
 "shadow": false,
 "minHeight": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "gap": 10,
 "minWidth": 1,
 "borderRadius": 0,
 "backgroundColorDirection": "vertical",
 "bottom": "0%",
 "paddingRight": 0,
 "paddingBottom": 0,
 "top": "0%",
 "class": "Container",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "paddingLeft": 0,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "verticalAlign": "top",
 "overflow": "scroll",
 "scrollBarVisible": "rollOver",
 "visible": false,
 "contentOpaque": false,
 "data": {
  "name": "\uadf8\ub79c\ub4dc \uce90\ub2c8\uc5b8"
 },
 "paddingTop": 0,
 "scrollBarWidth": 10
},
{
 "items": [
  {
   "media": "this.video_C0133211_D010_F8A8_41E1_F3D0BE326121",
   "start": "this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9FVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_C2D92C8E_DA45_58FB_41D5_F52955839E76, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_C2D92C8E_DA45_58FB_41D5_F52955839E76, 0)",
   "begin": "this.fixTogglePlayPauseButton(this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9FVideoPlayer)",
   "player": "this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9FVideoPlayer",
   "class": "VideoPlayListItem"
  }
 ],
 "id": "playList_C2D92C8E_DA45_58FB_41D5_F52955839E76",
 "class": "PlayList"
},
{
 "propagateClick": false,
 "id": "ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9F",
 "left": "0%",
 "playbackBarProgressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "progressBarBorderRadius": 0,
 "progressRight": 0,
 "right": "0%",
 "playbackBarBackgroundOpacity": 1,
 "shadow": false,
 "progressBorderRadius": 0,
 "minHeight": 1,
 "borderSize": 0,
 "toolTipPaddingBottom": 4,
 "playbackBarHeight": 20,
 "playbackBarBorderSize": 0,
 "toolTipTextShadowColor": "#000000",
 "playbackBarHeadShadowVerticalLength": 0,
 "progressHeight": 10,
 "borderRadius": 0,
 "playbackBarOpacity": 1,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "displayTooltipInTouchScreens": true,
 "progressBackgroundColorRatios": [
  0
 ],
 "toolTipTextShadowOpacity": 0,
 "vrPointerSelectionColor": "#FF6600",
 "paddingRight": 0,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipFontColor": "#606060",
 "playbackBarBottom": 0,
 "toolTipBorderColor": "#767676",
 "class": "ViewerArea",
 "playbackBarLeft": 0,
 "playbackBarHeadShadow": true,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingTop": 4,
 "toolTipShadowColor": "#333333",
 "playbackBarProgressBackgroundColor": [
  "#FF0000"
 ],
 "toolTipOpacity": 1,
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipShadowVerticalLength": 0,
 "progressBarBorderColor": "#000000",
 "progressBorderSize": 0,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarRight": 0,
 "vrPointerColor": "#FFFFFF",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "transitionDuration": 500,
 "vrPointerSelectionTime": 2000,
 "toolTipBorderRadius": 3,
 "toolTipBorderSize": 1,
 "progressOpacity": 1,
 "firstTransitionDuration": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "toolTipPaddingLeft": 6,
 "toolTipShadowSpread": 0,
 "minWidth": 1,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipShadowOpacity": 1,
 "toolTipFontSize": "1.11vmin",
 "toolTipDisplayTime": 600,
 "progressBarBorderSize": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "bottom": "0%",
 "progressBorderColor": "#000000",
 "top": "0%",
 "paddingBottom": 0,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadOpacity": 1,
 "playbackBarHeadBorderColor": "#000000",
 "toolTipFontStyle": "normal",
 "playbackBarHeadBorderRadius": 0,
 "paddingLeft": 0,
 "playbackBarHeadHeight": 15,
 "transitionMode": "blending",
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipShadowBlurRadius": 3,
 "playbackBarBackgroundColor": [
  "#000000"
 ],
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "toolTipFontFamily": "Arial",
 "progressBarOpacity": 1,
 "progressBackgroundOpacity": 1,
 "progressBottom": 2,
 "playbackBarProgressBorderRadius": 0,
 "progressLeft": 0,
 "toolTipFontWeight": "normal",
 "visible": false,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "playbackBarProgressBorderSize": 0,
 "paddingTop": 0,
 "toolTipPaddingRight": 6,
 "data": {
  "name": "VideoPlay"
 },
 "playbackBarHeadShadowColor": "#000000"
},
{
 "propagateClick": false,
 "id": "Image_C843F5AB_D45F_56F4_41E9_4C0BFE490491",
 "backgroundOpacity": 0,
 "width": 510,
 "minHeight": 510,
 "shadow": false,
 "borderSize": 0,
 "horizontalAlign": "center",
 "url": "skin/Image_C843F5AB_D45F_56F4_41E9_4C0BFE490491.png",
 "minWidth": 510,
 "borderRadius": 0,
 "maxWidth": 510,
 "maxHeight": 510,
 "paddingBottom": 0,
 "paddingRight": 0,
 "class": "Image",
 "height": 510,
 "paddingLeft": 0,
 "verticalAlign": "top",
 "scaleMode": "fit_inside",
 "data": {
  "name": "Image7152"
 },
 "paddingTop": 0
},
{
 "propagateClick": false,
 "id": "Image_CEC60E05_D45B_D5BF_41E8_40BA5F12420E",
 "backgroundOpacity": 0,
 "width": 510,
 "minHeight": 510,
 "shadow": false,
 "borderSize": 0,
 "horizontalAlign": "center",
 "url": "skin/Image_CEC60E05_D45B_D5BF_41E8_40BA5F12420E.png",
 "minWidth": 510,
 "borderRadius": 0,
 "maxWidth": 510,
 "maxHeight": 510,
 "paddingBottom": 0,
 "paddingRight": 0,
 "class": "Image",
 "height": 510,
 "paddingLeft": 0,
 "verticalAlign": "top",
 "scaleMode": "fit_inside",
 "data": {
  "name": "Image7152"
 },
 "paddingTop": 0
},
{
 "id": "effect_CFAE9315_D4A4_B3DC_41D1_98C2EE0D38AF",
 "class": "FadeInEffect",
 "easing": "linear",
 "duration": 500
},
{
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#000000",
 "id": "Container_CE48C64D_D45B_B24C_41D0_953DAB8E95D7",
 "left": "0%",
 "children": [
  "this.Container_CE75A5EC_D45B_B64C_41E3_1F4B3B63A1D1"
 ],
 "layout": "absolute",
 "backgroundOpacity": 0.6,
 "right": "0%",
 "shadow": false,
 "minHeight": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "gap": 10,
 "minWidth": 1,
 "borderRadius": 0,
 "backgroundColorDirection": "vertical",
 "bottom": "0%",
 "paddingRight": 0,
 "paddingBottom": 0,
 "top": "0%",
 "class": "Container",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "paddingLeft": 0,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "verticalAlign": "top",
 "overflow": "scroll",
 "scrollBarVisible": "rollOver",
 "visible": false,
 "contentOpaque": false,
 "data": {
  "name": "\ud64d\ucf69 \uc12c"
 },
 "paddingTop": 0,
 "scrollBarWidth": 10
},
{
 "propagateClick": true,
 "scrollBarColor": "#E73B2C",
 "id": "Container_C84B95AA_D45F_56F4_41D6_72533EA0485E",
 "backgroundOpacity": 0,
 "children": [
  "this.Image_C843F5AB_D45F_56F4_41E9_4C0BFE490491",
  "this.Button_C84365AC_D45F_56CC_41E9_BF7B66F3993F"
 ],
 "layout": "vertical",
 "minHeight": 615,
 "shadow": false,
 "borderSize": 0,
 "width": "95.327%",
 "horizontalAlign": "right",
 "gap": 40,
 "minWidth": 510,
 "maxWidth": 510,
 "borderRadius": 0,
 "maxHeight": 615,
 "paddingBottom": 0,
 "paddingRight": 0,
 "class": "Container",
 "height": 615,
 "paddingLeft": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.79,
 "overflow": "scroll",
 "verticalAlign": "top",
 "data": {
  "name": "Container text"
 },
 "paddingTop": 25,
 "scrollBarWidth": 10
},
{
 "propagateClick": false,
 "id": "Image_DE556639_CFF1_8738_41BA_BCB33135F1C9",
 "backgroundOpacity": 0,
 "width": 510,
 "minHeight": 510,
 "shadow": false,
 "borderSize": 0,
 "horizontalAlign": "center",
 "url": "skin/Image_DE556639_CFF1_8738_41BA_BCB33135F1C9.png",
 "minWidth": 510,
 "borderRadius": 0,
 "maxWidth": 510,
 "maxHeight": 510,
 "paddingBottom": 0,
 "paddingRight": 0,
 "class": "Image",
 "height": 510,
 "paddingLeft": 0,
 "verticalAlign": "top",
 "scaleMode": "fit_inside",
 "data": {
  "name": "Image7152"
 },
 "paddingTop": 0
},
{
 "id": "effect_D6DC269E_D96A_9F23_41EA_F8A76839351D",
 "class": "FadeInEffect",
 "easing": "linear",
 "duration": 500
},
{
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "id": "Container_C83D25AD_D45F_56CC_41D7_59D101C68187",
 "backgroundOpacity": 0,
 "width": 25,
 "layout": "horizontal",
 "minHeight": 640,
 "children": [
  "this.IconButton_C83F15AD_D45F_56CC_41E0_CE5835F90A19"
 ],
 "shadow": false,
 "borderSize": 0,
 "horizontalAlign": "left",
 "gap": 10,
 "minWidth": 25,
 "borderRadius": 0,
 "maxWidth": 25,
 "maxHeight": 640,
 "paddingBottom": 0,
 "paddingRight": 0,
 "class": "Container",
 "height": 640,
 "paddingLeft": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "overflow": "scroll",
 "verticalAlign": "top",
 "data": {
  "name": "Container10029"
 },
 "scrollBarWidth": 10,
 "paddingTop": 8
},
{
 "propagateClick": false,
 "backgroundColorRatios": [
  0
 ],
 "id": "WebFrame_CD7D3A38_D464_DDC9_41D0_B23FB0025BE6",
 "left": "0%",
 "backgroundOpacity": 1,
 "right": "0%",
 "shadow": false,
 "minHeight": 590,
 "borderSize": 0,
 "url": "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10501.099585939326!2d2.3499021!3d48.8529682!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x36401da7abfa068d!2z64W47Yq466W064u0IOuMgOyEseuLuQ!5e0!3m2!1sko!2skr!4v1575522936810!5m2!1sko!2skr",
 "minWidth": 415,
 "borderRadius": 0,
 "maxWidth": 415,
 "top": "0%",
 "maxHeight": 590,
 "bottom": "0%",
 "paddingRight": 0,
 "paddingBottom": 0,
 "class": "WebFrame",
 "backgroundColor": [
  "#FFFFFF"
 ],
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "insetBorder": false,
 "data": {
  "name": "WebFrame48191"
 },
 "paddingTop": 0,
 "scrollEnabled": true
},
{
 "propagateClick": false,
 "id": "IconButton_DF887EAF_CFB3_9CB8_41DD_7FB6D79C3851",
 "backgroundOpacity": 0,
 "width": 20,
 "minHeight": 20,
 "shadow": false,
 "borderSize": 0,
 "horizontalAlign": "center",
 "pressedIconURL": "skin/IconButton_CD714A40_D464_DDB4_41E1_355376A58CC4.png",
 "minWidth": 20,
 "borderRadius": 0,
 "maxWidth": 20,
 "maxHeight": 20,
 "paddingBottom": 0,
 "iconURL": "skin/IconButton_CD714A40_D464_DDB4_41E1_355376A58CC4.png",
 "mode": "push",
 "paddingRight": 0,
 "click": "this.setComponentVisibility(this.Container_DF884EAF_CFB3_9CB8_41E1_96BD47779950, false, 0, null, null, false)",
 "class": "IconButton",
 "height": 20,
 "paddingLeft": 0,
 "rollOverIconURL": "skin/IconButton_CD714A40_D464_DDB4_41E1_355376A58CC4_rollover.png",
 "verticalAlign": "middle",
 "transparencyActive": false,
 "data": {
  "name": "X"
 },
 "paddingTop": 0,
 "cursor": "hand"
},
{
 "propagateClick": true,
 "scrollBarColor": "#E73B2C",
 "id": "Container_CEC62E05_D45B_D5BF_41E1_81918B767C4D",
 "backgroundOpacity": 0,
 "children": [
  "this.Image_CEC60E05_D45B_D5BF_41E8_40BA5F12420E",
  "this.Button_CEC66E05_D45B_D5BF_41C4_5CE3A5954D82"
 ],
 "layout": "vertical",
 "minHeight": 615,
 "shadow": false,
 "borderSize": 0,
 "width": "95.327%",
 "horizontalAlign": "right",
 "gap": 40,
 "minWidth": 510,
 "maxWidth": 510,
 "borderRadius": 0,
 "maxHeight": 615,
 "paddingBottom": 0,
 "paddingRight": 0,
 "class": "Container",
 "height": 615,
 "paddingLeft": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.79,
 "overflow": "scroll",
 "verticalAlign": "top",
 "data": {
  "name": "Container text"
 },
 "paddingTop": 25,
 "scrollBarWidth": 10
},
{
 "items": [
  {
   "media": "this.video_C0133211_D010_F8A8_41E1_F3D0BE326121",
   "start": "this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9FVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.ThumbnailList_C35F2980_D8AD_AC81_41EA_527CBF21FD96_playlist, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.ThumbnailList_C35F2980_D8AD_AC81_41EA_527CBF21FD96_playlist, 0)",
   "begin": "this.fixTogglePlayPauseButton(this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9FVideoPlayer); this.setEndToItemIndex(this.ThumbnailList_C35F2980_D8AD_AC81_41EA_527CBF21FD96_playlist, 0, 1)",
   "player": "this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9FVideoPlayer",
   "class": "VideoPlayListItem"
  },
  {
   "media": "this.video_C1829366_D467_B27C_41E9_19C9C2A3F092",
   "start": "this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9FVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.ThumbnailList_C35F2980_D8AD_AC81_41EA_527CBF21FD96_playlist, 1, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.ThumbnailList_C35F2980_D8AD_AC81_41EA_527CBF21FD96_playlist, 1)",
   "begin": "this.fixTogglePlayPauseButton(this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9FVideoPlayer); this.setEndToItemIndex(this.ThumbnailList_C35F2980_D8AD_AC81_41EA_527CBF21FD96_playlist, 1, 2)",
   "player": "this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9FVideoPlayer",
   "class": "VideoPlayListItem"
  },
  {
   "media": "this.video_CF707DF7_D45C_B65B_41E7_784CD9E6AFA8",
   "start": "this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9FVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.ThumbnailList_C35F2980_D8AD_AC81_41EA_527CBF21FD96_playlist, 2, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.ThumbnailList_C35F2980_D8AD_AC81_41EA_527CBF21FD96_playlist, 2)",
   "begin": "this.fixTogglePlayPauseButton(this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9FVideoPlayer); this.setEndToItemIndex(this.ThumbnailList_C35F2980_D8AD_AC81_41EA_527CBF21FD96_playlist, 2, 3)",
   "player": "this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9FVideoPlayer",
   "class": "VideoPlayListItem"
  },
  {
   "media": "this.video_CF5244B4_D45C_D6DC_41E3_A9007FF4A5DE",
   "start": "this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9FVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.ThumbnailList_C35F2980_D8AD_AC81_41EA_527CBF21FD96_playlist, 3, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.ThumbnailList_C35F2980_D8AD_AC81_41EA_527CBF21FD96_playlist, 3)",
   "begin": "this.fixTogglePlayPauseButton(this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9FVideoPlayer); this.setEndToItemIndex(this.ThumbnailList_C35F2980_D8AD_AC81_41EA_527CBF21FD96_playlist, 3, 4)",
   "player": "this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9FVideoPlayer",
   "class": "VideoPlayListItem"
  },
  {
   "media": "this.video_CDF6AB4F_D45C_D24B_41DB_2FC7C8BB91F3",
   "start": "this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9FVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.ThumbnailList_C35F2980_D8AD_AC81_41EA_527CBF21FD96_playlist, 4, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.ThumbnailList_C35F2980_D8AD_AC81_41EA_527CBF21FD96_playlist, 4)",
   "begin": "this.fixTogglePlayPauseButton(this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9FVideoPlayer); this.setEndToItemIndex(this.ThumbnailList_C35F2980_D8AD_AC81_41EA_527CBF21FD96_playlist, 4, 0)",
   "player": "this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9FVideoPlayer",
   "class": "VideoPlayListItem"
  }
 ],
 "id": "ThumbnailList_C35F2980_D8AD_AC81_41EA_527CBF21FD96_playlist",
 "class": "PlayList"
},
{
 "propagateClick": true,
 "backgroundColorRatios": [
  0
 ],
 "scrollBarColor": "#0069A3",
 "id": "Container_CEC6CE05_D45B_D5BF_41E9_50C81FA527D2",
 "backgroundOpacity": 1,
 "width": 535,
 "layout": "horizontal",
 "minHeight": 640,
 "children": [
  "this.Container_CEC62E05_D45B_D5BF_41E1_81918B767C4D"
 ],
 "shadow": false,
 "borderSize": 0,
 "horizontalAlign": "left",
 "gap": 0,
 "minWidth": 535,
 "maxWidth": 535,
 "borderRadius": 0,
 "maxHeight": 640,
 "paddingRight": 0,
 "paddingBottom": 25,
 "class": "Container",
 "backgroundColor": [
  "#FFFFFF"
 ],
 "paddingLeft": 25,
 "backgroundColorDirection": "vertical",
 "height": "100%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.51,
 "overflow": "visible",
 "verticalAlign": "top",
 "data": {
  "name": "-right"
 },
 "paddingTop": 0,
 "scrollBarWidth": 10
},
{
 "propagateClick": false,
 "id": "IconButton_CE65D5EF_D45B_B64C_41E6_41B5274E0E70",
 "backgroundOpacity": 0,
 "width": 20,
 "minHeight": 20,
 "shadow": false,
 "borderSize": 0,
 "horizontalAlign": "center",
 "minWidth": 20,
 "borderRadius": 0,
 "maxWidth": 20,
 "maxHeight": 20,
 "paddingBottom": 0,
 "iconURL": "skin/IconButton_CD714A40_D464_DDB4_41E1_355376A58CC4.png",
 "mode": "push",
 "paddingRight": 0,
 "click": "this.setComponentVisibility(this.Container_CE48C64D_D45B_B24C_41D0_953DAB8E95D7, false, 0, null, null, false)",
 "class": "IconButton",
 "height": 20,
 "paddingLeft": 0,
 "rollOverIconURL": "skin/IconButton_CD714A40_D464_DDB4_41E1_355376A58CC4_rollover.png",
 "verticalAlign": "middle",
 "transparencyActive": false,
 "pressedRollOverIconURL": "skin/IconButton_CD714A40_D464_DDB4_41E1_355376A58CC4.png",
 "data": {
  "name": "X"
 },
 "paddingTop": 0,
 "cursor": "hand"
},
{
 "propagateClick": false,
 "id": "MainViewer",
 "left": 0,
 "playbackBarProgressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "progressBarBorderRadius": 0,
 "progressRight": 0,
 "minHeight": 50,
 "width": "100%",
 "playbackBarBackgroundOpacity": 1,
 "shadow": false,
 "progressBorderRadius": 0,
 "toolTipTextShadowColor": "#000000",
 "borderSize": 0,
 "toolTipPaddingBottom": 4,
 "playbackBarHeight": 20,
 "playbackBarBorderSize": 0,
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowVerticalLength": 0,
 "progressHeight": 10,
 "borderRadius": 0,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "displayTooltipInTouchScreens": true,
 "progressBackgroundColorRatios": [
  0
 ],
 "toolTipTextShadowOpacity": 0,
 "paddingRight": 0,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipFontColor": "#606060",
 "playbackBarBottom": 10,
 "toolTipBorderColor": "#767676",
 "class": "ViewerArea",
 "playbackBarLeft": 0,
 "playbackBarHeadShadow": true,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingTop": 4,
 "toolTipShadowColor": "#333333",
 "height": "100%",
 "playbackBarProgressBackgroundColor": [
  "#FF0000"
 ],
 "toolTipOpacity": 1,
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipShadowVerticalLength": 0,
 "progressBarBorderColor": "#000000",
 "progressBorderSize": 0,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarRight": 0,
 "vrPointerColor": "#FFFFFF",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "transitionDuration": 500,
 "vrPointerSelectionTime": 2000,
 "toolTipBorderRadius": 3,
 "toolTipBorderSize": 1,
 "progressOpacity": 1,
 "firstTransitionDuration": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "toolTipPaddingLeft": 6,
 "toolTipShadowSpread": 0,
 "minWidth": 100,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipShadowOpacity": 1,
 "toolTipFontSize": "2vmin",
 "toolTipDisplayTime": 600,
 "progressBarBorderSize": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipShadowHorizontalLength": 0,
 "progressBorderColor": "#000000",
 "top": 0,
 "paddingBottom": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadOpacity": 1,
 "playbackBarHeadBorderColor": "#000000",
 "toolTipFontStyle": "normal",
 "playbackBarHeadBorderRadius": 0,
 "paddingLeft": 0,
 "playbackBarHeadHeight": 15,
 "transitionMode": "blending",
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipShadowBlurRadius": 3,
 "playbackBarBackgroundColor": [
  "#000000"
 ],
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "toolTipFontFamily": "나눔고딕",
 "progressBarOpacity": 1,
 "progressBackgroundOpacity": 1,
 "progressBottom": 0,
 "playbackBarProgressBorderRadius": 0,
 "progressLeft": 0,
 "toolTipFontWeight": "normal",
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "playbackBarProgressBorderSize": 0,
 "paddingTop": 0,
 "toolTipPaddingRight": 6,
 "data": {
  "name": "Main Viewer"
 },
 "playbackBarHeadShadowColor": "#000000"
},
{
 "label": "\ud64d\ucf69 \uc12c",
 "scaleMode": "fit_inside",
 "class": "Video",
 "width": 1920,
 "thumbnailUrl": "media/video_CDF6AB4F_D45C_D24B_41DB_2FC7C8BB91F3_t.jpg",
 "loop": false,
 "id": "video_CDF6AB4F_D45C_D24B_41DB_2FC7C8BB91F3",
 "height": 1080,
 "video": {
  "width": 1920,
  "mp4Url": "media/video_CDF6AB4F_D45C_D24B_41DB_2FC7C8BB91F3.mp4",
  "class": "VideoResource",
  "height": 1080
 }
},
{
 "id": "effect_D6364346_D976_7523_41D2_2952E124FEC3",
 "class": "FadeInEffect",
 "easing": "linear",
 "duration": 500
},
{
 "propagateClick": true,
 "scrollBarColor": "#E73B2C",
 "id": "Container_CE7345ED_D45B_B64C_41D8_F572A1AAD5D2",
 "backgroundOpacity": 0,
 "children": [
  "this.Image_CE6C05EE_D45B_B64C_41D5_FCE9CCDD944A",
  "this.Button_CE6C15EE_D45B_B64C_41D1_90C5993EDBE0"
 ],
 "layout": "vertical",
 "minHeight": 615,
 "shadow": false,
 "borderSize": 0,
 "width": "95.327%",
 "horizontalAlign": "right",
 "gap": 40,
 "minWidth": 510,
 "maxWidth": 510,
 "borderRadius": 0,
 "maxHeight": 615,
 "paddingBottom": 0,
 "paddingRight": 0,
 "class": "Container",
 "height": 615,
 "paddingLeft": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.79,
 "overflow": "scroll",
 "verticalAlign": "top",
 "data": {
  "name": "Container text"
 },
 "paddingTop": 25,
 "scrollBarWidth": 10
},
{
 "propagateClick": false,
 "id": "Image_CD7DFA3E_D464_DDCC_41D9_918F531A3D17",
 "backgroundOpacity": 0,
 "width": 510,
 "minHeight": 510,
 "shadow": false,
 "borderSize": 0,
 "horizontalAlign": "center",
 "url": "skin/Image_CD7DFA3E_D464_DDCC_41D9_918F531A3D17.png",
 "minWidth": 510,
 "borderRadius": 0,
 "maxWidth": 510,
 "maxHeight": 510,
 "paddingBottom": 0,
 "paddingRight": 0,
 "class": "Image",
 "height": 510,
 "paddingLeft": 0,
 "verticalAlign": "top",
 "scaleMode": "fit_inside",
 "data": {
  "name": "Image7152"
 },
 "paddingTop": 0
},
{
 "label": "\uc2dc\ub4dc\ub2c8 \uc624\ud398\ub77c \ud558\uc6b0\uc2a4",
 "scaleMode": "fit_inside",
 "class": "Video",
 "width": 1920,
 "thumbnailUrl": "media/video_C0133211_D010_F8A8_41E1_F3D0BE326121_t.jpg",
 "loop": false,
 "id": "video_C0133211_D010_F8A8_41E1_F3D0BE326121",
 "height": 1080,
 "video": {
  "width": 1920,
  "mp4Url": "media/video_C0133211_D010_F8A8_41E1_F3D0BE326121.mp4",
  "class": "VideoResource",
  "height": 1080
 }
},
{
 "propagateClick": false,
 "backgroundColorRatios": [
  0
 ],
 "id": "WebFrame_DF8BEEAF_CFB3_9CB8_41E5_A4F1DC38D43C",
 "left": "0%",
 "backgroundOpacity": 1,
 "right": "0%",
 "shadow": false,
 "minHeight": 590,
 "borderSize": 0,
 "url": "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13253.102891379987!2d151.2152967!3d-33.8567844!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x3133f8d75a1ac251!2z7Iuc65Oc64uIIOyYpO2OmOudvCDtlZjsmrDsiqQ!5e0!3m2!1sko!2skr!4v1575443186359!5m2!1sko!2skr",
 "minWidth": 415,
 "borderRadius": 0,
 "maxWidth": 415,
 "top": "0%",
 "maxHeight": 590,
 "bottom": "0%",
 "paddingRight": 0,
 "paddingBottom": 0,
 "class": "WebFrame",
 "backgroundColor": [
  "#FFFFFF"
 ],
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "insetBorder": false,
 "data": {
  "name": "WebFrame48191"
 },
 "paddingTop": 0,
 "scrollEnabled": true
},
{
 "propagateClick": true,
 "backgroundColorRatios": [
  0
 ],
 "scrollBarColor": "#000000",
 "id": "Container_CEC68E04_D45B_D5BD_41B3_9D97F857C4E6",
 "backgroundOpacity": 1,
 "children": [
  "this.WebFrame_CEC6EE04_D45B_D5BD_41E9_063F637268CE"
 ],
 "layout": "absolute",
 "minHeight": 640,
 "shadow": false,
 "borderSize": 0,
 "width": "44%",
 "horizontalAlign": "center",
 "gap": 10,
 "minWidth": 440,
 "maxWidth": 440,
 "borderRadius": 0,
 "maxHeight": 640,
 "paddingRight": 0,
 "paddingBottom": 25,
 "class": "Container",
 "backgroundColor": [
  "#FFFFFF"
 ],
 "paddingLeft": 25,
 "backgroundColorDirection": "vertical",
 "height": "100%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "overflow": "scroll",
 "verticalAlign": "middle",
 "data": {
  "name": "-left"
 },
 "paddingTop": 25,
 "scrollBarWidth": 10
},
{
 "propagateClick": false,
 "id": "IconButton_C0DF5EFD_CFB0_9C99_41E7_39141CDC7093",
 "backgroundOpacity": 0,
 "width": 40,
 "minHeight": 0,
 "shadow": false,
 "borderSize": 0,
 "horizontalAlign": "center",
 "pressedIconURL": "skin/IconButton_C0DF5EFD_CFB0_9C99_41E7_39141CDC7093_pressed.png",
 "minWidth": 0,
 "borderRadius": 0,
 "iconURL": "skin/IconButton_C0DF5EFD_CFB0_9C99_41E7_39141CDC7093.png",
 "paddingBottom": 0,
 "mode": "push",
 "paddingRight": 0,
 "click": "this.setComponentVisibility(this.Container_C0032120_CFB0_85A8_41D1_BBFE7EB19031, false, 0, null, null, false); this.setComponentVisibility(this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9F, false, 0, null, null, false); this.setComponentVisibility(this.IconButton_C498B5E8_D955_A481_41E4_0908F4C0133A, true, 0, this.effect_C5CAA04E_D9DD_9B81_41CD_FB1F5F81A69A, 'showEffect', false); this.setComponentVisibility(this.Container_C5BF9EE0_D9EE_A480_41E6_73AEE2103F66, true, 0, this.effect_C5CAA04E_D9DD_9B81_41CD_FB1F5F81A69A, 'showEffect', false)",
 "class": "IconButton",
 "paddingLeft": 0,
 "rollOverIconURL": "skin/IconButton_C0DF5EFD_CFB0_9C99_41E7_39141CDC7093_rollover.png",
 "height": 40,
 "verticalAlign": "middle",
 "transparencyActive": true,
 "pressedRollOverIconURL": "skin/IconButton_C0DF5EFD_CFB0_9C99_41E7_39141CDC7093_pressed.png",
 "data": {
  "name": "Exit"
 },
 "paddingTop": 0,
 "cursor": "hand"
},
{
 "id": "effect_C5CAA04E_D9DD_9B81_41CD_FB1F5F81A69A",
 "class": "FadeInEffect",
 "easing": "linear",
 "duration": 500
},
{
 "id": "effect_CF8455D5_D4AB_565F_41E8_1CDCACC3C1BD",
 "class": "FadeInEffect",
 "easing": "linear",
 "duration": 500
},
{
 "propagateClick": false,
 "id": "ThumbnailList_C35F2980_D8AD_AC81_41EA_527CBF21FD96",
 "backgroundOpacity": 0,
 "width": 1535,
 "minHeight": 20,
 "itemThumbnailBorderRadius": 5,
 "itemThumbnailHeight": 40,
 "shadow": false,
 "borderSize": 0,
 "gap": 5,
 "itemThumbnailScaleMode": "fit_outside",
 "itemThumbnailShadowBlurRadius": 8,
 "itemThumbnailShadow": true,
 "borderRadius": 5,
 "itemBackgroundColorDirection": "vertical",
 "itemThumbnailShadowHorizontalLength": 3,
 "itemBorderRadius": 0,
 "itemThumbnailShadowColor": "#000000",
 "itemThumbnailShadowVerticalLength": 3,
 "paddingRight": 0,
 "itemMode": "normal",
 "itemPaddingBottom": 3,
 "class": "ThumbnailList",
 "height": 100,
 "scrollBarVisible": "rollOver",
 "itemLabelGap": 12,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "itemBackgroundOpacity": 0,
 "itemLabelPosition": "bottom",
 "itemVerticalAlign": "middle",
 "itemPaddingLeft": 3,
 "itemPaddingRight": 3,
 "itemLabelFontStyle": "normal",
 "itemOpacity": 1,
 "itemThumbnailOpacity": 1,
 "scrollBarColor": "#FFFFFF",
 "layout": "horizontal",
 "itemPaddingTop": 3,
 "playList": "this.ThumbnailList_C35F2980_D8AD_AC81_41EA_527CBF21FD96_playlist",
 "horizontalAlign": "left",
 "itemThumbnailShadowOpacity": 0.54,
 "minWidth": 20,
 "itemLabelHorizontalAlign": "center",
 "itemLabelFontColor": "#FFFFFF",
 "rollOverItemBackgroundOpacity": 0,
 "rollOverItemLabelFontColor": "#FFCC00",
 "paddingBottom": 0,
 "itemBackgroundColorRatios": [],
 "itemThumbnailShadowSpread": 1,
 "click": "this.setComponentVisibility(this.Container_C0032120_CFB0_85A8_41D1_BBFE7EB19031, true, 0, this.effect_C483A9AE_D9D3_EC81_41C7_90A211984883, 'showEffect', false); this.setComponentVisibility(this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9F, true, 0, this.effect_C483A9AE_D9D3_EC81_41C7_90A211984883, 'showEffect', false)",
 "paddingLeft": 0,
 "rollOverItemLabelFontSize": "15px",
 "selectedItemLabelFontWeight": "bold",
 "rollOverItemLabelFontWeight": "normal",
 "verticalAlign": "top",
 "itemBackgroundColor": [],
 "selectedItemLabelFontColor": "#FF6600",
 "itemHorizontalAlign": "center",
 "visible": false,
 "scrollBarWidth": 10,
 "itemLabelFontWeight": "normal",
 "itemLabelTextDecoration": "none",
 "itemLabelFontFamily": "나눔바른고딕",
 "itemLabelFontSize": "15px",
 "data": {
  "name": "ThumbnailList35762"
 },
 "paddingTop": 0
},
{
 "viewerArea": "this.MainViewer",
 "displayPlaybackBar": true,
 "mouseControlMode": "drag_rotation",
 "gyroscopeVerticalDraggingEnabled": true,
 "touchControlMode": "drag_rotation",
 "id": "MainViewerPanoramaPlayer",
 "class": "PanoramaPlayer",
 "buttonStop": "this.IconButton_C0DF5EFD_CFB0_9C99_41E7_39141CDC7093"
},
{
 "propagateClick": true,
 "backgroundColorRatios": [
  0
 ],
 "scrollBarColor": "#0069A3",
 "id": "Container_CD7D0A3D_D464_DDCC_41E4_7B6D286BF971",
 "backgroundOpacity": 1,
 "width": 535,
 "layout": "horizontal",
 "minHeight": 640,
 "children": [
  "this.Container_CD7D5A3E_D464_DDCC_41CF_3F376881371A"
 ],
 "shadow": false,
 "borderSize": 0,
 "horizontalAlign": "left",
 "gap": 0,
 "minWidth": 535,
 "maxWidth": 535,
 "borderRadius": 0,
 "maxHeight": 640,
 "paddingRight": 0,
 "paddingBottom": 25,
 "class": "Container",
 "backgroundColor": [
  "#FFFFFF"
 ],
 "paddingLeft": 25,
 "backgroundColorDirection": "vertical",
 "height": "100%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.51,
 "overflow": "visible",
 "verticalAlign": "top",
 "data": {
  "name": "-right"
 },
 "paddingTop": 0,
 "scrollBarWidth": 10
},
{
 "propagateClick": false,
 "backgroundColorRatios": [
  0
 ],
 "id": "WebFrame_C84845A5_D45F_56FC_41E5_8D4D6040982D",
 "left": "0%",
 "backgroundOpacity": 1,
 "right": "0%",
 "shadow": false,
 "minHeight": 590,
 "borderSize": 0,
 "url": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d825357.4397416194!2d-113.40494743372912!3d36.092208251220214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x873312ae759b4d15%3A0x1f38a9bec9912029!2z6re4656c65OcIOy6kOuLiOyWuCDqta3rpr3qs7Xsm5A!5e0!3m2!1sko!2skr!4v1575523084799!5m2!1sko!2skr",
 "minWidth": 415,
 "borderRadius": 0,
 "maxWidth": 415,
 "top": "0%",
 "maxHeight": 590,
 "bottom": "0%",
 "paddingRight": 0,
 "paddingBottom": 0,
 "class": "WebFrame",
 "backgroundColor": [
  "#FFFFFF"
 ],
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "insetBorder": false,
 "data": {
  "name": "WebFrame48191"
 },
 "paddingTop": 0,
 "scrollEnabled": true
},
{
 "label": "\ub178\ud2b8\ub974\ub2f4 \ub300\uc131\ub2f9",
 "scaleMode": "fit_inside",
 "class": "Video",
 "width": 1920,
 "thumbnailUrl": "media/video_C1829366_D467_B27C_41E9_19C9C2A3F092_t.jpg",
 "loop": false,
 "id": "video_C1829366_D467_B27C_41E9_19C9C2A3F092",
 "height": 1080,
 "video": {
  "width": 1920,
  "mp4Url": "media/video_C1829366_D467_B27C_41E9_19C9C2A3F092.mp4",
  "class": "VideoResource",
  "height": 1080
 }
},
{
 "textDecoration": "none",
 "propagateClick": false,
 "shadowVerticalLength": 0,
 "id": "Button_CEC66E05_D45B_D5BF_41C4_5CE3A5954D82",
 "backgroundOpacity": 0,
 "width": 136,
 "layout": "horizontal",
 "shadowColor": "#000000",
 "backgroundColorRatios": [
  0
 ],
 "minHeight": 40,
 "shadow": true,
 "borderSize": 0,
 "horizontalAlign": "center",
 "gap": 5,
 "fontFamily": "Noto Sans CJK KR Bold",
 "minWidth": 136,
 "maxWidth": 136,
 "borderRadius": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "borderColor": "#000000",
 "maxHeight": 40,
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingRight": 0,
 "paddingBottom": 0,
 "iconBeforeLabel": true,
 "iconURL": "skin/Button_CEC66E05_D45B_D5BF_41C4_5CE3A5954D82.png",
 "mode": "push",
 "shadowBlurRadius": 6,
 "label": "\uc601\uc0c1 \ubcf4\uae30",
 "class": "Button",
 "height": 40,
 "fontSize": "20px",
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "shadowSpread": 1,
 "backgroundColor": [
  "#04A3E1"
 ],
 "rollOverBackgroundOpacity": 0,
 "fontStyle": "normal",
 "verticalAlign": "middle",
 "shadowHorizontalLength": 3,
 "pressedBackgroundOpacity": 0,
 "click": "this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9F.bind('hide', function(e){ e.source.unbind('hide', arguments.callee, this); this.playList_C2D62C8E_DA45_58FB_41E1_FC032829DF4E.set('selectedIndex', -1); }, this); this.playList_C2D62C8E_DA45_58FB_41E1_FC032829DF4E.set('selectedIndex', 0); this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9FVideoPlayer.play(); this.setComponentVisibility(this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9F, true, 0, this.effect_D6FEF68E_D969_9F23_41E6_46DA078E85E8, 'showEffect', false); this.setComponentVisibility(this.Container_C0032120_CFB0_85A8_41D1_BBFE7EB19031, true, 0, this.effect_D6FEF68E_D969_9F23_41E6_46DA078E85E8, 'showEffect', false)",
 "iconHeight": 30,
 "shadowOpacity": 0,
 "fontColor": "#333333",
 "iconWidth": 30,
 "fontWeight": "normal",
 "paddingTop": 0,
 "cursor": "hand",
 "data": {
  "name": "Button"
 }
},
{
 "viewerArea": "this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9F",
 "displayPlaybackBar": true,
 "buttonPlayPause": "this.IconButton_C8A53112_D8D5_BD81_41E8_75636581D7AF",
 "id": "ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9FVideoPlayer",
 "class": "VideoPlayer",
 "buttonStop": "this.IconButton_C0DF5EFD_CFB0_9C99_41E7_39141CDC7093"
},
{
 "textDecoration": "none",
 "propagateClick": false,
 "shadowVerticalLength": 0,
 "id": "Button_C84365AC_D45F_56CC_41E9_BF7B66F3993F",
 "backgroundOpacity": 0,
 "width": 136,
 "layout": "horizontal",
 "shadowColor": "#000000",
 "backgroundColorRatios": [
  0
 ],
 "minHeight": 40,
 "shadow": true,
 "borderSize": 0,
 "horizontalAlign": "center",
 "gap": 5,
 "fontFamily": "Noto Sans CJK KR Bold",
 "minWidth": 136,
 "maxWidth": 136,
 "borderRadius": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "borderColor": "#000000",
 "maxHeight": 40,
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingRight": 0,
 "paddingBottom": 0,
 "iconBeforeLabel": true,
 "iconURL": "skin/Button_CEC66E05_D45B_D5BF_41C4_5CE3A5954D82.png",
 "mode": "push",
 "shadowBlurRadius": 6,
 "label": "\uc601\uc0c1 \ubcf4\uae30",
 "class": "Button",
 "height": 40,
 "fontSize": "20px",
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "shadowSpread": 1,
 "backgroundColor": [
  "#04A3E1"
 ],
 "rollOverBackgroundOpacity": 0,
 "fontStyle": "normal",
 "verticalAlign": "middle",
 "shadowHorizontalLength": 3,
 "pressedBackgroundOpacity": 0,
 "click": "this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9F.bind('hide', function(e){ e.source.unbind('hide', arguments.callee, this); this.playList_C2D6DC8E_DA45_58FB_41E1_3473F2472228.set('selectedIndex', -1); }, this); this.playList_C2D6DC8E_DA45_58FB_41E1_3473F2472228.set('selectedIndex', 0); this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9FVideoPlayer.play(); this.setComponentVisibility(this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9F, true, 0, this.effect_D6358D36_D969_8D63_41E3_F75C817FF723, 'showEffect', false); this.setComponentVisibility(this.Container_C0032120_CFB0_85A8_41D1_BBFE7EB19031, true, 0, this.effect_D6358D36_D969_8D63_41E3_F75C817FF723, 'showEffect', false)",
 "iconHeight": 30,
 "shadowOpacity": 0,
 "fontColor": "#333333",
 "iconWidth": 30,
 "fontWeight": "normal",
 "paddingTop": 0,
 "cursor": "hand",
 "data": {
  "name": "Button"
 }
},
{
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "id": "Container_C0032120_CFB0_85A8_41D1_BBFE7EB19031",
 "left": "0%",
 "children": [
  "this.IconButton_C8A53112_D8D5_BD81_41E8_75636581D7AF",
  "this.IconButton_6E599476_7CD6_3169_41DB_650F1AEAFBAB",
  "this.IconButton_C0DF5EFD_CFB0_9C99_41E7_39141CDC7093"
 ],
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "minHeight": 1,
 "shadow": false,
 "borderSize": 0,
 "width": "100%",
 "horizontalAlign": "right",
 "gap": 3,
 "minWidth": 1,
 "borderRadius": 0,
 "bottom": "90%",
 "paddingRight": 20,
 "paddingBottom": 0,
 "top": "0%",
 "class": "Container",
 "paddingLeft": 0,
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "verticalAlign": "middle",
 "overflow": "scroll",
 "visible": false,
 "contentOpaque": false,
 "data": {
  "name": "Media_Control"
 },
 "paddingTop": 0,
 "scrollBarWidth": 10
},
{
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
 "partial": true,
 "vfov": 17.05,
 "frames": [
  {
   "thumbnailUrl": "media/panorama_80D13AEC_8D09_AEB1_41D9_2DF9BEE19E00_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_80D13AEC_8D09_AEB1_41D9_2DF9BEE19E00_0/f/0/{row}_{column}.jpg",
      "colCount": 49,
      "width": 25088,
      "rowCount": 49,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 25088
     },
     {
      "url": "media/panorama_80D13AEC_8D09_AEB1_41D9_2DF9BEE19E00_0/f/1/{row}_{column}.jpg",
      "colCount": 25,
      "width": 12800,
      "rowCount": 25,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 12800
     },
     {
      "url": "media/panorama_80D13AEC_8D09_AEB1_41D9_2DF9BEE19E00_0/f/2/{row}_{column}.jpg",
      "colCount": 13,
      "width": 6656,
      "rowCount": 13,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 6656
     },
     {
      "url": "media/panorama_80D13AEC_8D09_AEB1_41D9_2DF9BEE19E00_0/f/3/{row}_{column}.jpg",
      "colCount": 7,
      "width": 3584,
      "rowCount": 7,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 3584
     },
     {
      "url": "media/panorama_80D13AEC_8D09_AEB1_41D9_2DF9BEE19E00_0/f/4/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_80D13AEC_8D09_AEB1_41D9_2DF9BEE19E00_0/f/5/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_80D13AEC_8D09_AEB1_41D9_2DF9BEE19E00_0/f/6/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "label": "World Map",
 "hfov": 30,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_80D13AEC_8D09_AEB1_41D9_2DF9BEE19E00_t.jpg",
 "id": "panorama_80D13AEC_8D09_AEB1_41D9_2DF9BEE19E00",
 "pitch": 0,
 "hfovMax": 15
},
{
 "propagateClick": false,
 "id": "IconButton_C83F15AD_D45F_56CC_41E0_CE5835F90A19",
 "backgroundOpacity": 0,
 "width": 20,
 "minHeight": 20,
 "shadow": false,
 "borderSize": 0,
 "horizontalAlign": "center",
 "pressedIconURL": "skin/IconButton_CD714A40_D464_DDB4_41E1_355376A58CC4.png",
 "minWidth": 20,
 "borderRadius": 0,
 "maxWidth": 20,
 "maxHeight": 20,
 "paddingBottom": 0,
 "iconURL": "skin/IconButton_CD714A40_D464_DDB4_41E1_355376A58CC4.png",
 "mode": "push",
 "paddingRight": 0,
 "click": "this.setComponentVisibility(this.Container_C8F21624_D45F_55FC_41E5_DE32E668F410, false, 0, null, null, false)",
 "class": "IconButton",
 "height": 20,
 "paddingLeft": 0,
 "rollOverIconURL": "skin/IconButton_CD714A40_D464_DDB4_41E1_355376A58CC4_rollover.png",
 "verticalAlign": "middle",
 "transparencyActive": false,
 "data": {
  "name": "X"
 },
 "paddingTop": 0,
 "cursor": "hand"
},
{
 "textDecoration": "none",
 "propagateClick": false,
 "shadowVerticalLength": 0,
 "id": "Button_DF8B8EAF_CFB3_9CB8_41E8_8D84B040D751",
 "backgroundOpacity": 0,
 "width": 136,
 "layout": "horizontal",
 "shadowColor": "#000000",
 "backgroundColorRatios": [
  0
 ],
 "minHeight": 40,
 "shadow": true,
 "borderSize": 0,
 "horizontalAlign": "center",
 "gap": 5,
 "fontFamily": "Noto Sans CJK KR Bold",
 "minWidth": 136,
 "maxWidth": 136,
 "borderRadius": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "borderColor": "#000000",
 "maxHeight": 40,
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingRight": 0,
 "paddingBottom": 0,
 "iconBeforeLabel": true,
 "iconURL": "skin/Button_CEC66E05_D45B_D5BF_41C4_5CE3A5954D82.png",
 "mode": "push",
 "shadowBlurRadius": 6,
 "label": "\uc601\uc0c1 \ubcf4\uae30",
 "class": "Button",
 "height": 40,
 "fontSize": "20px",
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "shadowSpread": 1,
 "backgroundColor": [
  "#04A3E1"
 ],
 "rollOverBackgroundOpacity": 0,
 "fontStyle": "normal",
 "verticalAlign": "middle",
 "shadowHorizontalLength": 3,
 "pressedBackgroundOpacity": 0,
 "click": "this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9F.bind('hide', function(e){ e.source.unbind('hide', arguments.callee, this); this.playList_C2D92C8E_DA45_58FB_41D5_F52955839E76.set('selectedIndex', -1); }, this); this.playList_C2D92C8E_DA45_58FB_41D5_F52955839E76.set('selectedIndex', 0); this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9FVideoPlayer.play(); this.setComponentVisibility(this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9F, true, 0, this.effect_D63A57C6_D96A_FD23_41CB_AADB3DD0A4E4, 'showEffect', false); this.setComponentVisibility(this.Container_C0032120_CFB0_85A8_41D1_BBFE7EB19031, true, 0, this.effect_D63A57C6_D96A_FD23_41CB_AADB3DD0A4E4, 'showEffect', false)",
 "iconHeight": 30,
 "shadowOpacity": 0,
 "fontColor": "#333333",
 "iconWidth": 30,
 "fontWeight": "normal",
 "paddingTop": 0,
 "cursor": "hand",
 "data": {
  "name": "Button"
 }
},
{
 "initialPosition": {
  "yaw": -2.15,
  "hfov": 10,
  "class": "PanoramaCameraPosition",
  "pitch": 2.94
 },
 "manualRotationSpeed": 600,
 "automaticZoomSpeed": 10,
 "id": "panorama_80D13AEC_8D09_AEB1_41D9_2DF9BEE19E00_camera",
 "class": "PanoramaCamera",
 "timeToIdle": 5000
},
{
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "id": "Container_CE6795EF_D45B_B64C_41D4_B9C44212B8A5",
 "backgroundOpacity": 0,
 "width": 25,
 "layout": "horizontal",
 "minHeight": 640,
 "children": [
  "this.IconButton_CE65D5EF_D45B_B64C_41E6_41B5274E0E70"
 ],
 "shadow": false,
 "borderSize": 0,
 "horizontalAlign": "left",
 "gap": 10,
 "minWidth": 25,
 "borderRadius": 0,
 "maxWidth": 25,
 "maxHeight": 640,
 "paddingBottom": 0,
 "paddingRight": 0,
 "class": "Container",
 "height": 640,
 "paddingLeft": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "overflow": "scroll",
 "verticalAlign": "top",
 "data": {
  "name": "Container10029"
 },
 "scrollBarWidth": 10,
 "paddingTop": 8
},
{
 "id": "effect_C37D5BAD_D465_B2CC_41DC_92D85B8EBC09",
 "class": "FadeInEffect",
 "easing": "linear",
 "duration": 500
},
{
 "textDecoration": "none",
 "propagateClick": false,
 "shadowVerticalLength": 0,
 "id": "Button_CD7F3A3E_D464_DDCC_41E1_75F26E4EE55C",
 "backgroundOpacity": 0,
 "width": 136,
 "layout": "horizontal",
 "shadowColor": "#000000",
 "backgroundColorRatios": [
  0
 ],
 "minHeight": 40,
 "shadow": true,
 "borderSize": 0,
 "horizontalAlign": "center",
 "gap": 5,
 "fontFamily": "Noto Sans CJK KR Bold",
 "minWidth": 136,
 "maxWidth": 136,
 "borderRadius": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "borderColor": "#000000",
 "maxHeight": 40,
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingRight": 0,
 "paddingBottom": 0,
 "iconBeforeLabel": true,
 "iconURL": "skin/Button_CEC66E05_D45B_D5BF_41C4_5CE3A5954D82.png",
 "mode": "push",
 "shadowBlurRadius": 6,
 "label": "\uc601\uc0c1 \ubcf4\uae30",
 "class": "Button",
 "height": 40,
 "fontSize": "20px",
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "shadowSpread": 1,
 "backgroundColor": [
  "#04A3E1"
 ],
 "rollOverBackgroundOpacity": 0,
 "fontStyle": "normal",
 "verticalAlign": "middle",
 "shadowHorizontalLength": 3,
 "pressedBackgroundOpacity": 0,
 "click": "this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9F.bind('hide', function(e){ e.source.unbind('hide', arguments.callee, this); this.playList_C2D68C8E_DA45_58FB_41CB_15D4D47A950F.set('selectedIndex', -1); }, this); this.playList_C2D68C8E_DA45_58FB_41CB_15D4D47A950F.set('selectedIndex', 0); this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9FVideoPlayer.play(); this.setComponentVisibility(this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9F, true, 0, this.effect_D6DC269E_D96A_9F23_41EA_F8A76839351D, 'showEffect', false); this.setComponentVisibility(this.Container_C0032120_CFB0_85A8_41D1_BBFE7EB19031, true, 0, this.effect_D6DC269E_D96A_9F23_41EA_F8A76839351D, 'showEffect', false)",
 "iconHeight": 30,
 "shadowOpacity": 0,
 "fontColor": "#333333",
 "iconWidth": 30,
 "fontWeight": "normal",
 "paddingTop": 0,
 "cursor": "hand",
 "data": {
  "name": "Button"
 }
},
{
 "label": "\uadf8\ub79c\ub4dc \uce90\ub2c8\uc5b8",
 "scaleMode": "fit_inside",
 "class": "Video",
 "width": 1920,
 "thumbnailUrl": "media/video_CF707DF7_D45C_B65B_41E7_784CD9E6AFA8_t.jpg",
 "loop": false,
 "id": "video_CF707DF7_D45C_B65B_41E7_784CD9E6AFA8",
 "height": 1080,
 "video": {
  "width": 1920,
  "mp4Url": "media/video_CF707DF7_D45C_B65B_41E7_784CD9E6AFA8.mp4",
  "class": "VideoResource",
  "height": 1080
 }
},
{
 "propagateClick": true,
 "backgroundColorRatios": [
  0
 ],
 "scrollBarColor": "#0069A3",
 "id": "Container_DF8BFEAF_CFB3_9CB8_41D4_93C42D97C6C6",
 "backgroundOpacity": 1,
 "width": 535,
 "layout": "horizontal",
 "minHeight": 640,
 "children": [
  "this.Container_DF8BDEAF_CFB3_9CB8_41DB_5660D40A3DEC"
 ],
 "shadow": false,
 "borderSize": 0,
 "horizontalAlign": "left",
 "gap": 0,
 "minWidth": 535,
 "maxWidth": 535,
 "borderRadius": 0,
 "maxHeight": 640,
 "paddingRight": 0,
 "paddingBottom": 25,
 "class": "Container",
 "backgroundColor": [
  "#FFFFFF"
 ],
 "paddingLeft": 25,
 "backgroundColorDirection": "vertical",
 "height": "100%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.51,
 "overflow": "visible",
 "verticalAlign": "top",
 "data": {
  "name": "-right"
 },
 "paddingTop": 0,
 "scrollBarWidth": 10
},
{
 "propagateClick": false,
 "backgroundColorRatios": [
  0
 ],
 "id": "WebFrame_CE73F5ED_D45B_B64C_41B3_F36834684B98",
 "left": "0%",
 "backgroundOpacity": 1,
 "right": "0%",
 "shadow": false,
 "minHeight": 590,
 "borderSize": 0,
 "url": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d70248.75444845893!2d114.14561646848594!3d22.278165529241498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3404002b7e463e87%3A0xe4c58f8e0fb01840!2z7ZmN7L2pIOyErA!5e0!3m2!1sko!2skr!4v1575523358822!5m2!1sko!2skr",
 "minWidth": 415,
 "borderRadius": 0,
 "maxWidth": 415,
 "top": "0%",
 "maxHeight": 590,
 "bottom": "0%",
 "paddingRight": 0,
 "paddingBottom": 0,
 "class": "WebFrame",
 "backgroundColor": [
  "#FFFFFF"
 ],
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "insetBorder": false,
 "data": {
  "name": "WebFrame48191"
 },
 "paddingTop": 0,
 "scrollEnabled": true
},
{
 "items": [
  {
   "media": "this.video_CF707DF7_D45C_B65B_41E7_784CD9E6AFA8",
   "start": "this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9FVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_C2D6DC8E_DA45_58FB_41E1_3473F2472228, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_C2D6DC8E_DA45_58FB_41E1_3473F2472228, 0)",
   "begin": "this.fixTogglePlayPauseButton(this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9FVideoPlayer)",
   "player": "this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9FVideoPlayer",
   "class": "VideoPlayListItem"
  }
 ],
 "id": "playList_C2D6DC8E_DA45_58FB_41E1_3473F2472228",
 "class": "PlayList"
},
{
 "items": [
  {
   "media": "this.video_CDF6AB4F_D45C_D24B_41DB_2FC7C8BB91F3",
   "start": "this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9FVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_C2D67C8F_DA45_58F9_41DA_C82D5FF0849A, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_C2D67C8F_DA45_58F9_41DA_C82D5FF0849A, 0)",
   "begin": "this.fixTogglePlayPauseButton(this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9FVideoPlayer)",
   "player": "this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9FVideoPlayer",
   "class": "VideoPlayListItem"
  }
 ],
 "id": "playList_C2D67C8F_DA45_58F9_41DA_C82D5FF0849A",
 "class": "PlayList"
},
{
 "id": "effect_CF7D6A2C_D4AB_DDCD_41E0_6C32E5CDBBE6",
 "class": "FadeInEffect",
 "easing": "linear",
 "duration": 500
},
{
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#000000",
 "id": "Container_CEA66E9F_D45B_D2CC_41E3_CB7218F7EE17",
 "left": "0%",
 "children": [
  "this.Container_CEC6AE04_D45B_D5BD_41DB_9BCAEDB54646"
 ],
 "layout": "absolute",
 "backgroundOpacity": 0.6,
 "right": "0%",
 "shadow": false,
 "minHeight": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "gap": 10,
 "minWidth": 1,
 "borderRadius": 0,
 "backgroundColorDirection": "vertical",
 "bottom": "0%",
 "paddingRight": 0,
 "paddingBottom": 0,
 "top": "0%",
 "class": "Container",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "paddingLeft": 0,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "verticalAlign": "top",
 "overflow": "scroll",
 "scrollBarVisible": "rollOver",
 "visible": false,
 "contentOpaque": false,
 "data": {
  "name": "\uc138\uc778\ud2b8 \ud57c\ub80c\uc2a4 \uc0b0"
 },
 "paddingTop": 0,
 "scrollBarWidth": 10
},
{
 "propagateClick": true,
 "backgroundColorRatios": [
  0
 ],
 "scrollBarColor": "#000000",
 "id": "Container_DF8B1EAF_CFB3_9CB8_41E5_BA0CFFD199F1",
 "backgroundOpacity": 1,
 "children": [
  "this.WebFrame_DF8BEEAF_CFB3_9CB8_41E5_A4F1DC38D43C"
 ],
 "layout": "absolute",
 "minHeight": 640,
 "shadow": false,
 "borderSize": 0,
 "width": "44%",
 "horizontalAlign": "center",
 "gap": 10,
 "minWidth": 440,
 "maxWidth": 440,
 "borderRadius": 0,
 "maxHeight": 640,
 "paddingRight": 0,
 "paddingBottom": 25,
 "class": "Container",
 "backgroundColor": [
  "#FFFFFF"
 ],
 "paddingLeft": 25,
 "backgroundColorDirection": "vertical",
 "height": "100%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "overflow": "scroll",
 "verticalAlign": "middle",
 "data": {
  "name": "-left"
 },
 "paddingTop": 25,
 "scrollBarWidth": 10
},
{
 "propagateClick": false,
 "id": "IconButton_6E599476_7CD6_3169_41DB_650F1AEAFBAB",
 "backgroundOpacity": 0,
 "width": 40,
 "minHeight": 0,
 "shadow": false,
 "borderSize": 0,
 "horizontalAlign": "center",
 "pressedIconURL": "skin/IconButton_6E599476_7CD6_3169_41DB_650F1AEAFBAB_pressed.png",
 "minWidth": 0,
 "borderRadius": 0,
 "iconURL": "skin/IconButton_6E599476_7CD6_3169_41DB_650F1AEAFBAB.png",
 "paddingBottom": 0,
 "mode": "toggle",
 "paddingRight": 0,
 "class": "IconButton",
 "paddingLeft": 0,
 "rollOverIconURL": "skin/IconButton_6E599476_7CD6_3169_41DB_650F1AEAFBAB_rollover.png",
 "height": 40,
 "verticalAlign": "middle",
 "transparencyActive": true,
 "pressedRollOverIconURL": "skin/IconButton_6E599476_7CD6_3169_41DB_650F1AEAFBAB_pressed_rollover.png",
 "data": {
  "name": "Mute"
 },
 "paddingTop": 0,
 "cursor": "hand"
},
{
 "propagateClick": false,
 "id": "IconButton_CEC4AE07_D45B_D5BB_41E3_03ADEEE5B5B7",
 "backgroundOpacity": 0,
 "width": 20,
 "minHeight": 20,
 "shadow": false,
 "borderSize": 0,
 "horizontalAlign": "center",
 "pressedIconURL": "skin/IconButton_CD714A40_D464_DDB4_41E1_355376A58CC4.png",
 "minWidth": 20,
 "borderRadius": 0,
 "maxWidth": 20,
 "maxHeight": 20,
 "paddingBottom": 0,
 "iconURL": "skin/IconButton_CD714A40_D464_DDB4_41E1_355376A58CC4.png",
 "mode": "push",
 "paddingRight": 0,
 "click": "this.setComponentVisibility(this.Container_CEA66E9F_D45B_D2CC_41E3_CB7218F7EE17, false, 0, null, null, false)",
 "class": "IconButton",
 "height": 20,
 "paddingLeft": 0,
 "rollOverIconURL": "skin/IconButton_CD714A40_D464_DDB4_41E1_355376A58CC4_rollover.png",
 "verticalAlign": "middle",
 "transparencyActive": false,
 "data": {
  "name": "X"
 },
 "paddingTop": 0,
 "cursor": "hand"
},
{
 "propagateClick": true,
 "backgroundColorRatios": [
  0
 ],
 "scrollBarColor": "#0069A3",
 "id": "Container_C84805A6_D45F_56FC_41C6_BA330B9EA6D6",
 "backgroundOpacity": 1,
 "width": 535,
 "layout": "horizontal",
 "minHeight": 640,
 "children": [
  "this.Container_C84B95AA_D45F_56F4_41D6_72533EA0485E"
 ],
 "shadow": false,
 "borderSize": 0,
 "horizontalAlign": "left",
 "gap": 0,
 "minWidth": 535,
 "maxWidth": 535,
 "borderRadius": 0,
 "maxHeight": 640,
 "paddingRight": 0,
 "paddingBottom": 25,
 "class": "Container",
 "backgroundColor": [
  "#FFFFFF"
 ],
 "paddingLeft": 25,
 "backgroundColorDirection": "vertical",
 "height": "100%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.51,
 "overflow": "visible",
 "verticalAlign": "top",
 "data": {
  "name": "-right"
 },
 "paddingTop": 0,
 "scrollBarWidth": 10
},
{
 "items": [
  {
   "media": "this.video_CF5244B4_D45C_D6DC_41E3_A9007FF4A5DE",
   "start": "this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9FVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_C2D62C8E_DA45_58FB_41E1_FC032829DF4E, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_C2D62C8E_DA45_58FB_41E1_FC032829DF4E, 0)",
   "begin": "this.fixTogglePlayPauseButton(this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9FVideoPlayer)",
   "player": "this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9FVideoPlayer",
   "class": "VideoPlayListItem"
  }
 ],
 "id": "playList_C2D62C8E_DA45_58FB_41E1_FC032829DF4E",
 "class": "PlayList"
},
{
 "shadowVerticalLength": 0,
 "propagateClick": true,
 "backgroundColorRatios": [
  0
 ],
 "scrollBarColor": "#000000",
 "id": "Container_DF8B0EAF_CFB3_9CB8_41E4_AB5E34C23898",
 "left": "20%",
 "children": [
  "this.Container_DF8B1EAF_CFB3_9CB8_41E5_BA0CFFD199F1",
  "this.Container_DF8BFEAF_CFB3_9CB8_41D4_93C42D97C6C6",
  "this.Container_C7CF1BA4_D3EA_0B2D_41CC_904BF5614C48"
 ],
 "layout": "horizontal",
 "shadowColor": "#000000",
 "backgroundOpacity": 1,
 "right": "20%",
 "shadow": true,
 "minHeight": 640,
 "borderSize": 0,
 "horizontalAlign": "left",
 "gap": 0,
 "minWidth": 1000,
 "borderRadius": 0,
 "maxWidth": 1000,
 "top": "10%",
 "maxHeight": 640,
 "bottom": "20%",
 "paddingRight": 0,
 "paddingBottom": 0,
 "shadowBlurRadius": 25,
 "backgroundColorDirection": "vertical",
 "class": "Container",
 "backgroundColor": [
  "#FFFFFF"
 ],
 "paddingLeft": 0,
 "shadowSpread": 1,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "overflow": "scroll",
 "shadowOpacity": 0.3,
 "shadowHorizontalLength": 0,
 "verticalAlign": "top",
 "data": {
  "name": "Global"
 },
 "paddingTop": 0,
 "scrollBarWidth": 10
},
{
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#000000",
 "id": "Container_CD433AED_D464_D24E_41E3_AE723D84DA21",
 "left": "0%",
 "children": [
  "this.Container_CD7C5A38_D464_DDD4_41D6_E89426F1554E"
 ],
 "layout": "absolute",
 "backgroundOpacity": 0.6,
 "right": "0%",
 "shadow": false,
 "minHeight": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "gap": 10,
 "minWidth": 1,
 "borderRadius": 0,
 "backgroundColorDirection": "vertical",
 "bottom": "0%",
 "paddingRight": 0,
 "paddingBottom": 0,
 "top": "0%",
 "class": "Container",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "paddingLeft": 0,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "verticalAlign": "top",
 "overflow": "scroll",
 "scrollBarVisible": "rollOver",
 "visible": false,
 "contentOpaque": false,
 "data": {
  "name": "\ub178\ud2b8\ub974\ub2f4 \ub300\uc131\ub2f9"
 },
 "paddingTop": 0,
 "scrollBarWidth": 10
},
{
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarColor": "#000000",
 "id": "Container_DF884EAF_CFB3_9CB8_41E1_96BD47779950",
 "left": "0%",
 "children": [
  "this.Container_DF8B0EAF_CFB3_9CB8_41E4_AB5E34C23898"
 ],
 "layout": "absolute",
 "backgroundOpacity": 0.6,
 "right": "0%",
 "shadow": false,
 "minHeight": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "gap": 10,
 "minWidth": 1,
 "borderRadius": 0,
 "backgroundColorDirection": "vertical",
 "bottom": "0%",
 "paddingRight": 0,
 "paddingBottom": 0,
 "top": "0%",
 "class": "Container",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "paddingLeft": 0,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "verticalAlign": "top",
 "overflow": "scroll",
 "scrollBarVisible": "rollOver",
 "visible": false,
 "contentOpaque": false,
 "data": {
  "name": "\uc2dc\ub4dc\ub2c8 \uc624\ud398\ub77c \ud558\uc6b0\uc2a4"
 },
 "paddingTop": 0,
 "scrollBarWidth": 10
},
{
 "shadowVerticalLength": 0,
 "propagateClick": true,
 "backgroundColorRatios": [
  0
 ],
 "scrollBarColor": "#000000",
 "id": "Container_CEC6AE04_D45B_D5BD_41DB_9BCAEDB54646",
 "left": "20%",
 "children": [
  "this.Container_CEC68E04_D45B_D5BD_41B3_9D97F857C4E6",
  "this.Container_CEC6CE05_D45B_D5BF_41E9_50C81FA527D2",
  "this.Container_CEC54E07_D45B_D5BB_41DE_4A7588886A6F"
 ],
 "layout": "horizontal",
 "shadowColor": "#000000",
 "backgroundOpacity": 1,
 "right": "20%",
 "shadow": true,
 "minHeight": 640,
 "borderSize": 0,
 "horizontalAlign": "left",
 "gap": 0,
 "minWidth": 1000,
 "borderRadius": 0,
 "maxWidth": 1000,
 "top": "10%",
 "maxHeight": 640,
 "bottom": "20%",
 "paddingRight": 0,
 "paddingBottom": 0,
 "shadowBlurRadius": 25,
 "backgroundColorDirection": "vertical",
 "class": "Container",
 "backgroundColor": [
  "#FFFFFF"
 ],
 "paddingLeft": 0,
 "shadowSpread": 1,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "overflow": "scroll",
 "shadowOpacity": 0.3,
 "shadowHorizontalLength": 0,
 "verticalAlign": "top",
 "data": {
  "name": "Global"
 },
 "paddingTop": 0,
 "scrollBarWidth": 10
},
{
 "propagateClick": true,
 "backgroundColorRatios": [
  0
 ],
 "scrollBarColor": "#000000",
 "id": "Container_C84E15A5_D45F_56FC_41D9_F26AF965BC71",
 "backgroundOpacity": 1,
 "children": [
  "this.WebFrame_C84845A5_D45F_56FC_41E5_8D4D6040982D"
 ],
 "layout": "absolute",
 "minHeight": 640,
 "shadow": false,
 "borderSize": 0,
 "width": "44%",
 "horizontalAlign": "center",
 "gap": 10,
 "minWidth": 440,
 "maxWidth": 440,
 "borderRadius": 0,
 "maxHeight": 640,
 "paddingRight": 0,
 "paddingBottom": 25,
 "class": "Container",
 "backgroundColor": [
  "#FFFFFF"
 ],
 "paddingLeft": 25,
 "backgroundColorDirection": "vertical",
 "height": "100%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "overflow": "scroll",
 "verticalAlign": "middle",
 "data": {
  "name": "-left"
 },
 "paddingTop": 25,
 "scrollBarWidth": 10
},
{
 "propagateClick": true,
 "scrollBarColor": "#E73B2C",
 "id": "Container_CD7D5A3E_D464_DDCC_41CF_3F376881371A",
 "backgroundOpacity": 0,
 "children": [
  "this.Image_CD7DFA3E_D464_DDCC_41D9_918F531A3D17",
  "this.Button_CD7F3A3E_D464_DDCC_41E1_75F26E4EE55C"
 ],
 "layout": "vertical",
 "minHeight": 615,
 "shadow": false,
 "borderSize": 0,
 "width": "95.327%",
 "horizontalAlign": "right",
 "gap": 40,
 "minWidth": 510,
 "maxWidth": 510,
 "borderRadius": 0,
 "maxHeight": 615,
 "paddingBottom": 0,
 "paddingRight": 0,
 "class": "Container",
 "height": 615,
 "paddingLeft": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.79,
 "overflow": "scroll",
 "verticalAlign": "top",
 "data": {
  "name": "Container text"
 },
 "paddingTop": 25,
 "scrollBarWidth": 10
},
{
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "id": "Container_CD713A40_D464_DDB4_419B_7CD7A3BB83EA",
 "backgroundOpacity": 0,
 "width": 25,
 "layout": "horizontal",
 "minHeight": 640,
 "children": [
  "this.IconButton_CD714A40_D464_DDB4_41E1_355376A58CC4"
 ],
 "shadow": false,
 "borderSize": 0,
 "horizontalAlign": "left",
 "gap": 10,
 "minWidth": 25,
 "borderRadius": 0,
 "maxWidth": 25,
 "maxHeight": 640,
 "paddingBottom": 0,
 "paddingRight": 0,
 "class": "Container",
 "height": 640,
 "paddingLeft": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "overflow": "scroll",
 "verticalAlign": "top",
 "data": {
  "name": "Container10029"
 },
 "scrollBarWidth": 10,
 "paddingTop": 8
},
{
 "id": "effect_C483A9AE_D9D3_EC81_41C7_90A211984883",
 "class": "FadeInEffect",
 "easing": "linear",
 "duration": 500
},
{
 "propagateClick": false,
 "id": "Image_CE6C05EE_D45B_B64C_41D5_FCE9CCDD944A",
 "backgroundOpacity": 0,
 "width": 510,
 "minHeight": 510,
 "shadow": false,
 "borderSize": 0,
 "horizontalAlign": "center",
 "url": "skin/Image_CE6C05EE_D45B_B64C_41D5_FCE9CCDD944A.png",
 "minWidth": 510,
 "borderRadius": 0,
 "maxWidth": 510,
 "maxHeight": 510,
 "paddingBottom": 0,
 "paddingRight": 0,
 "class": "Image",
 "height": 510,
 "paddingLeft": 0,
 "verticalAlign": "top",
 "scaleMode": "fit_inside",
 "data": {
  "name": "Image7152"
 },
 "paddingTop": 0
},
{
 "propagateClick": true,
 "backgroundColorRatios": [
  0
 ],
 "scrollBarColor": "#0069A3",
 "id": "Container_CE7395ED_D45B_B64C_41E8_F437E3FAD9EF",
 "backgroundOpacity": 1,
 "width": 535,
 "layout": "horizontal",
 "minHeight": 640,
 "children": [
  "this.Container_CE7345ED_D45B_B64C_41D8_F572A1AAD5D2"
 ],
 "shadow": false,
 "borderSize": 0,
 "horizontalAlign": "left",
 "gap": 0,
 "minWidth": 535,
 "maxWidth": 535,
 "borderRadius": 0,
 "maxHeight": 640,
 "paddingRight": 0,
 "paddingBottom": 25,
 "class": "Container",
 "backgroundColor": [
  "#FFFFFF"
 ],
 "paddingLeft": 25,
 "backgroundColorDirection": "vertical",
 "height": "100%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.51,
 "overflow": "visible",
 "verticalAlign": "top",
 "data": {
  "name": "-right"
 },
 "paddingTop": 0,
 "scrollBarWidth": 10
},
{
 "propagateClick": false,
 "id": "IconButton_C498B5E8_D955_A481_41E4_0908F4C0133A",
 "backgroundOpacity": 0,
 "width": 40,
 "minHeight": 1,
 "shadow": false,
 "borderSize": 0,
 "horizontalAlign": "center",
 "pressedIconURL": "skin/IconButton_C498B5E8_D955_A481_41E4_0908F4C0133A.png",
 "minWidth": 1,
 "borderRadius": 0,
 "iconURL": "skin/IconButton_C498B5E8_D955_A481_41E4_0908F4C0133A.png",
 "paddingBottom": 0,
 "mode": "push",
 "paddingRight": 0,
 "click": "if(!this.ThumbnailList_C35F2980_D8AD_AC81_41EA_527CBF21FD96.get('visible')){ this.setComponentVisibility(this.ThumbnailList_C35F2980_D8AD_AC81_41EA_527CBF21FD96, true, 0, this.effect_C5A8242E_D9D6_9B81_41E1_5C0528AC19C8, 'showEffect', false) } else { this.setComponentVisibility(this.ThumbnailList_C35F2980_D8AD_AC81_41EA_527CBF21FD96, false, 0, this.effect_C5A8342E_D9D6_9B81_41C6_A175E4EE222E, 'hideEffect', false) }",
 "class": "IconButton",
 "height": 40,
 "paddingLeft": 0,
 "rollOverIconURL": "skin/IconButton_C498B5E8_D955_A481_41E4_0908F4C0133A_rollover.png",
 "verticalAlign": "middle",
 "transparencyActive": false,
 "pressedRollOverIconURL": "skin/IconButton_C498B5E8_D955_A481_41E4_0908F4C0133A.png",
 "data": {
  "name": "IconButton14405"
 },
 "paddingTop": 0,
 "cursor": "hand"
},
{
 "shadowVerticalLength": 0,
 "propagateClick": true,
 "backgroundColorRatios": [
  0
 ],
 "scrollBarColor": "#000000",
 "id": "Container_CD7C5A38_D464_DDD4_41D6_E89426F1554E",
 "left": "20%",
 "children": [
  "this.Container_CD7CAA38_D464_DDD4_41D5_4069F49AE46C",
  "this.Container_CD7D0A3D_D464_DDCC_41E4_7B6D286BF971",
  "this.Container_CD713A40_D464_DDB4_419B_7CD7A3BB83EA"
 ],
 "layout": "horizontal",
 "shadowColor": "#000000",
 "backgroundOpacity": 1,
 "right": "20%",
 "shadow": true,
 "minHeight": 640,
 "borderSize": 0,
 "horizontalAlign": "left",
 "gap": 0,
 "minWidth": 1000,
 "borderRadius": 0,
 "maxWidth": 1000,
 "top": "10%",
 "maxHeight": 640,
 "bottom": "20%",
 "paddingRight": 0,
 "paddingBottom": 0,
 "shadowBlurRadius": 25,
 "backgroundColorDirection": "vertical",
 "class": "Container",
 "backgroundColor": [
  "#FFFFFF"
 ],
 "paddingLeft": 0,
 "shadowSpread": 1,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "overflow": "scroll",
 "shadowOpacity": 0.3,
 "shadowHorizontalLength": 0,
 "verticalAlign": "top",
 "data": {
  "name": "Global"
 },
 "paddingTop": 0,
 "scrollBarWidth": 10
},
{
 "shadowVerticalLength": 0,
 "propagateClick": true,
 "backgroundColorRatios": [
  0
 ],
 "scrollBarColor": "#000000",
 "id": "Container_C84E65A5_D45F_56FC_41C3_D5F703FC7CA2",
 "left": "20%",
 "children": [
  "this.Container_C84E15A5_D45F_56FC_41D9_F26AF965BC71",
  "this.Container_C84805A6_D45F_56FC_41C6_BA330B9EA6D6",
  "this.Container_C83D25AD_D45F_56CC_41D7_59D101C68187"
 ],
 "layout": "horizontal",
 "shadowColor": "#000000",
 "backgroundOpacity": 1,
 "right": "20%",
 "shadow": true,
 "minHeight": 640,
 "borderSize": 0,
 "horizontalAlign": "left",
 "gap": 0,
 "minWidth": 1000,
 "borderRadius": 0,
 "maxWidth": 1000,
 "top": "10%",
 "maxHeight": 640,
 "bottom": "20%",
 "paddingRight": 0,
 "paddingBottom": 0,
 "shadowBlurRadius": 25,
 "backgroundColorDirection": "vertical",
 "class": "Container",
 "backgroundColor": [
  "#FFFFFF"
 ],
 "paddingLeft": 0,
 "shadowSpread": 1,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "overflow": "scroll",
 "shadowOpacity": 0.3,
 "shadowHorizontalLength": 0,
 "verticalAlign": "top",
 "data": {
  "name": "Global"
 },
 "paddingTop": 0,
 "scrollBarWidth": 10
},
{
 "propagateClick": false,
 "id": "IconButton_C8A53112_D8D5_BD81_41E8_75636581D7AF",
 "backgroundOpacity": 0,
 "width": 40,
 "minHeight": 0,
 "shadow": false,
 "borderSize": 0,
 "horizontalAlign": "center",
 "pressedIconURL": "skin/IconButton_C8A53112_D8D5_BD81_41E8_75636581D7AF_pressed.png",
 "minWidth": 0,
 "borderRadius": 0,
 "iconURL": "skin/IconButton_C8A53112_D8D5_BD81_41E8_75636581D7AF.png",
 "paddingBottom": 0,
 "mode": "toggle",
 "paddingRight": 0,
 "class": "IconButton",
 "paddingLeft": 0,
 "rollOverIconURL": "skin/IconButton_C8A53112_D8D5_BD81_41E8_75636581D7AF_rollover.png",
 "height": 40,
 "verticalAlign": "middle",
 "transparencyActive": true,
 "pressedRollOverIconURL": "skin/IconButton_C8A53112_D8D5_BD81_41E8_75636581D7AF_pressed_rollover.png",
 "data": {
  "name": "Pause"
 },
 "paddingTop": 0,
 "cursor": "hand"
},
{
 "textDecoration": "none",
 "propagateClick": false,
 "shadowVerticalLength": 0,
 "id": "Button_CE6C15EE_D45B_B64C_41D1_90C5993EDBE0",
 "backgroundOpacity": 0,
 "width": 136,
 "layout": "horizontal",
 "shadowColor": "#000000",
 "backgroundColorRatios": [
  0
 ],
 "minHeight": 40,
 "shadow": true,
 "borderSize": 0,
 "horizontalAlign": "center",
 "gap": 5,
 "fontFamily": "Noto Sans CJK KR Bold",
 "minWidth": 136,
 "maxWidth": 136,
 "borderRadius": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "borderColor": "#000000",
 "maxHeight": 40,
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingRight": 0,
 "paddingBottom": 0,
 "iconBeforeLabel": true,
 "iconURL": "skin/Button_CEC66E05_D45B_D5BF_41C4_5CE3A5954D82.png",
 "mode": "push",
 "shadowBlurRadius": 6,
 "label": "\uc601\uc0c1 \ubcf4\uae30",
 "class": "Button",
 "height": 40,
 "fontSize": "20px",
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "shadowSpread": 1,
 "backgroundColor": [
  "#04A3E1"
 ],
 "rollOverBackgroundOpacity": 0,
 "fontStyle": "normal",
 "verticalAlign": "middle",
 "shadowHorizontalLength": 3,
 "pressedBackgroundOpacity": 0,
 "click": "this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9F.bind('hide', function(e){ e.source.unbind('hide', arguments.callee, this); this.playList_C2D67C8F_DA45_58F9_41DA_C82D5FF0849A.set('selectedIndex', -1); }, this); this.playList_C2D67C8F_DA45_58F9_41DA_C82D5FF0849A.set('selectedIndex', 0); this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9FVideoPlayer.play(); this.setComponentVisibility(this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9F, true, 0, this.effect_D6364346_D976_7523_41D2_2952E124FEC3, 'showEffect', false); this.setComponentVisibility(this.Container_C0032120_CFB0_85A8_41D1_BBFE7EB19031, true, 0, this.effect_D6364346_D976_7523_41D2_2952E124FEC3, 'showEffect', false)",
 "iconHeight": 30,
 "shadowOpacity": 0,
 "fontColor": "#333333",
 "iconWidth": 30,
 "fontWeight": "normal",
 "paddingTop": 0,
 "cursor": "hand",
 "data": {
  "name": "Button"
 }
},
{
 "propagateClick": false,
 "backgroundColorRatios": [
  0
 ],
 "id": "WebFrame_CEC6EE04_D45B_D5BD_41E9_063F637268CE",
 "left": "0%",
 "backgroundOpacity": 1,
 "right": "0%",
 "shadow": false,
 "minHeight": 590,
 "borderSize": 0,
 "url": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124996.9374348636!2d-122.28527635110757!3d46.18920169732165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54969956568a2691%3A0x69ddb4f4b6cf94c7!2z7IS47J247Yq47Zes66CM7IqkIOyCsA!5e0!3m2!1sko!2skr!4v1575523264173!5m2!1sko!2skr",
 "minWidth": 415,
 "borderRadius": 0,
 "maxWidth": 415,
 "top": "0%",
 "maxHeight": 590,
 "bottom": "0%",
 "paddingRight": 0,
 "paddingBottom": 0,
 "class": "WebFrame",
 "backgroundColor": [
  "#FFFFFF"
 ],
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "insetBorder": false,
 "data": {
  "name": "WebFrame48191"
 },
 "paddingTop": 0,
 "scrollEnabled": true
},
{
 "items": [
  {
   "media": "this.panorama_80D13AEC_8D09_AEB1_41D9_2DF9BEE19E00",
   "end": "this.trigger('tourEnded')",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_80D13AEC_8D09_AEB1_41D9_2DF9BEE19E00_camera"
  }
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "id": "effect_C5A8242E_D9D6_9B81_41E1_5C0528AC19C8",
 "class": "FadeInEffect",
 "easing": "linear",
 "duration": 500
},
{
 "propagateClick": true,
 "backgroundColorRatios": [
  0
 ],
 "scrollBarColor": "#000000",
 "id": "Container_CE7545ED_D45B_B64C_41C2_3660E442ABB8",
 "backgroundOpacity": 1,
 "children": [
  "this.WebFrame_CE73F5ED_D45B_B64C_41B3_F36834684B98"
 ],
 "layout": "absolute",
 "minHeight": 640,
 "shadow": false,
 "borderSize": 0,
 "width": "44%",
 "horizontalAlign": "center",
 "gap": 10,
 "minWidth": 440,
 "maxWidth": 440,
 "borderRadius": 0,
 "maxHeight": 640,
 "paddingRight": 0,
 "paddingBottom": 25,
 "class": "Container",
 "backgroundColor": [
  "#FFFFFF"
 ],
 "paddingLeft": 25,
 "backgroundColorDirection": "vertical",
 "height": "100%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "overflow": "scroll",
 "verticalAlign": "middle",
 "data": {
  "name": "-left"
 },
 "paddingTop": 25,
 "scrollBarWidth": 10
},
{
 "id": "effect_D6FEF68E_D969_9F23_41E6_46DA078E85E8",
 "class": "FadeInEffect",
 "easing": "linear",
 "duration": 500
},
{
 "id": "effect_D63A57C6_D96A_FD23_41CB_AADB3DD0A4E4",
 "class": "FadeInEffect",
 "easing": "linear",
 "duration": 500
},
{
 "items": [
  {
   "media": "this.video_C1829366_D467_B27C_41E9_19C9C2A3F092",
   "start": "this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9FVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_C2D68C8E_DA45_58FB_41CB_15D4D47A950F, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_C2D68C8E_DA45_58FB_41CB_15D4D47A950F, 0)",
   "begin": "this.fixTogglePlayPauseButton(this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9FVideoPlayer)",
   "player": "this.ViewerAreaLabeled_C767D072_D47C_AE55_41E0_5E0FD26CAC9FVideoPlayer",
   "class": "VideoPlayListItem"
  }
 ],
 "id": "playList_C2D68C8E_DA45_58FB_41CB_15D4D47A950F",
 "class": "PlayList"
},
{
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "id": "Container_C7CF1BA4_D3EA_0B2D_41CC_904BF5614C48",
 "backgroundOpacity": 0,
 "width": 25,
 "layout": "horizontal",
 "minHeight": 640,
 "children": [
  "this.IconButton_DF887EAF_CFB3_9CB8_41DD_7FB6D79C3851"
 ],
 "shadow": false,
 "borderSize": 0,
 "horizontalAlign": "left",
 "gap": 10,
 "minWidth": 25,
 "borderRadius": 0,
 "maxWidth": 25,
 "maxHeight": 640,
 "paddingBottom": 0,
 "paddingRight": 0,
 "class": "Container",
 "height": 640,
 "paddingLeft": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "overflow": "scroll",
 "verticalAlign": "top",
 "data": {
  "name": "Container10029"
 },
 "scrollBarWidth": 10,
 "paddingTop": 8
},
{
 "propagateClick": true,
 "backgroundColorRatios": [
  0
 ],
 "scrollBarColor": "#000000",
 "id": "Container_CD7CAA38_D464_DDD4_41D5_4069F49AE46C",
 "backgroundOpacity": 1,
 "children": [
  "this.WebFrame_CD7D3A38_D464_DDC9_41D0_B23FB0025BE6"
 ],
 "layout": "absolute",
 "minHeight": 640,
 "shadow": false,
 "borderSize": 0,
 "width": "44%",
 "horizontalAlign": "center",
 "gap": 10,
 "minWidth": 440,
 "maxWidth": 440,
 "borderRadius": 0,
 "maxHeight": 640,
 "paddingRight": 0,
 "paddingBottom": 25,
 "class": "Container",
 "backgroundColor": [
  "#FFFFFF"
 ],
 "paddingLeft": 25,
 "backgroundColorDirection": "vertical",
 "height": "100%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "overflow": "scroll",
 "verticalAlign": "middle",
 "data": {
  "name": "-left"
 },
 "paddingTop": 25,
 "scrollBarWidth": 10
},
{
 "id": "effect_C5A8342E_D9D6_9B81_41C6_A175E4EE222E",
 "class": "FadeOutEffect",
 "easing": "linear",
 "duration": 500
},
{
 "id": "effect_C5DE5919_D017_88D8_41E9_3302DCBA8FB9",
 "class": "FadeInEffect",
 "easing": "linear",
 "duration": 500
},
{
 "shadowVerticalLength": 0,
 "propagateClick": true,
 "backgroundColorRatios": [
  0
 ],
 "scrollBarColor": "#000000",
 "id": "Container_CE75A5EC_D45B_B64C_41E3_1F4B3B63A1D1",
 "left": "20%",
 "children": [
  "this.Container_CE7545ED_D45B_B64C_41C2_3660E442ABB8",
  "this.Container_CE7395ED_D45B_B64C_41E8_F437E3FAD9EF",
  "this.Container_CE6795EF_D45B_B64C_41D4_B9C44212B8A5"
 ],
 "layout": "horizontal",
 "shadowColor": "#000000",
 "backgroundOpacity": 1,
 "right": "20%",
 "shadow": true,
 "minHeight": 640,
 "borderSize": 0,
 "horizontalAlign": "left",
 "gap": 0,
 "minWidth": 1000,
 "borderRadius": 0,
 "maxWidth": 1000,
 "top": "10%",
 "maxHeight": 640,
 "bottom": "20%",
 "paddingRight": 0,
 "paddingBottom": 0,
 "shadowBlurRadius": 25,
 "backgroundColorDirection": "vertical",
 "class": "Container",
 "backgroundColor": [
  "#FFFFFF"
 ],
 "paddingLeft": 0,
 "shadowSpread": 1,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "overflow": "scroll",
 "shadowOpacity": 0.3,
 "shadowHorizontalLength": 0,
 "verticalAlign": "top",
 "data": {
  "name": "Global"
 },
 "paddingTop": 0,
 "scrollBarWidth": 10
},
{
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "id": "Container_C5BF9EE0_D9EE_A480_41E6_73AEE2103F66",
 "left": "1%",
 "children": [
  "this.IconButton_C498B5E8_D955_A481_41E4_0908F4C0133A",
  "this.ThumbnailList_C35F2980_D8AD_AC81_41EA_527CBF21FD96"
 ],
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "right": "1%",
 "shadow": false,
 "minHeight": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "gap": 10,
 "minWidth": 1,
 "borderRadius": 0,
 "bottom": "1%",
 "paddingRight": 20,
 "paddingBottom": 0,
 "top": "87.34%",
 "class": "Container",
 "paddingLeft": 20,
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "verticalAlign": "middle",
 "overflow": "hidden",
 "contentOpaque": false,
 "data": {
  "name": "Container15553"
 },
 "paddingTop": 0,
 "scrollBarWidth": 10
},
{
 "propagateClick": true,
 "scrollBarColor": "#E73B2C",
 "id": "Container_DF8BDEAF_CFB3_9CB8_41DB_5660D40A3DEC",
 "backgroundOpacity": 0,
 "children": [
  "this.Image_DE556639_CFF1_8738_41BA_BCB33135F1C9",
  "this.Button_DF8B8EAF_CFB3_9CB8_41E8_8D84B040D751"
 ],
 "layout": "vertical",
 "minHeight": 615,
 "shadow": false,
 "borderSize": 0,
 "width": "95.327%",
 "horizontalAlign": "right",
 "gap": 40,
 "minWidth": 510,
 "maxWidth": 510,
 "borderRadius": 0,
 "maxHeight": 615,
 "paddingBottom": 0,
 "paddingRight": 0,
 "class": "Container",
 "height": 615,
 "paddingLeft": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.79,
 "overflow": "scroll",
 "verticalAlign": "top",
 "data": {
  "name": "Container text"
 },
 "paddingTop": 25,
 "scrollBarWidth": 10
},
{
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "id": "Container_CEC54E07_D45B_D5BB_41DE_4A7588886A6F",
 "backgroundOpacity": 0,
 "width": 25,
 "layout": "horizontal",
 "minHeight": 640,
 "children": [
  "this.IconButton_CEC4AE07_D45B_D5BB_41E3_03ADEEE5B5B7"
 ],
 "shadow": false,
 "borderSize": 0,
 "horizontalAlign": "left",
 "gap": 10,
 "minWidth": 25,
 "borderRadius": 0,
 "maxWidth": 25,
 "maxHeight": 640,
 "paddingBottom": 0,
 "paddingRight": 0,
 "class": "Container",
 "height": 640,
 "paddingLeft": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "overflow": "scroll",
 "verticalAlign": "top",
 "data": {
  "name": "Container10029"
 },
 "scrollBarWidth": 10,
 "paddingTop": 8
},
{
 "items": [
  {
   "hfov": 0.14,
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
   "yaw": 8.15
  }
 ],
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.setComponentVisibility(this.Container_C8F21624_D45F_55FC_41E5_DE32E668F410, true, 0, this.effect_CF8455D5_D4AB_565F_41E8_1CDCACC3C1BD, 'showEffect', false)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "\uadf8\ub79c\ub4dc \uce90\ub2c8\uc5b8"
  }
 ],
 "data": {
  "label": "\uadf8\ub79c\ub4dc\ucf00\ub2c8\uc5b8"
 },
 "rollOverDisplay": false,
 "useHandCursor": true,
 "maps": [
  {
   "hfov": 0.14,
   "yaw": 8.15,
   "class": "HotspotPanoramaOverlayMap",
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
   },
   "pitch": 3.27
  }
 ],
 "id": "overlay_AE66D3BF_A130_5AB5_41E3_805A6A7A3EC0",
 "class": "HotspotPanoramaOverlay"
},
{
 "items": [
  {
   "hfov": 0.14,
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
   "yaw": 7.27
  }
 ],
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.setComponentVisibility(this.Container_CEA66E9F_D45B_D2CC_41E3_CB7218F7EE17, true, 0, this.effect_CF7D6A2C_D4AB_DDCD_41E0_6C32E5CDBBE6, 'showEffect', false)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "\uc138\uc778\ud2b8 \ud5ec\ub80c\uc2a4 \uc0b0"
  }
 ],
 "data": {
  "label": "\uc138\uc778\ud2b8 \ud5ec\ub80c\uc2a4 \uc0b0"
 },
 "rollOverDisplay": false,
 "useHandCursor": true,
 "maps": [
  {
   "hfov": 0.14,
   "yaw": 7.27,
   "class": "HotspotPanoramaOverlayMap",
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
   },
   "pitch": 4.31
  }
 ],
 "id": "overlay_80D09AED_8D09_AEB3_41A6_0F9CAE86A560",
 "class": "HotspotPanoramaOverlay"
},
{
 "items": [
  {
   "hfov": 0.14,
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
   "yaw": -3.37
  }
 ],
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.setComponentVisibility(this.Container_CE48C64D_D45B_B24C_41D0_953DAB8E95D7, true, 0, this.effect_CFAE9315_D4A4_B3DC_41D1_98C2EE0D38AF, 'showEffect', false)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "\ud64d\ucf69 \uc12c"
  }
 ],
 "data": {
  "label": "\ud64d\ucf69"
 },
 "rollOverDisplay": false,
 "useHandCursor": true,
 "maps": [
  {
   "hfov": 0.14,
   "yaw": -3.37,
   "class": "HotspotPanoramaOverlayMap",
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
   },
   "pitch": 1.81
  }
 ],
 "id": "overlay_AFB91C65_A130_6DD5_41C8_913CC9BFE19D",
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "hfov": 0.14,
   "yaw": -1.26,
   "class": "HotspotPanoramaOverlayMap",
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
   },
   "pitch": 3.18
  }
 ],
 "id": "overlay_C979750E_D4AC_B7CC_41CA_E4FA4E697046",
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.14,
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
   "yaw": -1.26
  }
 ],
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "\ud6c4\uc9c0\uc0b0"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "\ud6c4\uc9c0\uc0b0"
 }
},
{
 "items": [
  {
   "hfov": 0.14,
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
   "yaw": -13
  }
 ],
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.setComponentVisibility(this.Container_CD433AED_D464_D24E_41E3_AE723D84DA21, true, 0, this.effect_C37D5BAD_D465_B2CC_41DC_92D85B8EBC09, 'showEffect', false)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "\ub178\ud2b8\ub974\ub2f4 \ub300\uc131\ub2f9"
  }
 ],
 "data": {
  "label": "\ub178\ud2b8\ub974\ub2f4"
 },
 "rollOverDisplay": false,
 "useHandCursor": true,
 "maps": [
  {
   "hfov": 0.14,
   "yaw": -13,
   "class": "HotspotPanoramaOverlayMap",
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
   },
   "pitch": 4.58
  }
 ],
 "id": "overlay_80D0FAED_8D09_AEB3_41C8_806326E42906",
 "class": "HotspotPanoramaOverlay"
},
{
 "items": [
  {
   "hfov": 0.14,
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
   "yaw": -0.27
  }
 ],
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.setComponentVisibility(this.Container_DF884EAF_CFB3_9CB8_41E1_96BD47779950, true, 0, this.effect_C5DE5919_D017_88D8_41E9_3302DCBA8FB9, 'showEffect', false)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "\uc2dc\ub4dc\ub2c8 \uc624\ud398\ub77c \ud558\uc6b0\uc2a4"
  }
 ],
 "data": {
  "label": "\uc2dc\ub4dc\ub2c8 \uc624\ud398\ub77c\ud558\uc6b0\uc2a4"
 },
 "rollOverDisplay": false,
 "useHandCursor": true,
 "maps": [
  {
   "hfov": 0.14,
   "yaw": -0.27,
   "class": "HotspotPanoramaOverlayMap",
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
   },
   "pitch": -4.25
  }
 ],
 "id": "overlay_80D25AED_8D09_AEB3_41DF_92F408240D87",
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "hfov": 0.14,
   "yaw": -13.34,
   "class": "HotspotPanoramaOverlayMap",
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
   },
   "pitch": 4.86
  }
 ],
 "id": "overlay_A5FED8D3_B492_1267_41BE_E5146930D694",
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.14,
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
   "yaw": -13.34
  }
 ],
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "\uc2a4\ud1a4\ud5e8\uc9c0"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "\uc2a4\ud1a4\ud5e8\uc9c0"
 }
},
{
 "maps": [
  {
   "hfov": 0.14,
   "yaw": -13.39,
   "class": "HotspotPanoramaOverlayMap",
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
   },
   "pitch": 3.34
  }
 ],
 "id": "overlay_A7B6B7C0_B492_3E61_41C0_531B490E2033",
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 0.14,
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
   "yaw": -13.39
  }
 ],
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "\uc0ac\uadf8\ub77c\ub2e4 \ud30c\ubc00\ub9ac\uc544"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "\uc0ac\uadf8\ub77c\ub2e4 \ud30c\ubc00\ub9ac\uc544"
 }
}],
 "data": {
  "name": "Player1659"
 },
 "scrollBarWidth": 10
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
