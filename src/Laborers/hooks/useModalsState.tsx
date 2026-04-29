import { useState } from "react";
import { Laborer } from "../../Laborers/domain/model";

const emptyLaborer: Laborer = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  hireDate: "",
  role: "user",
  picture: "https://www.w3schools.com/howto/img_avatar.png",
};

type ModalState =
  | { type: "none" }
  | { type: "detail"; laborer: Laborer }
  | { type: "edit"; laborer: Laborer }
  | { type: "create" }
  | { type: "delete"; laborer: Laborer };

export const useModalState = () => {
  const [modal, setModal] = useState<ModalState>({ type: "none" });
  const [formData, setFormData] = useState<Laborer>(emptyLaborer);

  const close = () => setModal({ type: "none" });

  const openDetail = (laborer: Laborer) =>
    setModal({ type: "detail", laborer });

  const openEdit = (laborer: Laborer) => {
    setFormData({ ...laborer, hireDate: laborer.hireDate.split("T")[0] });
    setModal({ type: "edit", laborer });
  };

  const openCreate = () => {
    setFormData(emptyLaborer);
    setModal({ type: "create" });
  };

  const openDelete = (laborer: Laborer) =>
    setModal({ type: "delete", laborer });

  const handleChange =
    (field: keyof Laborer) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  return {
    modal,
    formData,
    close,
    openDetail,
    openEdit,
    openCreate,
    openDelete,
    handleChange,
  };
};