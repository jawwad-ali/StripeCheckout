import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { loadStripe } from "@stripe/stripe-js"

export default function Products() {

    const redirectToCheckout = async (event, pID) => {
        event.preventDefault()

        const stripe = await loadStripe("pk_test_51HjkirGewr3KO7wwRBdvdRSIKgJr5ODpkoCWdWTn06PMVl52rqqTaGjcuNlxS8QaAgxwOOIXMnyorvJjpDr0MLKa00oJTFu5gn")
        const { error } = await stripe.redirectToCheckout({
            mode: "payment",
            lineItems: [{ price: pID    , quantity: 1 }],
            successUrl: `http://localhost:8000/payment-success`,
            cancelUrl: `http://localhost:8000/payment-error`,
        })
        if (error) {
            console.warn("Error:", error)
        }
    }

    const data = useStaticQuery(graphql`
                query MyQuery {
                allStripePrice {
                    edges {
                    node {
                        id
                            product {
                            id
                            images
                            name
                            description
                            }
                    }
                }
            }
        }
    `)
    console.log(data)
    return (
        <div>
            <h1>Products</h1>
            {
                data.allStripePrice.edges.map(({ node }) => {
                    return (
                        <div key={node.product.id}>
                            <h2>{node.product.name}</h2>
                            <img src={node.product.images[0]} alt="display product" height="200" width="350" />
                            <p>{node.product.description}</p>
                            <button onClick={(e) => redirectToCheckout(e , node.id) }>buy now</button>
                        </div>
                    )
                })
            }
        </div>
    )
}