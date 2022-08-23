
import { Usuario } from "./usuario";
import { Equipamento } from "./equipamento";
import { Faixa } from "./faixa";
import { SituacaoTalao } from "./enum/situacao-talao";


export class Ticket {
    constructor(faixa: Faixa, usuario: Usuario, equipamento: Equipamento, numero: string, vinculado = false, id = ""){

        if(id.length >  0)
            this.id = id;
            
        this.faixa = faixa;
        this._requestedBy = usuario;
        this._equipamento = equipamento;
        this.vinculado = vinculado;
        this._identificador = faixa.prefixo + numero.padStart(10 - faixa.prefixo.length, "0" );
        this._situacao = SituacaoTalao.Liberado;
        this._dataLiberacao = new Date();
    }

    

    marcarUtilizado(){
        this._situacao = SituacaoTalao.Utilizado
    }

    readonly id: string;

    readonly faixa : Faixa;

    readonly vinculado: boolean;

    private _identificador : string;

    get identificador(){
        return this._identificador;
    }
         

    private _requestedBy: Usuario;

    get requestedBy(){
        return this._requestedBy;
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