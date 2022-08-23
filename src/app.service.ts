import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Equipamento } from './core/domain/equipamento';
import { Usuario } from './core/domain/usuario';
import { EquipamentoSchema } from './infra/db/typeorm/equipamento.schema';
import { UsuarioEquipamentoSchema } from './infra/db/typeorm/usuario-equipamento.schema';
import { UsuarioSchema } from './infra/db/typeorm/usuario.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UsuarioEquipamentoSchema)
    private usuarioEquipamentoRepository: Repository<UsuarioEquipamentoSchema>,
    @InjectRepository(UsuarioSchema)
    private usuarioRepository: Repository<UsuarioSchema>,
    @InjectRepository(EquipamentoSchema)
    private equipamentoRepository: Repository<EquipamentoSchema>){}
  


  async criarEquipamento(equipamento: Equipamento) {
    const equipamentoSchema = this.equipamentoRepository.create(equipamento);
    return this.equipamentoRepository.save(equipamentoSchema);
  }
  
  
  async associarUsuarioEquipamento(usuario_id: string, equipamento_id: string) {
    

    const [usuario, equipamento] = await Promise.all([ 
      this.usuarioRepository.findOneBy({
        id: usuario_id
      }),
      this.equipamentoRepository.findOneBy({
        id: equipamento_id
      })
    ])

    let usuarioEquipamento;
    if(usuario && equipamento){
      usuarioEquipamento = this.usuarioEquipamentoRepository.save({
        usuario: usuario,
        equipamento: equipamento,
        ativa: true
      })
    }
    else
      throw new HttpException("Usuário e Equipamento devem existir", HttpStatus.FORBIDDEN);

    return usuarioEquipamento
  }
  
  async criarUsuario(usuario: Usuario) {
    const usuarioSchema = this.usuarioRepository.create(usuario);
    return this.usuarioRepository.save(usuarioSchema);
  }
  
}
