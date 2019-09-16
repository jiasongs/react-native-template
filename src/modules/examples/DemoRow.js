'use strict';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationBar, PageContainer, ListRow, Badge } from '../../components';
import { Images } from '../../assets';

function DemoRow() {
  return (
    <PageContainer style={styles.container}>
      <NavigationBar title={'DemoRow'} />
      <ListRow
        icon={Images.icon_toast_success}
        iconStyle={{}}
        title={'title'}
        subtitle={'subtitle'}
        detail={'detail'}
      />
      <ListRow
        icon={Images.icon_toast_success}
        iconStyle={{}}
        title={'title'}
        subtitle={'subtitle'}
        detail={<Badge style={{ marginRight: 10 }} count={10} />}
      />
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(DemoRow);
