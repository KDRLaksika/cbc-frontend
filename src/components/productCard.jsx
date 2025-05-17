export default function ProductCard({ product }) {
    return (
        <div className="w-[300px] h-[480px] bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col m-4 transition-all duration-300 hover:scale-102 hover:shadow-2xl">
            {/* Product Image */}
            <div className="h-[200px] w-full bg-gray-100 flex items-center justify-center">
                <img
                    src={product.images?.[0] || "/placeholder.png"}
                    alt={product.name}
                    className="h-full w-full object-cover"
                />
            </div>

            {/* Product Info */}
            <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-1">{product.name}</h2>
                    <p className="text-sm text-gray-600 line-clamp-3">{product.description}</p>
                </div>

                {/* Price & Stock */}
                <div className="mt-4">
                    <div className="flex items-center gap-2 mb-1">
                        {product.labelledPrice !== product.price && (
                            <span className="text-sm text-red-400 line-through">
                                ${product.labelledPrice.toFixed(2)}
                            </span>
                        )}
                        <span className="text-xl font-bold text-emerald-600">
                            ${product.price.toFixed(2)}
                        </span>
                    </div>
                    <span className={`text-sm font-medium ${product.isAvailable && product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
                        {product.isAvailable && product.stock > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                </div>

                {/* Buy Now Button */}
                <button
                    disabled={!product.isAvailable || product.stock === 0}
                    className={`mt-4 w-full py-2 rounded-xl text-white font-semibold transition-all duration-300 
                        ${product.isAvailable && product.stock > 0 
                            ? "bg-blue-600 hover:bg-blue-700" 
                            : "bg-gray-400 cursor-not-allowed"}`}
                >
                    Buy Now
                </button>
            </div>
        </div>
    );
}

