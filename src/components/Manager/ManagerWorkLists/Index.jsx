import React from "react";
import WorkListHeader from "./WorkListHeader";
import WorkListBody from "./WorkListBody";
import { useState } from "react";
const WorkList = () => {
  const [query, setQuery] = useState();
  return (
    <>
      <WorkListHeader query={query}/>
      <WorkListBody onQuery={setQuery}  />
    </>
  );
};
export default WorkList;
