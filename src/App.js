import logo from "./logo.svg";
import "./App.css";
import { useRoutes, BrowserRouter,Route, Routes } from "react-router-dom";
import Wiwistores from "./wiwistores/wiwistores";
import Storemenu from "./storemenu/storemenu";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Wiwistores />} />
        <Route path="/storemenu" element={<Storemenu />} />

        {/* <Route path="/user" element={<User />} />

        <Route path="/roles" element={<Role />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
