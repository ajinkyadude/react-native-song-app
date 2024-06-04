import {
  Image,
  SafeAreaView,
  View,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import {ImagesConst} from '../Images';
import TrackPlayer, {
  Capability,
  State,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import {useEffect, useRef, useState} from 'react';
import {Music} from '../Assets';
import {MusicPlayList} from '../Constant';
import {Slider} from '@miblanchard/react-native-slider';

const MainView = (props: any) => {
  const {route, navigation} = props && props;
  const {params} = route && route;
  const {index, item} = params && params;

  useEffect(() => {
    navigation.setOptions({
      title: item.title,
    });
  }, []);
  const {width, height} = Dimensions.get('window');
  const progress = useProgress();

  let FlatListRef = useRef();
  const [currentSong, setCurrentSong] = useState(0);

  const playbackState = usePlaybackState();

  useEffect(() => {
    Helper();
  }, [index]);

  useEffect(() => {
    setTimeout(() => {
      FlatListRef?.current.scrollToIndex({animated: true, index: index});
    }, 200);
  }, [index]);

  const Helper = async () => {
    setCurrentSong(index);
    await TrackPlayer.skip(index);
    toggelSwitch(playbackState);
  };

  const previousHandler = async () => {
    if (currentSong > 0) {
      setCurrentSong(currentSong - 1);
      FlatListRef.current.scrollToIndex({
        animated: true,
        index: currentSong - 1,
      });
      await TrackPlayer.skipToPrevious();
      toggelSwitch(playbackState);
    }
  };

  const nextHandle = async () => {
    if (MusicPlayList.length - 1 > currentSong) {
      setCurrentSong(currentSong + 1);
      FlatListRef.current.scrollToIndex({
        animated: true,
        index: currentSong + 1,
      });
      await TrackPlayer.skipToNext();
      toggelSwitch(playbackState);
    }
  };
  const playHandle = async () => {
    toggelSwitch(playbackState);
  };
  const toggelSwitch = async (playbackState: any) => {
    if (
      playbackState.state == State.Paused ||
      playbackState.state == State.Ready
    ) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  };

  const RenderItem = ({item, index}: any) => {
    return (
      <Image
        source={item.artwork}
        style={{
          width: height * 0.38,
          height: height * 0.38,
          borderRadius: 10,
        }}
      />
    );
  };

  return (
    <SafeAreaView>
      <View
        style={{
          height: height * 0.5,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{width: height * 0.38, height: height * 0.38}}>
          <FlatList
            horizontal={true}
            pagingEnabled={true}
            data={MusicPlayList}
            ref={FlatListRef}
            renderItem={RenderItem}
            onScrollToIndexFailed={info => {
              const wait = new Promise(resolve => setTimeout(resolve, 500));
              wait.then(() => {
                FlatListRef.current?.scrollToIndex({ index: info.index, animated: true });
              });
            }}
          />
        </View>
      </View>
      <View style={{height: height * 0.5}}>
        <View style={{justifyContent: 'center', paddingHorizontal: 30}}>
          <View>
            <Slider
              value={progress.position}
              maximumValue={progress.duration}
              onValueChange={async (value: any) => {
                console.log(' value **', value);

                await TrackPlayer.seekTo(value[0]);
              }}
              minimumValue={0}
              thumbTintColor="black"
              thumbStyle={{width: 20, height: 20}}
            />
          </View>
          <Text>{progress.position}</Text>
        </View>

        <View
          style={{
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: height * 0.1,
          }}>
          <TouchableOpacity onPress={previousHandler}>
            <Text>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={playHandle}>
            <Text>Play</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={nextHandle}>
            <Text>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MainView;
