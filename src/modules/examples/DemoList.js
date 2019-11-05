'use strict';
import React, { useRef, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import {
  NavigationBar,
  PageContainer,
  ListView,
  ListRow,
} from '../../components';
import { useHomeList } from '../../services';

function DemoList() {
  const listRef = useRef();

  const { data, setData, loading, setRequest } = useHomeList({
    initData: [],
    limit: 10,
  });

  const onRefresh = useCallback(
    (stopRefresh) => {
      setRequest();
      // ServiceHome.getHomeList({ limit: 20 }).then((result) => {
      //   if (result.success) {
      //     stopRefresh();
      //     setData(result.data);
      //   }
      // });
      setTimeout(() => {
        stopRefresh();
        setData((pre) => pre.slice());
      }, 1000);
    },
    [setData, setRequest],
  );

  const onEndReached = useCallback(
    (stopEndReached) => {
      setTimeout(() => {
        setData((preData) => {
          return preData.concat([1, 1, 1, 1]);
        });
        stopEndReached({ allLoad: data.length > 1000 });
      }, 2000);
    },
    [data.length, setData],
  );

  const renderItem = useCallback(({ index }) => {
    return (
      <ListRow
        contentStyle={{ height: 100 }}
        onPress={() => {
          alert('Z');
        }}
        title={'Item' + index}
      />
    );
  }, []);

  return (
    <PageContainer
      style={styles.container}
      loading={loading}
      loadingStyle={{}}
      emptyStyle={{}}
    >
      <NavigationBar title={'DemoList'} />
      <ListView
        ref={listRef}
        style={styles.container}
        initialRefresh={false}
        enableRefresh={true}
        enableLoadMore={true}
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
