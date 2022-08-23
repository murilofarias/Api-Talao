import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TalaoSchema } from "./talao.schema";
import { UsuarioEquipamentoSchema } from "./usuario-equipamento.schema";

@Entity()
export class EquipamentoSchema{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true
  })
  alias:string;

  @OneToMany(() => UsuarioEquipamentoSchema, (usuarioEquipamento) => usuarioEquipamento.equipamento)
  equipamentoUsuarios: UsuarioEquipamentoSchema[];

  @OneToMany(() => TalaoSchema, (talao) => talao.equipamento)
  taloes : TalaoSchema[];
}