import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import getDbConnection from './db-connection';

export interface PermissionModelFields
  extends Model<
    InferAttributes<PermissionModelFields>,
    InferCreationAttributes<PermissionModelFields>
  > {
  id: CreationOptional<number>;
  ability: string;
  createdAt: number;
  updatedAt: number;
}

let permissionModel;
export function getPermissionModel() {
  if (!permissionModel) {
    permissionModel = getDbConnection().define<PermissionModelFields>(
      'Permission',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        ability: {
          type: DataTypes.STRING,
        },
        createdAt: {
          type: DataTypes.DATE,
        },
        updatedAt: {
          type: DataTypes.DATE,
        },
      },
      { freezeTableName: true }
    );
  }
  return permissionModel;
}