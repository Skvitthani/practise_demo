import React from 'react';
import {useSelector} from 'react-redux';

import {FlatList, StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationType} from '../../navigation';

type PrivateDetailScreen = NativeStackScreenProps<
  NavigationType,
  'PrivateDetailScreen'
> & {
  navigation: () => void;
};

interface RootState {
  user: {
    userData: any;
  };
}

interface flatListItem {
  age: string;
  name: string;
  city: string;
}

const PrivateDetailScreen: React.FC<PrivateDetailScreen> = () => {
  const data = useSelector((state: RootState) => state?.user?.userData);

  const renderItem = ({item}: {item: flatListItem}) => {
    return (
      <View style={styles.renderItemView}>
        <Text style={styles.textStyle}>{`Name  : ${item?.name}`}</Text>
        <Text style={styles.textStyle}>{`City      : ${item?.city}`}</Text>
        <Text style={styles.textStyle}>{`Age      : ${item?.age}`}</Text>
      </View>
    );
  };

  const ListEmptyComponent = () => {
    return (
      <View style={styles.emptyView}>
        <Text style={styles.noDataText}>No Data Found</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{flex: 1}}
        data={data}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyComponent}
      />
    </View>
  );
};

export default PrivateDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  renderItemView: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#1B4242',
  },
  textStyle: {
    color: 'white',
  },
  buttonView: {
    marginBottom: 50,
  },
  emptyView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noDataText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
});
