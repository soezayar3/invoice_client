import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    Button,
    Icon,
    DialogTitle,
    DialogContent,
    Dialog,
    DialogActions,
    CircularProgress,
    Typography,
} from "@material-ui/core";
import MaterialTable from "material-table";

import { getInvoices } from "../store/actions/invoices.js";
import util from "../services/utils.js";

const ViewInvoices = () => {
    const tableRef = React.createRef();
    const tableRef2 = React.createRef();
    const [openDetail, setOpenDetail] = useState(false);
    const [invoiceProducts, setInvoiceProducts] = useState([]);
    const [detailTotalPrice, setDetailTotalPrice] = useState(0);

    const { invoices, isLoading } = useSelector((state) => state.invoices);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getInvoices());
    }, [dispatch]);

    const onDetail = (rowData) => {
        setDetailTotalPrice(rowData?.totalPrice);
        setInvoiceProducts(rowData?.invoiceProducts);
        setOpenDetail(true);
    };

    const onCloseDetail = () => {
        setOpenDetail(false);
    };

    return isLoading ? (
        <CircularProgress />
    ) : (
        <div style={{ margin: "30px auto", padding: "10px 20px 20px 20px" }}>
            <MaterialTable
                tableRef={tableRef}
                columns={[
                    { title: "Customer Name", field: "customerName", filtering: true },
                    { title: "Sale Person Name", field: "salePersonName", filtering: true },
                    {
                        title: "Total Amount",
                        field: "totalPrice",
                        filtering: true,
                        render: (rowData) => rowData.totalPrice && util.format_money(rowData.totalPrice),
                    },
                    {
                        title: "Created At",
                        field: "date",
                        filtering: true,
                        render: (rowData) => rowData.date && rowData.date,
                    },
                ]}
                title="Products"
                options={{
                    pageSize: 10,
                    pageSizeOptions: [10, 20, 50, 100, 200],
                    actionsColumnIndex: -1,
                    filtering: true,
                    sorting: true,
                }}
                data={invoices?.data}
                actions={[
                    {
                        icon: () => <Icon>arrow_right_alt</Icon>,
                        tooltip: "Detail",
                        onClick: (event, rowData) => onDetail(rowData),
                    },
                ]}
            />
            <Dialog open={openDetail} onClose={onCloseDetail} maxWidth="md" fullWidth>
                <DialogTitle>Invoice Products Detail</DialogTitle>
                <DialogContent>
                    <div style={{ marginTop: "30px" }}>
                        <MaterialTable
                            tableRef={tableRef2}
                            columns={[
                                {
                                    title: "Picture",
                                    field: "picture",
                                    render: (rowData) =>
                                        rowData.picture && (
                                            <img
                                                src={rowData.picture}
                                                style={{ width: 50, height: 50, objectFit: "contain" }}
                                                alt={rowData.name}
                                            />
                                        ),
                                },
                                { title: "Name", field: "name" },
                                {
                                    title: "Price",
                                    field: "price",
                                    render: (rowData) => rowData.price && util.format_money(rowData.price),
                                },
                                { title: "Quantity", field: "quantity" },
                                {
                                    title: "Total",
                                    field: "total",
                                    render: (rowData) => rowData.total && util.format_money(rowData.total),
                                },
                            ]}
                            title="Products"
                            options={{
                                pageSize: 5,
                                pageSizeOptions: [5, 10, 20],
                                actionsColumnIndex: -1,
                                search: false,
                            }}
                            data={invoiceProducts}
                        />
                        <Typography style={{ margin: "10px auto", fontSize: "21px", color: "#F44336" }}>
                            Total Price: {util.format_money(detailTotalPrice)}
                        </Typography>
                    </div>
                </DialogContent>
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
