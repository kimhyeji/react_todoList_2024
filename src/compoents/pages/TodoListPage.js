import { Tab, Tabs } from "@mui/material";
import { useRecoilState } from "recoil";

import { useTodosState, useTodoOptionDrawerState } from  "../../hooks";
import TodoListItem from "../TodoListItem";
import TodoOptionDrawer from "../TodoOptionDrawer";
import { TodoList__filterCompletedIndexAtom, TodoList__sortIndexAtom } from "../../atoms";

export default function TodoList() {
    const todosState = useTodosState();
    const todoOptionDrawerState = useTodoOptionDrawerState();
    const onCompletedBtnClicked  = (id) => todosState.toggleTodoCompletedById(id);
    const [filterCompletedIndex, setFilterCompletedIndex] = useRecoilState(
        TodoList__filterCompletedIndexAtom
      );
    const [sortIndex, setSortIndex] = useRecoilState(TodoList__sortIndexAtom);

    const getFilteredTodos = () => {
        if ( filterCompletedIndex == 1 ) {
            return todosState.todos.filter((todo) => !todo.completed);
        }

        if ( filterCompletedIndex == 2 ) {
            return todosState.todos.filter((todo) => todo.completed);
        }

        return todosState.todos;
    }

    const filteredTodos = getFilteredTodos();

    const getSortedTodos = () => {
      if ( sortIndex == 0 ) {
        return [...filteredTodos].sort((a, b) => {
          if ( a.performDate == b.performDate ) return 0;
    
          return a.performDate > b.performDate ? 1 : -1;
        });
      }

      else if ( sortIndex == 1 ) {
        return [...filteredTodos].sort((a, b) => {
          if ( a.performDate == b.performDate ) return 0;
    
          return a.performDate < b.performDate ? 1 : -1;
        });
      }
      
      else if ( sortIndex == 2 ) {
        return [...filteredTodos].sort((a, b) => {
          if ( a.id == b.id ) return 0;
    
          return a.id > b.id ? 1 : -1;
        });
      }

      return filteredTodos;
    }

    const sortedTodos = getSortedTodos();
  
    return (
      <>
        <TodoOptionDrawer state={todoOptionDrawerState} />

        <Tabs
            variant="fullWidth"
            value={filterCompletedIndex}
            onChange={(event, newValue) => setFilterCompletedIndex(newValue)}
        >
            <Tab
            label={
                <span className="flex">
                <i className="fa-solid fa-list-ul"></i>
                <span className="ml-2">전체</span>
                </span>
            }
            value={0}
            />
            <Tab
            label={
                <span className="flex">
                <i className="fa-regular fa-square"></i>
                <span className="ml-2">미완료</span>
                </span>
            }
            value={1}
            />
            <Tab
            label={
                <span className="flex">
                <i className="fa-regular fa-square-check"></i>
                <span className="ml-2">완료</span>
                </span>
            }
            value={2}
            />
        </Tabs>

        <Tabs
        variant="scrollable"
        value={sortIndex}
        onChange={(event, newValue) => {
          setSortIndex(newValue);
        }}
      >
        <Tab
          className="flex-grow !max-w-[none] px-4"
          label={
            <span className="flex items-baseline">
              <i className="fa-regular fa-clock mr-2"></i>
              <span className="mr-2 whitespace-nowrap">급해요</span>
              <i className="fa-solid fa-sort-up relative top-[3px]"></i>
            </span>
          }
          value={0}
        />
        <Tab
          className="flex-grow !max-w-[none] px-4"
          label={
            <span className="flex items-baseline">
              <i className="fa-regular fa-clock mr-2"></i>
              <span className="mr-2 whitespace-nowrap">널럴해요</span>
              <i className="fa-solid fa-sort-down relative top-[-3px]"></i>
            </span>
          }
          value={1}
        />
        <Tab
          className="flex-grow !max-w-[none] px-4"
          label={
            <span className="flex items-baseline">
              <i className="fa-solid fa-pen mr-2"></i>
              <span className="mr-2 whitespace-nowrap">작성순</span>
              <i className="fa-solid fa-sort-up relative top-[3px]"></i>
            </span>
          }
          value={2}
        />
        <Tab
          className="flex-grow !max-w-[none] px-4"
          label={
            <span className="flex items-baseline">
              <i className="fa-solid fa-pen mr-2"></i>
              <span className="mr-2 whitespace-nowrap">작성순</span>
              <i className="fa-solid fa-sort-down relative top-[-3px]"></i>
            </span>
          }
          value={3}
        />
      </Tabs>
  
        <div className='mt-4 px-4'>
          <ul>
            {sortedTodos.map((todo, index) => (
              <TodoListItem 
                key={todo.id}
                todo={todo}
                index={index}
                openDrawer={todoOptionDrawerState.open}
                onCompletedBtnClicked={onCompletedBtnClicked}
              />
            ))}
          </ul>
        </div>
      </>
    );
  }