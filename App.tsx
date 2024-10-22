import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native';
import {Image} from 'react-native';
import {Button} from 'react-native';
import {StyleSheet} from 'react-native';
import InTrack from 'intrack-react-native-bridge';

const MyComponent: React.FC = () => {
  const [inTrackIDText, setInTrackIDText] = useState('inTrackID');
  const handleEventTrigger = () => {
    console.log("'intrack_engagement_party' event clicked!");
    // Record intrack_engagement_party event
    InTrack.sendEvent({
      eventName: 'intrack_engagement_party_custom',
    });
  };

  const initIntrack = async () => {
    // if (!(await InTrack.isInitialized())) {
    const options = {
      appKey: 'AAAAAg',
      iosAuthKey: 'ّeb1c4f83-78c6-43cb-aa6a-9744d4f95cc6',
      androidAuthKey: '562f902b-5145-42a0-a5ab-61046179e018',
      loggingEnabled: true,
      enableInAppMessaging: true,
      // inAppDefaultTheme: {
      //   titleColor: '#000000',
      //   descriptionColor: '#000000',
      //   bgColor: '#ffffff',
      //   actionLabelColor: '#000000',
      //   actionBgColor: '#ffffff',
      // },
    };
    await InTrack.init(options);
    InTrack.start();
    //  }
  };

  useEffect(() => {
    initIntrack();
    InTrack.getDeviceId((deviceId: string) => {
      setInTrackIDText('DeviceID:' + deviceId);
      console.log('DeviceID: ' + deviceId);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('./src/ic_launcher_adaptive_fore.png')}
        style={styles.image}
      />
      <Text style={styles.text}>
        Welcome to the InTrack In-App Messaging Quickstart app. Press the button
        to trigger an analytics events!
      </Text>
      <Text style={styles.installationIdText}>{inTrackIDText}</Text>
      <View style={styles.eventTriggerButton}>
        <Button
          title="Trigger intrack_engagement_party event"
          onPress={handleEventTrigger}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '30%',
    height: '30%',
    marginVertical: 8,
  },
  text: {
    fontSize: 18,
    marginVertical: 8,
  },
  installationIdText: {
    fontSize: 18,
    marginVertical: 8,
  },
  eventTriggerButton: {
    marginVertical: 8,
    padding: 10,
    borderRadius: 10,
  },
});

export default MyComponent;
