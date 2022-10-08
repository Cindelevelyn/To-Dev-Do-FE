import axios from 'axios'

const baseUrl = `${process.env.REACT_APP_API_URL}/api/Todos`

export const loadTodos = () => {
  return axios.get(baseUrl).then((res) => res.json());
};

export const getTodo = (id) => {
  return axios.get(`${baseUrl}/${id}`).then((res) => res.json());
};

export const createTodo = (todo) => {
  return axios.post(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: todo.title,
      completed: todo.completed,
    }),
  }).then((res) => res.json());
};

export const updateTodo = (todo) => {
  return axios.put(`${baseUrl}/${todo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: todo.id,
      title: todo.title,
      completed: todo.completed,
    }),
  });
};

export const deleteTodo = (id) => {
  return axios.delete(`${baseUrl}/${id}`, {
    method: "DELETE",
  }).then(res => res.json());
};