import React, {useState} from 'react';
import {
  Image,
  LayoutAnimation,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {FormatPhone} from '../utils/PhoneUtil';
import {easyRequest} from '../utils/RequestUtil';
import Apis from '../utils/ApiTypeUtil';
import UserStore from '../store/UserStore';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const navigate = useNavigation();

  const [select, setSelect] = useState(false);
  const [type, setType] = useState('quick');
  const [hidePassword, setHidePassword] = useState(true);
  const [phone, setPhone] = useState('12345678901');
  const [password, setPassword] = useState('123456');
  const onLoginClick = async () => {
    const params = {
      name: 'dagongjue',
      pwd: '123456',
    };
    let res;
    try {
      res = await easyRequest(Apis.login, params);
    } catch (e) {
      ToastAndroid.show('登录失败', ToastAndroid.SHORT);
      return;
    }
    if (res.data) {
      UserStore.setUserInfo(res.data);
      LayoutAnimation.easeInEaseOut();
      navigate.replace('HomeTab');
    }
  };
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
    const canLogin =
      phone.replaceAll(' ', '').length === 11 && password.length >= 6;
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
        marginTop: 20,
      },
      phoneInput: {
        fontSize: 20,
        paddingLeft: 15,
      },
      quhao: {
        fontSize: 23,
        lineHeight: 28,
      },
      phoneImg: {
        width: 13,
        height: 13,
        resizeMode: 'contain',
      },
      passwordInputContainer: {
        width: '100%',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      passwordInput: {
        fontSize: 20,
        flex: 1,
      },
      jumpType: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      jumpTypeLeft: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      jumpTypeLeftText: {
        color: 'rgb(15,45,98)',
        marginLeft: 3,
      },
      jumpTypeLeftImg: {
        width: 20,
        resizeMode: 'contain',
      },
      jumpTypeRight: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      loginButton: {
        width: '100%',
        height: 45,

        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
      },
      loginButtonText: {
        fontSize: 20,
        color: 'white',
      },
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
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
      },
      socialLogin: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
      },
      socialLoginImg: {
        width: 50,
        resizeMode: 'contain',
      },
      loginButtonNo: {
        backgroundColor: '#333',
      },
    });
    return (
      <View style={other.main}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            LayoutAnimation.easeInEaseOut();
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
              maxLength={13}
              onChangeText={v => {
                v = FormatPhone(v);
                console.log(v);
                setPhone(v);
              }}
              value={phone}
            />
          </View>
          <View style={other.passwordInputContainer}>
            <TextInput
              style={other.passwordInput}
              placeholder="请输入密码"
              placeholderTextColor="grey"
              secureTextEntry={hidePassword}
              value={password}
              onChangeText={v => {
                setPassword(v);
              }}
            />
            <TouchableOpacity
              onPress={() => {
                setHidePassword(!hidePassword);
              }}>
              <Image
                style={{
                  width: 30,
                  height: 30,
                  resizeMode: 'contain',
                }}
                source={
                  hidePassword
                    ? require('../assets/icon_eye_close.png')
                    : require('../assets/icon_eye_open.png')
                }
              />
            </TouchableOpacity>
          </View>
          <View style={other.jumpType}>
            <TouchableOpacity style={other.jumpTypeLeft}>
              <Image
                style={other.jumpTypeLeftImg}
                source={require('../assets/icon_exchange.png')}
              />
              <Text style={other.jumpTypeLeftText}>验证码登录</Text>
            </TouchableOpacity>
            <TouchableOpacity style={other.jumpTypeRight}>
              <Text style={other.jumpTypeLeftText}>忘记密码?</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            disabled={!canLogin}
            activeOpacity={0.5}
            onPress={onLoginClick}
            style={[
              other.loginButton,
              {
                backgroundColor: !canLogin
                  ? 'rgb(216,216,215)'
                  : 'rgb(255,36,66)',
              },
            ]}>
            <Text style={other.loginButtonText}>登 录</Text>
          </TouchableOpacity>
          <View style={other.accept}>
            <TouchableOpacity
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
                style={other.acceptImg}
              />
            </TouchableOpacity>
            <Text style={other.acceptText}>
              我已阅读并同意《用户协议》《隐私政策》《儿童或青少年信息保护规则》
            </Text>
          </View>
          <View style={other.socialLogin}>
            <TouchableOpacity activeOpacity={0.5}>
              <Image
                style={other.socialLoginImg}
                source={require('../assets/icon_wx.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5}>
              <Image
                style={other.socialLoginImg}
                source={require('../assets/icon_qq.webp')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return type === 'quick' ? quickLogin() : otherLogin();
};

export default Login;
