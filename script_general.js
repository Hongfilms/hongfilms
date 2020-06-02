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
                            if (m == TDV['Quiz']['PROPERTY']['PANORAMA_INDEX'])
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
    var b = {"paddingRight":0,"data":{"name":"Player523","locales":{"ko":"locale/ko.txt"},"defaultLocale":"ko"},"scrollBarVisible":"rollOver","backgroundPreloadEnabled":true,"id":"rootPlayer","contentOpaque":false,"start":"this.init()","defaultVRPointer":"laser","paddingTop":0,"vrPolyfillScale":1,"width":"100%","paddingLeft":0,"scrollBarColor":"#000000","borderSize":0,"paddingBottom":0,"layout":"absolute","scrollBarMargin":2,"overflow":"hidden","children":["this.MainViewer"],"scrollBarWidth":10,"verticalAlign":"top","minHeight":20,"downloadEnabled":false,"definitions": [{"hfovMax":130,"hfov":360,"frames":[{"cube":{"class":"ImageResource","levels":[{"url":"media/panorama_1B3E75AF_1702_30D4_41A2_DE6DC2B71007_0/{face}/0/{row}_{column}.jpg","colCount":12,"tags":"ondemand","width":6144,"rowCount":2,"class":"TiledImageResourceLevel","height":1024},{"url":"media/panorama_1B3E75AF_1702_30D4_41A2_DE6DC2B71007_0/{face}/1/{row}_{column}.jpg","colCount":6,"tags":["ondemand","preload"],"width":3072,"rowCount":1,"class":"TiledImageResourceLevel","height":512}]},"thumbnailUrl":"media/panorama_1B3E75AF_1702_30D4_41A2_DE6DC2B71007_t.jpg","class":"CubicPanoramaFrame"}],"data":{"label":"\ucca8\uc131\ub300"},"overlays":["this.overlay_1987674D_1706_D057_41A5_9940A96128A2"],"vfov":180,"label":trans('panorama_1B3E75AF_1702_30D4_41A2_DE6DC2B71007.label'),"id":"panorama_1B3E75AF_1702_30D4_41A2_DE6DC2B71007","class":"Panorama","pitch":0,"thumbnailUrl":"media/panorama_1B3E75AF_1702_30D4_41A2_DE6DC2B71007_t.jpg","hfovMin":"150%","partial":false},{"initialPosition":{"yaw":-5.38,"class":"PanoramaCameraPosition","pitch":4.48},"class":"PanoramaCamera","id":"panorama_1B3E75AF_1702_30D4_41A2_DE6DC2B71007_camera","automaticZoomSpeed":10},{"mouseControlMode":"drag_rotation","class":"PanoramaPlayer","touchControlMode":"drag_rotation","displayPlaybackBar":true,"gyroscopeVerticalDraggingEnabled":true,"id":"MainViewerPanoramaPlayer","viewerArea":"this.MainViewer"},{"id":"MainViewer","progressBackgroundColorRatios":[0],"toolTipOpacity":1,"progressBorderSize":0,"playbackBarBackgroundColor":["#FFFFFF"],"progressBarBorderSize":0,"paddingTop":0,"progressBarBorderRadius":0,"toolTipShadowOpacity":1,"playbackBarHeadShadowBlurRadius":3,"paddingLeft":0,"subtitlesFontSize":"3vmin","playbackBarProgressOpacity":1,"borderSize":0,"paddingBottom":0,"playbackBarHeadBorderRadius":0,"playbackBarHeadBorderColor":"#000000","subtitlesBackgroundOpacity":0.2,"toolTipShadowSpread":0,"subtitlesPaddingBottom":5,"playbackBarHeight":10,"subtitlesBorderColor":"#FFFFFF","doubleClickAction":"toggle_fullscreen","progressBorderRadius":0,"width":"100%","playbackBarHeadBackgroundColorDirection":"vertical","subtitlesTextShadowOpacity":1,"playbackBarHeadWidth":6,"subtitlesBorderSize":0,"shadow":false,"progressRight":0,"playbackBarBorderSize":0,"toolTipTextShadowOpacity":0,"toolTipTextShadowColor":"#000000","borderRadius":0,"playbackBarProgressBorderSize":0,"toolTipHorizontalAlign":"center","playbackBarBackgroundColorDirection":"vertical","height":"100%","progressBarOpacity":1,"firstTransitionDuration":0,"playbackBarHeadHeight":15,"playbackBarRight":0,"subtitlesTextDecoration":"none","playbackBarLeft":0,"subtitlesFontFamily":"Arial","playbackBarProgressBorderRadius":0,"transitionDuration":500,"displayTooltipInTouchScreens":true,"progressBarBackgroundColorDirection":"vertical","subtitlesTextShadowBlurRadius":0,"subtitlesFontColor":"#FFFFFF","playbackBarHeadBackgroundColorRatios":[0,1],"progressBarBorderColor":"#000000","progressBackgroundColor":["#FFFFFF"],"playbackBarBackgroundOpacity":1,"subtitlesFontWeight":"normal","toolTipFontColor":"#606060","playbackBarProgressBackgroundColor":["#3399FF"],"subtitlesPaddingTop":5,"playbackBarHeadShadowVerticalLength":0,"playbackBarHeadShadowColor":"#000000","progressBarBackgroundColorRatios":[0],"playbackBarHeadBorderSize":0,"progressBackgroundColorDirection":"vertical","subtitlesShadow":false,"paddingRight":0,"subtitlesTextShadowHorizontalLength":1,"progressBottom":0,"toolTipShadowHorizontalLength":0,"progressOpacity":1,"toolTipDisplayTime":600,"progressLeft":0,"toolTipFontStyle":"normal","playbackBarHeadShadow":true,"subtitlesTextShadowVerticalLength":1,"toolTipBorderColor":"#767676","toolTipShadowColor":"#333333","playbackBarHeadShadowOpacity":0.7,"toolTipBackgroundColor":"#F6F6F6","toolTipShadowVerticalLength":0,"subtitlesPaddingLeft":5,"subtitlesOpacity":1,"toolTipTextShadowBlurRadius":3,"subtitlesBottom":50,"vrPointerSelectionColor":"#FF6600","toolTipBorderSize":1,"playbackBarHeadOpacity":1,"subtitlesGap":0,"toolTipFontFamily":"Arial","subtitlesPaddingRight":5,"toolTipPaddingTop":4,"vrPointerSelectionTime":2000,"minHeight":50,"progressBackgroundOpacity":1,"minWidth":100,"playbackBarHeadShadowHorizontalLength":0,"playbackBarOpacity":1,"toolTipShadowBlurRadius":3,"vrPointerColor":"#FFFFFF","playbackBarProgressBackgroundColorRatios":[0],"subtitlesBackgroundColor":"#000000","playbackBarHeadBackgroundColor":["#111111","#666666"],"propagateClick":false,"progressBorderColor":"#000000","progressBarBackgroundColor":["#3399FF"],"subtitlesHorizontalAlign":"center","playbackBarBorderRadius":0,"playbackBarBorderColor":"#FFFFFF","toolTipBorderRadius":3,"toolTipPaddingBottom":4,"playbackBarBottom":5,"class":"ViewerArea","playbackBarProgressBorderColor":"#000000","playbackBarProgressBackgroundColorDirection":"vertical","transitionMode":"blending","toolTipFontSize":"1.11vmin","subtitlesVerticalAlign":"bottom","toolTipFontWeight":"normal","toolTipPaddingLeft":6,"subtitlesTop":0,"data":{"name":"Main Viewer"},"progressHeight":10,"toolTipPaddingRight":6,"subtitlesTextShadowColor":"#000000"},{"items":[{"media":"this.panorama_1B3E75AF_1702_30D4_41A2_DE6DC2B71007","end":"this.trigger('tourEnded')","class":"PanoramaPlayListItem","camera":"this.panorama_1B3E75AF_1702_30D4_41A2_DE6DC2B71007_camera","player":"this.MainViewerPanoramaPlayer"}],"id":"mainPlayList","class":"PlayList"},{"bleaching":0.7,"class":"LensFlarePanoramaOverlay","id":"overlay_1987674D_1706_D057_41A5_9940A96128A2","yaw":134.85,"bleachingDistance":0.4,"pitch":40.85}],"minWidth":20,"shadow":false,"height":"100%","scrollBarOpacity":0.5,"propagateClick":false,"borderRadius":0,"gap":10,"class":"Player","desktopMipmappingEnabled":false,"toolTipHorizontalAlign":"center","mouseWheelEnabled":true,"horizontalAlign":"left","mobileMipmappingEnabled":false,"mediaActivationMode":"window","scripts":{"loadFromCurrentMediaPlayList":TDV.Tour.Script.loadFromCurrentMediaPlayList,"existsKey":TDV.Tour.Script.existsKey,"getPlayListItems":TDV.Tour.Script.getPlayListItems,"showPopupImage":TDV.Tour.Script.showPopupImage,"stopGlobalAudio":TDV.Tour.Script.stopGlobalAudio,"showWindow":TDV.Tour.Script.showWindow,"historyGoBack":TDV.Tour.Script.historyGoBack,"getOverlays":TDV.Tour.Script.getOverlays,"triggerOverlay":TDV.Tour.Script.triggerOverlay,"openLink":TDV.Tour.Script.openLink,"showPopupMedia":TDV.Tour.Script.showPopupMedia,"getFirstPlayListWithMedia":TDV.Tour.Script.getFirstPlayListWithMedia,"setStartTimeVideo":TDV.Tour.Script.setStartTimeVideo,"getCurrentPlayerWithMedia":TDV.Tour.Script.getCurrentPlayerWithMedia,"getMediaWidth":TDV.Tour.Script.getMediaWidth,"playGlobalAudio":TDV.Tour.Script.playGlobalAudio,"setMediaBehaviour":TDV.Tour.Script.setMediaBehaviour,"initQuiz":TDV.Tour.Script.initQuiz,"pauseGlobalAudio":TDV.Tour.Script.pauseGlobalAudio,"getActiveMediaWithViewer":TDV.Tour.Script.getActiveMediaWithViewer,"quizSetItemFound":TDV.Tour.Script.quizSetItemFound,"startPanoramaWithCamera":TDV.Tour.Script.startPanoramaWithCamera,"setEndToItemIndex":TDV.Tour.Script.setEndToItemIndex,"updateVideoCues":TDV.Tour.Script.updateVideoCues,"stopGlobalAudios":TDV.Tour.Script.stopGlobalAudios,"setMapLocation":TDV.Tour.Script.setMapLocation,"unregisterKey":TDV.Tour.Script.unregisterKey,"autotriggerAtStart":TDV.Tour.Script.autotriggerAtStart,"historyGoForward":TDV.Tour.Script.historyGoForward,"quizShowQuestion":TDV.Tour.Script.quizShowQuestion,"assignObjRecursively":TDV.Tour.Script.assignObjRecursively,"getMediaHeight":TDV.Tour.Script.getMediaHeight,"setMainMediaByName":TDV.Tour.Script.setMainMediaByName,"playGlobalAudioWhilePlay":TDV.Tour.Script.playGlobalAudioWhilePlay,"getPixels":TDV.Tour.Script.getPixels,"registerKey":TDV.Tour.Script.registerKey,"getMediaFromPlayer":TDV.Tour.Script.getMediaFromPlayer,"pauseGlobalAudiosWhilePlayItem":TDV.Tour.Script.pauseGlobalAudiosWhilePlayItem,"init":TDV.Tour.Script.init,"mixObject":TDV.Tour.Script.mixObject,"changePlayListWithSameSpot":TDV.Tour.Script.changePlayListWithSameSpot,"setLocale":TDV.Tour.Script.setLocale,"initGA":TDV.Tour.Script.initGA,"getPlayListItemByMedia":TDV.Tour.Script.getPlayListItemByMedia,"keepCompVisible":TDV.Tour.Script.keepCompVisible,"getComponentByName":TDV.Tour.Script.getComponentByName,"syncPlaylists":TDV.Tour.Script.syncPlaylists,"pauseCurrentPlayers":TDV.Tour.Script.pauseCurrentPlayers,"getGlobalAudio":TDV.Tour.Script.getGlobalAudio,"quizShowScore":TDV.Tour.Script.quizShowScore,"getActivePlayerWithViewer":TDV.Tour.Script.getActivePlayerWithViewer,"setValue":TDV.Tour.Script.setValue,"resumeGlobalAudios":TDV.Tour.Script.resumeGlobalAudios,"showComponentsWhileMouseOver":TDV.Tour.Script.showComponentsWhileMouseOver,"setPanoramaCameraWithSpot":TDV.Tour.Script.setPanoramaCameraWithSpot,"getPanoramaOverlayByName":TDV.Tour.Script.getPanoramaOverlayByName,"getCurrentPlayers":TDV.Tour.Script.getCurrentPlayers,"playAudioList":TDV.Tour.Script.playAudioList,"quizStart":TDV.Tour.Script.quizStart,"resumePlayers":TDV.Tour.Script.resumePlayers,"updateMediaLabelFromPlayList":TDV.Tour.Script.updateMediaLabelFromPlayList,"shareSocial":TDV.Tour.Script.shareSocial,"showPopupPanoramaOverlay":TDV.Tour.Script.showPopupPanoramaOverlay,"fixTogglePlayPauseButton":TDV.Tour.Script.fixTogglePlayPauseButton,"setComponentVisibility":TDV.Tour.Script.setComponentVisibility,"quizFinish":TDV.Tour.Script.quizFinish,"translate":TDV.Tour.Script.translate,"quizShowTimeout":TDV.Tour.Script.quizShowTimeout,"_getPlayListsWithViewer":TDV.Tour.Script._getPlayListsWithViewer,"executeFunctionWhenChange":TDV.Tour.Script.executeFunctionWhenChange,"changeBackgroundWhilePlay":TDV.Tour.Script.changeBackgroundWhilePlay,"showPopupPanoramaVideoOverlay":TDV.Tour.Script.showPopupPanoramaVideoOverlay,"getMediaByName":TDV.Tour.Script.getMediaByName,"setMainMediaByIndex":TDV.Tour.Script.setMainMediaByIndex,"setCameraSameSpotAsMedia":TDV.Tour.Script.setCameraSameSpotAsMedia,"copyObjRecursively":TDV.Tour.Script.copyObjRecursively,"visibleComponentsIfPlayerFlagEnabled":TDV.Tour.Script.visibleComponentsIfPlayerFlagEnabled,"isCardboardViewMode":TDV.Tour.Script.isCardboardViewMode,"setPanoramaCameraWithCurrentSpot":TDV.Tour.Script.setPanoramaCameraWithCurrentSpot,"stopAndGoCamera":TDV.Tour.Script.stopAndGoCamera,"cloneCamera":TDV.Tour.Script.cloneCamera,"setStartTimeVideoSync":TDV.Tour.Script.setStartTimeVideoSync,"setOverlayBehaviour":TDV.Tour.Script.setOverlayBehaviour,"getPlayListsWithMedia":TDV.Tour.Script.getPlayListsWithMedia,"getKey":TDV.Tour.Script.getKey,"pauseGlobalAudios":TDV.Tour.Script.pauseGlobalAudios,"_initItemWithComps":TDV.Tour.Script._initItemWithComps}};
    if (b['data'] == undefined)
        b['data'] = {};
    b['data']['translateObjs'] = a;
    b['data']['history'] = {};
    b['scripts']['createQuizConfig'] = createQuizConfig;
    TDV['PlayerAPI']['defineScript'](b);
}());
//# sourceMappingURL=http://localhost:9000/script_device_v2020.1.5.js.map
//Generated with v2020.2.0, Tue Jun 2 2020