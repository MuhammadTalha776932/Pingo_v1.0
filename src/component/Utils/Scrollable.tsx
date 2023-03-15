import * as React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';

interface ScrollableProps {
    children: React.ReactNode,
    isPortraitScreen?:boolean
}


const Scrollable = ({ children,isPortraitScreen }: ScrollableProps) => {
    return (
        <>
            <ScrollView contentContainerStyle={!isPortraitScreen ? { height: "150%" } : { height: "60%" }}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                centerContent={true}
            >
                {
                    children
                }
            </ScrollView>
        </>
    );
};

export default Scrollable;

const styles = StyleSheet.create({
    container: {}
});
