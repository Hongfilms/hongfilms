function TourScript(settings, devicesUrl) {
    this._settings = settings;
    this._devicesUrl = devicesUrl;
    this._player = undefined;
    this._playersPlayingTmp = [];
    this._isInitialized = false;
    this._isPaused = false;
    this._handlers = {};
}

TourScript.DEVICE_GENERAL = "general";
TourScript.DEVICE_MOBILE = "mobile";
TourScript.DEVICE_VR = "vr";

TourScript.DEVICE_ORIENTATION_PORTRAIT = "portrait";
TourScript.DEVICE_ORIENTATION_LANDSCAPE = "landscape";

TourScript.EVENT_TOUR_LOADED = "tourLoaded";
TourScript.EVENT_TOUR_ENDED = "tourEnded";

TourScript.prototype.bind = function(eventName, handler) {
    if(!(eventName in this._handlers))
        this._handlers[eventName] = [];
    this._handlers[eventName].push(handler);
};

TourScript.prototype.unbind = function(eventName, handler) {
    if(eventName in this._handlers) {
        var index = this._handlers[eventName].indexOf(handler);
        if(index != -1)
            this._handlers[eventName].splice(index, 1);
    }
};

TourScript.prototype.createNewEvent = function(eventName) {
    if (typeof(Event) === 'function')
        return new Event(eventName);
    var event = document.createEvent('Event');
    event.initEvent(eventName, true, true);
    return event;
};

TourScript.prototype.dispatchEvent = function(event) {
    if(event['type'] in this._handlers) {
        var handlers = this._handlers[event['type']];
        for(var i = 0; i < handlers.length; ++i) {
            handlers[i].call(window, event);
            if(event.defaultPrevented)
                break;
        }
    }
};

TourScript.prototype.disposeTour = function() {
    if(!this._player)
        return;

    if(this._onHashChange){
        window.removeEventListener("hashchange", this._onHashChange);
        this._onHashChange = undefined;
    }

    if(this._onKeyUp){
        document.removeEventListener("keyup", this._onKeyUp);
        this._onKeyUp = undefined;
    }

    this._player.delete();
    this._player = undefined;
};

TourScript.prototype.loadTour = function() {
    if(this._player)
        return;

    var beginFunc = function(event){
        if(event.name == 'begin')
        {
            var camera = event.data.source.get('camera');
            if(camera && camera.get('initialSequence') && camera.get('initialSequence').get('movements').length > 0)
                return;
        }

        if(event.sourceClassName == "MediaAudio")
            return;

        this._isInitialized = true;

        player.unbind('preloadMediaShow', beginFunc, player, true);
        player.unbindOnObjectsOf('PanoramaPlayListItem', 'begin', beginFunc, player, true);
        player.unbind('stateChange', beginFunc, player, true);

        if(this._isPaused)
            pauseTour();

        window.parent.postMessage(TourScript.EVENT_TOUR_LOADED, '*');
        this.dispatchEvent(this.createNewEvent(TourScript.EVENT_TOUR_LOADED));
    };

    var device = TourScript.DEVICE_GENERAL;
    if(this.isMobile() && TourScript.DEVICE_MOBILE in this._devicesUrl) {
        device = TourScript.DEVICE_MOBILE;
    }
    var scriptUrl = this._devicesUrl[device];
    var listenOrientationChanges = false;
    var orient = TourScript.DEVICE_ORIENTATION_LANDSCAPE;
    if(typeof scriptUrl == "object") {
        orient = window.innerWidth > window.innerHeight ? TourScript.DEVICE_ORIENTATION_LANDSCAPE : TourScript.DEVICE_ORIENTATION_PORTRAIT;
        if(orient in scriptUrl) {
            scriptUrl = scriptUrl[orient];
            listenOrientationChanges = true;
        }
    }

    this._settings.set(TDV.PlayerSettings.SCRIPT_URL, scriptUrl);
    var player = this._player = TDV.PlayerAPI.create(this._settings);
    player.bind('preloadMediaShow', beginFunc, this, true);
    player.bind('stateChange', beginFunc, this, true);
    player.bindOnObjectsOf('PanoramaPlayListItem', 'begin', beginFunc, this, true);
    player.bindOnObject('rootPlayer', 'start', function(e){
        var rootPlayer = e.data.source;
        this._setMediaFromURL(location.hash.substr(1), false) || this._setMediaFromURL(location.search.substr(1), true);

        if(listenOrientationChanges) {
            var orientChange = function(){
                if(!rootPlayer.isCardboardViewMode() && rootPlayer.get('orientation') != orient)
                {
                    this.updateDeepLink();
                    this.disposeTour();
                    this.loadTour();
                }
            };
            var panoramaPlayers = rootPlayer.getByClassName('PanoramaPlayer');
            for(var i = 0; i<panoramaPlayers.length; ++i)
            {
                panoramaPlayers[i].bind('viewModeChange', orientChange, this);
            }
            rootPlayer.bind('orientationChange', orientChange, this);
        }

        this._onHashChange = function() {
            this._setMediaFromURL(location.hash.substr(1), false);
        }.bind(this);
        this._onKeyUp = function(e) {
            if(e.key == "u") {
                this.updateDeepLink();
                this._copyClipboard(location.href);
            }
        }.bind(this);
        window.addEventListener("hashchange", this._onHashChange);
        document.addEventListener("keyup", this._onKeyUp);
        
        //     var index = e.source.get('selectedIndex');
        //     location.hash = "#media-index="+(index+1);
        // }, this);

        rootPlayer.bind('tourEnded', function(){
            dispatchEvent(this.createNewEvent(TourScript.EVENT_TOUR_ENDED));
        }, player, true);
    }, this, false);

    // Listen messages
    window.addEventListener('message', function (e) {
        var action = e.data;
        if (action == 'pauseTour' || action == 'resumeTour') {
            this[action].apply(this);
        }
    });
};

TourScript.prototype.pauseTour = function() {
    this._isPaused = true;
    if(!this._isInitialized)
        return;

    var playLists = player.getByClassName('PlayList');
    for(var i = 0, count = playLists.length; i<count; i++)
    {
        var playList = playLists[i];
        var index = playList.get('selectedIndex');
        if(index != -1)
        {
            var item = playList.get('items')[index];
            var itemPlayer = item.get('player');
            if(itemPlayer && itemPlayer.pause)
            {
                this._playersPlayingTmp.push(itemPlayer);
                itemPlayer.pause();
            }
        }
    }

    this._player.getById('pauseGlobalAudios')();
};

TourScript.prototype.resumeTour = function() {
    this._isPaused = false;
    if(!this._isInitialized)
        return;

    while(this._playersPlayingTmp.length)
    {
        var viewer = this.playersPlayingTmp.pop();
        viewer.play();
    }

    this._player.getById('resumeGlobalAudios')();
};

TourScript.prototype.setMediaByIndex = function(index) {
    var rootPlayer = this._getRootPlayer();
    if(rootPlayer !== undefined) {
        return rootPlayer.setMainMediaByIndex(index);
    }
};

TourScript.prototype.setMediaByName = function(name) {
    var rootPlayer = this._getRootPlayer();
    if(rootPlayer !== undefined) {
        return rootPlayer.setMainMediaByName(name);
    }
};

TourScript.prototype.triggerOverlayByName = function(item, name, eventName) {
    var rootPlayer = this._getRootPlayer();
    if(rootPlayer !== undefined) {
        item.bind('begin', function(e){
            item.unbind('begin', arguments.callee, this);
            var overlay = rootPlayer.getPanoramaOverlayByName(item.get('media'), name);
            if(overlay)
                rootPlayer.triggerOverlay(overlay, eventName);
        }, rootPlayer);
    }
};

TourScript.prototype.updateDeepLink = function() {
    var rootPlayer = this._getRootPlayer();
    if(rootPlayer !== undefined) {
        var index = rootPlayer.mainPlayList.get('selectedIndex');
        location.hash = "#media=" + (index + 1);
    }
};

TourScript.prototype.isMobile = function() {
        return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(navigator.userAgent||navigator.vendor||window.opera);
};

TourScript.prototype._copyClipboard = function(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
    }
    else {
        var textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";  //avoid scrolling to bottom
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            document.execCommand('copy');
        } catch (err) {
        }

        document.body.removeChild(textArea);
    }
};

TourScript.prototype._getRootPlayer = function() {
    return this._player !== undefined ? this._player.getById('rootPlayer') : undefined;
};

TourScript.prototype._setMediaFromURL = function(params, applyDefault) {
    var queryDict = {}; params.split("&").forEach(function(item) {var k = item.split("=")[0], v = decodeURIComponent(item.split("=")[1]);queryDict[k] = v});
    var item = undefined;
    if("media" in queryDict){
        var param = queryDict["media"];
        var num = Number(param);
        item = isNaN(num) ? this.setMediaByName(param) : this.setMediaByIndex(num-1);
    }
    else if("media-index" in queryDict){
        item = this.setMediaByIndex(parseInt(queryDict["media-index"])-1);
    }
    else if("media-name" in queryDict){
        item = this.setMediaByName(queryDict["media-name"]);
    }
    if(item == undefined && applyDefault){
        item = this.setMediaByIndex(0);
    }
    if(item != undefined && "trigger-overlay-name" in queryDict){
        this.triggerOverlayByName(item, queryDict["trigger-overlay-name"], "trigger-overlay-event" in queryDict ? queryDict["trigger-overlay-event"] : "click");
    }
    return item != undefined;
};