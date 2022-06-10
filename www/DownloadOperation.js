var exec = require('cordova/exec'),
    Promise = require('./Promise');

/**
 * Performs an asynchronous download operation in the background.
 *
 * @param {string} downloadUri The location of the resource.
 * @param {File} resultFile The file that the response will be written to.
 * @param {string} serverUrl Domain of the connection. Required for connections with authorization
 * @param {string} uriMatcher The regexp to compare location of the resources with already downloading ones.
 * @param showNotification
 */
var DownloadOperation = function (downloadUri, resultFile, serverUrl, uriMatcher, showNotification) {

    if (downloadUri == null || resultFile == null) {
        throw new Error("missing or invalid argument");
    }
    
    this.downloadUri = downloadUri;
    this.resultFile = resultFile;
    this.serverUrl = serverUrl;
    this.uriMatcher = uriMatcher;
    this.showNotification = showNotification || false;
};

/**
 * Starts an asynchronous download operation.
 */
DownloadOperation.prototype.startAsync = function() {

    var deferral = new Promise.Deferral(),
        me = this,
        successCallback = function(result) {

            // success callback is used to both report operation progress and 
            // as operation completeness handler
            
            if (result && typeof result.progress != 'undefined') {
                deferral.notify(result.progress);
            } else {
                deferral.resolve(result);
            }
        },
        errorCallback = function(err) {
            deferral.reject(err);
        };

    exec(successCallback, errorCallback, "BackgroundDownload", "startAsync", [this.downloadUri, this.resultFile.toURL(), this.serverUrl, this.uriMatcher, this.showNotification]);

    // custom mechanism to trigger stop when user cancels pending operation
    deferral.promise.onCancelled = function () {
        me.stop();
    };

    return deferral.promise;
};

/**
 * Stops a download operation.
 */
DownloadOperation.prototype.stop = function() {
    // TODO return promise
    exec(null, null, "BackgroundDownload", "stop", [this.downloadUri]);

};

module.exports = DownloadOperation;