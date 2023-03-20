import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table
export class Todo extends Model {
  @PrimaryKey
  @Column({ allowNull: false, unique: true, autoIncrement: true })
  id: number;

  @Column({ allowNull: false })
  title: string;

  @Column({ defaultValue: false })
  completed: boolean;
}
