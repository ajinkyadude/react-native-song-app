import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TrackPlayer, {
  usePlaybackState,
  State,
  Capability,
} from 'react-native-track-player';
import { MusicPlayList } from '../Constant';
import { useEffect } from 'react';

const SongContainer = ({navigation}: any) => {

  useEffect(() => {
    SetUp();
  }, []);

  const SetUp = async () => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
          Capability.SeekTo,
          Capability.Skip,
        ],

        // Capabilities that will show up when the notification is in the compact form on Android
        compactCapabilities: [Capability.Play, Capability.Pause],
      });
      await TrackPlayer.add(MusicPlayList);
    } catch (e) {}
  };

  const stop = async () => {
    await TrackPlayer.pause();
  };

  const Play = async () => {
    await TrackPlayer.play();
  };

  const toggelSwitch = async (playbackState: any) => {
    console.log(' playback state  ', playbackState);

    if (
      playbackState.state == State.Paused ||
      playbackState.state == State.Ready
    ) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  };

  const navigateHandle = (index: number, item: object) => {
    navigation.navigate('mainImage', {index: index, item: item});
  };

  return (
    <SafeAreaView>
      <FlatList
        data={MusicPlayList}
        renderItem={({item, index}: any) => {
          return (
            <TouchableOpacity
              style={{alignItems: 'center', justifyContent: 'center'}}
              onPress={() => navigateHandle(index,item)}>
              <View
                style={{
                  marginVertical: 10,
                  backgroundColor: '#FFFFFF',
                  padding: 20,
                  width: '90%',
                }}>
                <Text>{item?.title}</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '90%',
                    justifyContent: 'space-around',
                  }}>
                  {/* <TouchableOpacity
                  onPress={() => {
                    // Play();
                    toggelSwitch(playbackState);
                  }}>
                  <Text>Play</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    toggelSwitch(playbackState);
                  }}>
                  <Text>Stop</Text>
                </TouchableOpacity> */}
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default SongContainer;
