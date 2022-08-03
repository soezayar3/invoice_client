const util = {
    format_money: (money) => {
        if (money === null || money === "" || isNaN(money)) {
            return 0;
        }
        money = parseInt(money);
        money = money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
        return money.substring(0, money.length - 3);
    },
};

export default util;
