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
const pageData = [...new Array(2)];

function DemoSegmented() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <PageContainer style={styles.container}>
      <NavigationBar title={'DemoSegmented'} />
      <SegmentedView
        // indicatorType={'itemWidth'}
        // // indicatorStyle={{ width: 50 }}
        onChange={(index) => {
          console.log('onChange', index);
        }}
        itemStyle={{ backgroundColor: 'red' }}
        itemActiveStyle={{ backgroundColor: 'blue' }}
        itemTitleStyle={{ color: '#333' }}
        itemActiveTitleStyle={{ color: 'red' }}
        itemIconStyle={{ tintColor: '#333' }}
        itemActiveIconStyle={{ tintColor: 'red' }}
        indicatorType={'custom'}
       
      >
        {pageData.map((item, index) => {
          let title = '';
          if (index === 0) {
            title = 'Scene';
          } else if (index === 1) {
            title = index;
          } else {
            title = 'Scene' + index;
          }
          return (
            <SegmentedScene
              key={index}
              itemTitle={title}
              itemIcon={Images.icon_toast_warn}
            >
              <FlatList
                keyExtractor={(item, index) => index + ''}
                data={data}
                renderItem={() => {
                  return <Text style={{ height: 50 }}>124</Text>;
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
