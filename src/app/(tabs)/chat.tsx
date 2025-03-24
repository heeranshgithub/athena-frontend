import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Animated,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSendMessageMutation } from "../../store/api/chatApiSlice";
import { useDispatch } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";

interface Message {
  text: string;
  isUser: boolean;
  opacity?: Animated.Value;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const scrollViewRef = useRef<ScrollView>(null);
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const [sendMessage, { isLoading }] = useSendMessageMutation();

  const handleSendMessage = async () => {
    if (inputText.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: inputText, isUser: true },
      ]);
      setInputText("");

      try {
        const response = await sendMessage(inputText).unwrap();
        const initialOpacity = new Animated.Value(0);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: response?.message, isUser: false, opacity: initialOpacity },
        ]);

        Animated.timing(initialOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-[#121212]"
    >
      <View className="flex-1" style={{ paddingTop: insets.top }}>
        {/* <View className="items-center py-4 bg-[#1f2937] border-b border-[#374151] flex-row justify-center">
          <MaterialIcons
            name="chat"
            size={24}
            color="white"
            style={{ marginRight: 8 }}
          />
          <Text className="text-white text-2xl font-bold">Chat</Text>
        </View> */}

        <ScrollView
          ref={scrollViewRef}
          contentContainerClassName="flex-grow p-4"
        >
          {messages.map((message, index) => (
            <Animated.View
              key={index}
              className={`self-${message.isUser ? "end" : "start"} bg-${
                message.isUser ? "[#374151]" : "[#1f2937]"
              } p-3 rounded-lg mb-2 max-w-[80%]`}
              style={{
                opacity: message.opacity || 1,
                alignSelf: message.isUser ? "flex-end" : "flex-start",
              }}
            >
              <Text className="text-white">{message.text}</Text>
            </Animated.View>
          ))}

          {isLoading && (
            <ActivityIndicator
              size="small"
              color="#6366f1"
              className="self-center mt-2"
            />
          )}
        </ScrollView>

        <View className="flex-row p-4 bg-[#262626] pb-[${insets.bottom + 10}px]">
          <TextInput
            className="flex-1 bg-[#374151] p-3 rounded-lg text-white"
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type a message..."
            placeholderTextColor="#a1a1aa"
          />
          <TouchableOpacity
            className="bg-[#6366f1] p-3 rounded-lg ml-3"
            onPress={handleSendMessage}
          >
            <Text className="text-white">Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Chat;
