import React, { useState } from "react";
import CommentContext from "./CommentContext";

const CommentContextProvider = ({ children }) => {
    const [commentInpval, setCommnetInpval] = useState(null);
    const [errors, setErrors] = useState({});
    const [errorsForChat, setErrorsForChat] = useState({});
    const [commentedInCommentLog, setCommentedInCommentLog] = useState(false)
    const [errorsFromAuditorToChart, setErrorsFromAuditorToChart] = useState({})
    return (
      <CommentContext.Provider
        value={{
          errorsFromAuditorToChart,
            commentInpval,
            commentedInCommentLog,
            errors,
            errorsForChat,
            setCommnetInpval,
            setErrors,
            setErrorsForChat,
            setCommentedInCommentLog,
            setErrorsFromAuditorToChart,
        }}
      >
        {children}
      </CommentContext.Provider>
    );
  };
  
  export default CommentContextProvider;