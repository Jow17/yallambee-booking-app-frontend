import React from "react";
import Select from "./Select";
import Button from "./Button";
import Input from "./Input";

const UpdateBookingForm = () => {
  return (
    <form className=" space-y-4  bg-gray-100 rounded-lg p-8">
      <div className="text-xl font-bold mb-4">Change your booking</div>
      <Input label="Check-in" type="date" />
      <Input label="Check-out" type="date" />
      {/* <Select
        label="Status"
        options={[
          { label: "Pending", value: "pending" },
          { label: "Confirmed", value: "confirmed" },
          { label: "Cancelled", value: "cancelled" },
        ]}
      /> */}
      <div className="flex justify-end">
        <Button>Update</Button>
      </div>
    </form>
  );
};

export default UpdateBookingForm;
