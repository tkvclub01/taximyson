import React, { useState, useEffect, useContext } from 'react';
import { Registration } from '../components';
import { StyleSheet, View, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { language } from 'config';
import { FirebaseContext } from 'common/src';

export default function RegistrationPage(props) {
  const { api } = useContext(FirebaseContext);
  const {
    emailSignUp, 
    validateReferer,
    checkUserExists
  } = api;
  const [loading, setLoading] = useState(false);
  const cars = useSelector(state => state.cartypes.cars);
  const [carTypes, setCarTypes] = useState(null);
  const [commonAlert, setCommonAlert] = useState({ open: false, msg: '' });
  useEffect(() => {
    if (cars) {
      let arr = [];
      for (let i = 0; i < cars.length; i++) {
        arr.push({ label: language.ban_chay + ' ' + cars[i].name, value: cars[i].name });
      }
      setCarTypes(arr);
    }
  }, [cars]);

  const clickRegister = async (regData) => {
    setLoading(true);
    checkUserExists(regData).then((res)=>{
      if(res.users && res.users.length>0){
        setLoading(false);
        Alert.alert(language.alert,language.user_exists);
      }
      else if(res.error){
        setLoading(false);
        Alert.alert(language.alert,language.email_or_mobile_issue);
      }
      else{
        if (regData.referralId && regData.referralId.length > 0) {
          validateReferer(regData.referralId).then((referralInfo)=>{
            if (referralInfo.uid) {
              emailSignUp({...regData, signupViaReferral: referralInfo.uid}).then((res)=>{
                setLoading(false);
                if(res.uid){
                  Alert.alert(language.alert,language.account_create_successfully);
                  props.navigation.navigate('Login');
                }else{
                  setCommonAlert({ open: true, msg: language.reg_error });
                  Alert.alert(language.alert,language.reg_error);
                }
              })
            }else{
              setLoading(false);
              Alert.alert(language.alert,language.referer_not_found)
            }
          }).catch((error)=>{
            setLoading(false);
            Alert.alert(language.alert,language.referer_not_found)
          });
        } else {
          console.log(regData);
          emailSignUp(regData).then((res)=>{
            console.log(res);
            setLoading(false);
            if(res.uid){
              Alert.alert(language.alert,language.account_create_successfully);
              props.navigation.navigate('Login');
            }else{
              setCommonAlert({ open: true, msg: language.reg_error });
              Alert.alert(language.alert,language.reg_error);
            }
          })
        }
      }
    });
  }

  return (
    <View style={styles.containerView}>
      {carTypes?
      <Registration
        cars={carTypes}
        onPressRegister={(regData) => clickRegister(regData)}
        onPressBack={() => { props.navigation.goBack() }}
        loading={loading}>
      </Registration>
      :null}
    </View>
  );

}
const styles = StyleSheet.create({
  containerView: { flex: 1 },
  textContainer: { textAlign: "center" },
});
