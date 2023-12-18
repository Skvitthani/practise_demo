import {create} from 'zustand';

type State = {
  userData: data[];
};

type data = {
  email: string | number;
  password: string | number;
};

type Actions = {
  addData: (newData: data) => void;
  reset: () => void;
};

const initialState: State = {
  userData: [],
};

export const usedataStore = create<State & Actions>()((set, get) => ({
  ...initialState,
  addData: (newData: data) => {
    set(state => ({userData: [...state.userData, newData]}));
  },
  getUserData: () => {
    const state = get();
    return state.userData;
  },
  reset: () => {
    set(initialState);
  },
}));
