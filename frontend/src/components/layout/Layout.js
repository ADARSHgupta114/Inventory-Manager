import React, { Children } from "react";
import Header from "../header/header";

const Layout =()=>{
    return (
        <>
            <Header>
            <div style={{minHeight: "80vh"}} className= "--pad">
                {children}
            </div>
            </Header>
        </>
    );
};
export default Layout;