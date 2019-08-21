import React, { useRef, useMemo, useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
import { PageContainer, ListRow, ActionManager, NavigationBar, Checkbox, Picker, ToastManager, AlertManager } from '../../components';
import { Theme } from '../../config/themes';

function Father(props) {
  console.log('Father');
  return props.render;
}

const MemoFather = React.memo(Father);

function Child(props) {

  const ButtonTest = useMemo(() => {
    console.log('build_Child');
    return null;
  }, []);

  console.log('Child');
  return <Text style={{}}>{ButtonTest}</Text>;

}

const MemoChild = React.memo(Child);

function Example() {

  const [count, setCount] = useState(0);
  const [state, setState] = useState(false);
  const [dataSource, setDataSource] = useState([
    { title: '123' },
    { title: '567' },
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);


  useEffect(() => {
    // const z = setInterval(() => {
    //   setCount((pre) => {
    //     return pre + 1;
    //   });
    // }, 1000);
    // return () => {
    //   clearInterval(z);
    // };
  }, []);

  const ButtonTest = useMemo((props) => {
    console.log('build');
    return <Text style={{}}>{''}</Text>;
  }, []);

  const size = 12;

  const onPress = useCallback(() => { }, []);

  const onChange = useCallback((value, index) => {
    console.log('renderLabelString', value);
    return value.title;
  }, []);

  return (
    <PageContainer style={styles.container}>
      <NavigationBar title={'13'} />
      <Text >{count}</Text>
      <MemoFather render={ButtonTest} />
      <ListRow
        title={<Text>321</Text>}
        onPress={() => {
          const com = (
            <View style={{
              width: 375,
              height: 200,
              backgroundColor: '#fff',
            }}>

            </View>
          );
          ActionManager.showView(com, {
            side: 'bottom',
            // containerStyle: { flex: 1, justifyContent: 'center', alignItems: 'center', },
          });
          // AlertManager.show({
          //   title: '123',
          //   // detail: <KeyboardAvoidingView ><TextInput placeholder={'123'} /></KeyboardAvoidingView>,
          //   onPress: () => { AlertManager.hide(); },
          //   actions: [{ title: '123' }],
          //   option: { type: 'zoomOut', }
          // });
          // ActionManager.show({
          //   title: '123',
          //   onPress: () => { ActionManager.hide(); },
          //   actions: [{ title: '123' }]
          // });
        }}
      />
      <Checkbox
        style={{ backgroundColor: 'blue' }}
      />
      <Picker
        style={{ width: 375 }}
        selectedIndex={selectedIndex}
        onValueChange={(value, valueIndex) => {
          console.log('onValueChange', value);
          setSelectedIndex(valueIndex);
        }}
        data={dataSource}
        renderLabelString={onChange}
      />
    </PageContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default Example;