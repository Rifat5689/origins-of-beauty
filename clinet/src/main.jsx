import './index.css'
import AppProvider from './providers';
import router from './routes'
import ReactDOM from "react-dom/client";

import { RouterProvider } from "react-router/dom";



const root = document.getElementById("root");

   

ReactDOM.createRoot(root).render(
 <AppProvider> <RouterProvider router={router} /></AppProvider>,
);


