export default {
  state() {
    return {
      active_index: 1,
	  auth: []
    }
  },
  mutations: {
    set_alert(state, obj) {
      state.alert = Object.assign(state.alert, obj);
    },
	set_auth(state,list){
		state.auth = list;
	}
  }
}
