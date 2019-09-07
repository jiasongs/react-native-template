'use strict';
import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { NavigationBar, PageContainer, SegmentedView } from '../../components';
import { Images } from '../../assets';
import DemoList from './DemoList';

const data = [...new Array(30)];
const pageData = [...new Array(30)];

function DemoSegmented() {
  return (
    <PageContainer style={styles.container}>
      <NavigationBar title={'DemoSegmented'} />
      <SegmentedView indicatorStyle={{}}>
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
            <SegmentedView.Scene
              key={index}
              itemKey={index}
              title={title}
              icon={Images.icon_toast_warn}
              style={{}}
            >
              <DemoList
                keyExtractor={(item, index) => index + ''}
                data={data}
                renderItem={() => {
                  return <Text style={{ height: 50 }}>124</Text>;
                }}
              />
            </SegmentedView.Scene>
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
