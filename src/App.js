import React, { useState, useEffect} from 'react';
import Navbar from './componentes/Navbar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Container, Dimmer, Loader } from 'semantic-ui-react'
import Home from './componentes/Home'
import People from './componentes/People'
import Planets from './componentes/Planets'


function App() {
  const [people, setPeople] = useState([])
  const [planets, setPlanets] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPeople() {
      let res = await fetch('https://swapi.dev/api/people/?format=json')
      let data = await res.json()
      setPeople(data.results)
    }

    async function fetchPlanets() {
      let res = await fetch('https://swapi.dev/api/planets/?format=json')
      let data = await res.json()
      setPlanets(data.results)
    }

    fetchPeople()
    fetchPlanets()
    setLoading(false)
  }, [])


  return (
    <>
      <Router>
        <Navbar/>
        <Container>
          {loading ? (
            <Dimmer active inverted>
              <Loader inverted>Loading</Loader>
            </Dimmer>
          ) : (
            <Switch>
            <Route exact path='/'>
              <Home/>
            </Route>
            <Route exact path='/people'>
              <People data={people} />
            </Route>
            <Route exact path='/planets'>
              <Planets data={planets} />
            </Route>
          </Switch>
          )}
          
        </Container>
      </Router>
    </>
  );
}

export default App;
