import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TalaoSchema } from "./talao.schema";
import { UsuarioEquipamentoSchema } from "./usuario-equipamento.schema";

@Entity()
export class UsuarioSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  login: string;

  @Column()
  matricula: string;

  @OneToMany(() => UsuarioEquipamentoSchema, (usuarioEquipamento) => usuarioEquipamento.usuario)
  usuarioEquipamentos: UsuarioEquipamentoSchema[];

  @OneToMany(() => TalaoSchema, (talao) => talao.requestedBy)
  taloes : TalaoSchema[];


}