import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Button, Switch, TouchableOpacity } from 'react-native';

export default function App() {
  const [tasks, setTasks] = useState([]);  
  const [taskTitle, settaskTitle] = useState(''); 

  
  const addTask = () => {
    if (taskTitle.trim()) {
      setTasks([
        ...tasks,
        { id: Date.now().toString(), title: taskTitle, status: false } 
      ]);
      settaskTitle('');  
    }
  };

 
  const toggleTaskStatus = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: !task.status } : task
    ));
  };


  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };


  const TaskItem = ({ task }) => (
    <View style={styles.taskItem}>
      <Text style={{ ...styles.taskTitle, textDecorationLine: task.status ? 'line-through' : 'none' }}>
        {task.title} ({task.status ? 'Done' : 'Due'}) 
      </Text>
      <Switch
        value={task.status}
        onValueChange={() => toggleTaskStatus(task.id)}
      />
      <TouchableOpacity onPress={() => deleteTask(task.id)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>To-Do List</Text>
      
    
      <TextInput
        style={styles.input}
        placeholder="Enter Task Title"
        value={taskTitle}
        onChangeText={settaskTitle}
      />
      
     
      <Button 
        title="Add Task" 
        onPress={addTask} 
        disabled={!taskTitle.trim()}  
      />

      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <TaskItem task={item} />}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  taskTitle: {
    fontSize: 18,
    flex: 1,
  },
  deleteButton: {
    marginLeft: 10,
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
