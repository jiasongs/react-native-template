'use strict';
import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { NavigationBar, PageContainer, SegmentedView } from '../../components';

const data = [11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11];
const pageData = [
  { title: '' },
  { title: '' },
  { title: '' },
  { title: '' },
  { title: '' },
  { title: '' },
  { title: '' },
  { title: '' },
  { title: '' },
  { title: '' },
  { title: '' },
  { title: '' },
  { title: '' },
  { title: '' },
];

function DemoSegmented() {
  return (
    <PageContainer style={styles.container}>
      <NavigationBar title={'DemoSegmented'} />
      <SegmentedView>
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
              style={{}}
            >
              <FlatList
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
