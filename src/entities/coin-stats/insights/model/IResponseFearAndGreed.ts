export interface IResponseFearAndGreed {
    name: string,
    now: {
        value: number,
        value_classification: string,
        timestamp: number,
        update_time: string,
    },
    yesterday: {
        value: number,
        value_classification: string,
        timestamp: number,
    },
    lastWeek: {
        value: number,
        value_classification: string,
        timestamp: number,
    },
    fetchedAt: string;
}