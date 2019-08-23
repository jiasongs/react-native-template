import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { PageContainer, ListRow, NavigationBar } from '../../components';
import RouterHelper from '../../routers/RouterHelper';

function Example() {
  return (
    <PageContainer style={styles.container}>
      <NavigationBar title={'Example'} renderLeftAction={null} />
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
      </ScrollView>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default React.memo(Example);
