//
//  OCBarrageVIew.h
//  template
//
//  Created by jiasong on 2018/6/26.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "OCBarrage.h"

@interface OCBarrageView : UIView

@property (nonatomic,strong) OCBarrageManager *barrageManager;

-(void)addNormalContent:(NSString *)content option:(NSDictionary *)option;
-(void)releaseOCBarrage;
@end
