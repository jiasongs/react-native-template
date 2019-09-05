//
//  RCTTextAttributes+z.m
//  RNTemplate
//
//  Created by RuanMei on 2019/9/5.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "RCTTextAttributes+Adaptation.h"
#import <objc/runtime.h>

@implementation RCTTextAttributes (Adaptation)

+ (void)load {
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    SEL selectors[] = {
      @selector(effectiveFont),
    };
    for (NSUInteger index = 0; index < sizeof(selectors) / sizeof(SEL); ++index) {
      SEL originalSelector = selectors[index];
      SEL swizzledSelector = NSSelectorFromString([@"adaptation_" stringByAppendingString:NSStringFromSelector(originalSelector)]);
      Method originalMethod = class_getInstanceMethod(self, originalSelector);
      Method swizzledMethod = class_getInstanceMethod(self, swizzledSelector);
      method_exchangeImplementations(originalMethod, swizzledMethod);
    }
  });
}

- (UIFont *)adaptation_effectiveFont {
  UIFont *fontSize = [self adaptation_effectiveFont];
  return [fontSize fontWithSize:[self scaleSize:fontSize.pointSize]];
}

-(CGFloat)scaleSize:(CGFloat)size {
  if (UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPad) {
    return size;
  }
  return (size / 375.0f * [[UIScreen mainScreen] bounds].size.width);
}


@end
