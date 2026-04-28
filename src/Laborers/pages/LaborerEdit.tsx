import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../App.scss";
import { editLaborer, getSelectedLaborer } from "../domain/index";
import { Laborer } from "../domain/model";
import { LaborerForm } from "../components/LaborerForm";

export const LaborerEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [laborer, setLaborer] = useState<Laborer | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;

    const loadLaborer = async () => {
      getSelectedLaborer(id)
        .then((response) => setLaborer({ ...response, hireDate: response.hireDate.split("T")[0] }))
        .catch((error) =>
          console.error("Error fetching laborer details:", error),
        );
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
    if (!laborer) return;

    try {
      setSaving(true);

      await editLaborer({
        ...laborer,
        hireDate: laborer.hireDate ? new Date(laborer.hireDate).toISOString() : "",
      });
      navigate(`/laborer-details/${laborer.id}`);
    } catch (error) {
      console.error("Error saving laborer:", error);
    } finally {
      setSaving(false);
    }
  };

  if (!laborer) return <div>Loading...</div>;

  return (
    <LaborerForm
      laborer={laborer}
      saving={saving}
      onSubmit={handleSubmit}
      onChange={handleChange}
      onCancel={() => navigate("/laborers")}
    />
  );
};