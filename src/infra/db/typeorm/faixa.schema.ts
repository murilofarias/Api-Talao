
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { TalaoSchema } from './talao.schema';

@Entity()
export class FaixaSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  idTenant: string;

  @Column("int")
  numInicial: number;

  @Column("int")
  numFinal: number;

  @Column("int")
  proximo: number;

  @Column({length: 3})
  prefixo: string;

  @Column("int")
  tipoRegistro: number;

  @Column()
  dataCriacao:Date;

  @Column({ default: true })
  ativa: boolean;

  @OneToMany(() => TalaoSchema, (taloes) => taloes.faixa)
  taloes: TalaoSchema[];
  
}
