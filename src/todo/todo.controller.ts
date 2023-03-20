import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Todo } from 'src/todo/todo.model';
import { TodoService } from 'src/todo/todo.service';
import { CreateTodoDto } from './create-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Header('Access-Control-Allow-Origin', '*')
  @Get('getAll')
  async getTodoList(): Promise<Todo[]> {
    try {
      const listOfTodos = await this.todoService.getTodoList();
      return listOfTodos;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Header('Access-Control-Allow-Origin', '*')
  @Post('postNewTodo')
  async createTodo(@Body() todo: CreateTodoDto): Promise<any> {
    try {
      const newTodo = await this.todoService.newTodo(todo.title);
      return newTodo;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Header('Access-Control-Allow-Origin', '*')
  @Patch('patchTodoTitle')
  async updateTodo(@Body() todo: CreateTodoDto): Promise<any> {
    try {
      const { id, title } = todo;
      return await this.todoService.updateTodo({ id, title });
    } catch (error) {
      throw new Error(error);
    }
  }

  @Header('Access-Control-Allow-Origin', '*')
  @Patch('patchTodoCompleted/:id')
  async updateCompletedTodo(@Param('id') id: number) {
    try {
      return await this.todoService.toggleCompleteTodo(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Header('Access-Control-Allow-Origin', '*')
  @Delete('deleteTodo/:id')
  async removeTodo(@Param('id') id: number): Promise<any> {
    try {
      return await this.todoService.removeTodo(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Header('Access-Control-Allow-Origin', '*')
  @Delete('deleteAllCompleted')
  async removeCompletedTodo(): Promise<any> {
    try {
      return await this.todoService.removeCompletedTodo();
    } catch (error) {
      throw new Error(error);
    }
  }
}
