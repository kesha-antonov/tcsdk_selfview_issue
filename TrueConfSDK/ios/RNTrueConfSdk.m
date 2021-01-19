
#import "RNTrueConfSdk.h"
#import "DialogViewController.h"

static NSString * const CONNECTED = @"connected";
static NSString * const SERVER_NAME = @"serverName";
static NSString * const SERVER_PORT = @"serverPort";
static NSString * const IS_LOGGED_IN = @"loggedIn";
static NSString * const USER_ID = @"userID";
static NSString * const USER_NAME = @"userName";
static NSString * const USER_STATUS = @"state";
static NSString * const FROM_USER_ID = @"fromUserID";
static NSString * const FROM_USER_NAME = @"fromUserName";
static NSString * const MESSAGE = @"message";
static NSString * const TO_USER_ID = @"toUserID";
static NSString * const ON_SERVER_STATUS = @"onServerStatus";
static NSString * const ON_LOGIN = @"onLogin";
static NSString * const ON_LOGOUT = @"onLogout";
static NSString * const ON_SERVER_STATE_CHANGED = @"onServerStateChanged";
static NSString * const ON_CONFERENCE_START = @"onConferenceStart";
static NSString * const ON_CONFERENCE_END = @"onConferenceEnd";
static NSString * const ON_INVITE = @"onInvite";
static NSString * const ON_RECORD_REQUEST = @"onRecordRequest";
static NSString * const ON_ACCEPT = @"onAccept";
static NSString * const ON_REJECT = @"onReject";
static NSString * const ON_REJECT_TIMEOUT = @"onRejectTimeout";
static NSString * const ON_USER_STATUS_UPDATE = @"onUserStatusUpdate";
static NSString * const ON_CHAT_MESSAGE_RECEIVED = @"onChatMessageReceived";
static NSString* const ON_EXTRA_BUTTON_PRESSED = @"onExtraButtonPressed";

@interface RNTrueConfSdk()

@property (nonatomic) DialogViewController* alertController;
@property (strong, nonatomic) TCSDK* tcsdk;

@end

@implementation RNTrueConfSdk
{
    BOOL hasListener;
}

RCT_EXPORT_MODULE();

-(dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

-(void)startObserving
{
    hasListener = YES;
}

-(void)stopObserving
{
    hasListener = NO;
}

RCT_EXPORT_METHOD(start:(NSString *) serverList)
{
    if(!self.tcsdk) {
        UIViewController* rootController = [UIApplication sharedApplication].delegate.window.rootViewController;
        self.tcsdk = [[TCSDK alloc] initWithViewController:rootController forServer:@"ru10.trueconf.net" confCustomControlsImages:nil];
        [self initEventListeners];
    }
    if(serverList && [[serverList stringByTrimmingCharactersInSet: [NSCharacterSet whitespaceCharacterSet]] length] != 0) {
        [self.tcsdk startWithServersList:serverList];
    } else {
        [self.tcsdk start];
    }
}

- (NSArray<NSString *> *)supportedEvents
{
    return @[ON_SERVER_STATUS,
             ON_LOGIN,
             ON_LOGOUT,
             ON_SERVER_STATE_CHANGED,
             ON_CONFERENCE_START,
             ON_CONFERENCE_END,
             ON_INVITE,
             ON_ACCEPT,
             ON_REJECT,
             ON_REJECT_TIMEOUT,
             ON_USER_STATUS_UPDATE,
             ON_CHAT_MESSAGE_RECEIVED,
             ON_EXTRA_BUTTON_PRESSED];
}

- (void)initEventListeners
{
    [self.tcsdk onLogin:^(BOOL loggedIn, NSString *userID) {
        dispatch_async(dispatch_get_main_queue(), ^{
            if(hasListener) {
            [self sendEventWithName:ON_LOGIN body:@{
                                                    IS_LOGGED_IN: @(loggedIn),
                                                    USER_ID: userID
                                                    }];
            }
        });
    }];
    
    [self.tcsdk onLogout:^{
        dispatch_async(dispatch_get_main_queue(), ^{
            if(hasListener) {
            [self sendEventWithName:ON_LOGOUT body:nil];
            }
        });
    }];
    
    [self.tcsdk onStateChanged:^{
        dispatch_async(dispatch_get_main_queue(), ^{
            if(hasListener) {
            [self sendEventWithName:ON_SERVER_STATE_CHANGED body:nil];
            }
        });
    }];
    [self.tcsdk onServerStatus:^(BOOL connected, NSString *serverName, NSInteger serverPort) {
        dispatch_async(dispatch_get_main_queue(), ^{
            if(hasListener) {
            [self sendEventWithName:ON_SERVER_STATUS body:@{
                                                            CONNECTED: @(connected),
                                                            SERVER_NAME: serverName,
                                                            SERVER_PORT: @(serverPort)
                                                            }];
            }
        });
    }];
    [self.tcsdk onConferenceStart:^{
        dispatch_async(dispatch_get_main_queue(), ^{
            if(hasListener) {
            [self sendEventWithName:ON_CONFERENCE_START body:nil];
            }
        });
    }];
    [self.tcsdk onConferenceEnd:^{
        dispatch_async(dispatch_get_main_queue(), ^{
            if(hasListener) {
            [self sendEventWithName:ON_CONFERENCE_END body:nil];
            }
        });
    }];
    [self.tcsdk onInvite:^(NSString *userID, NSString *userName) {
        dispatch_async(dispatch_get_main_queue(), ^{
            if(hasListener) {
            [self sendEventWithName:ON_INVITE body:@{
                                                     USER_ID: userID,
                                                     USER_NAME: userName
                                                     }];
            }
        });
    }];
    [self.tcsdk onRecordRequest:^(NSString *userID, NSString *userName) {
        dispatch_async(dispatch_get_main_queue(), ^{
            if(hasListener) {
            [self sendEventWithName:ON_RECORD_REQUEST body:@{
                                                     USER_ID: userID,
                                                     USER_NAME: userName
                                                     }];
            }
        });
    }];
    [self.tcsdk onAccept:^(NSString *userID, NSString *userName) {
        dispatch_async(dispatch_get_main_queue(), ^{
            if(hasListener) {
            [self sendEventWithName:ON_ACCEPT body:@{
                                                     USER_ID: userID,
                                                     USER_NAME: userName
                                                     }];
            }
        });
    }];
    [self.tcsdk onReject:^(NSString *userID, NSString *userName) {
        dispatch_async(dispatch_get_main_queue(), ^{
            if(hasListener) {
            [self sendEventWithName:ON_REJECT body:@{
                                                     USER_ID: userID,
                                                     USER_NAME: userName
                                                     }];
            }
        });
    }];
    [self.tcsdk onRejectTimeOut:^(NSString *userID, NSString *userName) {
        dispatch_async(dispatch_get_main_queue(), ^{
            if(hasListener) {
            [self sendEventWithName:ON_REJECT_TIMEOUT body:@{
                                                             USER_ID: userID,
                                                             USER_NAME: userName
                                                             }];
            }
        });
    }];
    [self.tcsdk onUserStatusUpdate:^(NSString *userID, TCSDKUserPresStatus state) {
        dispatch_async(dispatch_get_main_queue(), ^{
            if(hasListener) {
            [self sendEventWithName:ON_USER_STATUS_UPDATE body:@{
                                                                 USER_ID: userID,
                                                                 USER_STATUS: @(state)
                                                                 }];
            }
        });
    }];
    [self.tcsdk onChatMessageReceived:^(NSString *fromUserID, NSString *fromUserName, NSString *message, NSString *toUserID) {
        dispatch_async(dispatch_get_main_queue(), ^{
            if(hasListener) {
                [self sendEventWithName:ON_CHAT_MESSAGE_RECEIVED body:@{
                                                                     FROM_USER_ID: fromUserID,
                                                                     FROM_USER_NAME: fromUserName,
                                                                     MESSAGE: message,
                                                                     TO_USER_ID: toUserID
                                                                     }];
            }
        });
    }];
}

RCT_EXPORT_METHOD(getMyId:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    resolve([self.tcsdk getMyId]);
}

RCT_EXPORT_METHOD(getMyName:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    resolve([self.tcsdk getMyName]);
}

RCT_EXPORT_METHOD(isStarted:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    resolve(@([self.tcsdk isStarted]));
}

RCT_EXPORT_METHOD(isConnectedToServer:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    resolve(@([self.tcsdk isConnectedToServer]));
}
               
               
RCT_EXPORT_METHOD(isLoggedIn:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    resolve(@([self.tcsdk isLoggedIn]));
}
               
RCT_EXPORT_METHOD(isInConference:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    resolve(@([self.tcsdk isInConference]));
}

RCT_EXPORT_METHOD(loginAs:(NSString *)user pwd:(NSString *)pwd encryptPassword:(BOOL)encryptPassword autoLogin:(BOOL)autoLogin resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    resolve(@([self.tcsdk loginAs:user password:pwd encryptPassword:encryptPassword enableAutoLogin:autoLogin]));
}

RCT_EXPORT_METHOD(logout:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    resolve(@([self.tcsdk logout]));
}

RCT_EXPORT_METHOD(callTo:(NSString *)callToUser resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    resolve(@([self.tcsdk callTo:callToUser]));
}

RCT_EXPORT_METHOD(stop)
{
    [self.tcsdk stop];
}

RCT_EXPORT_METHOD(joinConf:(NSString *)confId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    resolve(@([self.tcsdk joinConf:confId]));
}

RCT_EXPORT_METHOD(hangup:(BOOL)forAll resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    resolve(@([self.tcsdk hangup:forAll]));
}

RCT_EXPORT_METHOD(acceptCall:(BOOL)accept resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    resolve(@([self.tcsdk acceptCall:accept]));
}

RCT_EXPORT_METHOD(acceptRecord:(BOOL)accept forUser:(NSString*)userID resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    resolve(@([self.tcsdk acceptRecord:accept forUser:userID]));
}

RCT_EXPORT_METHOD(sendChatMessage:(NSString*)userID message:(NSString*)message resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    resolve(@([self.tcsdk sendChatMessage:userID :message]));
}

RCT_EXPORT_METHOD(parseProtocolLink:(NSString *)cmd)
{
    [self.tcsdk parseProtocolLink:cmd];
}

RCT_EXPORT_METHOD(scheduleLoginAs:(NSString *)login pwd:(NSString *)password encryptPassword:(BOOL)encrypt callToUser:(NSString *)callToUser autoClose:(BOOL)autoClose loginTemp:(BOOL)loginTemp loginForce:(BOOL)loginForce domain:(NSString *)domain serverList:(NSString *)serverList isPublic:(BOOL)isPublic)
{
    [self.tcsdk scheduleLoginAs:login password:password encryptPassword:encrypt andCallTo:callToUser autoClose:autoClose loginTemp:loginTemp loginForce:loginForce domain:domain serversList:serverList isPublic:isPublic];
}

RCT_EXPORT_METHOD(muteMicrophone:(BOOL)mute)
{
    [self.tcsdk muteMicrophone:mute];
}

RCT_EXPORT_METHOD(muteCamera:(BOOL)mute)
{
    [self.tcsdk muteCamera:mute];
}

RCT_EXPORT_METHOD(getUserStatus:(NSString *)userId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    resolve(@([self.tcsdk getUserStatus:userId]));
}

RCT_EXPORT_METHOD(microphoneMuted:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    resolve(@([self.tcsdk microphoneMuted]));
}

RCT_EXPORT_METHOD(cameraMuted:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    resolve(@([self.tcsdk cameraMuted]));
}

-(NSDictionary*)htmlColors
{
    NSDictionary* colors = @{
                          @"aliceblue": @"#F0F8FF",
                          @"antiquewhite": @"#FAEBD7",
                          @"aqua": @"#00FFFF",
                          @"aquamarine": @"#7FFFD4",
                          @"azure": @"#F0FFFF",
                          @"beige": @"#F5F5DC",
                          @"bisque": @"#FFE4C4",
                          @"black": @"#000000",
                          @"blanchedalmond": @"#FFEBCD",
                          @"blue": @"#0000FF",
                          @"blueviolet": @"#8A2BE2",
                          @"brown": @"#A52A2A",
                          @"burlywood": @"#DEB887",
                          @"cadetblue": @"#5F9EA0",
                          @"chartreuse": @"#7FFF00",
                          @"chocolate": @"#D2691E",
                          @"coral": @"#FF7F50",
                          @"cornflowerblue": @"#6495ED",
                          @"cornsilk": @"#FFF8DC",
                          @"crimson": @"#DC143C",
                          @"cyan": @"#00FFFF",
                          @"darkblue": @"#00008B",
                          @"darkcyan": @"#008B8B",
                          @"darkgoldenrod": @"#B8860B",
                          @"darkgray": @"#A9A9A9",
                          @"darkgrey": @"#A9A9A9",
                          @"darkgreen": @"#006400",
                          @"darkkhaki": @"#BDB76B",
                          @"darkmagenta": @"#8B008B",
                          @"darkolivegreen": @"#556B2F",
                          @"darkorange": @"#FF8C00",
                          @"darkorchid": @"#9932CC",
                          @"darkred": @"#8B0000",
                          @"darksalmon": @"#E9967A",
                          @"darkseagreen": @"#8FBC8F",
                          @"darkslateblue": @"#483D8B",
                          @"darkslategray": @"#2F4F4F",
                          @"darkslategrey": @"#2F4F4F",
                          @"darkturquoise": @"#00CED1",
                          @"darkviolet": @"#9400D3",
                          @"deeppink": @"#FF1493",
                          @"deepskyblue": @"#00BFFF",
                          @"dimgray": @"#696969",
                          @"dimgrey": @"#696969",
                          @"dodgerblue": @"#1E90FF",
                          @"firebrick": @"#B22222",
                          @"floralwhite": @"#FFFAF0",
                          @"forestgreen": @"#228B22",
                          @"fuchsia": @"#FF00FF",
                          @"gainsboro": @"#DCDCDC",
                          @"ghostwhite": @"#F8F8FF",
                          @"gold": @"#FFD700",
                          @"goldenrod": @"#DAA520",
                          @"gray": @"#808080",
                          @"grey": @"#808080",
                          @"green": @"#008000",
                          @"greenyellow": @"#ADFF2F",
                          @"honeydew": @"#F0FFF0",
                          @"hotpink": @"#FF69B4",
                          @"indianred": @"#CD5C5C",
                          @"indigo": @"#4B0082",
                          @"ivory": @"#FFFFF0",
                          @"khaki": @"#F0E68C",
                          @"lavender": @"#E6E6FA",
                          @"lavenderblush": @"#FFF0F5",
                          @"lawngreen": @"#7CFC00",
                          @"lemonchiffon": @"#FFFACD",
                          @"lightblue": @"#ADD8E6",
                          @"lightcoral": @"#F08080",
                          @"lightcyan": @"#E0FFFF",
                          @"lightgoldenrodyellow": @"#FAFAD2",
                          @"lightgray": @"#D3D3D3",
                          @"lightgrey": @"#D3D3D3",
                          @"lightgreen": @"#90EE90",
                          @"lightpink": @"#FFB6C1",
                          @"lightsalmon": @"#FFA07A",
                          @"lightseagreen": @"#20B2AA",
                          @"lightskyblue": @"#87CEFA",
                          @"lightslategray": @"#778899",
                          @"lightslategrey": @"#778899",
                          @"lightsteelblue": @"#B0C4DE",
                          @"lightyellow": @"#FFFFE0",
                          @"lime": @"#00FF00",
                          @"limegreen": @"#32CD32",
                          @"linen": @"#FAF0E6",
                          @"magenta": @"#FF00FF",
                          @"maroon": @"#800000",
                          @"mediumaquamarine": @"#66CDAA",
                          @"mediumblue": @"#0000CD",
                          @"mediumorchid": @"#BA55D3",
                          @"mediumpurple": @"#9370D8",
                          @"mediumseagreen": @"#3CB371",
                          @"mediumslateblue": @"#7B68EE",
                          @"mediumspringgreen": @"#00FA9A",
                          @"mediumturquoise": @"#48D1CC",
                          @"mediumvioletred": @"#C71585",
                          @"midnightblue": @"#191970",
                          @"mintcream": @"#F5FFFA",
                          @"mistyrose": @"#FFE4E1",
                          @"moccasin": @"#FFE4B5",
                          @"navajowhite": @"#FFDEAD",
                          @"navy": @"#000080",
                          @"oldlace": @"#FDF5E6",
                          @"olive": @"#808000",
                          @"olivedrab": @"#6B8E23",
                          @"orange": @"#FFA500",
                          @"orangered": @"#FF4500",
                          @"orchid": @"#DA70D6",
                          @"palegoldenrod": @"#EEE8AA",
                          @"palegreen": @"#98FB98",
                          @"paleturquoise": @"#AFEEEE",
                          @"palevioletred": @"#D87093",
                          @"papayawhip": @"#FFEFD5",
                          @"peachpuff": @"#FFDAB9",
                          @"peru": @"#CD853F",
                          @"pink": @"#FFC0CB",
                          @"plum": @"#DDA0DD",
                          @"powderblue": @"#B0E0E6",
                          @"purple": @"#800080",
                          @"rebeccapurple": @"#663399",
                          @"red": @"#FF0000",
                          @"rosybrown": @"#BC8F8F",
                          @"royalblue": @"#4169E1",
                          @"saddlebrown": @"#8B4513",
                          @"salmon": @"#FA8072",
                          @"sandybrown": @"#F4A460",
                          @"seagreen": @"#2E8B57",
                          @"seashell": @"#FFF5EE",
                          @"sienna": @"#A0522D",
                          @"silver": @"#C0C0C0",
                          @"skyblue": @"#87CEEB",
                          @"slateblue": @"#6A5ACD",
                          @"slategray": @"#708090",
                          @"slategrey": @"#708090",
                          @"snow": @"#FFFAFA",
                          @"springgreen": @"#00FF7F",
                          @"steelblue": @"#4682B4",
                          @"tan": @"#D2B48C",
                          @"teal": @"#008080",
                          @"thistle": @"#D8BFD8",
                          @"tomato": @"#FF6347",
                          @"turquoise": @"#40E0D0",
                          @"violet": @"#EE82EE",
                          @"wheat": @"#F5DEB3",
                          @"white": @"#FFFFFF",
                          @"whitesmoke": @"#F5F5F5",
                          @"yellow": @"#FFFF00",
                          @"yellowgreen": @"#9ACD32"
                           };
    return colors;
}

- (CGFloat) colorComponentFrom:(NSString*)string start:(NSUInteger)start length:(NSUInteger)length
{
    NSString* substring = [string substringWithRange:NSMakeRange(start, length)];
    unsigned int hex;
    [[NSScanner scannerWithString:substring] scanHexInt:&hex];
    return hex / 255.0;
}

- (UIColor*)getColorFromString:(NSString*)colorString
{
    colorString = [[colorString stringByReplacingOccurrencesOfString:@"#" withString:@""] uppercaseString];
    CGFloat alpha, red, green, blue;
    switch (colorString.length) {
        case 6:
            alpha = 1.0f;
            red = [self colorComponentFrom:colorString start:0 length:2];
            green = [self colorComponentFrom:colorString start:2 length:2];
            blue = [self colorComponentFrom:colorString start:4 length:2];
            break;
            
            case 8:
            alpha = [self colorComponentFrom:colorString start:0 length:2];
            red = [self colorComponentFrom:colorString start:2 length:4];
            green = [self colorComponentFrom:colorString start:4 length:2];
            blue = [self colorComponentFrom:colorString start:6 length:2];
            break;
            
        default:
            alpha = 1.0f;
            red = 1.0f;
            green = 1.0f;
            blue = 1.0f;
            break;
    }
    return [UIColor colorWithRed:red green:green blue:blue alpha:alpha];
}

RCT_EXPORT_METHOD(addExtraButton:(NSString*)title imageSet:(NSString*)imageSet textColorString:(NSString*)textColorString isActive:(BOOL)isActive resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    @try
    {
        NSMutableArray<TCSDKExtraButton *> *btns = [[NSMutableArray alloc] init];
        if(![textColorString containsString:@"#"])
        {
            textColorString = [[self htmlColors] objectForKey:textColorString]? [[self htmlColors] objectForKey:textColorString] : @"#000000";
        }
        UIColor* textColor = [self getColorFromString:textColorString];
        UIImage* image = nil;
        if(imageSet && [imageSet length] > 0)
        {
            image = [UIImage imageNamed:imageSet];
        }
        
        TCSDKExtraButton* btn =
        [[TCSDKExtraButton alloc] initWithTitle:title
                                          image:image
                                   imageTouched:image
                                  imageDisabled:image
                                      textColor:textColor
                             textHighlightColor:textColor
                              textDisabledColor:textColor
                                        enabled:isActive
                                         action:^(id sender) {
                                             dispatch_async(dispatch_get_main_queue(), ^{
                                                 if(hasListener) { 
                                                    [self sendEventWithName:ON_EXTRA_BUTTON_PRESSED body:nil];
                                                }
                                             });
                                         }];
        [btns addObject:btn];
        [self.tcsdk setNewExtraButtons:btns];
        resolve(@(YES));
    } @catch(NSException* e)
    {
        reject(@"addExtraButton", [NSString stringWithFormat:@"failed to set extra button: %@", [e reason]], nil);
    }
}

RCT_EXPORT_METHOD(showAlertPage:(NSString*)alertText resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    @try
    {
        self.alertController = [[DialogViewController alloc] initWithAlertText:alertText];        
        [self.tcsdk presentViewController:self.alertController
                                 animated:YES
                              popoverFrom:nil
                               completion:nil];
        resolve(@(YES));
    } @catch(NSException* e)
    {
        reject(@"showAlertPage", [NSString stringWithFormat:@"failed to show alert page: %@", [e reason]], nil);
    }
}

@end
  
