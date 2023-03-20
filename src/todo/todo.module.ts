import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Todo } from 'src/todo/todo.model';
import { TodoController } from 'src/todo/todo.controller';
import { TodoService } from 'src/todo/todo.service';

@Module({
  imports: [SequelizeModule.forFeature([Todo])],
  providers: [TodoService],
  controllers: [TodoController],
  exports: [SequelizeModule],
})
export class TodoModule {}
