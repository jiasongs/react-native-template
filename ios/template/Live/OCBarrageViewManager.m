//
//  OCBarrageViewManager.m
//  template
//
//  Created by jiasong on 2018/6/26.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "OCBarrageViewManager.h"
#import "OCBarrageView.h"

@interface OCBarrageViewManager()

@property (nonatomic,strong) OCBarrageView *ocbarrageView ;

@end

@implementation OCBarrageViewManager


RCT_EXPORT_MODULE();

- (UIView *)view {
  _ocbarrageView = [[OCBarrageView alloc] init];
  
  return _ocbarrageView;
}

- (dispatch_queue_t)methodQueue {
  return dispatch_get_main_queue();
}


RCT_EXPORT_METHOD(start) {
  [_ocbarrageView.barrageManager start];
}

RCT_EXPORT_METHOD(stop) {
  [_ocbarrageView.barrageManager stop];
}

RCT_EXPORT_METHOD(addNormalBarrage:(NSString *)content option:(NSDictionary *)option) {
  [_ocbarrageView addNormalContent:content option:option];
}

RCT_EXPORT_METHOD(releaseOCBarrage) {
  [_ocbarrageView releaseOCBarrage];
}


@end
