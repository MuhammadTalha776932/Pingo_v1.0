import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { ChildsContext } from '../../stores/childstores/ChildStore';
import { useNavigation } from "@react-navigation/native"
interface Child {
  name: string;
  age: number;
}


/**
 * ChildFormScreen is a component that gathered the information about child's from their parent's.
 * Like name and age of the child's.
 * @returns JSX.Element
 */
const ChildFormScreen = () => {
  const nagivation = useNavigation()

  const { setChildInfomation } = React.useContext(ChildsContext)

  const [child, setChild] = useState<Child>({ name: '', age: 0 });

  const handleSubmit = () => {
    setChildInfomation(child); // Store the child informatin into mobx store state.
    nagivation.navigate("EnterCode" as never)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleStyle}>Enter your child's Details</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Enter your child's name"
          onChangeText={(name) => setChild({ ...child, name })}
        />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter your child's age."
          onChangeText={(age) => setChild({ ...child, age: parseInt(age) })}
        />
        <Button style={styles.button} mode="contained" onPress={handleSubmit}>
          Next
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleStyle: {
    padding: 5,
    fontSize: 24,
    fontFamily: "YesevaOne-Regular",
    marginBottom: 10
  },
  form: {
    width: '80%',
  },
  input: {
    marginBottom: 20,
    fontFamily:"YesevaOne-Regular"
  },
  button: {
    marginTop: 20,
  },
} );

export default ChildFormScreen;
