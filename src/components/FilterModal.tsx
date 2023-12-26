import {
  View,
  Text,
  Modal,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import ButtonComp from './ButtonComp';
import {useSetRecoilState} from 'recoil';
import {ageFilterState} from '../screen/recoli/recoilRoot';

const {width} = Dimensions.get('window');

interface FilterModal {
  setIsVisible: any;
  modalVisible?: boolean;
  onRequestClose?: () => void;
}
interface items {
  id: number;
  title: string;
  minAge: number | null;
  maxAge: number | null;
}

interface prevFilterData {
  minAge: null | number;
  maxAge: null | number;
}

const FilterModal = ({
  modalVisible,
  onRequestClose,
  setIsVisible,
}: FilterModal) => {
  const ageData = [
    {
      id: 1,
      title: 'less then 15',
      minAge: 15,
      maxAge: null,
    },
    {
      id: 2,
      title: '15 - 20',
      minAge: 15,
      maxAge: 20,
    },
    {
      id: 3,
      title: '21 - 25',
      minAge: 21,
      maxAge: 25,
    },
    {
      id: 4,
      title: '26 - 30',
      minAge: 26,
      maxAge: 30,
    },
    {
      id: 5,
      title: '30 or above',
      minAge: null,
      maxAge: 30,
    },
  ];

  const [selectedFilter, setSelectedFilter] = useState<items | null>(null);

  const setFilterData = useSetRecoilState(ageFilterState);

  const onAgeSelect = (item: items) => {
    setFilterData(
      (prevFilterData): prevFilterData => ({
        ...prevFilterData,
        minAge: item?.minAge,
        maxAge: item?.maxAge,
      }),
    );
    setIsVisible(false);
    setSelectedFilter(item);
  };

  const onResetPress = () => {
    setFilterData(
      (prevFilterData): prevFilterData => ({
        ...prevFilterData,
        minAge: null,
        maxAge: null,
      }),
    );
    setSelectedFilter(null);
    setIsVisible(false);
  };
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={modalVisible}
      onRequestClose={onRequestClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.ageContainer}>
            {ageData?.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.ageItems,
                    {
                      backgroundColor:
                        selectedFilter?.id == item.id ? 'lightblue' : 'blue',
                    },
                  ]}
                  onPress={() => {
                    onAgeSelect(item);
                  }}>
                  <Text style={styles.ageText}>{item?.title}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          {selectedFilter && (
            <ButtonComp title="Reset" onPress={onResetPress} />
          )}
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  modalView: {
    margin: 20,
    padding: 35,
    borderRadius: 20,
    width: width - 20,
    backgroundColor: 'white',

    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
    shadowRadius: 4,
    shadowOpacity: 0.25,
  },

  ageItems: {
    padding: 7,
    marginTop: 10,
    borderRadius: 10,
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  ageContainer: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginBottom: 15,
  },
  ageText: {
    fontSize: 15,
    color: 'white',
  },
});
