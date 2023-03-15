import React from 'react';
import { View, Text,  StyleSheet } from 'react-native';

import { Card, IconButton, Paragraph } from 'react-native-paper';

const ModalContents = () => {
    return (
        <View style={{ padding: 16,width:"100%" }}>
            <Text
                style={{
                    textAlign: 'center',
                    marginTop: 16,
                    fontSize: 16,
                }}
            >
                Some message
            </Text>
            <Card style={{ marginTop: 16 }}>
                <Card.Title title="Add Parent" />
                <Card.Content>
                    <Paragraph>Subtitle for parent</Paragraph>
                </Card.Content>
                <Card.Actions style={{ justifyContent: 'flex-end' }}>
                    <IconButton icon="arrow-right" />
                </Card.Actions>
            </Card>
            <Card style={{ marginTop: 16 }}>
                <Card.Title title="Add Child" />
                <Card.Content>
                    <Paragraph>Subtitle for child</Paragraph>
                </Card.Content>
                <Card.Actions style={{ justifyContent: 'flex-end' }}>
                    <IconButton icon="arrow-right" />
                </Card.Actions>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    AvatarImageStyle: {
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        width: "100%",
        height: "100%",
    }
})

export default ModalContents;