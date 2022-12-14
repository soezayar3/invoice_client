import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useDispatch, useSelector } from "react-redux";

import CreateInvoice from "./components/CreateInvoice";
import ViewInvoices from "./components/ViewInvoices";
import InvoicesLineGraph from "./components/InvoicesLineGraph";
import InvoicesBarGraph from "./components/InvoicesBarGraph";

import { getInvoicesGraph } from "./store/actions/invoices";
import { CircularProgress } from "@material-ui/core";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}
            aria-labelledby={`nav-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `nav-tab-${index}`,
        "aria-controls": `nav-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        padding: "10px 20px",
    },
}));

export default function App() {
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getInvoicesGraph());
    }, [dispatch]);

    const { invoices_graphs, isLoading } = useSelector((state) => state.invoices);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" style={{ backgroundColor: "#57BFC4" }}>
                <Tabs variant="fullWidth" value={value} onChange={handleChange} aria-label="nav tabs">
                    <Tab label="Create Invoice" {...a11yProps(0)} />
                    <Tab label="View All Invoices" {...a11yProps(1)} />
                    <Tab label="Invoices Graph" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <CreateInvoice />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ViewInvoices />
            </TabPanel>
            <TabPanel value={value} index={2}>
                {isLoading ? (
                    <CircularProgress />
                ) : (
                    <>
                        <InvoicesLineGraph data={invoices_graphs.dailyGraph} label="Daily" />
                        <InvoicesBarGraph data={invoices_graphs.monthlyGraph} label="Monthly" />
                        <InvoicesBarGraph data={invoices_graphs.yearlyGraph} label="Yearly" />
                    </>
                )}
            </TabPanel>
        </div>
    );
}
