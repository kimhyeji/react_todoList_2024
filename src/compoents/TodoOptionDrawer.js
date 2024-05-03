import { useNoticeSnackbarState } from "./NoticeSnackbar";
import { useTodosState } from "../hooks";
import {
    SwipeableDrawer,
    List,
    ListItem,
    ListItemButton,
    Divider
} from "@mui/material";

export default function TodoOptionDrawer({state}) {
    const todosState = useTodosState();
    const noticeSnackbarState = useNoticeSnackbarState();
  
    // const editTodoModalState = useEditTodoModalState();
    const todo = todosState.findTodoById(state.todoId);
  
    const removeTodo = () => {
      if ( window.confirm(`${state.todoId}번 할 일을 삭제하시겠습니까?`) == false ) {
        return;
      }
  
      todosState.removeTodoById(state.todoId);
      state.close();
      noticeSnackbarState.open(`${state.todoId}번 할 일이 삭제되었습니다.`, "info");
    }
  
    return(
      <>
        {/* <EditTodoModal state={editTodoModalState} todo={todo} closeDrawer={state.close} /> */}
        <SwipeableDrawer
          anchor={"bottom"}
          open={state.opened}
          onClose={state.close}
        >
          <List className='!py-0'>
            <ListItem className='!p-5'>
              <span className="text-[color:var(--mui-color-primary-main)] font-bold">{state.todoId}번</span>
            </ListItem>
            <Divider variant="middle" />
            <ListItemButton className='!p-5' onClick={() => {}}>
              <i class="fa-regular fa-pen-to-square"></i>
              <span className='ml-1'>수정</span>
              </ListItemButton>
            <ListItemButton className='!p-5' onClick={removeTodo}>
              <i class="fa-regular fa-trash-can"></i>
              <span className='ml-1'>삭제</span>
            </ListItemButton>
          </List>
        </SwipeableDrawer>
      </>
    );
  }