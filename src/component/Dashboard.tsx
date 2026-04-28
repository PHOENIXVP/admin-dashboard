import { useEffect, useState } from "react";

const Dashboard = () => {
  const [todoList, setTodoList] = useState([]);
  const [isloading, setIsloading] = useState(true);

  useEffect(() => {
    try {
      fetch("https://jsonplaceholder.typicode.com/todos/")
        .then((res) => res.json())
        .then((data) => setTodoList(data))
        .catch((error) => console.error("Got error while fetchin data", error));
    } catch (error) {}
  }, []);
  if (isloading) {
    <>Loading List</>;
  }
  return (
    <>
      {todoList && todoList.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Task</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {todoList.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.title}</td>
                <td>{todo.completed ? "Done" : "Pending"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Dashboard;
