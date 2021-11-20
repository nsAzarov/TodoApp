import Axios from 'axios';
import { ITodo } from 'src/types';

export class ApiService {
  private static instance: ApiService;

  private constructor() {}

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }

    return ApiService.instance;
  }

  async getResource(url: string) {
    const res = await fetch(`${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return res.json();
  }

  async getDoneTodos(page: number) {
    const Todos = await this.getResource(`/DoneTodos/${page}`);
    return Todos;
  }

  async getDoneTodosCount() {
    const Todos = await this.getResource(`/DoneTodosCount`);
    return Todos;
  }

  async getTodos(page: number) {
    const Todos = await this.getResource(`/Todos/${page}`);
    return Todos;
  }

  async getPagesCount() {
    const Todos = await this.getResource('/PagesCount');
    return Todos;
  }

  async createTodo(todo: ITodo) {
    await Axios.post(`/CreateTodo`, { ...todo })
      .then((response: any) => console.log(response))
      .catch((error: any) => console.log(error));
  }

  async updateTodo(todo: ITodo) {
    await Axios.post(`/UpdateTodo`, { ...todo })
      .then((response: any) => console.log(response))
      .catch((error: any) => console.log(error));
  }

  async deleteTodo(id: string) {
    await Axios.post(`/DeleteTodo/${id}`)
      .then((response: any) => console.log(response))
      .catch((error: any) => console.log(error));
  }
}
