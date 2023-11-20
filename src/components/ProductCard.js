import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';
import Ebay from '../assets/Ebay.png'
import Flipkart from '../assets/Flipkart.png'
import Snapdeal from '../assets/Snapdeal.png'
import Shopclues from '../assets/Shopclues.png'
import Zappos from '../assets/Zappos.png'

function ProductCard(props) {

  
  return (
    <div className='product_card'>
        <center><h3>{props.item.webSite}</h3></center>
        <div className="website_img">
            <img src={props.item.webSite==="Ebay"?Ebay:
              props.item.webSite==="Flipkart"?Flipkart:
              props.item.webSite==="Snapdeal"?Snapdeal:
              props.item.webSite==="Shopclues"?Shopclues:
              props.item.webSite==="Zappos"?Zappos:""
            } alt="" />
        </div>
        <span>
          <span className='heading'>Title :</span> {props.item.title || props.keyWord}
        </span>
        <span>
          <span className='heading'>Rating :</span> {props.item.rating}
        </span>
        <span>
          <span className='heading'>Reviews :</span> {props.item.total_review_count}
        </span>
        <span>
          <span className='heading'>Url :</span> <Link to={props.item.url}>Click Here</Link>
        </span>
        <span>
          <span className='heading'>Price :</span>  ₹ {props.item.price}
        </span>

    </div>
  )
}

export default ProductCard
