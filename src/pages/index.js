import React from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Link } from "gatsby"

export default function Home() {

  const redirectToCheckout = async (e) => {

    e.preventDefault()

    const stripe = await loadStripe("pk_test_51HjkirGewr3KO7wwRBdvdRSIKgJr5ODpkoCWdWTn06PMVl52rqqTaGjcuNlxS8QaAgxwOOIXMnyorvJjpDr0MLKa00oJTFu5gn")
    const { error } = await stripe.redirectToCheckout({
      mode: "payment",
      lineItems: [{ price: "price_1HjktxGewr3KO7ww9OJvdsql", quantity: 1 }],
      successUrl: `http://localhost:8000/payment-success`,
      cancelUrl: `http://localhost:8000/payment-error`,
    })
    if (error) {
      console.warn("Error:", error)
    }
  }

  return <div>
    <button onClick={redirectToCheckout} >
      BUY MY BOOK
    </button>
    <br />
    <Link href="/products">Products</Link>
  </div>
}
