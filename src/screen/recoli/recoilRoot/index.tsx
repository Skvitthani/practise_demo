import {atom, selector} from 'recoil';

export const UserListState = atom({
  key: 'UserList',
  default: [],
});

const todoListFilterState = atom({
  key: 'TodoListFilter',
  default: 'Show All',
});

const filteredTodoListState = selector({
  key: 'FilteredTodoList',
  get: ({get}) => {
    const filter = get(todoListFilterState);
    const list = get(UserListState);

    switch (filter) {
      case 'Show Completed':
        return list.filter(item => item.isComplete);
      case 'Show Uncompleted':
        return list.filter(item => !item.isComplete);
      default:
        return list;
    }
  },
});
