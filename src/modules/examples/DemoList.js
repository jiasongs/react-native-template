'use strict';
import React, { useRef, useEffect, useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  NavigationBar,
  PageContainer,
  ListView,
  ListRow,
} from '../../components';
import { ServiceHome } from '../../services';
import { Predefine } from '../../config/predefine';

function DemoList({ showNavBar = true }) {
  const listRef = useRef(React.createRef());
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ServiceHome.getHomeList({ limit: 20 }).then((result) => {
      if (result.success) {
        setData(result.data);
        setLoading(false);
      }
    });
    return () => {
      console.log('销毁');
    };
  }, []);

  const onRefresh = useCallback((stopRefresh) => {
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
  }, []);

  const onEndReached = useCallback(
    (stopEndReached) => {
      setTimeout(() => {
        setData((preData) => {
          return preData.concat([1, 1, 1, 1]);
        });
        stopEndReached({ allLoad: data.length > 1000 });
      }, 2000);
    },
    [data],
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
      loadingStyle={{ top: showNavBar ? Predefine.contentTop : 0 }}
      emptyStyle={{}}
    >
      {showNavBar ? <NavigationBar title={'DemoList'} /> : null}
      <ListView
        ref={listRef}
        style={styles.container}
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
