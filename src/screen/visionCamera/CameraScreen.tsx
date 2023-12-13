import {
  Text,
  View,
  Image,
  Pressable,
  StyleSheet,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import {
  Camera,
  VideoFile,
  PhotoFile,
  CameraDevice,
  useCameraDevice,
  TakePhotoOptions,
  useCameraPermission,
  useMicrophonePermission,
} from 'react-native-vision-camera';
import Video from 'react-native-video';
import ImageConst from '../../utils/ImageConst';
import React, {useEffect, useRef, useState} from 'react';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';

const CameraScreen = () => {
  const {
    hasPermission: cameraPermission,
    requestPermission: requestCameraPermission1,
  } = useCameraPermission();

  const {
    hasPermission: microphonePermission,
    requestPermission: requestMicrophonePermission1,
  } = useMicrophonePermission();
  const device = useCameraDevice('back');
  const camera = useRef<Camera>(null);

  const [photo, setPhoto] = useState<PhotoFile>();
  const [video, setVideo] = useState<VideoFile>();
  const [isRecording, setIsRecording] = useState(false);
  const [flash, setFlash] = useState<TakePhotoOptions['flash']>('off');

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message:
            'App needs camera permission for using camera and recording video.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
    } catch (err) {
      console.warn(err);
    }
  };
  const requestMicrophonePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Microphone Permission',
          message: 'App needs microphone permission for ABC functionality.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    if (!cameraPermission) {
      requestCameraPermission();
    }
  }, [cameraPermission]);

  if (!cameraPermission) {
    return <ActivityIndicator />;
  }

  const onTakePhoto = async () => {
    if (isRecording) {
      camera?.current?.stopRecording();
      return;
    }

    const photo = (await camera?.current?.takePhoto({
      flash: flash,
    })) as PhotoFile;
    await CameraRoll.save(`file://${photo.path}`, {
      type: 'photo',
    });
    setPhoto(photo);
  };

  const onRecodingPress = () => {
    if (!camera?.current) {
      return;
    }

    if (!microphonePermission) {
      requestMicrophonePermission();
    }

    setIsRecording(true);
    camera.current?.startRecording({
      onRecordingFinished: video => {
        setIsRecording(false);
        setVideo(video);
      },
      onRecordingError: error => {
        setIsRecording(false);
      },
    });
  };

  const renderImageView = () => {
    return (
      <View style={{flex: 1}}>
        <Image
          source={{uri: 'file://' + photo?.path}}
          style={StyleSheet.absoluteFillObject}
        />
        <Pressable
          style={styles.closeButton}
          onPress={() => {
            setPhoto(undefined);
          }}>
          <Text style={styles.closwButtonText}>Close</Text>
        </Pressable>
      </View>
    );
  };

  const renderVideoView = () => {
    return (
      <Video
        source={{uri: video?.path}}
        style={[StyleSheet.absoluteFillObject]}
        repeat={true}
        controls={true}
      />
    );
  };

  return (
    <View style={styles.container}>
      {photo && renderImageView()}
      {video && renderVideoView()}
      {!photo && !video && (
        <View style={{flex: 1}}>
          <Camera
            ref={camera}
            video={true}
            audio={true}
            photo={true}
            isActive={true}
            device={device as CameraDevice}
            style={StyleSheet.absoluteFill}
          />
          <Pressable
            style={styles.flashButton}
            onPress={() => {
              setFlash(prev => (prev == 'off' ? 'on' : 'off'));
            }}>
            {flash == 'off' ? (
              <Image
                source={ImageConst.flash_off}
                style={styles.flashImageStyle}
              />
            ) : (
              <Image
                source={ImageConst.flash_on}
                style={styles.flashImageStyle}
              />
            )}
          </Pressable>
          <Pressable
            onLongPress={onRecodingPress}
            onPress={onTakePhoto}
            style={[
              styles.buttonView,
              {backgroundColor: isRecording ? 'red' : 'white'},
            ]}
          />
        </View>
      )}
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonView: {
    width: 75,
    bottom: 50,
    height: 75,
    borderRadius: 75,
    alignSelf: 'center',
    position: 'absolute',
  },
  closeButton: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    position: 'absolute',
    backgroundColor: 'gray',
  },
  closwButtonText: {
    color: 'white',
  },
  flashButton: {
    top: 10,
    right: 10,
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.40)',
  },
  flashImageStyle: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
});
