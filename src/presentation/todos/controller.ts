import { Request, Response } from 'express';

const todos = [
  { id: 1, text: 'Buy Milk', createdAt: new Date() },
  { id: 2, text: 'Buy Bread', createdAt: null },
  { id: 3, text: 'Buy Eggs', createdAt: new Date() },
];

export class TodosController {
  constructor() {}

  public getTodos = (req: Request, res: Response) => {
    return res.json(todos);
  };

  public getTodoById = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID supplied' });
    }

    const todo = todos.find((todo) => todo.id === id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    return res.json(todo);
  };

  public createTodo = (req: Request, res: Response) => {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: 'Text property is required' });
    }

    const newTodo = { id: todos.length + 1, text, createdAt: new Date() };

    todos.push(newTodo);

    return res.status(201).json(newTodo);
  };

  public updateTodo = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID supplied' });
    }

    const todo = todos.find((todo) => todo.id === id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    const { text, createdAt } = req.body;

    todo.text = text || todo.text;

    if (createdAt === null) {
      todo.createdAt = null;
    } else {
      todo.createdAt = new Date(createdAt || todo.createdAt);
    }

    return res.json(todo);
  };

  public deleteTodo = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID supplied' });
    }

    const todo = todos.find((todo) => todo.id === id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    const index = todos.indexOf(todo);

    todos.splice(index, 1);

    return res.status(204).json();
  };
}
