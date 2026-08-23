import { useEffect, useState } from "react";
import { shopifyFetch } from "../shopify";

export default function Shop({ onBack }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
const [selectedSize, setSelectedSize] = useState("");
const [cart, setCart] = useState([]);
const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    async function loadProducts() {
      const query = `
        query {
          collection(handle: "blu-s-krew-shop") {
  products(first: 20) {
            nodes {
              id
              title
              handle
              featuredImage {
                url
                altText
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              onlineStoreUrl
              variants(first: 50) {
  nodes {
    id
    title
    availableForSale
    selectedOptions {
      name
      value
    }
      image {
  url
  altText
}
  }
}
            }
          }
        }
          }
      `;

      try {
        const data = await shopifyFetch(query);
        console.log("SHOPIFY DATA:", data);
        setProducts(data.collection.products.nodes);
      } catch (error) {
        console.error("SHOP LOAD FAILED:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);
const matchingVariant = selectedProduct?.variants?.nodes?.find((variant) => {
  const color = variant.selectedOptions.find(
    (option) => option.name.toLowerCase() === "color"
  )?.value;

  const size = variant.selectedOptions.find(
    (option) => option.name.toLowerCase() === "size"
  )?.value;

  return color === selectedColor && size === selectedSize;
});

const handleAddToCart = () => {
  if (!matchingVariant) return;

  setCart((currentCart) => [
    ...currentCart,
    {
      product: selectedProduct,
      variant: matchingVariant,
      color: selectedColor,
      size: selectedSize,
      quantity: 1,
    },
  ]);
};
const handleBuyNow = (variantId) => {
  const numericId = variantId.split("/").pop();
  window.location.href = `https://loudberries.com/cart/${numericId}:1`;
};
const handleCheckout = () => {
  const cartItems = cart
    .map((item) => {
      const numericId = item.variant.id.split("/").pop();
      return `${numericId}:${item.quantity}`;
    })
    .join(",");

  window.location.href = `https://loudberries.com/cart/${cartItems}`;
};
 console.log("VARIANTS:", selectedProduct?.variants?.nodes);
 if (showCart) {
  return (
    <div>
      <button onClick={() => setShowCart(false)}>
        ← BACK TO SHOP
      </button>

      <h2>YOUR CART</h2>
      <p>{cart.length} item(s)</p>
      <button
  type="button"
  onClick={handleCheckout}
  disabled={cart.length === 0}
>
  CHECKOUT
</button>

{cart.map((item, index) => (
  <div key={index}>
    <img
  src={item.variant.image?.url || item.product.featuredImage?.url}
  alt={item.product.title}
  style={{ width: "150px", maxWidth: "100%" }}
/>
    <h3>{item.product.title}</h3>
    <p>{item.variant.title}</p>
  </div>
))}
    </div>
  );
} 
 if (selectedProduct) {
  return (
    <div>
      <button onClick={() => setSelectedProduct(null)}>
        ← BACK TO SHOP
      </button>

      <h2>{selectedProduct.title}</h2>

      {selectedProduct.featuredImage && (
        <img
          src={matchingVariant?.image?.url || selectedProduct.featuredImage.url}
          alt={selectedProduct.featuredImage.altText || selectedProduct.title}
          style={{ width: "300px", maxWidth: "100%" }}
        />
      )}

      <p>
        ${Number(selectedProduct.priceRange.minVariantPrice.amount).toFixed(2)}
      </p>
      <select
  value={selectedColor}
  onChange={(e) => setSelectedColor(e.target.value)}
>
  <option value="">Select Color</option>
{[
  ...new Set(
    selectedProduct.variants.nodes.flatMap((variant) =>
      variant.selectedOptions
        .filter((option) => option.name.toLowerCase() === "color")
        .map((option) => option.value)
    )
  ),
].map((color) => (
  <option key={color} value={color}>
    {color}
  </option>
))}
</select>
      <select
  value={selectedSize}
  onChange={(e) => setSelectedSize(e.target.value)}
>
  <option>Select Size</option>
  <option>Small</option>
  <option>Medium</option>
  <option>Large</option>
  <option>XL</option>
  <option>2XL</option>
</select>
<button
  type="button"
  disabled={!matchingVariant}
  onClick={handleAddToCart}
>
  ADD TO CART
</button>
<button type="button" onClick={() => setShowCart(true)}>
  CART ({cart.length})
</button>
<button
  type="button"
  disabled={!matchingVariant}
  onClick={() => handleBuyNow(matchingVariant.id)}
>
  {matchingVariant ? "BUY NOW" : "SELECT COLOR & SIZE"}
</button>
    </div>
  );
}
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#07111f",
        color: "white",
        padding: "30px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <button
          onClick={onBack}
          style={{
            marginBottom: "30px",
            padding: "10px 18px",
            cursor: "pointer",
          }}
        >
          ← BACK
        </button>

        <h1
          style={{
            textAlign: "center",
            fontSize: "42px",
            marginBottom: "10px",
          }}
        >
          BLU'S KREW SHOP
        </h1>

        <p
          style={{
            textAlign: "center",
            marginBottom: "40px",
            opacity: 0.75,
          }}
        >
          Powered by Loud Berries
        </p>

        {loading && <p style={{ textAlign: "center" }}>Loading shop...</p>}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 280px))",
            gap: "25px",
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                backgroundColor: "#111c2c",
                padding: "15px",
                borderRadius: "12px",
              }}
            >
              {product.featuredImage && (
                <img
                  src={product.featuredImage.url}
                  alt={product.featuredImage.altText || product.title}
                  style={{
                    width: "100%",
                    aspectRatio: "1 / 1",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              )}

              <h2
                style={{
                  fontSize: "20px",
                  marginTop: "15px",
                }}
              >
                {product.title}
              </h2>

              <p style={{ fontSize: "18px" }}>
                ${Number(
                  product.priceRange.minVariantPrice.amount
                ).toFixed(2)}
              </p>
             <button
  type="button"
  onClick={() => {
  setSelectedProduct(product);
  setSelectedColor("");
  setSelectedSize("");
}}
>
  SHOP NOW
</button>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
