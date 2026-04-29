import { useState } from "react";
import backgroundImg from "../../../../backend/src/assets/WhiteWallpaper.jpg";
import "../../styles/LaborersStyles.scss";
import { useLaborerColumns } from "./AllLaborersColumns";
import { Table } from "../../../shared/table/Table";
import { Modal } from "../../../shared/modal/modal";
import { LaborerDetails } from "../LaborerDetails";
import { LaborerForm } from "../LaborerForm";
import { DeleteLaborer } from "../DeleteLaborer";
import { Laborer } from "../../domain/model";
import { createLaborer, editLaborer } from "../../domain/index";
import { useModalState } from "../../hooks/useModalsState";
import { toISODate } from "../../../shared/date/isoDate";
import { formatDate } from "../../../shared/date/formatDate";
import { Button } from "../../../shared/Button/Button";

export default function TableAllLaborers({
  laborers,
  onRefresh,
}: {
  laborers: Laborer[];
  onRefresh: () => Promise<void>;
}) {
  const {
    modal, formData, close,
    openDetail, openEdit, openCreate, openDelete,
    handleChange,
  } = useModalState();

  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setSaving(true);
      if (modal.type === "edit") {
        await editLaborer({ ...formData, hireDate: toISODate(formData.hireDate) });
      } else if (modal.type === "create") {
        await createLaborer({ ...formData, hireDate: toISODate(formData.hireDate) });
      }
      await onRefresh();
      close();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
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
            onChange={handleChange}
            onCancel={close}
          />
        )}
      </Modal>

      <Modal isOpen={modal.type === "delete"} onClose={close}>
        {modal.type === "delete" && (
          <DeleteLaborer
            laborerName={`${modal.laborer.firstName} ${modal.laborer.lastName}`}
            onConfirm={async () => {}}
            onCancel={close}
          />
        )}
      </Modal>
    </div>
  );
}