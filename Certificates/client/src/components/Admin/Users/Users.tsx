import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import { 
    getUsersURL, 
    deleteUserURL,
    addUserURL,
} from "const/API's";
import "./Users.css";

interface User {
    id: number;
    name: string;
}

function Users() {

    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const form = useRef();

    useEffect(() => getUsers(), []);

    function deleteUser(id: number) {

        setIsLoading(true);
        axios
            .delete(deleteUserURL, {
                data: id
            })
            .then(getUsers);
    }

    function addUser() {

        let formData = new FormData(form.current);

        axios
            .post(addUserURL, {
                data: formData.get("username")
            })
            .then(getUsers);
    }

    function getUsers() {

        setIsLoading(true);
        axios
            .get(getUsersURL)
            .then(
                res => setUsers(res.data),
                err => console.log(err)
            )
            .then(() => setIsLoading(false));
    }

    return (
        <section className="users">
            ПОЛЬЗОВАТЕЛИ
            <form ref={form} onSubmit={e => {e.preventDefault(); addUser()}}>
                <input name="username" type="text" />
                <input type="submit" />
            </form>
            <table className="usersTable">
                <thead>
                    <tr>
                        <th>Имя пользователя</th>
                        <th>Удалить</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(item => 
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td onClick={() => deleteUser(item.id)}>Х</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {isLoading && <div className="loading">Загрузка...</div>}
        </section>
    );
}

export default Users;