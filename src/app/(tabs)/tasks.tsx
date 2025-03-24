import { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [task, setTask] = useState("");
  const insets = useSafeAreaInsets();

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, task.trim()]);
      setTask("");
      Keyboard.dismiss();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-[#121212]"
    >
      <View className="flex-1" style={{ paddingTop: insets.top }}>
        <View className="px-6">
          <Text className="text-white text-2xl font-bold">Tasks</Text>
        </View>

        <View className="flex-row items-center bg-[#262626] rounded-lg p-3 mx-4 mt-4">
          <TextInput
            className="flex-1 text-white p-2 bg-[#374151] rounded-lg"
            placeholder="Add a task..."
            placeholderTextColor="#a1a1aa"
            value={task}
            onChangeText={setTask}
            onSubmitEditing={addTask}
            returnKeyType="done"
          />
          <TouchableOpacity
            onPress={addTask}
            className="ml-3 p-3 bg-[#6366f1] rounded-lg"
          >
            <FontAwesome name="plus" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={tasks}
          keyExtractor={(item, index) => index.toString()}
          contentContainerClassName="p-4"
          renderItem={({ item }) => (
            <View className="bg-[#1f2937] p-3 rounded-lg mb-2 mx-4">
              <Text className="text-white">{item}</Text>
            </View>
          )}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Tasks;
