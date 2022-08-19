import { Usuario } from "./usuario";
import { Equipamento } from "./equipamento";

export interface UsuarioEquipamento {
    readonly usuario: Usuario;

    readonly equipamento: Equipamento;

    readonly ativa: boolean;
}