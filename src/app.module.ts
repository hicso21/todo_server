import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoController } from './todo/todo.controller';
import { TodoService } from './todo/todo.service';
import { TodoModule } from './todo/todo.module';
import { Todo } from './todo/todo.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'dpg-cgc77k5269v4icurmflg-a',
      port: 5432,
      username: 'hicso',
      password: 'thomas2110',
      database: 'todolist_4cy8',
      models: [Todo],
      autoLoadModels: true,
      synchronize: true,
    }),
    TodoModule,
  ],
  controllers: [AppController, TodoController],
  providers: [AppService, TodoService],
})
export class AppModule {}
