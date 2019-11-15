(function(){
    var script = {
 "start": "this.playAudioList([this.audio_36703AAB_3DE4_CC4F_41CD_7AC3E7E4C9E6]); this.init(); this.syncPlaylists([this.ThumbnailList_3110C4FE_3FEE_AA94_41CF_038F42695873_playlist,this.mainPlayList]); this.playList_7444B792_6CB2_F570_41D2_B7A590A35F44.set('selectedIndex', 0); if(!this.get('fullscreenAvailable')) { [this.IconButton_4CB3D624_437C_7DE3_41B5_894BCC8B5F59].forEach(function(component) { component.set('visible', false); }) }",
 "id": "rootPlayer",
 "defaultVRPointer": "laser",
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "mobileMipmappingEnabled": false,
 "children": [
  "this.MainViewer",
  "this.MapViewer",
  "this.ThumbnailList_3110C4FE_3FEE_AA94_41CF_038F42695873",
  "this.IconButton_4CB3D624_437C_7DE3_41B5_894BCC8B5F59",
  "this.Image_562AA81F_4345_BCDF_41B2_7D1C43191DC0",
  "this.IconButton_2DA98648_3FAE_FE10_41C2_2831605922EE",
  "this.Image_57653967_4347_7F6F_4166_5A375DABB586",
  "this.veilPopupPanorama",
  "this.zoomImagePopupPanorama",
  "this.closeButtonPopupPanorama"
 ],
 "scrollBarWidth": 10,
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "vrPolyfillScale": 1,
 "scrollBarVisible": "rollOver",
 "class": "Player",
 "minHeight": 20,
 "buttonToggleFullscreen": "this.IconButton_4CB3D624_437C_7DE3_41B5_894BCC8B5F59",
 "overflow": "visible",
 "minWidth": 20,
 "downloadEnabled": true,
 "horizontalAlign": "left",
 "scripts": {
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "unregisterKey": function(key){  delete window[key]; },
  "setOverlayBehaviour": function(overlay, media, action, preventDoubleClick){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(preventDoubleClick){ if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 1000); } }; if(preventDoubleClick && window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getFirstPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback, stopBackgroundAudio){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } var src = this.playGlobalAudio(audio, endCallback); if(stopBackgroundAudio === true){ var stateChangeFunc = function(){ if(src.get('state') == 'playing'){ this.pauseGlobalAudios(src.get('id'), [src]); } else if(src.get('state') == 'stopped'){ this.resumeGlobalAudios(src.get('id')); src.unbind('stateChange', stateChangeFunc, this); } }; src.bind('stateChange', stateChangeFunc, this); } return src; },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "getKey": function(key){  return window[key]; },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = undefined; if(mediaDispatcher){ var playListsWithMedia = this.getPlayListsWithMedia(mediaDispatcher, true); playListDispatcher = playListsWithMedia.indexOf(playList) != -1 ? playList : (playListsWithMedia.length > 0 ? playListsWithMedia[0] : undefined); } if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } item.bind('begin', onBeginFunction, self); this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "getFirstPlayListWithMedia": function(media, onlySelected){  var playLists = this.getPlayListsWithMedia(media, onlySelected); return playLists.length > 0 ? playLists[0] : undefined; },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "getPlayListsWithMedia": function(media, onlySelected){  var result = []; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) result.push(playList); } return result; },
  "registerKey": function(key, value){  window[key] = value; },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "keepCompVisibleWhileInitItem": function(playList, index, component, keep){  var item = playList.get('items')[index]; var stopFunc = function() { item.unbind('stop', stopFunc, this, true); item.unbind('stop', stopFunc, this); item.unbind('begin', stopFunc, this, true); item.unbind('begin', stopFunc, this); this.keepCompVisible(component, !keep); }; this.keepCompVisible(component, keep); item.bind('stop', stopFunc, this, true); item.bind('stop', stopFunc, this); item.bind('begin', stopFunc, this, true); item.bind('begin', stopFunc, this); },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "existsKey": function(key){  return key in window; },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "keepCompVisible": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); }
 },
 "borderSize": 0,
 "backgroundPreloadEnabled": true,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "gap": 10,
 "height": "100%",
 "propagateClick": false,
 "desktopMipmappingEnabled": false,
 "width": "100%",
 "shadow": false,
 "paddingLeft": 0,
 "definitions": [{
 "items": [
  {
   "media": "this.panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_3110C4FE_3FEE_AA94_41CF_038F42695873_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_camera"
  },
  {
   "media": "this.panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_3110C4FE_3FEE_AA94_41CF_038F42695873_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE_camera"
  },
  {
   "media": "this.panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_3110C4FE_3FEE_AA94_41CF_038F42695873_playlist, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_camera"
  },
  {
   "media": "this.panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_3110C4FE_3FEE_AA94_41CF_038F42695873_playlist, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5_camera"
  },
  {
   "media": "this.panorama_33289CC4_3FEF_1D53_419F_007869704957",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_3110C4FE_3FEE_AA94_41CF_038F42695873_playlist, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_33289CC4_3FEF_1D53_419F_007869704957_camera"
  },
  {
   "media": "this.panorama_3326AF10_3FEF_3CF3_418E_9395E076674D",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_3110C4FE_3FEE_AA94_41CF_038F42695873_playlist, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3326AF10_3FEF_3CF3_418E_9395E076674D_camera"
  },
  {
   "media": "this.panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_3110C4FE_3FEE_AA94_41CF_038F42695873_playlist, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_camera"
  },
  {
   "media": "this.panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_3110C4FE_3FEE_AA94_41CF_038F42695873_playlist, 7, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_camera"
  }
 ],
 "id": "ThumbnailList_3110C4FE_3FEE_AA94_41CF_038F42695873_playlist",
 "class": "PlayList"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_741067D0_6CB2_F4F0_41D0_2FD747DFFEA2",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 58.26,
  "pitch": 0,
  "hfov": 120
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0.61,
  "pitch": 4.32,
  "hfov": 120
 }
},
{
 "mouseControlMode": "drag_rotation",
 "displayPlaybackBar": true,
 "gyroscopeVerticalDraggingEnabled": true,
 "class": "PanoramaPlayer",
 "viewerArea": "this.MainViewer",
 "id": "MainViewerPanoramaPlayer",
 "gyroscopeEnabled": true,
 "touchControlMode": "drag_rotation"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_747F07BD_6CB2_F4B0_41C7_E4E88B133207",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -0.18,
  "pitch": 0,
  "hfov": 120
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_743BF7EC_6CB2_F4D0_41D6_5B41769F7C61",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 100.03,
  "pitch": 0,
  "hfov": 120
 }
},
{
 "rotationY": 0,
 "popupDistance": 100,
 "rotationX": 0,
 "popupMaxHeight": "95%",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "class": "PopupPanoramaOverlay",
 "popupMaxWidth": "95%",
 "id": "popup_4DCCD8EE_4347_5D61_41C7_A15139392B70",
 "hideEasing": "cubic_out",
 "showDuration": 500,
 "image": {
  "levels": [
   {
    "url": "media/popup_4DCCD8EE_4347_5D61_41C7_A15139392B70_0_1.png",
    "width": 1024,
    "height": 576,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "pitch": 25.78,
 "hideDuration": 500,
 "yaw": -4.58,
 "hfov": 2.81
},
{
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE_0/f/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE_0/f/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE_0/u/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE_0/u/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE_0/r/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE_0/r/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE_0/b/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE_0/b/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE_0/d/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE_0/d/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE_0/l/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE_0/l/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "\uc815\uc804\ub0a8\uc2e0\ubb38",
 "id": "panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE",
 "pitch": 0,
 "partial": false,
 "hfov": 360,
 "overlays": [
  "this.overlay_33280DF3_3FEF_1F35_41CA_D94DB0424BA7",
  "this.overlay_33281DF3_3FEF_1F35_41CD_99C169A71A85",
  "this.overlay_78807FAC_689E_A759_419B_FC9278D207E3",
  "this.panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE_tcap0"
 ],
 "vfov": 180,
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4",
   "yaw": 0.57,
   "backwardYaw": 179.82,
   "distance": 1,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E",
   "yaw": 179.82,
   "backwardYaw": 2.16,
   "distance": 1,
   "class": "AdjacentPanorama"
  }
 ],
 "hfovMax": 135,
 "thumbnailUrl": "media/panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE_t.jpg",
 "hfovMin": "200%",
 "mapLocations": [
  {
   "map": "this.map_7B9FAAE4_6CD6_DCD0_41B1_ABCB61B15B57",
   "x": 313.26,
   "angle": 14.57,
   "y": 564.83,
   "class": "PanoramaMapLocation"
  }
 ]
},
{
 "displayMovements": [
  {
   "easing": "linear",
   "duration": 1000,
   "class": "TargetRotationalCameraDisplayMovement"
  },
  {
   "targetHfov": 120,
   "easing": "cubic_in_out",
   "duration": 3000,
   "class": "TargetRotationalCameraDisplayMovement",
   "targetPitch": 3.97,
   "targetStereographicFactor": 0
  }
 ],
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "displayOriginPosition": {
  "class": "RotationalCameraDisplayPosition",
  "stereographicFactor": 1,
  "yaw": 1.29,
  "pitch": -90,
  "hfov": 165
 },
 "id": "panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 1.29,
  "pitch": 3.97,
  "hfov": 120
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0.04,
  "pitch": 2.88,
  "hfov": 120
 }
},
{
 "id": "effect_5659CABD_4345_5DE3_41C1_5D443960365D",
 "easing": "linear",
 "from": "left",
 "duration": 500,
 "class": "SlideInEffect"
},
{
 "to": "left",
 "id": "effect_5E49C718_459A_82D5_41BC_347F532C2491",
 "easing": "linear",
 "duration": 500,
 "class": "SlideOutEffect"
},
{
 "fieldOfViewOverlayInsideColor": "#3333FF",
 "label": "\uc9c0\ub3c4",
 "fieldOfViewOverlayRadiusScale": 0.06,
 "width": 739,
 "minimumZoomFactor": 0.5,
 "image": {
  "levels": [
   {
    "url": "media/map_7B9FAAE4_6CD6_DCD0_41B1_ABCB61B15B57.png",
    "width": 739,
    "height": 1025,
    "class": "ImageResourceLevel"
   },
   {
    "url": "media/map_7B9FAAE4_6CD6_DCD0_41B1_ABCB61B15B57_lq.png",
    "width": 217,
    "height": 301,
    "tags": "preload",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "id": "map_7B9FAAE4_6CD6_DCD0_41B1_ABCB61B15B57",
 "initialZoomFactor": 1,
 "overlays": [
  "this.overlay_7B9F9AE4_6CD6_DCD0_41D6_FE56F82155B3",
  "this.overlay_7B9F8AE4_6CD6_DCD0_41AB_5706721CD28A",
  "this.overlay_7B9D1AE4_6CD6_DCD0_41D2_FB4CD1B14FE0",
  "this.overlay_7B9D0AE4_6CD6_DCD0_41D6_AE9E2DAFA106",
  "this.overlay_7B9D6AE4_6CD6_DCD0_41D9_688C05409188",
  "this.overlay_7B9D5AE4_6CD6_DCD0_41C4_FFFE0112C35A",
  "this.overlay_7B9EBAE4_6CD6_DCD0_41C8_36FF27762983",
  "this.overlay_7B9EAAE4_6CD6_DCD0_41C8_516627180546",
  "this.overlay_7B9E9AE4_6CD6_DCD0_41DA_353C376ACAC0"
 ],
 "class": "Map",
 "fieldOfViewOverlayOutsideOpacity": 0,
 "scaleMode": "fit_inside",
 "fieldOfViewOverlayOutsideColor": "#000000",
 "maximumZoomFactor": 1.2,
 "thumbnailUrl": "media/map_7B9FAAE4_6CD6_DCD0_41B1_ABCB61B15B57_t.png",
 "height": 1025,
 "fieldOfViewOverlayInsideOpacity": 0.5
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 1.75,
  "pitch": 4.46,
  "hfov": 120
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_75E61806_6CB2_FB50_41CD_FC0880DB1282",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -0.49,
  "pitch": 0,
  "hfov": 120
 }
},
{
 "rotationY": 0,
 "popupDistance": 100,
 "rotationX": 0,
 "popupMaxHeight": "50%",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "class": "PopupPanoramaOverlay",
 "popupMaxWidth": "50%",
 "id": "popup_583A5A3D_44A6_F51A_41B1_1956C48EE782",
 "hideEasing": "cubic_out",
 "showDuration": 500,
 "image": {
  "levels": [
   {
    "url": "media/popup_583A5A3D_44A6_F51A_41B1_1956C48EE782_0_2.png",
    "width": 1024,
    "height": 275,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "pitch": 1.17,
 "hideDuration": 500,
 "yaw": 7.27,
 "hfov": 26.24
},
{
 "to": "right",
 "id": "effect_6353B5D8_4375_0435_41A6_5A4BC2F5614A",
 "easing": "linear",
 "duration": 500,
 "class": "SlideOutEffect"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -0.47,
  "pitch": 6.99,
  "hfov": 120
 }
},
{
 "items": [
  {
   "media": "this.media_79AAA80A_686A_4F5C_41CF_74925D83036D",
   "class": "Video360PlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerPanoramaPlayer)",
   "player": "this.MainViewerPanoramaPlayer",
   "start": "this.MainViewerPanoramaPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_74425790_6CB2_F570_41A6_DCE28090BEB0, 0, '#000000')",
   "camera": "this.media_79AAA80A_686A_4F5C_41CF_74925D83036D_camera"
  }
 ],
 "id": "playList_74425790_6CB2_F570_41A6_DCE28090BEB0",
 "class": "PlayList"
},
{
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_3326AF10_3FEF_3CF3_418E_9395E076674D_0/f/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3326AF10_3FEF_3CF3_418E_9395E076674D_0/f/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_3326AF10_3FEF_3CF3_418E_9395E076674D_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_3326AF10_3FEF_3CF3_418E_9395E076674D_0/u/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3326AF10_3FEF_3CF3_418E_9395E076674D_0/u/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_3326AF10_3FEF_3CF3_418E_9395E076674D_0/r/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3326AF10_3FEF_3CF3_418E_9395E076674D_0/r/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_3326AF10_3FEF_3CF3_418E_9395E076674D_0/b/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3326AF10_3FEF_3CF3_418E_9395E076674D_0/b/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_3326AF10_3FEF_3CF3_418E_9395E076674D_0/d/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3326AF10_3FEF_3CF3_418E_9395E076674D_0/d/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_3326AF10_3FEF_3CF3_418E_9395E076674D_0/l/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3326AF10_3FEF_3CF3_418E_9395E076674D_0/l/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "\ubc30\ud5a5\uacf5\uc2e0\ub2f9",
 "id": "panorama_3326AF10_3FEF_3CF3_418E_9395E076674D",
 "pitch": 0,
 "partial": false,
 "hfov": 360,
 "overlays": [
  "this.overlay_674F2E05_689E_694B_41C5_2A15201F3C39",
  "this.popup_583A5A3D_44A6_F51A_41B1_1956C48EE782",
  "this.overlay_59E246DE_484D_3721_41C3_2BE3F6605A32",
  "this.panorama_3326AF10_3FEF_3CF3_418E_9395E076674D_tcap0",
  "this.overlay_7A39835D_68B7_9FFB_419D_E7E44D5E50F9"
 ],
 "vfov": 180,
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4",
   "yaw": 155.84,
   "backwardYaw": 132.82,
   "distance": 1,
   "class": "AdjacentPanorama"
  }
 ],
 "hfovMax": 135,
 "thumbnailUrl": "media/panorama_3326AF10_3FEF_3CF3_418E_9395E076674D_t.jpg",
 "hfovMin": "200%",
 "mapLocations": [
  {
   "map": "this.map_7B9FAAE4_6CD6_DCD0_41B1_ABCB61B15B57",
   "x": 374.56,
   "angle": 188.99,
   "y": 574.38,
   "class": "PanoramaMapLocation"
  }
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_741CD7D9_6CB2_F4F0_41D9_5D9716611D24",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -179.43,
  "pitch": 0,
  "hfov": 120
 }
},
{
 "id": "ImageResource_5896B006_44A6_94F6_41CF_1E37991F9803",
 "levels": [
  {
   "url": "media/popup_583A5A3D_44A6_F51A_41B1_1956C48EE782_0_0.png",
   "width": 3071,
   "height": 826,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_583A5A3D_44A6_F51A_41B1_1956C48EE782_0_1.png",
   "width": 2048,
   "height": 550,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_583A5A3D_44A6_F51A_41B1_1956C48EE782_0_2.png",
   "width": 1024,
   "height": 275,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_583A5A3D_44A6_F51A_41B1_1956C48EE782_0_3.png",
   "width": 512,
   "height": 137,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "ImageResource"
},
{
 "automaticRotationSpeed": 10,
 "automaticZoomSpeed": 10,
 "manualRotationSpeed": 1800,
 "class": "RotationalCamera",
 "id": "media_79AAA80A_686A_4F5C_41CF_74925D83036D_camera",
 "manualZoomSpeed": 1,
 "initialPosition": {
  "class": "RotationalCameraPosition",
  "yaw": 0,
  "pitch": 0,
  "hfov": 120
 }
},
{
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "\uc601\ub144\uc804",
 "id": "panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E",
 "pitch": 0,
 "partial": false,
 "hfov": 360,
 "overlays": [
  "this.overlay_330C948B_3FF1_0DD5_41C6_DF17468F4EE6",
  "this.overlay_7A88ED13_68AA_AB4F_41CF_EBE998CC13D0",
  "this.panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_tcap0",
  "this.overlay_787893B0_6915_B6DF_41C4_2BFF4603DA9B"
 ],
 "vfov": 180,
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4",
   "yaw": 179.82,
   "backwardYaw": -79.97,
   "distance": 1,
   "class": "AdjacentPanorama"
  }
 ],
 "hfovMax": 135,
 "thumbnailUrl": "media/panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_t.jpg",
 "hfovMin": "200%",
 "mapLocations": [
  {
   "map": "this.map_7B9FAAE4_6CD6_DCD0_41B1_ABCB61B15B57",
   "x": 167.6,
   "angle": 27.38,
   "y": 310.4,
   "class": "PanoramaMapLocation"
  }
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -3.89,
  "pitch": 1.61,
  "hfov": 120
 }
},
{
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5_0/f/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5_0/f/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5_0/u/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5_0/u/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5_0/r/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5_0/r/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5_0/b/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5_0/b/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5_0/d/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5_0/d/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5_0/l/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5_0/l/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "\uc2e0\uc2e41",
 "id": "panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5",
 "pitch": 0,
 "partial": false,
 "hfov": 360,
 "overlays": [
  "this.overlay_3350E5FA_3FEF_0F37_41CA_D0F68D954A77",
  "this.overlay_3350C5FA_3FEF_0F37_41C8_A832CFB2D2D5",
  "this.overlay_672D3CA8_689E_A959_41C4_12A52EF9F965",
  "this.panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5_tcap0"
 ],
 "vfov": 180,
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4",
   "yaw": -121.74,
   "backwardYaw": -0.24,
   "distance": 1,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_33289CC4_3FEF_1D53_419F_007869704957",
   "yaw": 179.37,
   "backwardYaw": 179.51,
   "distance": 1,
   "class": "AdjacentPanorama"
  }
 ],
 "hfovMax": 135,
 "thumbnailUrl": "media/panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5_t.jpg",
 "hfovMin": "200%",
 "mapLocations": [
  {
   "map": "this.map_7B9FAAE4_6CD6_DCD0_41B1_ABCB61B15B57",
   "x": 327.03,
   "angle": -68.96,
   "y": 436.65,
   "class": "PanoramaMapLocation"
  }
 ]
},
{
 "viewerArea": "this.MapViewer",
 "movementMode": "constrained",
 "id": "MapViewerMapPlayer",
 "class": "MapPlayer"
},
{
 "autoplay": true,
 "audio": {
  "class": "AudioResource",
  "oggUrl": "media/audio_0243F00B_3919_1BB7_41CC_5410EA18FBC6.ogg",
  "mp3Url": "media/audio_0243F00B_3919_1BB7_41CC_5410EA18FBC6.mp3"
 },
 "class": "MediaAudio",
 "id": "audio_0243F00B_3919_1BB7_41CC_5410EA18FBC6",
 "data": {
  "label": "\ub864\uc624\ubc843"
 }
},
{
 "id": "effect_6353A5D8_4375_0435_41B7_34787061D6D6",
 "easing": "linear",
 "from": "right",
 "duration": 500,
 "class": "SlideInEffect"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_740A67C6_6CB2_F4D0_41D3_50A05800D4F2",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -24.16,
  "pitch": 0,
  "hfov": 120
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_745C27A2_6CB2_F550_418D_1FC9471CCA24",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 52.36,
  "pitch": 0,
  "hfov": 120
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_33289CC4_3FEF_1D53_419F_007869704957_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 4.74,
  "pitch": 0.96,
  "hfov": 120
 }
},
{
 "id": "ImageResource_52FFF024_4345_ACE1_41C1_FD3C31F88BEB",
 "levels": [
  {
   "url": "media/popup_4DCCD8EE_4347_5D61_41C7_A15139392B70_0_0.png",
   "width": 1920,
   "height": 1080,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_4DCCD8EE_4347_5D61_41C7_A15139392B70_0_1.png",
   "width": 1024,
   "height": 576,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_4DCCD8EE_4347_5D61_41C7_A15139392B70_0_2.png",
   "width": 512,
   "height": 288,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "ImageResource"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_742867E2_6CB2_F4D0_41DA_1F4B42683998",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -0.18,
  "pitch": 0,
  "hfov": 120
 }
},
{
 "autoplay": true,
 "loop": true,
 "audio": {
  "class": "AudioResource",
  "oggUrl": "media/audio_36703AAB_3DE4_CC4F_41CD_7AC3E7E4C9E6.ogg",
  "mp3Url": "media/audio_36703AAB_3DE4_CC4F_41CD_7AC3E7E4C9E6.mp3"
 },
 "class": "MediaAudio",
 "id": "audio_36703AAB_3DE4_CC4F_41CD_7AC3E7E4C9E6",
 "data": {
  "label": "S_SMA_TR03 More and More"
 }
},
{
 "items": [
  {
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_7B9FAAE4_6CD6_DCD0_41B1_ABCB61B15B57",
   "player": "this.MapViewerMapPlayer",
   "class": "MapPlayListItem"
  }
 ],
 "id": "playList_7444C792_6CB2_F570_41CC_D3F00157582B",
 "class": "PlayList"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_75F1A80F_6CB2_FB50_41DB_08816E7AC894",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -0.18,
  "pitch": 0,
  "hfov": 120
 }
},
{
 "label": "3.\uc815\uc804_\uacfc\uac70",
 "id": "media_79AAA80A_686A_4F5C_41CF_74925D83036D",
 "loop": false,
 "partial": false,
 "pitch": 0,
 "overlays": [],
 "vfov": 180,
 "class": "Video360",
 "hfovMax": 140,
 "thumbnailUrl": "media/media_79AAA80A_686A_4F5C_41CF_74925D83036D_t.jpg",
 "hfovMin": 60,
 "hfov": 360,
 "video": [
  {
   "width": 2880,
   "posterURL": "media/media_79AAA80A_686A_4F5C_41CF_74925D83036D_poster.jpg",
   "class": "Video360Resource",
   "type": "application/x-mpegurl",
   "framerate": 29.97,
   "url": "media/media_79AAA80A_686A_4F5C_41CF_74925D83036D.m3u8",
   "height": 1440
  },
  {
   "width": 2880,
   "posterURL": "media/media_79AAA80A_686A_4F5C_41CF_74925D83036D_poster.jpg",
   "framerate": 29.97,
   "class": "Video360Resource",
   "type": "video/mp4",
   "bitrate": 10141,
   "url": "media/media_79AAA80A_686A_4F5C_41CF_74925D83036D.mp4",
   "height": 1440
  }
 ]
},
{
 "to": "left",
 "id": "effect_5659BABD_4345_5DE3_41B1_4057E1D5D6C7",
 "easing": "linear",
 "duration": 500,
 "class": "SlideOutEffect"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_3326AF10_3FEF_3CF3_418E_9395E076674D_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 7.67,
  "pitch": -3,
  "hfov": 120
 }
},
{
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_0/f/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_0/f/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_0/u/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_0/u/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_0/r/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_0/r/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_0/b/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_0/b/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_0/d/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_0/d/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_0/l/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_0/l/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "\uc885\ubb18\uc785\uad6c",
 "id": "panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E",
 "pitch": 0,
 "partial": false,
 "hfov": 360,
 "overlays": [
  "this.overlay_32E047E5_3FEF_0B5D_41C2_E8A68EB19F73",
  "this.overlay_663CF80D_690B_CD80_41AF_4030459DC210",
  "this.panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_tcap0"
 ],
 "vfov": 180,
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE",
   "yaw": 2.16,
   "backwardYaw": 179.82,
   "distance": 1,
   "class": "AdjacentPanorama"
  }
 ],
 "hfovMax": 135,
 "thumbnailUrl": "media/panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_t.jpg",
 "hfovMin": "200%",
 "mapLocations": [
  {
   "map": "this.map_7B9FAAE4_6CD6_DCD0_41B1_ABCB61B15B57",
   "x": 438.33,
   "angle": 0,
   "y": 978.1,
   "class": "PanoramaMapLocation"
  }
 ]
},
{
 "items": [
  {
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_7B9FAAE4_6CD6_DCD0_41B1_ABCB61B15B57",
   "player": "this.MapViewerMapPlayer",
   "class": "MapPlayListItem"
  }
 ],
 "id": "playList_7444B792_6CB2_F570_41D2_B7A590A35F44",
 "class": "PlayList"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_75837818_6CB2_FB70_4172_83D0884014A1",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -177.84,
  "pitch": 0,
  "hfov": 120
 }
},
{
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "\uce60\uc0ac\ub2f9",
 "id": "panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57",
 "pitch": 0,
 "partial": false,
 "hfov": 360,
 "overlays": [
  "this.overlay_333B5203_3FEF_04D5_41C6_2B6326459E1B",
  "this.overlay_6737305B_689F_B9FF_41C7_A915B48112D8",
  "this.panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_tcap0",
  "this.overlay_7A8F04B2_68B9_B949_41CC_7B355B4BC7CB"
 ],
 "vfov": 180,
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4",
   "yaw": -147.83,
   "backwardYaw": -127.64,
   "distance": 1,
   "class": "AdjacentPanorama"
  }
 ],
 "hfovMax": 135,
 "thumbnailUrl": "media/panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_t.jpg",
 "hfovMin": "200%",
 "mapLocations": [
  {
   "map": "this.map_7B9FAAE4_6CD6_DCD0_41B1_ABCB61B15B57",
   "x": 250.27,
   "angle": 199.99,
   "y": 514.51,
   "class": "PanoramaMapLocation"
  }
 ]
},
{
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_33289CC4_3FEF_1D53_419F_007869704957_0/f/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_33289CC4_3FEF_1D53_419F_007869704957_0/f/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_33289CC4_3FEF_1D53_419F_007869704957_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_33289CC4_3FEF_1D53_419F_007869704957_0/u/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_33289CC4_3FEF_1D53_419F_007869704957_0/u/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_33289CC4_3FEF_1D53_419F_007869704957_0/r/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_33289CC4_3FEF_1D53_419F_007869704957_0/r/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_33289CC4_3FEF_1D53_419F_007869704957_0/b/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_33289CC4_3FEF_1D53_419F_007869704957_0/b/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_33289CC4_3FEF_1D53_419F_007869704957_0/d/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_33289CC4_3FEF_1D53_419F_007869704957_0/d/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_33289CC4_3FEF_1D53_419F_007869704957_0/l/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_33289CC4_3FEF_1D53_419F_007869704957_0/l/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "\uc2e0\uc2e42",
 "id": "panorama_33289CC4_3FEF_1D53_419F_007869704957",
 "pitch": 0,
 "partial": false,
 "hfov": 360,
 "overlays": [
  "this.overlay_3328BCC4_3FEF_1D53_41C2_5D07A77A92F7",
  "this.overlay_33286CC4_3FEF_1D53_41C4_AA6A2A79A97D",
  "this.panorama_33289CC4_3FEF_1D53_419F_007869704957_tcap0"
 ],
 "vfov": 180,
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5",
   "yaw": 179.51,
   "backwardYaw": 179.37,
   "distance": 1,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4",
   "class": "AdjacentPanorama"
  }
 ],
 "hfovMax": 135,
 "thumbnailUrl": "media/panorama_33289CC4_3FEF_1D53_419F_007869704957_t.jpg",
 "hfovMin": "200%",
 "mapLocations": [
  {
   "map": "this.map_7B9FAAE4_6CD6_DCD0_41B1_ABCB61B15B57",
   "x": 382.62,
   "angle": 114.43,
   "y": 456.91,
   "class": "PanoramaMapLocation"
  }
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_75D4B7FD_6CB2_F4B0_41CB_168ED7054528",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 179.76,
  "pitch": 0,
  "hfov": 120
 }
},
{
 "items": [
  "this.PanoramaPlayListItem_7445E792_6CB2_F570_41B1_4FC98D0330F3",
  "this.PanoramaPlayListItem_74456792_6CB2_F570_41D3_B2ACEE18DE11",
  "this.PanoramaPlayListItem_744A8792_6CB2_F570_41D2_424BD6B3DA87",
  "this.PanoramaPlayListItem_744A1793_6CB2_F570_41B7_F4E3AD43A3AE",
  "this.PanoramaPlayListItem_744B8793_6CB2_F570_41C2_B32A6BAB2693",
  "this.PanoramaPlayListItem_744B0793_6CB2_F570_415F_DD91CE53B8FC",
  "this.PanoramaPlayListItem_74488793_6CB2_F570_41AC_EADA292C4F52",
  "this.PanoramaPlayListItem_74480793_6CB2_F570_41D8_A792B580302D"
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_747047B4_6CB2_F4B0_41D9_8F554774E8E7",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 32.17,
  "pitch": 0,
  "hfov": 120
 }
},
{
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_0/f/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_0/f/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_0/u/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_0/u/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_0/r/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_0/r/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_0/b/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_0/b/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_0/d/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_0/d/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_0/l/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_0/l/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "\uc815\uc804",
 "id": "panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4",
 "pitch": 0,
 "partial": false,
 "hfov": 360,
 "overlays": [
  "this.overlay_33512189_3FEF_07D5_41AF_4CA09E6C3635",
  "this.overlay_33511189_3FEF_07D5_41C1_F8DC1D054C6B",
  "this.overlay_33516189_3FEF_07D5_4191_633263E7FA4C",
  "this.overlay_33514189_3FEF_07D5_41C4_6B5790F03EA8",
  "this.overlay_622E838F_6C52_6D50_41CB_88695CD969AE",
  "this.overlay_7FBB6B11_6CF5_BD70_41B1_45166B6FFA9D",
  "this.overlay_33508189_3FEF_07D5_41BF_5A1D2001CBB4",
  "this.overlay_3350C189_3FEF_07D5_41B5_E92EC747AF60",
  "this.overlay_6731E47B_689B_B9BF_41CC_1C07FB252BBA",
  "this.overlay_675E1EE0_689E_E6C9_41D5_A39563AC5673",
  "this.overlay_78B584D9_689A_FAFB_41A7_79A276FAA71D",
  "this.popup_4DCCD8EE_4347_5D61_41C7_A15139392B70",
  "this.panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_tcap0",
  "this.overlay_67057898_68BE_49B8_41CD_32CF968D5BAB"
 ],
 "vfov": 180,
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57",
   "yaw": -127.64,
   "backwardYaw": -147.83,
   "distance": 1,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E",
   "yaw": -79.97,
   "backwardYaw": 179.82,
   "distance": 1,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_3326AF10_3FEF_3CF3_418E_9395E076674D",
   "yaw": 132.82,
   "backwardYaw": 155.84,
   "distance": 1,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5",
   "yaw": -0.24,
   "backwardYaw": -121.74,
   "distance": 1,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.media_79AAA80A_686A_4F5C_41CF_74925D83036D",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE",
   "yaw": 179.82,
   "backwardYaw": 0.57,
   "distance": 1,
   "class": "AdjacentPanorama"
  }
 ],
 "hfovMax": 135,
 "thumbnailUrl": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_t.jpg",
 "hfovMin": "200%",
 "mapLocations": [
  {
   "map": "this.map_7B9FAAE4_6CD6_DCD0_41B1_ABCB61B15B57",
   "x": 338.59,
   "angle": 21.83,
   "y": 507.69,
   "class": "PanoramaMapLocation"
  }
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_75C517F4_6CB2_F4B0_41C0_EA33DA88842A",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -47.18,
  "pitch": 0,
  "hfov": 120
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_746A87AB_6CB2_F550_41C7_32AEDDE81794",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -0.63,
  "pitch": 0,
  "hfov": 120
 }
},
{
 "toolTipBorderColor": "#FFFFFF",
 "toolTipShadowSpread": 0,
 "id": "MainViewer",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "toolTipFontSize": "2.5vmin",
 "toolTipOpacity": 1,
 "playbackBarHeight": 10,
 "toolTipShadowBlurRadius": 3,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipTextShadowColor": "#000000",
 "right": -0.35,
 "playbackBarBackgroundColorDirection": "vertical",
 "width": "99.975%",
 "playbackBarRight": 0,
 "toolTipPaddingBottom": 8,
 "toolTipFontWeight": "bold",
 "toolTipShadowColor": "#333333",
 "minHeight": 50,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBorderSize": 0,
 "progressBarBorderSize": 0,
 "minWidth": 100,
 "playbackBarBorderRadius": 0,
 "toolTipShadowOpacity": 1,
 "playbackBarProgressBorderColor": "#000000",
 "paddingLeft": 0,
 "borderSize": 0,
 "toolTipFontStyle": "normal",
 "playbackBarHeadBorderRadius": 0,
 "progressLeft": 0,
 "playbackBarHeadBorderColor": "#000000",
 "playbackBarProgressOpacity": 1,
 "propagateClick": false,
 "playbackBarBorderSize": 0,
 "playbackBarHeadBorderSize": 0,
 "vrPointerSelectionColor": "#FF6600",
 "toolTipFontFamily": "나눔스퀘어",
 "toolTipTextShadowOpacity": 0,
 "shadow": false,
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "transitionDuration": 500,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "firstTransitionDuration": 0,
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "progressBottom": 0,
 "toolTipFontColor": "#FFFFFF",
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "paddingRight": 0,
 "toolTipBackgroundColor": "#000000",
 "playbackBarOpacity": 1,
 "progressBackgroundOpacity": 1,
 "class": "ViewerArea",
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarHeadShadowOpacity": 0.7,
 "vrPointerColor": "#FFFFFF",
 "transitionMode": "blending",
 "progressBarOpacity": 1,
 "displayTooltipInTouchScreens": true,
 "top": 0,
 "bottom": "0%",
 "toolTipBorderSize": 1,
 "toolTipShadowHorizontalLength": 0,
 "toolTipShadowVerticalLength": 0,
 "toolTipPaddingTop": 8,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipPaddingLeft": 8,
 "toolTipPaddingRight": 8,
 "toolTipDisplayTime": 600,
 "progressBorderRadius": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "toolTipBorderRadius": 3,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBarBorderColor": "#000000",
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarHeadHeight": 15,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 5,
 "data": {
  "name": "Main Viewer"
 },
 "progressBackgroundColorDirection": "vertical",
 "progressBorderColor": "#000000",
 "playbackBarHeadOpacity": 1,
 "progressBarBackgroundColor": [
  "#3399FF"
 ]
},
{
 "toolTipBorderColor": "#FFFFFF",
 "toolTipShadowSpread": 0,
 "id": "MapViewer",
 "left": "0.01%",
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "toolTipFontSize": "1.5vmin",
 "toolTipOpacity": 1,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeight": 10,
 "right": "69.74%",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipTextShadowColor": "#000000",
 "toolTipShadowBlurRadius": 3,
 "playbackBarBackgroundColorDirection": "vertical",
 "playbackBarRight": 0,
 "toolTipPaddingBottom": 8,
 "toolTipFontWeight": "bold",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipShadowColor": "#333333",
 "minHeight": 1,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "playbackBarProgressBorderSize": 0,
 "paddingLeft": 0,
 "minWidth": 1,
 "playbackBarBorderRadius": 0,
 "toolTipShadowOpacity": 1,
 "playbackBarProgressBorderColor": "#000000",
 "borderSize": 0,
 "toolTipFontStyle": "normal",
 "playbackBarHeadBorderRadius": 0,
 "progressLeft": 0,
 "playbackBarHeadBorderColor": "#000000",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "propagateClick": false,
 "playbackBarBorderSize": 0,
 "vrPointerSelectionColor": "#FF6600",
 "toolTipFontFamily": "나눔스퀘어",
 "toolTipTextShadowOpacity": 0,
 "shadow": false,
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "transitionDuration": 500,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "firstTransitionDuration": 0,
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipFontColor": "#FFFFFF",
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "paddingRight": 0,
 "toolTipBackgroundColor": "#000000",
 "playbackBarOpacity": 1,
 "progressBackgroundOpacity": 1,
 "class": "ViewerArea",
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarHeadShadowOpacity": 0.7,
 "vrPointerColor": "#FFFFFF",
 "transitionMode": "blending",
 "progressBarOpacity": 1,
 "displayTooltipInTouchScreens": true,
 "top": "39.54%",
 "bottom": "2.07%",
 "toolTipBorderSize": 1,
 "toolTipShadowHorizontalLength": 0,
 "toolTipShadowVerticalLength": 0,
 "toolTipPaddingTop": 8,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipPaddingLeft": 8,
 "toolTipPaddingRight": 8,
 "toolTipDisplayTime": 600,
 "progressBorderRadius": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "toolTipBorderRadius": 3,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBarBorderColor": "#000000",
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarHeadHeight": 15,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "visible": false,
 "playbackBarBottom": 0,
 "data": {
  "name": "MapViewer"
 },
 "progressBackgroundColorDirection": "vertical",
 "progressBorderColor": "#000000",
 "playbackBarHeadOpacity": 1,
 "progressBarBackgroundColor": [
  "#3399FF"
 ]
},
{
 "id": "ThumbnailList_3110C4FE_3FEE_AA94_41CF_038F42695873",
 "itemPaddingRight": 3,
 "width": 91.2,
 "selectedItemLabelFontColor": "#FFCC00",
 "scrollBarWidth": 10,
 "right": "1.34%",
 "scrollBarOpacity": 0.5,
 "itemHorizontalAlign": "center",
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "itemLabelGap": 3,
 "minHeight": 20,
 "itemPaddingLeft": 3,
 "paddingLeft": 0,
 "itemBorderRadius": 0,
 "height": 831,
 "minWidth": 20,
 "itemThumbnailShadowOpacity": 0.54,
 "backgroundOpacity": 0,
 "itemPaddingTop": 3,
 "selectedItemLabelFontWeight": "bold",
 "borderSize": 0,
 "itemThumbnailShadow": true,
 "rollOverItemBackgroundOpacity": 0,
 "itemBackgroundColorRatios": [],
 "itemBackgroundColor": [],
 "rollOverItemLabelFontWeight": "bold",
 "propagateClick": false,
 "shadow": false,
 "itemLabelPosition": "bottom",
 "itemOpacity": 1,
 "itemLabelFontWeight": "normal",
 "itemBackgroundOpacity": 0,
 "itemLabelTextDecoration": "none",
 "scrollBarColor": "#FFFFFF",
 "itemThumbnailShadowBlurRadius": 8,
 "itemLabelFontSize": 14,
 "playList": "this.ThumbnailList_3110C4FE_3FEE_AA94_41CF_038F42695873_playlist",
 "paddingRight": 0,
 "itemThumbnailScaleMode": "fit_outside",
 "class": "ThumbnailList",
 "itemThumbnailOpacity": 1,
 "itemLabelFontColor": "#FFFFFF",
 "itemThumbnailShadowSpread": 1,
 "itemThumbnailBorderRadius": 5,
 "itemThumbnailHeight": 55,
 "bottom": "0%",
 "itemBackgroundColorDirection": "vertical",
 "gap": 0,
 "borderRadius": 5,
 "itemVerticalAlign": "middle",
 "itemThumbnailShadowColor": "#000000",
 "paddingTop": 0,
 "itemPaddingBottom": 3,
 "layout": "vertical",
 "itemThumbnailShadowVerticalLength": 3,
 "itemThumbnailWidth": 61,
 "itemMode": "normal",
 "itemLabelFontStyle": "normal",
 "paddingBottom": 0,
 "itemThumbnailShadowHorizontalLength": 3,
 "itemLabelHorizontalAlign": "center",
 "data": {
  "name": "ThumbnailList35762"
 },
 "visible": false,
 "verticalAlign": "top",
 "itemLabelFontFamily": "Arial"
},
{
 "maxWidth": 128,
 "id": "IconButton_4CB3D624_437C_7DE3_41B5_894BCC8B5F59",
 "width": 37.65,
 "maxHeight": 128,
 "horizontalAlign": "center",
 "paddingRight": 0,
 "right": "1.46%",
 "class": "IconButton",
 "minHeight": 1,
 "paddingLeft": 0,
 "top": "2.8%",
 "height": 34,
 "minWidth": 1,
 "mode": "toggle",
 "backgroundOpacity": 0,
 "iconURL": "skin/IconButton_4CB3D624_437C_7DE3_41B5_894BCC8B5F59.png",
 "borderSize": 0,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "propagateClick": false,
 "data": {
  "name": "IconButton1493"
 },
 "shadow": false,
 "verticalAlign": "middle",
 "transparencyActive": true,
 "cursor": "hand"
},
{
 "maxHeight": 64,
 "maxWidth": 64,
 "id": "Image_562AA81F_4345_BCDF_41B2_7D1C43191DC0",
 "horizontalAlign": "center",
 "paddingRight": 0,
 "right": "7.26%",
 "url": "skin/Image_562AA81F_4345_BCDF_41B2_7D1C43191DC0.png",
 "class": "Image",
 "width": "2.334%",
 "minHeight": 1,
 "paddingLeft": 0,
 "top": "2.46%",
 "bottom": "92.95%",
 "minWidth": 1,
 "backgroundOpacity": 0,
 "borderSize": 0,
 "borderRadius": 0,
 "paddingTop": 0,
 "click": "if(!this.ThumbnailList_3110C4FE_3FEE_AA94_41CF_038F42695873.get('visible')){ this.setComponentVisibility(this.ThumbnailList_3110C4FE_3FEE_AA94_41CF_038F42695873, true, 0, this.effect_6353A5D8_4375_0435_41B7_34787061D6D6, 'showEffect', false) } else { this.setComponentVisibility(this.ThumbnailList_3110C4FE_3FEE_AA94_41CF_038F42695873, false, 0, this.effect_6353B5D8_4375_0435_41A6_5A4BC2F5614A, 'hideEffect', false) }",
 "paddingBottom": 0,
 "propagateClick": false,
 "data": {
  "name": "Image5191"
 },
 "verticalAlign": "middle",
 "shadow": false,
 "scaleMode": "fit_inside"
},
{
 "id": "IconButton_2DA98648_3FAE_FE10_41C2_2831605922EE",
 "width": 40.9,
 "horizontalAlign": "center",
 "paddingRight": 0,
 "right": "4.32%",
 "class": "IconButton",
 "minHeight": 0,
 "paddingLeft": 0,
 "top": "2.8%",
 "pressedIconURL": "skin/IconButton_2DA98648_3FAE_FE10_41C2_2831605922EE_pressed.png",
 "height": 38.25,
 "minWidth": 0,
 "mode": "toggle",
 "backgroundOpacity": 0,
 "iconURL": "skin/IconButton_2DA98648_3FAE_FE10_41C2_2831605922EE.png",
 "borderSize": 0,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "propagateClick": false,
 "data": {
  "name": "Button53070"
 },
 "verticalAlign": "middle",
 "shadow": false,
 "transparencyActive": true,
 "cursor": "hand"
},
{
 "maxHeight": 64,
 "maxWidth": 64,
 "id": "Image_57653967_4347_7F6F_4166_5A375DABB586",
 "left": "3.38%",
 "horizontalAlign": "center",
 "paddingRight": 0,
 "class": "Image",
 "url": "skin/Image_57653967_4347_7F6F_4166_5A375DABB586.png",
 "width": "2.829%",
 "minHeight": 1,
 "paddingLeft": 0,
 "top": "89.34%",
 "bottom": "5.86%",
 "minWidth": 1,
 "backgroundOpacity": 0,
 "borderSize": 0,
 "borderRadius": 0,
 "paddingTop": 0,
 "click": "if(!this.MapViewer.get('visible')){ this.setComponentVisibility(this.MapViewer, true, 0, this.effect_5659CABD_4345_5DE3_41C1_5D443960365D, 'showEffect', false) } else { this.setComponentVisibility(this.MapViewer, false, 0, this.effect_5659BABD_4345_5DE3_41B1_4057E1D5D6C7, 'hideEffect', false) }",
 "paddingBottom": 0,
 "propagateClick": false,
 "data": {
  "name": "Image4456"
 },
 "verticalAlign": "middle",
 "shadow": false,
 "scaleMode": "fit_inside"
},
{
 "id": "veilPopupPanorama",
 "left": 0,
 "backgroundColorDirection": "vertical",
 "right": 0,
 "paddingRight": 0,
 "class": "UIComponent",
 "minHeight": 0,
 "paddingLeft": 0,
 "top": 0,
 "bottom": 0,
 "backgroundColor": [
  "#000000"
 ],
 "minWidth": 0,
 "backgroundOpacity": 0.55,
 "borderSize": 0,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "propagateClick": false,
 "data": {
  "name": "UIComponent9676"
 },
 "backgroundColorRatios": [
  0
 ],
 "shadow": false,
 "visible": false,
 "showEffect": {
  "easing": "cubic_in_out",
  "duration": 350,
  "class": "FadeInEffect"
 }
},
{
 "id": "zoomImagePopupPanorama",
 "left": 0,
 "backgroundColorDirection": "vertical",
 "right": 0,
 "paddingRight": 0,
 "class": "ZoomImage",
 "minHeight": 0,
 "paddingLeft": 0,
 "top": 0,
 "bottom": 0,
 "backgroundColor": [],
 "minWidth": 0,
 "backgroundOpacity": 1,
 "borderSize": 0,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "propagateClick": false,
 "data": {
  "name": "ZoomImage9677"
 },
 "backgroundColorRatios": [],
 "shadow": false,
 "visible": false,
 "scaleMode": "custom"
},
{
 "rollOverIconColor": "#666666",
 "fontFamily": "Arial",
 "layout": "horizontal",
 "id": "closeButtonPopupPanorama",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "center",
 "paddingRight": 5,
 "right": 10,
 "shadowColor": "#000000",
 "class": "CloseButton",
 "minHeight": 0,
 "iconColor": "#000000",
 "paddingLeft": 5,
 "top": 10,
 "borderColor": "#000000",
 "iconHeight": 20,
 "backgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "shadowBlurRadius": 6,
 "minWidth": 0,
 "mode": "push",
 "fontColor": "#FFFFFF",
 "fontSize": "1.29vmin",
 "backgroundOpacity": 0.3,
 "shadowSpread": 1,
 "borderSize": 0,
 "iconBeforeLabel": true,
 "borderRadius": 0,
 "paddingTop": 5,
 "label": "",
 "fontStyle": "normal",
 "paddingBottom": 5,
 "gap": 5,
 "iconWidth": 20,
 "propagateClick": false,
 "data": {
  "name": "CloseButton9678"
 },
 "backgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "shadow": false,
 "visible": false,
 "showEffect": {
  "easing": "cubic_in_out",
  "duration": 350,
  "class": "FadeInEffect"
 },
 "verticalAlign": "middle",
 "textDecoration": "none",
 "pressedIconColor": "#888888",
 "cursor": "hand",
 "fontWeight": "normal",
 "iconLineWidth": 5
},
{
 "maps": [
  {
   "hfov": 9.36,
   "yaw": 0.57,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE_1_HS_3_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.5,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4, this.camera_75F1A80F_6CB2_FB50_41DB_08816E7AC894); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_7867E069_6CEE_ABD0_4171_43F57888229B",
   "yaw": 0.57,
   "hfov": 9.36,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -3.5,
   "distance": 100
  }
 ],
 "id": "overlay_33280DF3_3FEF_1F35_41CA_D94DB0424BA7",
 "data": {
  "label": "Arrow 01b"
 },
 "rollOverDisplay": false
},
{
 "maps": [
  {
   "hfov": 10,
   "yaw": 179.82,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE_1_HS_4_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.56,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E, this.camera_75837818_6CB2_FB70_4172_83D0884014A1); this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_7867B069_6CEE_ABD0_41D0_1F26669E266B",
   "yaw": 179.82,
   "hfov": 10,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": 1.56,
   "distance": 100
  }
 ],
 "id": "overlay_33281DF3_3FEF_1F35_41CD_99C169A71A85",
 "data": {
  "label": "Arrow 01b"
 },
 "rollOverDisplay": false
},
{
 "maps": [
  {
   "hfov": 17.33,
   "yaw": 0.09,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE_1_HS_13_0_0_map.gif",
      "width": 23,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 35.38,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE_1_HS_13_0.png",
      "width": 170,
      "height": 114,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "hfov": 17.33,
   "yaw": 0.09,
   "pitch": 35.38
  }
 ],
 "id": "overlay_78807FAC_689E_A759_419B_FC9278D207E3",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE_tcap0.png",
    "width": 850,
    "height": 850,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "hfov": 45,
 "class": "TripodCapPanoramaOverlay",
 "rotate": false,
 "inertia": false,
 "id": "panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE_tcap0",
 "distance": 50
},
{
 "map": {
  "width": 50,
  "x": 413.33,
  "image": {
   "levels": [
    {
     "url": "media/map_7B9FAAE4_6CD6_DCD0_41B1_ABCB61B15B57_HS_40_map.gif",
     "width": 16,
     "height": 15,
     "class": "ImageResourceLevel"
    }
   ],
   "class": "ImageResource"
  },
  "offsetX": 0,
  "class": "HotspotMapOverlayMap",
  "offsetY": 0,
  "height": 50,
  "y": 953.1
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 0)",
   "toolTip": "\uc885\ubb18",
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 413.33,
  "y": 953.1,
  "class": "HotspotMapOverlayImage",
  "width": 50,
  "image": {
   "levels": [
    {
     "url": "media/map_7B9FAAE4_6CD6_DCD0_41B1_ABCB61B15B57_HS_40.png",
     "width": 50,
     "height": 49,
     "class": "ImageResourceLevel"
    }
   ],
   "class": "ImageResource"
  },
  "height": 50
 },
 "class": "AreaHotspotMapOverlay",
 "useHandCursor": true,
 "id": "overlay_7B9F9AE4_6CD6_DCD0_41D6_FE56F82155B3",
 "rollOverDisplay": false
},
{
 "map": {
  "width": 50,
  "x": 288.26,
  "image": {
   "levels": [
    {
     "url": "media/map_7B9FAAE4_6CD6_DCD0_41B1_ABCB61B15B57_HS_41_map.gif",
     "width": 16,
     "height": 15,
     "class": "ImageResourceLevel"
    }
   ],
   "class": "ImageResource"
  },
  "offsetX": 0,
  "class": "HotspotMapOverlayMap",
  "offsetY": 0,
  "height": 50,
  "y": 539.83
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 1)",
   "toolTip": "\uc815\uc804\ub0a8\uc2e0\ubb38",
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 288.26,
  "y": 539.83,
  "class": "HotspotMapOverlayImage",
  "width": 50,
  "image": {
   "levels": [
    {
     "url": "media/map_7B9FAAE4_6CD6_DCD0_41B1_ABCB61B15B57_HS_41.png",
     "width": 50,
     "height": 49,
     "class": "ImageResourceLevel"
    }
   ],
   "class": "ImageResource"
  },
  "height": 50
 },
 "class": "AreaHotspotMapOverlay",
 "useHandCursor": true,
 "id": "overlay_7B9F8AE4_6CD6_DCD0_41AB_5706721CD28A",
 "rollOverDisplay": false
},
{
 "map": {
  "width": 50,
  "x": 349.56,
  "image": {
   "levels": [
    {
     "url": "media/map_7B9FAAE4_6CD6_DCD0_41B1_ABCB61B15B57_HS_42_map.gif",
     "width": 16,
     "height": 15,
     "class": "ImageResourceLevel"
    }
   ],
   "class": "ImageResource"
  },
  "offsetX": 0,
  "class": "HotspotMapOverlayMap",
  "offsetY": 0,
  "height": 50,
  "y": 549.38
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 5)",
   "toolTip": "\uacf5\uc2e0\ub2f9",
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 349.56,
  "y": 549.38,
  "class": "HotspotMapOverlayImage",
  "width": 50,
  "image": {
   "levels": [
    {
     "url": "media/map_7B9FAAE4_6CD6_DCD0_41B1_ABCB61B15B57_HS_42.png",
     "width": 50,
     "height": 49,
     "class": "ImageResourceLevel"
    }
   ],
   "class": "ImageResource"
  },
  "height": 50
 },
 "class": "AreaHotspotMapOverlay",
 "useHandCursor": true,
 "id": "overlay_7B9D1AE4_6CD6_DCD0_41D2_FB4CD1B14FE0",
 "rollOverDisplay": false
},
{
 "map": {
  "width": 50,
  "x": 225.27,
  "image": {
   "levels": [
    {
     "url": "media/map_7B9FAAE4_6CD6_DCD0_41B1_ABCB61B15B57_HS_43_map.gif",
     "width": 16,
     "height": 15,
     "class": "ImageResourceLevel"
    }
   ],
   "class": "ImageResource"
  },
  "offsetX": 0,
  "class": "HotspotMapOverlayMap",
  "offsetY": 0,
  "height": 50,
  "y": 489.51
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 6)",
   "toolTip": "\uce60\uc0ac\ub2f9",
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 225.27,
  "y": 489.51,
  "class": "HotspotMapOverlayImage",
  "width": 50,
  "image": {
   "levels": [
    {
     "url": "media/map_7B9FAAE4_6CD6_DCD0_41B1_ABCB61B15B57_HS_43.png",
     "width": 50,
     "height": 49,
     "class": "ImageResourceLevel"
    }
   ],
   "class": "ImageResource"
  },
  "height": 50
 },
 "class": "AreaHotspotMapOverlay",
 "useHandCursor": true,
 "id": "overlay_7B9D0AE4_6CD6_DCD0_41D6_AE9E2DAFA106",
 "rollOverDisplay": false
},
{
 "map": {
  "width": 50,
  "x": 142.6,
  "image": {
   "levels": [
    {
     "url": "media/map_7B9FAAE4_6CD6_DCD0_41B1_ABCB61B15B57_HS_44_map.gif",
     "width": 16,
     "height": 15,
     "class": "ImageResourceLevel"
    }
   ],
   "class": "ImageResource"
  },
  "offsetX": 0,
  "class": "HotspotMapOverlayMap",
  "offsetY": 0,
  "height": 50,
  "y": 285.4
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 7)",
   "toolTip": "\uc601\ub155\uc804",
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 142.6,
  "y": 285.4,
  "class": "HotspotMapOverlayImage",
  "width": 50,
  "image": {
   "levels": [
    {
     "url": "media/map_7B9FAAE4_6CD6_DCD0_41B1_ABCB61B15B57_HS_44.png",
     "width": 50,
     "height": 49,
     "class": "ImageResourceLevel"
    }
   ],
   "class": "ImageResource"
  },
  "height": 50
 },
 "class": "AreaHotspotMapOverlay",
 "useHandCursor": true,
 "id": "overlay_7B9D6AE4_6CD6_DCD0_41D9_688C05409188",
 "rollOverDisplay": false
},
{
 "map": {
  "width": 45.44,
  "x": 517.69,
  "image": {
   "levels": [
    {
     "url": "media/map_7B9FAAE4_6CD6_DCD0_41B1_ABCB61B15B57_HS_30_map.gif",
     "width": 19,
     "height": 16,
     "class": "ImageResourceLevel"
    }
   ],
   "class": "ImageResource"
  },
  "offsetX": 0,
  "class": "HotspotMapOverlayMap",
  "offsetY": 0,
  "height": 37.26,
  "y": 197.74
 },
 "areas": [
  {
   "click": "this.setComponentVisibility(this.MapViewer, false, 0, this.effect_5E49C718_459A_82D5_41BC_347F532C2491, 'hideEffect', false)",
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 517.69,
  "y": 197.74,
  "class": "HotspotMapOverlayImage",
  "width": 45.44,
  "image": {
   "levels": [
    {
     "url": "media/map_7B9FAAE4_6CD6_DCD0_41B1_ABCB61B15B57_HS_30.png",
     "width": 45,
     "height": 37,
     "class": "ImageResourceLevel"
    }
   ],
   "class": "ImageResource"
  },
  "height": 37.26
 },
 "class": "AreaHotspotMapOverlay",
 "useHandCursor": true,
 "id": "overlay_7B9D5AE4_6CD6_DCD0_41C4_FFFE0112C35A",
 "rollOverDisplay": false
},
{
 "map": {
  "width": 50,
  "x": 313.59,
  "image": {
   "levels": [
    {
     "url": "media/map_7B9FAAE4_6CD6_DCD0_41B1_ABCB61B15B57_HS_45_map.gif",
     "width": 16,
     "height": 15,
     "class": "ImageResourceLevel"
    }
   ],
   "class": "ImageResource"
  },
  "offsetX": 0,
  "class": "HotspotMapOverlayMap",
  "offsetY": 0,
  "height": 50,
  "y": 482.69
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 2)",
   "toolTip": "\uc815\uc804",
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 313.59,
  "y": 482.69,
  "class": "HotspotMapOverlayImage",
  "width": 50,
  "image": {
   "levels": [
    {
     "url": "media/map_7B9FAAE4_6CD6_DCD0_41B1_ABCB61B15B57_HS_45.png",
     "width": 50,
     "height": 49,
     "class": "ImageResourceLevel"
    }
   ],
   "class": "ImageResource"
  },
  "height": 50
 },
 "class": "AreaHotspotMapOverlay",
 "useHandCursor": true,
 "id": "overlay_7B9EBAE4_6CD6_DCD0_41C8_36FF27762983",
 "rollOverDisplay": false
},
{
 "map": {
  "width": 50,
  "x": 302.03,
  "image": {
   "levels": [
    {
     "url": "media/map_7B9FAAE4_6CD6_DCD0_41B1_ABCB61B15B57_HS_46_map.gif",
     "width": 16,
     "height": 15,
     "class": "ImageResourceLevel"
    }
   ],
   "class": "ImageResource"
  },
  "offsetX": 0,
  "class": "HotspotMapOverlayMap",
  "offsetY": 0,
  "height": 50,
  "y": 411.65
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 3)",
   "toolTip": "\uc2e0\uc2e41",
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 302.03,
  "y": 411.65,
  "class": "HotspotMapOverlayImage",
  "width": 50,
  "image": {
   "levels": [
    {
     "url": "media/map_7B9FAAE4_6CD6_DCD0_41B1_ABCB61B15B57_HS_46.png",
     "width": 50,
     "height": 49,
     "class": "ImageResourceLevel"
    }
   ],
   "class": "ImageResource"
  },
  "height": 50
 },
 "class": "AreaHotspotMapOverlay",
 "useHandCursor": true,
 "id": "overlay_7B9EAAE4_6CD6_DCD0_41C8_516627180546",
 "rollOverDisplay": false
},
{
 "map": {
  "width": 50,
  "x": 357.62,
  "image": {
   "levels": [
    {
     "url": "media/map_7B9FAAE4_6CD6_DCD0_41B1_ABCB61B15B57_HS_47_map.gif",
     "width": 16,
     "height": 15,
     "class": "ImageResourceLevel"
    }
   ],
   "class": "ImageResource"
  },
  "offsetX": 0,
  "class": "HotspotMapOverlayMap",
  "offsetY": 0,
  "height": 50,
  "y": 431.91
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 4)",
   "toolTip": "\uc2e0\uc2e42",
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 357.62,
  "y": 431.91,
  "class": "HotspotMapOverlayImage",
  "width": 50,
  "image": {
   "levels": [
    {
     "url": "media/map_7B9FAAE4_6CD6_DCD0_41B1_ABCB61B15B57_HS_47.png",
     "width": 50,
     "height": 49,
     "class": "ImageResourceLevel"
    }
   ],
   "class": "ImageResource"
  },
  "height": 50
 },
 "class": "AreaHotspotMapOverlay",
 "useHandCursor": true,
 "id": "overlay_7B9E9AE4_6CD6_DCD0_41DA_353C376ACAC0",
 "rollOverDisplay": false
},
{
 "maps": [
  {
   "hfov": 26.24,
   "yaw": 7.27,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3326AF10_3FEF_3CF3_418E_9395E076674D_1_HS_10_0_0_map.gif",
      "width": 33,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.17,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_583A5A3D_44A6_F51A_41B1_1956C48EE782, {'iconLineWidth':5,'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColorDirection':'vertical','backgroundOpacity':0.3,'pressedIconHeight':15,'backgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBorderSize':0,'pressedIconWidth':15,'borderSize':0,'paddingRight':5,'pressedIconColor':'#888888','rollOverIconHeight':15,'iconWidth':15,'iconColor':'#000000','iconHeight':15,'paddingBottom':5,'rollOverBorderColor':'#000000','pressedBackgroundColorDirection':'vertical','rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverIconLineWidth':5,'backgroundColorRatios':[0,0.09803921568627451,1],'pressedBorderColor':'#000000','pressedBackgroundOpacity':0.3,'rollOverIconWidth':15,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundOpacity':0.3,'borderColor':'#000000','rollOverIconColor':'#666666','paddingLeft':5,'rollOverBorderSize':0,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'paddingTop':5}, this.ImageResource_5896B006_44A6_94F6_41CF_1E37991F9803, null, null, null, this.audio_0243F00B_3919_1BB7_41CC_5410EA18FBC6, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3326AF10_3FEF_3CF3_418E_9395E076674D_1_HS_10_0.png",
      "width": 209,
      "height": 100,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "hfov": 26.24,
   "yaw": 7.27,
   "pitch": 1.17
  }
 ],
 "id": "overlay_674F2E05_689E_694B_41C5_2A15201F3C39",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "maps": [
  {
   "hfov": 9.94,
   "yaw": 155.84,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3326AF10_3FEF_3CF3_418E_9395E076674D_1_HS_7_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 6.11,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4, this.camera_75C517F4_6CB2_F4B0_41C0_EA33DA88842A); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_786DA06B_6CEE_ABD0_41D9_B04D1F74F4CA",
   "yaw": 155.84,
   "hfov": 9.94,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": 6.11,
   "distance": 100
  }
 ],
 "id": "overlay_59E246DE_484D_3721_41C3_2BE3F6605A32",
 "data": {
  "label": "Arrow 01b"
 },
 "rollOverDisplay": false
},
{
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE_tcap0.png",
    "width": 850,
    "height": 850,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "hfov": 45,
 "class": "TripodCapPanoramaOverlay",
 "rotate": false,
 "inertia": false,
 "id": "panorama_3326AF10_3FEF_3CF3_418E_9395E076674D_tcap0",
 "distance": 50
},
{
 "maps": [
  {
   "hfov": 72.31,
   "yaw": 6.8,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3326AF10_3FEF_3CF3_418E_9395E076674D_1_HS_11_0_0_map.gif",
      "width": 90,
      "height": 15,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.12,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": false,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3326AF10_3FEF_3CF3_418E_9395E076674D_1_HS_11_0.png",
      "width": 581,
      "height": 103,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "hfov": 72.31,
   "yaw": 6.8,
   "pitch": -6.12
  }
 ],
 "id": "overlay_7A39835D_68B7_9FFB_419D_E7E44D5E50F9",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": true
},
{
 "maps": [
  {
   "hfov": 10,
   "yaw": 179.82,
   "image": {
    "levels": [
     {
      "url": "media/panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -1.46,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4, this.camera_743BF7EC_6CB2_F4D0_41D6_5B41769F7C61); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_786E706C_6CEE_ABD0_41D5_1CE8FBBF404E",
   "yaw": 179.82,
   "hfov": 10,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -1.46,
   "distance": 100
  }
 ],
 "id": "overlay_330C948B_3FF1_0DD5_41C6_DF17468F4EE6",
 "data": {
  "label": "Arrow 01b"
 },
 "rollOverDisplay": false
},
{
 "maps": [
  {
   "hfov": 31.46,
   "yaw": -5.12,
   "image": {
    "levels": [
     {
      "url": "media/panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_1_HS_8_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 3.04,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_1_HS_8_0.png",
      "width": 350,
      "height": 199,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "hfov": 31.46,
   "yaw": -5.12,
   "pitch": 3.04
  }
 ],
 "id": "overlay_7A88ED13_68AA_AB4F_41CF_EBE998CC13D0",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE_tcap0.png",
    "width": 850,
    "height": 850,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "hfov": 45,
 "class": "TripodCapPanoramaOverlay",
 "rotate": false,
 "inertia": false,
 "id": "panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_tcap0",
 "distance": 50
},
{
 "maps": [
  {
   "hfov": 72.46,
   "yaw": -3.97,
   "image": {
    "levels": [
     {
      "url": "media/panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_1_HS_10_0_0_map.gif",
      "width": 95,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -4.87,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_1_HS_10_0.png",
      "width": 808,
      "height": 136,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "hfov": 72.46,
   "yaw": -3.97,
   "pitch": -4.87
  }
 ],
 "id": "overlay_787893B0_6915_B6DF_41C4_2BFF4603DA9B",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": true
},
{
 "maps": [
  {
   "hfov": 9.34,
   "yaw": 179.37,
   "image": {
    "levels": [
     {
      "url": "media/panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5_1_HS_2_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_33289CC4_3FEF_1D53_419F_007869704957, this.camera_75E61806_6CB2_FB50_41CD_FC0880DB1282); this.mainPlayList.set('selectedIndex', 4)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_786B506B_6CEE_ABD0_41D1_ED524D833844",
   "yaw": 179.37,
   "hfov": 9.34,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -5,
   "distance": 100
  }
 ],
 "id": "overlay_3350E5FA_3FEF_0F37_41CA_D0F68D954A77",
 "data": {
  "label": "Arrow 01b"
 },
 "rollOverDisplay": false
},
{
 "maps": [
  {
   "hfov": 9.77,
   "yaw": -121.74,
   "image": {
    "levels": [
     {
      "url": "media/panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5_1_HS_3_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -12.36,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4, this.camera_75D4B7FD_6CB2_F4B0_41CB_168ED7054528); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_786B206B_6CEE_ABD0_41C4_34237E8252D8",
   "yaw": -121.74,
   "hfov": 9.77,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -12.36,
   "distance": 100
  }
 ],
 "id": "overlay_3350C5FA_3FEF_0F37_41C8_A832CFB2D2D5",
 "data": {
  "label": "Arrow 01b"
 },
 "rollOverDisplay": false
},
{
 "maps": [
  {
   "hfov": 23.67,
   "yaw": 0.34,
   "image": {
    "levels": [
     {
      "url": "media/panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5_1_HS_10_0_0_map.gif",
      "width": 50,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -4.84,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5_1_HS_10_0.png",
      "width": 190,
      "height": 60,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "hfov": 23.67,
   "yaw": 0.34,
   "pitch": -4.84
  }
 ],
 "id": "overlay_672D3CA8_689E_A959_41C4_12A52EF9F965",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_tcap0.png",
    "width": 850,
    "height": 850,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "hfov": 45,
 "class": "TripodCapPanoramaOverlay",
 "rotate": false,
 "inertia": false,
 "id": "panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5_tcap0",
 "distance": 50
},
{
 "maps": [
  {
   "hfov": 9.08,
   "yaw": 2.16,
   "image": {
    "levels": [
     {
      "url": "media/panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_1_HS_3_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -14.31,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE, this.camera_742867E2_6CB2_F4D0_41DA_1F4B42683998); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_7866B069_6CEE_ABD0_41D0_9A1AD2C94D1A",
   "yaw": 2.16,
   "hfov": 9.08,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -14.31,
   "distance": 100
  }
 ],
 "id": "overlay_32E047E5_3FEF_0B5D_41C2_E8A68EB19F73",
 "data": {
  "label": "Arrow 01b"
 },
 "rollOverDisplay": false
},
{
 "maps": [
  {
   "hfov": 18.3,
   "yaw": 0.33,
   "image": {
    "levels": [
     {
      "url": "media/panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_1_HS_29_0_0_map.gif",
      "width": 24,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 30.55,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_1_HS_29_0.png",
      "width": 170,
      "height": 110,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "hfov": 18.3,
   "yaw": 0.33,
   "pitch": 30.55
  }
 ],
 "id": "overlay_663CF80D_690B_CD80_41AF_4030459DC210",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_tcap0.png",
    "width": 850,
    "height": 850,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "hfov": 45,
 "class": "TripodCapPanoramaOverlay",
 "rotate": false,
 "inertia": false,
 "id": "panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_tcap0",
 "distance": 50
},
{
 "maps": [
  {
   "hfov": 9.96,
   "yaw": -147.83,
   "image": {
    "levels": [
     {
      "url": "media/panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 5.2,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4, this.camera_745C27A2_6CB2_F550_418D_1FC9471CCA24); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_786D306C_6CEE_ABD0_41A8_8425163EA4DD",
   "yaw": -147.83,
   "hfov": 9.96,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": 5.2,
   "distance": 100
  }
 ],
 "id": "overlay_333B5203_3FEF_04D5_41C6_2B6326459E1B",
 "data": {
  "label": "Arrow 01b"
 },
 "rollOverDisplay": false
},
{
 "maps": [
  {
   "hfov": 25.18,
   "yaw": -0.37,
   "image": {
    "levels": [
     {
      "url": "media/panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_1_HS_7_0_0_map.gif",
      "width": 22,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.07,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_1_HS_7_0.png",
      "width": 280,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "hfov": 25.18,
   "yaw": -0.37,
   "pitch": 2.07
  }
 ],
 "id": "overlay_6737305B_689F_B9FF_41C7_A915B48112D8",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE_tcap0.png",
    "width": 850,
    "height": 850,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "hfov": 45,
 "class": "TripodCapPanoramaOverlay",
 "rotate": false,
 "inertia": false,
 "id": "panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_tcap0",
 "distance": 50
},
{
 "maps": [
  {
   "hfov": 72.29,
   "yaw": -0.23,
   "image": {
    "levels": [
     {
      "url": "media/panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_1_HS_9_0_0_map.gif",
      "width": 91,
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
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": false,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_1_HS_9_0.png",
      "width": 808,
      "height": 142,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "hfov": 72.29,
   "yaw": -0.23,
   "pitch": -6.22
  }
 ],
 "id": "overlay_7A8F04B2_68B9_B949_41CC_7B355B4BC7CB",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": true
},
{
 "maps": [
  {
   "hfov": 9.37,
   "yaw": 179.51,
   "image": {
    "levels": [
     {
      "url": "media/panorama_33289CC4_3FEF_1D53_419F_007869704957_1_HS_2_0_0_map.gif",
      "width": 29,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -1.46,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5, this.camera_746A87AB_6CB2_F550_41C7_32AEDDE81794); this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_786CA06B_6CEE_ABD0_41CC_8934751FE7FD",
   "yaw": 179.51,
   "hfov": 9.37,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -1.46,
   "distance": 100
  }
 ],
 "id": "overlay_3328BCC4_3FEF_1D53_41C2_5D07A77A92F7",
 "data": {
  "label": "Arrow 01b"
 },
 "rollOverDisplay": false
},
{
 "maps": [
  {
   "hfov": 10,
   "yaw": 143.49,
   "image": {
    "levels": [
     {
      "url": "media/panorama_33289CC4_3FEF_1D53_419F_007869704957_1_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -1.46,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_786C706B_6CEE_ABD0_41D1_77A01F63D192",
   "yaw": 143.49,
   "hfov": 10,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -1.46,
   "distance": 100
  }
 ],
 "id": "overlay_33286CC4_3FEF_1D53_41C4_AA6A2A79A97D",
 "data": {
  "label": "Arrow 01b"
 },
 "rollOverDisplay": false
},
{
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_tcap0.png",
    "width": 850,
    "height": 850,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "hfov": 45,
 "class": "TripodCapPanoramaOverlay",
 "rotate": false,
 "inertia": false,
 "id": "panorama_33289CC4_3FEF_1D53_419F_007869704957_tcap0",
 "distance": 50
},
{
 "media": "this.panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_7445E792_6CB2_F570_41B1_4FC98D0330F3, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 0, 1)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_7445E792_6CB2_F570_41B1_4FC98D0330F3",
 "camera": "this.panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_camera"
},
{
 "media": "this.panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_74456792_6CB2_F570_41D3_B2ACEE18DE11, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 1, 2)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_74456792_6CB2_F570_41D3_B2ACEE18DE11",
 "camera": "this.panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE_camera"
},
{
 "media": "this.panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_744A8792_6CB2_F570_41D2_424BD6B3DA87, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 2, 3)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_744A8792_6CB2_F570_41D2_424BD6B3DA87",
 "camera": "this.panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_camera"
},
{
 "media": "this.panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_744A1793_6CB2_F570_41B7_F4E3AD43A3AE, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 3, 4)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_744A1793_6CB2_F570_41B7_F4E3AD43A3AE",
 "camera": "this.panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5_camera"
},
{
 "media": "this.panorama_33289CC4_3FEF_1D53_419F_007869704957",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_744B8793_6CB2_F570_41C2_B32A6BAB2693, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 4, 5)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_744B8793_6CB2_F570_41C2_B32A6BAB2693",
 "camera": "this.panorama_33289CC4_3FEF_1D53_419F_007869704957_camera"
},
{
 "media": "this.panorama_3326AF10_3FEF_3CF3_418E_9395E076674D",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_744B0793_6CB2_F570_415F_DD91CE53B8FC, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 5, 6)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_744B0793_6CB2_F570_415F_DD91CE53B8FC",
 "camera": "this.panorama_3326AF10_3FEF_3CF3_418E_9395E076674D_camera"
},
{
 "media": "this.panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_74488793_6CB2_F570_41AC_EADA292C4F52, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 6, 7)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_74488793_6CB2_F570_41AC_EADA292C4F52",
 "camera": "this.panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_camera"
},
{
 "media": "this.panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E",
 "end": "this.trigger('tourEnded')",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_74480793_6CB2_F570_41D8_A792B580302D, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 7, 0)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_74480793_6CB2_F570_41D8_A792B580302D",
 "camera": "this.panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_camera"
},
{
 "maps": [
  {
   "hfov": 9.34,
   "yaw": 132.82,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_1_HS_5_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -4.92,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3326AF10_3FEF_3CF3_418E_9395E076674D, this.camera_740A67C6_6CB2_F4D0_41D3_50A05800D4F2); this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_7868C069_6CEE_ABD0_41BF_0582F0021EC6",
   "yaw": 132.82,
   "hfov": 9.34,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -4.92,
   "distance": 100
  }
 ],
 "id": "overlay_33512189_3FEF_07D5_41AF_4CA09E6C3635",
 "data": {
  "label": "Arrow 01b"
 },
 "rollOverDisplay": false
},
{
 "maps": [
  {
   "hfov": 9.35,
   "yaw": -79.97,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_1_HS_7_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -4.02,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E, this.camera_747F07BD_6CB2_F4B0_41C7_E4E88B133207); this.mainPlayList.set('selectedIndex', 7)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_78689069_6CEE_ABD0_41C3_B2086C67F869",
   "yaw": -79.97,
   "hfov": 9.35,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -4.02,
   "distance": 100
  }
 ],
 "id": "overlay_33511189_3FEF_07D5_41C1_F8DC1D054C6B",
 "data": {
  "label": "Arrow 01b"
 },
 "rollOverDisplay": false
},
{
 "maps": [
  {
   "hfov": 8,
   "yaw": -0.24,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_1_HS_8_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.75,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5, this.camera_741067D0_6CB2_F4F0_41D0_2FD747DFFEA2); this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_7868606A_6CEE_ABD0_41DA_6901C4C9A17E",
   "yaw": -0.24,
   "hfov": 8,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": 0.75,
   "distance": 100
  }
 ],
 "id": "overlay_33516189_3FEF_07D5_4191_633263E7FA4C",
 "data": {
  "label": "Arrow 01b"
 },
 "rollOverDisplay": false
},
{
 "maps": [
  {
   "hfov": 9.35,
   "yaw": -127.64,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_1_HS_9_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -4,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57, this.camera_747047B4_6CB2_F4B0_41D9_8F554774E8E7); this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_7868206A_6CEE_ABD0_41D3_3CB8BB0A8C29",
   "yaw": -127.64,
   "hfov": 9.35,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -4,
   "distance": 100
  }
 ],
 "id": "overlay_33514189_3FEF_07D5_41C4_6B5790F03EA8",
 "data": {
  "label": "Arrow 01b"
 },
 "rollOverDisplay": false
},
{
 "maps": [
  {
   "hfov": 4.51,
   "yaw": -0.7,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_1_HS_56_0_0_map.gif",
      "width": 16,
      "height": 23,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 25.55,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_1_HS_56_0.png",
      "width": 40,
      "height": 59,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "hfov": 4.51,
   "yaw": -0.7,
   "pitch": 25.55
  }
 ],
 "id": "overlay_622E838F_6C52_6D50_41CB_88695CD969AE",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "maps": [
  {
   "hfov": 2.81,
   "yaw": -4.58,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_1_HS_57_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 25.78,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_4DCCD8EE_4347_5D61_41C7_A15139392B70, {'iconLineWidth':5,'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColorDirection':'vertical','backgroundOpacity':0.3,'pressedIconHeight':20,'backgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBorderSize':0,'pressedIconWidth':20,'borderSize':0,'paddingRight':5,'pressedIconColor':'#888888','rollOverIconHeight':20,'iconWidth':20,'iconColor':'#000000','iconHeight':20,'paddingBottom':5,'rollOverBorderColor':'#000000','pressedBackgroundColorDirection':'vertical','rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverIconLineWidth':5,'backgroundColorRatios':[0,0.09803921568627451,1],'pressedBorderColor':'#000000','pressedBackgroundOpacity':0.3,'rollOverIconWidth':20,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundOpacity':0.3,'borderColor':'#000000','rollOverIconColor':'#666666','paddingLeft':5,'rollOverBorderSize':0,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'paddingTop':5}, this.ImageResource_52FFF024_4345_ACE1_41C1_FD3C31F88BEB, null, null, null, null, false); this.playGlobalAudioWhilePlay(this.mainPlayList, 2, this.audio_0243F00B_3919_1BB7_41CC_5410EA18FBC6, undefined)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_7869906A_6CEE_ABD0_41C2_98D9300D380E",
   "yaw": -4.58,
   "hfov": 2.81,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": 25.78,
   "distance": 100
  }
 ],
 "id": "overlay_7FBB6B11_6CF5_BD70_41B1_45166B6FFA9D",
 "data": {
  "label": "Info 02"
 },
 "rollOverDisplay": false
},
{
 "maps": [
  {
   "hfov": 10,
   "yaw": 179.82,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_1_HS_12_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.56,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE, this.camera_741CD7D9_6CB2_F4F0_41D9_5D9716611D24); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_7869606A_6CEE_ABD0_41D5_4C09119E2FE2",
   "yaw": 179.82,
   "hfov": 10,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": 1.56,
   "distance": 100
  }
 ],
 "id": "overlay_33508189_3FEF_07D5_41BF_5A1D2001CBB4",
 "data": {
  "label": "Arrow 01b"
 },
 "rollOverDisplay": false
},
{
 "bleachingDistance": 0.4,
 "bleaching": 0.7,
 "pitch": 65.97,
 "class": "LensFlarePanoramaOverlay",
 "id": "overlay_3350C189_3FEF_07D5_41B5_E92EC747AF60",
 "yaw": 130.74
},
{
 "maps": [
  {
   "hfov": 18.54,
   "yaw": -77.27,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_1_HS_51_0_0_map.gif",
      "width": 34,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 8.66,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_1_HS_51_0.png",
      "width": 150,
      "height": 70,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "hfov": 18.54,
   "yaw": -77.27,
   "pitch": 8.66
  }
 ],
 "id": "overlay_6731E47B_689B_B9BF_41CC_1C07FB252BBA",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "maps": [
  {
   "hfov": 18.67,
   "yaw": 135.03,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_1_HS_52_0_0_map.gif",
      "width": 30,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 5.3,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_1_HS_52_0.png",
      "width": 150,
      "height": 80,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "hfov": 18.67,
   "yaw": 135.03,
   "pitch": 5.3
  }
 ],
 "id": "overlay_675E1EE0_689E_E6C9_41D5_A39563AC5673",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "maps": [
  {
   "hfov": 17.42,
   "yaw": -135.46,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_1_HS_53_0_0_map.gif",
      "width": 18,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 5.62,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_1_HS_53_0.png",
      "width": 140,
      "height": 120,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "hfov": 17.42,
   "yaw": -135.46,
   "pitch": 5.62
  }
 ],
 "id": "overlay_78B584D9_689A_FAFB_41A7_79A276FAA71D",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_tcap0.png",
    "width": 850,
    "height": 850,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "hfov": 45,
 "class": "TripodCapPanoramaOverlay",
 "rotate": false,
 "inertia": false,
 "id": "panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_tcap0",
 "distance": 50
},
{
 "maps": [
  {
   "hfov": 16.53,
   "yaw": 17.83,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_1_HS_55_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.66,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "areas": [
  {
   "click": "this.setMediaBehaviour(this.playList_74425790_6CB2_F570_41A6_DCE28090BEB0, 0, this.panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4); this.MainViewerPanoramaPlayer.play()",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_1_HS_55_0.png",
      "width": 132,
      "height": 74,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "hfov": 16.53,
   "yaw": 17.83,
   "pitch": -2.66
  }
 ],
 "id": "overlay_67057898_68BE_49B8_41CD_32CF968D5BAB",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "colCount": 4,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_7867E069_6CEE_ABD0_4171_43F57888229B",
 "levels": [
  {
   "url": "media/panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE_1_HS_3_0.png",
   "width": 400,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameDuration": 62
},
{
 "colCount": 4,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_7867B069_6CEE_ABD0_41D0_1F26669E266B",
 "levels": [
  {
   "url": "media/panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE_1_HS_4_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "frameDuration": 62
},
{
 "colCount": 4,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_786DA06B_6CEE_ABD0_41D9_B04D1F74F4CA",
 "levels": [
  {
   "url": "media/panorama_3326AF10_3FEF_3CF3_418E_9395E076674D_1_HS_7_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "frameDuration": 62
},
{
 "colCount": 4,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_786E706C_6CEE_ABD0_41D5_1CE8FBBF404E",
 "levels": [
  {
   "url": "media/panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_1_HS_0_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "frameDuration": 62
},
{
 "colCount": 4,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_786B506B_6CEE_ABD0_41D1_ED524D833844",
 "levels": [
  {
   "url": "media/panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5_1_HS_2_0.png",
   "width": 400,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameDuration": 62
},
{
 "colCount": 4,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_786B206B_6CEE_ABD0_41C4_34237E8252D8",
 "levels": [
  {
   "url": "media/panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5_1_HS_3_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "frameDuration": 62
},
{
 "colCount": 4,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_7866B069_6CEE_ABD0_41D0_9A1AD2C94D1A",
 "levels": [
  {
   "url": "media/panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_1_HS_3_0.png",
   "width": 400,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameDuration": 62
},
{
 "colCount": 4,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_786D306C_6CEE_ABD0_41A8_8425163EA4DD",
 "levels": [
  {
   "url": "media/panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_1_HS_0_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "frameDuration": 62
},
{
 "colCount": 3,
 "frameCount": 9,
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "id": "AnimatedImageResource_786CA06B_6CEE_ABD0_41CC_8934751FE7FD",
 "levels": [
  {
   "url": "media/panorama_33289CC4_3FEF_1D53_419F_007869704957_1_HS_2_0.png",
   "width": 330,
   "height": 180,
   "class": "ImageResourceLevel"
  }
 ],
 "frameDuration": 62
},
{
 "colCount": 4,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_786C706B_6CEE_ABD0_41D1_77A01F63D192",
 "levels": [
  {
   "url": "media/panorama_33289CC4_3FEF_1D53_419F_007869704957_1_HS_1_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "frameDuration": 62
},
{
 "colCount": 4,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_7868C069_6CEE_ABD0_41BF_0582F0021EC6",
 "levels": [
  {
   "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_1_HS_5_0.png",
   "width": 400,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameDuration": 62
},
{
 "colCount": 4,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_78689069_6CEE_ABD0_41C3_B2086C67F869",
 "levels": [
  {
   "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_1_HS_7_0.png",
   "width": 400,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameDuration": 62
},
{
 "colCount": 4,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_7868606A_6CEE_ABD0_41DA_6901C4C9A17E",
 "levels": [
  {
   "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_1_HS_8_0.png",
   "width": 400,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameDuration": 62
},
{
 "colCount": 4,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_7868206A_6CEE_ABD0_41D3_3CB8BB0A8C29",
 "levels": [
  {
   "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_1_HS_9_0.png",
   "width": 400,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameDuration": 62
},
{
 "colCount": 4,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_7869906A_6CEE_ABD0_41C2_98D9300D380E",
 "levels": [
  {
   "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_1_HS_57_0.png",
   "width": 500,
   "height": 750,
   "class": "ImageResourceLevel"
  }
 ],
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "id": "AnimatedImageResource_7869606A_6CEE_ABD0_41D5_4C09119E2FE2",
 "levels": [
  {
   "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_1_HS_12_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "frameDuration": 62
}],
 "verticalAlign": "top",
 "mouseWheelEnabled": true,
 "buttonToggleMute": "this.IconButton_2DA98648_3FAE_FE10_41C2_2831605922EE",
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
