import React, { useState, useEffect } from "react";

import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import MaterialTable from "material-table";

const options = [
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

const CreateInvoice = () => {
    const tableRef = React.createRef();

    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState("");

    const [products, setProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const [customerName, setCustomerName] = useState("");
    const [salePersonName, setSalePersonName] = useState("");
    const [note, setNote] = useState("");

    useEffect(() => {
        let _total = 0;
        products.map((product) => (_total += product?.total));
        setTotalPrice(_total);
    }, [products]);

    const onAdd = async () => {
        const selected = products.find((product) => product.name === value.name);
        if (selected) {
            if (value.stock > selected.quantity) {
                let updatedProducts = products.map((product) => {
                    if (product.name === selected.name) {
                        let _qty = ++product.quantity;
                        product.quantity = _qty;
                        product.total = product.price * _qty;
                        return product;
                    }
                    return product;
                });
                setProducts(updatedProducts);
            } else {
                alert("Out of Stock");
            }
        } else {
            setProducts([
                ...products,
                {
                    no: products.length + 1,
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
        let _products = products.filter((p) => p.no !== rowData.no);
        setProducts([..._products]);
    };

    const onReset = () => {
        setProducts([]);
        setTotalPrice(0);
        setCustomerName("");
        setSalePersonName("");
        setNote("");
    };

    return (
        <div style={{ margin: "30px auto" }}>
            <Grid container spacing={2} fullWidth style={{ margin: "0 auto" }} justifyContent="center">
                <Grid item xs={12} lg={10}>
                    <Autocomplete
                        fullWidth
                        id="combo-box-demo"
                        options={options}
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
                        data={products}
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
