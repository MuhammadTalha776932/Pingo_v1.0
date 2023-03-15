import { observable, action, makeObservable } from 'mobx';
import { createContext } from 'react';
import { AsyncTrunk } from "mobx-sync"
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * ChildStore is class based mobx store that have the properties and method
 */

class ChildStore {
    parents: any = {};                                       // store the parents single parent documents ... in future will change to handle array of parents

    childInformation: any = {}
    ispaired: boolean = false;                              // too store the isPaired value comming from parent collection isPaired 

    storeEnterCode: string = ""                             // too store the child's devices enter code mean parents generated code.

    storeParentCoe:string = ""                              // too store the parent's res documents code;

    constructor() {
        makeObservable(this, {
            parents: observable,
            ispaired: observable,
            storeEnterCode: observable,
            storeParentCoe:observable,
            childInformation:observable,
            updateChild: action,
            setIsPaired: action,
            setPairingCode: action,
            setParentCodeIntoStore:action,
            setChildInfomation:action
        })
    }

    setChildInfomation = (childState:any) => {
        this.childInformation = {...this.childInformation,childState}
    }
    setParentCodeIntoStore = (parentCodeFromServer:string) =>{
        this.storeParentCoe = parentCodeFromServer;
    }
    updateChild(newUser: any) {
        this.parents = {...this.parents, newUser};
    }

    setPairingCode: (pairingCode: string) => void = (pairingCode: string): void => {
        this.storeEnterCode = pairingCode;
    }

    setIsPaired: (pairState: boolean) => void = (pairState: boolean): void => {
        this.ispaired = pairState;
    }
}

const ChildStores = new ChildStore();
export const ChildsContext = createContext(ChildStores);

export const ChildsTrunk = new AsyncTrunk(ChildStore,{
    storage: AsyncStorage
})

export const ChildsProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <ChildsContext.Provider value={ChildStores}>
            {
                children
            }
        </ChildsContext.Provider>
    )
}

export default ChildStores;