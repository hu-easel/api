import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  IsUUID,
  Model,
  PrimaryKey, Table
} from 'sequelize-typescript';
import { Content } from './contents/model';
import { Term } from '../terms/model';

@Table
export class Course extends Model<Course> {
  @PrimaryKey
  @IsUUID(4)
  @Default(DataType.UUIDV4)
  @Column
  uuid: string;

  @ForeignKey(() => Content)
  @Column
  contentUuid: string;

  @BelongsTo(() => Content)
  content: Content;

  @ForeignKey(() => Term)
  @Column
  termUuid: string;

  @BelongsTo(() => Term)
  term: Term;

  @AllowNull(false)
  @Column
  section: number;
}