import { Button, TextField } from "@mui/material";
import { useTodosState } from "../../hooks";
import { useNoticeSnackbarState } from "../NoticeSnackbar";

export default function WritePage() {
  const todosState = useTodosState();
  const noticeSnackbarState = useNoticeSnackbarState();

  const onSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    form.content.value = form.content.value.trim();

    if ( form.regDate.value.length == 0 ) {
      alert("날짜를 입력해주세요.");
      form.regDate.focus();
      return;
    }

    if ( form.content.value.length == 0 ) {
      alert("날짜를 입력해주세요.");
      form.content.focus();
      return;
    }

    const newTodoId = todosState.addTodo(form.regDate.value, form.content.value);

    noticeSnackbarState.open(`${newTodoId}번 할 일이 추가되었습니다.`);
  };

  return (
    <>
      <form className="flex-1 flex p-10 flex-col gap-7" onSubmit={onSubmit}>
        <TextField
          label="날짜 입력"
          focused
          type="datetime-local"
          name="regDate"
          />

        <TextField
          label="할 일 작성" 
          multiline
          name="content"
          className="flex-1 flex"
          InputProps={{ className: "flex-1 flex-col"}}
          inputProps={{ className: "flex-1 bg-red-500"}}
        />

        <Button type="submit" variant="contained">
          <span>
            <i className="fa-solid fa-pencil"></i>
          </span>
          <span>&nbsp;</span>
          <span>추가하기</span>
        </Button>
      </form>
    </>
  );
}