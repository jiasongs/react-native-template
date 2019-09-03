import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { PageContainer, ListRow, NavigationBar } from '../../components';
import RouterHelper from '../../routers/RouterHelper';
import { RefreshLayout } from 'react-native-refresh';

function Example() {
  return (
    <PageContainer style={styles.container}>
      <NavigationBar title={'Example'} renderLeftAction={null} />
      <RefreshLayout
        enable={false}
        onChangeOffset={(event) => {
          console.log('event', event.nativeEvent);
        }}
      >
        <ScrollView>
          <ListRow
            title={'Theme'}
            onPress={() => RouterHelper.navigate('DemoTheme')}
          />
          <ListRow
            title={'Alert'}
            onPress={() => RouterHelper.navigate('DemoAlert')}
          />
          <ListRow
            title={'Button'}
            onPress={() => RouterHelper.navigate('DemoButton')}
          />
          <ListRow
            title={'Badge'}
            onPress={() => RouterHelper.navigate('DemoBadge')}
          />
          <ListRow
            title={'Toast'}
            onPress={() => RouterHelper.navigate('DemoToast')}
          />
          <ListRow
            title={'Overlay'}
            onPress={() => RouterHelper.navigate('DemoOverlay')}
          />
          <ListRow
            title={'List'}
            onPress={() => RouterHelper.navigate('DemoList')}
          />
        </ScrollView>
      </RefreshLayout>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default React.memo(Example);
