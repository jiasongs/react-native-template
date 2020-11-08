'use strict';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  NavigationBar,
  PageContainer,
  Stepper,
  Checkbox,
  Radio,
  Badge,
  Button,
} from 'react-native-ui-core';
import { Predefine } from '../../common/predefine';

function DemoForm() {
  const [checked, setChecked] = useState('单选1');
  const [checkeds, setCheckeds] = useState(['']);

  return (
    <PageContainer style={styles.container}>
      <NavigationBar title={'DemoForm'} />
      <Stepper
        style={styles.badge}
        min={0}
        max={100}
        step={10}
        defaultValue={10}
        onChangeValue={() => {}}
      />
      <View style={Predefine.RCC}>
        <Checkbox
          style={{ marginTop: 20 }}
          disabled={false}
          title={'多选1'}
          checked={checkeds.findIndex((item) => item === '多选1') !== -1}
          onPress={() => {
            const index = checkeds.findIndex((item) => item === '多选1');
            const newCheckeds = checkeds.slice();
            if (index === -1) {
              newCheckeds.push('多选1');
            } else {
              newCheckeds.splice(index, 1);
            }
            setCheckeds(newCheckeds);
          }}
        />
        <Checkbox
          style={{ marginTop: 20, marginLeft: 20 }}
          disabled={false}
          title={'多选2'}
          checked={checkeds.findIndex((item) => item === '多选2') !== -1}
          onPress={() => {
            const index = checkeds.findIndex((item) => item === '多选2');
            const newCheckeds = checkeds.slice();
            if (index === -1) {
              newCheckeds.push('多选2');
            } else {
              newCheckeds.splice(index, 1);
            }
            setCheckeds(newCheckeds);
          }}
        />
      </View>
      <View style={Predefine.RCC}>
        <Radio
          style={{ marginTop: 20 }}
          disabled={false}
          title={'单选1'}
          checked={checked === '单选1'}
          onPress={() => {
            setChecked('单选1');
          }}
          zoomRate={0.5}
        />
        <Radio
          style={{ marginTop: 20, marginLeft: 20 }}
          disabled={false}
          title={'单选2'}
          checked={checked === '单选2'}
          onPress={() => {
            setChecked('单选2');
          }}
        />
      </View>
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
