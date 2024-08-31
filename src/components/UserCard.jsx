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
    <div className="bg-white shadow-2xl min-h-[300px] group rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="text-center mb-4">
          <h3 className="h3">{user.firstName} {user.lastName}</h3>
          <p className="text-gray-500">{user.email}</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Username:</span>
            <span>{user.username}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Phone:</span>
            <span>{user.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">DOB:</span>
            <span>{new Date(user.dob).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Admin:</span>
            <span>{user.isAdmin ? "Yes" : "No"}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center p-4 bg-gray-100 border-t">
        <button
          className="btn btn-secondary btn-sm"
          onClick={onEditUser}
        >
          Edit
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(user._id)}
        >
          Delete
        </button>
      </div>

      {isEditUserModalOpen && (
        <Modal
          title={"Edit User"}
          onClose={() => setIsEditUserModalOpen(false)}
        >
        <UpdateUserDetailsForm 
          user={user} 
          onEdit={(updatedUser) => {
          onEdit(updatedUser); // Ensure this function is correctly passed and is valid
          setIsEditUserModalOpen(false); // Close the modal after editing
      }}
      onClose={() => setIsEditUserModalOpen(false)} 
    />
  </Modal>
)}
    </div>
  );
};

export default UserCard;