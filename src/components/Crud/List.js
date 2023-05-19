import React, { useRef, useState } from "react";
import "./List.css";

function AddList({ setList }) {
    const nameRef = useRef();
    const priceRef = useRef();
    function handleSubmit(event) {
      event.preventDefault();
      const name = event.target.elements.name.value;
      const price = event.target.elements.price.value;
      const newlist = {
        id: 3,
        name,
        price,
      };
      setList((prevList) => {
        return prevList.concat(newlist);
      });
      nameRef.current.value = "";
      priceRef.current.value = "";
    }
    return (
      <form onSubmit={handleSubmit}>
        <input
          className="text-input"
          type="text"
          name="name"
          placeholder="enter category: "
          ref={nameRef}
        />
        <input
          className="text-input"
          type="text"
          name="price"
          placeholder=" enter price: "
          ref={priceRef}
        />
        <button className="text-input" id="button" type="submit">
          Submit
        </button>
      </form>
    );
  }
export default function Crud() {
  const list = [
    {
      id: 1,
      name: "Household",
      price: 2100,
    },
    {
      id: 2,
      name: "Trip",
      price: 4500,
    },
  ];
  const [lists, setList] = useState(list);
  const [updateState, setUpdateState] = useState(-1);
  return (
    <div className="Crud">
      <h2>Expenses Tracker</h2>
      <div>
        <AddList setList={setList} />
        <form onSubmit={handleSubmit}>
          <table>
            {lists.map((current) =>
              updateState === current.id ? (
                <EditList current={current} lists={lists} setList={setList} />
              ) : (
                <tr>
                  <td>{current.name}</td>
                  <td>{current.price}</td>
                  <td>
                    <button
                      className="button1"
                      onClick={() => handleEdit(current.id)}
                    >
                      Edit
                    </button>
                    <button className="button1" type="button" onClick={()=> handleDelete(current.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </table>
        </form>
      </div>
    </div>
  );
  function handleEdit(id) {
    setUpdateState(id);
  }
  function handleDelete(id){
      const newlist= lists.filter((li)=> li.id !== id)
      setList(newlist)
  }
  function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const price = event.target.elements.price.value;
    const newlist = lists.map((li) =>
      li.id === updateState ? { ...li, name: name, price: price } : li
    );
    setList(newlist);
    setUpdateState(-1);
  }
}
function EditList({ current, lists, setList }) {
  function handInputname(event) {
    const value = event.target.value;
    const newlist = lists.map((li) =>
      li.id === current.id ? { ...li, name: value } : li
    );
    setList(newlist);
  }

    function handInputprice(event) {
      const value = event.target.value;
      const newlist = lists.map((li) =>
        li.id === current.id ? { ...li, price: value } : li
      );
      setList(newlist);
    }
    return (
      <tr>
        <td>
          <input
            className="update-text"
            onChange={handInputname}
            type="text"
            name="name"
            value={current.name}
          />
        </td>
        <td>
          <input
            className="update-text"
            onChange={handInputprice}
            type="text"
            name="price"
            value={current.price}
          />
        </td>
        <td>
          <button className="update" type="submit">
            Update
          </button>
        </td>
      </tr>
    );
  }
  
