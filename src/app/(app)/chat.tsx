import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Message {
  text: string;
  isUser: boolean;
}

const chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const scrollViewRef = useRef<ScrollView>(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputText.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: inputText, isUser: true },
      ]);
      // Simulate a bot response (replace with actual logic)
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: `Bot: Received "${inputText}"`, isUser: false },
        ]);
      }, 500);
      setInputText("");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "#121212" }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <View style={{ flex: 1, paddingTop: insets.top }}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={{ flexGrow: 1, padding: 10 }}
        >
          {messages.map((message, index) => (
            <View
              key={index}
              style={{
                alignSelf: message.isUser ? "flex-end" : "flex-start",
                backgroundColor: message.isUser ? "#374151" : "#1f2937",
                padding: 10,
                borderRadius: 8,
                marginBottom: 8,
                maxWidth: "80%",
              }}
            >
              <Text style={{ color: "white" }}>{message.text}</Text>
            </View>
          ))}
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            padding: 10,
            backgroundColor: "#262626",
            paddingBottom: insets.bottom + 10,
          }}
        >
          <TextInput
            style={{
              flex: 1,
              backgroundColor: "#374151",
              padding: 10,
              borderRadius: 8,
              color: "white",
            }}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type a message..."
            placeholderTextColor="#a1a1aa"
          />
          <TouchableOpacity
            style={{
              backgroundColor: "#6366f1",
              padding: 10,
              borderRadius: 8,
              marginLeft: 8,
            }}
            onPress={handleSendMessage}
          >
            <Text style={{ color: "white" }}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default chat;
