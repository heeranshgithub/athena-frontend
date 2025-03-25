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
import {
  addTask,
  getTasks,
  toggleTaskCompletion,
} from "../../store/slices/tasksSlice";
import { useDispatch, useSelector } from "react-redux";

const Tasks: React.FC = () => {
  const [task, setTask] = useState("");
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const tasks = useSelector(getTasks);

  const handleAddTask = () => {
    if (task.trim()) {
      dispatch(addTask({ id: tasks.length + 1, task: task.trim() }));
      setTask("");
      Keyboard.dismiss();
    }
  };

  const handleToggleTask = (id: number) => {
    dispatch(toggleTaskCompletion(id));
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
            onSubmitEditing={handleAddTask}
            returnKeyType="done"
          />
          <TouchableOpacity
            onPress={handleAddTask}
            className="ml-3 p-3 bg-[#6366f1] rounded-lg"
          >
            <FontAwesome name="plus" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id?.toString()}
          contentContainerClassName="p-4"
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleToggleTask(item.id)}
              className="flex-row items-center bg-[#1f2937] p-3 rounded-lg mb-2 mx-4"
            >
              <FontAwesome
                name={item.isCompleted ? "check-circle" : "circle-o"}
                size={24}
                color={item.isCompleted ? "#10B981" : "#a1a1aa"}
                className="mr-3"
              />
              <Text
                className={`text-white ${
                  item.isCompleted ? "line-through text-gray-400" : ""
                }`}
              >
                {item.id ? `${item.id}. ${item.task}` : item.task}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Tasks;
