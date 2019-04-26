import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import * as firebase from 'firebase'
import router from './router';

Vue.use(router)
Vue.use(Vuex)

export default new Vuex.Store({

  plugins: [createPersistedState({
    paths: ['user','userLoginStatus','UserProfile'],
  })],

  state: {
    toolbar:true,
    userLoginStatus: '',
    ShareLoadfing:true,
    user : null,
    loading: false,
    addnewLoading:true,
    authError: null,
    content: [],
    StatisticData: [],

    //loadingIcon
    usertabLoading:false,
    contentLoading:false,
    FavLoading:false,
    HisLoading:false,
    
    editContent: '',
    allUserContent:[],
    UserFav:'',
    UserHis:'',
    UserProfile:'',
  },
  mutations: {
      addUserprofile(state, payload){
          state.UserProfile = payload
      },
      setUser (state, payload){
        state.user = payload
        state.userLoginStatus = true
        state.UserProfile = payload
      },
      resetUser(state){
        state.user = null
        state.userLoginStatus = false
        state.UserProfile = ''
        state.content = ''
      },
      setLoading(state, payload){
        state.loading = payload
      },
      setError(state, payload){
        state.authError = payload
      },
      clearError(state,payload){
        state.authError = null
      },
      storeContent(state, payload){
        // state.content = payload;
        state.content.push(payload);
      },
      storeUserFav(state, payload){
        state.UserFav=payload;
      },
      storeUserHis(state, payload){
        state.UserHis=payload;
      },
      storeUserContent(state, payload){
        state.allUserContent.push(payload);
        // console.log("stored")
      },
      StatisticData(state,payload){
        state.StatisticData.push(payload);
      },
      clearStaticticData(state){
        state.StatisticData=[];
      },
      clearstoreContent(state){
        state.content=[];
      },
      clearstoreUserContent(state,){
        state.allUserContent=[];
      },
      contentLoad(state, payload){
        state.contentLoading = payload;
      },
      contentFavLoad(state, payload){
        state.FavLoading = payload;
      },
      contentHisLoad(state, payload){
        state.HisLoading = payload;
      },
      contentUserLoad(state, payload){
        state.usertabLoading = payload;
      },
      resetContet(state){
        state.content=''
      },
      resetusercontent(state){
        state.allUserContent=''
      },
      EditContent(state, payload){
        state.editContent = payload
      },
      addnewProgress(state,payload){
        state.addnewLoading = payload
      },
      shareLoading(state,payload){
        state.ShareLoadfing = payload
      },
      toolbar(state){
        state.toolbar = false
      }
  },
  actions: {
    clearStatistic({commit}){
      commit('clearStaticticData')
    },
    clearStoreContent({commit}){
      commit('clearstoreContent')
    },
    clearstoreUserContent({commit}){
      commit('clearstoreUserContent')
    },
    closetoolbar({commit}){
        commit('toolbar')
    },
      signUserUp({commit}, payload) {
        commit('setLoading', true)
        commit('clearError')

        firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(payload.email, payload.password)
          .then(
            user => {
                commit('setLoading', false)

                const newUser = {
                  id:firebase.auth().currentUser.uid,
                  registeredMeetups: []
                }
                const storeaccount = {
                  userEmail: payload.email,
                  userType: 'admin'
                }
                commit('setUser', newUser)
                firebase.database().ref("Users/"+firebase.auth().currentUser.uid+"/Profile").set(storeaccount)
                .then((data) => {
                  commit("addUserprofile", newUser)

                  firebase.database().ref("Users/"+firebase.auth().currentUser.uid+"/Profile").once('value')
                  .then((data) => {
                        // console.log("sign in: ",data.val())
                          // console.log("signin: ", data.val())
                          commit("addUserprofile", data.val())
                          router.push('/')
                          commit('setLoading', false)
                  })
                  return data
                })
                .catch(error => {
                  commit('setLoading', false)
                  console.log(error)
                })
                
            }
            
          )
          .catch(error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          })
      },
      setPasswordIncorrectError({commit}, payload){
        commit('setError', payload)
      },
      signUserIn({commit}, payload){
        
        commit('setLoading', true)
        commit('clearError')
        firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
         
              const newUser = {
                id:firebase.auth().currentUser.uid,
                registeredMeetups: []
              }
              console.log("userID: ", firebase.auth().currentUser.uid)
              commit('setUser', newUser)
              firebase.database().ref("Users/"+firebase.auth().currentUser.uid+"/Profile").once('value')
                  .then((data) => {
                        console.log("sign in: ",data.val())
                        if(data.val().userType == "user"){
                          commit('setError', "User have no permission to login this system! ")
                          commit('resetUser')
                          console.log('User have no permission to login this system! ')
                          // router.push('/signin');
                           commit('setError', 'User have no permission to login this system! ')
                           commit('setLoading', false)
                        }
                        else{
                          console.log("signin: ", data.val())
                          commit("addUserprofile", data.val())
                          router.push('/')
                          commit('setLoading', false)

                        }
                  })
            }
          )
        .catch(error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        })
      },
      SignUserOut({commit}){
        commit('resetUser')
      },
      clearError({commit}) {
        commit('clearError')
      },
      RetrieveBeaconData({commit}, payload){
        // "2f234454-cf6d-4a0f-adf2-f4911ba9ffa6"
          // id :"2f234454-cf6d-4a0f-adf2-f4911ba9ffa6",
          // "This Old Fire Brigade Station started with the arrival of the first coal-powered fire engine from England in 1917. Today it housed a food court with many selection of local hawker food."
        commit("addnewProgress", false);
        const UUID = payload.UUID
        const data = {
          title : payload.title,
          description : payload.description,
          location: payload.Location,
          dateCreated: payload.DateCreate
        }
        console.log("store: ", data)
        let imageUrl;
        firebase.database().ref("BeaconUUID/"+UUID).set(data)
        .then((data) => {
            console.log(data)
          return data
        })
        .then(data => {
          const filename = payload.image.name
          var id = filename.split('.')
          console.log(id[1])
          const ext = id[1]
          return firebase.storage().ref("BeaconUUID/"+UUID +"." + ext).put(payload.image)
        })
        .then(fileData => {
          console.log(fileData)
          let fullPath = fileData.metadata.fullPath
          return firebase.storage().ref(fullPath).getDownloadURL()

          // imageUrl = fileData.metadata.downloadURLs[0]
          // return firebase.database().ref("BeaconUUID/").child(UUID).getDownloadURL()
          // return firebase.database().ref("BeaconUUID/").child(UUID).update({imageUrl: imageUrl})
        })
        .then(URL => {
          imageUrl = URL
          return firebase.database().ref("BeaconUUID/").child(UUID).update({imageUrl: imageUrl})
          
        })
        .then(data=>{
          commit("addnewProgress", true);
          router.push('/');
        })
        .catch(error => {
          console.log(error)
          commit("addnewProgress", true);
        })
      },
      receiveRealtimeDatabase({commit}){
        // console.log("here")
        
        commit('clearstoreContent')
        commit('contentLoad', true)
        // .startAt("").limitToFirst(2)
        firebase.database().ref("BeaconUUID/").orderByKey().once('value')
        .then((data) => {
          console.log("get: ",data.val())
          var data = data.val();
          var dataValue = Object.values(data);
          var datakey = Object.keys(data);
          var userId ;
          //commit('storeContent', data.val())
          var lastSeenKey;
            // console.log(dataValue)
          for(var i = 0 ; i <dataValue.length; i++){
            
            userId = {UUID : datakey[i]}
            var x = Object.assign(userId, dataValue[i]);
            // console.log("key :", x)
            // console.log("loop :", dataValue[i].Profile)
            lastSeenKey  = userId.UUID;
            console.log("key :",lastSeenKey)

          commit('storeContent', x)
            
          }

          commit('contentLoad', false)
        })
        .catch(error => {
          console.log(error)
          commit('contentLoad', false)
        })
        console.log("end")
      },

      receiveRealtimeUserDatabase({commit}){
        commit('contentUserLoad', true)
        firebase.database().ref("Users/").once('value')
        .then((data) => {
          // console.log(data.val())
          commit('clearstoreUserContent')
          var data = data.val();
          var dataValue = Object.values(data);
          var datakey = Object.keys(data);
          var userId ;
            console.log("get user data :")

          for(var i = 0 ; i <dataValue.length; i++){
            
            userId = {userId : datakey[i]}
            var x = Object.assign(userId, dataValue[i].Profile);
            // console.log("key :", x)
            // console.log("loop :", dataValue[i].Profile)
            
            if(firebase.auth().currentUser.uid != datakey[i]){commit('storeUserContent',x);}
          }
        


          commit('contentUserLoad', false)
        })
        .catch(error => {
          console.log(error)
          commit('contentUserLoad', false)
        })
        console.log("end")
      },
          
      deletefirebase({commit, dispatch},payload){
          commit('resetUserContet')
          // console.log("BeaconUUID/"+payload)
        firebase.database().ref("BeaconUUID/"+payload).remove()
        // .then((data) => {
        //   console.log("deleted firebase")
        //   console.log(data)
        //   return firebase.storage.ref("BeaconUUID/"+payload+".*").delete()
        // })
        .then((result)=>{
          // console.log("deleted storage")
          // console.log(result)
          dispatch('receiveRealtimeDatabase')
        })
        .catch(error => {
          console.log(error)
        })
      },
      deleteUserfirebase({commit, dispatch},payload){
        commit('resetusercontent')
        console.log("Users/"+payload)
      firebase.database().ref("Users/"+payload).remove()
      // .then((data) => {
      //   console.log("deleted firebase")
      //   console.log(data)
      //   return firebase.storage.ref("BeaconUUID/"+payload+".*").delete()
      // })
      .then((result)=>{
        // console.log("deleted storage")
        console.log(result)
        dispatch('receiveRealtimeUserDatabase')
      })
      .catch(error => {
        console.log(error)
      })
    },
      receiveEditData({commit},payload){
        commit('shareLoading',true)
        firebase.database().ref("BeaconUUID/"+payload).once('value')
        .then((data) => {
          // console.log(data.val())
          commit('EditContent', data.val())
          commit('shareLoading',false)
        })
        .catch(error => {
          console.log(error)
          commit('shareLoading',false)
        })
      },
      getstatistic({commit}){
        commit('clearStatistic')
        firebase.database().ref("Statistic/Advertiseent").once('value')
        .then((data) => {
          console.log(data.val())
          var data = data.val();
          var dataValue = Object.values(data);
          var dataBeaconId = Object.keys(data);
          var userId ;
         
          // console.log("key :",dataValue[0].datakey[0].length)
          for(var i = 0 ; i <dataValue.length; i++){
            var totaltransmit = Object.values(dataValue[i])

            // userId = {userId : datakey[i]}
            // var x = Object.assign(userId, dataValue[i].Profile);
            // console.log("dataBeaconId :",dataBeaconId[i])
            // console.log("totaltransmit :", totaltransmit.length)
            // console.log("loop :", dataValue[i].Profile)
            var dataTokeep = {
              BeaconUUID : dataBeaconId[i],
              totalSent : totaltransmit.length
            }
             commit('StatisticData',dataTokeep);
          }
          
        })
        .catch(error => {
          console.log(error)
        })
      },
      getUserFav({commit}, payload){
        commit('contentFavLoad',true)
        firebase.database().ref("Users/"+payload+ "/Favourite").once('value')
        .then((data) => {
          //  console.log("one", data.val())
           commit('storeUserFav', data.val())
           commit('contentFavLoad',false)
        })
        .catch(error => {
          commit('contentFavLoad',false)

          console.log(error)
        })
      },
      UpdateUserInformation({commit}, payload){
        console.log("in",firebase.auth().currentUser.uid)
        firebase.database().ref("Users/"+firebase.auth().currentUser.uid+"/Profile").set(payload)
        .then((data) => {
          console.log("ok", payload)
          commit("addUserprofile", payload)
        })
        .catch(error => {
          console.log(error)
        })
      },
      getUserHis({commit}, payload){
        commit('contentHisLoad',true)

        firebase.database().ref("Users/"+payload+ "/History").once('value')
        .then((data) => {
          //  console.log("one", data.val())
          commit('storeUserHis', data.val())
          commit('contentHisLoad',false)

        })
        .catch(error => {
          console.log(error)
          commit('contentHisLoad',false)

        })
      }
  },
  getters:{
    getpath(obj, path){
        for (var i=0, path=path.split('.'), len=path.length; i<len; i++){
            obj = obj[path[i]];
        }
        return obj;
    },
    checkLOgin(state){
      if(  state.user != null  && value !== undefined)
      {
        return true;
      }else{
        return false;
      }
    },
    user(state) {
      return state.user
    },
    loading(state){
      return state.loading
    },
    addnewLoading(state){
      return state.addnewLoading
    },
    error(state){
      return state.authError
    }
  }

})