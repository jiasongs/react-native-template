'use strict';
import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { NavigationBar, PageContainer, Button, Label } from '../../components';
import { Images } from '../../assets';

function DemoButton() {
  const [loading, setLoading] = useState(false);

  return (
    <PageContainer style={styles.container}>
      <NavigationBar title={'DemoButton'} />
      <ScrollView
        style={styles.content}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button style={styles.button} title={'solid-title'} />
        <Button
          loading={loading}
          style={styles.button}
          icon={Images.icon_toast_success}
        />
        <Button
          style={styles.button}
          title={'solid-loading'}
          loading={loading}
          onPress={() => {
            if (!loading) {
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
              }, 2000);
            }
          }}
        />
        <Button
          style={styles.button}
          title={'solid-disabled'}
          disabled={true}
        />
        <Button raised={true} style={styles.button} title={'solid-raised'} />
        <Button
          style={styles.button}
          title={'solid-左icon右title'}
          icon={Images.icon_toast_success}
        />
        <Button
          style={styles.button}
          title={'solid-右icon左title'}
          icon={Images.icon_toast_success}
          iconPosition={'right'}
        />
        <Button
          style={styles.button}
          title={'solid'}
          icon={Images.icon_toast_success}
          iconPosition={'top'}
        />
        <Button
          style={styles.button}
          title={'solid'}
          icon={Images.icon_toast_success}
          iconPosition={'bottom'}
        />
        <Button style={styles.button}>
          <Label style={{ color: '#fff' }}>{'solid-被button包裹'}</Label>
        </Button>
        <Button
          type={'outline'}
          style={styles.button}
          title={'outline-title'}
        />
        <Button
          type={'outline'}
          style={styles.button}
          icon={Images.icon_toast_success}
        />
        <Button
          type={'outline'}
          style={styles.button}
          title={'outline-loading'}
          loading={loading}
        />
        <Button
          type={'outline'}
          style={styles.button}
          title={'outline-disabled'}
          disabled={true}
        />
        <Button
          type={'outline'}
          raised={true}
          style={styles.button}
          title={'outline-raised'}
        />
        <Button
          type={'outline'}
          style={styles.button}
          title={'outline-左icon右title'}
          icon={Images.icon_toast_success}
        />
        <Button
          type={'outline'}
          style={styles.button}
          title={'outline-右icon左title'}
          icon={Images.icon_toast_success}
          iconPosition={'right'}
        />
        <Button
          type={'outline'}
          style={styles.button}
          title={'outline'}
          icon={Images.icon_toast_success}
          iconPosition={'top'}
        />
        <Button
          type={'outline'}
          style={styles.button}
          title={'outline'}
          icon={Images.icon_toast_success}
          iconPosition={'bottom'}
        />
        <Button type={'outline'} style={styles.button}>
          <Label style={{ color: '#333' }}>{'outline-被button包裹'}</Label>
        </Button>
        <Button type={'clear'} style={styles.button} title={'clear-title'} />
        <Button
          type={'clear'}
          style={styles.button}
          icon={Images.icon_toast_success}
        />
        <Button
          type={'clear'}
          style={styles.button}
          title={'clear-loading'}
          loading={loading}
        />
        <Button
          type={'clear'}
          style={styles.button}
          title={'clear-disabled'}
          disabled={true}
        />
        <Button
          type={'clear'}
          style={styles.button}
          title={'clear-左icon右title'}
          icon={Images.icon_toast_success}
        />
        <Button
          type={'clear'}
          style={styles.button}
          title={'clear-右icon左title'}
          icon={Images.icon_toast_success}
          iconPosition={'right'}
        />
        <Button
          type={'clear'}
          style={styles.button}
          title={'clear'}
          icon={Images.icon_toast_success}
          iconPosition={'top'}
        />
        <Button
          type={'clear'}
          style={styles.button}
          title={'clear'}
          icon={Images.icon_toast_success}
          iconPosition={'bottom'}
        />
        <Button type={'clear'} style={styles.button}>
          <Label style={{ color: '#333' }}>{'clear-被button包裹'}</Label>
        </Button>
      </ScrollView>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
  content: {},
  button: {
    marginTop: 20,
  },
});

export default React.memo(DemoButton);
