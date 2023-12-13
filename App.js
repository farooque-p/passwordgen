import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";

import Slider from "@react-native-community/slider";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Card, Checkbox } from "react-native-paper";

import * as Clipboard from "expo-clipboard";

export default function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [useNumbers, setUseNumbers] = useState(false);
  const [useSpecialCharacters, setUseSpecialCharacters] = useState(false);
  const [copiedToClipboard, setCopyToClipboard] = useState(false);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (useNumbers) {
      str += "0123456789";
    }
    if (useSpecialCharacters) {
      str += "!@#$%^&*-_+=[]{}~`";
    }
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, useNumbers, useSpecialCharacters, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, useNumbers, useSpecialCharacters, passwordGenerator]);

  const copyPasswordToClipboard = async () => {
    await Clipboard.setStringAsync(password);
    setCopyToClipboard(true);
  };

  setTimeout(() => {
    setCopyToClipboard(false);
  }, 5000);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text
        style={{
          fontSize: 24,
          color: "white",
          fontWeight: "600",
          marginBottom: 30,
        }}
      >
        Password Generator
      </Text>
      <Card>
        <Card.Content>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <TextInput
              editable={false}
              style={{
                width: 250,
                backgroundColor: "white",
                padding: 10,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 0,
                borderBottomLeftRadius: 8,
                borderBottomRightRadius: 0,
              }}
              value={password}
              placeholder="Password"
            />
            <TouchableOpacity
              onPress={copyPasswordToClipboard}
              style={{
                backgroundColor: "blue",
                paddingHorizontal: 20,
                paddingVertical: 13,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 8,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 8,
              }}
            >
              {copiedToClipboard ? (
                <Text style={{ color: "white", fontSize: 16 }}>Copied</Text>
              ) : (
                <Text style={{ color: "white", fontSize: 16 }}>Copy</Text>
              )}
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Slider
              style={{ width: 200, height: 40 }}
              minimumValue={8}
              maximumValue={24}
              step={1}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              onValueChange={(value) => {
                setLength(value);
              }}
            />
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              Length: {length}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Checkbox
              status={useNumbers ? "checked" : "unchecked"}
              onPress={() => {
                setUseNumbers((prev) => !prev);
              }}
            />
            <Text style={{ fontSize: 16, fontWeight: "500" }}>Use Numbers</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Checkbox
              status={useSpecialCharacters ? "checked" : "unchecked"}
              onPress={() => {
                setUseSpecialCharacters((prev) => !prev);
              }}
            />
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              Use Special Characters
            </Text>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
  },
});
