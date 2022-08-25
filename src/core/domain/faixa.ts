
import { TipoRegistro } from "./enum/tipo-registro";
import { DomainError } from "./errors/domain.error";
import { Ticket } from "./talao";
import { UsuarioEquipamento } from "./usuario-equipamento";

export class Faixa{
    constructor(idTenant, numInicial, numFinal, prefixo, tipoRegistro, id = "", proximo = -1){
        if(id.length > 0)
            this.id = id;


        if(!Number.isInteger(numInicial)){
            throw new DomainError("Numero inicial deve ser um inteiro");
        }

        if(!Number.isInteger(numFinal)){
            throw new DomainError("Numero final deve ser um inteiro");
        }

        if( numInicial >= numFinal){
            throw new DomainError("Numero final deve ser maior que inicial");
        }

        this._numInicial = numInicial;

        this._proximo = proximo === -1 ? numInicial : proximo;

        this._numFinal = numFinal;

        this._prefixo = prefixo;

        this._ativa = true;

        this._tipoRegistro = tipoRegistro;

        this._dataCriacao = new Date();

        this._idTenant = idTenant;

        

    }

    
    estender(novoNumFinal: number){
        if(Number.isInteger(novoNumFinal)){
            throw new DomainError("New final number must be an integer");
        }

        if(novoNumFinal <= this._numFinal){
            throw new DomainError("New final number must be greater than current one");
        }

        this._numFinal = novoNumFinal;
    }

    liberarTaloes(usuarioEquipamento : UsuarioEquipamento, quantidade: number, vinculado = true): Ticket[]{
        
        if(!Number.isInteger(quantidade)){
            throw new DomainError("Quantity must be a integer");
        }

        if(this._numFinal === this._numInicial)
            throw new DomainError("There is no available identifier number for this band");

        if(!usuarioEquipamento.ativa)
            throw new DomainError("Association between user and equipment must be active");


        const maiorNumeroLiberadoPedido = (this._proximo + quantidade -1 );

        //Se o maior numero a ser liberado pelo pedido ultrapassa o numero final, só é liberado até o número final
        const maiorNumeroLiberado = maiorNumeroLiberadoPedido <= this._numFinal ? maiorNumeroLiberadoPedido: this._numFinal;

        const taloes : Ticket[]= [];
        for(let numeroTalao = this._proximo; numeroTalao <= maiorNumeroLiberado; numeroTalao++){
            const talao = new Ticket(this, usuarioEquipamento.usuario, usuarioEquipamento.equipamento, numeroTalao.toString(), vinculado)
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