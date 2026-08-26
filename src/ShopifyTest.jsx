import { useEffect, useState } from "react";
import { shopifyFetch } from "./shopify";

export default function ShopifyTest() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const query = `
        query {
          products(first: 5) {
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
            }
          }
        }
      `;

      try {
        const data = await shopifyFetch(query);
        console.log("SHOPIFY PRODUCTS:", data.products.nodes);
        setProducts(data.products.nodes);
      } catch (error) {
        console.error("SHOPIFY TEST FAILED:", error);
      }
    }

    loadProducts();
  }, []);

  return (
    <div>
      <h2>SHOPIFY CONNECTION TEST</h2>

      {products.map((product) => (
        <div key={product.id}>
          <strong>{product.title}</strong>
          <p>
            ${product.priceRange.minVariantPrice.amount}{" "}
            {product.priceRange.minVariantPrice.currencyCode}
          </p>
        </div>
      ))}
    </div>
  );
}