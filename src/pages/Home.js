
import "./Home.css";
import React from "react";
import { createTodo, deleteTodo, loadTodos, updateTodo } from '../services/todoService'

const Home = ({ onFormSubmit }) => {
  const [form] = Form.useForm();

  const onFinish = () => {
      onFormSubmit({
          title: form.getFieldValue('title'),
          descricao: form.getFieldValue('descricao'),
          startDate: form.getFieldValue('startDate'),
          endDate: form.getFieldValue('endDate'),
          completed: false,
      });
      console.log(form.getFieldValue('title'));

      form.resetFields();
  }

  const [refreshing, setRefreshing] = useState(false);
  const [todos, setTodos] = useState([]);
  const [activeTodos, setActiveTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState();

  const handleFormSubmit = (todo) => {
      console.log('Todo to create', todo);
      createTodo(todo).then(onRefresh());
      message.success('Todo added!');
  }

  const handleRemoveTodo = (todo) => {
      deleteTodo(todo.id).then(onRefresh());
      message.warn('Todo removed');
  }

  const handleToggleTodoStatus = (todo) => {
      todo.completed = !todo.completed;
      updateTodo(todo).then(onRefresh());
      message.info('Todo status updated!');
  }

  const refresh = () => {
      loadTodos().then(json => {
          setTodos(json);
          setActiveTodos(json.filter(todo => todo.completed === false));
          setCompletedTodos(json.filter(todo => todo.completed === true));
      }).then(console.log('fetch completed'));
  }

  const onRefresh = useCallback(async () => {
      setRefreshing(true);
      let data = await loadTodos();
      setTodos(data);
      setActiveTodos(data.filter(todo => todo.completed === false));
      setCompletedTodos(data.filter(todo => todo.completed === true));
      setRefreshing(false);
      console.log('refresh state', refreshing);
  }, [refreshing]);

  useEffect(() => {
      refresh();
  }, [onRefresh])

  return (
    <div className="body">
      <div className="container">
        <div className="form">
          <h2>Adicionar nova tarefa</h2>
          <form onFinish={onFinish}>
            <div className="inputBox">
              <input
                type="text"
                placeholder="Nome da tarefa"
              />
            </div>
            <div className="inputBox">
              <input
                type="text"
                placeholder="Descrição"
                />
            </div>
            <div className="dates">
              <div className="inputBox">
                <span>Inicio:</span>
                <input
                  type="date"
                />
              </div>
              <div className="inputBox">
                <span>Fim:</span>
                <input
                  type="date"
                  
                />
              </div>
              <div className="inputBox">
                <input type="button" value="✓"/>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="container">
        <div className="all">
          <h2>Todas as tarefas</h2>
        </div>
      </div>
    </div>
  );
}

export default Home;