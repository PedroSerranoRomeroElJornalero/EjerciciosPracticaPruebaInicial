import { useState } from "react";
import backgroundImg from "../../../../backend/src/assets/WhiteWallpaper.jpg";
import "../../styles/LaborersStyles.scss";
import { useLaborerColumns } from "./AllLaborersColumns";
import { Table } from "../../../shared/components/table/Table";
import { Modal } from "../../../shared/components/modal/modal";
import { LaborerDetails } from "../LaborerDetails";
import { LaborerForm } from "../LaborerForm";
import { DeleteLaborer } from "../DeleteLaborer";
import { useModalState } from "../../hooks/useModalsState";
import { toISODate } from "../../../shared/date/isoDate";
import { formatDate } from "../../../shared/date/formatDate";
import { Button } from "../../../shared/components/Button/Button";
import { useLaborers } from "@/Laborers/hooks/useLaborerData";
import { LaborerFormData } from "@/Laborers/domain/schemas";

export default function TableAllLaborers() {
  const { laborers, create, edit } = useLaborers();
  const {
    modal, formData, close,
    openDetail, openEdit, openCreate, openDelete,
  } = useModalState();

  const [saving, setSaving] = useState(false);

  const handleSubmit = async (data: LaborerFormData) => {
    try {
      setSaving(true);
      if (modal.type === "edit") {
        await edit.mutateAsync({ ...data, hireDate: toISODate(data.hireDate) });
      } else if (modal.type === "create") {
        await create.mutateAsync({ ...data, hireDate: toISODate(data.hireDate) });
      }
      close();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    close();
  };

  const columns = useLaborerColumns({
    onView: openDetail,
    onEdit: openEdit,
    onDelete: openDelete,
  });

  return (
    <div className="laborersPage" style={{ "--bg-image": `url(${backgroundImg})` } as React.CSSProperties}>
      <div className="laborersContent">
        <div className="headerContainer">
          <Button label="+ Create laborer" color="#1a6b3c" onClick={openCreate} />
        </div>
        <Table data={laborers} columns={columns} keyExtractor={(l) => l.id} />
      </div>

      <Modal isOpen={modal.type === "detail"} onClose={close}>
        {modal.type === "detail" && (
          <LaborerDetails
            laborer={modal.laborer}
            dateOfHire={formatDate(modal.laborer.hireDate)}
            onEdit={() => openEdit(modal.laborer)}
          />
        )}
      </Modal>

      <Modal isOpen={modal.type === "edit" || modal.type === "create"} onClose={close}>
        {(modal.type === "edit" || modal.type === "create") && (
          <LaborerForm
            laborer={formData}
            saving={saving}
            onSubmit={handleSubmit}
            onCancel={close}
          />
        )}
      </Modal>

      <Modal isOpen={modal.type === "delete"} onClose={close}>
        {modal.type === "delete" && (
          <DeleteLaborer
            laborerName={`${modal.laborer.firstName} ${modal.laborer.lastName}`}
            onConfirm={handleDelete}
            onCancel={close}
          />
        )}
      </Modal>
    </div>
  );
}