import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './home.scss'; 
import { SvgXml } from 'react-native-svg';
import base64 from 'react-native-base64'
import { LogoSvg } from '../../assets/files-svg';
import { useNavigation } from '@react-navigation/native';
import { RouteType } from '@/main/route/route';

function HomeScreen(): JSX.Element {

  const getbasse64svgimg: any= (svg: any):string =>{
    let finalbase64string = "";
    finalbase64string = "data:image/svg+xml;base64," + base64.decode(svg);
    return finalbase64string;
  }

  const LogoBase64 = getbasse64svgimg(LogoSvg);

  const navigation = useNavigation<RouteType>()

  return (
    <>
      <TouchableOpacity style={styles.background}  onPress={() => {navigation.navigate('Analysis')}} >
        <View>
          <Text style={styles.title}>ANALYZE</Text>
          <Text style={styles.title}>SOCCER</Text>
          <Text style={styles.title}>TEAMS</Text>
        </View>
        <View style={styles.boxCenter}>
          <SvgXml  style={styles.scoutLogo} xml={LogoBase64} />
        </View>
        <View style={styles.boxCenter}>
          <Text style={styles.text}>Continue with a touch</Text>
        </View>

      </TouchableOpacity>
    </>
  );
}

export default HomeScreen;
