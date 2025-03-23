import React, { useState, useRef, useEffect } from 'react'
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
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSendMessageMutation } from '../../store/api/chatApiSlice'
import { clearUser } from '../../store/slices/userSlice'
import { useDispatch } from 'react-redux'

interface Message {
  text: string
  isUser: boolean
  opacity?: Animated.Value // Add opacity for animation
}

const chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const scrollViewRef = useRef<ScrollView>(null)
  const insets = useSafeAreaInsets()
  const dispatch = useDispatch()

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true })
    }
  }, [messages])

  const [sendMessage, { isLoading }] = useSendMessageMutation()

  const handleSendMessage = async () => {
    if (inputText.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: inputText, isUser: true },
      ])
      setInputText('')

      try {
        const response = await sendMessage(inputText).unwrap()

        const initialOpacity = new Animated.Value(0) // Initialize opacity to 0
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: response?.message, isUser: false, opacity: initialOpacity },
        ])

        Animated.timing(initialOpacity, {
          toValue: 1,
          duration: 500, // Animation duration
          useNativeDriver: true, // Improve performance
        }).start()
      } catch (error) {
        console.error('Error sending message:', error)
      }
    }
  }

  const handleLogout = () => {
    dispatch(clearUser())
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: '#121212' }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <View style={{ flex: 1, paddingTop: insets.top }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
          }}
        >
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
            Chat
          </Text>
          <TouchableOpacity
            onPress={handleLogout}
            style={{ backgroundColor: '#8b0000', padding: 10, borderRadius: 8 }}
          >
            <Text style={{ color: 'white' }}>Logout</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={{ flexGrow: 1, padding: 10 }}
        >
          {messages.map((message, index) => (
            <Animated.View //Wrap the message view with animated view.
              key={index}
              style={{
                alignSelf: message.isUser ? 'flex-end' : 'flex-start',
                backgroundColor: message.isUser ? '#374151' : '#1f2937',
                padding: 10,
                borderRadius: 8,
                marginBottom: 8,
                maxWidth: '80%',
                opacity: message.opacity || 1, // Apply opacity if available
              }}
            >
              <Text style={{ color: 'white' }}>{message.text}</Text>
            </Animated.View>
          ))}
          // Loading indicator
          {isLoading && (
            <ActivityIndicator
              size="small"
              color="#6366f1"
              style={{ alignSelf: 'center', marginTop: 10 }}
            />
          )}
        </ScrollView>
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            backgroundColor: '#262626',
            paddingBottom: insets.bottom + 10,
          }}
        >
          <TextInput
            style={{
              flex: 1,
              backgroundColor: '#374151',
              padding: 10,
              borderRadius: 8,
              color: 'white',
            }}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type a message..."
            placeholderTextColor="#a1a1aa"
          />
          <TouchableOpacity
            style={{
              backgroundColor: '#6366f1',
              padding: 10,
              borderRadius: 8,
              marginLeft: 8,
            }}
            onPress={handleSendMessage}
          >
            <Text style={{ color: 'white' }}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

export default chat
