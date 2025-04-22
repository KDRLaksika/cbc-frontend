
export default function ProductCard(props) {
    return(
        
        <div className="Card">
            <img className="product" src={props.image} alt="Product" />
            <h1>{props.name}</h1>
            <p>{props.description}</p>
            <h2>Price: {props.price}</h2>
            <button className="addToCart">Add to Cart</button>
            <button className="buyNow">Buy Now</button>
        </div>
    )
}