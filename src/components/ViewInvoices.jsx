import React, { useState } from "react";

import { Button, Icon, DialogTitle, DialogContent, Dialog, DialogActions } from "@material-ui/core";
import MaterialTable from "material-table";

const PRODUCTS = [
    {
        name: "Rose",
        picture:
            "https://images.unsplash.com/photo-1548460464-2a68877c7a5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
        price: 1000,
        stock: 30,
    },
    {
        name: "Lily",
        picture:
            "https://images.unsplash.com/photo-1580595999172-787970a962d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGlseXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        price: 1500,
        stock: 30,
    },
    {
        name: "Tulip",
        picture:
            "https://images.unsplash.com/photo-1518701005037-d53b1f67bb1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dHVsaXB8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        price: 2000,
        stock: 30,
    },
    {
        name: "Orchid",
        picture:
            "https://images.unsplash.com/photo-1611820135074-e2d0e3e92322?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fG9yY2hpZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        price: 2500,
        stock: 30,
    },
    {
        name: "Carnation",
        picture:
            "https://images.unsplash.com/photo-1592220957678-3446df33041b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGNhcm5hdGlvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        price: 3000,
        stock: 30,
    },
    {
        name: "Freesia",
        picture:
            "https://images.unsplash.com/photo-1559765197-45741695a7fe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZnJlZXNpYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        price: 3500,
        stock: 30,
    },
    {
        name: "Hyacinth",
        picture:
            "https://images.unsplash.com/photo-1586522528166-dc0e55a9c046?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHlhY2ludGh8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        price: 4000,
        stock: 30,
    },
    {
        name: "Anemone",
        picture:
            "https://images.unsplash.com/photo-1589574493947-305a8247d689?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGFuZW1vbmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        price: 4500,
        stock: 30,
    },
    {
        name: "Daffodil",
        picture:
            "https://images.unsplash.com/photo-1485431142439-206ba3a9383e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZGFmZm9kaWx8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        price: 5000,
        stock: 30,
    },
    {
        name: "Poppy",
        picture:
            "https://images.unsplash.com/photo-1606952460453-3b7edc2f67a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cG9wcHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        price: 5500,
        stock: 30,
    },
    {
        name: "Sunflower",
        picture:
            "https://images.unsplash.com/photo-1598364170688-8019081b09cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHN1bmZsb3dlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        price: 6000,
        stock: 30,
    },
    {
        name: "Marigold",
        picture:
            "https://images.unsplash.com/photo-1606432144664-594a97fea6e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFyaWdvbGR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        price: 6500,
        stock: 30,
    },
];

const ViewInvoices = () => {
    const tableRef = React.createRef();
    const [openDetail, setOpenDetail] = useState(false);

    const onDetail = (rowData) => {
        setOpenDetail(true);
    };

    const onCloseDetail = () => {
        setOpenDetail(false);
    };

    return (
        <div style={{ margin: "30px auto", padding: "10px 20px 20px 20px" }}>
            <MaterialTable
                tableRef={tableRef}
                columns={[
                    { title: "Product Name", field: "name", filtering: true },
                    { title: "Product Price", field: "price", filtering: true },
                    { title: "Product Stock", field: "stock", filtering: true },
                ]}
                title="Products"
                options={{
                    pageSize: 10,
                    pageSizeOptions: [10, 20, 50, 100, 200],
                    actionsColumnIndex: -1,
                    filtering: true,
                    sorting: true,
                }}
                data={PRODUCTS}
                actions={[
                    {
                        icon: () => <Icon>arrow_right_alt</Icon>,
                        tooltip: "Detail",
                        onClick: (event, rowData) => onDetail(rowData),
                    },
                    {
                        icon: "refresh",
                        tooltip: "Refresh Data",
                        isFreeAction: true,
                        onClick: () => tableRef.current && tableRef.current.onQueryChange(),
                    },
                ]}
            />
            <Dialog open={openDetail} onClose={onCloseDetail} maxWidth="md" fullWidth>
                <DialogTitle>Product List</DialogTitle>
                <DialogContent>hello</DialogContent>
                <DialogActions>
                    <Button variant="outlined" color="secondary" onClick={onCloseDetail}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ViewInvoices;
