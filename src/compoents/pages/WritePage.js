import { TextField } from "@mui/material";

export default function WritePage() {
    return (
      <>
        <div className="flex-1 flex p-10 flex-col gap-7">
          <TextField label="날짜 입력" focused type="datetime-local"/>

          <TextField label="할 일 작성" multiline/>
        </div>
      </>
    );
  }