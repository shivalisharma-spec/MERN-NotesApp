import Card from "./card";

function List({ notes, onEdit, onDelete }) {
  return (
    <div>
      <h2>My Notes</h2>
        <div className="notes">
          {notes.map((note) => (
            <Card key={note._id} note={note} onEdit={onEdit} onDelete={onDelete}/>
          ))}
        </div>
    </div>
  );
}

export default List;