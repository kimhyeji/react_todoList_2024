import { AppBar, Toolbar } from "@mui/material";
import { Routes, Route, Navigate, NavLink, useLocation } from "react-router-dom";

import MainPage from "./compoents/pages/MainPage";
import WritePage from "./compoents/pages/WritePage";
import EditPage from "./compoents/pages/EditPage";
import { NoticeSnackbar } from "./compoents/NoticeSnackbar";

function App() {
  const location = useLocation();
  
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <div className="flex-1"></div>
          <div className="font-bold select-none">TODO</div>
          <div className="flex-1 flex justify-end">
            {location.pathname == "/main" && (
              <NavLink to="/write">할 일 추가</NavLink>
            )}

            {location.pathname != "/main" && (
              <NavLink to="/main">리스트</NavLink>
            )}
          </div>
        </Toolbar>
      </AppBar>

      <NoticeSnackbar />

      <Routes>
        <Route path="/main" element={<MainPage />} />
        <Route path="/write" element={<WritePage />} />
        <Route path="/edit/:id" element={<EditPage />} />
        <Route path="/*" element={<Navigate to ="/main" />} />
      </Routes>
    </>
  );
}

export default App;