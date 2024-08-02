// 创建两个表格的 DataTable 实例
let dataTable1 = new simpleDatatables.DataTable(
  document.getElementById("table1")
);

// Move "per page dropdown" selector element out of label
// to make it work with bootstrap 5. Add bs5 classes.
function adaptPageDropdown(dataTable) {
  const selector = dataTable.wrapper.querySelector(".dataTable-selector")
  selector.parentNode.parentNode.insertBefore(selector, selector.parentNode)
  selector.classList.add("form-select")
}

// Add bs5 classes to pagination elements
function adaptPagination(dataTable) {
  const paginations = dataTable.wrapper.querySelectorAll(
    "ul.dataTable-pagination-list"
  )

  for (const pagination of paginations) {
    pagination.classList.add(...["pagination", "pagination-primary"])
  }

  const paginationLis = dataTable.wrapper.querySelectorAll(
    "ul.dataTable-pagination-list li"
  )

  for (const paginationLi of paginationLis) {
    paginationLi.classList.add("page-item")
  }

  const paginationLinks = dataTable.wrapper.querySelectorAll(
    "ul.dataTable-pagination-list li a"
  )

  for (const paginationLink of paginationLinks) {
    paginationLink.classList.add("page-link")
  }
}

const refreshPagination = (dataTable) => {
  adaptPagination(dataTable)
}

// Patch "per page dropdown" and pagination after table rendered
dataTable1.on("datatable.init", () => {
  adaptPageDropdown(dataTable1)
  refreshPagination(dataTable1)
});
dataTable1.on("datatable.update", () => refreshPagination(dataTable1));
dataTable1.on("datatable.sort", () => refreshPagination(dataTable1));
dataTable1.on("datatable.page", () => adaptPagination(dataTable1));


if (document.getElementById('teacher-salary-table')) {
  let dataTable2 = new simpleDatatables.DataTable(
    document.getElementById("teacher-salary-table")
  );
  dataTable2.on("datatable.init", () => {
    adaptPageDropdown(dataTable2)
    refreshPagination(dataTable2)
  });
  dataTable2.on("datatable.update", () => refreshPagination(dataTable2));
  dataTable2.on("datatable.sort", () => refreshPagination(dataTable2));
  dataTable2.on("datatable.page", () => adaptPagination(dataTable2));
}