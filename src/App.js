import './App.css';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Pokemon = ({pokemon, onSelect}) => (
  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(', ')}</td>
    <td>
      <button onClick={() => onSelect(pokemon)}>Select</button>
    </td>
  </tr>
);

Pokemon.propTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.shape({
      english: PropTypes.string.isRequired,
      japanese: PropTypes.string.isRequired,
      chinese: PropTypes.string.isRequired,
      french: PropTypes.string.isRequired,
    }).isRequired,
    type: PropTypes.arrayOf(PropTypes.string).isRequired,
    base: PropTypes.shape({
      HP: PropTypes.number.isRequired,
      Attack: PropTypes.number.isRequired,
      Defense: PropTypes.number.isRequired,
      'Sp. Attack': PropTypes.number.isRequired,
      'Sp. Defense': PropTypes.number.isRequired,
      Speed: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  onSelect: PropTypes.func,
};

const PokemonInfo = ({pokemon}) => (
  <div>
    <h1>{pokemon.name.english}</h1>
    <table>
      <thead>
        <tr>
          <td colSpan={2}>Base Stats</td>
        </tr>
      </thead>
      <tbody>
        {Object.keys(pokemon.base).map((key) => (
          <tr key={key}>
            <td>{key}</td>
            <td>{pokemon.base[key]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

function App() {
  const [filter, setFilter] = useState('');
  const [pokemon, setPokemon] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    fetch('https://gist.githubusercontent.com/jherr/23ae3f96cf5ac341c98cd9aa164d2fe3/raw/f8d792f5b2cf97eaaf9f0c2119918f333e348823/pokemon.json')
      .then((resp) => resp.json())
      .then((data) => setPokemon(data));
  }, []);

  return (
    <div style={{
      margin: 'auto',
      width: 800,
      paddingTop: '1rem',
    }}>
      <h1 className='title'>Pokemon Search</h1>
      <input 
        type='text' 
        placeholder='Search...' 
        value={filter} 
        onChange={(e) => setFilter(e.target.value)}
      />
      <div 
        style={{
          display: "grid",
          width: "100%",
          gridTemplateColumns: "70% 30%",
          gridColumnGap: "2rem",
        }} 
      >
        <div>
          <table width={'100%'}>
            <thead>
            <tr>
              <td>Name</td>
              <td>Type</td>
              <td></td>
            </tr>
            </thead>
            <tbody>
              {pokemon.filter((p) => p.name.english.toLocaleLowerCase().includes(filter.toLocaleLowerCase())).map((p) => (
                <Pokemon key={p.id} pokemon={p} onSelect={(pokemon) => setSelectedPokemon(pokemon)}/>
              ))}
            </tbody>
          </table>
        </div>
        {selectedPokemon &&  (
          <div>
            <PokemonInfo pokemon={selectedPokemon}/>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
