import { useEffect, useState } from 'react'
import './App.css'
// import supabase from './supabase-client.js';
import supabase from './supabase-client';


function App() {

  const [todoList, setTodoList] = useState([]);

  const [newTodo, setNewTodo] = useState('');


  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const { data, error } = await supabase.from('TodoList').select('*');
    if (error) {
      console.log('Error fetching: ', error);
    } else {
      setTodoList(data);
    }
  };

  // --------------------------------------

  // 'add to do' button
  const addTodo = async () => {
    if (!newTodo.trim()) return;

    const newTodoData = {
      name: newTodo,
      isCompleted: false,
    };
    const { data, error } = await supabase
      .from('TodoList')
      .insert([newTodoData])
      .select()
      .single();

    if (error) {
      console.log('Error adding todo: ', error);
    } else {
      setTodoList((prev) => [...prev, data]);
      setNewTodo('');
    }
  };

  // --------------------------------------------

  // 'complete task' button
  const completeTask = async (id, isCompleted) => {

    const { data, error } = await supabase
      .from('TodoList')
      .update({ isCompleted: !isCompleted })
      .eq('id', id);

    if (error) {
      console.log('error toggling task: ', error)
    } else {
      const updatedTodoList = todoList.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !isCompleted } : todo
      );
      setTodoList(updatedTodoList);
    }

  };

  // --------------------------------------------

  const deleteTask = async (id) => {
    const { data, error } = await supabase
      .from('TodoList')
      .delete()
      .eq('id', id);

    if (error) {
      console.log('error deleting task: ', error)
    } else {
      setTodoList((prev) => prev.filter((todo) => todo.id !== id));
    }
  };


  return (

    <div className='bg-gray-700 text-white p-10 rounded-lg'>

      {" "}

      <h1 className='text-2xl font-bold mb-10'>
        To Do List
      </h1>

      <div className=''>

        <div className='flex gap-10 mb-10'>
          <input
            type='text'
            placeholder='To Do'
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className='border rounded p-3 outline-none'
          />

          <button onClick={addTodo}>

            Add to do item

          </button>

        </div>

        <ul>

          {todoList.map((todo) => (
            <li key={todo.id}>

              <div className='py-5'>
                <p> {todo.name} </p>
              </div>

              <div className='flex items-center justify-center gap-3 '>
                <button onClick={() => completeTask(todo.id, todo.isCompleted)} >
                  {todo.isCompleted ? 'Undo' : 'Complete Task'}
                </button>

                <button onClick={() => deleteTask(todo.id)}> Delete Task </button>
              </div>

            </li>
          ))}

        </ul>

      </div>



    </div>
  )
}

export default App
