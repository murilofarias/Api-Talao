
import { TipoRegistro } from "./enum/tipo-registro";
import { Talao } from "./talao";
import { UsuarioEquipamento } from "./usuario-equipamento";

export class Faixa{
    constructor(idTenant, numInicial, numFinal, prefixo, tipoRegistro, id:string = null, proximo:number =  null){
        if(id)
            this.id = id;


        if(!Number.isInteger(numInicial)){
            throw new Error("Numero inicial deve ser um inteiro");
        }

        if(!Number.isInteger(numFinal)){
            throw new Error("Numero final deve ser um inteiro");
        }

        if( numInicial >= numFinal){
            throw new Error("Numero final deve ser maior que inicial");
        }

        this._numInicial = numInicial;

        this._proximo = proximo === null ? numInicial : proximo;

        this._numFinal = numFinal;

        this._prefixo = prefixo;

        this._ativa = true;

        this._tipoRegistro = tipoRegistro;

        this._dataCriacao = new Date();

        this._idTenant = idTenant;

        

    }

    
    estender(novoNumFinal: number){
        if(Number.isInteger(novoNumFinal)){
            throw new Error("Novo numero final deve ser um inteiro");
        }

        if(novoNumFinal <= this._numFinal){
            throw new Error("Novo numero final deve ser maior que o final atual");
        }

        this._numFinal = novoNumFinal;
    }

    liberarTaloes(usuarioEquipamento : UsuarioEquipamento, quantidade: number, liberarSomenteAoAgente = true): Talao[]{
        if(!Number.isInteger(quantidade)){
            throw new Error("A quantidade de Taloes deve ser um inteiro");
        }

        if(this._numFinal === this._numInicial)
            throw new Error("A quantidade de Taloes para essa faixa acabou. Pode-se estender a faixa caso precise");

        if(!usuarioEquipamento.ativa)
            throw new Error("A relação entre equipamento e agente não está ativa");

        
        const taloes : Talao[]= [];

        const maiorNumeroLiberadoPedido = (this._proximo + quantidade -1 );

        //Se o maior numero a ser liberado pelo pedido ultrapassa o numero final, só é liberado até o número final
        const maiorNumeroLiberado = maiorNumeroLiberadoPedido <= this._numFinal ? maiorNumeroLiberadoPedido: this._numFinal;
        const agenteAlvo = liberarSomenteAoAgente ? usuarioEquipamento.usuario : null;
        for(let numeroTalao = this._proximo; numeroTalao <= maiorNumeroLiberado; numeroTalao++){
            const talao = new Talao(this, agenteAlvo, usuarioEquipamento.equipamento, this.prefixo, numeroTalao.toString())
            taloes.push(talao);
        }

        this._proximo = this._proximo + taloes.length;

        return taloes;
    }

    desativar(){
        this._ativa = false;
    }

    readonly id:string;


    private _idTenant: string;

    get idTenant(){
        return this._idTenant;
    }

    private _numInicial: number;

    get numInicial(){
        return this._numInicial;
    }

    private _numFinal: number;

    get numFinal(){
        return this._numFinal;
    }

    private _prefixo: string;

    get prefixo(){
        return this._prefixo;
    }

    private _tipoRegistro: TipoRegistro;

    get tipoRegistro(){
        return this._tipoRegistro;
    }
    
    private _proximo:number;

    get proximo(){
        return this._proximo;
    }

    private _ativa: boolean;

    get ativa() {
        return this._ativa;
    }

    private _dataCriacao: Date

    get dataCriacao(){
        return this._dataCriacao;
    }

}