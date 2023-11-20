import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard';
import { isElement } from 'react-dom/test-utils';
import { MultiSelect } from 'react-multi-select-component';

function Home() {
    const options = [        
        { label: "Ebay", value: "Ebay" },
        { label: "Flipkart", value: "Flipkart" },
        { label: "Snapdeal", value: "Snapdeal" },
        { label: "Shopclues", value: "Shopclues" },
        { label: "Zappos", value: "Zappos" },
    ];

    const host = "https://durainpaybackend.onrender.com/";
    const websies=["Ebay","Flipkart","Snapdeal","Shopclues","Zappos"];

    const [keyWord,setKeyWord] = useState("");
    const [filter,setFilter] = useState("high_price");
    const [top,setTop] = useState(2);
    const [selected, setSelected] = useState([
        { label: "Ebay", value: "Ebay" },
        { label: "Flipkart", value: "Flipkart" },
        { label: "Snapdeal", value: "Snapdeal" },
        { label: "Shopclues", value: "Shopclues" },
        { label: "Zappos", value: "Zappos" },
    ]);
    const [compare,setCompare] = useState([]);
    const [load,setLoad] = useState(false);
    

    const [products,setProducts] = useState([]);

    const handleChange=(e)=>{
        console.log(e.target.name);
        if(e.target.name=="keyWord")
        setKeyWord(e.target.value);
        else if(e.target.name=="filter")
        setFilter(e.target.value)
        else if(e.target.name=="top")
        setTop(e.target.value);
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setLoad(true);
        try {
            const params = new URLSearchParams({
                keyWord,filter,top
            })
            const response = await fetch(`${host}search?keyWord=${keyWord}&filter=${filter}&top=${top}` , {
                method: 'GET',
            });
            const json = await response.json();
            setProducts(json.websiteArray);
            setLoad(false);
        } catch (error) {
            console.log(error);
        }
    }
    

    useEffect(()=>{
        const temp=[];
        selected.length && selected.map((ele)=>{
            temp.push(ele.label);
        })
        setCompare(temp);
    },[selected]);

  return (
    <>
        <div className="main">
            <h2>Price Comparison</h2>

            <form >

                <div className="search_div">
                    <input type="text" required maxLength={20} name="keyWord" value={keyWord} onChange={e=>handleChange(e)} placeholder='Enter Your Search Word (Max Length 20)' />
                </div>
                <div className="filters">
                    <div className="priceFilter">
                        <span>Filters </span>
                        <select name="filter" value={filter} onChange={e=>handleChange(e)} id="">
                            <option value="high_price">High Price</option>
                            <option value="low_price">Low Price</option>
                            <option value="high_rating">Highest Rating & Reviews</option>
                        </select>
                    </div>
                </div>

                <div className='top_main'>
                    <h4>Top</h4>
                    <div className="top">
                        <input type="number" required name="top" value={top} onChange={e=>handleChange(e)} min={3} max={5} defaultValue={3}/>
                    </div>
                </div>

                <button type='submit' onClick={e=>handleSubmit(e)} className='button'>Submit</button>
            </form>

            <div className="websites">
                <h4>Select Websites</h4>
                <MultiSelect
                    className='multipleSelect'
                    options={options}
                    value={selected}
                    hasSelectAll="true"
                    onChange={setSelected}
                    labelledBy="Select"
                />
            </div>

        </div>
        <div className="websites_display">
            {
                load===true && <h4>Loading</h4>
            }
            {
                load===false && products.length!==0 && 
                products.map((ele,i)=>{
                    if(compare.includes(ele.webSite))
                    return <ProductCard key={i} item={ele} keyWord={keyWord}/>
                })
            }
            {
                load===false && compare.length===0 && <p>Select Websites From Above DropDown Menu</p>
            }
        </div>
    </>
  )
}

export default Home
