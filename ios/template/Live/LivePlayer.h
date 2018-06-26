//
//  LivePlayer.h
//  LiveToDo
//
//  Created by jiasong on 2018/6/22.
//  Copyright © 2018年 jiasong. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <React/RCTView.h>
#import <AliyunVodPlayerSDK/AliyunVodPlayerSDK.h>

@interface LivePlayer : RCTView<AliyunVodPlayerDelegate>

@property (nonatomic,strong) AliyunVodPlayer *aliPlayer;
@property (nonatomic,strong) UIView *playerView;

@property (nonatomic,strong) NSDictionary *source;
@property (nonatomic, copy) RCTBubblingEventBlock onLiveLoadStart;
//@property (nonatomic, copy) RCTBubblingEventBlock onVideoLoad;
//@property (nonatomic, copy) RCTBubblingEventBlock onVideoBuffer;
//@property (nonatomic, copy) RCTBubblingEventBlock onVideoError;
//@property (nonatomic, copy) RCTBubblingEventBlock onVideoProgress;
-(void)releasePlayer;

@end
