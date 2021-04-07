/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from "react";
import CreateRecipeForm from "./components/CreateRecipeForm";

/* ADD ROUTER*/
const App = () => {
    return ( 
        <>
        <h1> Hello cookbook app </h1>
        <CreateRecipeForm/>
        </>
    ); 
}
export default App; 