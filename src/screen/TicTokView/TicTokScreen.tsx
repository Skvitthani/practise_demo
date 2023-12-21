import React, {useEffect, useRef, useState} from 'react';
import Videodata from '../../utils/DummyVideoData';
import VideoPostComp from '../../components/VideoPostComp';
import {FlatList, StatusBar, StyleSheet, View, ViewToken} from 'react-native';

const TicTokScreen = () => {
  const [activePostId, setActivePostId] = useState(Videodata[0]?.id);
  const [post, setPost] = useState<typeof Videodata>([]);

  useEffect(() => {
    const fetchPost = async () => {
      setPost(Videodata);
    };

    fetchPost();
  }, []);

  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});
  const onViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      if (viewableItems?.length > 0 && viewableItems[0]?.isViewable) {
        setActivePostId(viewableItems[0]?.item?.id);
      }
    },
  );
  const onEndReached = () => {
    setPost(prev => [...prev, ...Videodata]);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'transparent'}
        translucent
      />
      <FlatList
        testID="List_Data_FlatList"
        data={post}
        renderItem={({item}) => (
          <VideoPostComp
            // videoViewTestId="video_view_compo"
            Videodata={item}
            activeId={activePostId}
          />
        )}
        pagingEnabled
        onEndReachedThreshold={3}
        onEndReached={onEndReached}
        showsVerticalScrollIndicator={false}
        viewabilityConfig={viewConfigRef.current}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        onViewableItemsChanged={onViewableItemsChanged.current}
      />
    </View>
  );
};

export default TicTokScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
