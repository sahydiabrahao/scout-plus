import React from 'react';
import {ImageBackground, Text, View} from 'react-native';
import styles from './home.scss'; 
import { SvgXml } from 'react-native-svg';
import base64 from 'react-native-base64'
import { LogoSvg } from './assets/files-svg';

function HomeScreen(): JSX.Element {

  const getbasse64svgimg: any= (svg: any):string =>{
    let finalbase64string = "";
    finalbase64string = "data:image/svg+xml;base64," + base64.decode(svg);
    return finalbase64string;
  }

  const LogoBase64 = getbasse64svgimg(LogoSvg);

  return (
    <>
      <View style={styles.background}>
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
      </View>
    </>
  );
}

export default HomeScreen;
