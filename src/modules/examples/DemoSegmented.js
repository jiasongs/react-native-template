/* eslint-disable no-unused-vars */
'use strict';
import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import {
  NavigationBar,
  PageContainer,
  SegmentedView,
  SegmentedScene,
  ListView,
  Label,
} from '../../components';
import { Images } from '../../assets';
import DemoList from './DemoList';

const data = [...new Array(30)];
const pageData = [...new Array(10)];

function DemoSegmented() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dataSource, setDataSource] = useState(pageData);

  return (
    <PageContainer style={styles.container}>
      <NavigationBar
        title={'DemoSegmented'}
        renderRightAction={[
          {
            title: '添加',
            onPress: () => {
              setDataSource((preData) => {
                return preData.concat([...new Array(5)]);
              });
            },
          },
          {
            title: '减少',
            onPress: () => {
              setDataSource((preData) => {
                const newData = preData.slice();
                newData.splice(0, 1);
                return newData;
              });
            },
          },
        ]}
      />
      <SegmentedView
        onChange={(index) => {
          // console.log('onChange', index);
        }}
        initialPage={1}
        indicatorType={'lengThen'}
        indicatorWidthType={'item'}
        indicatorStyle={{}}
        barStyle={{}}
        itemStyle={{}}
      >
        {dataSource.map((item, index) => {
          let title = '你好吗' + index;
          if (index === 2) {
            title = title + 'mamam';
          }
          if (index === 5) {
            title = title + 'zz';
          }
          return (
            <SegmentedScene key={title} itemTitle={title}>
              <ListView
                keyExtractor={(itemKey, indexKey) => indexKey + ''}
                onRefresh={(stopRefresh) => {
                  setTimeout(() => {
                    stopRefresh();
                  }, 1000);
                }}
                onEndReached={(stopEndReached) => {
                  setTimeout(() => {
                    stopEndReached();
                  }, 2000);
                }}
                data={data}
                renderItem={() => {
                  return <Label style={{ height: 50 }} title={`${index}`} />;
                }}
              />
            </SegmentedScene>
          );
        })}
      </SegmentedView>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(DemoSegmented);
