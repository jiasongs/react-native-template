import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { PageContainer, ListRow, NavigationBar } from '../../components';
import { RefreshLayout } from 'react-native-refresh';

function Example(props) {
  const { navigation } = props;
  return (
    <PageContainer style={styles.container}>
      <NavigationBar title={'Example'} renderLeftAction={null} />
      <RefreshLayout enable={false}>
        <ScrollView>
          <ListRow
            title={'Theme'}
            onPress={() => navigation.navigate('DemoTheme', { isModal: true })}
          />
          <ListRow
            title={'Alert'}
            onPress={() => navigation.navigate('DemoAlert')}
          />
          <ListRow
            title={'Button'}
            onPress={() => navigation.navigate('DemoButton')}
          />
          <ListRow
            title={'Toast'}
            onPress={() => navigation.navigate('DemoToast')}
          />
          <ListRow
            title={'Overlay'}
            onPress={() => navigation.navigate('DemoOverlay')}
          />
          <ListRow
            title={'List'}
            onPress={() => navigation.navigate('DemoList')}
          />
          <ListRow
            title={'ImageView'}
            onPress={() => navigation.navigate('DemoImageView')}
          />
          <ListRow
            title={'Card'}
            onPress={() => navigation.navigate('DemoCard')}
          />
          <ListRow
            title={'ListRow'}
            onPress={() => navigation.navigate('DemoRow')}
          />
          <ListRow
            title={'Segmented'}
            onPress={() => navigation.navigate('DemoSegmented')}
          />
          <ListRow
            title={'Popover'}
            onPress={() => navigation.navigate('DemoPopover')}
          />
          <ListRow
            title={'Form'}
            onPress={() => navigation.navigate('DemoForm')}
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
