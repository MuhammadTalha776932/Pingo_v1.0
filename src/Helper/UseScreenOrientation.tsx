import {Dimensions} from "react-native";

export interface IUseScreenOrientation {
    WindowWidth:number,
    WindowHeight:number,

}


export const useScreenOrientation =  ({WindowWidth,WindowHeight}:IUseScreenOrientation) =>{

    const isPortrait:boolean = WindowHeight > WindowWidth;

    return {
        isPortrait
    }
}

export const useCalculateLatAndLngDelta = () =>{
    let latDelta:number = 0; 
    let lngDelta:number = 0;
    Dimensions.addEventListener("change",()=>{
        let ScreenWidth:number = Dimensions.get("screen").width;
        let ScreenHeight:number = Dimensions.get("screen").height;
        let ASPECT_RATIO:number = ScreenWidth/ScreenHeight;
         latDelta = 0.0922; 
         lngDelta = ASPECT_RATIO * latDelta;
    })
    return {latDelta,lngDelta} as {latDelta:number,lngDelta:number};
}