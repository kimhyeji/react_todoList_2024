import { Chip, Button } from "@mui/material";
import classNames from "classnames";

export default function TodoListItem({todo, index, openDrawer, onCompletedBtnClicked}) {
    return (
      <>
        <li key={todo.id} className='mt-10'>
          <div className='flex gap-3'>
            <Chip label={todo.id} variant="outlined" />
            <Chip label={todo.performDate.substr(2, 14)} color="primary" variant="outlined" />
          </div>
          <div className='sm:mt-4 shadow rounded-[10px] flex'>
            <Button
                className='flex-shrink-0 !rounded-[10px_0_0_10px]'
                onClick={() => onCompletedBtnClicked(todo.id)}
            >
              <span
              className={
                classNames(
                  "text-2xl",
                  {
                    "text-[color:var(--mui-color-primary-main)]": todo.completed
                  },
                  { "text-[#dfdfdf]" :  !todo.completed}
                )}
              >
                <i className="fa-solid fa-check"></i>
              </span>
            </Button>
            <div className="flex-shrink-0 w-[2px] bg-[#dfdfdf] my-5"></div>
            <div className='flex-grow whitespace-pre-wrap leading-relaxed hover:text-[color:var(--mui-color-primary-main)] flex items-center my-5 mx-3'>
              {todo.content}
            </div>
            <Button
              onClick={() => openDrawer(todo.id)}
              className='flex-shrink-0 !rounded-[0_10px_10px_0]'
            >
              <span className='text-[#dfdfdf] text-2xl'>
                <i class="fa-solid fa-ellipsis-vertical"></i>
              </span>
            </Button>
          </div>
        </li>
      </>
    );
}  