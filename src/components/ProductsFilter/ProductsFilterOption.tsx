function ProductsFilterOption() {
    return (
        <div className="filter_option">
            <div className="filter_option_checkbox">
                <input type="checkbox" className="filter_option_baking" id="baking " name="baking " />
                <label htmlFor="baking ">Baking </label>
            </div>
            <div className="filter_option_checkbox">
                <input type="checkbox" className="filter_option_grill" id="grill " name="grill " />
                <label htmlFor="grill ">Grill </label>
            </div>
            <div className="filter_option_checkbox">
                <input type="checkbox" className="filter_option_salad" id="salad" name="salad " />
                <label htmlFor="salad ">Salad </label>
            </div>
            <div className="filter_option_checkbox">
                <input type="checkbox" className="filter_option_smoothie" id="smoothie" name="smoothie " />
                <label htmlFor="smoothie ">Smoothie </label>
            </div>
        </div>
    )
}

export default ProductsFilterOption