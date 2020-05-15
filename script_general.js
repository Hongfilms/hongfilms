(function () {
    var a = {};
    function trans(c, d) {
        var e = arguments['length'] === 0x1 ? [arguments[0x0]] : Array['apply'](null, arguments);
        a[e[0x0]] = e;
        return '';
    }
    function regTextVar(c, d) {
        var e = ![];
        d = d['toLowerCase']();
        var f = function () {
            var o = this['get']('data');
            o['updateText'](o['translateObjs'][c]);
        };
        var g = function (o) {
            var p = o['data']['nextSelectedIndex'];
            if (p >= 0x0) {
                var q = o['source']['get']('items')[p];
                var r = function () {
                    q['unbind']('begin', r, this);
                    f['call'](this);
                };
                q['bind']('begin', r, this);
            } else
                f['call'](this);
        };
        var h = function (o) {
            return function (p) {
                if (o in p) {
                    f['call'](this);
                }
            }['bind'](this);
        };
        var i = function (o, p) {
            return function (q, r) {
                if (o == q && p in r) {
                    f['call'](this);
                }
            }['bind'](this);
        };
        var j = function (o, p, q) {
            for (var r = 0x0; r < o['length']; ++r) {
                var s = o[r];
                var t = s['get']('selectedIndex');
                if (t >= 0x0) {
                    var u = p['split']('.');
                    var v = s['get']('items')[t];
                    if (q !== undefined && !q['call'](this, v))
                        continue;
                    for (var w = 0x0; w < u['length']; ++w) {
                        if (v == undefined)
                            return '';
                        v = 'get' in v ? v['get'](u[w]) : v[u[w]];
                    }
                    return v;
                }
            }
            return '';
        };
        var k = function (o) {
            var p = o['get']('player');
            return p !== undefined && p['get']('viewerArea') == this['MainViewer'];
        };
        switch (d) {
        case 'title':
        case 'subtitle':
            var m = function () {
                switch (d) {
                case 'title':
                    return 'media.label';
                case 'subtitle':
                    return 'media.data.subtitle';
                }
            }();
            if (m) {
                return function () {
                    var o = this['_getPlayListsWithViewer'](this['MainViewer']);
                    if (!e) {
                        for (var p = 0x0; p < o['length']; ++p) {
                            o[p]['bind']('changing', g, this);
                        }
                        e = !![];
                    }
                    return j['call'](this, o, m, k);
                };
            }
            break;
        default:
            if (d['startsWith']('quiz.') && 'Quiz' in TDV) {
                var n = undefined;
                var m = function () {
                    switch (d) {
                    case 'quiz.questions.answered':
                        return TDV['Quiz']['PROPERTY']['QUESTIONS_ANSWERED'];
                    case 'quiz.question.count':
                        return TDV['Quiz']['PROPERTY']['QUESTION_COUNT'];
                    case 'quiz.items.found':
                        return TDV['Quiz']['PROPERTY']['ITEMS_FOUND'];
                    case 'quiz.item.count':
                        return TDV['Quiz']['PROPERTY']['ITEM_COUNT'];
                    case 'quiz.score':
                        return TDV['Quiz']['PROPERTY']['SCORE'];
                    case 'quiz.score.total':
                        return TDV['Quiz']['PROPERTY']['TOTAL_SCORE'];
                    case 'quiz.time.remaining':
                        return TDV['Quiz']['PROPERTY']['REMAINING_TIME'];
                    case 'quiz.time.elapsed':
                        return TDV['Quiz']['PROPERTY']['ELAPSED_TIME'];
                    case 'quiz.time.limit':
                        return TDV['Quiz']['PROPERTY']['TIME_LIMIT'];
                    case 'quiz.media.items.found':
                        return TDV['Quiz']['PROPERTY']['PANORAMA_ITEMS_FOUND'];
                    case 'quiz.media.item.count':
                        return TDV['Quiz']['PROPERTY']['PANORAMA_ITEM_COUNT'];
                    case 'quiz.media.score':
                        return TDV['Quiz']['PROPERTY']['PANORAMA_SCORE'];
                    case 'quiz.media.score.total':
                        return TDV['Quiz']['PROPERTY']['PANORAMA_TOTAL_SCORE'];
                    case 'quiz.media.index':
                        return TDV['Quiz']['PROPERTY']['PANORAMA_INDEX'];
                    case 'quiz.media.count':
                        return TDV['Quiz']['PROPERTY']['PANORAMA_COUNT'];
                    case 'quiz.media.visited':
                        return TDV['Quiz']['PROPERTY']['PANORAMA_VISITED_COUNT'];
                    default:
                        var o = /quiz\.([\w_]+)\.(.+)/['exec'](d);
                        if (o !== undefined) {
                            n = o[0x1];
                            switch ('quiz.' + o[0x2]) {
                            case 'quiz.score':
                                return TDV['Quiz']['OBJECTIVE_PROPERTY']['SCORE'];
                            case 'quiz.score.total':
                                return TDV['Quiz']['OBJECTIVE_PROPERTY']['TOTAL_SCORE'];
                            case 'quiz.media.items.found':
                                return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_ITEMS_FOUND'];
                            case 'quiz.media.item.count':
                                return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_ITEM_COUNT'];
                            case 'quiz.questions.answered':
                                return TDV['Quiz']['OBJECTIVE_PROPERTY']['QUESTIONS_ANSWERED'];
                            case 'quiz.question.count':
                                return TDV['Quiz']['OBJECTIVE_PROPERTY']['QUESTION_COUNT'];
                            case 'quiz.items.found':
                                return TDV['Quiz']['OBJECTIVE_PROPERTY']['ITEMS_FOUND'];
                            case 'quiz.item.count':
                                return TDV['Quiz']['OBJECTIVE_PROPERTY']['ITEM_COUNT'];
                            case 'quiz.media.score':
                                return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_SCORE'];
                            case 'quiz.media.score.total':
                                return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_TOTAL_SCORE'];
                            }
                        }
                    }
                }();
                if (m) {
                    return function () {
                        var o = this['get']('data')['quiz'];
                        if (o) {
                            if (!e) {
                                if (n != undefined)
                                    o['bind'](TDV['Quiz']['EVENT_OBJECTIVE_PROPERTIES_CHANGE'], i['call'](this, n, m), this);
                                else
                                    o['bind'](TDV['Quiz']['EVENT_PROPERTIES_CHANGE'], h['call'](this, m), this);
                                e = !![];
                            }
                            var p = n != undefined ? o['getObjective'](n, m) : o['get'](m);
                            if (m == TDV['Quiz']['PROPERTY']['PANORAMA_INDEX'] || m == TDV['Quiz']['PROPERTY']['PANORAMA_VISITED_COUNT'])
                                p += 0x1;
                            return p;
                        }
                    };
                }
            }
            break;
        }
        return '';
    }
    function createQuizConfig(player, c) {
        var d = {};
        d['player'] = player;
        d['playList'] = c;
        function e(h) {
            for (var j = 0x0; j < h['length']; ++j) {
                var k = h[j];
                if ('id' in k)
                    player[k['id']] = k;
            }
        }
        if (d['questions']) {
            e(d['questions']);
            for (var f = 0x0; f < d['questions']['length']; ++f) {
                var g = d['questions'][f];
                e(g['options']);
            }
        }
        if (d['objectives']) {
            e(d['objectives']);
        }
        if (d['califications']) {
            e(d['califications']);
        }
        if (d['score']) {
            player[d['score']['id']] = d['score'];
        }
        if (d['question']) {
            player[d['question']['id']] = d['question'];
        }
        if (d['timeout']) {
            player[d['timeout']['id']] = d['timeout'];
        }
        player['get']('data')['translateObjs'] = a;
        return d;
    }
    var b = {"borderRadius":0,"layout":"absolute","id":"rootPlayer","scrollBarColor":"#000000","propagateClick":false,"start":"this.init()","width":"100%","shadow":false,"desktopMipmappingEnabled":false,"minHeight":20,"horizontalAlign":"left","vrPolyfillScale":1,"defaultVRPointer":"laser","scrollBarMargin":2,"children":["this.MainViewer"],"backgroundPreloadEnabled":true,"scripts":{"quizShowQuestion":TDV.Tour.Script.quizShowQuestion,"getPanoramaOverlayByName":TDV.Tour.Script.getPanoramaOverlayByName,"showPopupPanoramaOverlay":TDV.Tour.Script.showPopupPanoramaOverlay,"quizFinish":TDV.Tour.Script.quizFinish,"showPopupPanoramaVideoOverlay":TDV.Tour.Script.showPopupPanoramaVideoOverlay,"getPlayListsWithMedia":TDV.Tour.Script.getPlayListsWithMedia,"copyObjRecursively":TDV.Tour.Script.copyObjRecursively,"showWindow":TDV.Tour.Script.showWindow,"getFirstPlayListWithMedia":TDV.Tour.Script.getFirstPlayListWithMedia,"openLink":TDV.Tour.Script.openLink,"_getPlayListsWithViewer":TDV.Tour.Script._getPlayListsWithViewer,"startPanoramaWithCamera":TDV.Tour.Script.startPanoramaWithCamera,"getPlayListItems":TDV.Tour.Script.getPlayListItems,"resumePlayers":TDV.Tour.Script.resumePlayers,"cloneCamera":TDV.Tour.Script.cloneCamera,"stopAndGoCamera":TDV.Tour.Script.stopAndGoCamera,"getPlayListItemByMedia":TDV.Tour.Script.getPlayListItemByMedia,"resumeGlobalAudios":TDV.Tour.Script.resumeGlobalAudios,"syncPlaylists":TDV.Tour.Script.syncPlaylists,"historyGoBack":TDV.Tour.Script.historyGoBack,"stopGlobalAudios":TDV.Tour.Script.stopGlobalAudios,"historyGoForward":TDV.Tour.Script.historyGoForward,"stopGlobalAudio":TDV.Tour.Script.stopGlobalAudio,"quizShowScore":TDV.Tour.Script.quizShowScore,"triggerOverlay":TDV.Tour.Script.triggerOverlay,"setCameraSameSpotAsMedia":TDV.Tour.Script.setCameraSameSpotAsMedia,"executeFunctionWhenChange":TDV.Tour.Script.executeFunctionWhenChange,"updateMediaLabelFromPlayList":TDV.Tour.Script.updateMediaLabelFromPlayList,"initGA":TDV.Tour.Script.initGA,"setComponentVisibility":TDV.Tour.Script.setComponentVisibility,"updateVideoCues":TDV.Tour.Script.updateVideoCues,"initQuiz":TDV.Tour.Script.initQuiz,"getPixels":TDV.Tour.Script.getPixels,"visibleComponentsIfPlayerFlagEnabled":TDV.Tour.Script.visibleComponentsIfPlayerFlagEnabled,"isCardboardViewMode":TDV.Tour.Script.isCardboardViewMode,"setEndToItemIndex":TDV.Tour.Script.setEndToItemIndex,"init":TDV.Tour.Script.init,"setMapLocation":TDV.Tour.Script.setMapLocation,"keepCompVisible":TDV.Tour.Script.keepCompVisible,"setLocale":TDV.Tour.Script.setLocale,"registerKey":TDV.Tour.Script.registerKey,"_initItemWithComps":TDV.Tour.Script._initItemWithComps,"setMainMediaByIndex":TDV.Tour.Script.setMainMediaByIndex,"getActiveMediaWithViewer":TDV.Tour.Script.getActiveMediaWithViewer,"unregisterKey":TDV.Tour.Script.unregisterKey,"loadFromCurrentMediaPlayList":TDV.Tour.Script.loadFromCurrentMediaPlayList,"setMainMediaByName":TDV.Tour.Script.setMainMediaByName,"getActivePlayerWithViewer":TDV.Tour.Script.getActivePlayerWithViewer,"existsKey":TDV.Tour.Script.existsKey,"setMediaBehaviour":TDV.Tour.Script.setMediaBehaviour,"getCurrentPlayerWithMedia":TDV.Tour.Script.getCurrentPlayerWithMedia,"setOverlayBehaviour":TDV.Tour.Script.setOverlayBehaviour,"getCurrentPlayers":TDV.Tour.Script.getCurrentPlayers,"mixObject":TDV.Tour.Script.mixObject,"setPanoramaCameraWithCurrentSpot":TDV.Tour.Script.setPanoramaCameraWithCurrentSpot,"getGlobalAudio":TDV.Tour.Script.getGlobalAudio,"pauseGlobalAudiosWhilePlayItem":TDV.Tour.Script.pauseGlobalAudiosWhilePlayItem,"setPanoramaCameraWithSpot":TDV.Tour.Script.setPanoramaCameraWithSpot,"pauseCurrentPlayers":TDV.Tour.Script.pauseCurrentPlayers,"autotriggerAtStart":TDV.Tour.Script.autotriggerAtStart,"pauseGlobalAudio":TDV.Tour.Script.pauseGlobalAudio,"quizShowTimeout":TDV.Tour.Script.quizShowTimeout,"getComponentByName":TDV.Tour.Script.getComponentByName,"quizStart":TDV.Tour.Script.quizStart,"changeBackgroundWhilePlay":TDV.Tour.Script.changeBackgroundWhilePlay,"pauseGlobalAudios":TDV.Tour.Script.pauseGlobalAudios,"getMediaByName":TDV.Tour.Script.getMediaByName,"setStartTimeVideo":TDV.Tour.Script.setStartTimeVideo,"getMediaFromPlayer":TDV.Tour.Script.getMediaFromPlayer,"fixTogglePlayPauseButton":TDV.Tour.Script.fixTogglePlayPauseButton,"playAudioList":TDV.Tour.Script.playAudioList,"setStartTimeVideoSync":TDV.Tour.Script.setStartTimeVideoSync,"getMediaWidth":TDV.Tour.Script.getMediaWidth,"playGlobalAudioWhilePlay":TDV.Tour.Script.playGlobalAudioWhilePlay,"translate":TDV.Tour.Script.translate,"shareSocial":TDV.Tour.Script.shareSocial,"getMediaHeight":TDV.Tour.Script.getMediaHeight,"setValue":TDV.Tour.Script.setValue,"showComponentsWhileMouseOver":TDV.Tour.Script.showComponentsWhileMouseOver,"getOverlays":TDV.Tour.Script.getOverlays,"changePlayListWithSameSpot":TDV.Tour.Script.changePlayListWithSameSpot,"showPopupMedia":TDV.Tour.Script.showPopupMedia,"playGlobalAudio":TDV.Tour.Script.playGlobalAudio,"getKey":TDV.Tour.Script.getKey,"quizSetItemFound":TDV.Tour.Script.quizSetItemFound,"showPopupImage":TDV.Tour.Script.showPopupImage,"assignObjRecursively":TDV.Tour.Script.assignObjRecursively},"contentOpaque":false,"mobileMipmappingEnabled":false,"paddingBottom":0,"paddingRight":0,"gap":10,"paddingLeft":0,"paddingTop":0,"class":"Player","verticalAlign":"top","scrollBarOpacity":0.5,"minWidth":20,"definitions": [{"items":[{"media":"this.panorama_1B3E75AF_1702_30D4_41A2_DE6DC2B71007","end":"this.trigger('tourEnded')","player":"this.MainViewerPanoramaPlayer","camera":"this.panorama_1B3E75AF_1702_30D4_41A2_DE6DC2B71007_camera","class":"PanoramaPlayListItem"}],"id":"mainPlayList","class":"PlayList"},{"id":"MainViewerPanoramaPlayer","gyroscopeVerticalDraggingEnabled":true,"touchControlMode":"drag_rotation","viewerArea":"this.MainViewer","class":"PanoramaPlayer","displayPlaybackBar":true,"mouseControlMode":"drag_rotation"},{"vrPointerSelectionColor":"#FF6600","playbackBarProgressBorderSize":0,"id":"MainViewer","subtitlesFontWeight":"normal","progressBarOpacity":1,"toolTipPaddingTop":4,"toolTipShadowColor":"#333333","subtitlesFontFamily":"Arial","subtitlesBackgroundOpacity":0.2,"width":"100%","playbackBarBorderRadius":0,"shadow":false,"toolTipFontColor":"#606060","minHeight":50,"doubleClickAction":"toggle_fullscreen","firstTransitionDuration":0,"vrPointerSelectionTime":2000,"toolTipShadowOpacity":1,"progressHeight":10,"toolTipBackgroundColor":"#F6F6F6","playbackBarProgressBorderColor":"#000000","playbackBarHeadBorderRadius":0,"subtitlesPaddingRight":5,"progressOpacity":1,"subtitlesTextShadowColor":"#000000","toolTipPaddingRight":6,"paddingBottom":0,"displayTooltipInTouchScreens":true,"paddingRight":0,"playbackBarHeadShadowBlurRadius":3,"playbackBarBottom":5,"toolTipFontWeight":"normal","playbackBarHeadBackgroundColorRatios":[0,1],"class":"ViewerArea","playbackBarHeadBackgroundColorDirection":"vertical","toolTipPaddingBottom":4,"progressLeft":0,"playbackBarProgressOpacity":1,"subtitlesTop":0,"subtitlesBorderSize":0,"toolTipBorderColor":"#767676","playbackBarHeadBorderColor":"#000000","playbackBarHeadShadowHorizontalLength":0,"playbackBarHeadShadowVerticalLength":0,"subtitlesTextShadowVerticalLength":1,"subtitlesTextShadowHorizontalLength":1,"playbackBarBorderSize":0,"playbackBarHeadShadowColor":"#000000","subtitlesTextDecoration":"none","progressBackgroundColorDirection":"vertical","progressBarBackgroundColorDirection":"vertical","playbackBarHeadShadowOpacity":0.7,"progressBarBorderRadius":0,"subtitlesTextShadowOpacity":1,"subtitlesBackgroundColor":"#000000","transitionDuration":500,"vrPointerColor":"#FFFFFF","playbackBarHeadShadow":true,"transitionMode":"blending","progressBorderColor":"#000000","playbackBarBorderColor":"#FFFFFF","playbackBarProgressBackgroundColorDirection":"vertical","progressBackgroundColorRatios":[0],"propagateClick":false,"playbackBarLeft":0,"toolTipShadowHorizontalLength":0,"subtitlesFontColor":"#FFFFFF","toolTipBorderSize":1,"toolTipTextShadowColor":"#000000","progressBackgroundOpacity":1,"subtitlesPaddingLeft":5,"height":"100%","playbackBarHeadBackgroundColor":["#111111","#666666"],"playbackBarBackgroundColor":["#FFFFFF"],"toolTipFontFamily":"Arial","playbackBarHeadWidth":6,"progressBottom":0,"subtitlesFontSize":"3vmin","playbackBarHeadHeight":15,"subtitlesShadow":false,"progressRight":0,"playbackBarProgressBackgroundColor":["#3399FF"],"progressBarBorderColor":"#000000","progressBorderSize":0,"progressBarBorderSize":0,"playbackBarBackgroundColorDirection":"vertical","progressBarBackgroundColorRatios":[0],"playbackBarProgressBorderRadius":0,"playbackBarHeadOpacity":1,"subtitlesHorizontalAlign":"center","toolTipFontStyle":"normal","subtitlesBorderColor":"#FFFFFF","subtitlesVerticalAlign":"bottom","subtitlesOpacity":1,"paddingLeft":0,"toolTipPaddingLeft":6,"paddingTop":0,"toolTipShadowBlurRadius":3,"playbackBarOpacity":1,"minWidth":100,"subtitlesBottom":50,"playbackBarHeight":10,"toolTipShadowSpread":0,"toolTipTextShadowBlurRadius":3,"subtitlesTextShadowBlurRadius":0,"playbackBarRight":0,"progressBarBackgroundColor":["#3399FF"],"toolTipOpacity":1,"toolTipBorderRadius":3,"toolTipTextShadowOpacity":0,"progressBorderRadius":0,"progressBackgroundColor":["#FFFFFF"],"playbackBarProgressBackgroundColorRatios":[0],"playbackBarBackgroundOpacity":1,"toolTipDisplayTime":600,"playbackBarHeadBorderSize":0,"toolTipShadowVerticalLength":0,"data":{"name":"Main Viewer"},"toolTipFontSize":"1.11vmin","borderSize":0,"subtitlesPaddingBottom":5,"subtitlesGap":0,"subtitlesPaddingTop":5,"borderRadius":0},{"automaticZoomSpeed":10,"id":"panorama_1B3E75AF_1702_30D4_41A2_DE6DC2B71007_camera","initialPosition":{"yaw":-5.38,"class":"PanoramaCameraPosition","pitch":4.48},"class":"PanoramaCamera"},{"partial":false,"class":"Panorama","vfov":180,"thumbnailUrl":"media/panorama_1B3E75AF_1702_30D4_41A2_DE6DC2B71007_t.jpg","label":trans('panorama_1B3E75AF_1702_30D4_41A2_DE6DC2B71007.label'),"hfov":360,"id":"panorama_1B3E75AF_1702_30D4_41A2_DE6DC2B71007","data":{"label":"\ucca8\uc131\ub300"},"frames":[{"thumbnailUrl":"media/panorama_1B3E75AF_1702_30D4_41A2_DE6DC2B71007_t.jpg","class":"CubicPanoramaFrame","cube":{"levels":[{"url":"media/panorama_1B3E75AF_1702_30D4_41A2_DE6DC2B71007_0/{face}/0/{row}_{column}.jpg","tags":"ondemand","colCount":12,"height":1024,"rowCount":2,"width":6144,"class":"TiledImageResourceLevel"},{"url":"media/panorama_1B3E75AF_1702_30D4_41A2_DE6DC2B71007_0/{face}/1/{row}_{column}.jpg","tags":["ondemand","preload"],"colCount":6,"height":512,"rowCount":1,"width":3072,"class":"TiledImageResourceLevel"}],"class":"ImageResource"}}],"hfovMin":"150%","pitch":0,"hfovMax":130,"overlays":["this.overlay_1987674D_1706_D057_41A5_9940A96128A2"]},{"id":"overlay_1987674D_1706_D057_41A5_9940A96128A2","pitch":40.85,"bleachingDistance":0.4,"bleaching":0.7,"yaw":134.85,"class":"LensFlarePanoramaOverlay"}],"overflow":"hidden","downloadEnabled":false,"scrollBarWidth":10,"mouseWheelEnabled":true,"scrollBarVisible":"rollOver","borderSize":0,"mediaActivationMode":"window","height":"100%","data":{"name":"Player523","locales":{"ko":"locale/ko.txt"},"defaultLocale":"ko"}};
    if (b['data'] == undefined)
        b['data'] = {};
    b['data']['translateObjs'] = a;
    b['data']['history'] = {};
    b['scripts']['createQuizConfig'] = createQuizConfig;
    TDV['PlayerAPI']['defineScript'](b);
}());
//# sourceMappingURL=http://localhost:9000/script_device_v2020.1.1.js.map
//Generated with v2020.1.1, Fri May 15 2020