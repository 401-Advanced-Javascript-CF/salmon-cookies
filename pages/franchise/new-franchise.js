import Head from 'next/head'
import Link from 'next/link'
import { useState, useRef, createElement } from 'react';

export default function NewFranchise(){
    let [store, setStore] = useState({})
    let [allStores, setallStores] = useState([])
    let [storeTotals, setStoreTotals] = useState([0,0,0,0,0,0,0,0,0,0])
    let table = useRef();

    let hours = ['Location','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','Total'];
    let finalHours = hours.map((item, index) => <th key={index}>{item}</th>)
    async function handleCreation(e){
        e.preventDefault();
        // let tr = document.createElement('tr');
        // let td = document.createElement('td');
        // td.innerHTML = store.location;
        // tr.appendChild(td);
        console.log()
        let array = [];
        let total = 0;
        let storeTotalsArray = [...storeTotals];
        for(let i = 0; i < 9; i++){
          let random = Math.ceil(Math.random() * ((store.maxCph) - (store.minCph)) + store.minCph) * (store.avgCookies);
          // let newTd = document.createElement('td');
          // newTd.innerHTML = random;
          total += random;
          storeTotalsArray[i] += random;
          // tr.appendChild(newTd);
          array.push(random);
        }
        storeTotalsArray[storeTotalsArray.length-1] += total;
        setStoreTotals(storeTotalsArray);
        array.push(total);
        // let finalTd = document.createElement('td');
        // finalTd.innerHTML = total;
        // tr.appendChild(finalTd);
        // table.current.children[1].appendChild(tr);
        await setStore({...store, perHour: array});
        setallStores([...allStores, {...store, perHour: array}]);
        console.log(store.perHour)
        // let totalTr = document.createElement('tr');
        // let name = document.createElement('td');
        // name.innerHTML = 'Store Totals:';
        // totalTr.appendChild(name);
        // console.log(storeTotalsArray.length);
        // for(let j = 0; j < storeTotalsArray.length; j++){
        //   let totalTd = document.createElement('td');
        //   totalTd.innerHTML = storeTotalsArray[j];
        //   totalTr.appendChild(totalTd);
        // }
        // table.current.children[1].appendChild(totalTr);
        // setAllLocations([...allLocations, location])
        // let totalCookies = 0;
        // for(let i = 0; i < hours.length-3; i++){
        //     let random = Math.ceil(Math.random() * ((maxCustomers) - (minCustomers)) + minCustomers) * (avgCookies);
        //     setCookiesPerHourPerStore([...cookiesPerHourPerStore, [...cookiesPerHourPerStore[cookiesPerHourPerStore.length-1], random]])
        //     setTotalCookiesPerHour(totalCookiesPerHour + random)
        // }
        // setTotalCookiesPerStore([...totalCookiesPerStore, totalCookies]);

        // let tbody = document.getElementsByClassName('tbody');
        // let tr = document.createElement('tr');
        // let td = document.createElement('td');
        // td.innerHTML = location;
        // tr.appendChild(td);
        // console.log(tr);
        // tbody.appendChild(tr);
    }


    function handleChange(e){
        if(e.target.name === 'location'){
            setStore({...store, location: e.target.value})
        }
        if(e.target.name === 'mincph'){
          setStore({...store, minCph: e.target.value})
        }
        if(e.target.name === 'maxcph'){
          setStore({...store, maxCph: e.target.value})
        }
        if(e.target.name === 'avgCookies'){
          setStore({...store, avgCookies: e.target.value})
        }
    }
    return (
        <>
        <Head>
          <title>Salmon Cookies</title>
          <link rel="icon" href="/favicon.ico" />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>
        </Head>
        <main>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <Link className="navbar-brand" href="/"><a>Salmon</a></Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
  
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link className="nav-link" href='/franchise/new-franchise'><a>Link</a></Link>
        </li>
      </ul>
    </div>
  </nav>
  <section>
      <form onSubmit={handleCreation}>
        <label>Location</label>
          <input name='location' type='text' onChange={handleChange} value={store.location}></input>
          <label>Min Customers Per Hour</label>
          <input name='mincph' type='number' onChange={handleChange} value={store.minCph}></input>
          <label>Max Customers Per Hour</label>
          <input name='maxcph' type='number' onChange={handleChange} value={store.maxCph}></input>
          <label>Avg Cookie Sales per Customers</label>
          <input name='avgCookies' type='number' onChange={handleChange} value={store.avgCookies}></input>
          <button type='submit'>Create new Store</button>
      </form>
      <table className='table' ref={table}>
          <thead>
          <tr>
        {finalHours}
          </tr>
          </thead>
        <tbody className='tbody'>

          {allStores.map(store => {
            return <tr><td>{store.location}</td>{store.perHour.map(numbers => <td>{numbers}</td>)}</tr>
          })}
          <tr>
            <td>Store Totals:</td>
            {storeTotals.map(totals => <td>{totals}</td>)}
          </tr>
        </tbody>
      </table>

  </section>
  <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: #f3d5c9;
background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23bab0ca' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E");
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        li {
          margin-left: 20px;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
            background-color: #f6ece2;
              background-image: url("data:image/svg+xml,%3Csvg width='40' height='12' viewBox='0 0 40 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 6.172L6.172 0h5.656L0 11.828V6.172zm40 5.656L28.172 0h5.656L40 6.172v5.656zM6.172 12l12-12h3.656l12 12h-5.656L20 3.828 11.828 12H6.172zm12 0L20 10.172 21.828 12h-3.656z' fill='%23aca292' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E";
        }
        

        * {
          box-sizing: border-box;
        }
      `}</style>
  </main>
  </>

    )
}