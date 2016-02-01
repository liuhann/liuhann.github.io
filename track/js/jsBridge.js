    var jsBridge;
    window.onerror = function (err) {
        console.log('window.onerror: ' + err);
    }

    function connectWebViewJavascriptBridge(callback) {
        if (window.WebViewJavascriptBridge) {
            callback(WebViewJavascriptBridge)
        } else {
            document.addEventListener('WebViewJavascriptBridgeReady', function () {
                callback(WebViewJavascriptBridge)
            }, false)
        }
    }

    connectWebViewJavascriptBridge(function (bridge) {
        var uniqueId = 1;

        function log(message, data) {
            console.log(message + ': ' + JSON.stringify(data));
        }
        bridge.init(function (message, responseCallback) {
            log('JS got a message', message);
            if(message instanceof Array){
                showOrHideBtn(message);
            }else{
                initRecordPage(message);
            }
            var data = {
                'Javascript Responds': 'I Got It'
            }
            log('JS responding with', data)
            responseCallback(data)
        })
        jsBridge = bridge;
    })
