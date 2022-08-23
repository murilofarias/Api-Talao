import { FaixaRepositoryInterface, TalaoPage } from "../plug/faixa.repository.interface";



export class MonitorarTaloesUseCase {
    constructor(private faixaRepository: FaixaRepositoryInterface) {}

  async execute(input: MonitorarTaloesInput): Promise<MonitorarTaloesOutput> {

    const taloes = await this.faixaRepository.findTaloes({
      take: input.take,
      skip: input.skip,
      tipo: input.tipo,
      userName: input.usuarioName,
      tenantId: input.tenantId,
      equipment: input.equipment,
      ticketNumber: input.ticketNumber,
      date: input.date
    });


    return {
      taloes: taloes
    }
  }


}

type MonitorarTaloesInput = {
  take: number,
  skip: number,
  tipo: number,
  usuarioName: string,
  tenantId: string,
  equipment: string,
  ticketNumber:string,
  date: Date
};

type MonitorarTaloesOutput = {
    taloes: TalaoPage;
};