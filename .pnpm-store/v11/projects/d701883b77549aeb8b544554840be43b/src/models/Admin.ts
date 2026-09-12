import bcrypt from 'bcrypt';
import { model, Schema } from 'mongoose';

export interface Admin {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const adminSchema = new Schema<Admin>(
  {
    name: {
      type: String,
      required: [true, 'O nome é obrigatório.'],
      trim: true,
      maxlength: [100, 'O nome deve ter no máximo 100 caracteres.'],
    },
    email: {
      type: String,
      required: [true, 'O e-mail é obrigatório.'],
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: [254, 'O e-mail deve ter no máximo 254 caracteres.'],
    },
    password: {
      type: String,
      required: [true, 'A senha é obrigatória.'],
      minlength: [8, 'A senha deve ter pelo menos 8 caracteres.'],
      select: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

adminSchema.pre('save', async function hashPassword() {
  if (!this.isModified('password')) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 12);
});

export const AdminModel = model<Admin>('Admin', adminSchema);
