import React from "react";
import Spinner from "./spriner";


const LoadingPage:React.FC = () => {
    return <div className="fixed top-0 bottom-0 right-0 left-0 bg-[rgba(0,0,0,0.7)]  bg-opacity-30 z-50 flex items-center justify-center">
        <Spinner/>
    </div>
}

export default LoadingPage;