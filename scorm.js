(function ()
{
    function findAPI(win)
    {
        var depth = 0,
            depthLimit = 500;
        while ((!win.API) && (!win.API_1484_11) && win.parent && (win.parent != win) && (depth <= depthLimit))
        {
            depth++;
            win = win.parent;
        }
        return win.API_1484_11 || win.API || null;
    }
    function getAPI(win)
    {
        var API = findAPI(win);
        if(!API && win.parent && (win.parent != win))
            API = findAPI(win.parent);
        if (!API && win.top && win.top.opener)
            API = findAPI(win.top.opener);
        if (!API && win.top && win.top.opener && win.top.opener.document)
            API = findAPI(win.top.opener.document);
        return API;
    }
    function getCall(lms, name)
    {
        if (lms && lms[name])
            return lms[name].bind(lms);
        return function() {};
    }
    function initAPI()
    {
        var SCORM = {
            initialize: getCall(api, 'LMSInitialize'),
            getValue: getCall(api, 'LMSGetValue'),
            setValue: getCall(api, 'LMSSetValue'),
            commit: getCall(api, 'LMSCommit'),
            terminate: getCall(api, 'LMSFinish'),
            setLessonComplete: function(score)
            {
                this.setValue('cmi.core.score.raw', score === undefined? 100 : score);
                this.setValue('cmi.core.lesson_status', 'completed');
                this.commit('');
            }
        };

        SCORM.initialize('');

        window.addEventListener('unload', function()
        {
            SCORM.terminate('');
        });

        window.SCORM = SCORM;
    }
    function tryGetAPI()
    {
        api = getAPI(window);
        if(api)
            initAPI();
        else if(--maxTries > 0)
            setTimeout(tryGetAPI, 1000);
    }
    var api = null;
    var maxTries = 10;
    tryGetAPI();
})();