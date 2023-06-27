import { useNavigate, useParams } from "react-router-dom";
import {
    createToDoAPI,
    retrieveToDoAPI,
    updateToDoAPI,
} from "./api/ToDoAPIService";
import { useAuth } from "./security/AuthContext";
import { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import moment from "moment/moment";

function ToDoComponent() {
    const { id } = useParams();
    const authContext = useAuth();
    const navigate = useNavigate();
    const username = authContext.username;

    const [desc, setDesc] = useState("");
    const [targetDate, setTargetDate] = useState("");

    useEffect(() => {
        retrieveTodo();
    }, [id]);

    const retrieveTodo = () => {
        if (id != -1) {
            retrieveToDoAPI(username, id)
                .then((res) => {
                    setDesc(res.data.description);
                    setTargetDate(res.data.targetDate);
                })
                .catch((err) => console.log(err));
        }
    };

    const validate = (values) => {
        let errors = {};
        if (values.desc.length < 5)
            errors.desc = "Enter atleast 5 characters for the description";
        if (
            values.targetDate == null ||
            values.targetDate === "" ||
            !moment(values.targetDate).isValid()
        )
            errors.targetDate = "Please Enter a Valid Date";
        return errors;
    };

    const onSubmit = (values) => {
        const todo = {
            id,
            username,
            description: values.desc,
            targetDate: values.targetDate,
            done: false,
        };

        if (id === -1) {
            createToDoAPI(username, todo)
                .then(() => {
                    navigate("/todos");
                })
                .catch((err) => console.log(err));
        } else {
            updateToDoAPI(username, id, todo)
                .then(() => {
                    navigate("/todos");
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <div className="container">
            <h1>Enter ToDo Details</h1>
            <div>
                <Formik
                    initialValues={{ desc, targetDate }}
                    enableReinitialize={true}
                    onSubmit={onSubmit}
                    validate={validate}
                    validateOnChange={false}
                    validateOnBlur={false}
                >
                    {(props) => (
                        <Form>
                            <ErrorMessage
                                name="desc"
                                component="div"
                                className="alert alert-warning"
                            />
                            <ErrorMessage
                                name="targetDate"
                                component="div"
                                className="alert alert-warning"
                            />
                            <fieldset className="form-group">
                                <label>Description</label>
                                <Field
                                    className="form-control"
                                    type="text"
                                    name="desc"
                                />
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Target Date</label>
                                <Field
                                    className="form-control"
                                    type="date"
                                    name="targetDate"
                                />
                            </fieldset>
                            <div>
                                <button
                                    className="btn btn-success m-3"
                                    type="submit"
                                >
                                    Save
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default ToDoComponent;
