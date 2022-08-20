
import { Usuario } from "./usuario";
import { Equipamento } from "./equipamento";
import { Faixa } from "./faixa";
import { SituacaoTalao } from "./enum/situacao-talao";


export class Talao {
    constructor(faixa: Faixa, usuario: Usuario, equipamento: Equipamento, prefixo: string, numero: string, id :string = null){

        if(id)
            this.id = id;
            
        this.faixa = faixa;
        this._usuario = usuario;
        this._equipamento = equipamento;
        this._identificador = prefixo + numero.padStart(10 - prefixo.length, "0" );
        this._situacao = SituacaoTalao.Liberado;
        this._dataLiberacao = new Date();
    }

    marcarUtilizado(){
        this._situacao = SituacaoTalao.Utilizado
    }

    readonly id: string;

    readonly faixa : Faixa;

    private _identificador : string;

    get identificador(){
        return this._identificador;
    }
         

    private _usuario: Usuario;

    get usuario(){
        return this._usuario;
    }

    private _equipamento: Equipamento;

    get equipamento(){
        return this._equipamento;
    }

    private _situacao : SituacaoTalao;

    get situacao(){
        return this._situacao;
    }

    private _dataLiberacao: Date

    get dataLiberacao(){
        return this._dataLiberacao;
    }

}