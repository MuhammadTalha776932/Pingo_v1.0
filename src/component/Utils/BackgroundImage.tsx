import * as React from 'react';
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native';
import { StyleProps } from 'react-native-reanimated';

interface BackgroundImageProps {
    imageUrl:any,
    opacity?:number,

    stylingProps?:StyleProps
}

const BackgroundImage = ({imageUrl,opacity}: BackgroundImageProps) => {

    const {width,height} = Dimensions.get("window")

    const [WindowWidth,setWindowWidth] = React.useState<number>(width);
    const [WindowHeight,setWindowHeight] = React.useState<number>(height);

    React.useEffect(() => {
        Dimensions.addEventListener("change", ({window:{height,width}}) => {
            setWindowWidth(width);
            setWindowHeight(height);
        })

    }, [])

    const styles = StyleSheet.create({
        ImageBackgroundStyling: {
            width: "100%",
            height: "100%",
            opacity: opacity || 0.1,
            backgroundColor: "white",
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
          }
    });
    return (
        <React.Fragment>
            <Image
                source={imageUrl} resizeMode={'cover'} style={{
                    ...styles.ImageBackgroundStyling,
                }}
            />
        </React.Fragment>
    );
};

export default BackgroundImage;


