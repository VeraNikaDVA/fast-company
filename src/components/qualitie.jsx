import React from "react";

const qualitie = (qualitie) => {
  return <span class={`btn m-1 btn-${qualitie.color}`}>{qualitie.name}</span>;
};

export default qualitie;
