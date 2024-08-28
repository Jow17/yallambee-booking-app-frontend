import React, { useState } from "react";
import Button from "./Button";
import Modal from "./Modal";
import UpdateBookingForm from "./UpdateBookingForm";

const BookingCard = ({ booking, type = "user", onDelete, onEdit }) => {
  const [isEditBookingModalOpen, setIsEditBookingModalOpen] = useState(false);

  const onEditBooking = () => {
    setIsEditBookingModalOpen(true);
  };

  return (
    <div className="bg-slate-50 shadow-md rounded-lg overflow-hidden">
      <div>
        <img
          src={booking.property.imageUrl || "https://via.placeholder.com/400"}
          alt={booking.property.name}
          className="w-full h-64 object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold">{booking.property.name}</h3>
        <div className="flex gap-2 justify-between ">
          <p className="text-gray-600">Price: ${booking.totalPrice || "N/A"}</p>
          <p className="text-gray-600">
            Dates: {new Date(booking.startDate).toLocaleDateString()} -{" "}
            {new Date(booking.endDate).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* {type === "admin" && ( */}
        <>
          <div className="flex gap-2 justify-between items-center p-4 bg-gray-100">
            <Button onClick={onEditBooking}>Update</Button>
            <Button varient="danger" onClick={() => onDelete(booking._id)}>
              Cancel
            </Button>
          </div>
          {isEditBookingModalOpen && (
            <Modal
              title={"Edit Booking"}
              onClose={() => setIsEditBookingModalOpen(false)}
            >
              <UpdateBookingForm booking={booking} onEdit={onEdit} />
            </Modal>
          )}
        </>
      {/* )} */}
    </div>
  );
};

export default BookingCard;
