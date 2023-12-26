import {Loadable, RecoilValue, WrappedValue, atom, selector} from 'recoil';

export const UserListState = atom({
  key: 'UserList',
  default: [],
});

interface PrevFilterData {
  minAge: null | number;
  maxAge: null | number;
}

export const ageFilterState = atom({
  key: 'ageFilterValue',
  default: {minAge: null, maxAge: null} as PrevFilterData,
});

export const todoListStatsState = selector({
  key: 'TodoListStats',
  get: ({get}) => {
    const userList = get(UserListState);
    const filterValue = get(ageFilterState) as PrevFilterData;

    const newData:
      | any[]
      | Promise<any[]>
      | RecoilValue<any[]>
      | Loadable<any[]>
      | WrappedValue<any[]> = [];

    if (filterValue?.maxAge !== null && filterValue?.minAge !== null) {
      const filterData = userList?.filter(
        item =>
          // @ts-ignore
          item?.age >= filterValue?.minAge && item?.age <= filterValue?.maxAge,
      );
      newData.push(...filterData);
    } else if (filterValue?.maxAge !== null) {
      const MaxAgeFilterdata = userList?.filter(
        // @ts-ignore
        item => item?.age > filterValue?.maxAge,
      );
      newData.push(...MaxAgeFilterdata);
    } else if (filterValue?.minAge !== null) {
      const minAgeFilterdata = userList?.filter(
        // @ts-ignore
        item => item?.age < filterValue?.minAge,
      );
      newData.push(...minAgeFilterdata);
    } else if (filterValue?.maxAge == null && filterValue?.minAge == null) {
      newData.push(...userList);
    }

    return {newData};
  },
});
