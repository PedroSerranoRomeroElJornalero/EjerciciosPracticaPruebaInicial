import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Laborer } from "../domain/model";
import { LaborerForm } from "../components/LaborerForm";
import { createLaborer } from "../domain/index";

const initialLaborer: Laborer = {
	id: "",
	picture: "https://picsum.photos/300",
	firstName: "",
	lastName: "",
	email: "",
	hireDate: "",
	role: "user",
};

export const LaborerCreate = () => {
	const navigate = useNavigate();
	const [laborer, setLaborer] = useState<Laborer>(initialLaborer);
	const [saving, setSaving] = useState(false);

	const handleChange =
		(field: keyof Laborer) =>
		(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
			setLaborer((prev) => ({
				...prev,
				[field]: event.target.value,
			}));
		};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			setSaving(true);
			const response = await createLaborer({
				...laborer,
				id: crypto.randomUUID(),
				hireDate: laborer.hireDate ? new Date(laborer.hireDate).toISOString() : "",
			});
			navigate(`/laborer-details/${response.id}`);
		} catch (error) {
			console.error("Error creating laborer:", error);
		} finally {
			setSaving(false);
		}
	};

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