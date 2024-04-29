import { AppBar, Toolbar } from "@mui/material";
import { Routes, Route, Navigate, NavLink, useLocation } from "react-router-dom";

import MainPage from "./compoents/pages/MainPage";
import WritePage from "./compoents/pages/WritePage";

function App() {
  const location = useLocation();
  
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <div className="flex-1"></div>
          <div className="font-bold select-none">TODO</div>
          <div className="flex-1 flex justify-end">
            {location.pathname != "/write" && (
              <NavLink to="/write">글작성</NavLink>
            )}

            {location.pathname == "/write" && (
              <NavLink to="/main">메인</NavLink>
            )}
          </div>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/main" element={<MainPage />} />
        <Route path="/write" element={<WritePage />} />
        <Route path="/*" element={<Navigate to ="/main" />} />
      </Routes>
    </>
  );
}

export default App;