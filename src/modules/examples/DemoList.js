'use strict';
import React, { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  NavigationBar,
  PageContainer,
  ListView,
  ListRow,
} from '../../components';

const dataTemp = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

function DemoList() {
  const [data, setData] = useState(dataTemp);

  const onRefresh = useCallback((stopRefresh) => {
    setTimeout(() => {
      stopRefresh();
    }, 3000);
  }, []);

  const onEndReached = useCallback(
    (stopEndReached) => {
      setTimeout(() => {
        setData((preData) => {
          return preData.concat([1, 1, 1, 1]);
        });
        stopEndReached({ allLoad: data.length > 100 });
      }, 3000);
    },
    [data],
  );

  const renderItem = useCallback(({ index }) => {
    return (
      <ListRow
        onPress={() => {
          alert('Z');
        }}
        title={'Item' + index}
      />
    );
  }, []);

  return (
    <PageContainer style={styles.container}>
      <NavigationBar title={'DemoList'} />
      <ListView
        style={styles.container}
        onRefresh={onRefresh}
        keyExtractor={(item, index) => index + ''}
        data={data}
        renderItem={renderItem}
        onEndReached={onEndReached}
      />
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(DemoList);
