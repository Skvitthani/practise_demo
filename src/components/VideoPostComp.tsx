import Video from 'react-native-video';
import React, {memo, useEffect, useRef, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {Image} from 'react-native';
import ImageConst from '../utils/ImageConst';

interface Videodata {
  Videodata: {
    id: number;
    video: string;
    caption: string;
  };
  activeId: number;
}

const VideoPostComp = ({Videodata, activeId}: Videodata) => {
  const {height} = useWindowDimensions();

  const videoRef = useRef(null);
  const [playPause, setPlayPause] = useState(false);

  useEffect(() => {
    if (activeId !== Videodata?.id) {
      setPlayPause(true);
    }
    if (activeId === Videodata?.id) {
      setPlayPause(false);
    }
  }, [activeId, videoRef.current]);

  const onPress = () => {
    if (!videoRef.current) {
      return;
    }
    setPlayPause(!playPause);
  };

  return (
    <View style={{height: height}}>
      <Video
        repeat
        ref={videoRef}
        resizeMode="cover"
        paused={playPause}
        source={{uri: Videodata?.video}}
        style={[StyleSheet.absoluteFill]}
      />

      {playPause && (
        <Image source={ImageConst.play} style={styles.playButton} />
      )}
      <Pressable onPress={onPress} style={styles.content}>
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={[StyleSheet.absoluteFillObject, styles.overLay]}
        />

        <SafeAreaView style={{flex: 1}}>
          <View style={styles.footer}>
            <View style={styles.leftView}>
              <Text style={styles.caption}>{Videodata?.caption}</Text>
            </View>

            <View style={styles.rigthColumn}>
              <Image source={ImageConst.heart} style={styles.imageStyle} />
              <Image source={ImageConst.share} style={styles.imageStyle} />
              <Image source={ImageConst.bookmark} style={styles.imageStyle} />
            </View>
          </View>
        </SafeAreaView>
      </Pressable>
    </View>
  );
};

export default memo(VideoPostComp);

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 10,
  },
  footer: {
    marginTop: 'auto',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  caption: {
    fontSize: 18,
    color: 'white',
  },
  rigthColumn: {
    gap: 20,
  },
  leftView: {
    flex: 1,
  },
  overLay: {
    top: '50%',
  },
  imageStyle: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  },
  playButton: {
    width: 75,
    height: 75,
    top: '50%',
    alignSelf: 'center',
    position: 'absolute',
    tintColor: 'rgba(255,255,255,0.6)',
  },
});
