import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos';

export class TodosController {
  constructor() {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await prisma.todo.findMany();

    return res.json(todos);
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID supplied' });
    }

    const todo = await prisma.todo.findUnique({
      where: {
        id,
      },
    });

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    return res.json(todo);
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error) {
      return res.status(400).json({ message: error });
    }

    const newTodo = await prisma.todo.create({
      data: createTodoDto!,
    });

    return res.status(201).json(newTodo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const [error, updateTodoDto] = UpdateTodoDto.create({
      id,
      ...req.body,
    });

    if (error) {
      return res.status(400).json({ message: error });
    }

    const todo = await prisma.todo.findUnique({
      where: {
        id,
      },
    });

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    const updateTodo = await prisma.todo.update({
      where: {
        id,
      },
      data: updateTodoDto!.values,
    });

    return res.json(updateTodo);
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID supplied' });
    }

    const todo = await prisma.todo.findUnique({
      where: {
        id,
      },
    });

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    const deleteTodo = await prisma.todo.delete({
      where: {
        id,
      },
    });

    return res.json(deleteTodo);
  };
}
