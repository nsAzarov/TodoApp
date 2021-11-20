import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';
import { StartPage, TodosPage } from './pages';
import { ApiService } from './services';
import { ITodo } from './types';
import { isNote } from './utils';

export const App: FC = () => {
  const [isStartPageOpen, setIsStartPageOpen] = useState(true);
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [activePage, setActivePage] = useState(0);
  const [pagesCount, setPagesCount] = useState(0);

  const [doneTodosCount, setDoneTodosCount] = useState(0);

  const api = useMemo(() => ApiService.getInstance(), []);

  useEffect(() => {
    api.getTodos(activePage).then((res) => setTodos(res));
    api.getDoneTodosCount().then((res) => setDoneTodosCount(res));
  }, [activePage, api]);

  useEffect(() => {
    api.getPagesCount().then((res) => setPagesCount(res));
  }, [activePage, api]);

  const handleSetActivePage = useCallback(
    (page: number) => {
      if (page === 0) setActivePage(page);
      else if (page < 0) setActivePage(pagesCount - (Math.abs(page) % pagesCount));
      else setActivePage(page % pagesCount);
    },
    [pagesCount],
  );

  const createTodo = useCallback(
    (todo: ITodo) => {
      api.createTodo(todo);
    },
    [api],
  );

  const editTask = useCallback(
    (task: ITodo) => {
      const result = [];
      for (const todo of todos) {
        if (todo.id !== task.id) result.push(todo);
        else {
          result.push({ ...todo, ...task });
          api.updateTodo(task);
        }
      }
      setTodos(result);
    },
    [api, todos],
  );

  const toggleNoteDone = useCallback(
    (id: string) => {
      const result: ITodo[] = [];
      for (const todo of todos) {
        if (todo.id !== id) result.push(todo);
        else if (isNote(todo)) {
          result.push({ ...todo, done: !todo.done });
          api.updateTodo({ ...todo, done: !todo.done });
        }
      }
      setTodos(result);
    },
    [api, todos],
  );

  const deleteTodo = useCallback(
    (id: string) => {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      api.deleteTodo(id);
    },
    [api],
  );

  return isStartPageOpen ? (
    <StartPage goToAllTasks={() => setIsStartPageOpen(false)} doneTodosCount={doneTodosCount} />
  ) : (
    <TodosPage
      todos={todos}
      activePage={activePage}
      pagesCount={pagesCount}
      setActivePage={handleSetActivePage}
      createTodo={createTodo}
      editTask={editTask}
      toggleNoteDone={toggleNoteDone}
      deleteTodo={deleteTodo}
    />
  );
};
