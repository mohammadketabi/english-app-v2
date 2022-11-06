import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_CARD_BEGIN,
  CREATE_CARD_SUCCESS,
  CREATE_CARD_ERROR,
  GET_CARDS_BEGIN,
  GET_CARDS_SUCCESS,
  SET_EDIT_CARD,
  DELETE_CARD_BEGIN,
  EDIT_CARD_BEGIN,
  EDIT_CARD_SUCCESS,
  EDIT_CARD_ERROR,
} from "./actions";

import { initialState } from "./appContext";

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertText: "Please provide all fields!",
      alertType: "danger",
    };
  }

  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertText: "",
      alertType: "",
    };
  }

  if (action.type === SETUP_USER_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: true,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      showAlert: true,
      alertType: "success",
      alertText: action.payload.alertText,
    };
  }

  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    };
  }

  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
      userLocation: "",
      jobLocation: "",
    };
  }

  if (action.type === UPDATE_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      showAlert: true,
      alertType: "success",
      alertText: "User Profile Updated!",
    };
  }
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === HANDLE_CHANGE) {
    return { ...state, [action.payload.name]: action.payload.value };
  }

  if (action.type === CLEAR_VALUES) {
    const initialState = {
      isEditing: false,
      editCardId: "",
      word: "",
      definition: "",
      type: "noun",
      exampleOne: "",
      exampleTwo: "",
      status: "review",
    };
    return { ...state, ...initialState };
  }

  if (action.type === CREATE_CARD_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === CREATE_CARD_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "New Card Created!",
    };
  }
  if (action.type === CREATE_CARD_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === GET_CARDS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_CARDS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      cards: action.payload.cards,
      totalCards: action.payload.totalCards,
      numOfPages: action.payload.numOfPages,
    };
  }

  if (action.type === SET_EDIT_CARD) {
    const card = state.cards.find((card) => card._id === action.payload.id);
    const { _id, word, definition, exampleOne, exampleTwo, type, status } =
      card;
    return {
      ...state,
      isEditing: true,
      editCardId: _id,
      word,
      definition,
      exampleOne,
      exampleTwo,
      type,
      status,
    };
  }

  if (action.type === DELETE_CARD_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === EDIT_CARD_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === EDIT_CARD_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Card Updated!",
    };
  }
  if (action.type === EDIT_CARD_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  throw new Error(`no such action: ${action.type}`);
};

export default reducer;
