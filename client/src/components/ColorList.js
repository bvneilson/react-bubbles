import React, { useState } from "react";
import { axiosWithAuth } from "../AxiosWithAuth.js";

const initialColor = {
  id: "",
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const addColor = e => {
    e.preventDefault();
    setColorToAdd({
      ...colorToAdd,
      id: colors.length + 1
    })
    axiosWithAuth().post(`http://localhost:5000/api/colors`, colorToAdd).then(res => {
      console.log(res);
      //*** Ask TL about better solution here ***//
      updateColors([...colors, colorToAdd]);
      setColorToAdd(initialColor)
    }).then(err => {
      console.error(err);
    })
  }

  const saveEdit = e => {
    e.preventDefault();
    //console.log(colorToEdit.id);
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth().put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit).then(res => {
      console.log(res);
      //*** Ask TL about better solution here ***//
      updateColors(colors.map(color => color.id === colorToEdit.id ? res.data : color));
    }).then(err => {
      console.error(err);
    })
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth().delete(`http://localhost:5000/api/colors/${color.id}`, colorToEdit).then(res => {
      console.log(res);
      //*** Ask TL about better solution here ***//
      updateColors(colors.filter(color => color.id !== res.data));
    }).then(err => {
      console.error(err);
    })
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      {/* stretch - build another form here to add a color */}
      <form onSubmit={addColor}>
        <legend>add color</legend>
        <label>
          color name:
          <input
            onChange={e =>
              setColorToAdd({ ...colorToAdd, color: e.target.value })
            }
            value={colorToAdd.color}
          />
        </label>
        <label>
          hex code:
          <input
            onChange={e =>
              setColorToAdd({
                ...colorToAdd,
                code: { hex: e.target.value }
              })
            }
            value={colorToAdd.code.hex}
          />
        </label>
        <div className="button-row">
          <button type="submit">add color</button>
        </div>
      </form>
    </div>
  );
};

export default ColorList;
