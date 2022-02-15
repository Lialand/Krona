/* Хук создан для добавления и удаления пунктов списка */

import { useState } from "react";

export default function useTodoState(initialValue) {

    const [todos, setTodos] = useState(initialValue);

    return {
        todos,
        addTodo: todoText => {
            setTodos([...todos, todoText]);
        },
        deleteTodo: todoIndex => {
            const newTodos = todos
                .filter((_, index) => index !== todoIndex);

            setTodos(newTodos);
        }
    };
};