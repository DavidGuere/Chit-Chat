import React from "react";

function UsersListPlaceholder({ data }) {
  return (
    <>
      <div className="userData">
        <div>
          {data[0].map((pin, index) => {
            if (data[1][index] === "") {
              data[1][index] = "Username was not given";
            }
            return (
              <div key={index}>
                Username: {data[1][index]}, PIN: {pin}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default UsersListPlaceholder;
