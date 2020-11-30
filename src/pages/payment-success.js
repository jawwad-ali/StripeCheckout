import React from "react"
import { Link } from "gatsby"

export default function Success() {
    return (
        <div>
            <h4>Payment made successfully</h4>
            <Link href={"/products"}>Products</Link>
        </div>
    )
}