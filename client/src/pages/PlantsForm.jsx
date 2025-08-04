import { useForm } from "react-hook-form";
import { usePlants } from "../context/usePlantsContext";
import { useParams, useNavigate } from "react-router";
import { useEffect } from "react";
import { GiPlantSeed } from "react-icons/gi";
import {Input, Label, ButtonForm, PlantFormContainer, TextArea, PlantForm, TextForm, TextError, DivContainerLogo} from '../components';
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function PlantsForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const {
    createPlant,
    getPlant,
    updatePlant,
    error: registerErrors,
  } = usePlants();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadPlant() {
      if (params.id) {
        const plant = await getPlant(params.id);
        if (plant) {
          setValue("name", plant.name);
          setValue("family", plant.family);
          setValue("description", plant.description);
          setValue(
            "adquisitionDate",
            dayjs(plant.adquisitionDate).utc().format("YYYY-MM-DD")
          );
        }
      }
    }
    loadPlant();
  }, [params.id, setValue]);

  const onSubmit = handleSubmit(async(data) => {
    if (!data.adquisitionDate || data.adquisitionDate === "") {
      delete data.adquisitionDate;
    } else if (data.adquisitionDate) {
          data.adquisitionDate = dayjs.utc(data.adquisitionDate).format()
    }
    try {
      if (params.id) {
        await updatePlant(params.id, data);
        return navigate("/plants");
      } else {
        await createPlant(data);
        return navigate("/plants");
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  });

  return (
    <PlantFormContainer>
        <DivContainerLogo>
          <TextForm>
            PLANT REGISTER
          </TextForm>
          <GiPlantSeed className="w-10 h-10 text-lime-800" />
        </DivContainerLogo>

        {registerErrors.map((error, index) => (
          <TextError
            key={index}
          >
            {error}
          </TextError>
        ))}

        
        <PlantForm onSubmit={onSubmit}>
          <div>
            <Label htmlFor="name">
              Plant Name
            </Label>
            <Input
              type="text"
              placeholder="Plant Name"
              {...register("name", { required: true })}
              autoFocus
            />
            {errors.name && (
              <TextError>
                Name is required
              </TextError>
            )}
          </div>

          <div>
            <Label htmlFor="family">Family</Label>
            <Input
              type="text"
              placeholder="Family (e.g. Araceae)"
              {...register("family", { required: true })}
            />
            {errors.family && (
              <TextError>
                Family is required
              </TextError>
            )}
          </div>

          <div>
            <Label htmlFor="description">
              Description
            </Label>
            <TextArea
              rows="4"
              placeholder="Description (care tips, characteristics...)"
              {...register("description", { required: true })}
            />
            {errors.description && (
              <TextError>
                Description is required
              </TextError>
            )}
          </div>

          <div>
            <Label htmlFor="adquisitionDate">
              Adquisition Date
            </Label>
            <Input
              type="date"
              placeholder="Adquisition Date"
              {...register("adquisitionDate")}
            />
          </div>

          <ButtonForm>
            Save
          </ButtonForm>
        </PlantForm>
        
      </PlantFormContainer>
  );
}

export default PlantsForm;
