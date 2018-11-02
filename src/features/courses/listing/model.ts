import { AllowNull, Column, DataType, Default, IsUUID, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table
export class Listing extends Model<Listing> {
  @PrimaryKey
  @IsUUID(4)
  @Default(DataType.UUIDV4)
  @Column
  uuid: string;

  @AllowNull(false)
  @Column
  department: string;

  @AllowNull(false)
  @Column
  identifier: number;
}
