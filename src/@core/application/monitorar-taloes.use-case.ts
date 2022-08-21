import { FaixaRepositoryInterface, TalaoPage } from "../plug/faixa.repository.interface";



export class MonitorarTaloesUseCase {
    constructor(private faixaRepository: FaixaRepositoryInterface) {}

  async execute(input: MonitorarTaloesInput): Promise<MonitorarTaloesOutput> {
    const mensagensErro = [];

    const taloes = await this.faixaRepository.findTaloes({
            take: input.take,
            skip: input.skip,
            tipo: input.tipo,
            userName: input.usuarioName,
            tenantId: input.tenantId
        });


    return this.gerarResposta(mensagensErro, taloes);
  }s


  gerarResposta(mensagensErro: string[], taloes: TalaoPage = null){
    return {mensagemErro: mensagensErro.join(", "), taloes};
  }
}

type MonitorarTaloesInput = {
  take: number,
  skip: number,
  tipo: number,
  usuarioName: string,
  tenantId: string
};

type MonitorarTaloesOutput = {
    mensagemErro: string;
    taloes: TalaoPage;
};