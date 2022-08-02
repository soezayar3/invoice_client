import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import CreateInvoice from "./components/CreateInvoice";
import ViewInvoices from "./components/ViewInvoices";
import InvoicesGraph from "./components/InvoicesGraph";

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

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const test_data = {
        "Test One": 10,
        "Test Two": 20,
        "Test Three": 10,
        "Test Four": 55,
        "Test Five": 60,
        "Test Six": 25,
        "Test Seven": 40,
        "Test Eight": 45,
        "Test Nine": 30,
        "Test Ten": 55,
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
                <InvoicesGraph test_data={test_data} label="Daily" />
                <InvoicesGraph test_data={test_data} label="Monthly" />
                <InvoicesGraph test_data={test_data} label="Yearly" />
            </TabPanel>
        </div>
    );
}
