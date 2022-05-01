"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagination = void 0;
class Pagination {
    constructor(paginationResults) {
        this.results = paginationResults.results;
        this.page_total = paginationResults.results.length;
        this.total = paginationResults.total;
    }
}
exports.Pagination = Pagination;
//# sourceMappingURL=pagination.interface.js.map