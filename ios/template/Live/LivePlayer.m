//
//  LivePlayer.m
//  LiveToDo
//
//  Created by jiasong on 2018/6/22.
//  Copyright © 2018年 jiasong. All rights reserved.
//

#import "LivePlayer.h"


@interface LivePlayer()


@end

@implementation LivePlayer

-(instancetype)init {
  if ([super init]) {
    [self createAliPlayer];
  }
  return self;
};

-(void)dealloc {
  // 必须销毁播放器实例，否则会造成内存泄漏
  [self releasePlayer];
}

-(void)layoutSubviews {
  [super layoutSubviews];
  NSLog(@"layoutSubviews");
  _playerView.frame = self.bounds;
}

-(void)createAliPlayer {
  // 必须销毁播放器实例
  [self releasePlayer];
  //创建播放器对象，可以创建多个实例
  _aliPlayer = [[AliyunVodPlayer alloc] init];
  //设置播放器代理
  _aliPlayer.delegate = self;
  //获取播放器视图
  _playerView = _aliPlayer.playerView;
  _playerView.frame = self.bounds;
  //添加播放器视图到需要展示的界面上
  [self addSubview:_playerView];
}

- (void)setSource:(NSDictionary *)source {
  if (_aliPlayer.isPlaying) {
    [_aliPlayer stop];
  }
  NSString *uri = [source objectForKey:@"uri"];
  NSURL *url = [NSURL URLWithString:uri];
  [_aliPlayer prepareWithURL:url];
}

-(void)releasePlayer {
  if (_aliPlayer) {
    [_aliPlayer releasePlayer];
    [_playerView removeFromSuperview];
    _aliPlayer = nil;
    _playerView = nil;
  }
}

/**
 * 功能：播放事件协议方法,主要内容 AliyunVodPlayerEventPrepareDone状态下，此时获取到播放视频数据（时长、当前播放数据、视频宽高等）
 * 参数：event 视频事件
 */
- (void)vodPlayer:(AliyunVodPlayer *)vodPlayer onEventCallback:(AliyunVodPlayerEvent)event {
  //这里监控播放事件回调
  //主要事件如下：
  switch (event) {
    case AliyunVodPlayerEventPrepareDone:
      //播放准备完成时触发
      if (self.onLiveLoadStart) {
        NSDictionary *dic = @{};
        self.onLiveLoadStart(dic);
      }
      break;
    case AliyunVodPlayerEventPlay:
      //暂停后恢复播放时触发
      
      break;
    case AliyunVodPlayerEventFirstFrame:
      //播放视频首帧显示出来时触发
      break;
    case AliyunVodPlayerEventPause:
      //视频暂停时触发
      break;
    case AliyunVodPlayerEventStop:
      //主动使用stop接口时触发
      break;
    case AliyunVodPlayerEventFinish:
      //视频正常播放完成时触发
      
      break;
    case AliyunVodPlayerEventBeginLoading:
      //视频开始载入时触发
      
      break;
    case AliyunVodPlayerEventEndLoading:
      //视频加载完成时触发
      
      break;
    case AliyunVodPlayerEventSeekDone:
      //视频Seek完成时触发
      
      break;
    default:
      break;
  }
}

/**
 * 功能：播放器播放时发生错误时，回调信息
 * 参数：errorModel 播放器报错时提供的错误信息对象
 */
- (void)vodPlayer:(AliyunVodPlayer *)vodPlayer playBackErrorModel:(AliyunPlayerVideoErrorModel *)errorModel {
  
}

- (void)vodPlayer:(AliyunVodPlayer*)vodPlayer willSwitchToQuality:(AliyunVodPlayerVideoQuality)quality{
  //将要切换清晰度时触发
  
}

- (void)vodPlayer:(AliyunVodPlayer *)vodPlayer didSwitchToQuality:(AliyunVodPlayerVideoQuality)quality{
  //清晰度切换完成后触发
  
}

- (void)vodPlayer:(AliyunVodPlayer*)vodPlayer failSwitchToQuality:(AliyunVodPlayerVideoQuality)quality{
  //清晰度切换失败触发
  
}

- (void)onCircleStartWithVodPlayer:(AliyunVodPlayer*)vodPlayer{
  //开启循环播放功能，开始循环播放时接收此事件。
  
}
- (void)onTimeExpiredErrorWithVodPlayer:(AliyunVodPlayer *)vodPlayer{
  //播放器鉴权数据过期回调，出现过期可重新prepare新的地址或进行UI上的错误提醒。
  
}
/*
 *功能：播放过程中鉴权即将过期时提供的回调消息（过期前一分钟回调）
 *参数：videoid：过期时播放的videoId
 *参数：quality：过期时播放的清晰度，playauth播放方式和STS播放方式有效。
 *参数：videoDefinition：过期时播放的清晰度，MPS播放方式时有效。
 *备注：使用方法参考高级播放器-点播。
 */
- (void)vodPlayerPlaybackAddressExpiredWithVideoId:(NSString *)videoId quality:(AliyunVodPlayerVideoQuality)quality videoDefinition:(NSString*)videoDefinition{
  //鉴权有效期为2小时，在这个回调里面可以提前请求新的鉴权，stop上一次播放，prepare新的地址，seek到当前位置
  
}


@end
