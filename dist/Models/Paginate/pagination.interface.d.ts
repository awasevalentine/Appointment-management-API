export interface PaginationOptionsInterface {
    limit: number;
    page: number;
}
import { PaginationResultInterface } from "./pagination.result.interface";
export declare class Pagination<PaginationEntity> {
    results: PaginationEntity[];
    page_total: number;
    total: number;
    constructor(paginationResults: PaginationResultInterface<PaginationEntity>);
}
