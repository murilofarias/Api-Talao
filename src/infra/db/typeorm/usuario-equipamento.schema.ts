import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EquipamentoSchema } from "./equipamento.schema";
import { UsuarioSchema } from "./usuario.schema";

@Entity()
export class UsuarioEquipamentoSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  ativa: boolean;

  @ManyToOne(() => UsuarioSchema, (usuario) => usuario.usuarioEquipamentos)
  usuario: UsuarioSchema;

  @ManyToOne(() => EquipamentoSchema, (equipamento) => equipamento.equipamentoUsuarios)
  equipamento: EquipamentoSchema;
}