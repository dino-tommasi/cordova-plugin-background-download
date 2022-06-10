var DownloadOperation = require('./DownloadOperation');

/**
 * Initializes a new instance of BackgroundDownloader object.
 * Used to configure downloads prior to the actual creation of the download operation using CreateDownload.
 * 
 * @param {string} uriMatcher The regexp to compare location of the resources with already downloading ones.
 */
var BackgroundDownloader = function(uriMatcher) {
    this.uriMatcher = uriMatcher;
};

/**
 * Initializes a DownloadOperation object that contains the specified Uri and the file that the response is written to.
 *
 * @param {String} downloadUri The location of the resource.
 * @param {File} resultFile The file that the response will be written to.
 * @param {String} serverUrl Domain of the connection. Required for connections with authorization
 * @param {Boolean} showNotification
 */
BackgroundDownloader.prototype.createDownload = function(downloadUri, resultFile, serverUrl, showNotification = false) {
    return new DownloadOperation(downloadUri, resultFile, serverUrl, this.uriMatcher, showNotification);
};

module.exports = BackgroundDownloader;