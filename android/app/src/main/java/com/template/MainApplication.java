package com.template;

import android.app.Application;
import android.content.Context;
import android.content.res.Configuration;
import android.content.res.Resources;
import android.support.multidex.MultiDex;

import com.facebook.react.ReactApplication;
import com.zmxv.RNSound.RNSoundPackage;
import com.rnim.rn.audio.ReactNativeAudioPackage;
import com.ocetnik.timer.BackgroundTimerPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import org.reactnative.camera.RNCameraPackage;
import com.jadsonlourenco.RNShakeEvent.RNShakeEventPackage;
import com.puti.paylib.PayReactPackage;
import com.imagepicker.ImagePickerPackage;
import com.dooboolab.RNIap.RNIapPackage;
import com.reactlibrary.RNSyanImagePickerPackage;
import com.rnfs.RNFSPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.github.yamill.orientation.OrientationPackage;
import com.brentvatne.react.ReactVideoPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import cn.jiguang.share.reactnative.JSharePackage;
import cn.jpush.reactnativejpush.JPushPackage;
import cn.jiguang.share.android.api.JShareInterface;     // <--  Import JShareInterface
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  @Override
  protected void attachBaseContext(Context base) {
    super.attachBaseContext(base);
    MultiDex.install(this);
  }

  // 不跟随系统字体大小进行变化
  @Override
  public void onConfigurationChanged(Configuration newConfig) {
    if (newConfig.fontScale != 1) getResources();
    super.onConfigurationChanged(newConfig);
  }
  // 不跟随系统字体大小进行变化
  @Override
  public Resources getResources() {
    Resources res = super.getResources();
    if (res.getConfiguration().fontScale != 1) {
      Configuration newConfig = new Configuration();
      newConfig.setToDefaults();
      res.updateConfiguration(newConfig, res.getDisplayMetrics());
    }
    return res;
  }

  // 是否关闭 Log，默认不关闭
  private static boolean SHUTDOWN_LOG = false;
  // 是否关闭 toast，默认不关闭
  private static boolean SHUTDOWN_TOAST = false;

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNSoundPackage(),
            new ReactNativeAudioPackage(),
            new BackgroundTimerPackage(),
            new RNDeviceInfo(),
            new RNCameraPackage(),
            new RNShakeEventPackage(),
            new PayReactPackage(),
            new ImagePickerPackage(),
            new RNIapPackage(),
            new RNSyanImagePickerPackage(),
            new RNFSPackage(),
            new RNFetchBlobPackage(),
            new OrientationPackage(),
            new ReactVideoPackage(),
            new SplashScreenReactPackage(),
            new RNSpinkitPackage(),
            new JSharePackage(SHUTDOWN_TOAST, SHUTDOWN_LOG),
            new JPushPackage(SHUTDOWN_TOAST, SHUTDOWN_LOG)
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    //        在 Init 之前调用，设置为 true，则会打印 debug 级别日志，否则只会打印 warning 级别以上的日志
//        JShareInterface.setDebugMode(true);
    JShareInterface.init(this);             //   <-- Init here
  }
}
