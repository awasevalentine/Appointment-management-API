"use strict";
exports.__esModule = true;
exports.Pagination = void 0;
var Pagination = /** @class */ (function () {
    function Pagination(paginationResults) {
        this.results = paginationResults.results;
        this.page_total = paginationResults.results.length;
        this.total = paginationResults.total;
    }
    return Pagination;
}());
exports.Pagination = Pagination;
