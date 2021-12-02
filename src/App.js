/** @format */

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
//components
import store from "src/redux/store.js";
import PublicRoutes from "src/routes/PublicRoutes";

const App = () => {
    return (
        <>
            <Provider store={store}>
                <BrowserRouter>
                    <SnackbarProvider>
                        <PublicRoutes />
                    </SnackbarProvider>
                </BrowserRouter>
            </Provider>
        </>
    );
};

export default App;
