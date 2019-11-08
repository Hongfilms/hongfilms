(function(){
    var script = {
 "start": "this.playAudioList([this.audio_55724468_432D_B343_41D0_5FE54A2016EE]); this.init(); this.playList_460170EF_49C9_7687_41C2_840382BF8B6F.set('selectedIndex', 0); this.playList_461670F2_49C9_7699_41AB_58D69EE90EEA.set('selectedIndex', 0); if(!this.get('fullscreenAvailable')) { [this.IconButton_0EABF219_1B53_B6E5_41A6_18430B89E229].forEach(function(component) { component.set('visible', false); }) }",
 "children": [
  "this.MainViewer",
  "this.ViewerAreaLabeled_0071A5C9_1B70_BD65_41A6_53A0DC9D75B4",
  "this.IconButton_01786869_161B_1341_4187_7C4B00D22041",
  "this.IconButton_01AA3159_161B_3541_41B0_E8EF1E0CD7D6",
  "this.IconButton_0EABF219_1B53_B6E5_41A6_18430B89E229",
  "this.IconButton_55DD76A9_432E_DFC2_41C8_D237A76A9E57",
  "this.ViewerAreaLabeled_550350CB_4332_B346_41C3_281B3169367B",
  "this.IconButton_5AE927FD_48C4_8E32_41BC_42E24B869B3E"
 ],
 "id": "rootPlayer",
 "scrollBarColor": "#000000",
 "backgroundPreloadEnabled": true,
 "paddingLeft": 0,
 "width": "100%",
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "class": "Player",
 "vrPolyfillScale": 0.75,
 "scrollBarVisible": "rollOver",
 "creationPolicy": "inAdvance",
 "minWidth": 20,
 "defaultVRPointer": "laser",
 "buttonToggleFullscreen": "this.IconButton_0EABF219_1B53_B6E5_41A6_18430B89E229",
 "borderRadius": 0,
 "overflow": "visible",
 "propagateClick": true,
 "scripts": {
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "keepCompVisible": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "getPlayListsWithMedia": function(media, onlySelected){  var result = []; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) result.push(playList); } return result; },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "getFirstPlayListWithMedia": function(media, onlySelected){  var playLists = this.getPlayListsWithMedia(media, onlySelected); return playLists.length > 0 ? playLists[0] : undefined; },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "getKey": function(key){  return window[key]; },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "existsKey": function(key){  return key in window; },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "unregisterKey": function(key){  delete window[key]; },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback, stopBackgroundAudio){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } var src = this.playGlobalAudio(audio, endCallback); if(stopBackgroundAudio === true){ var stateChangeFunc = function(){ if(src.get('state') == 'playing'){ this.pauseGlobalAudios(src.get('id'), [src]); } else if(src.get('state') == 'stopped'){ this.resumeGlobalAudios(src.get('id')); src.unbind('stateChange', stateChangeFunc, this); } }; src.bind('stateChange', stateChangeFunc, this); } return src; },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "keepCompVisibleWhileInitItem": function(playList, index, component, keep){  var item = playList.get('items')[index]; var stopFunc = function() { item.unbind('stop', stopFunc, this, true); item.unbind('stop', stopFunc, this); item.unbind('begin', stopFunc, this, true); item.unbind('begin', stopFunc, this); this.keepCompVisible(component, !keep); }; this.keepCompVisible(component, keep); item.bind('stop', stopFunc, this, true); item.bind('stop', stopFunc, this); item.bind('begin', stopFunc, this, true); item.bind('begin', stopFunc, this); },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = undefined; if(mediaDispatcher){ var playListsWithMedia = this.getPlayListsWithMedia(mediaDispatcher, true); playListDispatcher = playListsWithMedia.indexOf(playList) != -1 ? playList : (playListsWithMedia.length > 0 ? playListsWithMedia[0] : undefined); } if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } item.bind('begin', onBeginFunction, self); this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "setOverlayBehaviour": function(overlay, media, action, preventDoubleClick){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(preventDoubleClick){ if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 1000); } }; if(preventDoubleClick && window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getFirstPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "registerKey": function(key, value){  window[key] = value; },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); }
 },
 "shadow": false,
 "paddingBottom": 0,
 "borderSize": 0,
 "downloadEnabled": true,
 "verticalAlign": "top",
 "layout": "absolute",
 "paddingTop": 0,
 "buttonToggleMute": "this.IconButton_55DD76A9_432E_DFC2_41C8_D237A76A9E57",
 "gap": 10,
 "mobileMipmappingEnabled": false,
 "height": "100%",
 "mouseWheelEnabled": true,
 "horizontalAlign": "left",
 "paddingRight": 0,
 "minHeight": 20,
 "data": {
  "name": "Player468"
 },
 "desktopMipmappingEnabled": false,
 "definitions": [{
 "class": "PhotoAlbum",
 "playList": "this.album_0D5A37D1_16FB_1D41_4193_115D31E8EA85_AlbumPlayList",
 "label": "Photo Album \uadf8\ub0e5 \ud48d\uacbd",
 "id": "album_0D5A37D1_16FB_1D41_4193_115D31E8EA85",
 "thumbnailUrl": "media/album_0D5A37D1_16FB_1D41_4193_115D31E8EA85_t.png"
},
{
 "class": "Photo",
 "label": "\uadf8\ub0e5 \ud48d\uacbd",
 "id": "album_0D5A37D1_16FB_1D41_4193_115D31E8EA85_0",
 "width": 780,
 "duration": 5000,
 "thumbnailUrl": "media/album_0D5A37D1_16FB_1D41_4193_115D31E8EA85_0_t.jpg",
 "image": {
  "levels": [
   {
    "url": "media/album_0D5A37D1_16FB_1D41_4193_115D31E8EA85_0.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "height": 585
},
{
 "displayPlaybackBar": true,
 "class": "VideoPlayer",
 "id": "MainViewerVideoPlayer",
 "viewerArea": "this.MainViewer"
},
{
 "class": "PanoramaCamera",
 "automaticRotationSpeed": 400,
 "manualRotationSpeed": 400,
 "id": "panorama_0D0EB815_1615_12C1_4168_B99D566E62BC_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -1.07,
  "hfov": 70,
  "pitch": -18.05
 },
 "automaticZoomSpeed": 100
},
{
 "class": "PlayList",
 "id": "playList_461670F2_49C9_7699_41AB_58D69EE90EEA",
 "items": [
  {
   "begin": "this.ViewerAreaLabeled_550350CB_4332_B346_41C3_281B3169367BMapPlayer.set('movementMode', 'free_drag_and_rotation')",
   "media": "this.map_4573C735_48C4_8E32_41C7_00638466F88A",
   "class": "MapPlayListItem",
   "player": "this.ViewerAreaLabeled_550350CB_4332_B346_41C3_281B3169367BMapPlayer"
  }
 ]
},
{
 "class": "Video",
 "label": "\uc138\uc778\ud2b8 \ud5ec\ub80c\uc2a4 \uc0b0",
 "scaleMode": "fit_inside",
 "width": 1920,
 "loop": false,
 "id": "video_5DCE296E_489D_943C_41C4_B1361547758F",
 "thumbnailUrl": "media/video_5DCE296E_489D_943C_41C4_B1361547758F_t.jpg",
 "height": 1080,
 "video": {
  "width": 1920,
  "class": "VideoResource",
  "mp4Url": "media/video_5DCE296E_489D_943C_41C4_B1361547758F.mp4",
  "height": 1080
 }
},
{
 "class": "MapPlayer",
 "id": "ViewerAreaLabeled_0071A5C9_1B70_BD65_41A6_53A0DC9D75B4MapPlayer",
 "movementMode": "constrained",
 "viewerArea": "this.ViewerAreaLabeled_0071A5C9_1B70_BD65_41A6_53A0DC9D75B4"
},
{
 "class": "PlayList",
 "id": "playList_4608A0F2_49C9_7699_41A0_7C2C81F46073",
 "items": [
  "this.PanoramaPlayListItem_461300F4_49C9_7699_41A9_8D341CF00DC7"
 ]
},
{
 "class": "PlayList",
 "id": "playList_460170EF_49C9_7687_41C2_840382BF8B6F",
 "items": [
  {
   "begin": "this.ViewerAreaLabeled_0071A5C9_1B70_BD65_41A6_53A0DC9D75B4MapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_032C0BC0_163F_15BF_4199_0C3029217DFA",
   "class": "MapPlayListItem",
   "player": "this.ViewerAreaLabeled_0071A5C9_1B70_BD65_41A6_53A0DC9D75B4MapPlayer"
  }
 ]
},
{
 "fieldOfViewOverlayOutsideColor": "#000000",
 "fieldOfViewOverlayOutsideOpacity": 0,
 "label": "\uad50\uacfc\uc11c(4-2) 2",
 "fieldOfViewOverlayInsideOpacity": 0.46,
 "fieldOfViewOverlayRadiusScale": 0.18,
 "id": "map_00700A8F_162B_17C1_41B0_2FCC73755E28",
 "image": {
  "levels": [
   {
    "url": "media/map_00700A8F_162B_17C1_41B0_2FCC73755E28.png",
    "width": 2262,
    "class": "ImageResourceLevel",
    "height": 3200
   },
   {
    "url": "media/map_00700A8F_162B_17C1_41B0_2FCC73755E28_lq.png",
    "width": 215,
    "class": "ImageResourceLevel",
    "height": 305,
    "tags": "preload"
   }
  ],
  "class": "ImageResource"
 },
 "width": 2481,
 "fieldOfViewOverlayInsideColor": "#FFFFFF",
 "class": "Map",
 "overlays": [
  "this.overlay_5F6C90B4_489C_942C_41D1_3F2D775D2D8B",
  "this.overlay_013CC2C1_161F_1740_4194_20C4F20D2619"
 ],
 "scaleMode": "fit_to_height",
 "minimumZoomFactor": 0.5,
 "thumbnailUrl": "media/map_00700A8F_162B_17C1_41B0_2FCC73755E28_t.png",
 "maximumZoomFactor": 1.2,
 "initialZoomFactor": 1,
 "height": 3509
},
{
 "to": "bottom",
 "class": "SlideOutEffect",
 "duration": 0,
 "id": "effect_46E50682_48C7_8ED6_41C1_1FF7B1D08804",
 "easing": "linear"
},
{
 "class": "MediaAudio",
 "audio": {
  "class": "AudioResource",
  "oggUrl": "media/audio_55724468_432D_B343_41D0_5FE54A2016EE.ogg",
  "mp3Url": "media/audio_55724468_432D_B343_41D0_5FE54A2016EE.mp3"
 },
 "id": "audio_55724468_432D_B343_41D0_5FE54A2016EE",
 "autoplay": true,
 "data": {
  "label": "Just a Little Hope Full Mix"
 }
},
{
 "class": "PhotoAudio",
 "audio": {
  "class": "AudioResource",
  "oggUrl": "media/audio_0C1AA4FE_166A_F340_4175_25E3BC4D7B82.ogg",
  "mp3Url": "media/audio_0C1AA4FE_166A_F340_4175_25E3BC4D7B82.mp3"
 },
 "id": "audio_0C1AA4FE_166A_F340_4175_25E3BC4D7B82",
 "autoplay": true,
 "data": {
  "label": "Just a Little Hope Full Mix"
 }
},
{
 "fieldOfViewOverlayOutsideColor": "#000000",
 "fieldOfViewOverlayOutsideOpacity": 0,
 "label": "\uad50\uacfc\uc11c(4-2)",
 "fieldOfViewOverlayInsideOpacity": 0.4,
 "fieldOfViewOverlayRadiusScale": 0.29,
 "id": "map_032C0BC0_163F_15BF_4199_0C3029217DFA",
 "image": {
  "levels": [
   {
    "url": "media/map_032C0BC0_163F_15BF_4199_0C3029217DFA.png",
    "width": 2262,
    "class": "ImageResourceLevel",
    "height": 3200
   },
   {
    "url": "media/map_032C0BC0_163F_15BF_4199_0C3029217DFA_lq.png",
    "width": 215,
    "class": "ImageResourceLevel",
    "height": 305,
    "tags": "preload"
   }
  ],
  "class": "ImageResource"
 },
 "width": 2481,
 "fieldOfViewOverlayInsideColor": "#FFFFFF",
 "class": "Map",
 "overlays": [
  "this.overlay_03DE070E_163F_1EC0_41B4_5BEBFD75CF60",
  "this.overlay_5D01A7A3_4894_FC24_41CD_896F81099A8C"
 ],
 "scaleMode": "fit_to_height",
 "minimumZoomFactor": 0.5,
 "thumbnailUrl": "media/map_032C0BC0_163F_15BF_4199_0C3029217DFA_t.png",
 "maximumZoomFactor": 1.2,
 "initialZoomFactor": 1,
 "height": 3509
},
{
 "class": "PanoramaCamera",
 "automaticRotationSpeed": 400,
 "manualRotationSpeed": 400,
 "id": "panorama_0DBBDFD7_166D_6D40_419D_41FF8FA1CCD3_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -0.45,
  "hfov": 110,
  "pitch": -23.84
 },
 "automaticZoomSpeed": 100
},
{
 "class": "PlayList",
 "id": "playList_460940F1_49C9_769B_41C4_19D05E033767",
 "items": [
  {
   "media": "this.video_0B38A18D_161D_35C0_4186_8691B244AF5A",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.viewer_uid460980F1_49C9_769B_415B_4F2A0376C462VideoPlayer)",
   "player": "this.viewer_uid460980F1_49C9_769B_415B_4F2A0376C462VideoPlayer",
   "start": "this.viewer_uid460980F1_49C9_769B_415B_4F2A0376C462VideoPlayer.set('displayPlaybackBar', false); this.changeBackgroundWhilePlay(this.playList_460940F1_49C9_769B_41C4_19D05E033767, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_460940F1_49C9_769B_41C4_19D05E033767, 0)"
  }
 ]
},
{
 "class": "PhotoAlbumPlayer",
 "id": "MainViewerPhotoAlbumPlayer",
 "viewerArea": "this.MainViewer"
},
{
 "class": "Photo",
 "label": "\uadf8\ub0e5 \ud48d\uacbd",
 "id": "photo_0DD743D9_1617_1541_41B0_02F2CF386354",
 "width": 780,
 "duration": 5000,
 "thumbnailUrl": "media/photo_0DD743D9_1617_1541_41B0_02F2CF386354_t.jpg",
 "image": {
  "levels": [
   {
    "url": "media/photo_0DD743D9_1617_1541_41B0_02F2CF386354.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "audios": [
  "this.audio_0C1AA4FE_166A_F340_4175_25E3BC4D7B82"
 ],
 "height": 585
},
{
 "label": "\ucf5c\ub85c\uc138\uc6c0 \uc90c 2",
 "id": "panorama_0D0EB815_1615_12C1_4168_B99D566E62BC",
 "pitch": -18,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_0D0EB815_1615_12C1_4168_B99D566E62BC_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "height": 3072,
      "rowCount": 6
     },
     {
      "url": "media/panorama_0D0EB815_1615_12C1_4168_B99D566E62BC_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "rowCount": 3
     },
     {
      "url": "media/panorama_0D0EB815_1615_12C1_4168_B99D566E62BC_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "rowCount": 2
     },
     {
      "url": "media/panorama_0D0EB815_1615_12C1_4168_B99D566E62BC_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "rowCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_0D0EB815_1615_12C1_4168_B99D566E62BC_t.jpg",
   "right": {
    "levels": [
     {
      "url": "media/panorama_0D0EB815_1615_12C1_4168_B99D566E62BC_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "height": 3072,
      "rowCount": 6
     },
     {
      "url": "media/panorama_0D0EB815_1615_12C1_4168_B99D566E62BC_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "rowCount": 3
     },
     {
      "url": "media/panorama_0D0EB815_1615_12C1_4168_B99D566E62BC_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "rowCount": 2
     },
     {
      "url": "media/panorama_0D0EB815_1615_12C1_4168_B99D566E62BC_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "rowCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_0D0EB815_1615_12C1_4168_B99D566E62BC_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "height": 3072,
      "rowCount": 6
     },
     {
      "url": "media/panorama_0D0EB815_1615_12C1_4168_B99D566E62BC_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "rowCount": 3
     },
     {
      "url": "media/panorama_0D0EB815_1615_12C1_4168_B99D566E62BC_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "rowCount": 2
     },
     {
      "url": "media/panorama_0D0EB815_1615_12C1_4168_B99D566E62BC_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "rowCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_0D0EB815_1615_12C1_4168_B99D566E62BC_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "height": 3072,
      "rowCount": 6
     },
     {
      "url": "media/panorama_0D0EB815_1615_12C1_4168_B99D566E62BC_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "rowCount": 3
     },
     {
      "url": "media/panorama_0D0EB815_1615_12C1_4168_B99D566E62BC_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "rowCount": 2
     },
     {
      "url": "media/panorama_0D0EB815_1615_12C1_4168_B99D566E62BC_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "rowCount": 1
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": true,
 "class": "Panorama",
 "hfov": 180,
 "hfovMax": 70,
 "vfov": 69.66,
 "overlays": [
  "this.overlay_0AA1E90E_161B_72C3_41AA_3948D529EF2C",
  "this.overlay_33E59812_166B_72C0_41AB_E0E7B8C47F82",
  "this.overlay_33E2EBF2_166D_7540_41A5_D7AD0A48B5BA",
  "this.overlay_0F67723A_1ABC_9430_41A5_09871B017639",
  "this.overlay_5DCBD565_488C_BC2D_41C6_27E9A820B398"
 ],
 "thumbnailUrl": "media/panorama_0D0EB815_1615_12C1_4168_B99D566E62BC_t.jpg",
 "hfovMin": "200%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_0DBBDFD7_166D_6D40_419D_41FF8FA1CCD3"
  }
 ],
 "mapLocations": [
  {
   "map": "this.map_4573C735_48C4_8E32_41C7_00638466F88A",
   "x": 362.75,
   "class": "PanoramaMapLocation",
   "angle": 19.98,
   "y": 197.75
  }
 ]
},
{
 "class": "PlayList",
 "id": "playList_460180F0_49C9_7699_41B0_1A2DF49A3577",
 "items": [
  {
   "begin": "this.ViewerAreaLabeled_0071A5C9_1B70_BD65_41A6_53A0DC9D75B4MapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_00700A8F_162B_17C1_41B0_2FCC73755E28",
   "class": "MapPlayListItem",
   "player": "this.ViewerAreaLabeled_0071A5C9_1B70_BD65_41A6_53A0DC9D75B4MapPlayer"
  }
 ]
},
{
 "label": "Spherical \ud3c9\uba74 \ucd5c\uc885",
 "id": "panorama_0DBBDFD7_166D_6D40_419D_41FF8FA1CCD3",
 "pitch": -2.27,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_0DBBDFD7_166D_6D40_419D_41FF8FA1CCD3_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "height": 3072,
      "rowCount": 6
     },
     {
      "url": "media/panorama_0DBBDFD7_166D_6D40_419D_41FF8FA1CCD3_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "rowCount": 3
     },
     {
      "url": "media/panorama_0DBBDFD7_166D_6D40_419D_41FF8FA1CCD3_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "rowCount": 2
     },
     {
      "url": "media/panorama_0DBBDFD7_166D_6D40_419D_41FF8FA1CCD3_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "rowCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_0DBBDFD7_166D_6D40_419D_41FF8FA1CCD3_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_0DBBDFD7_166D_6D40_419D_41FF8FA1CCD3_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "height": 3072,
      "rowCount": 6
     },
     {
      "url": "media/panorama_0DBBDFD7_166D_6D40_419D_41FF8FA1CCD3_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "rowCount": 3
     },
     {
      "url": "media/panorama_0DBBDFD7_166D_6D40_419D_41FF8FA1CCD3_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "rowCount": 2
     },
     {
      "url": "media/panorama_0DBBDFD7_166D_6D40_419D_41FF8FA1CCD3_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "rowCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_0DBBDFD7_166D_6D40_419D_41FF8FA1CCD3_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "height": 3072,
      "rowCount": 6
     },
     {
      "url": "media/panorama_0DBBDFD7_166D_6D40_419D_41FF8FA1CCD3_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "rowCount": 3
     },
     {
      "url": "media/panorama_0DBBDFD7_166D_6D40_419D_41FF8FA1CCD3_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "rowCount": 2
     },
     {
      "url": "media/panorama_0DBBDFD7_166D_6D40_419D_41FF8FA1CCD3_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "rowCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_0DBBDFD7_166D_6D40_419D_41FF8FA1CCD3_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "height": 3072,
      "rowCount": 6
     },
     {
      "url": "media/panorama_0DBBDFD7_166D_6D40_419D_41FF8FA1CCD3_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "rowCount": 3
     },
     {
      "url": "media/panorama_0DBBDFD7_166D_6D40_419D_41FF8FA1CCD3_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "rowCount": 2
     },
     {
      "url": "media/panorama_0DBBDFD7_166D_6D40_419D_41FF8FA1CCD3_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "rowCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_0DBBDFD7_166D_6D40_419D_41FF8FA1CCD3_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "height": 3072,
      "rowCount": 6
     },
     {
      "url": "media/panorama_0DBBDFD7_166D_6D40_419D_41FF8FA1CCD3_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "rowCount": 3
     },
     {
      "url": "media/panorama_0DBBDFD7_166D_6D40_419D_41FF8FA1CCD3_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "rowCount": 2
     },
     {
      "url": "media/panorama_0DBBDFD7_166D_6D40_419D_41FF8FA1CCD3_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "rowCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_0DBBDFD7_166D_6D40_419D_41FF8FA1CCD3_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "height": 3072,
      "rowCount": 6
     },
     {
      "url": "media/panorama_0DBBDFD7_166D_6D40_419D_41FF8FA1CCD3_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "rowCount": 3
     },
     {
      "url": "media/panorama_0DBBDFD7_166D_6D40_419D_41FF8FA1CCD3_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "rowCount": 2
     },
     {
      "url": "media/panorama_0DBBDFD7_166D_6D40_419D_41FF8FA1CCD3_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "rowCount": 1
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "class": "Panorama",
 "hfov": 360,
 "hfovMax": 120,
 "vfov": 175.45,
 "overlays": [
  "this.overlay_5C74D506_488B_BDEF_41AF_3D47AB797A6F",
  "this.overlay_0A4CBC70_162D_335F_41A4_C9034FECDC8E",
  "this.overlay_0ADACF2E_161B_2EC3_41B4_9757AC0277FF"
 ],
 "thumbnailUrl": "media/panorama_0DBBDFD7_166D_6D40_419D_41FF8FA1CCD3_t.jpg",
 "hfovMin": "200%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_0D0EB815_1615_12C1_4168_B99D566E62BC"
  }
 ],
 "mapLocations": [
  {
   "map": "this.map_4573C735_48C4_8E32_41C7_00638466F88A",
   "x": 290.75,
   "class": "PanoramaMapLocation",
   "angle": 19.52,
   "y": 427.75
  }
 ]
},
{
 "class": "PlayList",
 "id": "playList_461680F2_49C9_7699_41B7_E02DA7060164",
 "items": [
  {
   "begin": "this.ViewerAreaLabeled_550350CB_4332_B346_41C3_281B3169367BMapPlayer.set('movementMode', 'free_drag_and_rotation')",
   "media": "this.map_4573C735_48C4_8E32_41C7_00638466F88A",
   "class": "MapPlayListItem",
   "player": "this.ViewerAreaLabeled_550350CB_4332_B346_41C3_281B3169367BMapPlayer"
  }
 ]
},
{
 "headerPaddingBottom": 0,
 "width": 640,
 "contentOpaque": false,
 "id": "window_03150365_1BEC_B453_416C_F32946323E70",
 "bodyPaddingRight": 5,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "headerBackgroundColor": [
  "#FFFFFF",
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarMargin": 2,
 "shadowSpread": 1,
 "minWidth": 20,
 "bodyPaddingBottom": 5,
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "modal": true,
 "backgroundOpacity": 1,
 "veilColorRatios": [
  0,
  1
 ],
 "headerPaddingRight": 0,
 "closeButtonPressedIconColor": "#FFFFFF",
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "titlePaddingBottom": 5,
 "closeButtonPaddingLeft": 0,
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "bodyPaddingLeft": 5,
 "height": 444,
 "title": "",
 "bodyBackgroundColorDirection": "vertical",
 "footerBorderColor": "#000000",
 "titleFontStyle": "normal",
 "titleFontFamily": "Arial",
 "propagateClick": false,
 "backgroundColor": [],
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "footerBackgroundOpacity": 0,
 "titlePaddingLeft": 5,
 "shadow": true,
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "borderSize": 0,
 "headerPaddingTop": 0,
 "closeButtonBackgroundColorDirection": "vertical",
 "headerBackgroundColorDirection": "vertical",
 "headerVerticalAlign": "middle",
 "footerBorderSize": 0,
 "closeButtonPaddingTop": 0,
 "paddingRight": 0,
 "minHeight": 20,
 "closeButtonBorderColor": "#000000",
 "footerHeight": 5,
 "backgroundColorDirection": "vertical",
 "closeButtonBorderRadius": 11,
 "headerBackgroundOpacity": 1,
 "children": [
  "this.viewer_uid460980F1_49C9_769B_415B_4F2A0376C462",
  "this.htmlText_03177366_1BEC_B451_4186_0AEBDB50CD32"
 ],
 "titleTextDecoration": "none",
 "scrollBarColor": "#000000",
 "titlePaddingTop": 5,
 "shadowBlurRadius": 6,
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "closeButtonBackgroundColorRatios": [],
 "shadowColor": "#000000",
 "bodyBackgroundOpacity": 1,
 "class": "Window",
 "closeButtonPaddingRight": 0,
 "titleFontSize": "0.6vw",
 "titleFontWeight": "normal",
 "closeButtonIconHeight": 12,
 "shadowOpacity": 0.5,
 "headerBorderColor": "#FFFFFF",
 "veilColorDirection": "horizontal",
 "borderRadius": 5,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "overflow": "scroll",
 "bodyBorderSize": 2,
 "headerPaddingLeft": 0,
 "hideEffect": {
  "class": "FadeOutEffect",
  "duration": 500,
  "easing": "cubic_in_out"
 },
 "showEffect": {
  "class": "FadeInEffect",
  "duration": 500,
  "easing": "cubic_in_out"
 },
 "backgroundColorRatios": [],
 "footerBackgroundColorDirection": "vertical",
 "closeButtonBackgroundColor": [],
 "gap": 10,
 "veilOpacity": 0,
 "titlePaddingRight": 5,
 "bodyBorderColor": "#FFFFFF",
 "veilShowEffect": {
  "class": "FadeInEffect",
  "duration": 500,
  "easing": "cubic_in_out"
 },
 "paddingBottom": 0,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "closeButtonIconWidth": 12,
 "verticalAlign": "middle",
 "headerBorderSize": 0,
 "closeButtonPaddingBottom": 0,
 "paddingTop": 0,
 "shadowHorizontalLength": 3,
 "closeButtonBackgroundOpacity": 0.3,
 "closeButtonIconColor": "#000000",
 "veilHideEffect": {
  "class": "FadeOutEffect",
  "duration": 500,
  "easing": "cubic_in_out"
 },
 "bodyPaddingTop": 5,
 "close": "this.playList_460940F1_49C9_769B_41C4_19D05E033767.set('selectedIndex', -1);",
 "closeButtonBorderSize": 0,
 "data": {
  "name": "Window18125"
 },
 "shadowVerticalLength": 0,
 "horizontalAlign": "center",
 "closeButtonIconLineWidth": 2,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "titleFontColor": "#000000",
 "layout": "vertical"
},
{
 "class": "PlayList",
 "id": "mainPlayList",
 "items": [
  {
   "media": "this.album_0D5A37D1_16FB_1D41_4193_115D31E8EA85",
   "class": "PhotoAlbumPlayListItem",
   "begin": "this.loopAlbum(this.mainPlayList, 0)",
   "player": "this.MainViewerPhotoAlbumPlayer",
   "end": "this.trigger('tourEnded')"
  }
 ]
},
{
 "class": "MapPlayer",
 "id": "ViewerAreaLabeled_550350CB_4332_B346_41C3_281B3169367BMapPlayer",
 "movementMode": "constrained",
 "viewerArea": "this.ViewerAreaLabeled_550350CB_4332_B346_41C3_281B3169367B"
},
{
 "fieldOfViewOverlayOutsideColor": "#FFFFFF",
 "fieldOfViewOverlayOutsideOpacity": 0,
 "label": "\uc9c0\ub3c4",
 "fieldOfViewOverlayInsideOpacity": 0.41,
 "fieldOfViewOverlayRadiusScale": 0.12,
 "id": "map_4573C735_48C4_8E32_41C7_00638466F88A",
 "image": {
  "levels": [
   {
    "url": "media/map_4573C735_48C4_8E32_41C7_00638466F88A.png",
    "width": 600,
    "class": "ImageResourceLevel",
    "height": 600
   },
   {
    "url": "media/map_4573C735_48C4_8E32_41C7_00638466F88A_lq.png",
    "width": 256,
    "class": "ImageResourceLevel",
    "height": 256,
    "tags": "preload"
   }
  ],
  "class": "ImageResource"
 },
 "width": 600,
 "fieldOfViewOverlayInsideColor": "#FF9900",
 "class": "Map",
 "overlays": [
  "this.overlay_4573D735_48C4_8E32_41C7_3FF8DDD45D1F",
  "this.overlay_4573E735_48C4_8E32_41C7_6C757F11B736",
  "this.overlay_45EB63CB_48C4_8656_41B7_4BE0B89EB0A6"
 ],
 "scaleMode": "fit_inside",
 "minimumZoomFactor": 0.5,
 "thumbnailUrl": "media/map_4573C735_48C4_8E32_41C7_00638466F88A_t.png",
 "maximumZoomFactor": 1.2,
 "initialZoomFactor": 1,
 "height": 600
},
{
 "class": "PlayList",
 "id": "playList_460B80F0_49C9_7699_41B4_E011AC393947",
 "items": [
  {
   "media": "this.video_5DCE296E_489D_943C_41C4_B1361547758F",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer)",
   "player": "this.MainViewerVideoPlayer",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_460B80F0_49C9_7699_41B4_E011AC393947, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_460B80F0_49C9_7699_41B4_E011AC393947, 0)"
  }
 ]
},
{
 "class": "PlayList",
 "id": "playList_460A70F0_49C9_7699_41CE_2C40002DF5B3",
 "items": [
  "this.PanoramaPlayListItem_461450F3_49C9_769F_41AB_0FD6C1F2E4C4"
 ]
},
{
 "class": "FadeInEffect",
 "duration": 300,
 "id": "effect_5A90D5F9_48DC_8232_41AD_F393E7B7AFB3",
 "easing": "linear"
},
{
 "class": "Video",
 "label": "One point Rotation 720P",
 "scaleMode": "fit_inside",
 "width": 1280,
 "loop": true,
 "id": "video_0B38A18D_161D_35C0_4186_8691B244AF5A",
 "thumbnailUrl": "media/video_0B38A18D_161D_35C0_4186_8691B244AF5A_t.jpg",
 "height": 720,
 "video": {
  "width": 1280,
  "class": "VideoResource",
  "mp4Url": "media/video_0B38A18D_161D_35C0_4186_8691B244AF5A.mp4",
  "height": 720
 }
},
{
 "class": "SlideInEffect",
 "duration": 0,
 "id": "effect_59807058_48C3_8272_41A4_D23CA416B249",
 "from": "bottom",
 "easing": "linear"
},
{
 "class": "PanoramaCamera",
 "automaticRotationSpeed": 400,
 "manualRotationSpeed": 400,
 "id": "camera_478F511A_49C9_7789_41C5_7A38381599B3",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -1.07,
  "hfov": 70,
  "pitch": -18.05
 },
 "automaticZoomSpeed": 100
},
{
 "class": "PanoramaCamera",
 "automaticRotationSpeed": 400,
 "manualRotationSpeed": 400,
 "id": "camera_478AA123_49C9_77BE_41A3_432783747802",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -0.45,
  "hfov": 110,
  "pitch": -23.84
 },
 "automaticZoomSpeed": 100
},
{
 "touchControlMode": "drag_rotation",
 "class": "PanoramaPlayer",
 "mouseControlMode": "drag_rotation",
 "gyroscopeVerticalDraggingEnabled": true,
 "displayPlaybackBar": true,
 "id": "MainViewerPanoramaPlayer",
 "viewerArea": "this.MainViewer"
},
{
 "class": "PlayList",
 "id": "playList_461650F2_49C9_7699_41D0_F5C6C939474B",
 "items": [
  {
   "media": "this.video_0B38A18D_161D_35C0_4186_8691B244AF5A",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer)",
   "player": "this.MainViewerVideoPlayer",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', false); this.changeBackgroundWhilePlay(this.playList_461650F2_49C9_7699_41D0_F5C6C939474B, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_461650F2_49C9_7699_41D0_F5C6C939474B, 0)"
  }
 ]
},
{
 "playbackBarHeight": 10,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "id": "MainViewer",
 "toolTipFontWeight": "normal",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 7,
 "playbackBarRight": 0,
 "right": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipShadowColor": "#333333",
 "playbackBarHeadWidth": 6,
 "paddingLeft": 0,
 "progressBarBorderSize": 0,
 "width": "60.615%",
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "minWidth": 100,
 "playbackBarProgressBorderSize": 0,
 "toolTipShadowOpacity": 1,
 "playbackBarBorderRadius": 0,
 "toolTipFontStyle": "normal",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarHeadBorderColor": "#000000",
 "propagateClick": true,
 "toolTipFontFamily": "나눔고딕 ExtraBold",
 "height": "100%",
 "transitionMode": "blending",
 "shadow": false,
 "toolTipTextShadowOpacity": 0,
 "borderSize": 0,
 "playbackBarBorderSize": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "progressLeft": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "paddingRight": 0,
 "minHeight": 50,
 "vrPointerSelectionTime": 2000,
 "toolTipFontColor": "#FFFFFF",
 "playbackBarHeadShadowColor": "#000000",
 "progressOpacity": 1,
 "progressRight": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "firstTransitionDuration": 0,
 "progressBottom": 0,
 "toolTipBackgroundColor": "#FFFFFF",
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipPaddingRight": 10,
 "class": "ViewerArea",
 "toolTipShadowHorizontalLength": 0,
 "vrPointerColor": "#FFFFFF",
 "toolTipPaddingLeft": 10,
 "toolTipPaddingTop": 7,
 "toolTipBorderSize": 1,
 "progressBorderSize": 0,
 "toolTipDisplayTime": 600,
 "playbackBarBorderColor": "#FFFFFF",
 "top": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "displayTooltipInTouchScreens": true,
 "progressBarOpacity": 1,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "progressBorderRadius": 0,
 "toolTipShadowVerticalLength": 0,
 "playbackBarHeadHeight": 15,
 "playbackBarLeft": 0,
 "transitionDuration": 500,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "paddingBottom": 0,
 "progressBarBorderColor": "#0066FF",
 "paddingTop": 0,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 5,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "toolTipBorderColor": "#767676",
 "toolTipShadowBlurRadius": 3,
 "progressBorderColor": "#FFFFFF",
 "playbackBarHeadShadowVerticalLength": 0,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipOpacity": 1,
 "progressBackgroundColorDirection": "vertical",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "data": {
  "name": "Main Viewer"
 },
 "toolTipTextShadowColor": "#000000",
 "toolTipFontSize": "13px",
 "playbackBarProgressBackgroundColorDirection": "vertical"
},
{
 "playbackBarHeight": 10,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "id": "ViewerAreaLabeled_0071A5C9_1B70_BD65_41A6_53A0DC9D75B4",
 "toolTipFontWeight": "normal",
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarRight": 0,
 "paddingLeft": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipShadowColor": "#333333",
 "playbackBarHeadWidth": 6,
 "toolTipPaddingBottom": 4,
 "progressBarBorderSize": 0,
 "width": "39.385%",
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "left": "0%",
 "minWidth": 1,
 "playbackBarProgressBorderSize": 0,
 "toolTipShadowOpacity": 1,
 "playbackBarBorderRadius": 0,
 "toolTipFontStyle": "normal",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarHeadBorderColor": "#000000",
 "propagateClick": false,
 "toolTipFontFamily": "Arial",
 "height": "100%",
 "transitionMode": "blending",
 "shadow": false,
 "toolTipTextShadowOpacity": 0,
 "borderSize": 0,
 "playbackBarBorderSize": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "progressLeft": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "paddingRight": 0,
 "minHeight": 1,
 "vrPointerSelectionTime": 2000,
 "toolTipFontColor": "#606060",
 "playbackBarHeadShadowColor": "#000000",
 "progressOpacity": 1,
 "progressRight": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "firstTransitionDuration": 0,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipPaddingRight": 6,
 "class": "ViewerArea",
 "toolTipShadowHorizontalLength": 0,
 "vrPointerColor": "#FFFFFF",
 "toolTipPaddingLeft": 6,
 "toolTipPaddingTop": 4,
 "toolTipBorderSize": 1,
 "progressBorderSize": 0,
 "toolTipDisplayTime": 600,
 "playbackBarBorderColor": "#FFFFFF",
 "top": "0%",
 "playbackBarHeadShadowHorizontalLength": 0,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "displayTooltipInTouchScreens": true,
 "progressBarOpacity": 1,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "progressBorderRadius": 0,
 "toolTipShadowVerticalLength": 0,
 "playbackBarHeadHeight": 15,
 "playbackBarLeft": 0,
 "transitionDuration": 500,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "paddingBottom": 0,
 "progressBarBorderColor": "#0066FF",
 "paddingTop": 0,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "toolTipBorderColor": "#767676",
 "toolTipShadowBlurRadius": 3,
 "progressBorderColor": "#FFFFFF",
 "playbackBarHeadShadowVerticalLength": 0,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipOpacity": 1,
 "progressBackgroundColorDirection": "vertical",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "data": {
  "name": "Viewer 3"
 },
 "toolTipTextShadowColor": "#000000",
 "toolTipFontSize": 12,
 "playbackBarProgressBackgroundColorDirection": "vertical"
},
{
 "id": "IconButton_01786869_161B_1341_4187_7C4B00D22041",
 "width": 32,
 "left": "1.99%",
 "paddingLeft": 0,
 "class": "IconButton",
 "minWidth": 0,
 "backgroundOpacity": 0,
 "transparencyActive": true,
 "bottom": "2.81%",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_01786869_161B_1341_4187_7C4B00D22041_pressed.png",
 "mode": "push",
 "height": 32,
 "click": "this.setMediaBehaviour(this.playList_460170EF_49C9_7687_41C2_840382BF8B6F, 0); this.mainPlayList.set('selectedIndex', 0); this.setComponentVisibility(this.ViewerAreaLabeled_550350CB_4332_B346_41C3_281B3169367B, false, 0, null, null, false); this.setComponentVisibility(this.IconButton_01AA3159_161B_3541_41B0_E8EF1E0CD7D6, true, 0, null, null, false); this.setComponentVisibility(this.IconButton_01786869_161B_1341_4187_7C4B00D22041, false, 0, null, null, false)",
 "propagateClick": false,
 "shadow": false,
 "paddingBottom": 0,
 "borderSize": 0,
 "verticalAlign": "middle",
 "paddingTop": 0,
 "rollOverIconURL": "skin/IconButton_01786869_161B_1341_4187_7C4B00D22041_rollover.png",
 "horizontalAlign": "center",
 "paddingRight": 0,
 "minHeight": 0,
 "data": {
  "name": "Button31987"
 },
 "visible": false,
 "iconURL": "skin/IconButton_01786869_161B_1341_4187_7C4B00D22041.png",
 "cursor": "hand"
},
{
 "id": "IconButton_01AA3159_161B_3541_41B0_E8EF1E0CD7D6",
 "width": 32,
 "left": "35.76%",
 "paddingLeft": 0,
 "class": "IconButton",
 "minWidth": 0,
 "backgroundOpacity": 0,
 "transparencyActive": true,
 "bottom": "2.81%",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_01AA3159_161B_3541_41B0_E8EF1E0CD7D6_pressed.png",
 "mode": "push",
 "height": 32,
 "click": "this.setMediaBehaviour(this.playList_460180F0_49C9_7699_41B0_1A2DF49A3577, 0); this.mainPlayList.set('selectedIndex', 0); this.setComponentVisibility(this.ViewerAreaLabeled_550350CB_4332_B346_41C3_281B3169367B, false, 0, null, null, false); this.setComponentVisibility(this.IconButton_01AA3159_161B_3541_41B0_E8EF1E0CD7D6, false, 0, null, null, false); this.setComponentVisibility(this.IconButton_01786869_161B_1341_4187_7C4B00D22041, true, 0, null, null, false)",
 "propagateClick": false,
 "shadow": false,
 "paddingBottom": 0,
 "borderSize": 0,
 "verticalAlign": "middle",
 "paddingTop": 0,
 "rollOverIconURL": "skin/IconButton_01AA3159_161B_3541_41B0_E8EF1E0CD7D6_rollover.png",
 "horizontalAlign": "center",
 "paddingRight": 0,
 "minHeight": 0,
 "data": {
  "name": "Button31992"
 },
 "iconURL": "skin/IconButton_01AA3159_161B_3541_41B0_E8EF1E0CD7D6.png",
 "cursor": "hand"
},
{
 "maxWidth": 128,
 "id": "IconButton_0EABF219_1B53_B6E5_41A6_18430B89E229",
 "width": 40,
 "toolTip": "Fullscreen",
 "toolTipPaddingBottom": 4,
 "right": "1.26%",
 "toolTipFontWeight": "normal",
 "toolTipShadowColor": "#333333",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingRight": 6,
 "paddingLeft": 0,
 "class": "IconButton",
 "toolTipShadowHorizontalLength": 0,
 "toolTipPaddingLeft": 6,
 "toolTipPaddingTop": 4,
 "minWidth": 1,
 "backgroundOpacity": 0,
 "toolTipDisplayTime": 600,
 "transparencyActive": true,
 "toolTipBorderSize": 1,
 "top": "1.5%",
 "toolTipBorderRadius": 3,
 "toolTipShadowOpacity": 1,
 "toolTipFontStyle": "normal",
 "borderRadius": 0,
 "height": 40,
 "toolTipShadowVerticalLength": 0,
 "mode": "toggle",
 "propagateClick": false,
 "toolTipFontFamily": "Arial",
 "shadow": false,
 "paddingBottom": 0,
 "toolTipTextShadowOpacity": 0,
 "borderSize": 0,
 "verticalAlign": "middle",
 "paddingTop": 0,
 "toolTipShadowSpread": 0,
 "maxHeight": 128,
 "toolTipShadowBlurRadius": 3,
 "horizontalAlign": "center",
 "paddingRight": 0,
 "minHeight": 1,
 "data": {
  "name": "IconButton1493"
 },
 "toolTipOpacity": 1,
 "toolTipBorderColor": "#767676",
 "toolTipFontColor": "#606060",
 "iconURL": "skin/IconButton_0EABF219_1B53_B6E5_41A6_18430B89E229.png",
 "toolTipTextShadowColor": "#000000",
 "toolTipFontSize": 12,
 "toolTipBackgroundColor": "#F6F6F6",
 "cursor": "hand"
},
{
 "id": "IconButton_55DD76A9_432E_DFC2_41C8_D237A76A9E57",
 "width": 40,
 "right": "3.92%",
 "paddingLeft": 0,
 "class": "IconButton",
 "minWidth": 0,
 "backgroundOpacity": 0,
 "transparencyActive": true,
 "top": "1.5%",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_55DD76A9_432E_DFC2_41C8_D237A76A9E57_pressed.png",
 "mode": "toggle",
 "height": 40,
 "propagateClick": false,
 "shadow": false,
 "paddingBottom": 0,
 "borderSize": 0,
 "verticalAlign": "middle",
 "paddingTop": 0,
 "horizontalAlign": "center",
 "paddingRight": 0,
 "minHeight": 0,
 "data": {
  "name": "Button8714"
 },
 "iconURL": "skin/IconButton_55DD76A9_432E_DFC2_41C8_D237A76A9E57.png",
 "cursor": "hand"
},
{
 "playbackBarHeight": 10,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "id": "ViewerAreaLabeled_550350CB_4332_B346_41C3_281B3169367B",
 "toolTipFontWeight": "normal",
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarRight": 0,
 "paddingLeft": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipShadowColor": "#333333",
 "playbackBarHeadWidth": 6,
 "toolTipPaddingBottom": 4,
 "progressBarBorderSize": 0,
 "width": "19.543%",
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "left": "39.98%",
 "minWidth": 1,
 "playbackBarProgressBorderSize": 0,
 "toolTipShadowOpacity": 1,
 "playbackBarBorderRadius": 0,
 "toolTipFontStyle": "normal",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarHeadBorderColor": "#000000",
 "propagateClick": false,
 "toolTipFontFamily": "Arial",
 "height": "31.808%",
 "transitionMode": "blending",
 "shadow": false,
 "toolTipTextShadowOpacity": 0,
 "borderSize": 0,
 "playbackBarBorderSize": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "progressLeft": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "paddingRight": 10,
 "minHeight": 1,
 "vrPointerSelectionTime": 2000,
 "toolTipFontColor": "#606060",
 "playbackBarHeadShadowColor": "#000000",
 "progressOpacity": 1,
 "progressRight": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "firstTransitionDuration": 0,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipPaddingRight": 6,
 "class": "ViewerArea",
 "toolTipShadowHorizontalLength": 0,
 "vrPointerColor": "#FFFFFF",
 "toolTipPaddingLeft": 6,
 "toolTipPaddingTop": 4,
 "toolTipBorderSize": 1,
 "progressBorderSize": 0,
 "toolTipDisplayTime": 600,
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipShadowVerticalLength": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "displayTooltipInTouchScreens": true,
 "progressBarOpacity": 1,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "bottom": "1.64%",
 "progressBorderRadius": 0,
 "playbackBarHeadHeight": 15,
 "playbackBarLeft": 0,
 "transitionDuration": 500,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "paddingBottom": 10,
 "progressBarBorderColor": "#0066FF",
 "paddingTop": 10,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "toolTipBorderColor": "#767676",
 "toolTipShadowBlurRadius": 3,
 "progressBorderColor": "#FFFFFF",
 "playbackBarHeadShadowVerticalLength": 0,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipOpacity": 1,
 "progressBackgroundColorDirection": "vertical",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "data": {
  "name": "Viewer 4"
 },
 "toolTipTextShadowColor": "#000000",
 "toolTipFontSize": 12,
 "visible": false,
 "playbackBarProgressBackgroundColorDirection": "vertical"
},
{
 "maxWidth": 600,
 "id": "IconButton_5AE927FD_48C4_8E32_41BC_42E24B869B3E",
 "width": 40,
 "right": "6.57%",
 "paddingLeft": 0,
 "class": "IconButton",
 "minWidth": 1,
 "backgroundOpacity": 0,
 "transparencyActive": false,
 "top": "1.53%",
 "borderRadius": 0,
 "height": 40,
 "click": "this.setComponentVisibility(this.ViewerAreaLabeled_550350CB_4332_B346_41C3_281B3169367B, true, 0, this.effect_59807058_48C3_8272_41A4_D23CA416B249, 'showEffect', false); this.setComponentVisibility(this.IconButton_5AE927FD_48C4_8E32_41BC_42E24B869B3E, false, 0, null, null, false)",
 "mode": "push",
 "propagateClick": false,
 "shadow": false,
 "paddingBottom": 0,
 "borderSize": 0,
 "verticalAlign": "middle",
 "paddingTop": 0,
 "maxHeight": 600,
 "horizontalAlign": "center",
 "paddingRight": 0,
 "minHeight": 1,
 "data": {
  "name": "IconButton7667"
 },
 "visible": false,
 "iconURL": "skin/IconButton_5AE927FD_48C4_8E32_41BC_42E24B869B3E.png",
 "cursor": "hand"
},
{
 "class": "PhotoPlayList",
 "id": "album_0D5A37D1_16FB_1D41_4193_115D31E8EA85_AlbumPlayList",
 "items": [
  {
   "camera": {
    "targetPosition": {
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "y": "0.50",
     "zoomFactor": 1.1
    },
    "duration": 5000,
    "class": "MovementPhotoCamera",
    "scaleMode": "fit_outside",
    "initialPosition": {
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "y": "0.50",
     "zoomFactor": 1
    },
    "easing": "linear"
   },
   "media": "this.album_0D5A37D1_16FB_1D41_4193_115D31E8EA85_0",
   "class": "PhotoPlayListItem"
  }
 ]
},
{
 "camera": "this.panorama_0D0EB815_1615_12C1_4168_B99D566E62BC_camera",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_461300F4_49C9_7699_41A9_8D341CF00DC7, this.ViewerAreaLabeled_550350CB_4332_B346_41C3_281B3169367BMapPlayer)",
 "media": "this.panorama_0D0EB815_1615_12C1_4168_B99D566E62BC",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_461300F4_49C9_7699_41A9_8D341CF00DC7"
},
{
 "map": {
  "width": 476.92,
  "x": 1983.18,
  "class": "HotspotMapOverlayMap",
  "image": {
   "levels": [
    {
     "url": "media/map_00700A8F_162B_17C1_41B0_2FCC73755E28_HS_1_map.gif",
     "width": 47,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ],
   "class": "ImageResource"
  },
  "y": 2925.48,
  "offsetY": 0,
  "height": 159.52,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.playList_460A70F0_49C9_7699_41CE_2C40002DF5B3.set('selectedIndex', 0); this.setComponentVisibility(this.ViewerAreaLabeled_550350CB_4332_B346_41C3_281B3169367B, true, 0, null, null, false)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": false,
 "id": "overlay_5F6C90B4_489C_942C_41D1_3F2D775D2D8B",
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 1983.18,
  "class": "HotspotMapOverlayImage",
  "y": 2925.48,
  "width": 476.92,
  "image": {
   "levels": [
    {
     "url": "media/map_00700A8F_162B_17C1_41B0_2FCC73755E28_HS_1.png",
     "width": 434,
     "class": "ImageResourceLevel",
     "height": 145
    }
   ],
   "class": "ImageResource"
  },
  "height": 159.52
 }
},
{
 "map": {
  "width": 2429.74,
  "x": 43.57,
  "class": "HotspotMapOverlayMap",
  "image": {
   "levels": [
    {
     "url": "media/map_00700A8F_162B_17C1_41B0_2FCC73755E28_HS_0_map.gif",
     "width": 200,
     "class": "ImageResourceLevel",
     "height": 146
    }
   ],
   "class": "ImageResource"
  },
  "y": 1359.44,
  "offsetY": 0,
  "height": 1778.16,
  "offsetX": 0
 },
 "class": "IconHotspotMapOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.playList_460A70F0_49C9_7699_41CE_2C40002DF5B3.set('selectedIndex', 0); this.setComponentVisibility(this.ViewerAreaLabeled_550350CB_4332_B346_41C3_281B3169367B, true, 0, null, null, false)",
   "class": "HotspotMapOverlayArea",
   "toolTip": "360 VR \ubcf4\uae30",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_013CC2C1_161F_1740_4194_20C4F20D2619",
 "data": {
  "label": "Polygon"
 },
 "image": {
  "width": 2429.74,
  "x": 43.57,
  "class": "HotspotMapOverlayImage",
  "image": {
   "levels": [
    {
     "url": "media/map_00700A8F_162B_17C1_41B0_2FCC73755E28_HS_0.png",
     "width": 2215,
     "class": "ImageResourceLevel",
     "height": 1621
    }
   ],
   "class": "ImageResource"
  },
  "y": 1359.44,
  "height": 1778.16
 }
},
{
 "map": {
  "width": 944.93,
  "x": 248.43,
  "class": "HotspotMapOverlayMap",
  "image": {
   "levels": [
    {
     "url": "media/map_032C0BC0_163F_15BF_4199_0C3029217DFA_HS_0_map.gif",
     "width": 200,
     "class": "ImageResourceLevel",
     "height": 162
    }
   ],
   "class": "ImageResource"
  },
  "y": 1176.7,
  "offsetY": 0,
  "height": 768.65,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": true,
 "areas": [
  {
   "click": "this.playList_460B80F0_49C9_7699_41B4_E011AC393947.set('selectedIndex', 0); this.MainViewerVideoPlayer.play()",
   "class": "HotspotMapOverlayArea",
   "toolTip": "\uc601\uc0c1 \uc7ac\uc0dd",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_03DE070E_163F_1EC0_41B4_5BEBFD75CF60",
 "data": {
  "label": "Polygon"
 },
 "image": {
  "width": 944.93,
  "x": 248.23,
  "class": "HotspotMapOverlayImage",
  "image": {
   "levels": [
    {
     "url": "media/map_032C0BC0_163F_15BF_4199_0C3029217DFA_HS_0.png",
     "width": 865,
     "class": "ImageResourceLevel",
     "height": 704
    }
   ],
   "class": "ImageResource"
  },
  "y": 1176.5,
  "height": 768.65
 }
},
{
 "map": {
  "width": 299.5,
  "x": 917.86,
  "class": "HotspotMapOverlayMap",
  "image": {
   "levels": [
    {
     "url": "media/map_032C0BC0_163F_15BF_4199_0C3029217DFA_HS_2_map.gif",
     "width": 45,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ],
   "class": "ImageResource"
  },
  "y": 1081.28,
  "offsetY": 0,
  "height": 104.32,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.playList_460B80F0_49C9_7699_41B4_E011AC393947.set('selectedIndex', 0); this.MainViewerVideoPlayer.play()",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_5D01A7A3_4894_FC24_41CD_896F81099A8C",
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 917.66,
  "class": "HotspotMapOverlayImage",
  "y": 1080.89,
  "width": 299.5,
  "image": {
   "levels": [
    {
     "url": "media/map_032C0BC0_163F_15BF_4199_0C3029217DFA_HS_2.png",
     "width": 273,
     "class": "ImageResourceLevel",
     "height": 95
    }
   ],
   "class": "ImageResource"
  },
  "height": 104.32
 }
},
{
 "displayPlaybackBar": true,
 "class": "VideoPlayer",
 "id": "viewer_uid460980F1_49C9_769B_415B_4F2A0376C462VideoPlayer",
 "viewerArea": "this.viewer_uid460980F1_49C9_769B_415B_4F2A0376C462"
},
{
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_0D0EB815_1615_12C1_4168_B99D566E62BC_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -0.82,
   "hfov": 3.6,
   "pitch": -37.18
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.setCameraSameSpotAsMedia(this.camera_478AA123_49C9_77BE_41A3_432783747802, this.panorama_0D0EB815_1615_12C1_4168_B99D566E62BC); this.startPanoramaWithCamera(this.panorama_0DBBDFD7_166D_6D40_419D_41FF8FA1CCD3, this.camera_478AA123_49C9_77BE_41A3_432783747802); this.setMediaBehaviour(this.playList_460A70F0_49C9_7699_41CE_2C40002DF5B3, 0, this.panorama_0D0EB815_1615_12C1_4168_B99D566E62BC)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 3.6,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_0D0EB815_1615_12C1_4168_B99D566E62BC_0_HS_0_0.png",
      "width": 119,
      "class": "ImageResourceLevel",
      "height": 118
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -37.18,
   "yaw": -0.82
  }
 ],
 "id": "overlay_0AA1E90E_161B_72C3_41AA_3948D529EF2C",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_0D0EB815_1615_12C1_4168_B99D566E62BC_0_HS_1_0_map.gif",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -1.38,
   "hfov": 16.9,
   "pitch": 4.21
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_0D0EB815_1615_12C1_4168_B99D566E62BC_0_HS_1_0.png",
      "width": 446,
      "class": "ImageResourceLevel",
      "height": 175
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 4.21,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": -1.38,
   "hfov": 16.9,
   "distance": 50
  }
 ],
 "id": "overlay_33E59812_166B_72C0_41AB_E0E7B8C47F82",
 "data": {
  "label": "\ucf5c\ub85c\uc138\uc6c0"
 },
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_0D0EB815_1615_12C1_4168_B99D566E62BC_0_HS_2_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 134
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0.81,
   "hfov": 51.43,
   "pitch": -22.11
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.overlay_5DCBD565_488C_BC2D_41C6_27E9A820B398.set('enabled', true)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_33E2EBF2_166D_7540_41A5_D7AD0A48B5BA",
 "data": {
  "label": "Polygon"
 },
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_0D0EB815_1615_12C1_4168_B99D566E62BC_0_HS_5_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 19
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -1.48,
   "hfov": 8.19,
   "pitch": -19.92
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": false,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.19,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_0D0EB815_1615_12C1_4168_B99D566E62BC_0_HS_5_0.png",
      "width": 229,
      "class": "ImageResourceLevel",
      "height": 281
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -19.92,
   "yaw": -1.48
  }
 ],
 "id": "overlay_0F67723A_1ABC_9430_41A5_09871B017639",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_0D0EB815_1615_12C1_4168_B99D566E62BC_0_HS_8_0_0_map.gif",
      "width": 55,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -1.01,
   "hfov": 45.44,
   "pitch": -7.63
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.overlay_5DCBD565_488C_BC2D_41C6_27E9A820B398.set('enabled', false)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": false,
 "enabled": false,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 45.44,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_0D0EB815_1615_12C1_4168_B99D566E62BC_0_HS_8_0.png",
      "width": 1207,
      "class": "ImageResourceLevel",
      "height": 348
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.63,
   "yaw": -1.01
  }
 ],
 "id": "overlay_5DCBD565_488C_BC2D_41C6_27E9A820B398",
 "data": {
  "label": "\ucf5c\ub85c\uc138\uc6c0 \uc778\ud3ec"
 },
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_0DBBDFD7_166D_6D40_419D_41FF8FA1CCD3_0_HS_2_0_0_map.gif",
      "width": 47,
      "class": "ImageResourceLevel",
      "height": 15
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -0.44,
   "hfov": 23.98,
   "pitch": -11.25
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showWindow(this.window_03150365_1BEC_B453_416C_F32946323E70, null, true); this.playList_460940F1_49C9_769B_41C4_19D05E033767.set('selectedIndex', 0); ; this.viewer_uid460980F1_49C9_769B_415B_4F2A0376C462VideoPlayer.play(); ",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 23.98,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_0DBBDFD7_166D_6D40_419D_41FF8FA1CCD3_0_HS_2_0.png",
      "width": 591,
      "class": "ImageResourceLevel",
      "height": 197
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.25,
   "yaw": -0.44
  }
 ],
 "id": "overlay_5C74D506_488B_BDEF_41AF_3D47AB797A6F",
 "data": {
  "label": "Image"
 }
},
{
 "class": "LensFlarePanoramaOverlay",
 "yaw": 87.8,
 "pitch": 85.45,
 "id": "overlay_0A4CBC70_162D_335F_41A4_C9034FECDC8E",
 "bleaching": 0.7,
 "bleachingDistance": 0.4
},
{
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_0DBBDFD7_166D_6D40_419D_41FF8FA1CCD3_0_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -0.63,
   "hfov": 11.04,
   "pitch": -38.28
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.setCameraSameSpotAsMedia(this.camera_478F511A_49C9_7789_41C5_7A38381599B3, this.panorama_0DBBDFD7_166D_6D40_419D_41FF8FA1CCD3); this.startPanoramaWithCamera(this.panorama_0D0EB815_1615_12C1_4168_B99D566E62BC, this.camera_478F511A_49C9_7789_41C5_7A38381599B3); this.setMediaBehaviour(this.playList_4608A0F2_49C9_7699_41A0_7C2C81F46073, 0, this.panorama_0DBBDFD7_166D_6D40_419D_41FF8FA1CCD3)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_5D45359D_488C_FC1C_41CF_6FB1DC724A0A",
   "pitch": -38.28,
   "yaw": -0.63,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 11.04,
   "distance": 100
  }
 ],
 "id": "overlay_0ADACF2E_161B_2EC3_41B4_9757AC0277FF",
 "data": {
  "label": "Arrow 02a"
 },
 "enabledInCardboard": true
},
{
 "playbackBarHeight": 10,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "id": "viewer_uid460980F1_49C9_769B_415B_4F2A0376C462",
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarRight": 0,
 "paddingLeft": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipShadowColor": "#333333",
 "playbackBarHeadWidth": 6,
 "progressBarBorderSize": 0,
 "width": "100%",
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "minWidth": 100,
 "playbackBarProgressBorderSize": 0,
 "toolTipShadowOpacity": 1,
 "playbackBarBorderRadius": 0,
 "toolTipFontStyle": "normal",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarHeadBorderColor": "#000000",
 "propagateClick": false,
 "toolTipFontFamily": "Arial",
 "height": "87%",
 "transitionMode": "blending",
 "shadow": false,
 "toolTipTextShadowOpacity": 0,
 "borderSize": 0,
 "playbackBarBorderSize": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "progressLeft": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "paddingRight": 0,
 "minHeight": 50,
 "vrPointerSelectionTime": 2000,
 "toolTipFontColor": "#606060",
 "playbackBarHeadShadowColor": "#000000",
 "progressOpacity": 1,
 "progressRight": 0,
 "toolTipBackgroundColor": "#F6F6F6",
 "progressBarBackgroundColorDirection": "vertical",
 "firstTransitionDuration": 0,
 "progressBottom": 2,
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipPaddingRight": 6,
 "class": "ViewerArea",
 "toolTipShadowHorizontalLength": 0,
 "vrPointerColor": "#FFFFFF",
 "toolTipPaddingLeft": 6,
 "toolTipPaddingTop": 4,
 "toolTipBorderSize": 1,
 "progressBorderSize": 0,
 "toolTipDisplayTime": 600,
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipShadowVerticalLength": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "displayTooltipInTouchScreens": true,
 "progressBarOpacity": 1,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "progressBorderRadius": 0,
 "playbackBarLeft": 0,
 "playbackBarHeadHeight": 15,
 "transitionDuration": 500,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "paddingBottom": 0,
 "progressBarBorderColor": "#0066FF",
 "paddingTop": 0,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "toolTipBorderColor": "#767676",
 "toolTipShadowBlurRadius": 3,
 "progressBorderColor": "#FFFFFF",
 "playbackBarHeadShadowVerticalLength": 0,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipOpacity": 1,
 "progressBackgroundColorDirection": "vertical",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "data": {
  "name": "ViewerArea1660"
 },
 "toolTipTextShadowColor": "#000000",
 "toolTipFontSize": "1.11vmin",
 "playbackBarProgressBackgroundColorDirection": "vertical"
},
{
 "id": "htmlText_03177366_1BEC_B451_4186_0AEBDB50CD32",
 "scrollBarColor": "#000000",
 "scrollBarMargin": 2,
 "width": "100%",
 "scrollBarWidth": 10,
 "paddingLeft": 10,
 "scrollBarOpacity": 0.5,
 "class": "HTMLText",
 "scrollBarVisible": "rollOver",
 "minWidth": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "height": "12%",
 "propagateClick": false,
 "shadow": false,
 "paddingBottom": 10,
 "borderSize": 0,
 "paddingTop": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:center;\"><SPAN STYLE=\"letter-spacing:0vw;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.15vw;font-family:'\ubc30\uc2a4\ud0a8\ub77c\ube48\uc2a4 B';\">\uc774\ud0c8\ub9ac\uc544 </SPAN><SPAN STYLE=\"font-size:1.15vw;font-family:'\ubc30\uc2a4\ud0a8\ub77c\ube48\uc2a4 B';\"><B>\ucf5c\ub85c\uc138\uc6c0</B></SPAN></SPAN></DIV></div>",
 "paddingRight": 10,
 "minHeight": 0,
 "data": {
  "name": "HTMLText18126"
 }
},
{
 "map": {
  "width": 30,
  "x": 275.67,
  "class": "HotspotMapOverlayMap",
  "image": {
   "levels": [
    {
     "url": "media/map_4573C735_48C4_8E32_41C7_00638466F88A_HS_0_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ],
   "class": "ImageResource"
  },
  "y": 412.62,
  "offsetY": 0,
  "height": 30,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.playList_460A70F0_49C9_7699_41CE_2C40002DF5B3.set('selectedIndex', 0)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_4573D735_48C4_8E32_41C7_3FF8DDD45D1F",
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 275.65,
  "class": "HotspotMapOverlayImage",
  "y": 412.6,
  "width": 30,
  "image": {
   "levels": [
    {
     "url": "media/map_4573C735_48C4_8E32_41C7_00638466F88A_HS_0.png",
     "width": 30,
     "class": "ImageResourceLevel",
     "height": 30
    }
   ],
   "class": "ImageResource"
  },
  "height": 30
 }
},
{
 "map": {
  "width": 30,
  "x": 347.67,
  "class": "HotspotMapOverlayMap",
  "image": {
   "levels": [
    {
     "url": "media/map_4573C735_48C4_8E32_41C7_00638466F88A_HS_1_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ],
   "class": "ImageResource"
  },
  "y": 182.62,
  "offsetY": 0,
  "height": 30,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.playList_4608A0F2_49C9_7699_41A0_7C2C81F46073.set('selectedIndex', 0)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_4573E735_48C4_8E32_41C7_6C757F11B736",
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 347.65,
  "class": "HotspotMapOverlayImage",
  "y": 182.6,
  "width": 30,
  "image": {
   "levels": [
    {
     "url": "media/map_4573C735_48C4_8E32_41C7_00638466F88A_HS_1.png",
     "width": 30,
     "class": "ImageResourceLevel",
     "height": 30
    }
   ],
   "class": "ImageResource"
  },
  "height": 30
 }
},
{
 "map": {
  "width": 150,
  "x": 16.11,
  "class": "HotspotMapOverlayMap",
  "image": {
   "levels": [
    {
     "url": "media/map_4573C735_48C4_8E32_41C7_00638466F88A_HS_2_map.gif",
     "width": 75,
     "class": "ImageResourceLevel",
     "height": 20
    }
   ],
   "class": "ImageResource"
  },
  "y": 13.48,
  "offsetY": 0,
  "height": 41.28,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.setComponentVisibility(this.ViewerAreaLabeled_550350CB_4332_B346_41C3_281B3169367B, false, 0, this.effect_46E50682_48C7_8ED6_41C1_1FF7B1D08804, 'hideEffect', false); this.setComponentVisibility(this.IconButton_5AE927FD_48C4_8E32_41BC_42E24B869B3E, true, 0, this.effect_5A90D5F9_48DC_8232_41AD_F393E7B7AFB3, 'showEffect', false)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_45EB63CB_48C4_8656_41B7_4BE0B89EB0A6",
 "data": {
  "label": "Polygon"
 },
 "image": {
  "width": 150,
  "x": 16.11,
  "class": "HotspotMapOverlayImage",
  "y": 13.48,
  "height": 41.28
 }
},
{
 "camera": "this.panorama_0DBBDFD7_166D_6D40_419D_41FF8FA1CCD3_camera",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_461450F3_49C9_769F_41AB_0FD6C1F2E4C4, this.ViewerAreaLabeled_550350CB_4332_B346_41C3_281B3169367BMapPlayer)",
 "media": "this.panorama_0DBBDFD7_166D_6D40_419D_41FF8FA1CCD3",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_461450F3_49C9_769F_41AB_0FD6C1F2E4C4"
},
{
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "frameDuration": 50,
 "colCount": 4,
 "repeat": 1,
 "id": "AnimatedImageResource_5D45359D_488C_FC1C_41CF_6FB1DC724A0A",
 "levels": [
  {
   "url": "media/panorama_0DBBDFD7_166D_6D40_419D_41FF8FA1CCD3_0_HS_1_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6
}]
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
