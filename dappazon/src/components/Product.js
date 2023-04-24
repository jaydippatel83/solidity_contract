import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
import Rating from './Rating'

import close from '../assets/close.svg'

const Product = ({ item, provider, account, dappazon, togglePop }) => {
  const [order, setOrder] = useState(null);
  const [hasBought, setHasBought] = useState(false);


  const handleBuy = async () => {
    const signer = provider.getSigner();
    const trx = await dappazon.connect(signer).buy(item.id, { value: item.cost });
    await trx.wait();
    setHasBought(true);
  } 

  useEffect(()=>{ 
    dappazon && fatchDetails();
  },[hasBought])

  const fatchDetails = async () => {
    const events = await dappazon.queryFilter("Buy");
    console.log(events,"events");
    const orders = events.filter((event) => event.args.buyer === account && event.args.itemId.toString() === item.id.toString());
    if (orders.length === 0) return;
    const order = await dappazon.orders(account, orders[0].args.orderId);
    setOrder(order);
  }
  

  


  return (
    <div className="product">
      <div className='product__details'>
        <div className='product__image'>
          <img src={item.image} alt='product' />
        </div>
        <div className='product__overview'>
          <h1>{item.name}</h1>
          <Rating value={item.rating} />
          <hr />
          <p>{item.address}</p>
          <h2>{ethers.utils.formatUnits(item.cost.toString(), 'ether')} ETH</h2>
          <hr />
          <h2>Overview</h2>
          <p>{item.description}</p>
        </div>

        <div className='product__order'>
          <h1>{ethers.utils.formatUnits(item.cost.toString(), 'ether')} ETH</h1>
          <p>
            FREE Delivery <br />
            <strong>
              {
                new Date(Date.now() + 345600000).toLocaleDateString(undefined, {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric'
                })
              }
            </strong>
          </p>

          {
            item.stock > 0 ? (
              <p>In stock</p>
            ) : (
              <p>out ofstock</p>
            )
          }

          <button className='product__buy' onClick={handleBuy}>Buy Now</button>
          <p><small>Ship from</small> Dappazon</p>
          <p><small>Sold by</small> Dappazon</p>


          {
            order && (
              <div className='product__bought'>
                Item on bought <br />
                <strong>
                  {
                    new Date(Number(order.time.toString() + '000')).toLocaleDateString(
                      undefined,
                      {
                        weekday: 'long',
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric'
                      }
                    )
                  }
                </strong>
              </div>
            )
          }

          <button className='product__close' onClick={togglePop}>
            <img src={close} alt='close' />
          </button>

        </div>
      </div>
    </div >
  );
}

export default Product;