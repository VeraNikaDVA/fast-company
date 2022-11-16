import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import api from "../../api";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioFiekd";
import MultiSelectField from "../common/form/multiSelectField";

const EditUserForm = ({ id }) => {
    const history = useHistory();
    const [user, setUser] = useState();
    const [qualities, setQualities] = useState([]);
    const [professions, setProfession] = useState();
    useEffect(() => {
        api.users.getById(id).then((data) =>
            setUser(
                data
            )
        );
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);
    const handleChange = (target) => {
        setUser((prevState) => (
            { ...prevState, [target.name]: target.value }
        ));
    };
    const getDefaultValueQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            qualitiesArray.push({
                value: elem._id,
                label: elem.name,
                color: elem.color
            });
        }
        return qualitiesArray;
    };
    const getProfessionById = (id) => {
        if (typeof id === "string") {
            for (const prof of professions) {
                if (prof.value === id) {
                    return { _id: prof.value, name: prof.label };
                }
            }
        } else {
            return id;
        }
    };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                } else if (elem._id === qualities[quality].value) {
                    qualitiesArray.push(elem);
                }
            }
        }
        return qualitiesArray;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const { profession, qualities } = user;
        const data = {
            ...user,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        };
        api.users.update(id, data);
        history.push(`/users/${id}`);
    };
    return <>
        {
            user &&
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                            />
                            <SelectField
                                label="Выберите свою профессию"
                                defaultOption="Choose..."
                                onChange={handleChange}
                                options={professions}
                                value={user.profession._id}
                                name="profession"
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={user.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите ваш пол"
                            />
                            <MultiSelectField
                                options={qualities}
                                onChange={handleChange}
                                defaultValue={getDefaultValueQualities(user.qualities)}
                                name="qualities"
                                label="Выберите ваши качества"
                            />
                            <button
                                type="submit"
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        }
    </>;
};

EditUserForm.propTypes = {
    id: PropTypes.string
};

export default EditUserForm;
