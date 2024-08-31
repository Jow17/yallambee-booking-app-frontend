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
          <span className="font-bold">Username: </span>
          <span>{user.username}</span>
        </div>
        <div>
          <span className="font-bold">First Name: </span>
          <span>{user.firstName}</span>
        </div>
        <div>
          <span className="font-bold">Last Name: </span>
          <span>{user.lastName}</span>
        </div>
        <div>
          <span className="font-bold">Email: </span>
          <span>{user.email}</span>
        </div>
        <div>
          <span className="font-bold">Phone: </span>
          <span>{user.phone}</span>
        </div>
        <div>
          <span className="font-bold">Date of Birth: </span>
          <span>{new Date(user.dob).toLocaleDateString()}</span>
        </div>
        <div>
          <span className="font-bold">Admin: </span>
          <span>{user.isAdmin ? "Yes" : "No"}</span>
        </div>
      </div>

      <div className="flex gap-2 justify-between items-center p-4 bg-gray-100">
        <Button onClick={onEditUser}>Edit</Button>
        <Button variant="danger" onClick={() => onDelete(user._id)}>
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
