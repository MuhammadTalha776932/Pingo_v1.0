import { observable, action,makeObservable } from 'mobx';
import { createContext } from 'react';
import {AsyncTrunk} from "mobx-sync";
import AsyncStorage from '@react-native-async-storage/async-storage';
class UserStore {
   users: any = {};

   ispaired:boolean = false;

   storePairingCode:string[] = []

   constructor(){
    makeObservable(this,{
      users:observable,
      ispaired:observable,
      storePairingCode:observable,
      updateData:action,
      setIsPaired:action,
      setIsPairingCode:action
    })
   }
  updateData = (newUser: any)=> this.users = {...this.users, ...newUser};
  

  setIsPairingCode = (pairingCode:string[]) => this.storePairingCode = pairingCode;
  

  setIsPaired = (pairState:boolean) => this.ispaired = pairState;
  
}

const userStore = new UserStore();
export const UserContext = createContext(userStore);

export const UserTrunk = new AsyncTrunk(userStore,{
  storage:AsyncStorage
})

export const UserProvider = ({children}:{children:React.ReactNode}) =>{
    return(
       <UserContext.Provider value={userStore}>
        {
            children
        }
       </UserContext.Provider>
    )
}

export default userStore;