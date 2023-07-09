import { Modal } from "antd";
import React, { useState } from "react";
import axios from "axios";

function DeleteManager({ closeModal, managerId, setIsManagerCreated }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirmDelete = async () => {
    setIsDeleting(true);

    try {
      await axios.post(`http://localhost:8000/api/manager/delete/${managerId}`);
      setIsManagerCreated((prevState) => !prevState);
      closeModal(); // Close the modal after successful deletion
    } catch (error) {
      console.error(error);
    }

    setIsDeleting(false);
  };

  return (
    <Modal
      open={true} // Set this to true to show the modal
      title="Confirm Delete"
      okText="Delete"
      cancelText="Cancel"
      onCancel={closeModal}
      onOk={handleConfirmDelete}
      confirmLoading={isDeleting}
    >
      <p>Are you sure you want to delete this manager?</p>
    </Modal>
  );
}

export default DeleteManager;
