<script>
var axios = require("axios");
var _ = require("lodash");
export default {
    paginationHander: function (pageInfo, pagination, url) {    
        console.log(pageInfo);
        let freeText = "";        
        if (pagination.searchTerm != "") {
            freeText = `&freeText=${pagination.searchTerm}`;
        }
        let page = pagination.page;
        let rowsPerPage = pagination.rowsPerPage;
        let pageRange = pageInfo.cacheSize / rowsPerPage;
        let currentPageStart =
            Math.floor((page - 1) / (pageInfo.cacheSize / rowsPerPage)) + 1;
        let dir = "ASC";
        if (pagination.descending) {
            dir = "DESC";
        }

        if (
            currentPageStart != pageInfo.pageStart ||
            pagination.sortBy != pageInfo.lastSort ||
            pagination.descending != pageInfo.lastDirection ||
            pageInfo.triggered ||
            pagination.refresh
        ) {
            pagination.refresh = false;
            pageInfo.lastSort = pagination.sortBy;
            pageInfo.triggered = false;
            pageInfo.lastDirection = pagination.descending;
            axios
                .get(
                `${url}?page=${currentPageStart}&pageSize=${pageInfo
                    .cacheSize}&sortBy=${pagination
                        .sortBy}&dir=${dir}${freeText}`,
                { withCredentials: true }
                )
                .then(result => {
                    console.log(result.data)
                    pageInfo.totalItems = result.data.totalRecords;
                    pageInfo.cache = result.data.pages;
                    
                    let subPage =
                        (page - 1) % Math.floor(pageInfo.cacheSize / rowsPerPage);
                    pageInfo.items = pageInfo.cache.slice(
                        subPage * rowsPerPage,
                        (subPage + 1) * rowsPerPage
                    );
                });
        } else {
            let subPage = (page - 1) % Math.floor(pageInfo.cacheSize / rowsPerPage);
            pageInfo.items = pageInfo.cache.slice(
                subPage * rowsPerPage,
                (subPage + 1) * rowsPerPage
            );
        }
    }
}
</script>