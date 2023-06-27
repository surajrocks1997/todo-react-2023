import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { retrieveHelloWorldPathVariable } from "./api/HelloWorldAPIService";
import { useAuth } from "./security/AuthContext";

export function WelcomeComponent() {
    const { username } = useParams();
    const authContext = useAuth();

    const [message, setMessage] = useState(null);

    const callHelloWorldRestAPI = () => {
        retrieveHelloWorldPathVariable(username, authContext.token)
            .then((res) => successResponse(res))
            .catch((err) => errorResponse(err));
    };

    const successResponse = (response) => {
        setMessage(response.data.message);
    };
    const errorResponse = (error) => {
        console.log(error);
    };

    return (
        <div className="Welcome">
            <h1>Welcome {username}</h1>
            <div>
                Manage Todos <Link to="/todos">Click Here</Link>
            </div>
            <div>
                <button
                    className="btn btn-success m-5"
                    onClick={callHelloWorldRestAPI}
                >
                    Call to HelloWorld
                </button>
            </div>
            <div className="text-info">{message}</div>
        </div>
    );
}
