import { Button, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import { useTodosState } from "../../hooks";
import { useNoticeSnackbarState } from "../NoticeSnackbar";

export default function EditPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const todosState = useTodosState();
  const noticeSnackbarState = useNoticeSnackbarState();

  const todo = todosState.findTodoById(id);

  const onSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    form.content.value = form.content.value.trim();

    if ( form.performDate.value.length == 0 ) {
      alert("날짜를 입력해주세요.");
      form.performDate.focus();
      return;
    }

    if ( form.content.value.length == 0 ) {
      alert("날짜를 입력해주세요.");
      form.content.focus();
      return;
    }

    const newTodoId = todosState.modifyTodoById(
      todo.id,
      form.performDate.value,
      form.content.value
    );

    noticeSnackbarState.open(`${todo.id}번 할 일이 수정되었습니다.`);
    navigate(-1);
  };

  const performDateForInput = todo.performDate.substr(0, 16).replace(" ", "T");

  return (
    <>
      <form className="flex-1 flex p-10 flex-col gap-7" onSubmit={onSubmit}>
        <TextField
          label="날짜 입력"
          focused
          type="datetime-local"
          name="performDate"
          defaultValue={performDateForInput}
          />

        <TextField
          label="할 일 작성" 
          multiline
          name="content"
          className="flex-1 flex"
          InputProps={{ className: "flex-1 flex-col"}}
          inputProps={{ className: "flex-1 bg-red-500"}}
          defaultValue={todo.content}
        />

        <Button type="submit" variant="contained">
          <span>
            <i className="fa-solid fa-pencil"></i>
          </span>
          <span>&nbsp;</span>
          <span>{todo.id}번 할 일 수정</span>
        </Button>
      </form>
    </>
  );
}