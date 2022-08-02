import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Grid, TextField, Typography, CircularProgress } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import MaterialTable from "material-table";

import { getProducts } from "../store/actions/products.js";

const CreateInvoice = () => {
    const tableRef = React.createRef();

    const { products, isLoading } = useSelector((state) => state.products);

    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState("");

    const [invoiceProducts, setInvoiceProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const [customerName, setCustomerName] = useState("");
    const [salePersonName, setSalePersonName] = useState("");
    const [note, setNote] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts(inputValue));
    }, []);

    useEffect(() => {
        let _total = 0;
        invoiceProducts.map((product) => (_total += product?.total));
        setTotalPrice(_total);
    }, [invoiceProducts]);

    const onAdd = async () => {
        const selected = invoiceProducts.find((product) => product.name === value.name);
        if (selected) {
            if (value.stock > selected.quantity) {
                let updatedProducts = invoiceProducts.map((product) => {
                    if (product.name === selected.name) {
                        let _qty = ++product.quantity;
                        product.quantity = _qty;
                        product.total = product.price * _qty;
                        return product;
                    }
                    return product;
                });
                setInvoiceProducts(updatedProducts);
            } else {
                alert("Out of Stock");
            }
        } else {
            setInvoiceProducts([
                ...invoiceProducts,
                {
                    no: invoiceProducts.length + 1,
                    name: value?.name,
                    picture: value?.picture,
                    price: value?.price,
                    quantity: 1,
                    total: value?.price,
                    stock: value?.stock,
                },
            ]);
        }
    };

    const onRemoveProduct = (rowData) => {
        let _products = invoiceProducts.filter((p) => p.no !== rowData.no);
        setInvoiceProducts([..._products]);
    };

    const onReset = () => {
        setInvoiceProducts([]);
        setTotalPrice(0);
        setCustomerName("");
        setSalePersonName("");
        setNote("");
    };

    return isLoading ? (
        <CircularProgress />
    ) : (
        <div style={{ margin: "30px auto" }}>
            <Grid container spacing={2} fullWidth style={{ margin: "0 auto" }} justifyContent="center">
                <Grid item xs={12} lg={10}>
                    <Autocomplete
                        fullWidth
                        id="combo-box-demo"
                        options={products}
                        getOptionLabel={(option) => option.name || ""}
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                        }}
                        autoHighlight
                        renderOption={(option) => (
                            <Typography style={{ paddingBottom: "7px" }}>
                                <img
                                    src={option.picture}
                                    alt={option.name}
                                    style={{ width: 25, height: 25, objectFit: "contain" }}
                                />{" "}
                                {option.name} | Price: {option.price} MMK | Stock: {option.stock}
                            </Typography>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                color="secondary"
                                label="Product Name"
                                variant="outlined"
                                inputProps={{
                                    ...params.inputProps,
                                }}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} lg={2}>
                    <Button
                        style={{ padding: "14px 30px" }}
                        variant="contained"
                        color="secondary"
                        onClick={onAdd}
                        size="medium"
                    >
                        Add to invoice
                    </Button>
                </Grid>
            </Grid>
            {totalPrice !== 0 && (
                <div style={{ marginTop: "30px" }}>
                    <MaterialTable
                        tableRef={tableRef}
                        columns={[
                            { title: "No", field: "no" },
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
                            { title: "Price", field: "price" },
                            { title: "Quantity", field: "quantity" },
                            { title: "Total", field: "total" },
                        ]}
                        title="Products"
                        options={{
                            pageSize: 5,
                            pageSizeOptions: [5, 10, 20],
                            actionsColumnIndex: -1,
                            search: false,
                        }}
                        data={invoiceProducts}
                        actions={[
                            {
                                icon: "remove",
                                tooltip: "Remove Product",
                                onClick: (e, rowData) => onRemoveProduct(rowData),
                            },
                        ]}
                    />
                    <Typography style={{ margin: "10px auto", fontSize: "21px", color: "#F44336" }}>
                        Total Price: {totalPrice}
                    </Typography>
                </div>
            )}
            <div style={{ margin: "30px 5px 0 0" }}>
                <Grid container spacing={2} fullWidth>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            color="secondary"
                            label="Customer Name"
                            variant="outlined"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            color="secondary"
                            label="Sale Person Name"
                            variant="outlined"
                            value={salePersonName}
                            onChange={(e) => setSalePersonName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            color="secondary"
                            label="Note"
                            variant="outlined"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            multiline
                            rows={4}
                        />
                    </Grid>
                </Grid>
            </div>
            <Grid container spacing={2} fullWidth style={{ margin: "20px auto" }} justifyContent="center">
                <Button
                    style={{ padding: "14px 30px" }}
                    variant="outlined"
                    color="secondary"
                    onClick={onReset}
                    size="medium"
                >
                    Reset
                </Button>
                <Button
                    style={{ padding: "14px 30px", margin: "0 30px" }}
                    variant="contained"
                    color="secondary"
                    onClick={onAdd}
                    size="medium"
                >
                    Submit
                </Button>
            </Grid>
        </div>
    );
};

export default CreateInvoice;
