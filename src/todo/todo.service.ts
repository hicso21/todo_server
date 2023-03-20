import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Todo } from 'src/todo/todo.model';
import { CreateTodoDto } from './create-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo)
    private todoModel: typeof Todo,
  ) {}

  async getTodoList(): Promise<Todo[]> {
    try {
      const todoList = await this.todoModel.findAll();
      return todoList;
    } catch (error) {
      throw new Error(error);
    }
  }

  async newTodo(title: string): Promise<Todo> {
    try {
      const newTodo = this.todoModel.create({ title });
      return newTodo;
    } catch (error) {
      throw new Error(error);
    }
  }

  async removeTodo(id: number): Promise<any> {
    try {
      const removedTodo = this.todoModel.destroy({ where: { id } });
      return removedTodo;
    } catch (error) {
      throw new Error(error);
    }
  }

  async removeCompletedTodo(): Promise<any> {
    try {
      return this.todoModel.destroy({
        where: {
          completed: true,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async toggleCompleteTodo(id: number): Promise<any> {
    try {
      const todo = await this.todoModel.findOne({ where: { id } });
      return this.todoModel.update(
        { completed: !todo.completed },
        {
          where: {
            id,
          },
        },
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateTodo({ id, title }: CreateTodoDto) {
    return this.todoModel.update(
      { title },
      {
        where: {
          id,
        },
      },
    );
  }
}
