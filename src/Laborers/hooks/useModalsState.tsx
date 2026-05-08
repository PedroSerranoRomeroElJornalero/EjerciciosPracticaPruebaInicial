import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Laborer } from "../../Laborers/domain/model";
import { LaborerFormData } from "../domain/laborerSchema";

const emptyLaborer: LaborerFormData = {
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
  const [formData, setFormData] = useState<LaborerFormData>(emptyLaborer);

  const close = () => setModal({ type: "none" });

  const openDetail = (laborer: Laborer) =>
    setModal({ type: "detail", laborer });

  const openEdit = (laborer: Laborer) => {
    setFormData({ 
      ...laborer, 
      hireDate: laborer.hireDate.split("T")[0],
      role: laborer.role as "admin" | "supervisor" | "user"
    });
    setModal({ type: "edit", laborer });
  };

  const openCreate = () => {
    setFormData({ ...emptyLaborer, id: uuidv4() });
    setModal({ type: "create" });
  };

  const openDelete = (laborer: Laborer) =>
    setModal({ type: "delete", laborer });

  return {
    modal,
    formData,
    close,
    openDetail,
    openEdit,
    openCreate,
    openDelete,
  };
};