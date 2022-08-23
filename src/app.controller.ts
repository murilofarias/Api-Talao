import { Body, Controller, Param, ParseUUIDPipe, Post } from "@nestjs/common";
import { AppService } from "./app.service";
import { Equipamento } from "./core/domain/equipamento";
import { Usuario } from "./core/domain/usuario";
import { ApiTags } from '@nestjs/swagger';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("/usuarios")
  async criarUsuario(@Body() usuario: Usuario){
    return this.appService.criarUsuario(usuario);
  }

  @Post("/equipamentos")
  async criarEquipamento(@Body() equipamento: Equipamento){
    return this.appService.criarEquipamento(equipamento);
  }

  @Post("/usuarios/:usuario_id/associar-equipamento/:equipamento_id")
  async associarUsuario(@Param('usuario_id', ParseUUIDPipe) usuario_id: string, @Param('equipamento_id', ParseUUIDPipe) equipamento_id: string ){
    return this.appService.associarUsuarioEquipamento(usuario_id, equipamento_id);
  }
}
