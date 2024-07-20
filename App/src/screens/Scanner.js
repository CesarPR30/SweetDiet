import { CameraView, useCameraPermissions, Camera } from 'expo-camera';
import { useState, useRef, useEffect } from 'react';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; 
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image } from 'react-native';
import axios from 'axios';

export default function Scanner() {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [hasPermission, setHasPermission] = useState(null);
  const [image, setImage] = useState(null);
  const cameraRef = useRef(null);
  const [serverResponse, setServerResponse] = useState('');
  const navigation = useNavigation();

  if (hasPermission === false) {
    return (<Nopermission />);
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const options = { quality: 1, base64: true };
        const data = await cameraRef.current.takePictureAsync(options);
        console.log(data.uri);
        setImage(data.uri);
        sendPicture(data);
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  };

  const sendPicture = async (data) => {
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: data.uri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });

      const response = await axios.post('http://192.168.18.7:5001/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const trimmedResult = response.data.result.trim();
      if (trimmedResult === 'Producto Apto' || trimmedResult === 'Producto Apto.') {
        setServerResponse('Producto Apto');
      } else {
        setServerResponse(trimmedResult);
      }
    } catch (error) {
      console.error('Error sending picture:', error);
      Alert.alert('Error', 'Error sending picture: ' + error.message);
    }
  };

  const handleBack = () => {
    if (image) {
      setServerResponse('');
      setImage(null);
    } else {
      // If no photo is taken, navigate to the home screen
      navigation.navigate('Inicio');
    }
  };

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack}>
            <Ionicons name="close-sharp" size={35} color="#fff" />
          </TouchableOpacity>
        </View>
        {hasPermission && !image ? (
          <CameraView style={styles.camera} type={facing} ref={cameraRef}>
            {serverResponse ? (
              <View style={styles.responseContainer}>
                <View style={styles.responseContent}>
                  <Image
                    source={
                      serverResponse === 'Producto Apto'
                        ? require('../assets/check-removebg.png')
                        : require('../assets/xmark-removebg.png')
                    }
                    style={styles.checkIcon}
                  />
                  <Text style={styles.responseText}>{serverResponse}</Text>
                </View>
              </View>
            ) : null}
          </CameraView>
        ) : (
          image && (
            <View style={styles.camera}>
              <Image source={{ uri: image }} style={styles.image} />
              {serverResponse ? (
                <View style={styles.responseContainer}>
                  <View style={styles.responseContent}>
                    <Image
                      source={
                        serverResponse === 'Producto Apto'
                          ? require('../assets/check-removebg.png')
                          : require('../assets/xmark-removebg.png')
                      }
                      style={styles.checkIcon}
                    />
                    <Text style={styles.responseText}>{serverResponse}</Text>
                  </View>
                </View>
              ) : null}
            </View>
          )
        )}
      </View>
      <View style={styles.controlsContainer}>
        <View style={styles.controls}>
          <TouchableOpacity 
            onPress={takePicture} 
            style={[styles.captureButton, { opacity: image ? 0.5 : 1 }]}
            disabled={!!image}
          >
            <View style={styles.captureInnerButton} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
  },
  cameraContainer: {
    flex: 1,
    borderRadius: 25,
    overflow: 'hidden',
    borderColor: '#fff',
    borderWidth: 0,
    margin: 0,
  },
  camera: {
    flex: 1,
    position: 'relative',
  },
  image: {
    flex: 1,
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingVertical: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    height: 40,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 10,
  },
  captureButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C3EBBD',
    height: 80,
    width: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#C3EBBD',
  },
  captureInnerButton: {
    height: 60,
    width: 60,
    backgroundColor: '#91C788',
    borderRadius: 30,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  retakeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    width: 80,
  },
  retakeIcon: {
    height: 40,
    width: 40,
  },
  responseContainer: {
    position: 'absolute',
    top: '40%',
    left: '10%',
    right: '10%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  responseContent: {
    alignItems: 'center',
  },
  responseText: {
    fontSize: 18,
    color: '#000',
    marginTop: 10,
  },
  checkIcon: {
    width: 40,
    height: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: 'transparent', // Transparent background
    borderBottomWidth: 0, // Remove border
    width: '100%',
    position: 'absolute', // Position absolutely within camera container
    top: '1%',
    zIndex: 1, // Ensure header is above other content
  },
  headerText: { // Added
    color: '#fff', // Added
    fontSize: 20, // Added
    marginLeft: 16, // Added
  },
});