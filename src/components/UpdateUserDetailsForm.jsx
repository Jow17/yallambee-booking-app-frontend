import React from "react";
import Button from "./Button";
import Input from "./Input";

const UpdateUserDetailsForm = () => {
  return (
    <div>
      <form className="space-y-4 p-6 mx-auto ">
        <Input type="text" label="First Name" id="firstname" />
        <Input type="text" label="Last Name" id="lastname" />
        <Input type="email" label="Email" id="email" />
        <Input type="text" label="Phone Number" id="phone" />
        <Input type="text" label="Address" id="address" />
        <Input type="date" label="Date of birth" id="dob" />
        <div className="flex justify-end">
          <Button>Save</Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUserDetailsForm;
