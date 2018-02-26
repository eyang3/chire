<script>
var axios = require("axios");
var _ = require("lodash");
export default {
    paginationHander: function (self, pagination, url) {
        
        let freeText = "";
        if (pagination.searchTerm != "") {
            freeText = `&freeText=${pagination.searchTerm}`;
        }
        let page = pagination.page;
        let rowsPerPage = pagination.rowsPerPage;
        let pageRange = self.cacheSize / rowsPerPage;
        let currentPageStart =
            Math.floor((page - 1) / (self.cacheSize / rowsPerPage)) + 1;
        let dir = "ASC";
        if (pagination.descending) {
            dir = "DESC";
        }

        if (
            currentPageStart != self.pageStart ||
            pagination.sortBy != self.lastSort ||
            pagination.descending != self.lastDirection ||
            self.triggered ||
            pagination.refresh
        ) {
            pagination.refresh = false;
            self.lastSort = pagination.sortBy;
            self.triggered = false;
            self.lastDirection = pagination.descending;
            axios
                .get(
                `${url}?page=${currentPageStart}&pageSize=${self
                    .cacheSize}&sortBy=${pagination
                        .sortBy}&dir=${dir}${freeText}`,
                { withCredentials: true }
                )
                .then(result => {
                    self.totalItems = result.data.totalRecords;
                    self.cache = result.data.pages;
                    let subPage =
                        (page - 1) % Math.floor(self.cacheSize / rowsPerPage);
                    self.items = self.cache.slice(
                        subPage * rowsPerPage,
                        (subPage + 1) * rowsPerPage
                    );
                });
        } else {
            let subPage = (page - 1) % Math.floor(self.cacheSize / rowsPerPage);
            self.items = self.cache.slice(
                subPage * rowsPerPage,
                (subPage + 1) * rowsPerPage
            );
        }
    }
}
</script>