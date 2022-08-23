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
      startDate: input.startDate,
      endDate: input.endDate
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
  startDate: Date,
  endDate: Date
};

type MonitorarTaloesOutput = {
    taloes: TalaoPage;
};