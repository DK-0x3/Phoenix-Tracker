import { ICoin } from '../../../../../shared/types/ICoin';

interface IGetCoinsResponse {
    result: ICoin[];
    meta: {
        page: number,
        limit: number,
        itemCount: number,
        pageCount: number,
        hasPreviousPage: boolean,
        hasNextPage: boolean,
    }
}

export default IGetCoinsResponse;