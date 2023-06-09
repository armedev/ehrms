import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Drug, DrugForm } from './drug';
import { DrugType } from './pharmacyitem';
import { Staff } from './staff';
import { Visit } from './visit';
import { Patient } from './patient';
import {
  FindAttributeOptions,
  GroupOption,
  Includeable,
  Order,
  WhereOptions,
} from 'sequelize/types/model';
import { calcLimitAndOffset, paginate } from '../../core/helpers/helper';

export enum DispenseStatus {
  DISPENSED = 'Dispensed',
  PENDING = 'Pending',
  RETURNED = 'Returned',
}

export enum PaymentStatus {
  PENDING = 'Pending',
  PAID = 'Paid',
  CLEARED = 'Cleared',
}

export enum BillingStatus {
  BILLED = 'Billed',
  UNBILLED = 'Unbilled',
}

@Table({ timestamps: true, tableName: 'Prescribed_Drugs' })
export class PrescribedDrug extends Model {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, allowNull: false, autoIncrement: true })
  id: number;

  @ForeignKey(() => Drug)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'drug is required',
      },
    },
  })
  drug_id: number;

  @Column({
    type: DataType.ENUM(DrugType.CASH, DrugType.NHIS),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'drug type is required',
      },
    },
  })
  drug_type: DrugType;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'quantity is required',
      },
    },
  })
  quantity_prescribed: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'quantity to dispense is required',
      },
    },
  })
  quantity_to_dispense: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'route is required',
      },
    },
  })
  route: number;

  @Column({
    type: DataType.ENUM(DrugForm.DRUG, DrugForm.CONSUMABLE),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'drug form is required',
      },
    },
  })
  drug_form: DrugForm;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'frequency is required',
      },
    },
  })
  frequency: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'strength is required',
      },
    },
  })
  strength: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'duration is required',
      },
    },
  })
  duration: number;

  @Column({
    type: DataType.TEXT,
  })
  notes: string;

  @Column({
    type: DataType.DECIMAL(12, 2),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'total price is required',
      },
    },
  })
  total_price: number;

  @Column({
    type: DataType.ENUM(DispenseStatus.DISPENSED, DispenseStatus.PENDING, DispenseStatus.RETURNED),
    allowNull: false,
    defaultValue: DispenseStatus.PENDING,
  })
  dispense_status: DispenseStatus;

  @Column({
    type: DataType.ENUM(PaymentStatus.CLEARED, PaymentStatus.PAID, PaymentStatus.PENDING),
    allowNull: false,
    defaultValue: PaymentStatus.PENDING,
  })
  payment_status: DispenseStatus;

  @Column({
    type: DataType.ENUM(BillingStatus.BILLED, BillingStatus.UNBILLED),
    allowNull: false,
    defaultValue: BillingStatus.UNBILLED,
  })
  billing_status: BillingStatus;

  @ForeignKey(() => Staff)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  examiner: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'date prescribed is required',
      },
    },
  })
  date_prescribed: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'prescribed strength is required',
      },
    },
  })
  prescribed_strength: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'duration unit is required',
      },
    },
  })
  duration_unit: string;

  @Column({
    type: DataType.DECIMAL(12, 2),
  })
  capitated_price: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_nhis_drug_approved: boolean;

  @ForeignKey(() => Visit)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'visit id is required',
      },
    },
  })
  visit_id: number;

  @ForeignKey(() => Patient)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'patient id is required',
      },
    },
  })
  patient_id: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'start date is required',
      },
    },
  })
  start_date: Date;

  @BelongsTo(() => Staff)
  requester: Staff;

  @BelongsTo(() => Drug)
  drug: Drug;

  @BelongsTo(() => Visit)
  visit: Visit;

  @BelongsTo(() => Patient)
  patient: Patient;

  static async paginate(param: {
    paginate: number;
    attributes?: FindAttributeOptions;
    where?: WhereOptions<any>;
    page?: number;
    order?: Order;
    group?: GroupOption;
    include?: Includeable | Includeable[];
  }) {
    const { limit, offset } = calcLimitAndOffset(param.page, param.paginate);
    const options = Object.assign({ limit, offset }, param);
    const data = await this.findAndCountAll(options);
    return paginate(data, param.page, limit);
  }
}
