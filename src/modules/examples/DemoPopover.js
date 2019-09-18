'use strict';
import React, { useRef } from 'react';
import { Text, StyleSheet } from 'react-native';
import {
  NavigationBar,
  PageContainer,
  PopoverArrow,
  AlertManager,
  PopoverManager,
  Button,
} from '../../components';

function DemoPopover() {
  const buttonRef = useRef(React.createRef());

  return (
    <PageContainer style={styles.container}>
      <NavigationBar
        title={'DemoPopover'}
        renderRightAction={
          <Button
            ref={buttonRef}
            style={{ marginRight: 50 }}
            type={'clear'}
            title={'点击'}
            onPress={() => {
              PopoverManager.show({
                viewRef: buttonRef.current,
                arrow: 'topRight',
                contentStyle: {},
                option: {
                  anchorPoint: 'topRight',
                },
              });
            }}
          />
        }
      />
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(DemoPopover);
