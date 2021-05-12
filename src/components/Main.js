import React from 'react';
import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Index from "../pages/Index";
import Show from "../pages/Show";


function Main(props) {

    const [people, setPeople] = useState(null);

    const URL = "http://localhost:4000/people/";

    const getPeople = async () => {
        const response = await fetch(URL);
        const data = await response.json();
        setPeople(data);
    };

    const createPeople = async person => {
        // make post request to create people
        await fetch(URL, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        })
        // update list of people
        getPeople()
      }

    // UPDATE FUNCTION
    const updatePeople = async (person, id) => {
        // make post request to create people
        await fetch(URL + id, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(person),
        })
        // update list of people
        getPeople()
    }

    // DELETE FUNCTION
    const deletePeople = async id => {
        // make post request to create people
        await fetch(URL + id, {
            method: "delete",
        })
    }

    useEffect(() => getPeople(), []);

    return (
        
        <main>
            <Switch>
                <Route exact path="/" >
                    <Index people={people} createPeople={createPeople} />
                </Route>

                <Route 
                    path="/people/:id"
                    render={(rp) => (
                        <Show
                        people={people}
                        updatePeople={updatePeople}
                        deletePeople={deletePeople}
                        {...rp}
                        />
                    )}
                />
            </Switch>
        </main>
    );
}

export default Main;
