import axios from 'axios';
import {router} from "../../main";

const state = {
  userData: JSON.parse(localStorage.getItem('userData')),
  login_dialog: false,
  error: null
};

const getters = {
  userData: (state) => state.userData,
  error: (state) => state.error,
  authStatus: (state) => state.userData !== null,
  loginDialogStatus: (state) => state.login_dialog,
};

const actions = {
  async login({commit}, credentials) {
    await axios.post("/api/login", credentials, {withCredentials: true}).then(response => {
      // console.log(response.data);
      const data = response.data;
      if (data['message'] === "SUCCESS") {
        console.log(data['userData']);
        localStorage.setItem('userData', JSON.stringify(data['userData']));
        commit('setUserData', data['userData']);
        router.push('/' + data['userData']['role'])
      }
    }).catch(error => {
      console.log(error);
      commit('setError', error.response.data['message']);
    });
  },
  async logout({commit}) {
    await axios.post("/api/logout", {}, {withCredentials: true}).then(response => {
      console.log(response.data);
      const data = response.data;
      if (data['message'] === "SUCCESS") {
        localStorage.removeItem('userData');
        commit('removeUserData');
      }
    }).catch(error => {
      console.log("error");
      console.log(error);
    });
    vm.$router.push("/")
    vm.$router.go(0)
  },
  add_faculty_course({commit}, course_code) {
    commit('setFacultyCourse', course_code);
    localStorage.setItem('userData', JSON.stringify(state.userData));
  }
};

const mutations = {
  setUserData: (state, userData) => (state.userData = userData),
  setError: (state, error) => (state.error = error),
  setLoginDialog: (state, status) => (state.login_dialog = status),
  removeUserData: (state) => state.userData = null,
  setFacultyCourse: (state, course) => state.userData.courses[course["course_id"]] = course["course_name"]
};

export default {
  state,
  getters,
  actions,
  mutations
}
