import './ProductsFilter.scss'

function ProductsFilter() {
    return (
        <div className="range">

            <h4>Filter by prace</h4>

            <div className="price-content">
                <div>
                    <label>Min</label>
                    <p id="min-value">$50</p>
                </div>

                <div>
                    <label>Max</label>
                    <p id="max-value">$500</p>
                </div>
            </div>

            <div className="range-slider">
                <input type="range" className="min-price" value="100" min="10" max="500" step="10" />
                <input type="range" className="max-price" value="250" min="10" max="500" step="10" />
            </div>
        </div>
    )
}

export default ProductsFilter