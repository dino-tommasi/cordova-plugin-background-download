#import <Foundation/Foundation.h>
#import <Cordova/CDVPlugin.h>

// TODO This means that you can start a download of a large image or file, close the app and
// the download wilcontinue until it completes.
@interface BackgroundDownload : CDVPlugin <NSURLSessionDownloadDelegate>

@property (nonatomic) NSURLSession *session;

- (void)startAsync:(CDVInvokedUrlCommand*)command;
- (void)stop:(CDVInvokedUrlCommand*)command;

@end

@interface Download : NSObject

@property NSString *error;
@property NSString *filePath;
@property NSString *uriString;
@property NSString *uriMatcher;
@property NSString *callbackId;
@property (nonatomic) NSURLSessionDownloadTask *task;

- (id) initWithPath:(NSString *)filePath downloadUri:(NSString *)downloadUri uriMatcher:(NSString *)uriMatcher callbackId:(NSString *)callbackId task:(NSURLSessionDownloadTask *)task;

@end
