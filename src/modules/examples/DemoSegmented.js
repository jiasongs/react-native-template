/* eslint-disable no-unused-vars */
'use strict';
import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import {
  NavigationBar,
  PageContainer,
  SegmentedView,
  SegmentedScene,
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
          console.log('onChange', index);
        }}
        indicatorWidthType={'item'}
        barStyle={{}}
        itemStyle={{ borderRightWidth: 1 }}
      >
        {dataSource.map((item, index) => {
          let title = '你好吗' + index;
          return (
            <SegmentedScene key={title} itemTitle={title}>
              <FlatList
                keyExtractor={(itemKey, indexKey) => indexKey + ''}
                data={data}
                renderItem={() => {
                  return <Text style={{ height: 50 }}>{index}</Text>;
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
