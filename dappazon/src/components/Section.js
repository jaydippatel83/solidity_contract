import { ethers } from 'ethers'

// Components
import Rating from './Rating'

const Section = ({ title, items, togglePop }) => {
    return (
        <div className='cards__section'>
            <h3 id={title}>{title}</h3>
            <hr />
            <div className='cards'>
                {
                    items.map((e, i) => {
                        return (
                            <div className='card' key={i} onClick={() => togglePop(e)}>
                                <div className='card__image'>
                                    <img src={e.image} alt='items' />
                                </div>
                                <div className='card__info'>
                                    <h4>{e.name}</h4>
                                    <Rating value={e.rating}/>
                                    <p>{ethers.utils.formatUnits(e.cost.toString(),'ether')} ETH</p>
                                    </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Section;