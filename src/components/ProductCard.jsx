function ProductCard({ name, price, description}) {
    return (
        <div style={{ border: '1px solid #ddd', padding:'20px', margin:'10px', borderRadius: '8px'}}>
            <h3>{name}</h3>

            <p>{description}</p>

            <p style={{ fontWeight:'bold', color: '#007ACC'}}>
                € {price}
            </p>
        </div>
    )
}

export default ProductCard