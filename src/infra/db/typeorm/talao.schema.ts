
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EquipamentoSchema } from "./equipamento.schema";
import { FaixaSchema } from "./faixa.schema";
import { UsuarioSchema } from "./usuario.schema";

@Entity()
export class TalaoSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  identificador: string;

  @Column("int")
  situacao: number;

  @Column()
  dataLiberacao: Date;

  @Column()
  vinculado:boolean;

  @ManyToOne(() => EquipamentoSchema, (equipamento) => equipamento.taloes)
  equipamento: EquipamentoSchema;

  @ManyToOne(() => UsuarioSchema, (usuario) => usuario.taloes)
  requestedBy: UsuarioSchema;

  @ManyToOne(() => FaixaSchema, (faixa) => faixa.taloes)
  faixa: FaixaSchema


}