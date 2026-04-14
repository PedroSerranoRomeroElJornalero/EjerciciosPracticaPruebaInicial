import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../App.scss";
import { editLaborer, getSelectedLaborer } from "../services/api.services";
import { Laborer } from "../models/laborer.model";
import { TableLaborerEditAndAdd } from "../shared/components/tableLaborerEditAndAdd";

const LaborerEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [laborer, setLaborer] = useState<Laborer | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadLaborer = async () => {
      if (!id) {
        return;
      }

      try {
        const response = await getSelectedLaborer(id);
        setLaborer({ ...response, hireDate: response.hireDate.split("T")[0] });
      } catch (error) {
        console.error("Error loading laborer for edit:", error);
      }
    };

    loadLaborer();
  }, [id]);

  const handleChange =
    (field: keyof Laborer) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setLaborer((prev) =>
        prev
          ? {
              ...prev,
              [field]: event.target.value,
            }
          : prev,
      );
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!laborer) {
      return;
    }

    try {
      setSaving(true);

      const payload = {
        ...laborer,
        hireDate: laborer.hireDate ? new Date(laborer.hireDate).toISOString() : "",
      };

      await editLaborer(payload);
      navigate(`/laborer-details/${laborer.id}`);
    } catch (error) {
      console.error("Error saving laborer:", error);
    } finally {
      setSaving(false);
    }
  };

  if (!laborer) {
    return <div>Loading...</div>;
  }

  return (
    <TableLaborerEditAndAdd
      laborer={laborer}
      saving={saving}
      onSubmit={handleSubmit}
      onChange={handleChange}
      onCancel={() => navigate("/laborers")}
    />
  );
};

export default LaborerEdit;
