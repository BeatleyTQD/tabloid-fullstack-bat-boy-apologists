import React, { useContext, useEffect } from "react";
import { UserTypeContext } from "../../providers/UserTypeProvider";


const UserTypeSelect = () => {
  const { userTypes, getAllUserTypes } = useContext(UserTypeContext);
  const [value, setValue] = React.useState("Select a User");

  const userTypeSelect = userTypes.map((userType) => ({
    label: userType.name,
    value: userType.id,
  }));

  useEffect(() => {
    getAllUserTypes();
  }, []);

  return (
    <select
      name="userTypeId"
      id="userTypeId"
      value={value}
      onChange={(e) => {
        setValue(e.currentTarget.value);
      }}
    >
      <option key="0" value="0">
        Select User Type
      </option>
      {userTypeSelect.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
};

export default UserTypeSelect;
