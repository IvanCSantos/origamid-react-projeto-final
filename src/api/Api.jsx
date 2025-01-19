import React from "react";
import UserPost from "./endpoints/UserPost";
import TokenPost from "./endpoints/TokenPost";
import PhotoPost from "./endpoints/PhotoPost";
import PhotoGet from "./endpoints/PhotoGet";

/* Este componente não será utilizado no projeto, está aqui apenas como referência */

const Api = () => {
  return (
    <div>
      <h2 style={{ marginTop: "4rem" }}>USER POST</h2>
      <UserPost />

      <h2 style={{ marginTop: "4rem" }}>TOKEN POST</h2>
      <TokenPost />

      <h2 style={{ marginTop: "4rem" }}>PHOTO POST</h2>
      <PhotoPost />

      <h2 style={{ marginTop: "4rem" }}>PHOTO GET</h2>
      <PhotoGet />
    </div>
  );
};

export default Api;
