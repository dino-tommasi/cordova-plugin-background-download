var BackgroundDownloader = require('./BackgroundDownloader');

/**
 * Provides an advanced file transfer functionality that persists beyond app termination and 
 * runs in the background. Background transfer doesn't support concurrent downloads of the same uri.
 */
var BackgroundTransfer = {
    BackgroundDownloader: BackgroundDownloader
};

module.exports = BackgroundTransfer;