import { useTodosState, useTodoOptionDrawerState } from  "../../hooks";
import TodoListItem from "../TodoListItem";
import TodoOptionDrawer from "../TodoOptionDrawer";

export default function TodoList() {
    const todosState = useTodosState();
    const todoOptionDrawerState = useTodoOptionDrawerState();
  
    return (
      <>
        <TodoOptionDrawer state={todoOptionDrawerState} />
  
        <div className='mt-4 px-4'>
          <ul>
            {todosState.todos.map((todo, index) => (
              <TodoListItem 
                key={todo.id}
                todo={todo}
                index={index}
                openDrawer={todoOptionDrawerState.open}
              />
            ))}
          </ul>
        </div>
      </>
    );
  }