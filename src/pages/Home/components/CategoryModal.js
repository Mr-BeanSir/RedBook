import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {
  Dimensions,
  Image,
  LayoutAnimation,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const CURRENT_WIDTH = Dimensions.get('window').width;

const CategoryModal = forwardRef((props, ref) => {
  const {categoryData} = props;
  const [visible, setVisible] = useState(true);
  const [MyItem, setMyItem] = useState([]);
  const [OtherItem, setOtherItem] = useState([]);

  const show = () => {
    setVisible(true);
  };
  const hide = () => {
    setVisible(false);
  };

  useImperativeHandle(ref, () => {
    return {show, hide};
  });

  useEffect(() => {
    if (!categoryData) {
      return;
    }
    console.log('数据更新');
    let a = categoryData.filter(item => item.isAdd);
    let b = categoryData.filter(item => !item.isAdd);
    setMyItem(a);
    setOtherItem(b);
  }, [categoryData]);

  useEffect(() => {
    console.log('MyItem updated:', MyItem);
  }, [MyItem]);

  const addItem = item => {
    setOtherItem(v => {
      v.splice(OtherItem.indexOf(item), 1);
      return [...v];
    });
    setMyItem(v => [...v, OtherItem[OtherItem.indexOf(item)]]);

    LayoutAnimation.easeInEaseOut();
  };

  const onOtherItemPress = useCallback(
    (item, index) => () => {
      const newOtherList = OtherItem.filter(i => i.name !== item.name);
      const copy = {...item, isAdd: true};
      const newMyList = [...MyItem, copy];

      LayoutAnimation.easeInEaseOut();
      setMyItem(newMyList);
      setOtherItem(newOtherList);
    },
    [MyItem, OtherItem],
  );

  const RenderOtherItem = () => {
    const itemStyles = StyleSheet.create({
      item: {
        backgroundColor: 'white',
        borderColor: 'rgb(227,227,227)',
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        paddingVertical: 7,
        width: (CURRENT_WIDTH - 16 * 5) / 4,
      },
    });

    return (
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
        {OtherItem.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={onOtherItemPress(item, index)}
              activeOpacity={0.5}
              key={item.name}
              style={[
                itemStyles.item,
                (index + 1) % 4 !== 0 && {marginRight: 16},
                {
                  flexDirection: 'row',
                },
              ]}>
              <Text style={{fontSize: 16, color: 'rgb(154,154,154)', top: -1}}>
                +{' '}
              </Text>
              <Text style={{color: 'rgb(99,99,99)'}}>{item.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const RenderItem = () => {
    const itemStyles = StyleSheet.create({
      item: {
        backgroundColor: 'white',
        borderColor: 'rgb(227,227,227)',
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        paddingVertical: 7,
        width: (CURRENT_WIDTH - 16 * 5) / 4,
      },
    });

    return (
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
        {MyItem.map((item, index) => {
          return (
            <TouchableOpacity
              key={item.name}
              style={[
                itemStyles.item,
                (index + 1) % 4 !== 0 && {marginRight: 16},
              ]}>
              <Text style={{color: 'rgb(99,99,99)'}}>{item.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  console.log('父组件更新');
  return (
    <Modal
      style={styles.container}
      transparent={true}
      statusBarTranslucent={true}
      animationType={'fade'}
      visible={visible}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 16,
                marginRight: 16,
              }}>
              我的频道
            </Text>
            <Text>点击进入频道</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              style={{
                paddingHorizontal: 10,
                paddingVertical: 2,
                borderRadius: 10,
                backgroundColor: 'rgb(245,245,245)',
                marginRight: 16,
              }}>
              <Text style={{fontSize: 14, color: 'rgb(92,145,226)'}}>
                进入编辑
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                hide();
              }}>
              <Image
                source={require('../../../assets/icon_arrow.png')}
                style={{
                  width: 16,
                  height: 16,
                  transform: [{rotate: '90deg'}],
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <RenderItem />
        {RenderItem()}
        <View style={styles.header}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 16,
                marginRight: 16,
              }}>
              推荐频道
            </Text>
            <Text>点击添加频道</Text>
          </View>
        </View>
        {RenderOtherItem()}
      </ScrollView>
      <View
        style={{
          backgroundColor: 'rgba(0,0,0,0.5)',
          width: '100%',
          flex: 1,
        }}
      />
    </Modal>
  );
});

const styles = StyleSheet.create({
  header: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',

    paddingBottom: 16,
    paddingTop: 16,
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  content: {
    width: '100%',
    backgroundColor: 'white',
    marginTop: 48 + (StatusBar.currentHeight || 0),
    paddingBottom: 40,
    paddingHorizontal: 16,
    height: '70%',
  },
});
export default CategoryModal;
