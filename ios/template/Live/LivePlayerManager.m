//
//  LivePlayerManager.m
//  liveToDo
//
//  Created by jiasong on 2018/6/22.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "LivePlayerManager.h"
#import "LivePlayer.h"


@interface LivePlayerManager()

@property (nonatomic,strong) LivePlayer *livePlayer ;

@end

@implementation LivePlayerManager

RCT_EXPORT_MODULE();

- (UIView *)view {
  _livePlayer = [[LivePlayer alloc] init];
  return _livePlayer;
}

- (dispatch_queue_t)methodQueue {
  return dispatch_get_main_queue();
}

RCT_EXPORT_VIEW_PROPERTY(source, NSDictionary);
RCT_EXPORT_VIEW_PROPERTY(onLiveLoadStart, RCTBubblingEventBlock);
/*
 功能：开始播放视频
 备注：在prepareWithVid之后可以调用start进行播放。
 */
RCT_EXPORT_METHOD(start) {
  [_livePlayer.aliPlayer start];
}
/*
 功能：停止播放视频
 */
RCT_EXPORT_METHOD(stop) {
  [_livePlayer.aliPlayer stop];
}
/*
 功能：暂停播放视频
 备注：在start播放视频之后可以调用pause进行暂停。
 */
RCT_EXPORT_METHOD(pause) {
  [_livePlayer.aliPlayer pause];
}
/*
 功能：恢复播放视频
 备注：在pause暂停视频之后可以调用resume进行播放。
 */
RCT_EXPORT_METHOD(resume) {
  [_livePlayer.aliPlayer resume];
}
/*
 功能：重播，重新播放上一次url地址视频。
 */
RCT_EXPORT_METHOD(replay) {
  [_livePlayer.aliPlayer replay];
}

/*
 功能：销毁播放器
 */
RCT_EXPORT_METHOD(releasePlayer) {
  [_livePlayer releasePlayer];
}

@end
