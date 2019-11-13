'use strict';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  NavigationBar,
  PageContainer,
  Stepper,
  Checkbox,
  Radio,
  Badge,
  Button,
} from '../../components';

function DemoForm() {
  const [checked, setChecked] = useState(false);

  return (
    <PageContainer style={styles.container}>
      <NavigationBar title={'DemoForm（测试）'} />
      <Stepper
        style={styles.badge}
        min={0}
        max={100}
        step={10}
        defaultValue={10}
        onChangeValue={() => {}}
      />
      {/* <Checkbox
        checked={checked}
        onPress={() => {
          setChecked((pre) => {
            return !pre;
          });
        }}
      /> */}
      <Radio
        title={'单选'}
        checked={checked}
        onPress={() => {
          setChecked((pre) => {
            return !pre;
          });
        }}
      />
      <Badge style={styles.badge} count={50} countStyle={{}} />
      <Badge type={'square'} style={styles.badge} count={50} countStyle={{}} />
      <Badge type={'dot'} style={styles.badge} count={50} countStyle={{}} />
      <Button style={styles.button} title={'Badge'}>
        <Badge style={styles.badge2} count={105} countStyle={{}} />
      </Button>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
  badge: {
    alignSelf: 'center',
    marginTop: 20,
  },
  badge2: {
    position: 'absolute',
    top: -5,
    right: -5,
  },
  button: {
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default React.memo(DemoForm);
