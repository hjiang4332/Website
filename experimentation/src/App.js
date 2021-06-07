import React from 'react';
import Joke from './Joke';
import Product from './Product.js';
import ProductData from './ProductData';
import ClassIntro from './ClassIntro';

function App(){
    const productData = ProductData.map(item => <Product key={item.id} product={item} />)
    return(
        <div>
            {/* <Joke question="1 your dad" punchline="cool"/>
            <Joke question="2 your dad" punchline="cool"/>
            <Joke question="3 your dad" punchline="cool"/> */}
            
            {/*{productData}*/}

            <h1>{this.state.name}</h1>
            <h3>{this.state.age}</h3>
            
        </div>
    );
}

export default App;