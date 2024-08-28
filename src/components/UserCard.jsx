import React, { useState } from "react";
import Button from "./Button";
import Modal from "./Modal";
import UpdateUserDetailsForm from "./UpdateUserDetailsForm";

const UserCard = ({ user, onDelete, onEdit }) => {
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);

  const onEditUser = () => {
    setIsEditUserModalOpen(true);
  };

  return (
    <div className="bg-slate-50 shadow-md rounded-lg overflow-hidden">
      <div className="p-4">
        <div>
          <span className="font-bold">First name: </span>
          <span>{user.firstName}</span>
        </div>
        <div>
          <span className="font-bold">Last name: </span>
          <span>{user.lastName}</span>
        </div>
        <div>
          <span className="font-bold">Email: </span>
          <span>{user.email}</span>
        </div>
      </div>

      <div className="flex gap-2 justify-between items-center p-4 bg-gray-100">
        <Button onClick={onEditUser}>Edit</Button>
        <Button varient="danger" onClick={() => onDelete(user._id)}>
          Delete
        </Button>
      </div>

      {isEditUserModalOpen && (
        <Modal
          title={"Edit User"}
          onClose={() => setIsEditUserModalOpen(false)}
        >
          <UpdateUserDetailsForm user={user} onEdit={onEdit} />
        </Modal>
      )}
    </div>
  );
};

export default UserCard;
