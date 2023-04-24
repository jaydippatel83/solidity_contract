import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
import Navigation from './components/Navigation'
import Section from './components/Section'
import Product from './components/Product'

// ABIs
import Dappazon from './abis/Dappazon.json'

// Config
import config from './config.json'

function App() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [dappazon, setDappazon] = useState(null);

  const [electronics, setElectronics] = useState(null);
  const [clothing, setClothing] = useState(null);
  const [toys, setToys] = useState(null);

  const [item, setItem] = useState({})
  const [toggle, setToggle] = useState(false);

  const loadBlockchainData = async () => {
    const provider = await new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider)
    const networkId = await provider.getNetwork();
    const dappazon = new ethers.Contract(
      config[networkId.chainId].dappazon.address,
      Dappazon,
      provider
    )
    setDappazon(dappazon);

    const items = [];

    for (let index = 0; index < 9; index++) {
      const item = await dappazon.items(index + 1);
      items.push(item);
    }

    const electronics = items.filter((e) => e.category === 'electronics');
    const clothing = items.filter((e) => e.category === 'clothing');
    const toys = items.filter((e) => e.category === 'toys');

    setElectronics(electronics);
    setClothing(clothing);
    setToys(toys);

  }

  const togglePop = (item) => {
    setItem(item)
    setToggle(!toggle);
  }

  useEffect(() => {
    loadBlockchainData();
  }, [])

  return (
    <div>
      <Navigation account={account} setAccount={setAccount} />
      <h2>Welcome to Dappazon</h2>
      {
        electronics && clothing && toys && (
          <>
            <Section items={electronics} title={"Electronics & Gadgets"} togglePop={togglePop} />
            <Section items={clothing} title={"Clothing & Jewelry"} togglePop={togglePop} />
            <Section items={toys} title={"Toys & Gaming"} togglePop={togglePop} />
          </>
        )
      }

      {
        toggle && (
          <Product account={account} dappazon={dappazon} item={item} provider={provider} togglePop={togglePop}/>
        )
      }
    </div>
  );
}

export default App;
