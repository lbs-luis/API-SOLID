import { Store } from "@prisma/client"
import { IStoresRepository } from "@/repositories/stores/IStoresRepository"

interface IGetStoresServiceRequest {
  store_custom_id: string
}

interface IGetStoresServiceResponse {
  store: Store | null
}

export class GetStoresService {
  constructor(private storesRepository: IStoresRepository) { }

  async execute({ store_custom_id }: IGetStoresServiceRequest): Promise<IGetStoresServiceResponse> {
    const store = await this.storesRepository.findByCustomId(store_custom_id)

    return {
      store
    }
  }
}