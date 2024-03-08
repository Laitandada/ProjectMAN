// import Home from "./pages/Home";

import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { SnackbarProvider } from "notistack";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./redux/store";

import Login from "./pages/Login/index.js";
import Home from "./pages/Home/index.js";
import SignUp from "./pages/Signup/index.js";
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        
          <SnackbarProvider maxSnack={3}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />{" "}
                
                <Route path="/login" element={<Login />} />{" "}
                <Route path="/signup" element={<SignUp />} />{" "}

                {/* 👈 Renders at /app/ */}
              </Routes>
            </BrowserRouter>
          </SnackbarProvider>
        
      </PersistGate>
    </Provider>
  );
}

export default App;
