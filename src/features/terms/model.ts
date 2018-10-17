import { AllowNull, Column, DataType, Default, IsUUID, Model, PrimaryKey, Table } from 'sequelize-typescript';

export enum TermType {
  FALL,
  SPRING,
  SUMMER_ONE,
  SUMMER_TWO,
  INTERSESSION_ONE,
  INTERSESSION_TWO
}

@Table
export class Term extends Model<Term> {
  @PrimaryKey
  @IsUUID(4)
  @Default(DataType.UUIDV4)
  @Column
  uuid: string;

  @AllowNull(false)
  @Column
  type: TermType;

  @AllowNull(false)
  @Column
  startDate: Date;

  @AllowNull(false)
  @Column
  endDate: Date;
}
