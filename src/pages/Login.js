import React, {useState} from 'react';
import {
  Animated,
  Image,
  LayoutAnimation,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const Login = () => {
  const [select, setSelect] = useState(false);
  const [type, setType] = useState('quick');

  const quickLogin = () => {
    const styles = StyleSheet.create({
      acceptText: {
        paddingLeft: 10,
        flex: 1,
      },
      acceptImg: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
      },
      accept: {
        position: 'absolute',
        bottom: 25,
        width: '70%',
        flexDirection: 'row',
        justifyContent: 'center',
      },
      otherLoginImg: {
        width: 10,
        height: 10,
        transform: [
          {
            rotate: '180deg',
          },
        ],
      },
      otherLoginText: {
        color: 'black',
        fontSize: 14,
      },
      otherLogin: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: 20,
        flexDirection: 'row',
      },
      wxLoginText: {
        color: 'white',
        fontSize: 16,
        marginLeft: 5,
      },
      wxLoginImg: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
      },
      wxLogin: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'rgb(2,183,84)',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 50,
        paddingVertical: 11,
        borderRadius: 25,
        marginTop: 20,
      },
      activeContainer: {
        width: '70%',
      },
      quickLoginText: {
        color: 'white',
        fontSize: 16,
      },
      quickLogin: {
        width: '100%',
        backgroundColor: 'rgb(254,31,56)',
        paddingHorizontal: 50,
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
      },
      main: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },
      mainImg: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        marginBottom: 70,
        marginTop: -50,
      },
    });
    return (
      <View style={styles.main}>
        <Image
          style={styles.mainImg}
          source={require('../assets/icon_main_logo.png')}
        />
        <View style={styles.activeContainer}>
          <TouchableOpacity style={styles.quickLogin} activeOpacity={0.5}>
            <Text style={styles.quickLoginText}>一键登录</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.wxLogin} activeOpacity={0.5}>
            <Image
              style={styles.wxLoginImg}
              source={require('../assets/icon_wx.png')}
            />
            <Text style={styles.wxLoginText}>微信登录</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.otherLogin}
            onPress={() => {
              LayoutAnimation.easeInEaseOut();
              type === 'quick' ? setType('other') : setType('quick');
            }}>
            <Text style={styles.otherLoginText}>其他方式登录 </Text>
            <Image
              style={styles.otherLoginImg}
              source={require('../assets/icon_arrow.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.accept}>
          <TouchableOpacity
            style={styles.acceptImgContainer}
            onPress={() => {
              setSelect(!select);
            }}
            activeOpacity={0.5}>
            <Image
              source={
                select
                  ? require('../assets/icon_selected.png')
                  : require('../assets/icon_unselected.png')
              }
              style={styles.acceptImg}
            />
          </TouchableOpacity>
          <Text style={styles.acceptText}>
            我已阅读并同意《用户协议》《隐私政策》《儿童或青少年信息保护规则》
          </Text>
        </View>
      </View>
    );
  };

  const otherLogin = () => {
    const other = StyleSheet.create({
      main: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'white',
      },
      closeImg: {
        width: 36,
        height: 36,
        resizeMode: 'contain',
      },
      otherContainer: {
        paddingTop: 36,
        width: '83%',
        alignItems: 'center',
      },
      title: {
        fontWeight: 'bold',
        fontSize: 30,
        color: 'black',
        marginBottom: 5,
      },
      phoneInputContainer: {
        width: '100%',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        flexDirection: 'row',
        alignItems: 'center',
      },
      phoneInput: {
        fontSize: 20,
        paddingLeft: 15,
      },
      quhao: {
        fontSize: 26,
        lineHeight: 28,
      },
      phoneImg: {
        width: 13,
        height: 13,
        resizeMode: 'contain',
      },
    });
    return (
      <View style={other.main}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            setType('quick');
          }}>
          <Image
            style={other.closeImg}
            source={require('../assets/icon_close_modal.png')}
          />
        </TouchableOpacity>
        <View style={other.otherContainer}>
          <Text style={other.title}>密码登录</Text>
          <Text>未注册的手机号登录成功后将自动注册</Text>
          <View style={other.phoneInputContainer}>
            <Text style={other.quhao}>{`86+ `}</Text>
            <Image
              style={other.phoneImg}
              source={require('../assets/icon_triangle.png')}
            />
            <TextInput
              style={other.phoneInput}
              placeholder="请输入手机号"
              placeholderTextColor="grey"
              keyboardType="numeric"
            />
          </View>
        </View>
      </View>
    );
  };

  return type === 'quick' ? quickLogin() : otherLogin();
};

export default Login;
