//
//  OCBarrageVIew.m
//  template
//
//  Created by jiasong on 2018/6/26.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "OCBarrageView.h"
#import "UIColor+JKHEX.h"

@interface OCBarrageView()


@end

@implementation OCBarrageView

-(instancetype)init {
  if ([super init]) {
    [self createOCBarrageManager];
  }
  return self;
};

-(void)dealloc {
  // 务必释放
  [self releaseOCBarrage];
}

-(void)createOCBarrageManager {
   [self releaseOCBarrage];
  _barrageManager = [[OCBarrageManager alloc] init];
  [self addSubview:_barrageManager.renderView];
}

-(void)layoutSubviews {
  [super layoutSubviews];
  _barrageManager.renderView.frame = self.bounds;
}

-(void)addNormalContent:(NSString *)content option:(NSDictionary *)option {
  NSString *textColorHex = [option objectForKey:@"textColor"];
  CGFloat fontSize = [[option objectForKey:@"fontSize"] floatValue];
  OCBarrageTextDescriptor *textDescriptor = [[OCBarrageTextDescriptor alloc] init];
  textDescriptor.text = [NSString stringWithFormat:@"%@", content];
  textDescriptor.textColor = [UIColor jk_colorWithHexString:textColorHex];
  textDescriptor.textFont = [UIFont systemFontOfSize:fontSize];
  textDescriptor.positionPriority = OCBarragePositionLow;
  textDescriptor.strokeColor = [[UIColor blackColor] colorWithAlphaComponent:0.3];
  textDescriptor.strokeWidth = -1;
  textDescriptor.animationDuration = arc4random()%5 + 5;
  textDescriptor.barrageCellClass = [OCBarrageTextCell class];
  
  [_barrageManager renderBarrageDescriptor:textDescriptor];
}

-(void)releaseOCBarrage {
  if (_barrageManager) {
    [_barrageManager stop];
    [_barrageManager.renderView removeFromSuperview];
    _barrageManager = nil;
  }
}

@end
