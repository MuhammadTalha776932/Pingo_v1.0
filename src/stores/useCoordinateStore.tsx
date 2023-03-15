import { action, makeObservable, observable } from "mobx";
import React, { createContext } from 'react';
import { AsyncTrunk } from "mobx-sync"
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface childCoordinate {
        code: string,
        isPaired: boolean,
        email: string,
        uid: string,
        curr_coordinate: {
          speed: number,
          altitude: number,
          latitude: number,
          longitude: number,
          accuracy: number,
          heading: number
        },
        init_coordinate: {
            speed: number,
            altitude: number,
            latitude: number,
            longitude: number,
            accuracy: number,
            heading: number
        },
        deviceID: string,
        age?:string,
        name?:string
      
}

class useCoordinateStore {
    CoordinateState:childCoordinate[]= []

    constructor() {
        makeObservable(this, {
            CoordinateState: observable,
            updateTheCoordinate: action
        })
    }

    updateTheCoordinate(coordinateProps:childCoordinate[]) {
        // const { DeviceID } = coordinateProps
        this.CoordinateState = coordinateProps;
    }
}

const coordinateStore = new useCoordinateStore();

export const Trunk = new AsyncTrunk(coordinateStore, {
    storage: AsyncStorage,
})

export const CoordinateProvider = createContext(coordinateStore);

export const CoordinateProviderComponent = ({ children }: { children: React.ReactNode }) => {
    return (
        <CoordinateProvider.Provider value={coordinateStore}>
            {
                children
            }
        </CoordinateProvider.Provider>
    )
}
export const coordinateContext = coordinateStore;